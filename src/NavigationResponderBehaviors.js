// @flow weak
export const IHasStateInitialization = { name: 'IHasStateInitialization', methods: ['initializeByNavigator'] };
export const IHasStateValidation = { name: 'IHasStateValidation', methods: ['validate'] };
export const IHasStateValidationAsync = { name: 'IHasStateValidationAsync', extends: ['IHasStateValidation'], methods: ['prepareValidation'] };
export const IHasStateValidationOptional = { name: 'IHasStateValidationOptional', extends: ['IHasStateValidation'], methods: ['willValidate'] };
export const IHasStateValidationOptionalAsync = { name: 'IHasStateValidationOptionalAsync', extends: ['IHasStateValidationAsync', 'IHasStateValidationOptional'], methods: [] };
export const IHasStateRedirection = { name: 'IHasStateRedirection', extends: ['IHasStateValidation'], methods: ['redirect'] };
export const IHasStateSwap = { name: 'IHasStateSwap', methods: ['willSwapToState', 'swapOut', 'swapIn'] };
export const IHasStateTransition = { name: 'IHasStateTransition', methods: ['transitionIn', 'transitionOut'] };
export const IHasStateUpdate = { name: 'IHasStateUpdate', methods: ['updateState'] };

const $interfaces = {
    IHasStateInitialization,
    IHasStateValidation,
    IHasStateValidationAsync,
    IHasStateValidationOptional,
    IHasStateValidationOptionalAsync,
    IHasStateRedirection,
    IHasStateSwap,
    IHasStateTransition,
    IHasStateUpdate,
};
export const implementsBehaviorInterface = function (object, _interface) {
  if (object.navigatorBehaviors === undefined || !object.navigatorBehaviors instanceof Array) {
        // The input interface is not set on object's navigatorBehaviors.
    return false;
  }

  let inheritanceChain = getInterfaceInheritanceChain(_interface),
    methodsToBeImplemented = getInterfaceMethods(inheritanceChain),
    i, method,
    length = methodsToBeImplemented.length;

  for (i = 0; i < length; i++) {
    method = methodsToBeImplemented[i];

    if (object[method] === undefined || typeof object[method] !== 'function') {
      return false;
    }
  }

  return true;
};

export const getInterfaceInheritanceChain = function (_interface, existingChain) {
  let chain = existingChain || [],
    extendsArray,
    extendingInterface,
    i, length,
    interfaceObject = $interfaces[_interface]

  if (interfaceObject === undefined || typeof interfaceObject !== 'object') {
        //		console.log('behaviorObject for interface is undefined ', interface );
    return chain;
  }

  chain.push(_interface);
  extendsArray = interfaceObject.extends;
  if (extendsArray === undefined) {
        //		console.log('extendsArray for interface is undefined, the chain ends here ', interface, chain);
    return chain;
  }

  length = extendsArray.length;

  for (i = 0; i < length; i++) {
    extendingInterface = extendsArray[i];
    if (chain.indexOf(extendingInterface) === -1) {
            // We did not yet extend this interface, so continue to follow the chain
      getInterfaceInheritanceChain(extendingInterface, chain);
    }
  }

  return chain;
};

export const getInterfaceMethods = function (interfaces) {
  if (interfaces === undefined || !interfaces instanceof Array) {
        // No valid input
    return [];
  }

  let combinedInterfacesChain = [],
    _interface, i,
    length = interfaces.length,
    interfaceObject,
    interfaceMethods,
    j, methodsLength, method,
    methods = [];

  for (i = 0; i < length; i++) {
    _interface = interfaces[i];
    getInterfaceInheritanceChain(_interface, combinedInterfacesChain);
  }

  length = combinedInterfacesChain.length;
  for (i = 0; i < length; i++) {
    _interface = combinedInterfacesChain[i];
    interfaceObject = $interfaces[_interface];
    interfaceMethods = interfaceObject.methods;
    if (interfaceObject !== undefined && typeof interfaceObject === 'object' && interfaceMethods !== undefined && interfaceMethods instanceof Array) {
      methodsLength = interfaceMethods.length;
      for (j = 0; j < methodsLength; j++) {
        method = interfaceMethods[j];
        if (methods.indexOf(method) === -1) {
          methods.push(method);
        }
      }
    }
  }

  return methods;
};
