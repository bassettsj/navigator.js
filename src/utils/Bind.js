// @flow weak
import $ from 'jquery';

export default function bind(functionOrArray: Function | Array<*>, context) {
  const bind = function (method, context) {
    if (typeof method === 'function') {
      $.proxy(method, context);
    }
  };

  if (Array.isArray(functionOrArray)) {
    let i, length = functionOrArray.length;
    for (i = 0; i < length; i++) {
      bind(functionOrArray[i], context);
    }
  } else {
    bind(functionOrArray, context);
  }
}
