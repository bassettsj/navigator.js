// @flow weak
import autoBind from '../utils/AutoBind';

function ValidationPreparedDelegate(validatorResponder, truncatedState, fullState, navigator, validationNamespace) {
  this._validatorResponder = validatorResponder;
  this._truncatedState = truncatedState;
  this._fullState = fullState;
  this._navigator = navigator;
  this._validationNamespace = validationNamespace;
  autoBind(this, this);
}

// PUBLIC API
ValidationPreparedDelegate.prototype = {
  call() {
    this._validationNamespace.notifyValidationPrepared(this._validatorResponder, this._truncatedState, this._fullState);
    this._validatorResponder = null;
    this._truncatedState = null;
    this._fullState = null;
    this._navigator = null;
    this._validationNamespace = null;
  }
};

export default ValidationPreparedDelegate;
