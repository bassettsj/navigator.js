// @flow weak
import NavigationState from './NavigationState';
import * as NavigationBehaviors from './NavigationBehaviors';
import * as TransitionStatus from './transition/TransitionStatus';
import * as NavigatorEvent from './NavigatorEvent';
import * as NavigationResponderBehaviors from './NavigationResponderBehaviors';
import AsynchResponders from './AsynchResponders';
import TransitionCompleteDelegate from './transition/TransitionCompleteDelegate';
import ValidationPreparedDelegate from './transition/ValidationPreparedDelegate';
import autoBind from './utils/AutoBind';
import ResponderLists from './ResponderLists';
import $ from 'jquery';
//
let _$eventDispatcher = null;
// internal namespaces
const _flow = {};
const _transition = {};
const _validation = {};
const _hidden = {};
//
let _currentState = null;
let _previousState = null;
let _defaultState = null;
let _isTransitioning = false;
//
let _responders = null; // new ResponderLists();
let _respondersByID = null; // {};
let _statusByResponderID = null; // {};
let _redirects = null;
let _disappearingAsynchResponders = null;
let _appearingAsynchResponders = null;
let _swappingAsynchResponders = null;
let _validatingAsynchResponders = null;
let _preparedValidatingAsynchRespondersStack = null;
let _inlineRedirectionState = null;
//
let _asyncInvalidated = false;
let _asyncValidated = false;
let _asyncValidationOccurred = false;
let _responderIDCount = 0;

