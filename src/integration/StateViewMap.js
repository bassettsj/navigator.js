// @flow weak
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { STATE_REQUESTED } from '../NavigatorEvent';
import ViewRecipe from './ViewRecipe';
import NavigationState from '../NavigationState';

function StateViewMap(navigator, $root) {
    this._navigator = navigator;
    this._orderedRecipes = [];
    this._$root = $root || $('body');

    this._navigator.on(STATE_REQUESTED, this._handleStateRequested.bind(this));
}

  // PUBLIC API
StateViewMap.prototype = {
    mapState: function mapState(statesOrPaths) {
        let allArgumentsAsOneFlatArray = [];
        allArgumentsAsOneFlatArray = allArgumentsAsOneFlatArray.concat.apply(allArgumentsAsOneFlatArray, arguments);
        return this._addRecipe(allArgumentsAsOneFlatArray);
    },

    get$Root: function get$Root() {
        return this._$root;
    },

    _addRecipe: function _addRecipe(statesOrPaths) {
        const recipe = new ViewRecipe();

        let i, length = statesOrPaths.length;
        for (i = 0; i < length; i++) {
            recipe.addState(NavigationState.make(statesOrPaths[i]));
        }

        this._orderedRecipes.push(recipe);

        return recipe;
    },

    _handleStateRequested: function _handleStateRequested(e, eventData) {
        var requestedState = eventData.state,
            index, recipe, recipeStates, recipesLength = this._orderedRecipes.length,
            j, state, statesLength,
            viewInstance;

        for (index = 0; index < recipesLength; index++) {
            recipe = this._orderedRecipes[index];
            recipeStates = recipe.getStates();
            statesLength = recipeStates.length;

            for (j = 0; j < statesLength; j++) {
                state = recipeStates[j];

                if (requestedState.contains(state)) {
                    this._addViewElementToDOM(recipe);
                    var viewInstance = recipe.getViewInstance();
                    if (Array.isArray(viewInstance.navigatorBehaviors)) {
                        this._navigator.add(viewInstance, state);
                    }
                }
            }
        }
    },

    _addRecipeToParent: function _addRecipeToParent(parentRecipe, recipe) {
        let $container = this._$root,
            $inside, $reactRoot,
            insideSelector = recipe.getInsideSelector();
        const _recipe = recipe;
        if (parentRecipe) {
            $container = parentRecipe.getRootEl();
        }

        if (insideSelector != null) {
            $inside = $container.find(insideSelector);
            $container = $inside.length > 0 ? $inside.first() : $container;
        }

        const additionType = '' + (parentRecipe ? parentRecipe._type : 'BACKBONE') + ' > ' + recipe._type;

        switch (additionType) {
            case 'BACKBONE > BACKBONE':
                var i = this._orderedRecipes.indexOf(recipe) + 1,
                    length = this._orderedRecipes.length,
                    testRecipe;

                for (i; i < length; i++) {
                    testRecipe = this._orderedRecipes[i];

            // If any other views have the same parent, add this element before
            // those elements in the container element

                    if (testRecipe.isInstantiated() && testRecipe.isMounted() && testRecipe.getRootEl().parent()[0] === $container[0]) {
                        testRecipe.getRootEl().before(recipe.getRootEl());
                        return;
                    }
                }
                $container.append(recipe.getRootEl());
                break;

            case 'BACKBONE > REACT':
                $reactRoot = $(document.createElement('div'));
                $reactRoot.addClass('react-root');
                $container.append($reactRoot);
                ReactDOM.render(recipe._viewInstance, $reactRoot[0]);

                break;

            case 'REACT > REACT':
                parentRecipe._showChild(recipe);

          // Find root react element
                while (parentRecipe.getParentRecipe() && parentRecipe.getParentRecipe()._type === 'REACT') {
                    parentRecipe = parentRecipe.getParentRecipe();
                }
          // TODO: Batch this render call on state change
                ReactDOM.render(
            parentRecipe._viewInstance,
            parentRecipe.getRootEl().parent()[0]
          );
                break;
            default:
                console.error('Invalid recipe type combination: ' + additionType);
                break;

        }
    },

    _addViewElementToDOM: function _addViewElementToDOM(recipe) {
      // If element for this view is already initialized and in the DOM

        if (recipe.isMounted()) {
            return;
        }

        if (!recipe.isInstantiated()) {
            recipe.initialize();
        }


      // By default all views are added to default root element

        const parentRecipe = recipe.getParentRecipe();

        if (parentRecipe) {
        // If parent view recipe has not been varructed, initialize
        // the parent view and add it to the DOM correctly

            if (!parentRecipe.isMounted()) {
                this._addViewElementToDOM(parentRecipe);
            }
        }

        this._addRecipeToParent(parentRecipe, recipe);
    }
};

export default StateViewMap;
