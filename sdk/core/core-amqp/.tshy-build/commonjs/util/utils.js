"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timeout = exports.defaultCancellableLock = void 0;
exports.parseConnectionString = parseConnectionString;
exports.delay = delay;
exports.isLoopbackAddress = isLoopbackAddress;
exports.randomNumberFromInterval = randomNumberFromInterval;
exports.executePromisesSequentially = executePromisesSequentially;
exports.isIotHubConnectionString = isIotHubConnectionString;
exports.isString = isString;
exports.isNumber = isNumber;
const lock_js_1 = require("./lock.js");
const core_util_1 = require("@azure/core-util");
/**
 * Parses the connection string and returns an object of type T.
 *
 * Connection strings have the following syntax:
 *
 * ConnectionString ::= `Part { ";" Part } [ ";" ] [ WhiteSpace ]`
 * Part             ::= [ PartLiteral [ "=" PartLiteral ] ]
 * PartLiteral      ::= [ WhiteSpace ] Literal [ WhiteSpace ]
 * Literal          ::= ? any sequence of characters except ; or = or WhiteSpace ?
 * WhiteSpace       ::= ? all whitespace characters including `\r` and `\n` ?
 *
 * @param connectionString - The connection string to be parsed.
 * @returns ParsedOutput<T>.
 */
function parseConnectionString(connectionString) {
    const output = {};
    const parts = connectionString.trim().split(";");
    for (let part of parts) {
        part = part.trim();
        if (part === "") {
            // parts can be empty
            continue;
        }
        const splitIndex = part.indexOf("=");
        if (splitIndex === -1) {
            throw new Error("Connection string malformed: each part of the connection string must have an `=` assignment.");
        }
        const key = part.substring(0, splitIndex).trim();
        if (key === "") {
            throw new Error("Connection string malformed: missing key for assignment");
        }
        const value = part.substring(splitIndex + 1).trim();
        output[key] = value;
    }
    return output;
}
/**
 * The cancellable async lock instance.
 */
exports.defaultCancellableLock = new lock_js_1.CancellableAsyncLockImpl();
/**
 * @internal
 *
 * Describes a Timeout class that can wait for the specified amount of time and then resolve/reject
 * the promise with the given value.
 */
class Timeout {
    set(t, value) {
        return new Promise((resolve, reject) => {
            this.clear();
            const callback = value ? () => reject(new Error(`${value}`)) : resolve;
            this._timer = setTimeout(callback, t);
        });
    }
    clear() {
        if (this._timer) {
            clearTimeout(this._timer);
        }
    }
    wrap(promise, t, value) {
        const wrappedPromise = this._promiseFinally(promise, () => this.clear());
        const timer = this.set(t, value);
        return Promise.race([wrappedPromise, timer]);
    }
    _promiseFinally(promise, fn) {
        const success = (result) => {
            fn();
            return result;
        };
        const error = (e) => {
            fn();
            return Promise.reject(e);
        };
        return Promise.resolve(promise).then(success, error);
    }
    static set(t, value) {
        return new Timeout().set(t, value);
    }
    static wrap(promise, t, value) {
        return new Timeout().wrap(promise, t, value);
    }
}
exports.Timeout = Timeout;
/**
 * A wrapper for setTimeout that resolves a promise after t milliseconds.
 * @param delayInMs - The number of milliseconds to be delayed.
 * @param abortSignal - The abortSignal associated with containing operation.
 * @param abortErrorMsg - The abort error message associated with containing operation.
 * @param value - The value to be resolved with after a timeout of t milliseconds.
 * @returns - Resolved promise
 */
async function delay(delayInMs, abortSignal, abortErrorMsg, value) {
    await (0, core_util_1.delay)(delayInMs, {
        abortSignal: abortSignal,
        abortErrorMsg: abortErrorMsg,
    });
    if (value !== undefined) {
        return value;
    }
}
/**
 * Checks if an address is localhost.
 * @param address - The address to check.
 * @returns true if the address is localhost, false otherwise.
 */
function isLoopbackAddress(address) {
    return /^(.*:\/\/)?(127\.[\d.]+|[0:]+1|localhost)/.test(address.toLowerCase());
}
/**
 * @internal
 *
 * Generates a random number between the given interval
 * @param min - Min number of the range (inclusive).
 * @param max - Max number of the range (inclusive).
 */
function randomNumberFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
/**
 * @internal
 *
 * Executes an array of promises sequentially. Inspiration of this method is here:
 * https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html. An awesome blog on promises!
 *
 * @param promiseFactories - An array of promise factories(A function that return a promise)
 *
 * @param kickstart - Input to the first promise that is used to kickstart the promise chain.
 * If not provided then the promise chain starts with undefined.
 *
 * @returns A chain of resolved or rejected promises
 */
function executePromisesSequentially(promiseFactories, kickstart) {
    let result = Promise.resolve(kickstart);
    promiseFactories.forEach((promiseFactory) => {
        result = result.then(promiseFactory);
    });
    return result;
}
/**
 * @internal
 *
 * Determines whether the given connection string is an iothub connection string.
 * @param connectionString - The connection string.
 * @returns boolean.
 */
function isIotHubConnectionString(connectionString) {
    connectionString = String(connectionString);
    let result = false;
    const model = parseConnectionString(connectionString);
    if (model && model.HostName && model.SharedAccessKey && model.SharedAccessKeyName) {
        result = true;
    }
    return result;
}
/**
 * @internal
 */
function isString(s) {
    return typeof s === "string";
}
/**
 * @internal
 */
function isNumber(n) {
    return typeof n === "number";
}
//# sourceMappingURL=utils.js.map