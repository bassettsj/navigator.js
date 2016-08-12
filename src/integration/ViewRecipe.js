var ReactRecipe = require('./ReactRecipe');
var BackboneRecipe = require('./BackboneRecipe');

this.navigatorjs = this.navigatorjs || {};
this.navigatorjs.integration = this.navigatorjs.integration || {};

(function() {
	var ViewRecipe = function() {
		this._states = [];
		this._viewClass = null;
		this._viewArguments = [];
		this._viewInstance = null;
		this._insideSelector = null;
		this._parentRecipe = null;
		this._viewType = null;
	};

	//PUBLIC API
	ViewRecipe.prototype = {

		addState: function(navigationState) {
			var i, existingState, length = this._states.length;

			for (i = 0; i < length; i++) {
				existingState = this._states[i];

				if (existingState.getPath() === navigationState.getPath()) {
					return;
				}
			}

			this._states.push(navigationState);

			return this;
		},

		getStates: function() {
			return this._states;
		},

		toView: function(viewClass) {
			this._viewClass = viewClass;

			_.extend(this, BackboneRecipe);

			return this;
		},

		toComponent: function (viewClass) {
			this._viewClass = viewClass;

			_.extend(this, ReactRecipe);

			return this;
		},

		getViewClass: function() {
			return this._viewClass;
		},

		getViewInstance: function() {
			return this._viewInstance;
		},

		getRootEl: function() {
			console.warn('Method getRootEl should be implemented by viewRecipe');
		},

		isMounted: function() {
			console.warn('Method isMounted should be implemented by viewRecipe');
		},

		isInstantiated: function() {
			return this._viewInstance != null;
		},

		withArguments: function() {
			if (arguments.length > 5) {
				throw new Error("Uncle Bob says you want to use too many arguments");
			}
			this._viewArguments = arguments;

			return this;
		},

		inside: function(selector) {
			this._insideSelector = selector;

			return this;
		},

		getInsideSelector: function() {
			return this._insideSelector;
		},

		withParent: function(parentRecipe) {
			this._parentRecipe = parentRecipe;
			return this;
		},

		getParentRecipe: function() {
			return this._parentRecipe;
		}
	};

	navigatorjs.integration.ViewRecipe = ViewRecipe;

}());
