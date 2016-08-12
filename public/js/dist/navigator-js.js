/*!
 * @gigwalk/navigator-js - v0.6.2 - 2016-08-12
 * undefined
 * Copyright (c) 2016 Bigger Boat
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("react-dom"), require("underscore"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "react-dom", "underscore", "react"], factory);
	else if(typeof exports === 'object')
		exports["navigator-js"] = factory(require("jquery"), require("react-dom"), require("underscore"), require("react"));
	else
		root["navigator-js"] = factory(root["jQuery"], root["ReactDOM"], root["_"], root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_18__, __WEBPACK_EXTERNAL_MODULE_20__, __WEBPACK_EXTERNAL_MODULE_22__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _AsynchResponders = __webpack_require__(1);

	var _AsynchResponders2 = _interopRequireDefault(_AsynchResponders);

	var _Navigator = __webpack_require__(2);

	var _Navigator2 = _interopRequireDefault(_Navigator);

	var _ResponderLists = __webpack_require__(13);

	var _ResponderLists2 = _interopRequireDefault(_ResponderLists);

	var _History = __webpack_require__(14);

	var _History2 = _interopRequireDefault(_History);

	var _NavigationBehaviors = __webpack_require__(4);

	var NavigationBehaviors = _interopRequireWildcard(_NavigationBehaviors);

	var _NavigationResponderBehaviors = __webpack_require__(7);

	var NavigationResponderBehaviors = _interopRequireWildcard(_NavigationResponderBehaviors);

	var _NavigationState = __webpack_require__(3);

	var _NavigationState2 = _interopRequireDefault(_NavigationState);

	var _NavigatorEvent = __webpack_require__(6);

	var NavigatorEvent = _interopRequireWildcard(_NavigatorEvent);

	var _Bind = __webpack_require__(15);

	var _Bind2 = _interopRequireDefault(_Bind);

	var _AutoBind = __webpack_require__(9);

	var _AutoBind2 = _interopRequireDefault(_AutoBind);

	var _TransitionCompleteDelegate = __webpack_require__(8);

	var _TransitionCompleteDelegate2 = _interopRequireDefault(_TransitionCompleteDelegate);

	var _TransitionStatus = __webpack_require__(5);

	var TransitionStatus = _interopRequireWildcard(_TransitionStatus);

	var _ValidationPreparedDelegate = __webpack_require__(11);

	var _ValidationPreparedDelegate2 = _interopRequireDefault(_ValidationPreparedDelegate);

	var _StateCommandMap = __webpack_require__(16);

	var _StateCommandMap2 = _interopRequireDefault(_StateCommandMap);

	var _StateViewMap = __webpack_require__(17);

	var _StateViewMap2 = _interopRequireDefault(_StateViewMap);

	var _ViewRecipe = __webpack_require__(19);

	var _ViewRecipe2 = _interopRequireDefault(_ViewRecipe);

	var _DebugConsole = __webpack_require__(24);

	var _DebugConsole2 = _interopRequireDefault(_DebugConsole);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//  weak
	var utils = Object.freeze({
	    Bind: _Bind2.default,
	    AutoBind: _AutoBind2.default
	});
	var transition = Object.freeze({
	    TransitionCompleteDelegate: _TransitionCompleteDelegate2.default,
	    TransitionStatus: TransitionStatus,
	    ValidationPreparedDelegate: _ValidationPreparedDelegate2.default
	});
	var integration = Object.freeze({
	    StateCommandMap: _StateCommandMap2.default,
	    StateUrlSyncer: _StateCommandMap2.default,
	    StateViewMap: _StateViewMap2.default,
	    ViewRecipe: _ViewRecipe2.default
	});
	var features = Object.freeze({
	    DebugConsole: _DebugConsole2.default
	});

	// navigator-main
	var navigatorjs = Object.freeze({
	    AsynchResponders: _AsynchResponders2.default,
	    Navigator: _Navigator2.default,
	    ResponderLists: _ResponderLists2.default,
	    History: _History2.default,
	    NavigationBehaviors: NavigationBehaviors,
	    NavigationResponderBehaviors: NavigationResponderBehaviors,
	    NavigationState: _NavigationState2.default,
	    NavigatorEvent: NavigatorEvent,
	    utils: utils,
	    transition: transition,
	    integration: integration,
	    features: features
	});

	module.exports = navigatorjs;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//  weak
	var AsynchResponders = function AsynchResponders() {
	  this._responders = [];
	};

	// PUBLIC API
	AsynchResponders.prototype = {
	  getLength: function getLength() {
	    return this._responders.length;
	  },
	  isBusy: function isBusy() {
	    return this.getLength() > 0;
	  },
	  hasResponder: function hasResponder(responder) {
	    return this._responders.indexOf(responder) !== 1;
	  },
	  addResponder: function addResponder(responder) {
	    this._responders.push(responder);
	  },
	  addResponders: function addResponders(additionalRespondersArray) {
	    if (additionalRespondersArray && additionalRespondersArray instanceof Array && additionalRespondersArray.length) {
	      this._responders = this._responders.concat(additionalRespondersArray);
	    }
	  },
	  takeOutResponder: function takeOutResponder(responder) {
	    var index = this._responders.indexOf(responder);
	    if (index !== 1) {
	      this._responders.splice(index, 1);
	      return true;
	    }

	    return false;
	  },
	  reset: function reset() {
	    if (this._responders.length > 0) {
	      console.warn('Resetting too early? Still have responders marked for asynchronous tasks');
	    }

	    this._responders = [];
	  }
	};

	exports.default = AsynchResponders;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _NavigationState = __webpack_require__(3);

	var _NavigationState2 = _interopRequireDefault(_NavigationState);

	var _NavigationBehaviors = __webpack_require__(4);

	var NavigationBehaviors = _interopRequireWildcard(_NavigationBehaviors);

	var _TransitionStatus = __webpack_require__(5);

	var TransitionStatus = _interopRequireWildcard(_TransitionStatus);

	var _NavigatorEvent = __webpack_require__(6);

	var NavigatorEvent = _interopRequireWildcard(_NavigatorEvent);

	var _NavigationResponderBehaviors = __webpack_require__(7);

	var NavigationResponderBehaviors = _interopRequireWildcard(_NavigationResponderBehaviors);

	var _AsynchResponders = __webpack_require__(1);

	var _AsynchResponders2 = _interopRequireDefault(_AsynchResponders);

	var _TransitionCompleteDelegate = __webpack_require__(8);

	var _TransitionCompleteDelegate2 = _interopRequireDefault(_TransitionCompleteDelegate);

	var _ValidationPreparedDelegate = __webpack_require__(11);

	var _ValidationPreparedDelegate2 = _interopRequireDefault(_ValidationPreparedDelegate);

	var _autoBind = __webpack_require__(12);

	var _autoBind2 = _interopRequireDefault(_autoBind);

	var _ResponderLists = __webpack_require__(13);

	var _ResponderLists2 = _interopRequireDefault(_ResponderLists);

	var _jquery = __webpack_require__(10);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//
	var _$eventDispatcher = null;
	// internal namespaces
	//  weak
	var _flow = {};
	var _transition = {};
	var _validation = {};
	var _hidden = {};
	//
	var _currentState = null;
	var _previousState = null;
	var _defaultState = null;
	var _isTransitioning = false;
	//
	var _responders = null; // new ResponderLists();
	var _respondersByID = null; // {};
	var _statusByResponderID = null; // {};
	var _redirects = null;
	var _disappearingAsynchResponders = null;
	var _appearingAsynchResponders = null;
	var _swappingAsynchResponders = null;
	var _validatingAsynchResponders = null;
	var _preparedValidatingAsynchRespondersStack = null;
	var _inlineRedirectionState = null;
	//
	var _asyncInvalidated = false;
	var _asyncValidated = false;
	var _asyncValidationOccurred = false;
	var _responderIDCount = 0;

	var _modify = function _modify(addition, responder, pathsOrStates, behaviorString) {
	  if (_relayModification(addition, responder, pathsOrStates, behaviorString)) {
	    return;
	  }

	  // Using the path variable as dictionary key to break instance referencing.
	  var path = _NavigationState2.default.make(pathsOrStates).getPath(),
	      list = void 0,
	      matchingInterface = void 0;

	  // Create, store and retrieve the list that matches the desired behavior.

	  switch (behaviorString) {
	    case NavigationBehaviors.SHOW:
	      matchingInterface = 'IHasStateTransition';
	      list = _responders.showByPath[path] = _responders.showByPath[path] || [];
	      break;
	    case NavigationBehaviors.HIDE:
	      matchingInterface = 'IHasStateTransition';
	      list = _responders.hideByPath[path] = _responders.hideByPath[path] || [];
	      break;
	    case NavigationBehaviors.VALIDATE:
	      matchingInterface = 'IHasStateValidation';
	      list = _responders.validateByPath[path] = _responders.validateByPath[path] || [];
	      break;
	    case NavigationBehaviors.UPDATE:
	      matchingInterface = 'IHasStateUpdate';
	      list = _responders.updateByPath[path] = _responders.updateByPath[path] || [];
	      break;
	    case NavigationBehaviors.SWAP:
	      matchingInterface = 'IHasStateSwap';
	      list = _responders.swapByPath[path] = _responders.swapByPath[path] || [];
	      break;
	    default:
	      throw new Error('Unknown behavior: ' + behaviorString);
	  }

	  // TODO: Build in more strict validation?
	  if (!NavigationResponderBehaviors.implementsBehaviorInterface(responder, matchingInterface)) {
	    throw new Error('Responder ' + responder + ' should implement ' + matchingInterface + ' to respond to ' + behaviorString);
	  }
	  if (addition) {
	    // add

	    if (list.indexOf(responder) < 0) {
	      list.push(responder);

	      if (responder.__navigatorjs === undefined) {
	        // Create new hidden navigatorjs data
	        _responderIDCount++;
	        responder.__navigatorjs = { id: _responderIDCount };
	        _respondersByID[responder.__navigatorjs.id] = responder;
	      }

	      // If the responder has no status yet, initialize it to UNINITIALIZED:
	      _statusByResponderID[responder.__navigatorjs.id] = _statusByResponderID[responder.__navigatorjs.id] || TransitionStatus.UNINITIALIZED;
	    } else {
	      return;
	    }
	  } else {
	    // remove
	    var index = list.indexOf(responder);
	    if (index >= 0) {
	      list.splice(index, 1);

	      delete _statusByResponderID[responder.__navigatorjs.id];
	      delete _respondersByID[responder.__navigatorjs.id];
	    } else {
	      return;
	    }

	    if (matchingInterface === 'IHasStateSwap' && _responders.swappedBefore[responder]) {
	      // cleanup after the special swap case
	      delete _responders.swappedBefore[responder];
	    }
	  }

	  _$eventDispatcher.trigger(NavigatorEvent.TRANSITION_STATUS_UPDATED, { statusByResponderID: _statusByResponderID, respondersByID: _respondersByID });
	};

	var _relayModification = function _relayModification(addition, responder, pathsOrStates, behaviorString) {
	  if (!responder) {
	    throw new Error('add: responder is null');
	  }

	  var i = void 0,
	      length = void 0;

	  if (pathsOrStates instanceof Array) {
	    length = pathsOrStates.length;
	    for (i = 0; i < length; i++) {
	      _modify(addition, responder, pathsOrStates[i], behaviorString);
	    }
	    return true;
	  }

	  behaviorString = behaviorString || NavigationBehaviors.AUTO;
	  if (behaviorString === NavigationBehaviors.AUTO) {
	    length = NavigationBehaviors.ALL_AUTO.length;
	    for (i = 0; i < length; i++) {
	      try {
	        _modify(addition, responder, pathsOrStates, NavigationBehaviors.ALL_AUTO[i]);
	      } catch (e) {
	        // console.warn(e);
	        // ignore 'should implement xyz' errors
	      }
	    }
	    return true;
	  }

	  return false;
	};

	/**
	* Check if there is a responder registered for a given state. Optionally check for implementation of a given
	* interface. This allows you to check if there was something mapped to a state which implements
	* "IHasStateValidationAsync" for example.
	*/
	var _hasRegisteredResponder = function _hasRegisteredResponder(state, optionalInterface) {
	  var i = void 0,
	      length = _responders.all.length,
	      j = void 0,
	      respondersLength = void 0,
	      responder = void 0,
	      responders = void 0,
	      respondersForPath = void 0,
	      path = void 0;

	  for (i = 0; i < length; i++) {
	    responders = _responders.all[i];
	    for (path in responders) {
	      if (state.equals(path)) {
	        if (optionalInterface) {
	          // Loop through all responders and check if it implements the given interface
	          respondersForPath = responders[path];
	          respondersLength = respondersForPath.length;
	          for (j = 0; j < respondersLength; j++) {
	            responder = respondersForPath[j];
	            if (NavigationResponderBehaviors.implementsBehaviorInterface(responder, optionalInterface)) {
	              return true;
	            }
	          }
	        } else {
	          return true;
	        }

	        return true;
	      }
	    }
	  }

	  return false;
	};

	var _request = function _request(pathOrState) {
	  if (pathOrState === null) {
	    // logger.error("Requested a null state. Aborting request.");
	    return;
	  }
	  var requestedState = void 0,
	      path = void 0,
	      fromState = void 0,
	      toState = void 0;

	  // Store and possibly mask the requested state
	  requestedState = _NavigationState2.default.make(pathOrState);
	  if (requestedState.hasWildcard()) {
	    requestedState = requestedState.mask(_currentState || _defaultState);
	  }

	  // Check for exact match of the requested and the current state
	  if (_currentState && _currentState.getPath() === requestedState.getPath()) {
	    // logger.info("Already at the requested state: " + requested);
	    return;
	  }

	  if (_redirects) {
	    for (path in _redirects) {
	      fromState = new _NavigationState2.default(path);
	      if (fromState.equals(requestedState)) {
	        toState = _NavigationState2.default.make(_redirects[path]);
	        // logger.info("Redirecting " + from + " to " + to);
	        _request(toState);
	        return;
	      }
	    }
	  }

	  // this event makes it possible to add responders just in time to participate in the validation process.
	  _$eventDispatcher.trigger(NavigatorEvent.STATE_REQUESTED, { state: requestedState });

	  // Inline redirection is reset with every request call.
	  // It can be changed by a responder implementing the IHasStateRedirection interface.
	  _inlineRedirectionState = null;

	  _performRequestCascade(requestedState);
	};

	var _performRequestCascade = function _performRequestCascade(requestedState, startAsyncValidation) {
	  if (!_defaultState) {
	    throw new Error('No default state set. Call start() before the first request!');
	  }
	  // Request cascade starts here.
	  //
	  //		console.groupEnd();
	  //		console.group('_performRequestCascade', requestedState.getPath(), startAsyncValidation);
	  if (requestedState.getPath() === _defaultState.getPath() && !_defaultState.hasWildcard()) {
	    //			console.log('exact match');
	    // Exact match on default state bypasses validation.
	    _grantRequest(_defaultState);
	  } else if (_asyncValidationOccurred && _asyncValidated && !_asyncInvalidated) {
	    //			console.log('Async operation completed');
	    // Async operation completed
	    _grantRequest(requestedState);
	  } else if (_validate(requestedState, true, startAsyncValidation)) {
	    //			console.log('Any other state needs to be validated.');
	    // Any other state needs to be validated.
	    _grantRequest(requestedState);
	  } else if (_validatingAsynchResponders && _validatingAsynchResponders.isBusy()) {
	    //			console.log('Waiting for async validation.');
	    // Waiting for async validation.
	    // FIXME: What do we do in the mean time, dispatch an event or sth?
	    // logger.notice("waiting for async validation to complete");
	  } else if (startAsyncValidation && _asyncValidationOccurred) {
	      //			console.log('any async prepration happened instantaneuously');
	      // any async prepration happened instantaneuously
	    } else if (_inlineRedirectionState) {
	        //			console.log('_inlineRedirectionState');
	        _request(_inlineRedirectionState);
	      } else if (_currentState) {
	        //			console.log('_inlineRedirectionState');
	        // If validation fails, the notifyStateChange() is called with the current state as a parameter,
	        // mainly for subclasses to respond to the blocked navigation (e.g. SWFAddress).
	        _notifyStateChange(_currentState);
	      } else if (requestedState.hasWildcard()) {
	        //			console.log('wildcard error');
	        // If we get here, after validateWithWildcards has failed, this means there are still
	        // wildcards in the requested state that didn't match the previous state. This,
	        // unfortunately means your application has a logic error. Go fix it!
	        throw new Error('Check wildcard masking: ' + requestedState.getPath());
	      } else if (_defaultState) {
	        //			console.log('everything failed, use default state');
	        // If all else fails, we'll put up the default state.
	        _grantRequest(_defaultState);
	      } else {
	        //			console.log('everything failed without default state');
	        // If you don't provide a default state, at least make sure your first request makes sense!
	        throw new Error('First request is invalid: ' + requestedState.getPath());
	      }
	};

	var _grantRequest = function _grantRequest(state) {
	  _asyncInvalidated = false;
	  _asyncValidated = false;
	  _previousState = _currentState;
	  _currentState = state;

	  _notifyStateChange(_currentState);

	  _flow.startTransition();
	};

	var _notifyStateChange = function _notifyStateChange(state) {
	  // logger.notice(state);

	  // Do call the super.notifyStateChange() when overriding.
	  if (state !== _previousState) {
	    _$eventDispatcher.trigger(NavigatorEvent.STATE_CHANGED, { statusByResponderID: _statusByResponderID, respondersByID: _respondersByID, state: _currentState });
	  }
	};

	// FLOW NAMESPACE START
	_flow.startTransition = function () {
	  _isTransitioning = true;
	  _$eventDispatcher.trigger(NavigatorEvent.TRANSITION_STARTED);

	  _disappearingAsynchResponders = new _AsynchResponders2.default();
	  _disappearingAsynchResponders.addResponders(_flow.transitionOut());

	  if (!_disappearingAsynchResponders.isBusy()) {
	    _flow.performUpdates();
	  }
	};

	_flow.transitionOut = function () {
	  var respondersToShow = _getRespondersToShow(),
	      responderID = void 0,
	      responder = void 0,
	      waitForResponders = [],
	      i = void 0;

	  // This initialize call is to catch responders that were put on stage to show,
	  // yet still need to wait for async out transitions before they actually transition in.
	  _initializeIfNeccessary(respondersToShow);

	  for (responderID in _statusByResponderID) {
	    responder = _respondersByID[responderID];
	    if (respondersToShow.indexOf(responder) === -1) {
	      // if the responder is not already hidden or disappearing, trigger the transitionOut:
	      if (TransitionStatus.HIDDEN < _statusByResponderID[responderID] && _statusByResponderID[responderID] < TransitionStatus.DISAPPEARING &&
	      // We could also not be hidden or disappearing but performing a state swap.
	      NavigationResponderBehaviors.implementsBehaviorInterface(responder, 'IHasStateTransition')) {
	        _statusByResponderID[responderID] = TransitionStatus.DISAPPEARING;
	        waitForResponders.push(responder);

	        // use namespace transition;
	        // console.log('_flow -> transitionOut', responder);
	        responder.transitionOut(new _TransitionCompleteDelegate2.default(responder, TransitionStatus.HIDDEN, NavigationBehaviors.HIDE, this, _transition).call);
	      } else {
	        // already hidden or hiding
	      }
	    }
	  }

	  // loop backwards so we can splice elements off the array while in the loop.
	  for (i = waitForResponders.length; --i >= 0;) {
	    if (_statusByResponderID[waitForResponders[i].__navigatorjs.id] === TransitionStatus.HIDDEN) {
	      waitForResponders.splice(i, 1);
	    }
	  }

	  if (waitForResponders.length > 0) {
	    _$eventDispatcher.trigger(NavigatorEvent.TRANSITION_STATUS_UPDATED, { statusByResponderID: _statusByResponderID, respondersByID: _respondersByID });
	  }

	  return waitForResponders;
	};

	_flow.performUpdates = function () {
	  _disappearingAsynchResponders.reset();

	  var path = void 0,
	      state = void 0,
	      list = void 0,
	      i = void 0,
	      responder = void 0;

	  for (path in _responders.updateByPath) {
	    // create a state object for comparison:
	    state = new _NavigationState2.default(path);

	    if (_currentState.contains(state)) {
	      // the lookup path is contained by the new state.
	      list = _responders.updateByPath[path];

	      _initializeIfNeccessary(list);

	      // check for existing validators.
	      for (i = 0; i < list.length; i++) {
	        responder = list[i];
	        responder.updateState(_currentState.subtract(state), _currentState);
	      }
	    }
	  }

	  _flow.startTransitionIn();
	};

	_flow.startTransitionIn = function () {
	  _appearingAsynchResponders = new _AsynchResponders2.default();
	  _appearingAsynchResponders.addResponders(_flow.transitionIn());

	  if (!_appearingAsynchResponders.isBusy()) {
	    _flow.startSwapOut();
	  }
	};

	_flow.transitionIn = function () {
	  var respondersToShow = _getRespondersToShow(),
	      respondersToWaitFor = [],
	      responder = void 0,
	      status = void 0,
	      i = void 0;

	  _initializeIfNeccessary(respondersToShow);

	  // for each (var responder : IHasStateTransition in respondersToShow) {

	  for (i = 0; i < respondersToShow.length; i++) {
	    responder = respondersToShow[i];
	    status = _statusByResponderID[responder.__navigatorjs.id];

	    if (status < TransitionStatus.APPEARING || TransitionStatus.SHOWN < status) {
	      // then continue with the transitionIn() call.
	      _statusByResponderID[responder.__navigatorjs.id] = TransitionStatus.APPEARING;
	      respondersToWaitFor.push(responder);

	      // use namespace transition;
	      responder.transitionIn(new _TransitionCompleteDelegate2.default(responder, TransitionStatus.SHOWN, NavigationBehaviors.SHOW, this, _transition).call);
	    }
	  }

	  // loop backwards so we can splice elements off the array while in the loop.
	  for (i = respondersToWaitFor.length; --i >= 0;) {
	    if (_statusByResponderID[respondersToWaitFor[i].__navigatorjs.id] === TransitionStatus.SHOWN) {
	      respondersToWaitFor.splice(i, 1);
	    }
	  }

	  if (respondersToWaitFor.length > 0) {
	    _$eventDispatcher.trigger(NavigatorEvent.TRANSITION_STATUS_UPDATED, { statusByResponderID: _statusByResponderID, respondersByID: _respondersByID });
	  }

	  return respondersToWaitFor;
	};

	_flow.startSwapOut = function () {
	  _swappingAsynchResponders = new _AsynchResponders2.default();
	  _swappingAsynchResponders.addResponders(_flow.swapOut());

	  if (!_swappingAsynchResponders.isBusy()) {
	    _flow.swapIn();
	  }
	};

	_flow.swapOut = function () {
	  _appearingAsynchResponders.reset();

	  var waitForResponders = [],
	      path = void 0,
	      state = void 0,
	      swapByPathList = void 0,
	      responder = void 0,
	      i = void 0,
	      truncatedState = void 0;

	  for (path in _responders.swapByPath) {
	    // create a state object for comparison:
	    state = new _NavigationState2.default(path);

	    if (_currentState.contains(state)) {
	      // the lookup path is contained by the new state.
	      swapByPathList = _responders.swapByPath[path];

	      _initializeIfNeccessary(swapByPathList);

	      // check for existing swaps.
	      for (i = 0; i < swapByPathList.length; i++) {
	        responder = swapByPathList[i];
	        if (!_responders.swappedBefore[responder]) {
	          continue;
	        }

	        truncatedState = _currentState.subtract(state);
	        if (responder.willSwapToState(truncatedState, _currentState)) {
	          _statusByResponderID[responder.__navigatorjs.id] = TransitionStatus.SWAPPING;
	          waitForResponders.push(responder);

	          // use namespace transition;
	          responder.swapOut(new _TransitionCompleteDelegate2.default(responder, TransitionStatus.SHOWN, NavigationBehaviors.SWAP, this, _transition).call);
	        }
	      }
	    }
	  }

	  // loop backwards so we can splice elements off the array while in the loop.
	  for (i = waitForResponders.length; --i >= 0;) {
	    if (_statusByResponderID[waitForResponders[i].__navigatorjs.id] === TransitionStatus.SHOWN) {
	      waitForResponders.splice(i, 1);
	    }
	  }

	  if (waitForResponders.length > 0) {
	    _$eventDispatcher.trigger(NavigatorEvent.TRANSITION_STATUS_UPDATED, { statusByResponderID: _statusByResponderID, respondersByID: _respondersByID });
	  }

	  return waitForResponders;
	};

	_flow.swapIn = function () {
	  _swappingAsynchResponders.reset();

	  var path = void 0,
	      state = void 0,
	      swapByPathList = void 0,
	      responder = void 0,
	      truncatedState = void 0,
	      i = void 0;

	  for (path in _responders.swapByPath) {
	    // create a state object for comparison:
	    state = new _NavigationState2.default(path);

	    if (_currentState.contains(state)) {
	      // the lookup path is contained by the new state.
	      swapByPathList = _responders.swapByPath[path];

	      _initializeIfNeccessary(swapByPathList);

	      // check for existing swaps.
	      // for each (var responder : IHasStateSwap in swapByPathList) {
	      for (i = 0; i < swapByPathList.length; i++) {
	        responder = swapByPathList[i];
	        truncatedState = _currentState.subtract(state);
	        if (responder.willSwapToState(truncatedState, _currentState)) {
	          _responders.swappedBefore[responder] = true;
	          responder.swapIn(truncatedState, _currentState);
	        }
	      }
	    }
	  }

	  _flow.finishTransition();
	};

	_flow.finishTransition = function () {
	  _isTransitioning = false;
	  _$eventDispatcher.trigger(NavigatorEvent.TRANSITION_FINISHED);
	};
	// FLOW NAMESPACE END

	// TRANSITION NAMESPACE START
	_transition.notifyComplete = function (responder, status, behavior) {
	  if (_statusByResponderID[responder.__navigatorjs.id]) {
	    _statusByResponderID[responder.__navigatorjs.id] = status;
	    _$eventDispatcher.trigger(NavigatorEvent.TRANSITION_STATUS_UPDATED, { statusByResponderID: _statusByResponderID, respondersByID: _respondersByID });
	  }

	  var asynchResponders = void 0,
	      callbackMethod = void 0;

	  switch (behavior) {
	    case NavigationBehaviors.HIDE:
	      asynchResponders = _disappearingAsynchResponders;
	      callbackMethod = _flow.performUpdates;
	      break;
	    case NavigationBehaviors.SHOW:
	      asynchResponders = _appearingAsynchResponders;
	      callbackMethod = _flow.startSwapOut;
	      break;
	    case NavigationBehaviors.SWAP:
	      asynchResponders = _swappingAsynchResponders;
	      callbackMethod = _flow.swapIn;
	      break;
	    default:
	      throw new Error("Don't know how to handle notification of behavior " + behavior);
	  }

	  // If the notifyComplete is called instantly, the array of asynchronous responders is not yet assigned, and therefore not busy.
	  if (asynchResponders.isBusy()) {
	    asynchResponders.takeOutResponder(responder);

	    // isBusy counts the number of responders, so it might have changed after takeOutResponder().
	    if (!asynchResponders.isBusy()) {
	      callbackMethod();
	    } else {
	      // logger.notice("waiting for " + asynch.length + " responders to " + behavior);
	    }
	  }
	};
	// TRANSITION NAMESPACE END

	// HIDDEN NAMESPACE START
	_hidden.hasResponder = function (responder) {
	  if (_statusByResponderID[responder.__navigatorjs.id]) {
	    return true;
	  }

	  var respondersByPath = void 0,
	      existingResponders = void 0,
	      i = void 0,
	      j = void 0;

	  for (i = 0; i < _responders.all.length; i++) {
	    respondersByPath = _responders.all[i];
	    for (j = 0; j < respondersByPath.length; j++) {
	      existingResponders = respondersByPath[j];
	      if (existingResponders.indexOf(responder) >= 0) {
	        return true;
	      }
	    }
	  }

	  return false;
	};

	_hidden.getStatusByResponderID = function () {
	  return _statusByResponderID;
	};

	_hidden.getRespondersByID = function () {
	  return _respondersByID;
	};

	_hidden.getStatus = function (responder) {
	  return _statusByResponderID[responder.__navigatorjs.id];
	};

	_hidden.getKnownPaths = function () {
	  var list = {},
	      path = void 0,
	      knownPaths = [];

	  list[_defaultState.getPath()] = true;

	  for (path in _responders.showByPath) {
	    list[new _NavigationState2.default(path).getPath()] = true;
	  }

	  for (path in list) {
	    knownPaths.push(path);
	  }

	  knownPaths.sort();
	  return knownPaths;
	};
	// HIDDEN NAMESPACE END

	// VALIDATION NAMESPACE START
	_validation.notifyValidationPrepared = function (validatorResponder, truncatedState, fullState) {
	  // If the takeOutResponder() method returns false, it was not in the responder list to begin with.
	  // This happens if a second navigation state is requested before the async validation preparation of the first completes.
	  if (_validatingAsynchResponders.takeOutResponder(validatorResponder)) {
	    if (validatorResponder.validate(truncatedState, fullState)) {
	      _asyncValidated = true;
	    } else {
	      // logger.warn("Asynchronously invalidated by " + validatorResponder);
	      _asyncInvalidated = true;

	      if (NavigationResponderBehaviors.implementsBehaviorInterface(validatorResponder, 'IHasStateRedirection')) {
	        _inlineRedirectionState = validatorResponder.redirect(truncatedState, fullState);
	      }
	    }

	    if (_asyncInvalidated || !_validatingAsynchResponders.isBusy()) {
	      _validatingAsynchResponders.reset();
	      _preparedValidatingAsynchRespondersStack = [];
	      _performRequestCascade(fullState, false);
	    } else {
	      _validateFirstValidatingAsynchResponderFromStack();
	      //				console.log("Waiting for " + _validatingAsynchResponders.getLength() + " validators to prepare");
	    }
	  } else {
	      // ignore async preparations of former requests.
	    }
	};
	// VALIDATION NAMESPACE END

	var _validateFirstValidatingAsynchResponderFromStack = function _validateFirstValidatingAsynchResponderFromStack() {
	  if (_preparedValidatingAsynchRespondersStack.length === 0) {
	    return false;
	  }

	  var preparedResponder = _preparedValidatingAsynchRespondersStack.shift();
	  preparedResponder.responder.prepareValidation(preparedResponder.remainderState, preparedResponder.unvalidatedState, preparedResponder.callOnPrepared);

	  return true;
	};

	var _validate = function _validate(stateToValidate, allowRedirection, allowAsyncValidation) {
	  var allowRedirection = allowRedirection === undefined ? true : allowRedirection,
	      allowAsyncValidation = allowAsyncValidation === undefined ? true : allowAsyncValidation,
	      unvalidatedState = stateToValidate,
	      callOnPrepared = null,
	      implicit,
	      invalidated = false,
	      validated = false,
	      path,
	      state,
	      remainderState,
	      validateByPathList,
	      i,
	      responder,
	      validatorResponder;

	  // check to see if there are still wildcards left
	  if (unvalidatedState.hasWildcard()) {
	    //			console.log("validate - validateState: Requested states may not contain wildcards", "return false");
	    // throw new Error("validateState: Requested states may not contain wildcards " + NavigationState.WILDCARD);
	    return false;
	  }

	  if (unvalidatedState.equals(_defaultState)) {
	    //			console.log("validate - unvalidatedState.equals(_defaultState)", unvalidatedState.getPath(), _defaultState.getPath() , "return false");
	    return true;
	  }

	  if (allowAsyncValidation) {
	    // This conditional is only true if we enter the validation the first (synchronous) time.
	    _asyncValidationOccurred = false;
	    _asyncInvalidated = false;
	    _asyncValidated = false;

	    // reset asynchronous validation for every new state.
	    _validatingAsynchResponders = new _AsynchResponders2.default();
	    _preparedValidatingAsynchRespondersStack = [];
	  }

	  implicit = _validateImplicitly(unvalidatedState);
	  //		console.groupCollapsed('Responders');

	  // TODO should we order the states? As mapping a validating child state before a invalidating parent state will validate the state
	  for (path in _responders.validateByPath) {
	    //			console.log(path);
	    // create a state object for comparison:
	    state = new _NavigationState2.default(path);

	    if (unvalidatedState.contains(state)) {
	      remainderState = unvalidatedState.subtract(state);

	      // the lookup path is contained by the new state.
	      validateByPathList = _responders.validateByPath[path];

	      _initializeIfNeccessary(validateByPathList);

	      if (allowAsyncValidation && _hasRegisteredResponder(stateToValidate)) {
	        // check for async validators first. If this does not
	        for (i = 0; i < validateByPathList.length; i++) {
	          responder = validateByPathList[i];

	          // check for optional validation
	          if (NavigationResponderBehaviors.implementsBehaviorInterface(responder, 'IHasStateValidationOptionalAsync') && !responder.willValidate(remainderState, unvalidatedState)) {
	            continue;
	          }

	          if (NavigationResponderBehaviors.implementsBehaviorInterface(responder, 'IHasStateValidationAsync')) {
	            _asyncValidationOccurred = true;

	            callOnPrepared = new _ValidationPreparedDelegate2.default(responder, remainderState, unvalidatedState, this, _validation).call;
	            _validatingAsynchResponders.addResponder(responder);
	            _preparedValidatingAsynchRespondersStack.push({ responder: responder, remainderState: remainderState, unvalidatedState: unvalidatedState, callOnPrepared: callOnPrepared });

	            //							console.log("Preparing validation (total of " + _validatingAsynchResponders.getLength() + ")");
	          }
	        }
	      }

	      // check regular validators
	      // for each (responder in list) {
	      for (i = 0; i < validateByPathList.length; i++) {
	        responder = validateByPathList[i];
	        // skip async validators, we handled them a few lines back.
	        if (NavigationResponderBehaviors.implementsBehaviorInterface(responder, 'IHasStateValidationAsync')) {
	          continue;
	        }

	        // check for optional validation
	        if (NavigationResponderBehaviors.implementsBehaviorInterface(responder, 'IHasStateValidationOptional') && !responder.willValidate(remainderState, unvalidatedState)) {
	          continue;
	        }

	        if (responder.validate(remainderState, unvalidatedState) && _hasRegisteredResponder(unvalidatedState)) {
	          validated = true;
	        } else {
	          // logger.warn("Invalidated by validator: " + responder);
	          invalidated = true;

	          if (allowRedirection && NavigationResponderBehaviors.implementsBehaviorInterface(responder, 'IHasStateRedirection')) {
	            _inlineRedirectionState = responder.redirect(remainderState, unvalidatedState);
	          }

	          //						console.log("validate - a responder was mapped to the given state, but it did not validate");
	          //						console.groupEnd();
	          return false;
	        }
	      }
	    }
	  }

	  if (_asyncValidationOccurred && _validateFirstValidatingAsynchResponderFromStack()) {
	    // If there are active async validators, stop the validation chain and wait for the prepration to finish.
	    // if (_validating.isBusy()) return false;
	    // if (_asyncValidationOccurred && (_asyncValidated || _asyncInvalidated) {
	    // async validation was instantaneous, which means that the validation was approved or denied elsewhere
	    // in the stack. this method should return false any which way.
	    //			console.log("validate - _asyncValidationOccurred","return false");
	    //			console.groupEnd();
	    return false;
	  }

	  //		console.groupEnd();

	  if (_validatingAsynchResponders.isBusy()) {
	    //			console.log("validate - _validatingAsynchResponders.isBusy", "return false");
	    // the request cascade will double check the asynch validators and act accordingly.
	    return false;
	  }

	  // invalidation overrules any validation
	  if (invalidated || _asyncInvalidated) {
	    //			console.log("validate - invalidated || _asyncInvalidated", invalidated,  _asyncInvalidated, "return false");
	    return false;
	  }

	  if (validated || _asyncValidated) {
	    //			console.log("validate - validated || _asyncValidated", validated, _asyncValidated, "return true");
	    return true;
	  }

	  if (!implicit) {}
	  //			console.log("validate - Validation failed. No validators or transitions matched the requested ", unvalidatedState);
	  // logger.warn("Validation failed. No validators or transitions matched the requested " + unvalidatedState);


	  //		console.log("validate - return with the implicit return value", implicit);

	  return implicit;
	};

	var _validateImplicitly = function _validateImplicitly(state) {
	  var path = void 0;
	  for (path in _responders.showByPath) {
	    if (new _NavigationState2.default(path).equals(state)) {
	      // info("Validation passed based on transition responder.");
	      return true;
	    }
	  }

	  return false;
	};

	var _getRespondersToShow = function _getRespondersToShow() {
	  var respondersToShow = _getResponderList(_responders.showByPath, _currentState),
	      respondersToHide = _getResponderList(_responders.hideByPath, _currentState),
	      i = void 0,
	      hideResponder = void 0,
	      hideIndex = void 0;

	  // remove elements from the toShow list, if they are in the toHide list.
	  //			for each (var hide : IHasStateTransition in toHide) {
	  for (i = 0; i < respondersToHide.length; i++) {
	    hideResponder = respondersToHide[i];
	    hideIndex = respondersToShow.indexOf(hideResponder);
	    if (hideIndex >= 0) {
	      respondersToShow.splice(hideIndex, 1);
	    }
	  }

	  return respondersToShow;
	};

	var _initializeIfNeccessary = function _initializeIfNeccessary(responderList) {
	  var i = void 0,
	      responder = void 0;
	  //			for each (var responder : INavigationResponder in responderList) {
	  for (i = 0; i < responderList.length; i++) {
	    responder = responderList[i];
	    if (_statusByResponderID[responder.__navigatorjs.id] === TransitionStatus.UNINITIALIZED && NavigationResponderBehaviors.implementsBehaviorInterface(responder, 'IHasStateInitialization')) {
	      // first initialize the responder.
	      responder.initializeByNavigator();
	      _statusByResponderID[responder.__navigatorjs.id] = TransitionStatus.INITIALIZED;
	    }
	  }
	};

	var _getResponderList = function _getResponderList(listObj, state) {
	  var responders = [],
	      path = void 0;

	  for (path in listObj) {
	    if (state.contains(new _NavigationState2.default(path))) {
	      responders = responders.concat(listObj[path]);
	    }
	  }

	  return responders;
	};

	var Navigator = function Navigator() {
	  (0, _autoBind2.default)(this, this);

	  _$eventDispatcher = (0, _jquery2.default)({});
	  _currentState = null;
	  _responders = new _ResponderLists2.default();
	  _respondersByID = {};
	  _statusByResponderID = {};
	  _redirects = null;
	  _responderIDCount = 0;
	};

	// PUBLIC API
	Navigator.prototype = {
	  add: function add(responder, pathsOrStates, behaviorString) {
	    _modify(true, responder, pathsOrStates, behaviorString);
	  },
	  remove: function remove(responder, pathsOrStates, behaviorString) {
	    _modify(false, responder, pathsOrStates, behaviorString);
	  },
	  registerRedirect: function registerRedirect(fromStateOrPath, toStateOrPath) {
	    _redirects = _redirects || {};
	    _redirects[_NavigationState2.default.make(fromStateOrPath).getPath()] = _NavigationState2.default.make(toStateOrPath);
	  },
	  start: function start(defaultStateOrPath, startStateOrPath) {
	    _defaultState = _NavigationState2.default.make(defaultStateOrPath || '');

	    this.request(startStateOrPath || _defaultState);
	  },
	  request: function request(pathOrState) {
	    _request(pathOrState);
	  },
	  getCurrentState: function getCurrentState() {
	    if (!_currentState) {
	      if (_defaultState) {
	        return _defaultState.clone();
	      }

	      return null;
	    }

	    return _currentState.clone();
	  },
	  isTransitioning: function isTransitioning() {
	    return _isTransitioning;
	  },
	  on: function on(event, handler) {
	    _$eventDispatcher.on(event, handler);
	    return this;
	  },
	  off: function off(event, handler) {
	    _$eventDispatcher.off(event, handler);
	    return this;
	  }
	};

	exports.default = Navigator;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//  weak

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
	  setPath: function setPath(path) {
	    this._path = '/' + path.toLowerCase() + '/';
	    this._path = this._path.replace(new RegExp('[^-_/A-Za-z0-9* ]', 'g'), '');
	    this._path = this._path.replace(new RegExp('\/+', 'g'), '/');
	    this._path = this._path.replace(/\s+/g, '-');

	    return this;
	  },
	  getPath: function getPath() {
	    return this._path;
	  },
	  getPathRegex: function getPathRegex() {
	    var segments = this.getSegments(),
	        regexPath = '\/',
	        segment = void 0,
	        i = void 0,
	        length = segments.length;

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
	  setSegments: function setSegments(segments) {
	    this.setPath(segments.join('/'));
	  },
	  getSegments: function getSegments() {
	    var segments = this._path.split('/');

	    segments.pop();
	    segments.shift();

	    return segments;
	  },
	  getSegment: function getSegment(index) {
	    return this.getSegments()[index];
	  },
	  getFirstSegment: function getFirstSegment() {
	    return this.getSegment(0);
	  },
	  getLastSegment: function getLastSegment() {
	    var segments = this.getSegments();
	    return this.getSegment(segments.length - 1);
	  },
	  contains: function contains(foreignStateOrPathOrArray) {
	    if (foreignStateOrPathOrArray instanceof Array) {
	      return this._containsStateInArray(foreignStateOrPathOrArray);
	    }

	    var foreignStateOrPath = foreignStateOrPathOrArray,
	        // if we get this far, it is a state or path
	    foreignState = NavigationState.make(foreignStateOrPath),
	        foreignSegments = foreignState.getSegments(),
	        nativeSegments = this.getSegments(),
	        foreignMatch = this.getPath().match(foreignState.getPathRegex()),
	        nativeMatch = foreignState.getPath().match(this.getPathRegex()),
	        isForeignMatch = foreignMatch && foreignMatch.inde === 0 ? true : false,
	        isNativeMatch = nativeMatch && nativeMatch.inde === 0 ? true : false,
	        foreignSegmentDoubleWildcardsMatch = foreignState.getPath().match(/\*\*/g),
	        doubleWildcardsLength = foreignSegmentDoubleWildcardsMatch ? foreignSegmentDoubleWildcardsMatch.length : 0,
	        tooManyForeignSegments = foreignSegments.length > nativeSegments.length + doubleWildcardsLength,
	        enoughNativeSegments = nativeSegments.length > foreignSegments.length;

	    return (isForeignMatch || isNativeMatch && enoughNativeSegments) && !tooManyForeignSegments;
	  },
	  _containsStateInArray: function _containsStateInArray(foreignStatesOrPaths) {
	    var i = void 0,
	        length = foreignStatesOrPaths.length,
	        foreignStateOrPath = void 0;

	    for (i = 0; i < length; i++) {
	      foreignStateOrPath = foreignStatesOrPaths[i];
	      if (this.contains(foreignStateOrPath)) {
	        return true;
	      }
	    }

	    return false;
	  },
	  equals: function equals(stateOrPathOrArray) {
	    if (stateOrPathOrArray instanceof Array) {
	      return this._equalsStateInArray(stateOrPathOrArray);
	    }

	    var stateOrPath = stateOrPathOrArray,
	        // if we get this far, it is a state or path
	    state = NavigationState.make(stateOrPath),
	        subtractedState = this.subtract(state) || state.subtract(this); // Or the other way around for double wildcard states

	    if (subtractedState === null) {
	      return false;
	    }

	    return subtractedState.getSegments().length === 0;
	  },
	  _equalsStateInArray: function _equalsStateInArray(statesOrPaths) {
	    var i = void 0,
	        length = statesOrPaths.length,
	        stateOrPath = void 0;

	    for (i = 0; i < length; i++) {
	      stateOrPath = statesOrPaths[i];
	      if (this.equals(stateOrPath)) {
	        return true;
	      }
	    }

	    return false;
	  },
	  subtract: function subtract(operandStateOrPath) {
	    var operand = NavigationState.make(operandStateOrPath),
	        subtractedPath = void 0;

	    if (!this.contains(operand)) {
	      return null;
	    }

	    subtractedPath = this.getPath().replace(operand.getPathRegex(), '');

	    return new NavigationState(subtractedPath);
	  },
	  append: function append(stringOrState) {
	    var path = stringOrState;
	    if (stringOrState instanceof NavigationState) {
	      path = stringOrState.getPath();
	    }
	    return this.setPath(this._path + path);
	  },
	  prepend: function prepend(stringOrState) {
	    var path = stringOrState;
	    if (stringOrState instanceof NavigationState) {
	      path = stringOrState.getPath();
	    }
	    return this.setPath(path + this._path);
	  },
	  hasWildcard: function hasWildcard() {
	    return this.getPath().indexOf('/*/') !== 1;
	  },
	  mask: function mask(sourceStateOrPath) {
	    var sourceState = NavigationState.make(sourceStateOrPath),
	        unmaskedSegments = this.getSegments(),
	        sourceSegments = sourceState.getSegments(),
	        length = Math.min(unmaskedSegments.length, sourceSegments.length),
	        i = void 0;

	    for (i = 0; i < length; i++) {
	      if (unmaskedSegments[i] === '*') {
	        unmaskedSegments[i] = sourceSegments[i];
	      }
	    }

	    return new NavigationState(unmaskedSegments);
	  },
	  clone: function clone() {
	    return new NavigationState(this._path);
	  }
	};

	exports.default = NavigationState;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//  weak
	/**
	 * Will show when the state matches, will hide when it doesn't
	 */
	var SHOW = exports.SHOW = 'show';
	/**
	 * Will hide when the state matches, even if it has a show on a higher level
	 */
	var HIDE = exports.HIDE = 'hide';
	/**
	 * Will update before any show method gets called
	 */
	var UPDATE = exports.UPDATE = 'update';
	/**
	 * Will swap out and in, when the state is changed
	 */
	var SWAP = exports.SWAP = 'swap';
	/**
	 * Will ask for available. This prevents urllib3 from configuring SSL appropriately and may cause certain SSL
	 *  connectionvalidation of the state, if a state can't be validated, it is denied
	 */
	var VALIDATE = exports.VALIDATE = 'validate';
	/**
	 * Will try to add all behaviors, based on the class properties of the responder
	 */
	var AUTO = exports.AUTO = 'auto';
	/**
	 * Used for looping through when the AUTO behavior is used.
	 */
	var ALL_AUTO = exports.ALL_AUTO = ['show', 'update', 'swap', 'validate'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.toString = toString;
	//  weak
	var UNINITIALIZED = exports.UNINITIALIZED = -2;
	var INITIALIZED = exports.INITIALIZED = -1;
	var HIDDEN = exports.HIDDEN = 1;
	var APPEARING = exports.APPEARING = 2;
	var SHOWN = exports.SHOWN = 3;
	var SWAPPING = exports.SWAPPING = 4;
	var DISAPPEARING = exports.DISAPPEARING = 5;

	function toString(status) {
	  switch (status) {
	    case UNINITIALIZED:
	      return 'UNINITIALIZED';
	    case INITIALIZED:
	      return 'INITIALIZED';
	    case HIDDEN:
	      return 'HIDDEN';
	    case APPEARING:
	      return 'APPEARING';
	    case SHOWN:
	      return 'SHOWN';
	    case SWAPPING:
	      return 'SWAPPING';
	    case DISAPPEARING:
	      return 'DISAPPEARING';
	    default:
	      return 'UNKNOWN';
	  }
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//  weak
	var TRANSITION_STATUS_UPDATED = exports.TRANSITION_STATUS_UPDATED = 'TRANSITION_STATUS_UPDATED';
	var STATE_REQUESTED = exports.STATE_REQUESTED = 'STATE_REQUESTED';
	var STATE_CHANGED = exports.STATE_CHANGED = 'STATE_CHANGED';
	var TRANSITION_STARTED = exports.TRANSITION_STARTED = 'TRANSITION_STARTED';
	var TRANSITION_FINISHED = exports.TRANSITION_FINISHED = 'TRANSITION_FINISHED';

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//  weak
	var IHasStateInitialization = exports.IHasStateInitialization = { name: 'IHasStateInitialization', methods: ['initializeByNavigator'] };
	var IHasStateValidation = exports.IHasStateValidation = { name: 'IHasStateValidation', methods: ['validate'] };
	var IHasStateValidationAsync = exports.IHasStateValidationAsync = { name: 'IHasStateValidationAsync', extends: ['IHasStateValidation'], methods: ['prepareValidation'] };
	var IHasStateValidationOptional = exports.IHasStateValidationOptional = { name: 'IHasStateValidationOptional', extends: ['IHasStateValidation'], methods: ['willValidate'] };
	var IHasStateValidationOptionalAsync = exports.IHasStateValidationOptionalAsync = { name: 'IHasStateValidationOptionalAsync', extends: ['IHasStateValidationAsync', 'IHasStateValidationOptional'], methods: [] };
	var IHasStateRedirection = exports.IHasStateRedirection = { name: 'IHasStateRedirection', extends: ['IHasStateValidation'], methods: ['redirect'] };
	var IHasStateSwap = exports.IHasStateSwap = { name: 'IHasStateSwap', methods: ['willSwapToState', 'swapOut', 'swapIn'] };
	var IHasStateTransition = exports.IHasStateTransition = { name: 'IHasStateTransition', methods: ['transitionIn', 'transitionOut'] };
	var IHasStateUpdate = exports.IHasStateUpdate = { name: 'IHasStateUpdate', methods: ['updateState'] };

	var $interfaces = {
	  IHasStateInitialization: IHasStateInitialization,
	  IHasStateValidation: IHasStateValidation,
	  IHasStateValidationAsync: IHasStateValidationAsync,
	  IHasStateValidationOptional: IHasStateValidationOptional,
	  IHasStateValidationOptionalAsync: IHasStateValidationOptionalAsync,
	  IHasStateRedirection: IHasStateRedirection,
	  IHasStateSwap: IHasStateSwap,
	  IHasStateTransition: IHasStateTransition,
	  IHasStateUpdate: IHasStateUpdate
	};
	var implementsBehaviorInterface = exports.implementsBehaviorInterface = function implementsBehaviorInterface(object, _interface) {
	  if (object.navigatorBehaviors === undefined || !object.navigatorBehaviors instanceof Array) {
	    // The input interface is not set on object's navigatorBehaviors.
	    return false;
	  }

	  var inheritanceChain = getInterfaceInheritanceChain(_interface),
	      methodsToBeImplemented = getInterfaceMethods(inheritanceChain),
	      i = void 0,
	      method = void 0,
	      length = methodsToBeImplemented.length;

	  for (i = 0; i < length; i++) {
	    method = methodsToBeImplemented[i];

	    if (object[method] === undefined || typeof object[method] !== 'function') {
	      return false;
	    }
	  }

	  return true;
	};

	var getInterfaceInheritanceChain = exports.getInterfaceInheritanceChain = function getInterfaceInheritanceChain(_interface, existingChain) {
	  var chain = existingChain || [],
	      extendsArray = void 0,
	      extendingInterface = void 0,
	      i = void 0,
	      length = void 0,
	      interfaceObject = $interfaces[_interface];

	  if (interfaceObject === undefined || (typeof interfaceObject === 'undefined' ? 'undefined' : _typeof(interfaceObject)) !== 'object') {
	    //		console.log('behaviorObject for interface is undefined ', interface );
	    return chain;
	  }

	  chain.push(_interface);
	  extendsArray = interfaceObject.extends;
	  if (extendsArray === undefined) {
	    //		console.log('extendsArray for interface is undefined, the chain ends here ', interface, chain);
	    return chain;
	  }

	  length = extendsArray.length;

	  for (i = 0; i < length; i++) {
	    extendingInterface = extendsArray[i];
	    if (chain.indexOf(extendingInterface) === -1) {
	      // We did not yet extend this interface, so continue to follow the chain
	      getInterfaceInheritanceChain(extendingInterface, chain);
	    }
	  }

	  return chain;
	};

	var getInterfaceMethods = exports.getInterfaceMethods = function getInterfaceMethods(interfaces) {
	  if (interfaces === undefined || !interfaces instanceof Array) {
	    // No valid input
	    return [];
	  }

	  var combinedInterfacesChain = [],
	      _interface = void 0,
	      i = void 0,
	      length = interfaces.length,
	      interfaceObject = void 0,
	      interfaceMethods = void 0,
	      j = void 0,
	      methodsLength = void 0,
	      method = void 0,
	      methods = [];

	  for (i = 0; i < length; i++) {
	    _interface = interfaces[i];
	    getInterfaceInheritanceChain(_interface, combinedInterfacesChain);
	  }

	  length = combinedInterfacesChain.length;
	  for (i = 0; i < length; i++) {
	    _interface = combinedInterfacesChain[i];
	    interfaceObject = $interfaces[_interface];
	    interfaceMethods = interfaceObject.methods;
	    if (interfaceObject !== undefined && (typeof interfaceObject === 'undefined' ? 'undefined' : _typeof(interfaceObject)) === 'object' && interfaceMethods !== undefined && interfaceMethods instanceof Array) {
	      methodsLength = interfaceMethods.length;
	      for (j = 0; j < methodsLength; j++) {
	        method = interfaceMethods[j];
	        if (methods.indexOf(method) === -1) {
	          methods.push(method);
	        }
	      }
	    }
	  }

	  return methods;
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _AutoBind = __webpack_require__(9);

	var _AutoBind2 = _interopRequireDefault(_AutoBind);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function TransitionCompleteDelegate(responder, status, behavior, navigator, transitionNamespace) {
	  this._responder = responder;
	  this._status = status;
	  this._behavior = behavior;
	  this._navigator = navigator;
	  this._transitionNamespace = transitionNamespace;
	  this._called = false;
	  (0, _AutoBind2.default)(this, this);
	}

	// PUBLIC API
	//  weak
	TransitionCompleteDelegate.prototype = {
	  call: function call() {
	    // console.log('TransitionCompleteDelegate -> call', this);
	    if (this._called) {
	      throw new Error('Illegal second call to transition complete. This instance is already prepared for garbage collection!');
	    }

	    this._called = true;
	    this._transitionNamespace.notifyComplete(this._responder, this._status, this._behavior);
	    this._responder = null;
	    this._navigator = null;
	    this._transitionNamespace = null;
	  }
	};

	exports.default = TransitionCompleteDelegate;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = autoBind;

	var _jquery = __webpack_require__(10);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//  weak
	function autoBind(object, context) {
	  var key = void 0;
	  var method = void 0;
	  for (key in object) {
	    method = object[key];
	    if (typeof method === 'function') {
	      object[key] = _jquery2.default.proxy(object[key], context);
	    }
	  }
	}

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _AutoBind = __webpack_require__(9);

	var _AutoBind2 = _interopRequireDefault(_AutoBind);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function ValidationPreparedDelegate(validatorResponder, truncatedState, fullState, navigator, validationNamespace) {
	  this._validatorResponder = validatorResponder;
	  this._truncatedState = truncatedState;
	  this._fullState = fullState;
	  this._navigator = navigator;
	  this._validationNamespace = validationNamespace;
	  (0, _AutoBind2.default)(this, this);
	}

	// PUBLIC API
	//  weak
	ValidationPreparedDelegate.prototype = {
	  call: function call() {
	    this._validationNamespace.notifyValidationPrepared(this._validatorResponder, this._truncatedState, this._fullState);
	    this._validatorResponder = null;
	    this._truncatedState = null;
	    this._fullState = null;
	    this._navigator = null;
	    this._validationNamespace = null;
	  }
	};

	exports.default = ValidationPreparedDelegate;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = autoBind;

	var _jquery = __webpack_require__(10);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//  weak
	function autoBind(object, context) {
	  var key = void 0;
	  var method = void 0;
	  for (key in object) {
	    method = object[key];
	    if (typeof method === 'function') {
	      object[key] = _jquery2.default.proxy(object[key], context);
	    }
	  }
	}

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	//  weak
	var ResponderLists = function ResponderLists() {
		this.validateByPath = {};
		this.updateByPath = {};
		this.swapByPath = {};
		this.showByPath = {};
		this.hideByPath = {};
		this.swappedBefore = {};

		this.all = [this.validateByPath, this.updateByPath, this.swapByPath, this.showByPath, this.hideByPath, this.swappedBefore];
	};

	// PUBLIC API
	ResponderLists.prototype = {
		validateByPath: null, // []
		updateByPath: null, // []
		swapByPath: null, // []
		showByPath: null, // []
		hideByPath: null, // []
		swappedBefore: null, // []
		all: null, // []

		toString: function toString() {
			var s = 'ResponderLists [',
			    variable = void 0,
			    list = void 0,
			    contents = void 0,
			    key = void 0;

			for (variable in this) {
				list = this[variable];

				if (this.all.indexOf(list) > -1) {
					contents = [];
					for (key in list) {
						contents.push('[' + key + ' = ' + list[key] + ']');
					}
					s += '\n\t[' + variable + ': ' + contents.join(', ') + '], ';
				}
			}

			s += ']';
			return s;
		}
	};

	exports.default = ResponderLists;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _AutoBind = __webpack_require__(9);

	var _AutoBind2 = _interopRequireDefault(_AutoBind);

	var _NavigatorEvent = __webpack_require__(6);

	var _Navigator = __webpack_require__(2);

	var _Navigator2 = _interopRequireDefault(_Navigator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	* History manager for the navigatorjs.Navigator
	*
	* @example
	*	<code>
	*
	*		// Create the normal navigator
	*		var navigator = new navigatorjs.Navigator();
	*
	*		// Create the history and supply the navigator it should manage
	*		var history = new navigatorjs.History(navigator);
	*
	*		// Navigate to states as you normally would
	*		navigator.request('/my/state');
	*
	*		// Go back in time
	*		history.back();
	*
	*	</code>
	*
	* @author Laurent van Dommelen
	* @created 11 oct 2013
	*
	* @param {navigatorjs.Navigator} navigator
	*/
	function History(navigator) {
	  // Bind the methods to this scope
	  (0, _AutoBind2.default)(this, this);
	  // Initialize the instance
	  this._initialize(navigator);
	}

	// Default max history length, don't change this,
	// change the maxLength instance property
	//  weak
	History.MAX_HISTORY_LENGTH = 100;

	// Navigation direction types
	History.DIRECTION_BACK = -1;
	History.DIRECTION_NORMAL = 0;
	History.DIRECTION_FORWARD = 1;

	/**
	* Instance properties
	*/
	History.prototype = {

	  // The navigator it is controlling
	  _navigator: null,

	  // The history, last state is at start of Array
	  _history: null,

	  // The current position in history
	  _historyPosition: 0,

	  // The navigator doesn't know anything about going forward or back.
	  // Therefore, we need to keep track of the direction.
	  // This is changed when the forward or back methods are called.
	  _navigationDirection: History.DIRECTION_NORMAL,

	  // The max number of history states
	  maxLength: History.MAX_HISTORY_LENGTH,

	  /**
	  * Create the history manager. When navigating back and forword, the history is maintained.
	  * It is truncated when navigating to a state naturally
	  *
	  * @param {navigatorjs.Navigator} navigator
	  * @param {Object} [options]
	  */
	  _initialize: function _initialize(navigator, options) {
	    // Setup the options
	    if (options) {
	      this.maxLength = options.maxLength || this.maxLength;
	    }

	    // Create the history array containing the NavigationState objects
	    this._history = [];

	    // Listen to changes on the navigator
	    this._navigator = navigator;
	    this._navigator.on(_NavigatorEvent.STATE_CHANGED, this._handleStateChange);
	  },


	  /**
	  * Go back in the history
	  *
	  * @param {Number} [steps=1] The number of steps to go back in history
	  * @return {Boolean} Returns false if there was no previous state
	  */
	  back: function back(steps) {
	    // Check if we know history
	    if (this._historyPosition === this._history.length - 1) {
	      return false;
	    }

	    // Set to 1 by default
	    steps = steps || 1;

	    // Set the history position and navigate to it
	    this._historyPosition = Math.min(this._history.length - 1, this._historyPosition + steps);
	    this._navigationDirection = History.DIRECTION_BACK;
	    this._navigateToCurrentHistoryPosition();
	    return true;
	  },


	  /**
	  * Go forward in the history
	  *
	  * @param {Number} [steps=1] The number of steps to go forward in history
	  * @return {Boolean} Returns false if there was no next state
	  */
	  forward: function forward(steps) {
	    if (this._historyPosition === 0) {
	      return false;
	    }

	    // Set to 1 by default
	    steps = steps || 1;

	    // Set the history position and navigate to it
	    this._historyPosition = Math.max(0, this._historyPosition - steps);
	    this._navigationDirection = History.DIRECTION_FORWARD;
	    this._navigateToCurrentHistoryPosition();
	    return true;
	  },


	  /**
	  * Go back in the history and return that NavigationState
	  *
	  * @param {Number} [steps=1] The number of steps to go back in history
	  * @return {navigatorjs.NavigationState} The found state or null if no state was found
	  */
	  getPreviousState: function getPreviousState(steps) {
	    // Cannot go beyond the first entry in history
	    if (this._history.length === 0 || this._historyPosition === Math.max(0, this._history.length - 1)) {
	      return null;
	    }

	    // Set to 1 by default
	    steps = steps || 1;

	    // Fetch the requested state in history
	    var position = Math.min(this._history.length - 1, Math.max(0, this._historyPosition + steps));
	    return this._history[position];
	  },


	  /**
	  * Go forward in the history and return that NavigationState
	  *
	  * @param {Number} [steps=1] The number of steps to go back in history
	  * @return {navigatorjs.NavigationState} The found state or null if no state was found
	  */
	  getNextState: function getNextState(steps) {
	    // Cannot look into the future
	    if (this._history.length === 0 || this._historyPosition === 0) {
	      return null;
	    }

	    // Set to 1 by default
	    steps = steps || 1;

	    // Fetch the requested state in history
	    var position = Math.max(0, this._historyPosition - steps);
	    return this._history[position];
	  },


	  /**
	  * Fetch the current NavigationState
	  *
	  * @return {navigatorjs.NavigationState}
	  */
	  getCurrentState: function getCurrentState() {
	    return this._history[this._historyPosition] || null;
	  },


	  /**
	  * Clear the navigation history
	  */
	  clearHistory: function clearHistory() {
	    this._history = [];
	    this._historyPosition = 1;
	  },


	  /**
	  * Get the full history
	  *
	  * @return {Array} List of navigatorjs.NavigationStates
	  */
	  all: function all() {
	    return this._history;
	  },


	  /**
	  * Get the state by historyposition
	  *
	  * @param {Number} position The position in history
	  * @return {navigatorjs.NavigationState} The found state or null if no state was found
	  */
	  getStateByPosition: function getStateByPosition(position) {
	    if (position < 0 || position > this._history.length - 1) {
	      return null;
	    }
	    return this._history[position];
	  },


	  /**
	  * Get the first occurence of a state in the history
	  *
	  * @param {navigatorjs.NavigationState} state The NavigationState in history
	  * @return {Number} The found position or false if not found
	  */
	  getPositionByState: function getPositionByState(state) {
	    return this.getPositionByPath(state.getPath());
	  },


	  /**
	  * Find the first occurence of the path in the history
	  *
	  * @param {String} path
	  * @return {Number} The index or false if not found
	  */
	  getPositionByPath: function getPositionByPath(path) {
	    var count = this.getLength();
	    for (var i = 0; i < count; i++) {
	      if (this._history[i].getPath() === path) {
	        return i;
	      }
	    }
	    return false;
	  },


	  /**
	  * Get the number of items in the history
	  *
	  * @return {Number}
	  */
	  getLength: function getLength() {
	    return this._history.length;
	  },


	  /**
	  * Tell the navigator to go the current historyPosition
	  */
	  _navigateToCurrentHistoryPosition: function _navigateToCurrentHistoryPosition() {
	    var newState = this._history[this._historyPosition];
	    this._navigator.request(newState);
	  },


	  /**
	  * Check what to do with the new state
	  *
	  * @param {Object} event
	  * @param {Object} update
	  */
	  _handleStateChange: function _handleStateChange(event, update) {
	    var state = update.state;

	    switch (this._navigationDirection) {

	      case History.DIRECTION_BACK:
	        this._navigationDirection = History.DIRECTION_NORMAL;
	        break;

	      case History.DIRECTION_NORMAL:

	        // Strip every history state before current
	        this._history.splice(0, this._historyPosition);

	        // Add the state at the beginning of the history array
	        this._history.unshift(state);
	        this._historyPosition = 0;

	        // Truncate the history to the max allowed items
	        this._history.length = Math.min(this._history.length, this.maxLength);
	        break;

	      case History.DIRECTION_FORWARD:
	        this._navigationDirection = History.DIRECTION_NORMAL;
	        break;
	      default:
	        break;
	    }
	  }
	};
	exports.default = History;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = bind;

	var _jquery = __webpack_require__(10);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function bind(functionOrArray, context) {
	  var bind = function bind(method, context) {
	    if (typeof method === 'function') {
	      _jquery2.default.proxy(method, context);
	    }
	  };

	  if (Array.isArray(functionOrArray)) {
	    var i = void 0,
	        length = functionOrArray.length;
	    for (i = 0; i < length; i++) {
	      bind(functionOrArray[i], context);
	    }
	  } else {
	    bind(functionOrArray, context);
	  }
	} //  weak

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _NavigationState = __webpack_require__(3);

	var _NavigationState2 = _interopRequireDefault(_NavigationState);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function StateCommandMap(navigator, injector) {
	  this._navigator = navigator;
	  this._injector = injector;
	  this._commandsByState = {};
	  this._verifiedCommandClasses = {};

	  // this._navigator.add(this, "");

	  this.initialize();
	} //  weak


	StateCommandMap.prototype = {
	  navigatorBehaviors: ['IHasStateValidationOptional', 'IHasStateUpdate'],

	  _navigator: null,
	  _injector: null,
	  _commandsByState: null, // {}
	  _verifiedCommandClasses: null, // {}

	  initialize: function initialize() {},
	  mapCommand: function mapCommand(stateOrPath, CommandClass, aExactMatch, aOneShot) {
	    var exactMatch = aExactMatch == undefined ? false : aExactMatch,
	        oneShot = aOneShot == undefined ? false : aOneShot,
	        state = _NavigationState2.default.make(stateOrPath),
	        commands = this._commandsByState[state.getPath()] || [];

	    this._commandsByState[state.getPath()] = commands;
	    this._navigator.add(this, state);

	    if (this._hasCommand(commands, CommandClass)) {
	      throw new Error('Already mapped ' + CommandClass + ' to state ' + state.getPath());
	    }

	    this._verifyCommandClass(CommandClass);

	    commands.push({ CommandClass: CommandClass, state: state, exactMatch: exactMatch, oneShot: oneShot });
	  },
	  unmapCommand: function unmapCommand(stateOrPath, CommandClass) {
	    var state = _NavigationState2.default.make(stateOrPath),
	        commands = this._commandsByState[state.getPath()] || [],
	        i = void 0,
	        wrapper = void 0;
	    this._commandsByState[state.getPath()] = commands;
	    this._navigator.remove(this, state);
	    for (i = commands.length; --i >= 0;) {
	      wrapper = commands[i];
	      if (wrapper.CommandClass === CommandClass) {
	        commands.splice(i, 1);
	        return;
	      }
	    }
	  },
	  willValidate: function willValidate(truncatedState, fullState) {
	    // will only validate if the state matches a command.
	    return this.validate(truncatedState, fullState);
	  },
	  validate: function validate(truncatedState, fullState) {
	    var path = void 0,
	        mappedState = void 0,
	        commands = void 0,
	        isExact = void 0,
	        i = void 0,
	        wrapper = void 0;

	    for (path in this._commandsByState) {
	      mappedState = _NavigationState2.default.make(path);

	      if (fullState.contains(mappedState)) {
	        commands = this._commandsByState[path];
	        isExact = fullState.equals(mappedState);

	        // reverse loop to accomodate for oneshot removal
	        i = commands.length;
	        for (i; --i >= 0;) {
	          wrapper = commands[i];
	          if (!isExact && wrapper.exactMatch) {
	            continue;
	          }
	          return true;
	        }
	      }
	    }

	    return false;
	  },
	  updateState: function updateState(truncatedState, fullState) {
	    var path = void 0,
	        mappedState = void 0,
	        commands = void 0,
	        isExact = void 0,
	        i = void 0,
	        wrapper = void 0,
	        command = void 0;

	    for (path in this._commandsByState) {
	      mappedState = _NavigationState2.default.make(path);
	      if (fullState.contains(mappedState)) {
	        commands = this._commandsByState[path];
	        isExact = fullState.equals(mappedState);

	        // reverse loop to accomodate for oneshot removal
	        i = commands.length;
	        for (i; --i >= 0;) {
	          wrapper = commands[i];
	          if (!isExact && wrapper.exactMatch) {
	            continue;
	          }

	          this._injector.map('fullState').toValue(fullState);
	          this._injector.map('truncatedState').toValue(fullState.subtract(wrapper.state));

	          command = new wrapper.CommandClass({ injector: this._injector });
	          command.execute();

	          this._injector.unmap('fullState');
	          this._injector.unmap('truncatedState');

	          if (wrapper.oneShot) {
	            this.unmapCommand(wrapper.state, wrapper.CommandClass);
	          }
	        }
	      }
	    }
	  },
	  _hasCommand: function _hasCommand(wrappedCommandsList, testForCommandClass) {
	    var i = void 0,
	        commandWrapper = void 0,
	        length = wrappedCommandsList.length;
	    for (i = 0; i < length; i++) {
	      commandWrapper = wrappedCommandsList[i];
	      if (commandWrapper.CommandClass == testForCommandClass) {
	        return true;
	      }
	    }
	    return false;
	  },
	  _verifyCommandClass: function _verifyCommandClass(CommandClass) {
	    if (this._verifiedCommandClasses[CommandClass]) {
	      return;
	    }
	    if (CommandClass.prototype.execute === undefined) {
	      throw new Error("Command doesn't implement an execute method - " + CommandClass);
	    }
	    this._verifiedCommandClasses[CommandClass] = true;
	  }
	};

	exports.default = StateCommandMap;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _reactDom = __webpack_require__(18);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _jquery = __webpack_require__(10);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _NavigatorEvent = __webpack_require__(6);

	var _ViewRecipe = __webpack_require__(19);

	var _ViewRecipe2 = _interopRequireDefault(_ViewRecipe);

	var _NavigationState = __webpack_require__(3);

	var _NavigationState2 = _interopRequireDefault(_NavigationState);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function StateViewMap(navigator, $root) {
	  this._navigator = navigator;
	  this._orderedRecipes = [];
	  this._$root = $root || (0, _jquery2.default)('body');

	  this._navigator.on(_NavigatorEvent.STATE_REQUESTED, this._handleStateRequested.bind(this));
	}

	// PUBLIC API
	//  weak
	StateViewMap.prototype = {
	  mapState: function mapState(statesOrPaths) {
	    var allArgumentsAsOneFlatArray = [];
	    allArgumentsAsOneFlatArray = allArgumentsAsOneFlatArray.concat.apply(allArgumentsAsOneFlatArray, arguments);
	    return this._addRecipe(allArgumentsAsOneFlatArray);
	  },

	  get$Root: function get$Root() {
	    return this._$root;
	  },

	  _addRecipe: function _addRecipe(statesOrPaths) {
	    var recipe = new _ViewRecipe2.default();

	    var i = void 0,
	        length = statesOrPaths.length;
	    for (i = 0; i < length; i++) {
	      recipe.addState(_NavigationState2.default.make(statesOrPaths[i]));
	    }

	    this._orderedRecipes.push(recipe);

	    return recipe;
	  },

	  _handleStateRequested: function _handleStateRequested(e, eventData) {
	    var requestedState = eventData.state,
	        index,
	        recipe,
	        recipeStates,
	        recipesLength = this._orderedRecipes.length,
	        j,
	        state,
	        statesLength,
	        viewInstance;

	    for (index = 0; index < recipesLength; index++) {
	      recipe = this._orderedRecipes[index];
	      recipeStates = recipe.getStates();
	      statesLength = recipeStates.length;

	      for (j = 0; j < statesLength; j++) {
	        state = recipeStates[j];

	        if (requestedState.contains(state)) {
	          this._addViewElementToDOM(recipe);
	          var viewInstance = recipe.getViewInstance();
	          if (Array.isArray(viewInstance.navigatorBehaviors)) {
	            this._navigator.add(viewInstance, state);
	          }
	        }
	      }
	    }
	  },

	  _addRecipeToParent: function _addRecipeToParent(parentRecipe, recipe) {
	    var $container = this._$root,
	        $inside = void 0,
	        $reactRoot = void 0,
	        insideSelector = recipe.getInsideSelector();
	    var _recipe = recipe;
	    if (parentRecipe) {
	      $container = parentRecipe.getRootEl();
	    }

	    if (insideSelector != null) {
	      $inside = $container.find(insideSelector);
	      $container = $inside.length > 0 ? $inside.first() : $container;
	    }

	    var additionType = '' + (parentRecipe ? parentRecipe._type : 'BACKBONE') + ' > ' + recipe._type;

	    switch (additionType) {
	      case 'BACKBONE > BACKBONE':
	        var i = this._orderedRecipes.indexOf(recipe) + 1,
	            length = this._orderedRecipes.length,
	            testRecipe;

	        for (i; i < length; i++) {
	          testRecipe = this._orderedRecipes[i];

	          // If any other views have the same parent, add this element before
	          // those elements in the container element

	          if (testRecipe.isInstantiated() && testRecipe.isMounted() && testRecipe.getRootEl().parent()[0] === $container[0]) {
	            testRecipe.getRootEl().before(recipe.getRootEl());
	            return;
	          }
	        }
	        $container.append(recipe.getRootEl());
	        break;

	      case 'BACKBONE > REACT':
	        $reactRoot = (0, _jquery2.default)(document.createElement('div'));
	        $reactRoot.addClass('react-root');
	        $container.append($reactRoot);
	        _reactDom2.default.render(recipe._viewInstance, $reactRoot[0]);

	        break;

	      case 'REACT > REACT':
	        parentRecipe._showChild(recipe);

	        // Find root react element
	        while (parentRecipe.getParentRecipe() && parentRecipe.getParentRecipe()._type === 'REACT') {
	          parentRecipe = parentRecipe.getParentRecipe();
	        }
	        // TODO: Batch this render call on state change
	        _reactDom2.default.render(parentRecipe._viewInstance, parentRecipe.getRootEl().parent()[0]);
	        break;
	      default:
	        console.error('Invalid recipe type combination: ' + additionType);
	        break;

	    }
	  },

	  _addViewElementToDOM: function _addViewElementToDOM(recipe) {
	    // If element for this view is already initialized and in the DOM

	    if (recipe.isMounted()) {
	      return;
	    }

	    if (!recipe.isInstantiated()) {
	      recipe.initialize();
	    }

	    // By default all views are added to default root element

	    var parentRecipe = recipe.getParentRecipe();

	    if (parentRecipe) {
	      // If parent view recipe has not been varructed, initialize
	      // the parent view and add it to the DOM correctly

	      if (!parentRecipe.isMounted()) {
	        this._addViewElementToDOM(parentRecipe);
	      }
	    }

	    this._addRecipeToParent(parentRecipe, recipe);
	  }
	};

	exports.default = StateViewMap;

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_18__;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _jquery = __webpack_require__(10);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _underscore = __webpack_require__(20);

	var _underscore2 = _interopRequireDefault(_underscore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//  weak
	var ReactRecipe = __webpack_require__(21);
	var BackboneRecipe = __webpack_require__(23);


	function ViewRecipe() {
		this._states = [];
		this._viewClass = null;
		this._viewArguments = [];
		this._viewInstance = null;
		this._insideSelector = null;
		this._parentRecipe = null;
		this._viewType = null;
	}

	// PUBLIC API
	ViewRecipe.prototype = {
		addState: function addState(navigationState) {
			var i = void 0,
			    existingState = void 0,
			    length = this._states.length;

			for (i = 0; i < length; i++) {
				existingState = this._states[i];

				if (existingState.getPath() === navigationState.getPath()) {
					return;
				}
			}

			this._states.push(navigationState);

			return this;
		},
		getStates: function getStates() {
			return this._states;
		},
		toView: function toView(viewClass) {
			this._viewClass = viewClass;

			_underscore2.default.extend(this, BackboneRecipe);

			return this;
		},
		toComponent: function toComponent(viewClass) {
			this._viewClass = viewClass;

			_underscore2.default.extend(this, ReactRecipe);

			return this;
		},
		getViewClass: function getViewClass() {
			return this._viewClass;
		},
		getViewInstance: function getViewInstance() {
			return this._viewInstance;
		},
		getRootEl: function getRootEl() {
			console.warn('Method getRootEl should be implemented by viewRecipe');
		},
		isMounted: function isMounted() {
			console.warn('Method isMounted should be implemented by viewRecipe');
		},
		isInstantiated: function isInstantiated() {
			return this._viewInstance != null;
		},
		withArguments: function withArguments() {
			if (arguments.length > 5) {
				throw new Error('Uncle Bob says you want to use too many arguments');
			}
			this._viewArguments = arguments;

			return this;
		},
		inside: function inside(selector) {
			this._insideSelector = selector;

			return this;
		},
		getInsideSelector: function getInsideSelector() {
			return this._insideSelector;
		},
		withParent: function withParent(parentRecipe) {
			this._parentRecipe = parentRecipe;
			return this;
		},
		getParentRecipe: function getParentRecipe() {
			return this._parentRecipe;
		}
	};

	exports.default = ViewRecipe;

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_20__;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//  weak
	var React = __webpack_require__(22);
	var ReactDOM = __webpack_require__(18);
	var _ = __webpack_require__(20);
	var $ = __webpack_require__(10);

	var ReactRecipe = {
	  _type: 'REACT',

	  // Children array so react element can render with
	  // correct child elements.

	  _children: [],

	  // Returns a fake proxy element due to the fact that
	  // we do not use these transition functions within
	  // our react components

	  getViewInstance: function getViewInstance() {
	    if (!this._refProxy) {
	      // Create proxy object to call methods on the react
	      // component instance (ref).  This allows us to queue
	      // the transition callbacks if the ref is not immediately
	      // available.

	      this._refProxy = {
	        navigatorBehaviors: this._viewClass.navigatorBehaviors,

	        transitionIn: function transitionIn(cb) {
	          if (this.isMounted()) {
	            this._ref.transitionIn(cb);
	          } else {
	            this._queuedTransitionIn = cb;
	          }
	        }.bind(this),

	        updateState: function updateState(truncated, full) {
	          if (this.isMounted()) {
	            if (this._ref.updateState) {
	              this._ref.updateState(truncated, full);
	            }
	          } else {
	            this._queuedStateUpdate = [truncated, full];
	          }
	        }.bind(this),

	        transitionOut: function transitionOut(cb) {
	          if (this.isMounted()) {
	            this._ref.transitionOut(cb);
	          } else {
	            this._queuedTransitionOut = cb;
	          }
	        }.bind(this)
	      };
	    }
	    return this._refProxy;
	  },

	  // Save reference to our react element instead of
	  // view instance like backbone recipe does

	  initialize: function initialize() {
	    var params = this._viewArguments;

	    var props = _.extend({
	      ref: function (c) {
	        this._ref = c;

	        if (this._queuedTransitionIn && this._ref.transitionIn) {
	          this._ref.transitionIn(this._queuedTransitionIn);
	          this._queuedTransitionIn = null;
	        }
	        if (this._queuedTransitionOut && this._ref.transitionOut) {
	          this._ref.transitionOut(this._queuedTransitionOut);
	          this._queuedTransitionOut = null;
	        }
	        if (this._queuedStateUpdate && this._ref.updateState) {
	          if (this._ref.updateState) {
	            this._ref.updateState(this._queuedStateUpdate[0], this._queuedStateUpdate[1]);
	          }
	          this._queuedStateUpdate = null;
	        }
	      }.bind(this)
	    }, params[0]);

	    this._viewInstance = React.createElement(this._viewClass, props, this._children.map(function (child) {
	      return child._viewInstance;
	    }));
	  },

	  // Use ReactDOM's findDOMNode method to find associated
	  // DOM node of the component reference

	  getRootEl: function getRootEl() {
	    return $(ReactDOM.findDOMNode(this._ref));
	  },

	  // Component is mounted if is not 'null'

	  isMounted: function isMounted() {
	    if (!this.isInstantiated()) {
	      this.initialize();
	    }

	    return !!this._ref;
	  },


	  // This method only exists on React recipes.  Adds a
	  // recipe to a list of children who will be rendered
	  // in this element's props.children

	  _showChild: function _showChild(child) {
	    if (this._children.indexOf(child) !== -1) {
	      return;
	    }
	    this._children.push(child);

	    if (!child.isInstantiated()) {
	      child.initialize();
	    }
	    this.initialize();
	  },


	  // Removes a child from this elements props.children
	  // and recreates element

	  _removeChild: function _removeChild(child) {
	    var childIndex = this._children.indexOf(child);
	    if (childIndex !== -1) {
	      this._children.splice(childIndex, 1);
	    }
	    this.initialize();
	  }
	};

	module.exports = ReactRecipe;

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_22__;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _jquery = __webpack_require__(10);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var BackboneRecipe = {
	  _type: 'BACKBONE',

	  initialize: function initialize() {
	    var params = this._viewArguments;

	    switch (params.length) {
	      default:
	      case 0:
	        this._viewInstance = new this._viewClass();
	        break;
	      case 1:
	        this._viewInstance = new this._viewClass(params[0]);
	        break;
	      case 2:
	        this._viewInstance = new this._viewClass(params[0], params[1]);
	        break;
	      case 3:
	        this._viewInstance = new this._viewClass(params[0], params[1], params[2]);
	        break;
	      case 4:
	        this._viewInstance = new this._viewClass(params[0], params[1], params[2], params[3]);
	        break;
	      case 5:
	        this._viewInstance = new this._viewClass(params[0], params[1], params[2], params[3], params[4]);
	        break;
	    }
	  },

	  isMounted: function isMounted() {
	    return this.isInstantiated() && _jquery2.default.contains(document.documentElement, this.getViewInstance().$el[0]);
	  },

	  getRootEl: function getRootEl() {
	    return this._viewInstance.$el;
	  }
	}; //  weak


	module.exports = BackboneRecipe;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jquery = __webpack_require__(10);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _NavigationResponderBehaviors = __webpack_require__(7);

	var NavigationResponderBehaviors = _interopRequireWildcard(_NavigationResponderBehaviors);

	var _TransitionStatus = __webpack_require__(5);

	var TransitionStatus = _interopRequireWildcard(_TransitionStatus);

	var _NavigatorEvent = __webpack_require__(6);

	var NavigatorEvent = _interopRequireWildcard(_NavigatorEvent);

	var _Navigator = __webpack_require__(2);

	var _Navigator2 = _interopRequireDefault(_Navigator);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _navigator = null,
	    _template = '<div class="debugConsole">Path: <input type="text" class="path" /><div class="pathRenderer"></div><div class="responders"><div class="names"></div><div class="status"></div></div></div>',
	    _visible = true,
	    _inputRegex = new RegExp('[-_/A-Za-z0-9]'),
	    _$el = null,
	    _$pathInput = null,
	    _$pathRenderer = null,
	    _$responders = null,
	    _$responderNames = null,
	    _$responderStatus = null,
	    _respondersByID = null,
	    _statusByResponderID = null;

	// Input keydown validation and requesting the entered path
	//  weak
	var _onKeyPress = function _onKeyPress(e) {
	  switch (e.which) {
	    case 13:
	      // Return
	      e.preventDefault(); // Prevent char from writing in textfield
	      _navigator.request(_$pathInput.val());
	      return;
	    case 8: // Backspace
	    case 0:
	      // Others such as arrows
	      return; // This can just be executed
	    default:
	      break;
	  }

	  var char = String.fromCharCode(e.which);
	  if (!_inputRegex.test(char)) {
	    e.preventDefault(); // Prevent char from writing in textfield
	  }

	  _autoSizeInput();
	};

	// Toggle showing debug console
	var _onWindowKeyPress = function _onWindowKeyPress(e) {
	  switch (String.fromCharCode(e.which)) {
	    case '~':
	    case '$':
	    case '`':
	      _visible = !_visible;
	      _$el.css({ display: _visible ? '' : 'none' });
	      break;
	  }
	};

	var _onResponderClick = function _onResponderClick(e) {
	  var responderID = (0, _jquery2.default)(e.target).data('responder-id');

	  console.log('Responder', _respondersByID[responderID]);
	};

	var _autoSizeInput = function _autoSizeInput() {
	  _$pathRenderer.text(_$pathInput.val());
	  _$pathInput.css({ width: _$pathRenderer.width() });
	};

	var _handleStatusUpdated = function _handleStatusUpdated(e, data) {
	  _respondersByID = data.respondersByID;
	  _statusByResponderID = data.statusByResponderID;
	  _updateDisplay();
	};

	var _updateDisplay = function _updateDisplay() {
	  var currentState = _navigator.getCurrentState(),
	      responderID = void 0,
	      responder = void 0,
	      status = void 0,
	      color = void 0,
	      responderNamesHTMLString = '',
	      responderStatusHTMLString = '';
	  if (!currentState) {
	    return;
	  }

	  _$pathInput.val(currentState.getPath());
	  _autoSizeInput();

	  for (responderID in _respondersByID) {
	    responder = _respondersByID[responderID];
	    status = _statusByResponderID[responderID];

	    if (NavigationResponderBehaviors.implementsBehaviorInterface(responder, 'IHasStateTransition') || NavigationResponderBehaviors.implementsBehaviorInterface(responder, 'IHasStateInitialization')) {
	      responderNamesHTMLString += '<span data-responder-id="' + responderID + '">' + _getResponderString(responder) + '</span><br />';
	      color = _getColorByStatus(status);
	      responderStatusHTMLString += '<span style=" color:' + color + '; font-weight:bold;" data-responder-id="' + responderID + '">' + TransitionStatus.toString(status) + '</span><br />';
	    }
	  }

	  _$responderNames.html(responderNamesHTMLString);
	  _$responderStatus.html(responderStatusHTMLString);
	};

	var _getResponderString = function _getResponderString(responder) {
	  var responderString = responder.toString();

	  if (responderString == '[object Object]' && responder.$el) {
	    var tagName = responder.$el.prop('tagName').toLowerCase(),
	        classes = responder.$el.attr('class').split(' ').join('.');

	    responderString = tagName + '.' + classes;
	  }

	  return responderString;
	};

	var _getColorByStatus = function _getColorByStatus(status) {
	  var color = '';
	  switch (status) {
	    case TransitionStatus.UNINITIALIZED:
	      color = '#AAAAAA';
	      break;
	    case TransitionStatus.INITIALIZED:
	      color = '#FFFFFF';
	      break;
	    case TransitionStatus.HIDDEN:
	      color = '#FF0000';
	      break;
	    case TransitionStatus.APPEARING:
	    case TransitionStatus.DISAPPEARING:
	      color = '#FFFF00';
	      break;
	    case TransitionStatus.SHOWN:
	      color = '#00FF00';
	      break;
	  }

	  return color;
	};

	var DebugConsole = function DebugConsole(navigator) {
	  _navigator = navigator;

	  _$el = (0, _jquery2.default)(_template);
	  _$pathInput = _$el.find('.path');
	  _$pathRenderer = _$el.find('.pathRenderer');
	  _$responders = _$el.find('.responders');
	  _$responderNames = _$responders.find('.names');
	  _$responderStatus = _$responders.find('.status');

	  // STYLING
	  _$el.css({
	    backgroundColor: '#000000',
	    color: '#AAAAAA',
	    fontFamily: 'Arial',
	    fontSize: 12,
	    padding: 5
	  });

	  _$pathInput.css({
	    color: '#00FF00',
	    backgroundColor: 'transparent',
	    fontFamily: 'Arial',
	    fontSize: 12,
	    minWidth: 200,
	    border: 0
	  });

	  _$pathRenderer.attr('style', _$pathInput.attr('style'));
	  _$pathRenderer.css({
	    position: 'absolute',
	    height: 0,
	    overflowY: 'hidden'
	  });

	  _$responderNames.css({
	    display: 'inline-block',
	    color: '#FF9900',
	    marginRight: 15
	  });

	  _$responderStatus.css({
	    display: 'inline-block'
	  });

	  _$pathInput.on('keypress', _onKeyPress);
	  (0, _jquery2.default)(window).on('keypress', _onWindowKeyPress);

	  _$responderNames.on('click', _onResponderClick);
	  _$responderStatus.on('click', _onResponderClick);

	  _navigator.on(NavigatorEvent.STATE_CHANGED, _handleStatusUpdated);
	  _navigator.on(NavigatorEvent.TRANSITION_STATUS_UPDATED, _handleStatusUpdated);
	};

	// PUBLIC API
	DebugConsole.prototype = {
	  get$El: function get$El() {
	    return _$el;
	  }
	};

	exports.default = DebugConsole;

/***/ }
/******/ ])
});
;