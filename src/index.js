// @flow weak
import AsynchResponders from './AsynchResponders';
import Navigator from './Navigator';
import ResponderLists from './ResponderLists';
import History from './History';
import * as NavigationBehaviors from './NavigationBehaviors';
import * as NavigationResponderBehaviors from './NavigationResponderBehaviors';
import NavigationState from './NavigationState';
import * as NavigatorEvent from './NavigatorEvent';
import Bind from './utils/Bind';
import AutoBind from './utils/AutoBind';
import TransitionCompleteDelegate from './transition/TransitionCompleteDelegate';
import * as TransitionStatus from './transition/TransitionStatus';
import ValidationPreparedDelegate from './transition/ValidationPreparedDelegate';
import StateCommandMap from './integration/StateCommandMap';
import StateUrlSyncer from './integration/StateUrlSyncer';
import StateViewMap from './integration/StateViewMap';
import ViewRecipe from './integration/ViewRecipe';
import DebugConsole from './features/DebugConsole';

const utils = Object.freeze({
    Bind,
    AutoBind,
});
const transition = Object.freeze({
    TransitionCompleteDelegate,
    TransitionStatus,
    ValidationPreparedDelegate,
});
const integration = Object.freeze({
    StateCommandMap,
    StateUrlSyncer,
    StateViewMap,
    ViewRecipe,
});
const features = Object.freeze({
    DebugConsole,
});

// navigator-main
const navigatorjs = Object.freeze({
    AsynchResponders,
    Navigator,
    ResponderLists,
    History,
    NavigationBehaviors,
    NavigationResponderBehaviors,
    NavigationState,
    NavigatorEvent,
    utils,
    transition,
    integration,
    features,
});

module.exports = navigatorjs;
