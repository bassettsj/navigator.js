// @flow
import $ from 'jquery';

export default function bind(functionOrArray, context) {
  const bind = function (method, context) {
    if (typeof method === 'function') {
      $.proxy(method, context);
    }
  };

  if (typeof functionOrArray === 'array') {
    let i, length = functionOrArray.length;
    for (i = 0; i < length; i++) {
      bind(functionOrArray[i], context);
    }
  } else {
    bind(functionOrArray, context);
  }
}
