// @flow
import autoBind from '../utils/AutoBind';

function TransitionCompleteDelegate(responder, status, behavior, navigator, transitionNamespace) {
  this._responder = responder;
  this._status = status;
  this._behavior = behavior;
  this._navigator = navigator;
  this._transitionNamespace = transitionNamespace;
  this._called = false;
  autoBind(this, this);
}

// PUBLIC API
TransitionCompleteDelegate.prototype = {
  call() {
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

export default TransitionCompleteDelegate;
