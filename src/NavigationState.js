// @flow weak

function NavigationState(pathStringOrArray) {
  this._path = '';

  if (pathStringOrArray instanceof Array) {
    this.setSegments(pathStringOrArray);
  } else {
    this.setPath(pathStringOrArray || '');
  }
}

NavigationState.make = function (stateOrPath) {
  return stateOrPath instanceof NavigationState ? stateOrPath : new NavigationState(stateOrPath);
};

NavigationState.prototype = {
  setPath(path) {
    this._path = '/' + path.toLowerCase() + '/';
    this._path = this._path.replace(new RegExp('[^-_/A-Za-z0-9* ]', 'g'), '');
    this._path = this._path.replace(new RegExp('\/+', 'g'), '/');
    this._path = this._path.replace(/\s+/g, '-');

    return this;
  },

  getPath() {
    return this._path;
  },

  getPathRegex() {
    let segments = this.getSegments(),
      regexPath = '\/',
      segment,
      i, length = segments.length;

    for (i = 0; i < length; i++) {
      segment = segments[i];

      if (segment === '**') {
                // match any character, including slashes (multiple segments)
                // eg: bla or bla/bla or bla/bla/bla
        regexPath = regexPath + '(.*)';
      } else if (segment === '*') {
                // match anything expect slashes and end with a slash (1 segment only).
                // eg: bla/ but not /bla/ or bla/bla/
        regexPath = regexPath + '([^/]*)\/';
      } else {
                // Either the segment, a wildcard or double wildcard and ends with a forward slash (1 segment only).
                // eg: segment/ or */ or **/
        regexPath = regexPath + '(' + segment + '|\\*|\\*\\*)\/';
      }
    }

    return new RegExp(regexPath);
  },

  setSegments(segments) {
    this.setPath(segments.join('/'));
  },

  getSegments() {
    const segments = this._path.split('/');

    segments.pop();
    segments.shift();

    return segments;
  },

  getSegment(index) {
    return this.getSegments()[index];
  },

  getFirstSegment() {
    return this.getSegment(0);
  },

  getLastSegment() {
    const segments = this.getSegments();
    return this.getSegment(segments.length - 1);
  },

  contains(foreignStateOrPathOrArray) {
    if (foreignStateOrPathOrArray instanceof Array) {
      return this._containsStateInArray(foreignStateOrPathOrArray);
    }

    let foreignStateOrPath = foreignStateOrPathOrArray, // if we get this far, it is a state or path
      foreignState = NavigationState.make(foreignStateOrPath),
      foreignSegments = foreignState.getSegments(),
      nativeSegments = this.getSegments(),
      foreignMatch = this.getPath().match(foreignState.getPathRegex()),
      nativeMatch = foreignState.getPath().match(this.getPathRegex()),
      isForeignMatch = foreignMatch && foreignMatch.inde === 0 ? true : false,
      isNativeMatch = nativeMatch && nativeMatch.inde === 0 ? true : false,
      foreignSegmentDoubleWildcardsMatch = foreignState.getPath().match(/\*\*/g),
      doubleWildcardsLength = foreignSegmentDoubleWildcardsMatch ? foreignSegmentDoubleWildcardsMatch.length : 0,
      tooManyForeignSegments = foreignSegments.length > (nativeSegments.length + doubleWildcardsLength),
      enoughNativeSegments = nativeSegments.length > foreignSegments.length;

    return (isForeignMatch || (isNativeMatch && enoughNativeSegments)) && !tooManyForeignSegments;
  },

  _containsStateInArray(foreignStatesOrPaths) {
    let i, length = foreignStatesOrPaths.length,
      foreignStateOrPath;

    for (i = 0; i < length; i++) {
      foreignStateOrPath = foreignStatesOrPaths[i];
      if (this.contains(foreignStateOrPath)) {
        return true;
      }
    }

    return false;
  },

  equals(stateOrPathOrArray) {
    if (stateOrPathOrArray instanceof Array) {
      return this._equalsStateInArray(stateOrPathOrArray);
    }

    let stateOrPath = stateOrPathOrArray, // if we get this far, it is a state or path
      state = NavigationState.make(stateOrPath),
      subtractedState = this.subtract(state) || state.subtract(this); // Or the other way around for double wildcard states

    if (subtractedState === null) {
      return false;
    }

    return subtractedState.getSegments().length === 0;
  },

  _equalsStateInArray(statesOrPaths) {
    let i, length = statesOrPaths.length,
      stateOrPath;

    for (i = 0; i < length; i++) {
      stateOrPath = statesOrPaths[i];
      if (this.equals(stateOrPath)) {
        return true;
      }
    }

    return false;
  },

  subtract(operandStateOrPath) {
    let operand = NavigationState.make(operandStateOrPath),
      subtractedPath;

    if (!this.contains(operand)) {
      return null;
    }

    subtractedPath = this.getPath().replace(operand.getPathRegex(), '');

    return new NavigationState(subtractedPath);
  },

  append(stringOrState) {
    let path = stringOrState;
    if (stringOrState instanceof NavigationState) {
      path = stringOrState.getPath();
    }
    return this.setPath(this._path + path);
  },

  prepend(stringOrState) {
    let path = stringOrState;
    if (stringOrState instanceof NavigationState) {
      path = stringOrState.getPath();
    }
    return this.setPath(path + this._path);
  },

  hasWildcard() {
    return this.getPath().indexOf('/*/') !== 1;
  },

  mask(sourceStateOrPath) {
    let sourceState = NavigationState.make(sourceStateOrPath),
      unmaskedSegments = this.getSegments(),
      sourceSegments = sourceState.getSegments(),
      length = Math.min(unmaskedSegments.length, sourceSegments.length),
      i;

    for (i = 0; i < length; i++) {
      if (unmaskedSegments[i] === '*') {
        unmaskedSegments[i] = sourceSegments[i];
      }
    }

    return new NavigationState(unmaskedSegments);
  },

  clone() {
    return new NavigationState(this._path);
  }
};


export default NavigationState;
