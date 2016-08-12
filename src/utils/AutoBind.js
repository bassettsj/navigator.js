import $ from 'jquery';
// @flow weak
export default function autoBind(object, context) {
  let key;
  let method;
  for (key in object) {
    method = object[key];
    if (typeof method === 'function') {
      object[key] = $.proxy(object[key], context);
    }
  }
}
