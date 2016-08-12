var BackboneRecipe = {
  _type: 'BACKBONE',

  initialize: function initialize() {
    var params = this._viewArguments;

    switch (params.length) {
      default:
      case 0:
      this._viewInstance = new this._viewClass();
      break;
      case 1:
      this._viewInstance = new this._viewClass(params[0]);
      break;
      case 2:
      this._viewInstance = new this._viewClass(params[0], params[1]);
      break;
      case 3:
      this._viewInstance = new this._viewClass(params[0], params[1], params[2]);
      break;
      case 4:
      this._viewInstance = new this._viewClass(params[0], params[1], params[2], params[3]);
      break;
      case 5:
      this._viewInstance = new this._viewClass(params[0], params[1], params[2], params[3], params[4]);
      break;
    }
  },

  isMounted: function isMounted() {
    return this.isInstantiated() &&
      $.contains(
        document.documentElement,
        this.getViewInstance().$el[0]
      );
  },

  getRootEl: function getRootEl() {
    return this._viewInstance.$el;
  }
};

module.exports = BackboneRecipe;
