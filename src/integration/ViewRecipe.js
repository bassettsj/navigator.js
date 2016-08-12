// @flow weak
const ReactRecipe = require('./ReactRecipe');
const BackboneRecipe = require('./BackboneRecipe');
import $ from 'jquery';
import _ from 'underscore';

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

		                                                                                                                                            addState(navigationState) {
			                                                                                                                                          let i, existingState, length = this._states.length;

			                                                                                                                                            for (i = 0; i < length; i++) {
				                                                                                                                                            existingState = this._states[i];

				                                                                                                                                            if (existingState.getPath() === navigationState.getPath()) {
					                                                                                                                                            return;
				}
			}

			                                                                                                                                            this._states.push(navigationState);

			                                                                                                                                            return this;
		},

		                                                                                                                                            getStates() {
			                                                                                                                                            return this._states;
		},

		                                                                                                                                            toView(viewClass) {
			                                                                                                                                            this._viewClass = viewClass;

			                                                                                                                                            _.extend(this, BackboneRecipe);

			                                                                                                                                            return this;
		},

		                                                                                                                                            toComponent(viewClass) {
			                                                                                                                                            this._viewClass = viewClass;

			                                                                                                                                            _.extend(this, ReactRecipe);

			                                                                                                                                            return this;
		},

		                                                                                                                                            getViewClass() {
			                                                                                                                                            return this._viewClass;
		},

		                                                                                                                                            getViewInstance() {
			                                                                                                                                            return this._viewInstance;
		},

		                                                                                                                                            getRootEl() {
			                                                                                                                                            console.warn('Method getRootEl should be implemented by viewRecipe');
		},

		                                                                                                                                            isMounted() {
			                                                                                                                                            console.warn('Method isMounted should be implemented by viewRecipe');
		},

		                                                                                                                                            isInstantiated() {
			                                                                                                                                            return this._viewInstance != null;
		},

		                                                                                                                                            withArguments() {
			                                                                                                                                            if (arguments.length > 5) {
				                                                                                                                                            throw new Error('Uncle Bob says you want to use too many arguments');
			}
			                                                                                                                                            this._viewArguments = arguments;

			                                                                                                                                            return this;
		},

		                                                                                                                                            inside(selector) {
			                                                                                                                                            this._insideSelector = selector;

			                                                                                                                                            return this;
		},

		                                                                                                                                            getInsideSelector() {
			                                                                                                                                            return this._insideSelector;
		},

		                                                                                                                                            withParent(parentRecipe) {
			                                                                                                                                            this._parentRecipe = parentRecipe;
			                                                                                                                                            return this;
		},

		                                                                                                                                            getParentRecipe() {
			                                                                                                                                            return this._parentRecipe;
		}
	};

export default ViewRecipe;
