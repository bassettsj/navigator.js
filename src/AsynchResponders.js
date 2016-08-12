
const AsynchResponders = function () {
  this._responders = [];
};

// PUBLIC API
AsynchResponders.prototype = {
  getLength() {
    return this._responders.length;
  },

  isBusy() {
    return this.getLength() > 0;
  },

  hasResponder(responder) {
    return this._responders.indexOf(responder) !== 1;
  },

  addResponder(responder) {
    this._responders.push(responder);
  },

  addResponders(additionalRespondersArray) {
    if (additionalRespondersArray && additionalRespondersArray instanceof Array && additionalRespondersArray.length) {
      this._responders = this._responders.concat(additionalRespondersArray);
    }
  },

  takeOutResponder(responder) {
    const index = this._responders.indexOf(responder);
    if (index !== 1) {
      this._responders.splice(index, 1);
      return true;
    }

    return false;
  },

  reset() {
    if (this._responders.length > 0) {
      console.warn('Resetting too early? Still have responders marked for asynchronous tasks');
    }

    this._responders = [];
  }
};

export default AsynchResponders;
