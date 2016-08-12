var React = require('react');
var ReactDOM = require('react-dom');

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
    return this._refProxy
  },

  // Save reference to our react element instead of
  // view instance like backbone recipe does

  initialize: function initialize() {
    var params = this._viewArguments;

    var props = _.extend(
      {
        ref: function(c) {
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
              this._ref.updateState(
                this._queuedStateUpdate[0],
                this._queuedStateUpdate[1]
              );
            }
            this._queuedStateUpdate = null;
          }
        }.bind(this)
      },
      params[0]
    )

    this._viewInstance = React.createElement(
      this._viewClass,
      props,
      this._children.map(
        function(child) {
          return child._viewInstance;
        }
      )
    );
  },

  // Use ReactDOM's findDOMNode method to find associated
  // DOM node of the component reference

  getRootEl: function getRootEl() {
    return $(ReactDOM.findDOMNode(this._ref));
  },

  // Component is mounted if is not 'null'

  isMounted: function() {
    if (!this.isInstantiated()) {
      this.initialize();
    }

    return !!this._ref;
  },

  // This method only exists on React recipes.  Adds a
  // recipe to a list of children who will be rendered
  // in this element's props.children

  _showChild: function(child) {
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

  _removeChild: function(child) {
    var childIndex = this._children.indexOf(child);
    if (childIndex !== -1) {
      this._children.splice(childIndex, 1);
    }
    this.initialize();
  }
};

module.exports = ReactRecipe;
