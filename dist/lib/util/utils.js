"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var uuid = require("uuid");
var FormData = require("form-data");
var webResource_1 = require("../webResource");
var constants_1 = require("./constants");
var restError_1 = require("../restError");
var httpOperationResponse_1 = require("../httpOperationResponse");
/**
 * Provides the fetch() method based on the environment.
 * @returns {fetch} fetch - The fetch() method available in the environment to make requests
 */
function getFetch() {
    // using window.Fetch in Edge gives a TypeMismatchError
    // (https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8546263/).
    // Hence we will be using the fetch-ponyfill for Edge.
    if (typeof window !== "undefined" && window.fetch && window.navigator &&
        window.navigator.userAgent && window.navigator.userAgent.indexOf("Edge/") === -1) {
        return window.fetch.bind(window);
    }
    return require("fetch-ponyfill")({ useCookie: true }).fetch;
}
exports.getFetch = getFetch;
/**
 * A constant that provides the fetch() method based on the environment.
 */
exports.myFetch = getFetch();
/**
 * A constant that indicates whether the environment is node.js or browser based.
 */
exports.isNode = typeof navigator === "undefined" && typeof process !== "undefined";
/**
 * Checks if a parsed URL is HTTPS
 *
 * @param {object} urlToCheck The url to check
 * @return {boolean} True if the URL is HTTPS; false otherwise.
 */
function urlIsHTTPS(urlToCheck) {
    return urlToCheck.protocol.toLowerCase() === constants_1.Constants.HTTPS;
}
exports.urlIsHTTPS = urlIsHTTPS;
/**
 * Checks if a value is null or undefined.
 *
 * @param {object} value The value to check for null or undefined.
 * @return {boolean} True if the value is null or undefined, false otherwise.
 */
// TODO: Audit the usages of this and remove them.
// Read: https://medium.com/@basarat/null-vs-undefined-in-typescript-land-dc0c7a5f240a
// https://github.com/Microsoft/TypeScript/issues/7426
function objectIsNull(value) {
    return value === null || value === undefined;
}
exports.objectIsNull = objectIsNull;
/**
 * Encodes an URI.
 *
 * @param {string} uri The URI to be encoded.
 * @return {string} The encoded URI.
 */
function encodeUri(uri) {
    return encodeURIComponent(uri)
        .replace(/!/g, "%21")
        .replace(/"/g, "%27")
        .replace(/\(/g, "%28")
        .replace(/\)/g, "%29")
        .replace(/\*/g, "%2A");
}
exports.encodeUri = encodeUri;
/**
 * Returns a stripped version of the Http Response which only contains body,
 * headers and the status.
 *
 * @param {nodeFetch.Response} response - The Http Response
 *
 * @return {object} strippedResponse - The stripped version of Http Response.
 */
function stripResponse(response) {
    var strippedResponse = {};
    strippedResponse.body = response.body;
    strippedResponse.headers = response.headers;
    strippedResponse.status = response.status;
    return strippedResponse;
}
exports.stripResponse = stripResponse;
/**
 * Returns a stripped version of the Http Request that does not contain the
 * Authorization header.
 *
 * @param {object} request - The Http Request object
 *
 * @return {object} strippedRequest - The stripped version of Http Request.
 */
function stripRequest(request) {
    var strippedRequest = new webResource_1.WebResource();
    try {
        strippedRequest = JSON.parse(JSON.stringify(request));
        if (strippedRequest.headers && strippedRequest.headers.Authorization) {
            delete strippedRequest.headers.Authorization;
        }
        else if (strippedRequest.headers && strippedRequest.headers.authorization) {
            delete strippedRequest.headers.authorization;
        }
    }
    catch (err) {
        var errMsg = err.message;
        err.message = "Error - \"" + errMsg + "\" occured while creating a stripped version of the request object - \"" + request + "\".";
        return err;
    }
    return strippedRequest;
}
exports.stripRequest = stripRequest;
/**
 * Validates the given uuid as a string
 *
 * @param {string} uuid - The uuid as a string that needs to be validated
 *
 * @return {boolean} result - True if the uuid is valid; false otherwise.
 */
function isValidUuid(uuid) {
    var validUuidRegex = new RegExp("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$", "ig");
    return validUuidRegex.test(uuid);
}
exports.isValidUuid = isValidUuid;
/**
 * Provides an array of values of an object. For example
 * for a given object { "a": "foo", "b": "bar" }, the method returns ["foo", "bar"].
 *
 * @param {object} obj - An object whose properties need to be enumerated so that it"s values can be provided as an array
 *
 * @return {array} result - An array of values of the given object.
 */
function objectValues(obj) {
    var result = [];
    if (obj && obj instanceof Object) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                result.push(obj[key]);
            }
        }
    }
    else {
        throw new Error("The provided object " + JSON.stringify(obj, undefined, 2) + " is not a valid object that can be " +
            "enumerated to provide its values as an array.");
    }
    return result;
}
exports.objectValues = objectValues;
/**
 * Generated UUID
 *
 * @return {string} RFC4122 v4 UUID.
 */
