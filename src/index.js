// navigator-main
require('./navigator-js/Navigator');
require('./navigator-js/ResponderLists');
require('./navigator-js/AsynchResponders');
require('./navigator-js/History');
require('./navigator-js/NavigationBehaviors');
require('./navigator-js/NavigationResponderBehaviors');
require('./navigator-js/NavigationState');
require('./navigator-js/NavigatorEvent');

// utils
require('./navigator-js/utils/Bind');
require('./navigator-js/utils/AutoBind');

// transition
require('./navigator-js/transition/TransitionCompleteDelegate');
require('./navigator-js/transition/TransitionStatus');
require('./navigator-js/transition/ValidationPreparedDelegate');

// polyfills
require('./navigator-js/polyfills/array');

// integration
require('./navigator-js/integration/StateCommandMap');
require('./navigator-js/integration/StateUrlSyncer');
require('./navigator-js/integration/StateViewMap');
require('./navigator-js/integration/ViewRecipe');

// features
require('./navigator-js/features/DebugConsole');

module.exports = navigatorjs;
