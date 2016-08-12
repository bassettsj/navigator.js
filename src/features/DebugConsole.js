// @flow weak
import $ from 'jquery';
import * as NavigationResponderBehaviors from '../NavigationResponderBehaviors';
import * as TransitionStatus from '../transition/TransitionStatus';
import * as NavigatorEvent from '../NavigatorEvent';
import Navigator from '../Navigator';

let _navigator = null,
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
const _onKeyPress = function (e) {
  switch (e.which) {
    case 13: // Return
      e.preventDefault(); // Prevent char from writing in textfield
      _navigator.request(_$pathInput.val());
      return;
    case 8: // Backspace
    case 0: // Others such as arrows
      return; // This can just be executed
    default:
        break;
  }

  const char = String.fromCharCode(e.which);
  if (!_inputRegex.test(char)) {
    e.preventDefault(); // Prevent char from writing in textfield
  }

  _autoSizeInput();
};

// Toggle showing debug console
const _onWindowKeyPress = function (e) {
  switch (String.fromCharCode(e.which)) {
    case '~':
    case '$':
    case '`':
      _visible = !_visible;
      _$el.css({ display: _visible ? '' : 'none' });
      break;
  }
};

const _onResponderClick = function (e) {
  const responderID = $(e.target).data('responder-id');

  console.log('Responder', _respondersByID[responderID]);
};

let _autoSizeInput = function () {
  _$pathRenderer.text(_$pathInput.val());
  _$pathInput.css({ width: _$pathRenderer.width() });
};

const _handleStatusUpdated = function (e, data) {
  _respondersByID = data.respondersByID;
  _statusByResponderID = data.statusByResponderID;
  _updateDisplay();
};

let _updateDisplay = function () {
  let currentState = _navigator.getCurrentState(),
    responderID, responder, status, color, responderNamesHTMLString = '', responderStatusHTMLString = '';
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

let _getResponderString = function (responder) {
  let responderString = responder.toString();

  if (responderString == '[object Object]' && responder.$el) {
    let tagName = responder.$el.prop('tagName').toLowerCase(),
      classes = responder.$el.attr('class').split(' ').join('.');

    responderString = tagName + '.' + classes;
  }

  return responderString;
};

let _getColorByStatus = function (status) {
  let color = '';
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

const DebugConsole = function (navigator: Navigator) {
  _navigator = navigator;

  _$el = $(_template);
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
  $(window).on('keypress', _onWindowKeyPress);

  _$responderNames.on('click', _onResponderClick);
  _$responderStatus.on('click', _onResponderClick);

  _navigator.on(NavigatorEvent.STATE_CHANGED, _handleStatusUpdated);
  _navigator.on(NavigatorEvent.TRANSITION_STATUS_UPDATED, _handleStatusUpdated);
};

// PUBLIC API
DebugConsole.prototype = {
  get$El() { return _$el; }
};

export default DebugConsole;