function generateUuid() {
    return uuid.v4();
}
exports.generateUuid = generateUuid;
/*
 * Executes an array of promises sequentially. Inspiration of this method is here:
 * https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html. An awesome blog on promises!
 *
 * @param {Array} promiseFactories An array of promise factories(A function that return a promise)
 *
 * @param {any} [kickstart] Input to the first promise that is used to kickstart the promise chain.
 * If not provided then the promise chain starts with undefined.
 *
 * @return A chain of resolved or rejected promises
 */
function executePromisesSequentially(promiseFactories, kickstart) {
    var result = Promise.resolve(kickstart);
    promiseFactories.forEach(function (promiseFactory) {
        result = result.then(promiseFactory);
    });
    return result;
}
exports.executePromisesSequentially = executePromisesSequentially;
/*
 * Merges source object into the target object
 * @param {object} source The object that needs to be merged
 *
 * @param {object} target The object to be merged into
 *
 * @returns {object} target - Returns the merged target object.
 */
function mergeObjects(source, target) {
    Object.keys(source).forEach(function (key) {
        target[key] = source[key];
    });
    return target;
}
exports.mergeObjects = mergeObjects;
/**
 * A wrapper for setTimeout that resolves a promise after t milliseconds.
 * @param {number} t - The number of milliseconds to be delayed.
 * @param {T} value - The value to be resolved with after a timeout of t milliseconds.
 * @returns {Promise<T>} - Resolved promise
 */
function delay(t, value) {
    return new Promise(function (resolve) { return setTimeout(function () { return resolve(value); }, t); });
}
exports.delay = delay;
/**
 * Utility function to create a K:V from a list of strings
 */
function strEnum(o) {
    /* tslint:disable:no-null-keyword */
    return o.reduce(function (res, key) {
        res[key] = key;
        return res;
    }, Object.create(null));
    /* tslint:enable:no-null-keyword */
}
exports.strEnum = strEnum;
/**
 * Converts a Promise to a callback.
 * @param {Promise<any>} promise - The Promise to be converted to a callback
 * @returns {Function} fn - A function that takes the callback (cb: Function): void
 */
function promiseToCallback(promise) {
    if (typeof promise.then !== "function") {
        throw new Error("The provided input is not a Promise.");
    }
    return function (cb) {
        promise.then(function (data) {
            process.nextTick(cb, undefined, data);
        }, function (err) {
            process.nextTick(cb, err);
        });
    };
}
exports.promiseToCallback = promiseToCallback;
/**
 * Converts a Promise to a service callback.
 * @param {Promise<HttpOperationResponse>} promise - The Promise of HttpOperationResponse to be converted to a service callback
 * @returns {Function} fn - A function that takes the service callback (cb: ServiceCallback<T>): void
 */
function promiseToServiceCallback(promise) {
    if (typeof promise.then !== "function") {
        throw new Error("The provided input is not a Promise.");
    }
    return function (cb) {
        promise.then(function (data) {
            process.nextTick(cb, undefined, data.bodyAsJson, data.request, data.response);
        }, function (err) {
            process.nextTick(cb, err);
        });
    };
}
exports.promiseToServiceCallback = promiseToServiceCallback;
/**
 * Sends the request and returns the received response.
 * @param {WebResource} options - The request to be sent.
 * @returns {Promise<HttpOperationResponse} operationResponse - The response object.
 */
