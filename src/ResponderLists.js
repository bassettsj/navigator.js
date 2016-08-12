// @flow weak
export default class ResponderLists {
    validateByPath: Object;
    updateByPath: Object;
    swapByPath: Object;
    showByPath: Object;
    hideByPath: Object;
    swappedBefore: Object;
    all: Array<Object>;

    constructor() {
        this.validateByPath = {};
        this.updateByPath = {};
        this.swapByPath = {};
        this.showByPath = {};
        this.hideByPath = {};
        this.swappedBefore = {};

        this.all = [
            this.validateByPath,
            this.updateByPath,
            this.swapByPath,
            this.showByPath,
            this.hideByPath,
            this.swappedBefore
        ];
    }
    toString() {
        let s = 'ResponderLists [';
        let variable;
        let list;
        let contents;
        let key;

        for (variable in this) {
            list = this[variable];

            if (this.all.indexOf(list) > -1) {
                contents = [];
                for (key in list) {
                    contents.push('[' + key + ' = ' + list[key] + ']');
                }
                s += '\n\t[' + variable + ': ' + contents.join(', ') + '], ';
            }
        }

        s += ']';
        return s;
    }
}
