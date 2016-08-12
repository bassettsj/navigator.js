var BackboneRecipe = require('../../../src/integration/BackboneRecipe');
var jQuery = require('jquery');

describe('Backbone Recipe', function() {
	var ViewRecipe = navigatorjs.integration.ViewRecipe;
	var viewRecipe;

	beforeEach(function() {
		viewRecipe = new ViewRecipe();
		viewRecipe.toView(Backbone.View.extend());
	});

	afterEach(function() {
		document.body.innerHTML = '';
	});

  it('should have a type', function() {
    expect(typeof BackboneRecipe._type).toBe('string');
  });

	it('should return a jQuery object', function() {
		viewRecipe.initialize();
		expect(viewRecipe.getRootEl() instanceof $).toBe(true);
		expect(viewRecipe._viewInstance.$el).toEqual(viewRecipe.getRootEl());
	});

	it('should call isInstantiated', function() {
		spyOn(viewRecipe, 'isInstantiated').and.callThrough();
		viewRecipe.isMounted();
		expect(viewRecipe.isInstantiated).toHaveBeenCalled();
	});

	it('should return false if not isInstantiated', function() {
		spyOn(viewRecipe, 'isInstantiated').and.returnValue(false);
		expect(viewRecipe.isMounted()).toBe(false);
	});

	it('should return true if and only if view element is in the DOM', function() {
		viewRecipe.initialize();
		expect(viewRecipe.isMounted()).toBe(false);

		document.body.appendChild(viewRecipe._viewInstance.$el[0]);
		expect(viewRecipe.isMounted()).toBe(true);
	});

	it('should create a view instance', function() {
		var MyViewClass = function MyViewClass() {};
		viewRecipe._viewClass = MyViewClass;
		viewRecipe.initialize();

		expect(viewRecipe._viewInstance instanceof MyViewClass).toBe(true);
	});
});
