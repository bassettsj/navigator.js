// @flow weak
import NavigationState from '../NavigationState';
import Navigator from '../Navigator';

export default class StateCommandMap {
    constructor(navigator: Navigator, injector: any) {
        this._navigator = navigator;
        this._injector = injector;
        this._commandsByState = {};
        this._verifiedCommandClasses = {};
    }
    _navigator: Navigator;
    _injector: any;
    _commandsByState: Object;
    _verifiedCommandClasses: Object;
    navigatorBehaviors = ['IHasStateValidationOptional', 'IHasStateUpdate'];

    mapCommand(stateOrPath, CommandClass, aExactMatch, aOneShot) {
        const exactMatch = aExactMatch === undefined ? false : aExactMatch;
        const oneShot = aOneShot === undefined ? false : aOneShot;
        const state = NavigationState.make(stateOrPath);
        const commands = this._commandsByState[state.getPath()] || [];

        this._commandsByState[state.getPath()] = commands;
        this._navigator.add(this, state);

        if (this._hasCommand(commands, CommandClass)) {
            throw new Error(`Already mapped ${CommandClass} to state ${state.getPath()}`);
        }

        this._verifyCommandClass(CommandClass);

        commands.push({ CommandClass, state, exactMatch, oneShot });
    }

    unmapCommand(stateOrPath, CommandClass) {
        const state = NavigationState.make(stateOrPath);
        const commands = this._commandsByState[state.getPath()] || [];
        let i;
        let wrapper;
        this._commandsByState[state.getPath()] = commands;
        this._navigator.remove(this, state);
        for (i = commands.length; --i >= 0;) {
            wrapper = commands[i];
            if (wrapper.CommandClass === CommandClass) {
                commands.splice(i, 1);
                return;
            }
        }
    }

    willValidate(truncatedState, fullState) {
        // will only validate if the state matches a command.
        return this.validate(truncatedState, fullState);
    }

    validate(truncatedState, fullState) {
        let path;
        let mappedState;
        let commands;
        let isExact;
        let i;
        let wrapper;

        for (path in this._commandsByState) {
            mappedState = NavigationState.make(path);

            if (fullState.contains(mappedState)) {
                commands = this._commandsByState[path];
                isExact = fullState.equals(mappedState);

                // reverse loop to accomodate for oneshot removal
                i = commands.length;
                for (i; --i >= 0;) {
                    wrapper = commands[i];
                    if (!isExact && wrapper.exactMatch) {
                        continue; // eslint-disable-line no-continue
                    }
                    return true;
                }
            }
        }

        return false;
    }

    updateState(truncatedState, fullState) {
        let path;
        let mappedState;
        let commands;
        let isExact;
        let i;
        let wrapper;
        let command;

        for (path in this._commandsByState) {
            mappedState = NavigationState.make(path);
            if (fullState.contains(mappedState)) {
                commands = this._commandsByState[path];
                isExact = fullState.equals(mappedState);

                // reverse loop to accomodate for oneshot removal
                i = commands.length;
                for (i; --i >= 0;) {
                    wrapper = commands[i];
                    if (!isExact && wrapper.exactMatch) {
                        continue; // eslint-disable-line no-continue
                    }

                    this._injector.map('fullState').toValue(fullState);
                    this._injector.map('truncatedState').toValue(fullState.subtract(wrapper.state));

                    command = new wrapper.CommandClass({ injector: this._injector });
                    command.execute();

                    this._injector.unmap('fullState');
                    this._injector.unmap('truncatedState');

                    if (wrapper.oneShot) {
                        this.unmapCommand(wrapper.state, wrapper.CommandClass);
                    }
                }
            }
        }
    }

    _hasCommand(wrappedCommandsList, testForCommandClass) {
        let i;
        let commandWrapper;
        const length = wrappedCommandsList.length;
        for (i = 0; i < length; i++) {
            commandWrapper = wrappedCommandsList[i];
            if (commandWrapper.CommandClass === testForCommandClass) {
                return true;
            }
        }
        return false;
    }

    _verifyCommandClass(CommandClass) {
        if (this._verifiedCommandClasses[CommandClass]) {
            return;
        }
        if (CommandClass.prototype.execute === undefined) {
            throw new Error(`Command doesn't implement an execute method - ${CommandClass}`);
        }
        this._verifiedCommandClasses[CommandClass] = true;
    }
}
