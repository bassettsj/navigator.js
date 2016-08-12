// @flow weak
import $ from 'jquery';

export default function bind(functionOrArray: Function | Array<*>, context: any) {
    const bindFunc = function (method, _context) {
        if (typeof method === 'function') {
            $.proxy(method, _context);
        }
    };

    if (Array.isArray(functionOrArray)) {
        const length = functionOrArray.length;
        for (let i = 0; i < length; i++) {
            bindFunc(functionOrArray[i], context);
        }
    } else {
        bindFunc(functionOrArray, context);
    }
}