function dispatchRequest(options) {
    return __awaiter(this, void 0, void 0, function () {
        var formData, requestForm_1, appendFormValue, formKey, formValue, j, res, err_1, operationResponse, _a, err_2, msg, errCode, e, msg, errCode, e;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!options) {
                        return [2 /*return*/, Promise.reject(new Error("options (WebResource) cannot be null or undefined and must be of type object."))];
                    }
                    if (options.formData) {
                        formData = options.formData;
                        requestForm_1 = new FormData();
                        appendFormValue = function (key, value) {
                            if (value && value.hasOwnProperty("value") && value.hasOwnProperty("options")) {
                                requestForm_1.append(key, value.value, value.options);
                            }
                            else {
                                requestForm_1.append(key, value);
                            }
                        };
                        for (formKey in formData) {
                            if (formData.hasOwnProperty(formKey)) {
                                formValue = formData[formKey];
                                if (formValue instanceof Array) {
                                    for (j = 0; j < formValue.length; j++) {
                                        appendFormValue(formKey, formValue[j]);
                                    }
                                }
                                else {
                                    appendFormValue(formKey, formValue);
                                }
                            }
                        }
                        options.body = requestForm_1;
                        options.formData = undefined;
                        if (options.headers && options.headers["Content-Type"] &&
                            options.headers["Content-Type"].indexOf("multipart/form-data") > -1 && typeof requestForm_1.getBoundary === "function") {
                            options.headers["Content-Type"] = "multipart/form-data; boundary=" + requestForm_1.getBoundary();
                        }
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, exports.myFetch(options.url, options)];
                case 2:
                    res = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _b.sent();
                    return [2 /*return*/, Promise.reject(err_1)];
                case 4:
                    operationResponse = new httpOperationResponse_1.HttpOperationResponse(options, res);
                    if (!!options.rawResponse) return [3 /*break*/, 9];
                    _b.label = 5;
                case 5:
                    _b.trys.push([5, 7, , 8]);
                    _a = operationResponse;
                    return [4 /*yield*/, res.text()];
                case 6:
                    _a.bodyAsText = _b.sent();
                    return [3 /*break*/, 8];
                case 7:
                    err_2 = _b.sent();
                    msg = "Error \"" + err_2 + "\" occured while converting the raw response body into string.";
                    errCode = err_2.code || "RAWTEXT_CONVERSION_ERROR";
                    e = new restError_1.RestError(msg, errCode, res.status, options, res, res.body);
                    return [2 /*return*/, Promise.reject(e)];
                case 8:
                    try {
                        if (operationResponse.bodyAsText) {
                            operationResponse.bodyAsJson = JSON.parse(operationResponse.bodyAsText);
                        }
                    }
                    catch (err) {
                        msg = "Error \"" + err + "\" occured while executing JSON.parse on the response body - " + operationResponse.bodyAsText + ".";
                        errCode = err.code || "JSON_PARSE_ERROR";
                        e = new restError_1.RestError(msg, errCode, res.status, options, res, operationResponse.bodyAsText);
                        return [2 /*return*/, Promise.reject(e)];
                    }
                    _b.label = 9;
                case 9: return [2 /*return*/, Promise.resolve(operationResponse)];
            }
        });
    });
}
exports.dispatchRequest = dispatchRequest;
/**
 * Applies the properties on the prototype of sourceCtors to the prototype of targetCtor
 * @param {object} targetCtor The target object on which the properties need to be applied.
 * @param {Array<object>} sourceCtors An array of source objects from which the properties need to be taken.
 */
function applyMixins(targetCtor, sourceCtors) {
    sourceCtors.forEach(function (sourceCtors) {
        Object.getOwnPropertyNames(sourceCtors.prototype).forEach(function (name) {
            targetCtor.prototype[name] = sourceCtors.prototype[name];
        });
    });
}
exports.applyMixins = applyMixins;
//# sourceMappingURL=utils.js.map