const _modify = function (addition, responder, pathsOrStates, behaviorString) {
  if (_relayModification(addition, responder, pathsOrStates, behaviorString)) {
    return;
  }

    // Using the path variable as dictionary key to break instance referencing.
  let path = NavigationState.make(pathsOrStates).getPath(),
    list, matchingInterface;

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
    const index = list.indexOf(responder);
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

let _relayModification = function (addition, responder, pathsOrStates, behaviorString) {
  if (!responder) {
    throw new Error('add: responder is null');
  }

  let i, length;

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
const _hasRegisteredResponder = function (state, optionalInterface) {
  let i, length = _responders.all.length,
    j, respondersLength, responder,
    responders, respondersForPath, path;

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

const _request = function (pathOrState) {
  if (pathOrState === null) {
        // logger.error("Requested a null state. Aborting request.");
    return;
  }
  let requestedState,
    path,
    fromState,
    toState;

    // Store and possibly mask the requested state
  requestedState = NavigationState.make(pathOrState);
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
      fromState = new NavigationState(path);
      if (fromState.equals(requestedState)) {
        toState = NavigationState.make(_redirects[path]);
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

let _performRequestCascade = function (requestedState, startAsyncValidation) {
  if (!_defaultState) { throw new Error('No default state set. Call start() before the first request!'); }
    // Request cascade starts here.
    //
    //		console.groupEnd();
    //		console.group('_performRequestCascade', requestedState.getPath(), startAsyncValidation);
  if (requestedState.getPath() === _defaultState.getPath() && !_defaultState.hasWildcard()) {
        //			console.log('exact match');
        // Exact match on default state bypasses validation.
    _grantRequest(_defaultState);
  } else if (_asyncValidationOccurred && (_asyncValidated && !_asyncInvalidated)) {
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

let _grantRequest = function (state) {
  _asyncInvalidated = false;
  _asyncValidated = false;
  _previousState = _currentState;
  _currentState = state;

  _notifyStateChange(_currentState);

  _flow.startTransition();
};

let _notifyStateChange = function (state) {
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

  _disappearingAsynchResponders = new AsynchResponders();
  _disappearingAsynchResponders.addResponders(_flow.transitionOut());

  if (!_disappearingAsynchResponders.isBusy()) {
    _flow.performUpdates();
  }
};

_flow.transitionOut = function () {
  let respondersToShow = _getRespondersToShow(),
    responderID,
    responder,
    waitForResponders = [],
    i;

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
        responder.transitionOut(new TransitionCompleteDelegate(responder, TransitionStatus.HIDDEN, NavigationBehaviors.HIDE, this, _transition).call);
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

  let path, state, list, i, responder;

  for (path in _responders.updateByPath) {
            // create a state object for comparison:
    state = new NavigationState(path);

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
  _appearingAsynchResponders = new AsynchResponders();
  _appearingAsynchResponders.addResponders(_flow.transitionIn());

  if (!_appearingAsynchResponders.isBusy()) {
    _flow.startSwapOut();
  }
};

_flow.transitionIn = function () {
  let respondersToShow = _getRespondersToShow(),
    respondersToWaitFor = [],
    responder,
    status,
    i;

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
      responder.transitionIn(new TransitionCompleteDelegate(responder, TransitionStatus.SHOWN, NavigationBehaviors.SHOW, this, _transition).call);
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
  _swappingAsynchResponders = new AsynchResponders();
  _swappingAsynchResponders.addResponders(_flow.swapOut());

  if (!_swappingAsynchResponders.isBusy()) {
    _flow.swapIn();
  }
};

_flow.swapOut = function () {
  _appearingAsynchResponders.reset();

  let waitForResponders = [],
    path, state,
    swapByPathList,
    responder,
    i,
    truncatedState;

  for (path in _responders.swapByPath) {
            // create a state object for comparison:
    state = new NavigationState(path);

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
          responder.swapOut(new TransitionCompleteDelegate(responder, TransitionStatus.SHOWN, NavigationBehaviors.SWAP, this, _transition).call);
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

  let path,
    state,
    swapByPathList,
    responder,
    truncatedState,
    i;

  for (path in _responders.swapByPath) {
            // create a state object for comparison:
    state = new NavigationState(path);

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

  let asynchResponders,
    callbackMethod;

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
  if (_statusByResponderID[responder.__navigatorjs.id]) { return true; }

  let respondersByPath,
    existingResponders,
    i, j;

  for (i = 0; i < _responders.all.length; i++) {
    respondersByPath = _responders.all[i];
    for (j = 0; j < respondersByPath.length; j++) {
      existingResponders = respondersByPath[j];
      if (existingResponders.indexOf(responder) >= 0) { return true; }
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
  let list = {},
    path,
    knownPaths = [];

  list[_defaultState.getPath()] = true;

  for (path in _responders.showByPath) {
    list[new NavigationState(path).getPath()] = true;
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

let _validateFirstValidatingAsynchResponderFromStack = function () {
  if (_preparedValidatingAsynchRespondersStack.length === 0) {
    return false;
  }

  const preparedResponder = _preparedValidatingAsynchRespondersStack.shift();
  preparedResponder.responder.prepareValidation(preparedResponder.remainderState, preparedResponder.unvalidatedState, preparedResponder.callOnPrepared);

  return true;
};


let _validate = function (stateToValidate, allowRedirection, allowAsyncValidation) {
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
    _validatingAsynchResponders = new AsynchResponders();
    _preparedValidatingAsynchRespondersStack = [];
  }

  implicit = _validateImplicitly(unvalidatedState);
        //		console.groupCollapsed('Responders');

        // TODO should we order the states? As mapping a validating child state before a invalidating parent state will validate the state
  for (path in _responders.validateByPath) {
            //			console.log(path);
            // create a state object for comparison:
    state = new NavigationState(path);

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

            callOnPrepared = new ValidationPreparedDelegate(responder, remainderState, unvalidatedState, this, _validation).call;
            _validatingAsynchResponders.addResponder(responder);
            _preparedValidatingAsynchRespondersStack.push({ responder, remainderState, unvalidatedState, callOnPrepared });

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

  if (!implicit) {
            //			console.log("validate - Validation failed. No validators or transitions matched the requested ", unvalidatedState);
            // logger.warn("Validation failed. No validators or transitions matched the requested " + unvalidatedState);
  }

        //		console.log("validate - return with the implicit return value", implicit);

  return implicit;
};

let _validateImplicitly = function (state) {
  let path;
  for (path in _responders.showByPath) {
    if (new NavigationState(path).equals(state)) {
                // info("Validation passed based on transition responder.");
      return true;
    }
  }

  return false;
};

let _getRespondersToShow = function () {
  let respondersToShow = _getResponderList(_responders.showByPath, _currentState),
    respondersToHide = _getResponderList(_responders.hideByPath, _currentState),
    i,
    hideResponder,
    hideIndex;

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

let _initializeIfNeccessary = function (responderList) {
  let i, responder;
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

let _getResponderList = function (listObj, state) {
  let responders = [],
    path;

  for (path in listObj) {
    if (state.contains(new NavigationState(path))) {
      responders = responders.concat(listObj[path]);
    }
  }

  return responders;
};

const Navigator = function () {
  autoBind(this, this);

  _$eventDispatcher = $({});
  _currentState = null;
  _responders = new ResponderLists();
  _respondersByID = {};
  _statusByResponderID = {};
  _redirects = null;
  _responderIDCount = 0;
};


    // PUBLIC API
Navigator.prototype = {
  add(responder, pathsOrStates, behaviorString) {
    _modify(true, responder, pathsOrStates, behaviorString);
  },

  remove(responder, pathsOrStates, behaviorString) {
    _modify(false, responder, pathsOrStates, behaviorString);
  },

  registerRedirect(fromStateOrPath, toStateOrPath) {
    _redirects = _redirects || {};
    _redirects[NavigationState.make(fromStateOrPath).getPath()] = NavigationState.make(toStateOrPath);
  },

  start(defaultStateOrPath, startStateOrPath) {
    _defaultState = NavigationState.make(defaultStateOrPath || '');

    this.request(startStateOrPath || _defaultState);
  },

  request(pathOrState) {
    _request(pathOrState);
  },

  getCurrentState() {
    if (!_currentState) {
      if (_defaultState) {
        return _defaultState.clone();
      }

      return null;
    }

    return _currentState.clone();
  },

  isTransitioning() {
    return _isTransitioning;
  },

  on(event, handler) {
    _$eventDispatcher.on(event, handler);
    return this;
  },

  off(event, handler) {
    _$eventDispatcher.off(event, handler);
    return this;
  }
};

export default Navigator;
