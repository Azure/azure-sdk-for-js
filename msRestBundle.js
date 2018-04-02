var msRest =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
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
var uuid = __webpack_require__(18);
var FormData = __webpack_require__(21);
var webResource_1 = __webpack_require__(3);
var constants_1 = __webpack_require__(2);
var restError_1 = __webpack_require__(7);
var httpOperationResponse_1 = __webpack_require__(8);
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
    return __webpack_require__(22)({ useCookie: true }).fetch;
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
var BaseFilter = /** @class */ (function () {
    function BaseFilter() {
    }
    BaseFilter.prototype.before = function (request) {
        return Promise.resolve(request);
    };
    BaseFilter.prototype.after = function (response) {
        return Promise.resolve(response);
    };
    return BaseFilter;
}());
exports.BaseFilter = BaseFilter;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Constants = {
    /**
     * The ms-rest version
     * @const
     * @type {string}
     */
    msRestVersion: "0.1.0",
    /**
     * Specifies HTTP.
     *
     * @const
     * @type {string}
     */
    HTTP: "http:",
    /**
     * Specifies HTTPS.
     *
     * @const
     * @type {string}
     */
    HTTPS: "https:",
    /**
     * Specifies HTTP Proxy.
     *
     * @const
     * @type {string}
     */
    HTTP_PROXY: "HTTP_PROXY",
    /**
     * Specifies HTTPS Proxy.
     *
     * @const
     * @type {string}
     */
    HTTPS_PROXY: "HTTPS_PROXY",
    HttpConstants: {
        /**
         * Http Verbs
         *
         * @const
         * @enum {string}
         */
        HttpVerbs: {
            PUT: "PUT",
            GET: "GET",
            DELETE: "DELETE",
            POST: "POST",
            MERGE: "MERGE",
            HEAD: "HEAD",
            PATCH: "PATCH"
        },
    },
    /**
     * Defines constants for use with HTTP headers.
     */
    HeaderConstants: {
        /**
         * The Authorization header.
         *
         * @const
         * @type {string}
         */
        AUTHORIZATION: "authorization",
        AUTHORIZATION_SCHEME: "Bearer",
        /**
         * The UserAgent header.
         *
         * @const
         * @type {string}
         */
        USER_AGENT: "User-Agent"
    }
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(0);
var serializer_1 = __webpack_require__(9);
/**
 * Creates a new WebResource object.
 *
 * This class provides an abstraction over a REST call by being library / implementation agnostic and wrapping the necessary
 * properties to initiate a request.
 *
 * @constructor
 */
var WebResource = /** @class */ (function () {
    function WebResource(url, method, body, query, headers, rawResponse) {
        if (headers === void 0) { headers = {}; }
        if (rawResponse === void 0) { rawResponse = false; }
        this.headers = {};
        this.rawResponse = rawResponse;
        this.url = url || "";
        this.method = method || "GET";
        this.headers = headers || {};
        this.body = body;
        this.query = query;
        this.formData = undefined;
    }
    /**
     * Validates that the required properties such as method, url, headers["Content-Type"],
     * headers["accept-language"] are defined. It will throw an error if one of the above
     * mentioned properties are not defined.
     */
    WebResource.prototype.validateRequestProperties = function () {
        if (!this.method || !this.url || !this.headers["Content-Type"] || !this.headers["accept-language"]) {
            throw new Error("method, url, headers[\"Content-Type\"], headers[\"accept-language\"] are " +
                "required properties before making a request. Either provide them or use WebResource.prepare() method.");
        }
        return;
    };
    /**
     * Prepares the request.
     * @param {RequestPrepareOptions} options - Options to provide for preparing the request.
     * @returns {object} WebResource Returns the prepared WebResource (HTTP Request) object that needs to be given to the request pipeline.
     */
    WebResource.prototype.prepare = function (options) {
        if (options === null || options === undefined || typeof options !== "object") {
            throw new Error("options cannot be null or undefined and must be of type object");
        }
        if (options.method === null || options.method === undefined || typeof options.method.valueOf() !== "string") {
            throw new Error("options.method cannot be null or undefined and it must be of type string.");
        }
        if (options.url && options.pathTemplate) {
            throw new Error("options.url and options.pathTemplate are mutually exclusive. Please provide either of them.");
        }
        if ((options.pathTemplate === null || options.pathTemplate === undefined || typeof options.pathTemplate.valueOf() !== "string") && (options.url === null || options.url === undefined || typeof options.url.valueOf() !== "string")) {
            throw new Error("Please provide either options.pathTemplate or options.url. Currently none of them were provided.");
        }
        // set the url if it is provided.
        if (options.url) {
            if (typeof options.url !== "string") {
                throw new Error("options.url must be of type \"string\".");
            }
            this.url = options.url;
        }
        // set the method
        if (options.method) {
            var validMethods = ["GET", "PUT", "HEAD", "DELETE", "OPTIONS", "POST", "PATCH", "TRACE"];
            if (validMethods.indexOf(options.method.toUpperCase()) === -1) {
                throw new Error("The provided method \"" + options.method + "\" is invalid. Supported HTTP methods are: " + JSON.stringify(validMethods));
            }
        }
        this.method = options.method.toUpperCase();
        // construct the url if path template is provided
        if (options.pathTemplate) {
            if (typeof options.pathTemplate !== "string") {
                throw new Error("options.pathTemplate must be of type \"string\".");
            }
            if (!options.baseUrl) {
                options.baseUrl = "https://management.azure.com";
            }
            var baseUrl = options.baseUrl;
            var url_1 = baseUrl + (baseUrl.endsWith("/") ? "" : "/") + (options.pathTemplate.startsWith("/") ? options.pathTemplate.slice(1) : options.pathTemplate);
            var segments = url_1.match(/({\w*\s*\w*})/ig);
            if (segments && segments.length) {
                if (options.pathParameters === null || options.pathParameters === undefined || typeof options.pathParameters !== "object") {
                    throw new Error("pathTemplate: " + options.pathTemplate + " has been provided. Hence, options.pathParameters " +
                        "cannot be null or undefined and must be of type \"object\".");
                }
                segments.forEach(function (item) {
                    var pathParamName = item.slice(1, -1);
                    var pathParam = options.pathParameters[pathParamName];
                    if (pathParam === null || pathParam === undefined || !(typeof pathParam === "string" || typeof pathParam === "object")) {
                        throw new Error("pathTemplate: " + options.pathTemplate + " contains the path parameter " + pathParamName +
                            (" however, it is not present in " + options.pathParameters + " - " + JSON.stringify(options.pathParameters, undefined, 2) + ".") +
                            ("The value of the path parameter can either be a \"string\" of the form { " + pathParamName + ": \"some sample value\" } or ") +
                            ("it can be an \"object\" of the form { \"" + pathParamName + "\": { value: \"some sample value\", skipUrlEncoding: true } }."));
                    }
                    if (typeof pathParam.valueOf() === "string") {
                        url_1 = url_1.replace(item, encodeURIComponent(pathParam));
                    }
                    if (typeof pathParam.valueOf() === "object") {
                        if (!pathParam.value) {
                            throw new Error("options.pathParameters[" + pathParamName + "] is of type \"object\" but it does not contain a \"value\" property.");
                        }
                        if (pathParam.skipUrlEncoding) {
                            url_1 = url_1.replace(item, pathParam.value);
                        }
                        else {
                            url_1 = url_1.replace(item, encodeURIComponent(pathParam.value));
                        }
                    }
                });
            }
            this.url = url_1;
        }
        // append query parameters to the url if they are provided. They can be provided with pathTemplate or url option.
        if (options.queryParameters) {
            if (typeof options.queryParameters !== "object") {
                throw new Error("options.queryParameters must be of type object. It should be a JSON object " +
                    "of \"query-parameter-name\" as the key and the \"query-parameter-value\" as the value. " +
                    "The \"query-parameter-value\" may be fo type \"string\" or an \"object\" of the form { value: \"query-parameter-value\", skipUrlEncoding: true }.");
            }
            // append question mark if it is not present in the url
            if (this.url && this.url.indexOf("?") === -1) {
                this.url += "?";
            }
            // construct queryString
            var queryParams = [];
            var queryParameters = options.queryParameters;
            // We need to populate this.query as a dictionary if the request is being used for Sway's validateRequest().
            this.query = {};
            for (var queryParamName in queryParameters) {
                var queryParam = queryParameters[queryParamName];
                if (queryParam) {
                    if (typeof queryParam === "string") {
                        queryParams.push(queryParamName + "=" + encodeURIComponent(queryParam));
                        this.query[queryParamName] = encodeURIComponent(queryParam);
                    }
                    else if (typeof queryParam === "object") {
                        if (!queryParam.value) {
                            throw new Error("options.queryParameters[" + queryParamName + "] is of type \"object\" but it does not contain a \"value\" property.");
                        }
                        if (queryParam.skipUrlEncoding) {
                            queryParams.push(queryParamName + "=" + queryParam.value);
                            this.query[queryParamName] = queryParam.value;
                        }
                        else {
                            queryParams.push(queryParamName + "=" + encodeURIComponent(queryParam.value));
                            this.query[queryParamName] = encodeURIComponent(queryParam.value);
                        }
                    }
                }
            } // end-of-for
            // append the queryString
            this.url += queryParams.join("&");
        }
        // add headers to the request if they are provided
        if (options.headers) {
            var headers = options.headers;
            for (var headerName in headers) {
                if (headers.hasOwnProperty(headerName)) {
                    this.headers[headerName] = headers[headerName];
                }
            }
        }
        // ensure accept-language is set correctly
        if (!this.headers["accept-language"]) {
            this.headers["accept-language"] = "en-US";
        }
        // ensure the request-id is set correctly
        if (!this.headers["x-ms-client-request-id"] && !options.disableClientRequestId) {
            this.headers["x-ms-client-request-id"] = utils_1.generateUuid();
        }
        // default
        if (!this.headers["Content-Type"]) {
            this.headers["Content-Type"] = "application/json; charset=utf-8";
        }
        // set the request body. request.js automatically sets the Content-Length request header, so we need not set it explicilty
        this.body = undefined;
        if (options.body !== null && options.body !== undefined) {
            // body as a stream special case. set the body as-is and check for some special request headers specific to sending a stream.
            if (options.bodyIsStream) {
                this.body = options.body;
                if (!this.headers["Transfer-Encoding"]) {
                    this.headers["Transfer-Encoding"] = "chunked";
                }
                if (this.headers["Content-Type"] !== "application/octet-stream") {
                    this.headers["Content-Type"] = "application/octet-stream";
                }
            }
            else {
                var serializedBody = undefined;
                if (options.serializationMapper) {
                    serializedBody = new serializer_1.Serializer(options.mappers).serialize(options.serializationMapper, options.body, "requestBody");
                }
                if (options.disableJsonStringifyOnBody) {
                    this.body = serializedBody || options.body;
                }
                else {
                    this.body = serializedBody ? JSON.stringify(serializedBody) : JSON.stringify(options.body);
                }
            }
        }
        return this;
    };
    return WebResource;
}());
exports.WebResource = WebResource;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 5 */
/***/ (function(module, exports) {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && msCrypto.getRandomValues.bind(msCrypto));
if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

module.exports = bytesToUuid;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var RestError = /** @class */ (function (_super) {
    __extends(RestError, _super);
    function RestError(message, code, statusCode, request, response, body) {
        var _this = _super.call(this, message) || this;
        _this.code = code;
        _this.statusCode = statusCode;
        _this.request = request;
        _this.response = response;
        _this.body = body;
        return _this;
    }
    return RestError;
}(Error));
exports.RestError = RestError;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Wrapper object for http request and response. Deserialized object is stored in
 * the `bodyAsJson` property when the response body is received in JSON.
 * @class
 * Initializes a new instance of the HttpOperationResponse class.
 * @constructor
 */
var HttpOperationResponse = /** @class */ (function () {
    function HttpOperationResponse(request, response) {
        /**
         * Reference to the original request object.
         * [WebResource] object.
         * @type {object}
         */
        this.request = request;
        /**
         * Reference to the original response object.
         * [ServerResponse] object.
         * @type {object}
         */
        this.response = response;
        /* tslint:disable:no-null-keyword */
        this.bodyAsText = null;
        this.bodyAsJson = null;
    }
    return HttpOperationResponse;
}());
exports.HttpOperationResponse = HttpOperationResponse;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
var utils = __webpack_require__(0);
var moment_1 = __webpack_require__(23);
var isBuffer = __webpack_require__(25);
var isStream = __webpack_require__(10);
var Serializer = /** @class */ (function () {
    function Serializer(mappers) {
        this.modelMappers = mappers;
    }
    Serializer.prototype.validateConstraints = function (mapper, value, objectName) {
        if (mapper.constraints && (value !== null || value !== undefined)) {
            for (var _i = 0, _a = Object.keys(mapper.constraints); _i < _a.length; _i++) {
                var constraintType = _a[_i];
                if (constraintType.match(/^ExclusiveMaximum$/ig) !== null) {
                    if (value >= mapper.constraints.ExclusiveMaximum) {
                        throw new Error("\"" + objectName + "\" with value \"" + value + "\" should satify the constraint \"ExclusiveMaximum\": " + mapper.constraints.ExclusiveMaximum + ".");
                    }
                }
                else if (constraintType.match(/^ExclusiveMinimum$/ig) !== null) {
                    if (value <= mapper.constraints.ExclusiveMinimum) {
                        throw new Error(objectName + " \" with value \"" + value + " \" should satify the constraint \"ExclusiveMinimum\": " + mapper.constraints.ExclusiveMinimum + ".");
                    }
                }
                else if (constraintType.match(/^InclusiveMaximum$/ig) !== null) {
                    if (value > mapper.constraints.InclusiveMaximum) {
                        throw new Error(objectName + "\" with value \"" + value + "\" should satify the constraint \"InclusiveMaximum\": " + mapper.constraints.InclusiveMaximum + ".");
                    }
                }
                else if (constraintType.match(/^InclusiveMinimum$/ig) !== null) {
                    if (value < mapper.constraints.InclusiveMinimum) {
                        throw new Error(objectName + "\" with value \"" + value + "\" should satify the constraint \"InclusiveMinimum\": " + mapper.constraints.InclusiveMinimum + ".");
                    }
                }
                else if (constraintType.match(/^MaxItems$/ig) !== null) {
                    if (value.length > mapper.constraints.MaxItems) {
                        throw new Error(objectName + "\" with value \"" + value + "\" should satify the constraint \"MaxItems\": " + mapper.constraints.MaxItems + ".");
                    }
                }
                else if (constraintType.match(/^MaxLength$/ig) !== null) {
                    if (value.length > mapper.constraints.MaxLength) {
                        throw new Error(objectName + "\" with value \"" + value + "\" should satify the constraint \"MaxLength\": " + mapper.constraints.MaxLength + ".");
                    }
                }
                else if (constraintType.match(/^MinItems$/ig) !== null) {
                    if (value.length < mapper.constraints.MinItems) {
                        throw new Error(objectName + "\" with value \"" + value + "\" should satify the constraint \"MinItems\": " + mapper.constraints.MinItems + ".");
                    }
                }
                else if (constraintType.match(/^MinLength$/ig) !== null) {
                    if (value.length < mapper.constraints.MinLength) {
                        throw new Error(objectName + "\" with value \"" + value + "\" should satify the constraint \"MinLength\": " + mapper.constraints.MinLength + ".");
                    }
                }
                else if (constraintType.match(/^MultipleOf$/ig) !== null) {
                    if (value.length % mapper.constraints.MultipleOf !== 0) {
                        throw new Error(objectName + "\" with value \"" + value + "\" should satify the constraint \"MultipleOf\": " + mapper.constraints.MultipleOf + ".");
                    }
                }
                else if (constraintType.match(/^Pattern$/ig) !== null) {
                    if (value.match(mapper.constraints.Pattern.split("/").join("\/")) === null) {
                        throw new Error(objectName + "\" with value \"" + value + "\" should satify the constraint \"Pattern\": " + mapper.constraints.Pattern + ".");
                    }
                }
                else if (constraintType.match(/^UniqueItems/ig) !== null) {
                    if (mapper.constraints.UniqueItems) {
                        if (value.length !== value.filter(function (item, i, ar) { {
                            return ar.indexOf(item) === i;
                        } }).length) {
                            throw new Error(objectName + "\" with value \"" + value + "\" should satify the constraint \"UniqueItems\": " + mapper.constraints.UniqueItems);
                        }
                    }
                }
            }
        }
    };
    Serializer.prototype.trimEnd = function (str, ch) {
        var len = str.length;
        while ((len - 1) >= 0 && str[len - 1] === ch) {
            --len;
        }
        return str.substr(0, len);
    };
    Serializer.prototype.bufferToBase64Url = function (buffer) {
        if (!buffer) {
            return undefined;
        }
        if (!isBuffer(buffer)) {
            throw new Error("Please provide an input of type Buffer for converting to Base64Url.");
        }
        // Buffer to Base64.
        var str = buffer.toString("base64");
        // Base64 to Base64Url.
        return this.trimEnd(str, "=").replace(/\+/g, "-").replace(/\//g, "_");
    };
    Serializer.prototype.base64UrlToBuffer = function (str) {
        if (!str) {
            return undefined;
        }
        if (str && typeof str.valueOf() !== "string") {
            throw new Error("Please provide an input of type string for converting to Buffer");
        }
        // Base64Url to Base64.
        str = str.replace(/\-/g, "+").replace(/\_/g, "/");
        // Base64 to Buffer.
        return Buffer.from(str, "base64");
    };
    Serializer.prototype.splitSerializeName = function (prop) {
        var classes = [];
        var partialclass = "";
        var subwords = prop.split(".");
        for (var _i = 0, subwords_1 = subwords; _i < subwords_1.length; _i++) {
            var item = subwords_1[_i];
            if (item.charAt(item.length - 1) === "\\") {
                partialclass += item.substr(0, item.length - 1) + ".";
            }
            else {
                partialclass += item;
                classes.push(partialclass);
                partialclass = "";
            }
        }
        return classes;
    };
    Serializer.prototype.dateToUnixTime = function (d) {
        if (!d) {
            return undefined;
        }
        if (typeof d.valueOf() === "string") {
            d = new Date(d);
        }
        return Math.floor(d.getTime() / 1000);
    };
    Serializer.prototype.unixTimeToDate = function (n) {
        if (!n) {
            return undefined;
        }
        return new Date(n * 1000);
    };
    Serializer.prototype.serializeBasicTypes = function (typeName, objectName, value) {
        if (value !== null && value !== undefined) {
            if (typeName.match(/^Number$/ig) !== null) {
                if (typeof value !== "number") {
                    throw new Error(objectName + " with value " + value + " must be of type number.");
                }
            }
            else if (typeName.match(/^String$/ig) !== null) {
                if (typeof value.valueOf() !== "string") {
                    throw new Error(objectName + " with value \"" + value + "\" must be of type string.");
                }
            }
            else if (typeName.match(/^Uuid$/ig) !== null) {
                if (!(typeof value.valueOf() === "string" && utils.isValidUuid(value))) {
                    throw new Error(objectName + " with value \"" + value + "\" must be of type string and a valid uuid.");
                }
            }
            else if (typeName.match(/^Boolean$/ig) !== null) {
                if (typeof value !== "boolean") {
                    throw new Error(objectName + " with value " + value + " must be of type boolean.");
                }
            }
            else if (typeName.match(/^Stream$/ig) !== null) {
                if (!isStream(value)) {
                    throw new Error(objectName + " must be of type stream.");
                }
            }
        }
        return value;
    };
    Serializer.prototype.serializeEnumType = function (objectName, allowedValues, value) {
        if (!allowedValues) {
            throw new Error("Please provide a set of allowedValues to validate " + objectName + " as an Enum Type.");
        }
        var isPresent = allowedValues.some(function (item) {
            if (typeof item.valueOf() === "string") {
                return item.toLowerCase() === value.toLowerCase();
            }
            return item === value;
        });
        if (!isPresent) {
            throw new Error(value + " is not a valid value for " + objectName + ". The valid values are: " + JSON.stringify(allowedValues) + ".");
        }
        return value;
    };
    Serializer.prototype.serializeBufferType = function (objectName, value) {
        if (value !== null && value !== undefined) {
            if (!isBuffer(value)) {
                throw new Error(objectName + " must be of type Buffer.");
            }
            value = value.toString("base64");
        }
        return value;
    };
    Serializer.prototype.serializeBase64UrlType = function (objectName, value) {
        if (value !== null && value !== undefined) {
            if (!isBuffer(value)) {
                throw new Error(objectName + " must be of type Buffer.");
            }
            value = this.bufferToBase64Url(value);
        }
        return value;
    };
    Serializer.prototype.serializeDateTypes = function (typeName, value, objectName) {
        if (value !== null && value !== undefined) {
            if (typeName.match(/^Date$/ig) !== null) {
                if (!(value instanceof Date ||
                    (typeof value.valueOf() === "string" && !isNaN(Date.parse(value))))) {
                    throw new Error(objectName + " must be an instanceof Date or a string in ISO8601 format.");
                }
                value = (value instanceof Date) ? value.toISOString().substring(0, 10) : new Date(value).toISOString().substring(0, 10);
            }
            else if (typeName.match(/^DateTime$/ig) !== null) {
                if (!(value instanceof Date ||
                    (typeof value.valueOf() === "string" && !isNaN(Date.parse(value))))) {
                    throw new Error(objectName + " must be an instanceof Date or a string in ISO8601 format.");
                }
                value = (value instanceof Date) ? value.toISOString() : new Date(value).toISOString();
            }
            else if (typeName.match(/^DateTimeRfc1123$/ig) !== null) {
                if (!(value instanceof Date ||
                    (typeof value.valueOf() === "string" && !isNaN(Date.parse(value))))) {
                    throw new Error(objectName + " must be an instanceof Date or a string in RFC-1123 format.");
                }
                value = (value instanceof Date) ? value.toUTCString() : new Date(value).toUTCString();
            }
            else if (typeName.match(/^UnixTime$/ig) !== null) {
                if (!(value instanceof Date ||
                    (typeof value.valueOf() === "string" && !isNaN(Date.parse(value))))) {
                    throw new Error(objectName + " must be an instanceof Date or a string in RFC-1123/ISO8601 format " +
                        "for it to be serialized in UnixTime/Epoch format.");
                }
                value = this.dateToUnixTime(value);
            }
            else if (typeName.match(/^TimeSpan$/ig) !== null) {
                if (!(moment_1.isDuration(value) || (value.constructor && value.constructor.name === "Duration" && typeof value.isValid === "function" && value.isValid()))) {
                    throw new Error(objectName + " must be a TimeSpan/Duration.");
                }
                value = value.toISOString();
            }
        }
        return value;
    };
    Serializer.prototype.serializeSequenceType = function (mapper, object, objectName) {
        if (!Array.isArray(object)) {
            throw new Error(objectName + " must be of type Array.");
        }
        if (!mapper.type.element || typeof mapper.type.element !== "object") {
            throw new Error("element\" metadata for an Array must be defined in the " +
                ("mapper and it must of type \"object\" in " + objectName + "."));
        }
        var tempArray = [];
        for (var i = 0; i < object.length; i++) {
            tempArray[i] = this.serialize(mapper.type.element, object[i], objectName);
        }
        return tempArray;
    };
    Serializer.prototype.serializeDictionaryType = function (mapper, object, objectName) {
        if (typeof object !== "object") {
            throw new Error(objectName + " must be of type object.");
        }
        if (!mapper.type.value || typeof mapper.type.value !== "object") {
            throw new Error("\"value\" metadata for a Dictionary must be defined in the " +
                ("mapper and it must of type \"object\" in " + objectName + "."));
        }
        var tempDictionary = {};
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                tempDictionary[key] = this.serialize(mapper.type.value, object[key], objectName);
            }
        }
        return tempDictionary;
    };
    Serializer.prototype.serializeCompositeType = function (mapper, object, objectName) {
        // check for polymorphic discriminator
        if (mapper.type.polymorphicDiscriminator) {
            mapper = this.getPolymorphicMapper(mapper, object, objectName, "serialize");
        }
        var payload = {};
        var modelMapper = {
            required: false,
            serializedName: "serializedName",
            type: {
                name: "Composite",
                className: "className",
                modelProperties: {}
            }
        };
        if (object !== null && object !== undefined) {
            var modelProps = mapper.type.modelProperties;
            if (!modelProps) {
                if (!mapper.type.className) {
                    throw new Error("Class name for model \"" + objectName + "\" is not provided in the mapper \"" + JSON.stringify(mapper, undefined, 2) + "\".");
                }
                // get the mapper if modelProperties of the CompositeType is not present and
                // then get the modelProperties from it.
                modelMapper = this.modelMappers[mapper.type.className];
                if (!modelMapper) {
                    throw new Error("mapper() cannot be null or undefined for model \"" + mapper.type.className + "\".");
                }
                modelProps = modelMapper.type.modelProperties;
                if (!modelProps) {
                    throw new Error("modelProperties cannot be null or undefined in the " +
                        ("mapper \"" + JSON.stringify(modelMapper) + "\" of type \"" + mapper.type.className + "\" for object \"" + objectName + "\"."));
                }
            }
            for (var key in modelProps) {
                if (modelProps.hasOwnProperty(key)) {
                    var paths = this.splitSerializeName(modelProps[key].serializedName);
                    var propName = paths.pop();
                    var parentObject = payload;
                    for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
                        var pathName = paths_1[_i];
                        var childObject = parentObject[pathName];
                        if ((childObject === null || childObject === undefined) && (object[key] !== null && object[key] !== undefined)) {
                            parentObject[pathName] = {};
                        }
                        parentObject = parentObject[pathName];
                    }
                    // make sure required properties of the CompositeType are present
                    if (modelProps[key].required && !modelProps[key].isConstant) {
                        if (object[key] === null || object[key] === undefined) {
                            throw new Error(key + "\" cannot be null or undefined in \"" + objectName + "\".");
                        }
                    }
                    // make sure that readOnly properties are not sent on the wire
                    if (modelProps[key].readOnly) {
                        continue;
                    }
                    // serialize the property if it is present in the provided object instance
                    if (((parentObject !== null && parentObject !== undefined) && (modelProps[key].defaultValue !== null && modelProps[key].defaultValue !== undefined)) ||
                        (object[key] !== null && object[key] !== undefined)) {
                        var propertyObjectName = objectName;
                        if (modelProps[key].serializedName !== "")
                            propertyObjectName = objectName + "." + modelProps[key].serializedName;
                        var propertyMapper = modelProps[key];
                        var serializedValue = this.serialize(propertyMapper, object[key], propertyObjectName);
                        if (propName !== null && propName !== undefined)
                            parentObject[propName] = serializedValue;
                    }
                }
            }
            return payload;
        }
        return object;
    };
    /**
     * Serialize the given object based on its metadata defined in the mapper
     *
     * @param {Mapper} mapper The mapper which defines the metadata of the serializable object
     *
     * @param {object|string|Array|number|boolean|Date|stream} object A valid Javascript object to be serialized
     *
     * @param {string} objectName Name of the serialized object
     *
     * @returns {object|string|Array|number|boolean|Date|stream} A valid serialized Javascript object
     */
    Serializer.prototype.serialize = function (mapper, object, objectName) {
        var payload = {};
        var mapperType = mapper.type.name;
        if (!objectName)
            objectName = mapper.serializedName;
        if (mapperType.match(/^Sequence$/ig) !== null)
            payload = [];
        // Throw if required and object is null or undefined
        if (mapper.required && (object === null || object === undefined) && !mapper.isConstant) {
            throw new Error(objectName + " cannot be null or undefined.");
        }
        // Set Defaults
        if ((mapper.defaultValue !== null && mapper.defaultValue !== undefined) &&
            (object === null || object === undefined)) {
            object = mapper.defaultValue;
        }
        if (mapper.isConstant)
            object = mapper.defaultValue;
        // Validate Constraints if any
        this.validateConstraints(mapper, object, objectName);
        if (mapperType.match(/^any$/ig) !== null) {
            payload = object;
        }
        else if (mapperType.match(/^(Number|String|Boolean|Object|Stream|Uuid)$/ig) !== null) {
            payload = this.serializeBasicTypes(mapperType, objectName, object);
        }
        else if (mapperType.match(/^Enum$/ig) !== null) {
            var enumMapper = mapper;
            payload = this.serializeEnumType(objectName, enumMapper.type.allowedValues, object);
        }
        else if (mapperType.match(/^(Date|DateTime|TimeSpan|DateTimeRfc1123|UnixTime)$/ig) !== null) {
            payload = this.serializeDateTypes(mapperType, object, objectName);
        }
        else if (mapperType.match(/^ByteArray$/ig) !== null) {
            payload = this.serializeBufferType(objectName, object);
        }
        else if (mapperType.match(/^Base64Url$/ig) !== null) {
            payload = this.serializeBase64UrlType(objectName, object);
        }
        else if (mapperType.match(/^Sequence$/ig) !== null) {
            payload = this.serializeSequenceType(mapper, object, objectName);
        }
        else if (mapperType.match(/^Dictionary$/ig) !== null) {
            payload = this.serializeDictionaryType(mapper, object, objectName);
        }
        else if (mapperType.match(/^Composite$/ig) !== null) {
            payload = this.serializeCompositeType(mapper, object, objectName);
        }
        return payload;
    };
    Serializer.prototype.deserializeCompositeType = function (mapper, responseBody, objectName) {
        /*jshint validthis: true */
        // check for polymorphic discriminator
        if (mapper.type.polymorphicDiscriminator) {
            mapper = this.getPolymorphicMapper(mapper, responseBody, objectName, "deserialize");
        }
        var instance = {};
        var modelMapper = {
            required: false,
            serializedName: "serializedName",
            type: {
                name: "Composite"
            }
        };
        if (responseBody !== null && responseBody !== undefined) {
            var modelProps = mapper.type.modelProperties;
            if (!modelProps) {
                if (!mapper.type.className) {
                    throw new Error("Class name for model \"" + objectName + "\" is not provided in the mapper \"" + JSON.stringify(mapper) + "\"");
                }
                // get the mapper if modelProperties of the CompositeType is not present and
                // then get the modelProperties from it.
                modelMapper = this.modelMappers[mapper.type.className];
                if (!modelMapper) {
                    throw new Error("mapper() cannot be null or undefined for model \"" + mapper.type.className + "\"");
                }
                modelProps = modelMapper.type.modelProperties;
                if (!modelProps) {
                    throw new Error("modelProperties cannot be null or undefined in the " +
                        ("mapper \"" + JSON.stringify(modelMapper) + "\" of type \"" + mapper.type.className + "\" for responseBody \"" + objectName + "\"."));
                }
            }
            for (var key in modelProps) {
                if (modelProps.hasOwnProperty(key)) {
                    var paths = this.splitSerializeName(modelProps[key].serializedName);
                    // deserialize the property if it is present in the provided responseBody instance
                    var propertyInstance = void 0;
                    var res = responseBody;
                    // traversing the object step by step.
                    for (var _i = 0, paths_2 = paths; _i < paths_2.length; _i++) {
                        var item = paths_2[_i];
                        if (!res)
                            break;
                        res = res[item];
                    }
                    propertyInstance = res;
                    var propertyObjectName = objectName;
                    if (modelProps[key].serializedName !== "")
                        propertyObjectName = objectName + "." + modelProps[key].serializedName;
                    var propertyMapper = modelProps[key];
                    var serializedValue = void 0;
                    // paging
                    if (Array.isArray(responseBody[key]) && modelProps[key].serializedName === "") {
                        propertyInstance = responseBody[key];
                        instance = this.deserialize(propertyMapper, propertyInstance, propertyObjectName);
                    }
                    else if (propertyInstance !== null && propertyInstance !== undefined) {
                        serializedValue = this.deserialize(propertyMapper, propertyInstance, propertyObjectName);
                        instance[key] = serializedValue;
                    }
                }
            }
            return instance;
        }
        return responseBody;
    };
    Serializer.prototype.deserializeDictionaryType = function (mapper, responseBody, objectName) {
        /*jshint validthis: true */
        if (!mapper.type.value || typeof mapper.type.value !== "object") {
            throw new Error("\"value\" metadata for a Dictionary must be defined in the " +
                ("mapper and it must of type \"object\" in " + objectName));
        }
        if (responseBody) {
            var tempDictionary = {};
            for (var key in responseBody) {
                if (responseBody.hasOwnProperty(key)) {
                    tempDictionary[key] = this.deserialize(mapper.type.value, responseBody[key], objectName);
                }
            }
            return tempDictionary;
        }
        return responseBody;
    };
    Serializer.prototype.deserializeSequenceType = function (mapper, responseBody, objectName) {
        /*jshint validthis: true */
        if (!mapper.type.element || typeof mapper.type.element !== "object") {
            throw new Error("element\" metadata for an Array must be defined in the " +
                ("mapper and it must of type \"object\" in " + objectName));
        }
        if (responseBody) {
            var tempArray = [];
            for (var i = 0; i < responseBody.length; i++) {
                tempArray[i] = this.deserialize(mapper.type.element, responseBody[i], objectName);
            }
            return tempArray;
        }
        return responseBody;
    };
    /**
     * Deserialize the given object based on its metadata defined in the mapper
     *
     * @param {object} mapper The mapper which defines the metadata of the serializable object
     *
     * @param {object|string|Array|number|boolean|Date|stream} responseBody A valid Javascript entity to be deserialized
     *
     * @param {string} objectName Name of the deserialized object
     *
     * @returns {object|string|Array|number|boolean|Date|stream} A valid deserialized Javascript object
     */
    Serializer.prototype.deserialize = function (mapper, responseBody, objectName) {
        if (responseBody === null || responseBody === undefined)
            return responseBody;
        var payload;
        var mapperType = mapper.type.name;
        if (!objectName)
            objectName = mapper.serializedName;
        if (mapperType.match(/^Sequence$/ig) !== null)
            payload = [];
        if (mapperType.match(/^(Number|String|Boolean|Enum|Object|Stream|Uuid|any)$/ig) !== null) {
            payload = responseBody;
        }
        else if (mapperType.match(/^(Date|DateTime|DateTimeRfc1123)$/ig) !== null) {
            payload = new Date(responseBody);
        }
        else if (mapperType.match(/^TimeSpan$/ig) !== null) {
            payload = moment_1.duration(responseBody);
        }
        else if (mapperType.match(/^UnixTime$/ig) !== null) {
            payload = this.unixTimeToDate(responseBody);
        }
        else if (mapperType.match(/^ByteArray$/ig) !== null) {
            payload = Buffer.from(responseBody, "base64");
        }
        else if (mapperType.match(/^Base64Url$/ig) !== null) {
            payload = this.base64UrlToBuffer(responseBody);
        }
        else if (mapperType.match(/^Sequence$/ig) !== null) {
            payload = this.deserializeSequenceType(mapper, responseBody, objectName);
        }
        else if (mapperType.match(/^Dictionary$/ig) !== null) {
            payload = this.deserializeDictionaryType(mapper, responseBody, objectName);
        }
        else if (mapperType.match(/^Composite$/ig) !== null) {
            payload = this.deserializeCompositeType(mapper, responseBody, objectName);
        }
        if (mapper.isConstant)
            payload = mapper.defaultValue;
        return payload;
    };
    Serializer.prototype.getPolymorphicMapper = function (mapper, object, objectName, mode) {
        // check for polymorphic discriminator
        // Until version 1.15.1, "polymorphicDiscriminator" in the mapper was a string. This method was not effective when the
        // polymorphicDiscriminator property had a dot in it"s name. So we have comeup with a desgin where polymorphicDiscriminator
        // will be an object that contains the clientName (normalized property name, ex: "odatatype") and
        // the serializedName (ex: "odata.type") (We do not escape the dots with double backslash in this case as it is not required)
        // Thus when serializing, the user will give us an object which will contain the normalizedProperty hence we will lookup
        // the clientName of the polmorphicDiscriminator in the mapper and during deserialization from the responseBody we will
        // lookup the serializedName of the polmorphicDiscriminator in the mapper. This will help us in selecting the correct mapper
        // for the model that needs to be serializes or deserialized.
        // We need this routing for backwards compatibility. This will absorb the breaking change in the mapper and allow new versions
        // of the runtime to work seamlessly with older version (>= 0.17.0-Nightly20161008) of Autorest generated node.js clients.
        if (mapper.type.polymorphicDiscriminator) {
            if (typeof mapper.type.polymorphicDiscriminator.valueOf() === "string") {
                return this.getPolymorphicMapperStringVersion(mapper, object, objectName);
            }
            else if (mapper.type.polymorphicDiscriminator instanceof Object) {
                return this.getPolymorphicMapperObjectVersion(mapper, object, objectName, mode);
            }
            else {
                throw new Error("The polymorphicDiscriminator for \"" + objectName + "\" is neither a string nor an object.");
            }
        }
        return mapper;
    };
    // processes new version of the polymorphicDiscriminator in the mapper.
    Serializer.prototype.getPolymorphicMapperObjectVersion = function (mapper, object, objectName, mode) {
        // check for polymorphic discriminator
        var polymorphicPropertyName = "";
        if (mode === "serialize") {
            polymorphicPropertyName = "clientName";
        }
        else if (mode === "deserialize") {
            polymorphicPropertyName = "serializedName";
        }
        else {
            throw new Error("The given mode \"" + mode + "\" for getting the polymorphic mapper for \"" + objectName + "\" is inavlid.");
        }
        var discriminatorAsObject = mapper.type.polymorphicDiscriminator;
        if (discriminatorAsObject &&
            discriminatorAsObject[polymorphicPropertyName] !== null &&
            discriminatorAsObject[polymorphicPropertyName] !== undefined) {
            if (object === null || object === undefined) {
                throw new Error(objectName + "\" cannot be null or undefined. " +
                    ("\"" + discriminatorAsObject[polymorphicPropertyName] + "\" is the ") +
                    "polmorphicDiscriminator and is a required property.");
            }
            if (object[discriminatorAsObject[polymorphicPropertyName]] === null ||
                object[discriminatorAsObject[polymorphicPropertyName]] === undefined) {
                throw new Error("No discriminator field \"" + discriminatorAsObject[polymorphicPropertyName] + "\" was found in \"" + objectName + "\".");
            }
            var indexDiscriminator = undefined;
            if (object[discriminatorAsObject[polymorphicPropertyName]] === mapper.type.uberParent) {
                indexDiscriminator = object[discriminatorAsObject[polymorphicPropertyName]];
            }
            else {
                indexDiscriminator = mapper.type.uberParent + "." + object[discriminatorAsObject[polymorphicPropertyName]];
            }
            if (this.modelMappers && this.modelMappers.discriminators[indexDiscriminator]) {
                mapper = this.modelMappers.discriminators[indexDiscriminator];
            }
        }
        return mapper;
    };
    // processes old version of the polymorphicDiscriminator in the mapper.
    Serializer.prototype.getPolymorphicMapperStringVersion = function (mapper, object, objectName) {
        // check for polymorphic discriminator
        var discriminatorAsString = mapper.type.polymorphicDiscriminator;
        if (discriminatorAsString !== null && discriminatorAsString !== undefined) {
            if (object === null || object === undefined) {
                throw new Error(objectName + "\" cannot be null or undefined. \"" + discriminatorAsString + "\" is the " +
                    "polmorphicDiscriminator and is a required property.");
            }
            if (object[discriminatorAsString] === null || object[discriminatorAsString] === undefined) {
                throw new Error("No discriminator field \"" + discriminatorAsString + "\" was found in \"" + objectName + "\".");
            }
            var indexDiscriminator = undefined;
            if (object[discriminatorAsString] === mapper.type.uberParent) {
                indexDiscriminator = object[discriminatorAsString];
            }
            else {
                indexDiscriminator = mapper.type.uberParent + "." + object[discriminatorAsString];
            }
            if (this.modelMappers && this.modelMappers.discriminators[indexDiscriminator]) {
                mapper = this.modelMappers.discriminators[indexDiscriminator];
            }
        }
        return mapper;
    };
    return Serializer;
}());
exports.Serializer = Serializer;
function serializeObject(toSerialize) {
    if (toSerialize === null || toSerialize === undefined)
        return undefined;
    if (isBuffer(toSerialize)) {
        toSerialize = toSerialize.toString("base64");
        return toSerialize;
    }
    else if (toSerialize instanceof Date) {
        return toSerialize.toISOString();
    }
    else if (Array.isArray(toSerialize)) {
        var array = [];
        for (var i = 0; i < toSerialize.length; i++) {
            array.push(serializeObject(toSerialize[i]));
        }
        return array;
    }
    else if (typeof toSerialize === "object") {
        var dictionary = {};
        for (var property in toSerialize) {
            dictionary[property] = serializeObject(toSerialize[property]);
        }
        return dictionary;
    }
    return toSerialize;
}
exports.serializeObject = serializeObject;
exports.MapperType = utils.strEnum([
    "Base64Url",
    "Boolean",
    "ByteArray",
    "Composite",
    "Date",
    "DateTime",
    "DateTimeRfc1123",
    "Dictionary",
    "Enum",
    "Number",
    "Object",
    "Sequence",
    "String",
    "Stream",
    "TimeSpan",
    "UnixTime"
]);


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isStream = module.exports = function (stream) {
	return stream !== null && typeof stream === 'object' && typeof stream.pipe === 'function';
};

isStream.writable = function (stream) {
	return isStream(stream) && stream.writable !== false && typeof stream._write === 'function' && typeof stream._writableState === 'object';
};

isStream.readable = function (stream) {
	return isStream(stream) && stream.readable !== false && typeof stream._read === 'function' && typeof stream._readableState === 'object';
};

isStream.duplex = function (stream) {
	return isStream.writable(stream) && isStream.readable(stream);
};

isStream.transform = function (stream) {
	return isStream.duplex(stream) && typeof stream._transform === 'function' && typeof stream._transformState === 'object';
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
var utils = __webpack_require__(0);
var RequestPipeline = /** @class */ (function () {
    function RequestPipeline(filters, requestOptions) {
        this.filters = filters || [];
        this.requestOptions = requestOptions || {};
    }
    RequestPipeline.prototype.addFilter = function (f) {
        this.filters.push(f);
        return;
    };
    RequestPipeline.prototype.create = function () {
        var self = this;
        var pipeline = [];
        if (self.filters && self.filters.length) {
            var beforeFilters = [];
            var afterFilters = [];
            for (var i = 0; i < self.filters.length; i++) {
                var filter = self.filters[i];
                if (filter.before && typeof filter.before === "function") {
                    beforeFilters.push(filter.before.bind(filter));
                }
                if (filter.after && typeof filter.after === "function") {
                    afterFilters.push(filter.after.bind(filter));
                }
            } // end-of-for-loop
            // add the request sink
            beforeFilters.push(self.requestSink.bind(self));
            pipeline = beforeFilters.concat(afterFilters);
        }
        else {
            pipeline.push(self.requestSink.bind(self));
        }
        var requestFun = function (request) {
            if (!request.headers)
                request.headers = {};
            return utils.executePromisesSequentially(pipeline, request);
        };
        return requestFun;
    };
    RequestPipeline.prototype.requestSink = function (options) {
        if (this.requestOptions.method)
            delete this.requestOptions.method;
        return utils.dispatchRequest(options);
    };
    return RequestPipeline;
}());
exports.RequestPipeline = RequestPipeline;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var baseFilter_1 = __webpack_require__(1);
var utils = __webpack_require__(0);
/**
 * @class
 * Instantiates a new "ExponentialRetryPolicyFilter" instance.
 *
 * @constructor
 * @param {number} retryCount        The client retry count.
 * @param {number} retryInterval     The client retry interval, in milliseconds.
 * @param {number} minRetryInterval  The minimum retry interval, in milliseconds.
 * @param {number} maxRetryInterval  The maximum retry interval, in milliseconds.
 */
var ExponentialRetryPolicyFilter = /** @class */ (function (_super) {
    __extends(ExponentialRetryPolicyFilter, _super);
    function ExponentialRetryPolicyFilter(retryCount, retryInterval, minRetryInterval, maxRetryInterval) {
        var _this = _super.call(this) || this;
        _this.DEFAULT_CLIENT_RETRY_INTERVAL = 1000 * 30;
        _this.DEFAULT_CLIENT_RETRY_COUNT = 3;
        _this.DEFAULT_CLIENT_MAX_RETRY_INTERVAL = 1000 * 90;
        _this.DEFAULT_CLIENT_MIN_RETRY_INTERVAL = 1000 * 3;
        _this.retryCount = typeof retryCount === "number" ? retryCount : _this.DEFAULT_CLIENT_RETRY_COUNT;
        _this.retryInterval = typeof retryInterval === "number" ? retryInterval : _this.DEFAULT_CLIENT_RETRY_INTERVAL;
        _this.minRetryInterval = typeof minRetryInterval === "number" ? minRetryInterval : _this.DEFAULT_CLIENT_MIN_RETRY_INTERVAL;
        _this.maxRetryInterval = typeof maxRetryInterval === "number" ? maxRetryInterval : _this.DEFAULT_CLIENT_MAX_RETRY_INTERVAL;
        return _this;
    }
    /**
     * Determines if the operation should be retried and how long to wait until the next retry.
     *
     * @param {number} statusCode The HTTP status code.
     * @param {RetryData} retryData  The retry data.
     * @return {boolean} True if the operation qualifies for a retry; false otherwise.
     */
    ExponentialRetryPolicyFilter.prototype.shouldRetry = function (statusCode, retryData) {
        if ((statusCode < 500 && statusCode !== 408) || statusCode === 501 || statusCode === 505) {
            return false;
        }
        var currentCount;
        if (!retryData) {
            throw new Error("retryData for the ExponentialRetryPolicyFilter cannot be null.");
        }
        else {
            currentCount = (retryData && retryData.retryCount);
        }
        return (currentCount < this.retryCount);
    };
    /**
     * Updates the retry data for the next attempt.
     *
     * @param {RetryData} retryData  The retry data.
     * @param {object} err        The operation"s error, if any.
     */
    ExponentialRetryPolicyFilter.prototype.updateRetryData = function (retryData, err) {
        if (!retryData) {
            retryData = {
                retryCount: 0,
                retryInterval: 0
            };
        }
        if (err) {
            if (retryData.error) {
                err.innerError = retryData.error;
            }
            retryData.error = err;
        }
        // Adjust retry count
        retryData.retryCount++;
        // Adjust retry interval
        var incrementDelta = Math.pow(2, retryData.retryCount) - 1;
        var boundedRandDelta = this.retryInterval * 0.8 +
            Math.floor(Math.random() * (this.retryInterval * 1.2 - this.retryInterval * 0.8));
        incrementDelta *= boundedRandDelta;
        retryData.retryInterval = Math.min(this.minRetryInterval + incrementDelta, this.maxRetryInterval);
        return retryData;
    };
    ExponentialRetryPolicyFilter.prototype.retry = function (operationResponse, retryData, err) {
        return __awaiter(this, void 0, void 0, function () {
            var self, response, res, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        response = operationResponse.response;
                        retryData = self.updateRetryData(retryData, err);
                        if (!(!utils.objectIsNull(response) && self.shouldRetry(response.status, retryData))) return [3 /*break*/, 6];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, utils.delay(retryData.retryInterval)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, utils.dispatchRequest(operationResponse.request)];
                    case 3:
                        res = _a.sent();
                        return [2 /*return*/, self.retry(res, retryData, err)];
                    case 4:
                        err_1 = _a.sent();
                        return [2 /*return*/, self.retry(operationResponse, retryData, err_1)];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        if (!utils.objectIsNull(err)) {
                            // If the operation failed in the end, return all errors instead of just the last one
                            err = retryData.error;
                            return [2 /*return*/, Promise.reject(err)];
                        }
                        return [2 /*return*/, Promise.resolve(operationResponse)];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ExponentialRetryPolicyFilter.prototype.after = function (operationResponse) {
        return this.retry(operationResponse);
    };
    return ExponentialRetryPolicyFilter;
}(baseFilter_1.BaseFilter));
exports.ExponentialRetryPolicyFilter = ExponentialRetryPolicyFilter;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var baseFilter_1 = __webpack_require__(1);
var utils = __webpack_require__(0);
/**
 * @class
 * Instantiates a new "ExponentialRetryPolicyFilter" instance.
 *
 * @constructor
 * @param {number} retryCount        The client retry count.
 * @param {number} retryInterval     The client retry interval, in milliseconds.
 * @param {number} minRetryInterval  The minimum retry interval, in milliseconds.
 * @param {number} maxRetryInterval  The maximum retry interval, in milliseconds.
 */
var SystemErrorRetryPolicyFilter = /** @class */ (function (_super) {
    __extends(SystemErrorRetryPolicyFilter, _super);
    function SystemErrorRetryPolicyFilter(retryCount, retryInterval, minRetryInterval, maxRetryInterval) {
        var _this = _super.call(this) || this;
        _this.DEFAULT_CLIENT_RETRY_INTERVAL = 1000 * 30;
        _this.DEFAULT_CLIENT_RETRY_COUNT = 3;
        _this.DEFAULT_CLIENT_MAX_RETRY_INTERVAL = 1000 * 90;
        _this.DEFAULT_CLIENT_MIN_RETRY_INTERVAL = 1000 * 3;
        _this.retryCount = typeof retryCount === "number" ? retryCount : _this.DEFAULT_CLIENT_RETRY_COUNT;
        _this.retryInterval = typeof retryInterval === "number" ? retryInterval : _this.DEFAULT_CLIENT_RETRY_INTERVAL;
        _this.minRetryInterval = typeof minRetryInterval === "number" ? minRetryInterval : _this.DEFAULT_CLIENT_MIN_RETRY_INTERVAL;
        _this.maxRetryInterval = typeof maxRetryInterval === "number" ? maxRetryInterval : _this.DEFAULT_CLIENT_MAX_RETRY_INTERVAL;
        return _this;
    }
    /**
     * Determines if the operation should be retried and how long to wait until the next retry.
     *
     * @param {number} statusCode The HTTP status code.
     * @param {RetryData} retryData  The retry data.
     * @return {boolean} True if the operation qualifies for a retry; false otherwise.
     */
    SystemErrorRetryPolicyFilter.prototype.shouldRetry = function (retryData) {
        var currentCount;
        if (!retryData) {
            throw new Error("retryData for the SystemErrorRetryPolicyFilter cannot be null.");
        }
        else {
            currentCount = (retryData && retryData.retryCount);
        }
        return (currentCount < this.retryCount);
    };
    /**
     * Updates the retry data for the next attempt.
     *
     * @param {RetryData} retryData  The retry data.
     * @param {object} err        The operation"s error, if any.
     */
    SystemErrorRetryPolicyFilter.prototype.updateRetryData = function (retryData, err) {
        if (!retryData) {
            retryData = {
                retryCount: 0,
                retryInterval: 0
            };
        }
        if (err) {
            if (retryData.error) {
                err.innerError = retryData.error;
            }
            retryData.error = err;
        }
        // Adjust retry count
        retryData.retryCount++;
        // Adjust retry interval
        var incrementDelta = Math.pow(2, retryData.retryCount) - 1;
        var boundedRandDelta = this.retryInterval * 0.8 +
            Math.floor(Math.random() * (this.retryInterval * 1.2 - this.retryInterval * 0.8));
        incrementDelta *= boundedRandDelta;
        retryData.retryInterval = Math.min(this.minRetryInterval + incrementDelta, this.maxRetryInterval);
        return retryData;
    };
    SystemErrorRetryPolicyFilter.prototype.retry = function (operationResponse, retryData, err) {
        return __awaiter(this, void 0, void 0, function () {
            var self, res, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        retryData = self.updateRetryData(retryData, err);
                        if (!(err && err.code && self.shouldRetry(retryData) &&
                            (err.code === "ETIMEDOUT" || err.code === "ESOCKETTIMEDOUT" || err.code === "ECONNREFUSED" ||
                                err.code === "ECONNRESET" || err.code === "ENOENT"))) return [3 /*break*/, 6];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, utils.delay(retryData.retryInterval)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, utils.dispatchRequest(operationResponse.request)];
                    case 3:
                        res = _a.sent();
                        return [2 /*return*/, self.retry(res, retryData, err)];
                    case 4:
                        err_1 = _a.sent();
                        return [2 /*return*/, self.retry(operationResponse, retryData, err_1)];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        if (!utils.objectIsNull(err)) {
                            // If the operation failed in the end, return all errors instead of just the last one
                            err = retryData.error;
                            return [2 /*return*/, Promise.reject(err)];
                        }
                        return [2 /*return*/, Promise.resolve(operationResponse)];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    SystemErrorRetryPolicyFilter.prototype.after = function (operationResponse) {
        return this.retry(operationResponse); // See: https://github.com/Microsoft/TypeScript/issues/7426
    };
    return SystemErrorRetryPolicyFilter;
}(baseFilter_1.BaseFilter));
exports.SystemErrorRetryPolicyFilter = SystemErrorRetryPolicyFilter;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var baseFilter_1 = __webpack_require__(1);
var utils = __webpack_require__(0);
var parse = __webpack_require__(27);
var RedirectFilter = /** @class */ (function (_super) {
    __extends(RedirectFilter, _super);
    function RedirectFilter(maximumRetries) {
        if (maximumRetries === void 0) { maximumRetries = 20; }
        var _this = _super.call(this) || this;
        _this.maximumRetries = maximumRetries;
        return _this;
    }
    RedirectFilter.prototype.handleRedirect = function (operationResponse, currentRetries) {
        return __awaiter(this, void 0, void 0, function () {
            var request, response, urlObject, res, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = operationResponse.request;
                        response = operationResponse.response;
                        if (!(response && response.headers && response.headers.get("location") &&
                            (response.status === 300 || response.status === 307 || (response.status === 303 && request.method === "POST")) &&
                            (!this.maximumRetries || currentRetries < this.maximumRetries))) return [3 /*break*/, 5];
                        if (parse(response.headers.get("location")).hostname) {
                            request.url = response.headers.get("location");
                        }
                        else {
                            urlObject = parse(request.url);
                            urlObject.set("pathname", response.headers.get("location"));
                            request.url = urlObject.href;
                        }
                        // POST request with Status code 303 should be converted into a
                        // redirected GET request if the redirect url is present in the location header
                        if (response.status === 303) {
                            request.method = "GET";
                        }
                        res = void 0;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, utils.dispatchRequest(request)];
                    case 2:
                        res = _a.sent();
                        currentRetries++;
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        return [2 /*return*/, Promise.reject(err_1)];
                    case 4: return [2 /*return*/, this.handleRedirect(res, currentRetries)];
                    case 5: return [2 /*return*/, Promise.resolve(operationResponse)];
                }
            });
        });
    };
    RedirectFilter.prototype.after = function (operationResponse) {
        return this.handleRedirect(operationResponse, 0);
    };
    return RedirectFilter;
}(baseFilter_1.BaseFilter));
exports.RedirectFilter = RedirectFilter;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var baseFilter_1 = __webpack_require__(1);
var SigningFilter = /** @class */ (function (_super) {
    __extends(SigningFilter, _super);
    function SigningFilter(authenticationProvider) {
        var _this = _super.call(this) || this;
        _this.authenticationProvider = authenticationProvider;
        return _this;
    }
    SigningFilter.prototype.before = function (request) {
        var self = this;
        return self.authenticationProvider.signRequest(request);
    };
    return SigningFilter;
}(baseFilter_1.BaseFilter));
exports.SigningFilter = SigningFilter;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var baseFilter_1 = __webpack_require__(1);
var constants_1 = __webpack_require__(2);
var utils_1 = __webpack_require__(0);
var os = __webpack_require__(32);
var HeaderConstants = constants_1.Constants.HeaderConstants;
var MsRestUserAgentFilter = /** @class */ (function (_super) {
    __extends(MsRestUserAgentFilter, _super);
    function MsRestUserAgentFilter(userAgentInfo) {
        var _this = _super.call(this) || this;
        _this.userAgentInfo = userAgentInfo;
        return _this;
    }
    MsRestUserAgentFilter.prototype.tagRequest = function (request) {
        if (utils_1.isNode) {
            var osInfo = "(" + os.arch() + "-" + os.type() + "-" + os.release() + ")";
            if (this.userAgentInfo.indexOf(osInfo) === -1) {
                this.userAgentInfo.unshift(osInfo);
            }
            var runtimeInfo = "Node/" + process.version;
            if (this.userAgentInfo.indexOf(runtimeInfo) === -1) {
                this.userAgentInfo.unshift(runtimeInfo);
            }
            var nodeSDKSignature = "Azure-SDK-For-Node";
            if (this.userAgentInfo.indexOf(nodeSDKSignature) === -1) {
                var azureRuntime = "ms-rest-azure";
                var insertIndex = this.userAgentInfo.indexOf(azureRuntime);
                // insert after azureRuntime, otherwise, insert last.
                insertIndex = insertIndex < 0 ? this.userAgentInfo.length : insertIndex + 1;
                this.userAgentInfo.splice(insertIndex, 0, nodeSDKSignature);
            }
            if (!request.headers)
                request.headers = {};
            request.headers[HeaderConstants.USER_AGENT] = this.userAgentInfo.join(" ");
        }
        return Promise.resolve(request);
    };
    MsRestUserAgentFilter.prototype.before = function (request) {
        var self = this;
        if (!request.headers)
            request.headers = {};
        if (!request.headers[HeaderConstants.USER_AGENT]) {
            return self.tagRequest(request);
        }
        else {
            return Promise.resolve(request);
        }
    };
    return MsRestUserAgentFilter;
}(baseFilter_1.BaseFilter));
exports.MsRestUserAgentFilter = MsRestUserAgentFilter;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
var webResource_1 = __webpack_require__(3);
exports.WebResource = webResource_1.WebResource;
var httpOperationResponse_1 = __webpack_require__(8);
exports.HttpOperationResponse = httpOperationResponse_1.HttpOperationResponse;
var restError_1 = __webpack_require__(7);
exports.RestError = restError_1.RestError;
var serviceClient_1 = __webpack_require__(26);
exports.ServiceClient = serviceClient_1.ServiceClient;
var constants_1 = __webpack_require__(2);
exports.Constants = constants_1.Constants;
var requestPipeline_1 = __webpack_require__(11);
exports.RequestPipeline = requestPipeline_1.RequestPipeline;
var logFilter_1 = __webpack_require__(33);
exports.LogFilter = logFilter_1.LogFilter;
var baseFilter_1 = __webpack_require__(1);
exports.BaseFilter = baseFilter_1.BaseFilter;
var exponentialRetryPolicyFilter_1 = __webpack_require__(12);
exports.ExponentialRetryPolicyFilter = exponentialRetryPolicyFilter_1.ExponentialRetryPolicyFilter;
var systemErrorRetryPolicyFilter_1 = __webpack_require__(13);
exports.SystemErrorRetryPolicyFilter = systemErrorRetryPolicyFilter_1.SystemErrorRetryPolicyFilter;
var redirectFilter_1 = __webpack_require__(14);
exports.RedirectFilter = redirectFilter_1.RedirectFilter;
var signingFilter_1 = __webpack_require__(15);
exports.SigningFilter = signingFilter_1.SigningFilter;
var msRestUserAgentFilter_1 = __webpack_require__(16);
exports.MsRestUserAgentFilter = msRestUserAgentFilter_1.MsRestUserAgentFilter;
var serializer_1 = __webpack_require__(9);
exports.MapperType = serializer_1.MapperType;
exports.Serializer = serializer_1.Serializer;
exports.serializeObject = serializer_1.serializeObject;
var utils_1 = __webpack_require__(0);
exports.stripRequest = utils_1.stripRequest;
exports.stripResponse = utils_1.stripResponse;
exports.delay = utils_1.delay;
exports.executePromisesSequentially = utils_1.executePromisesSequentially;
exports.generateUuid = utils_1.generateUuid;
exports.encodeUri = utils_1.encodeUri;
exports.promiseToCallback = utils_1.promiseToCallback;
exports.promiseToServiceCallback = utils_1.promiseToServiceCallback;
exports.isValidUuid = utils_1.isValidUuid;
exports.dispatchRequest = utils_1.dispatchRequest;
exports.applyMixins = utils_1.applyMixins;
exports.isNode = utils_1.isNode;
// Credentials
var tokenCredentials_1 = __webpack_require__(34);
exports.TokenCredentials = tokenCredentials_1.TokenCredentials;
var basicAuthenticationCredentials_1 = __webpack_require__(35);
exports.BasicAuthenticationCredentials = basicAuthenticationCredentials_1.BasicAuthenticationCredentials;
var apiKeyCredentials_1 = __webpack_require__(36);
exports.ApiKeyCredentials = apiKeyCredentials_1.ApiKeyCredentials;
var isStream = __webpack_require__(10);
exports.isStream = isStream;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var v1 = __webpack_require__(19);
var v4 = __webpack_require__(20);

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;

module.exports = uuid;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(5);
var bytesToUuid = __webpack_require__(6);

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = rng();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
      ];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(5);
var bytesToUuid = __webpack_require__(6);

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),
/* 21 */
/***/ (function(module, exports) {

/* eslint-env browser */
module.exports = typeof self == 'object' ? self.FormData : window.FormData;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;(function (self) {
  'use strict';

  function fetchPonyfill(options) {
    var Promise = options && options.Promise || self.Promise;
    var XMLHttpRequest = options && options.XMLHttpRequest || self.XMLHttpRequest;
    var global = self;

    return (function () {
      var self = Object.create(global, {
        fetch: {
          value: undefined,
          writable: true
        }
      });

      (function(self) {
        'use strict';

        if (self.fetch) {
          return
        }

        var support = {
          searchParams: 'URLSearchParams' in self,
          iterable: 'Symbol' in self && 'iterator' in Symbol,
          blob: 'FileReader' in self && 'Blob' in self && (function() {
            try {
              new Blob()
              return true
            } catch(e) {
              return false
            }
          })(),
          formData: 'FormData' in self,
          arrayBuffer: 'ArrayBuffer' in self
        }

        if (support.arrayBuffer) {
          var viewClasses = [
            '[object Int8Array]',
            '[object Uint8Array]',
            '[object Uint8ClampedArray]',
            '[object Int16Array]',
            '[object Uint16Array]',
            '[object Int32Array]',
            '[object Uint32Array]',
            '[object Float32Array]',
            '[object Float64Array]'
          ]

          var isDataView = function(obj) {
            return obj && DataView.prototype.isPrototypeOf(obj)
          }

          var isArrayBufferView = ArrayBuffer.isView || function(obj) {
            return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
          }
        }

        function normalizeName(name) {
          if (typeof name !== 'string') {
            name = String(name)
          }
          if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
            throw new TypeError('Invalid character in header field name')
          }
          return name.toLowerCase()
        }

        function normalizeValue(value) {
          if (typeof value !== 'string') {
            value = String(value)
          }
          return value
        }

        // Build a destructive iterator for the value list
        function iteratorFor(items) {
          var iterator = {
            next: function() {
              var value = items.shift()
              return {done: value === undefined, value: value}
            }
          }

          if (support.iterable) {
            iterator[Symbol.iterator] = function() {
              return iterator
            }
          }

          return iterator
        }

        function Headers(headers) {
          this.map = {}

          if (headers instanceof Headers) {
            headers.forEach(function(value, name) {
              this.append(name, value)
            }, this)
          } else if (Array.isArray(headers)) {
            headers.forEach(function(header) {
              this.append(header[0], header[1])
            }, this)
          } else if (headers) {
            Object.getOwnPropertyNames(headers).forEach(function(name) {
              this.append(name, headers[name])
            }, this)
          }
        }

        Headers.prototype.append = function(name, value) {
          name = normalizeName(name)
          value = normalizeValue(value)
          var oldValue = this.map[name]
          this.map[name] = oldValue ? oldValue+','+value : value
        }

        Headers.prototype['delete'] = function(name) {
          delete this.map[normalizeName(name)]
        }

        Headers.prototype.get = function(name) {
          name = normalizeName(name)
          return this.has(name) ? this.map[name] : null
        }

        Headers.prototype.has = function(name) {
          return this.map.hasOwnProperty(normalizeName(name))
        }

        Headers.prototype.set = function(name, value) {
          this.map[normalizeName(name)] = normalizeValue(value)
        }

        Headers.prototype.forEach = function(callback, thisArg) {
          for (var name in this.map) {
            if (this.map.hasOwnProperty(name)) {
              callback.call(thisArg, this.map[name], name, this)
            }
          }
        }

        Headers.prototype.keys = function() {
          var items = []
          this.forEach(function(value, name) { items.push(name) })
          return iteratorFor(items)
        }

        Headers.prototype.values = function() {
          var items = []
          this.forEach(function(value) { items.push(value) })
          return iteratorFor(items)
        }

        Headers.prototype.entries = function() {
          var items = []
          this.forEach(function(value, name) { items.push([name, value]) })
          return iteratorFor(items)
        }

        if (support.iterable) {
          Headers.prototype[Symbol.iterator] = Headers.prototype.entries
        }

        function consumed(body) {
          if (body.bodyUsed) {
            return Promise.reject(new TypeError('Already read'))
          }
          body.bodyUsed = true
        }

        function fileReaderReady(reader) {
          return new Promise(function(resolve, reject) {
            reader.onload = function() {
              resolve(reader.result)
            }
            reader.onerror = function() {
              reject(reader.error)
            }
          })
        }

        function readBlobAsArrayBuffer(blob) {
          var reader = new FileReader()
          var promise = fileReaderReady(reader)
          reader.readAsArrayBuffer(blob)
          return promise
        }

        function readBlobAsText(blob) {
          var reader = new FileReader()
          var promise = fileReaderReady(reader)
          reader.readAsText(blob)
          return promise
        }

        function readArrayBufferAsText(buf) {
          var view = new Uint8Array(buf)
          var chars = new Array(view.length)

          for (var i = 0; i < view.length; i++) {
            chars[i] = String.fromCharCode(view[i])
          }
          return chars.join('')
        }

        function bufferClone(buf) {
          if (buf.slice) {
            return buf.slice(0)
          } else {
            var view = new Uint8Array(buf.byteLength)
            view.set(new Uint8Array(buf))
            return view.buffer
          }
        }

        function Body() {
          this.bodyUsed = false

          this._initBody = function(body) {
            this._bodyInit = body
            if (!body) {
              this._bodyText = ''
            } else if (typeof body === 'string') {
              this._bodyText = body
            } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
              this._bodyBlob = body
            } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
              this._bodyFormData = body
            } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
              this._bodyText = body.toString()
            } else if (support.arrayBuffer && support.blob && isDataView(body)) {
              this._bodyArrayBuffer = bufferClone(body.buffer)
              // IE 10-11 can't handle a DataView body.
              this._bodyInit = new Blob([this._bodyArrayBuffer])
            } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
              this._bodyArrayBuffer = bufferClone(body)
            } else {
              throw new Error('unsupported BodyInit type')
            }

            if (!this.headers.get('content-type')) {
              if (typeof body === 'string') {
                this.headers.set('content-type', 'text/plain;charset=UTF-8')
              } else if (this._bodyBlob && this._bodyBlob.type) {
                this.headers.set('content-type', this._bodyBlob.type)
              } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
              }
            }
          }

          if (support.blob) {
            this.blob = function() {
              var rejected = consumed(this)
              if (rejected) {
                return rejected
              }

              if (this._bodyBlob) {
                return Promise.resolve(this._bodyBlob)
              } else if (this._bodyArrayBuffer) {
                return Promise.resolve(new Blob([this._bodyArrayBuffer]))
              } else if (this._bodyFormData) {
                throw new Error('could not read FormData body as blob')
              } else {
                return Promise.resolve(new Blob([this._bodyText]))
              }
            }

            this.arrayBuffer = function() {
              if (this._bodyArrayBuffer) {
                return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
              } else {
                return this.blob().then(readBlobAsArrayBuffer)
              }
            }
          }

          this.text = function() {
            var rejected = consumed(this)
            if (rejected) {
              return rejected
            }

            if (this._bodyBlob) {
              return readBlobAsText(this._bodyBlob)
            } else if (this._bodyArrayBuffer) {
              return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
            } else if (this._bodyFormData) {
              throw new Error('could not read FormData body as text')
            } else {
              return Promise.resolve(this._bodyText)
            }
          }

          if (support.formData) {
            this.formData = function() {
              return this.text().then(decode)
            }
          }

          this.json = function() {
            return this.text().then(JSON.parse)
          }

          return this
        }

        // HTTP methods whose capitalization should be normalized
        var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

        function normalizeMethod(method) {
          var upcased = method.toUpperCase()
          return (methods.indexOf(upcased) > -1) ? upcased : method
        }

        function Request(input, options) {
          options = options || {}
          var body = options.body

          if (input instanceof Request) {
            if (input.bodyUsed) {
              throw new TypeError('Already read')
            }
            this.url = input.url
            this.credentials = input.credentials
            if (!options.headers) {
              this.headers = new Headers(input.headers)
            }
            this.method = input.method
            this.mode = input.mode
            if (!body && input._bodyInit != null) {
              body = input._bodyInit
              input.bodyUsed = true
            }
          } else {
            this.url = String(input)
          }

          this.credentials = options.credentials || this.credentials || 'omit'
          if (options.headers || !this.headers) {
            this.headers = new Headers(options.headers)
          }
          this.method = normalizeMethod(options.method || this.method || 'GET')
          this.mode = options.mode || this.mode || null
          this.referrer = null

          if ((this.method === 'GET' || this.method === 'HEAD') && body) {
            throw new TypeError('Body not allowed for GET or HEAD requests')
          }
          this._initBody(body)
        }

        Request.prototype.clone = function() {
          return new Request(this, { body: this._bodyInit })
        }

        function decode(body) {
          var form = new FormData()
          body.trim().split('&').forEach(function(bytes) {
            if (bytes) {
              var split = bytes.split('=')
              var name = split.shift().replace(/\+/g, ' ')
              var value = split.join('=').replace(/\+/g, ' ')
              form.append(decodeURIComponent(name), decodeURIComponent(value))
            }
          })
          return form
        }

        function parseHeaders(rawHeaders) {
          var headers = new Headers()
          rawHeaders.split(/\r?\n/).forEach(function(line) {
            var parts = line.split(':')
            var key = parts.shift().trim()
            if (key) {
              var value = parts.join(':').trim()
              headers.append(key, value)
            }
          })
          return headers
        }

        Body.call(Request.prototype)

        function Response(bodyInit, options) {
          if (!options) {
            options = {}
          }

          this.type = 'default'
          this.status = 'status' in options ? options.status : 200
          this.ok = this.status >= 200 && this.status < 300
          this.statusText = 'statusText' in options ? options.statusText : 'OK'
          this.headers = new Headers(options.headers)
          this.url = options.url || ''
          this._initBody(bodyInit)
        }

        Body.call(Response.prototype)

        Response.prototype.clone = function() {
          return new Response(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new Headers(this.headers),
            url: this.url
          })
        }

        Response.error = function() {
          var response = new Response(null, {status: 0, statusText: ''})
          response.type = 'error'
          return response
        }

        var redirectStatuses = [301, 302, 303, 307, 308]

        Response.redirect = function(url, status) {
          if (redirectStatuses.indexOf(status) === -1) {
            throw new RangeError('Invalid status code')
          }

          return new Response(null, {status: status, headers: {location: url}})
        }

        self.Headers = Headers
        self.Request = Request
        self.Response = Response

        self.fetch = function(input, init) {
          return new Promise(function(resolve, reject) {
            var request = new Request(input, init)
            var xhr = new XMLHttpRequest()

            xhr.onload = function() {
              var options = {
                status: xhr.status,
                statusText: xhr.statusText,
                headers: parseHeaders(xhr.getAllResponseHeaders() || '')
              }
              options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
              var body = 'response' in xhr ? xhr.response : xhr.responseText
              resolve(new Response(body, options))
            }

            xhr.onerror = function() {
              reject(new TypeError('Network request failed'))
            }

            xhr.ontimeout = function() {
              reject(new TypeError('Network request failed'))
            }

            xhr.open(request.method, request.url, true)

            if (request.credentials === 'include') {
              xhr.withCredentials = true
            }

            if ('responseType' in xhr && support.blob) {
              xhr.responseType = 'blob'
            }

            request.headers.forEach(function(value, name) {
              xhr.setRequestHeader(name, value)
            })

            xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
          })
        }
        self.fetch.polyfill = true
      })(typeof self !== 'undefined' ? self : this);


      return {
        fetch: self.fetch,
        Headers: self.Headers,
        Request: self.Request,
        Response: self.Response
      };
    }());
  }

  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
      return fetchPonyfill;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports === 'object') {
    module.exports = fetchPonyfill;
  } else {
    self.fetchPonyfill = fetchPonyfill;
  }
}(typeof self === 'undefined' ? this : self));



/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define(t):e.moment=t()}(this,function(){"use strict";var e,t;function n(){return e.apply(null,arguments)}function s(e){return e instanceof Array||"[object Array]"===Object.prototype.toString.call(e)}function i(e){return null!=e&&"[object Object]"===Object.prototype.toString.call(e)}function r(e){return void 0===e}function a(e){return"number"==typeof e||"[object Number]"===Object.prototype.toString.call(e)}function o(e){return e instanceof Date||"[object Date]"===Object.prototype.toString.call(e)}function u(e,t){var n,s=[];for(n=0;n<e.length;++n)s.push(t(e[n],n));return s}function l(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function d(e,t){for(var n in t)l(t,n)&&(e[n]=t[n]);return l(t,"toString")&&(e.toString=t.toString),l(t,"valueOf")&&(e.valueOf=t.valueOf),e}function h(e,t,n,s){return Ot(e,t,n,s,!0).utc()}function c(e){return null==e._pf&&(e._pf={empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1,parsedDateParts:[],meridiem:null,rfc2822:!1,weekdayMismatch:!1}),e._pf}function f(e){if(null==e._isValid){var n=c(e),s=t.call(n.parsedDateParts,function(e){return null!=e}),i=!isNaN(e._d.getTime())&&n.overflow<0&&!n.empty&&!n.invalidMonth&&!n.invalidWeekday&&!n.weekdayMismatch&&!n.nullInput&&!n.invalidFormat&&!n.userInvalidated&&(!n.meridiem||n.meridiem&&s);if(e._strict&&(i=i&&0===n.charsLeftOver&&0===n.unusedTokens.length&&void 0===n.bigHour),null!=Object.isFrozen&&Object.isFrozen(e))return i;e._isValid=i}return e._isValid}function m(e){var t=h(NaN);return null!=e?d(c(t),e):c(t).userInvalidated=!0,t}t=Array.prototype.some?Array.prototype.some:function(e){for(var t=Object(this),n=t.length>>>0,s=0;s<n;s++)if(s in t&&e.call(this,t[s],s,t))return!0;return!1};var _=n.momentProperties=[];function y(e,t){var n,s,i;if(r(t._isAMomentObject)||(e._isAMomentObject=t._isAMomentObject),r(t._i)||(e._i=t._i),r(t._f)||(e._f=t._f),r(t._l)||(e._l=t._l),r(t._strict)||(e._strict=t._strict),r(t._tzm)||(e._tzm=t._tzm),r(t._isUTC)||(e._isUTC=t._isUTC),r(t._offset)||(e._offset=t._offset),r(t._pf)||(e._pf=c(t)),r(t._locale)||(e._locale=t._locale),_.length>0)for(n=0;n<_.length;n++)r(i=t[s=_[n]])||(e[s]=i);return e}var g=!1;function p(e){y(this,e),this._d=new Date(null!=e._d?e._d.getTime():NaN),this.isValid()||(this._d=new Date(NaN)),!1===g&&(g=!0,n.updateOffset(this),g=!1)}function v(e){return e instanceof p||null!=e&&null!=e._isAMomentObject}function w(e){return e<0?Math.ceil(e)||0:Math.floor(e)}function M(e){var t=+e,n=0;return 0!==t&&isFinite(t)&&(n=w(t)),n}function S(e,t,n){var s,i=Math.min(e.length,t.length),r=Math.abs(e.length-t.length),a=0;for(s=0;s<i;s++)(n&&e[s]!==t[s]||!n&&M(e[s])!==M(t[s]))&&a++;return a+r}function D(e){!1===n.suppressDeprecationWarnings&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+e)}function k(e,t){var s=!0;return d(function(){if(null!=n.deprecationHandler&&n.deprecationHandler(null,e),s){for(var i,r=[],a=0;a<arguments.length;a++){if(i="","object"==typeof arguments[a]){for(var o in i+="\n["+a+"] ",arguments[0])i+=o+": "+arguments[0][o]+", ";i=i.slice(0,-2)}else i=arguments[a];r.push(i)}D(e+"\nArguments: "+Array.prototype.slice.call(r).join("")+"\n"+(new Error).stack),s=!1}return t.apply(this,arguments)},t)}var Y,O={};function T(e,t){null!=n.deprecationHandler&&n.deprecationHandler(e,t),O[e]||(D(t),O[e]=!0)}function x(e){return e instanceof Function||"[object Function]"===Object.prototype.toString.call(e)}function b(e,t){var n,s=d({},e);for(n in t)l(t,n)&&(i(e[n])&&i(t[n])?(s[n]={},d(s[n],e[n]),d(s[n],t[n])):null!=t[n]?s[n]=t[n]:delete s[n]);for(n in e)l(e,n)&&!l(t,n)&&i(e[n])&&(s[n]=d({},s[n]));return s}function P(e){null!=e&&this.set(e)}n.suppressDeprecationWarnings=!1,n.deprecationHandler=null,Y=Object.keys?Object.keys:function(e){var t,n=[];for(t in e)l(e,t)&&n.push(t);return n};var W={};function H(e,t){var n=e.toLowerCase();W[n]=W[n+"s"]=W[t]=e}function R(e){return"string"==typeof e?W[e]||W[e.toLowerCase()]:void 0}function C(e){var t,n,s={};for(n in e)l(e,n)&&(t=R(n))&&(s[t]=e[n]);return s}var F={};function L(e,t){F[e]=t}function U(e,t,n){var s=""+Math.abs(e),i=t-s.length;return(e>=0?n?"+":"":"-")+Math.pow(10,Math.max(0,i)).toString().substr(1)+s}var N=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,G=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,V={},E={};function I(e,t,n,s){var i=s;"string"==typeof s&&(i=function(){return this[s]()}),e&&(E[e]=i),t&&(E[t[0]]=function(){return U(i.apply(this,arguments),t[1],t[2])}),n&&(E[n]=function(){return this.localeData().ordinal(i.apply(this,arguments),e)})}function A(e,t){return e.isValid()?(t=j(t,e.localeData()),V[t]=V[t]||function(e){var t,n,s,i=e.match(N);for(t=0,n=i.length;t<n;t++)E[i[t]]?i[t]=E[i[t]]:i[t]=(s=i[t]).match(/\[[\s\S]/)?s.replace(/^\[|\]$/g,""):s.replace(/\\/g,"");return function(t){var s,r="";for(s=0;s<n;s++)r+=x(i[s])?i[s].call(t,e):i[s];return r}}(t),V[t](e)):e.localeData().invalidDate()}function j(e,t){var n=5;function s(e){return t.longDateFormat(e)||e}for(G.lastIndex=0;n>=0&&G.test(e);)e=e.replace(G,s),G.lastIndex=0,n-=1;return e}var Z=/\d/,z=/\d\d/,$=/\d{3}/,q=/\d{4}/,J=/[+-]?\d{6}/,B=/\d\d?/,Q=/\d\d\d\d?/,X=/\d\d\d\d\d\d?/,K=/\d{1,3}/,ee=/\d{1,4}/,te=/[+-]?\d{1,6}/,ne=/\d+/,se=/[+-]?\d+/,ie=/Z|[+-]\d\d:?\d\d/gi,re=/Z|[+-]\d\d(?::?\d\d)?/gi,ae=/[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,oe={};function ue(e,t,n){oe[e]=x(t)?t:function(e,s){return e&&n?n:t}}function le(e,t){return l(oe,e)?oe[e](t._strict,t._locale):new RegExp(de(e.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(e,t,n,s,i){return t||n||s||i})))}function de(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var he={};function ce(e,t){var n,s=t;for("string"==typeof e&&(e=[e]),a(t)&&(s=function(e,n){n[t]=M(e)}),n=0;n<e.length;n++)he[e[n]]=s}function fe(e,t){ce(e,function(e,n,s,i){s._w=s._w||{},t(e,s._w,s,i)})}var me=0,_e=1,ye=2,ge=3,pe=4,ve=5,we=6,Me=7,Se=8;function De(e){return ke(e)?366:365}function ke(e){return e%4==0&&e%100!=0||e%400==0}I("Y",0,0,function(){var e=this.year();return e<=9999?""+e:"+"+e}),I(0,["YY",2],0,function(){return this.year()%100}),I(0,["YYYY",4],0,"year"),I(0,["YYYYY",5],0,"year"),I(0,["YYYYYY",6,!0],0,"year"),H("year","y"),L("year",1),ue("Y",se),ue("YY",B,z),ue("YYYY",ee,q),ue("YYYYY",te,J),ue("YYYYYY",te,J),ce(["YYYYY","YYYYYY"],me),ce("YYYY",function(e,t){t[me]=2===e.length?n.parseTwoDigitYear(e):M(e)}),ce("YY",function(e,t){t[me]=n.parseTwoDigitYear(e)}),ce("Y",function(e,t){t[me]=parseInt(e,10)}),n.parseTwoDigitYear=function(e){return M(e)+(M(e)>68?1900:2e3)};var Ye,Oe=Te("FullYear",!0);function Te(e,t){return function(s){return null!=s?(be(this,e,s),n.updateOffset(this,t),this):xe(this,e)}}function xe(e,t){return e.isValid()?e._d["get"+(e._isUTC?"UTC":"")+t]():NaN}function be(e,t,n){e.isValid()&&!isNaN(n)&&("FullYear"===t&&ke(e.year())&&1===e.month()&&29===e.date()?e._d["set"+(e._isUTC?"UTC":"")+t](n,e.month(),Pe(n,e.month())):e._d["set"+(e._isUTC?"UTC":"")+t](n))}function Pe(e,t){if(isNaN(e)||isNaN(t))return NaN;var n,s=(t%(n=12)+n)%n;return e+=(t-s)/12,1===s?ke(e)?29:28:31-s%7%2}Ye=Array.prototype.indexOf?Array.prototype.indexOf:function(e){var t;for(t=0;t<this.length;++t)if(this[t]===e)return t;return-1},I("M",["MM",2],"Mo",function(){return this.month()+1}),I("MMM",0,0,function(e){return this.localeData().monthsShort(this,e)}),I("MMMM",0,0,function(e){return this.localeData().months(this,e)}),H("month","M"),L("month",8),ue("M",B),ue("MM",B,z),ue("MMM",function(e,t){return t.monthsShortRegex(e)}),ue("MMMM",function(e,t){return t.monthsRegex(e)}),ce(["M","MM"],function(e,t){t[_e]=M(e)-1}),ce(["MMM","MMMM"],function(e,t,n,s){var i=n._locale.monthsParse(e,s,n._strict);null!=i?t[_e]=i:c(n).invalidMonth=e});var We=/D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,He="January_February_March_April_May_June_July_August_September_October_November_December".split("_");var Re="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_");function Ce(e,t){var n;if(!e.isValid())return e;if("string"==typeof t)if(/^\d+$/.test(t))t=M(t);else if(!a(t=e.localeData().monthsParse(t)))return e;return n=Math.min(e.date(),Pe(e.year(),t)),e._d["set"+(e._isUTC?"UTC":"")+"Month"](t,n),e}function Fe(e){return null!=e?(Ce(this,e),n.updateOffset(this,!0),this):xe(this,"Month")}var Le=ae;var Ue=ae;function Ne(){function e(e,t){return t.length-e.length}var t,n,s=[],i=[],r=[];for(t=0;t<12;t++)n=h([2e3,t]),s.push(this.monthsShort(n,"")),i.push(this.months(n,"")),r.push(this.months(n,"")),r.push(this.monthsShort(n,""));for(s.sort(e),i.sort(e),r.sort(e),t=0;t<12;t++)s[t]=de(s[t]),i[t]=de(i[t]);for(t=0;t<24;t++)r[t]=de(r[t]);this._monthsRegex=new RegExp("^("+r.join("|")+")","i"),this._monthsShortRegex=this._monthsRegex,this._monthsStrictRegex=new RegExp("^("+i.join("|")+")","i"),this._monthsShortStrictRegex=new RegExp("^("+s.join("|")+")","i")}function Ge(e){var t=new Date(Date.UTC.apply(null,arguments));return e<100&&e>=0&&isFinite(t.getUTCFullYear())&&t.setUTCFullYear(e),t}function Ve(e,t,n){var s=7+t-n;return-((7+Ge(e,0,s).getUTCDay()-t)%7)+s-1}function Ee(e,t,n,s,i){var r,a,o=1+7*(t-1)+(7+n-s)%7+Ve(e,s,i);return o<=0?a=De(r=e-1)+o:o>De(e)?(r=e+1,a=o-De(e)):(r=e,a=o),{year:r,dayOfYear:a}}function Ie(e,t,n){var s,i,r=Ve(e.year(),t,n),a=Math.floor((e.dayOfYear()-r-1)/7)+1;return a<1?s=a+Ae(i=e.year()-1,t,n):a>Ae(e.year(),t,n)?(s=a-Ae(e.year(),t,n),i=e.year()+1):(i=e.year(),s=a),{week:s,year:i}}function Ae(e,t,n){var s=Ve(e,t,n),i=Ve(e+1,t,n);return(De(e)-s+i)/7}I("w",["ww",2],"wo","week"),I("W",["WW",2],"Wo","isoWeek"),H("week","w"),H("isoWeek","W"),L("week",5),L("isoWeek",5),ue("w",B),ue("ww",B,z),ue("W",B),ue("WW",B,z),fe(["w","ww","W","WW"],function(e,t,n,s){t[s.substr(0,1)]=M(e)});I("d",0,"do","day"),I("dd",0,0,function(e){return this.localeData().weekdaysMin(this,e)}),I("ddd",0,0,function(e){return this.localeData().weekdaysShort(this,e)}),I("dddd",0,0,function(e){return this.localeData().weekdays(this,e)}),I("e",0,0,"weekday"),I("E",0,0,"isoWeekday"),H("day","d"),H("weekday","e"),H("isoWeekday","E"),L("day",11),L("weekday",11),L("isoWeekday",11),ue("d",B),ue("e",B),ue("E",B),ue("dd",function(e,t){return t.weekdaysMinRegex(e)}),ue("ddd",function(e,t){return t.weekdaysShortRegex(e)}),ue("dddd",function(e,t){return t.weekdaysRegex(e)}),fe(["dd","ddd","dddd"],function(e,t,n,s){var i=n._locale.weekdaysParse(e,s,n._strict);null!=i?t.d=i:c(n).invalidWeekday=e}),fe(["d","e","E"],function(e,t,n,s){t[s]=M(e)});var je="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_");var Ze="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_");var ze="Su_Mo_Tu_We_Th_Fr_Sa".split("_");var $e=ae;var qe=ae;var Je=ae;function Be(){function e(e,t){return t.length-e.length}var t,n,s,i,r,a=[],o=[],u=[],l=[];for(t=0;t<7;t++)n=h([2e3,1]).day(t),s=this.weekdaysMin(n,""),i=this.weekdaysShort(n,""),r=this.weekdays(n,""),a.push(s),o.push(i),u.push(r),l.push(s),l.push(i),l.push(r);for(a.sort(e),o.sort(e),u.sort(e),l.sort(e),t=0;t<7;t++)o[t]=de(o[t]),u[t]=de(u[t]),l[t]=de(l[t]);this._weekdaysRegex=new RegExp("^("+l.join("|")+")","i"),this._weekdaysShortRegex=this._weekdaysRegex,this._weekdaysMinRegex=this._weekdaysRegex,this._weekdaysStrictRegex=new RegExp("^("+u.join("|")+")","i"),this._weekdaysShortStrictRegex=new RegExp("^("+o.join("|")+")","i"),this._weekdaysMinStrictRegex=new RegExp("^("+a.join("|")+")","i")}function Qe(){return this.hours()%12||12}function Xe(e,t){I(e,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),t)})}function Ke(e,t){return t._meridiemParse}I("H",["HH",2],0,"hour"),I("h",["hh",2],0,Qe),I("k",["kk",2],0,function(){return this.hours()||24}),I("hmm",0,0,function(){return""+Qe.apply(this)+U(this.minutes(),2)}),I("hmmss",0,0,function(){return""+Qe.apply(this)+U(this.minutes(),2)+U(this.seconds(),2)}),I("Hmm",0,0,function(){return""+this.hours()+U(this.minutes(),2)}),I("Hmmss",0,0,function(){return""+this.hours()+U(this.minutes(),2)+U(this.seconds(),2)}),Xe("a",!0),Xe("A",!1),H("hour","h"),L("hour",13),ue("a",Ke),ue("A",Ke),ue("H",B),ue("h",B),ue("k",B),ue("HH",B,z),ue("hh",B,z),ue("kk",B,z),ue("hmm",Q),ue("hmmss",X),ue("Hmm",Q),ue("Hmmss",X),ce(["H","HH"],ge),ce(["k","kk"],function(e,t,n){var s=M(e);t[ge]=24===s?0:s}),ce(["a","A"],function(e,t,n){n._isPm=n._locale.isPM(e),n._meridiem=e}),ce(["h","hh"],function(e,t,n){t[ge]=M(e),c(n).bigHour=!0}),ce("hmm",function(e,t,n){var s=e.length-2;t[ge]=M(e.substr(0,s)),t[pe]=M(e.substr(s)),c(n).bigHour=!0}),ce("hmmss",function(e,t,n){var s=e.length-4,i=e.length-2;t[ge]=M(e.substr(0,s)),t[pe]=M(e.substr(s,2)),t[ve]=M(e.substr(i)),c(n).bigHour=!0}),ce("Hmm",function(e,t,n){var s=e.length-2;t[ge]=M(e.substr(0,s)),t[pe]=M(e.substr(s))}),ce("Hmmss",function(e,t,n){var s=e.length-4,i=e.length-2;t[ge]=M(e.substr(0,s)),t[pe]=M(e.substr(s,2)),t[ve]=M(e.substr(i))});var et,tt=Te("Hours",!0),nt={calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},longDateFormat:{LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},invalidDate:"Invalid date",ordinal:"%d",dayOfMonthOrdinalParse:/\d{1,2}/,relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",ss:"%d seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},months:He,monthsShort:Re,week:{dow:0,doy:6},weekdays:je,weekdaysMin:ze,weekdaysShort:Ze,meridiemParse:/[ap]\.?m?\.?/i},st={},it={};function rt(e){return e?e.toLowerCase().replace("_","-"):e}function at(e){var t=null;if(!st[e]&&"undefined"!=typeof module&&module&&module.exports)try{t=et._abbr,!(function webpackMissingModule() { var e = new Error("Cannot find module \"./locale\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()),ot(t)}catch(e){}return st[e]}function ot(e,t){var n;return e&&((n=r(t)?lt(e):ut(e,t))?et=n:"undefined"!=typeof console&&console.warn&&console.warn("Locale "+e+" not found. Did you forget to load it?")),et._abbr}function ut(e,t){if(null!==t){var n,s=nt;if(t.abbr=e,null!=st[e])T("defineLocaleOverride","use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."),s=st[e]._config;else if(null!=t.parentLocale)if(null!=st[t.parentLocale])s=st[t.parentLocale]._config;else{if(null==(n=at(t.parentLocale)))return it[t.parentLocale]||(it[t.parentLocale]=[]),it[t.parentLocale].push({name:e,config:t}),null;s=n._config}return st[e]=new P(b(s,t)),it[e]&&it[e].forEach(function(e){ut(e.name,e.config)}),ot(e),st[e]}return delete st[e],null}function lt(e){var t;if(e&&e._locale&&e._locale._abbr&&(e=e._locale._abbr),!e)return et;if(!s(e)){if(t=at(e))return t;e=[e]}return function(e){for(var t,n,s,i,r=0;r<e.length;){for(t=(i=rt(e[r]).split("-")).length,n=(n=rt(e[r+1]))?n.split("-"):null;t>0;){if(s=at(i.slice(0,t).join("-")))return s;if(n&&n.length>=t&&S(i,n,!0)>=t-1)break;t--}r++}return et}(e)}function dt(e){var t,n=e._a;return n&&-2===c(e).overflow&&(t=n[_e]<0||n[_e]>11?_e:n[ye]<1||n[ye]>Pe(n[me],n[_e])?ye:n[ge]<0||n[ge]>24||24===n[ge]&&(0!==n[pe]||0!==n[ve]||0!==n[we])?ge:n[pe]<0||n[pe]>59?pe:n[ve]<0||n[ve]>59?ve:n[we]<0||n[we]>999?we:-1,c(e)._overflowDayOfYear&&(t<me||t>ye)&&(t=ye),c(e)._overflowWeeks&&-1===t&&(t=Me),c(e)._overflowWeekday&&-1===t&&(t=Se),c(e).overflow=t),e}function ht(e,t,n){return null!=e?e:null!=t?t:n}function ct(e){var t,s,i,r,a,o=[];if(!e._d){var u,l;for(u=e,l=new Date(n.now()),i=u._useUTC?[l.getUTCFullYear(),l.getUTCMonth(),l.getUTCDate()]:[l.getFullYear(),l.getMonth(),l.getDate()],e._w&&null==e._a[ye]&&null==e._a[_e]&&function(e){var t,n,s,i,r,a,o,u;if(null!=(t=e._w).GG||null!=t.W||null!=t.E)r=1,a=4,n=ht(t.GG,e._a[me],Ie(Tt(),1,4).year),s=ht(t.W,1),((i=ht(t.E,1))<1||i>7)&&(u=!0);else{r=e._locale._week.dow,a=e._locale._week.doy;var l=Ie(Tt(),r,a);n=ht(t.gg,e._a[me],l.year),s=ht(t.w,l.week),null!=t.d?((i=t.d)<0||i>6)&&(u=!0):null!=t.e?(i=t.e+r,(t.e<0||t.e>6)&&(u=!0)):i=r}s<1||s>Ae(n,r,a)?c(e)._overflowWeeks=!0:null!=u?c(e)._overflowWeekday=!0:(o=Ee(n,s,i,r,a),e._a[me]=o.year,e._dayOfYear=o.dayOfYear)}(e),null!=e._dayOfYear&&(a=ht(e._a[me],i[me]),(e._dayOfYear>De(a)||0===e._dayOfYear)&&(c(e)._overflowDayOfYear=!0),s=Ge(a,0,e._dayOfYear),e._a[_e]=s.getUTCMonth(),e._a[ye]=s.getUTCDate()),t=0;t<3&&null==e._a[t];++t)e._a[t]=o[t]=i[t];for(;t<7;t++)e._a[t]=o[t]=null==e._a[t]?2===t?1:0:e._a[t];24===e._a[ge]&&0===e._a[pe]&&0===e._a[ve]&&0===e._a[we]&&(e._nextDay=!0,e._a[ge]=0),e._d=(e._useUTC?Ge:function(e,t,n,s,i,r,a){var o=new Date(e,t,n,s,i,r,a);return e<100&&e>=0&&isFinite(o.getFullYear())&&o.setFullYear(e),o}).apply(null,o),r=e._useUTC?e._d.getUTCDay():e._d.getDay(),null!=e._tzm&&e._d.setUTCMinutes(e._d.getUTCMinutes()-e._tzm),e._nextDay&&(e._a[ge]=24),e._w&&void 0!==e._w.d&&e._w.d!==r&&(c(e).weekdayMismatch=!0)}}var ft=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,mt=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,_t=/Z|[+-]\d\d(?::?\d\d)?/,yt=[["YYYYYY-MM-DD",/[+-]\d{6}-\d\d-\d\d/],["YYYY-MM-DD",/\d{4}-\d\d-\d\d/],["GGGG-[W]WW-E",/\d{4}-W\d\d-\d/],["GGGG-[W]WW",/\d{4}-W\d\d/,!1],["YYYY-DDD",/\d{4}-\d{3}/],["YYYY-MM",/\d{4}-\d\d/,!1],["YYYYYYMMDD",/[+-]\d{10}/],["YYYYMMDD",/\d{8}/],["GGGG[W]WWE",/\d{4}W\d{3}/],["GGGG[W]WW",/\d{4}W\d{2}/,!1],["YYYYDDD",/\d{7}/]],gt=[["HH:mm:ss.SSSS",/\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss,SSSS",/\d\d:\d\d:\d\d,\d+/],["HH:mm:ss",/\d\d:\d\d:\d\d/],["HH:mm",/\d\d:\d\d/],["HHmmss.SSSS",/\d\d\d\d\d\d\.\d+/],["HHmmss,SSSS",/\d\d\d\d\d\d,\d+/],["HHmmss",/\d\d\d\d\d\d/],["HHmm",/\d\d\d\d/],["HH",/\d\d/]],pt=/^\/?Date\((\-?\d+)/i;function vt(e){var t,n,s,i,r,a,o=e._i,u=ft.exec(o)||mt.exec(o);if(u){for(c(e).iso=!0,t=0,n=yt.length;t<n;t++)if(yt[t][1].exec(u[1])){i=yt[t][0],s=!1!==yt[t][2];break}if(null==i)return void(e._isValid=!1);if(u[3]){for(t=0,n=gt.length;t<n;t++)if(gt[t][1].exec(u[3])){r=(u[2]||" ")+gt[t][0];break}if(null==r)return void(e._isValid=!1)}if(!s&&null!=r)return void(e._isValid=!1);if(u[4]){if(!_t.exec(u[4]))return void(e._isValid=!1);a="Z"}e._f=i+(r||"")+(a||""),kt(e)}else e._isValid=!1}var wt=/^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;function Mt(e,t,n,s,i,r){var a=[function(e){var t=parseInt(e,10);{if(t<=49)return 2e3+t;if(t<=999)return 1900+t}return t}(e),Re.indexOf(t),parseInt(n,10),parseInt(s,10),parseInt(i,10)];return r&&a.push(parseInt(r,10)),a}var St={UT:0,GMT:0,EDT:-240,EST:-300,CDT:-300,CST:-360,MDT:-360,MST:-420,PDT:-420,PST:-480};function Dt(e){var t,n,s,i=wt.exec(e._i.replace(/\([^)]*\)|[\n\t]/g," ").replace(/(\s\s+)/g," ").trim());if(i){var r=Mt(i[4],i[3],i[2],i[5],i[6],i[7]);if(t=i[1],n=r,s=e,t&&Ze.indexOf(t)!==new Date(n[0],n[1],n[2]).getDay()&&(c(s).weekdayMismatch=!0,s._isValid=!1,1))return;e._a=r,e._tzm=function(e,t,n){if(e)return St[e];if(t)return 0;var s=parseInt(n,10),i=s%100;return(s-i)/100*60+i}(i[8],i[9],i[10]),e._d=Ge.apply(null,e._a),e._d.setUTCMinutes(e._d.getUTCMinutes()-e._tzm),c(e).rfc2822=!0}else e._isValid=!1}function kt(e){if(e._f!==n.ISO_8601)if(e._f!==n.RFC_2822){e._a=[],c(e).empty=!0;var t,s,i,r,a,o,u,d,h=""+e._i,f=h.length,m=0;for(i=j(e._f,e._locale).match(N)||[],t=0;t<i.length;t++)r=i[t],(s=(h.match(le(r,e))||[])[0])&&((a=h.substr(0,h.indexOf(s))).length>0&&c(e).unusedInput.push(a),h=h.slice(h.indexOf(s)+s.length),m+=s.length),E[r]?(s?c(e).empty=!1:c(e).unusedTokens.push(r),o=r,d=e,null!=(u=s)&&l(he,o)&&he[o](u,d._a,d,o)):e._strict&&!s&&c(e).unusedTokens.push(r);c(e).charsLeftOver=f-m,h.length>0&&c(e).unusedInput.push(h),e._a[ge]<=12&&!0===c(e).bigHour&&e._a[ge]>0&&(c(e).bigHour=void 0),c(e).parsedDateParts=e._a.slice(0),c(e).meridiem=e._meridiem,e._a[ge]=function(e,t,n){var s;if(null==n)return t;return null!=e.meridiemHour?e.meridiemHour(t,n):null!=e.isPM?((s=e.isPM(n))&&t<12&&(t+=12),s||12!==t||(t=0),t):t}(e._locale,e._a[ge],e._meridiem),ct(e),dt(e)}else Dt(e);else vt(e)}function Yt(e){var t,l,h,_,g=e._i,w=e._f;return e._locale=e._locale||lt(e._l),null===g||void 0===w&&""===g?m({nullInput:!0}):("string"==typeof g&&(e._i=g=e._locale.preparse(g)),v(g)?new p(dt(g)):(o(g)?e._d=g:s(w)?function(e){var t,n,s,i,r;if(0===e._f.length)return c(e).invalidFormat=!0,void(e._d=new Date(NaN));for(i=0;i<e._f.length;i++)r=0,t=y({},e),null!=e._useUTC&&(t._useUTC=e._useUTC),t._f=e._f[i],kt(t),f(t)&&(r+=c(t).charsLeftOver,r+=10*c(t).unusedTokens.length,c(t).score=r,(null==s||r<s)&&(s=r,n=t));d(e,n||t)}(e):w?kt(e):r(l=(t=e)._i)?t._d=new Date(n.now()):o(l)?t._d=new Date(l.valueOf()):"string"==typeof l?(h=t,null===(_=pt.exec(h._i))?(vt(h),!1===h._isValid&&(delete h._isValid,Dt(h),!1===h._isValid&&(delete h._isValid,n.createFromInputFallback(h)))):h._d=new Date(+_[1])):s(l)?(t._a=u(l.slice(0),function(e){return parseInt(e,10)}),ct(t)):i(l)?function(e){if(!e._d){var t=C(e._i);e._a=u([t.year,t.month,t.day||t.date,t.hour,t.minute,t.second,t.millisecond],function(e){return e&&parseInt(e,10)}),ct(e)}}(t):a(l)?t._d=new Date(l):n.createFromInputFallback(t),f(e)||(e._d=null),e))}function Ot(e,t,n,r,a){var o,u={};return!0!==n&&!1!==n||(r=n,n=void 0),(i(e)&&function(e){if(Object.getOwnPropertyNames)return 0===Object.getOwnPropertyNames(e).length;var t;for(t in e)if(e.hasOwnProperty(t))return!1;return!0}(e)||s(e)&&0===e.length)&&(e=void 0),u._isAMomentObject=!0,u._useUTC=u._isUTC=a,u._l=n,u._i=e,u._f=t,u._strict=r,(o=new p(dt(Yt(u))))._nextDay&&(o.add(1,"d"),o._nextDay=void 0),o}function Tt(e,t,n,s){return Ot(e,t,n,s,!1)}n.createFromInputFallback=k("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",function(e){e._d=new Date(e._i+(e._useUTC?" UTC":""))}),n.ISO_8601=function(){},n.RFC_2822=function(){};var xt=k("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var e=Tt.apply(null,arguments);return this.isValid()&&e.isValid()?e<this?this:e:m()}),bt=k("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var e=Tt.apply(null,arguments);return this.isValid()&&e.isValid()?e>this?this:e:m()});function Pt(e,t){var n,i;if(1===t.length&&s(t[0])&&(t=t[0]),!t.length)return Tt();for(n=t[0],i=1;i<t.length;++i)t[i].isValid()&&!t[i][e](n)||(n=t[i]);return n}var Wt=["year","quarter","month","week","day","hour","minute","second","millisecond"];function Ht(e){var t=C(e),n=t.year||0,s=t.quarter||0,i=t.month||0,r=t.week||0,a=t.day||0,o=t.hour||0,u=t.minute||0,l=t.second||0,d=t.millisecond||0;this._isValid=function(e){for(var t in e)if(-1===Ye.call(Wt,t)||null!=e[t]&&isNaN(e[t]))return!1;for(var n=!1,s=0;s<Wt.length;++s)if(e[Wt[s]]){if(n)return!1;parseFloat(e[Wt[s]])!==M(e[Wt[s]])&&(n=!0)}return!0}(t),this._milliseconds=+d+1e3*l+6e4*u+1e3*o*60*60,this._days=+a+7*r,this._months=+i+3*s+12*n,this._data={},this._locale=lt(),this._bubble()}function Rt(e){return e instanceof Ht}function Ct(e){return e<0?-1*Math.round(-1*e):Math.round(e)}function Ft(e,t){I(e,0,0,function(){var e=this.utcOffset(),n="+";return e<0&&(e=-e,n="-"),n+U(~~(e/60),2)+t+U(~~e%60,2)})}Ft("Z",":"),Ft("ZZ",""),ue("Z",re),ue("ZZ",re),ce(["Z","ZZ"],function(e,t,n){n._useUTC=!0,n._tzm=Ut(re,e)});var Lt=/([\+\-]|\d\d)/gi;function Ut(e,t){var n=(t||"").match(e);if(null===n)return null;var s=((n[n.length-1]||[])+"").match(Lt)||["-",0,0],i=60*s[1]+M(s[2]);return 0===i?0:"+"===s[0]?i:-i}function Nt(e,t){var s,i;return t._isUTC?(s=t.clone(),i=(v(e)||o(e)?e.valueOf():Tt(e).valueOf())-s.valueOf(),s._d.setTime(s._d.valueOf()+i),n.updateOffset(s,!1),s):Tt(e).local()}function Gt(e){return 15*-Math.round(e._d.getTimezoneOffset()/15)}function Vt(){return!!this.isValid()&&(this._isUTC&&0===this._offset)}n.updateOffset=function(){};var Et=/^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,It=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;function At(e,t){var n,s,i,r=e,o=null;return Rt(e)?r={ms:e._milliseconds,d:e._days,M:e._months}:a(e)?(r={},t?r[t]=e:r.milliseconds=e):(o=Et.exec(e))?(n="-"===o[1]?-1:1,r={y:0,d:M(o[ye])*n,h:M(o[ge])*n,m:M(o[pe])*n,s:M(o[ve])*n,ms:M(Ct(1e3*o[we]))*n}):(o=It.exec(e))?(n="-"===o[1]?-1:(o[1],1),r={y:jt(o[2],n),M:jt(o[3],n),w:jt(o[4],n),d:jt(o[5],n),h:jt(o[6],n),m:jt(o[7],n),s:jt(o[8],n)}):null==r?r={}:"object"==typeof r&&("from"in r||"to"in r)&&(i=function(e,t){var n;if(!e.isValid()||!t.isValid())return{milliseconds:0,months:0};t=Nt(t,e),e.isBefore(t)?n=Zt(e,t):((n=Zt(t,e)).milliseconds=-n.milliseconds,n.months=-n.months);return n}(Tt(r.from),Tt(r.to)),(r={}).ms=i.milliseconds,r.M=i.months),s=new Ht(r),Rt(e)&&l(e,"_locale")&&(s._locale=e._locale),s}function jt(e,t){var n=e&&parseFloat(e.replace(",","."));return(isNaN(n)?0:n)*t}function Zt(e,t){var n={milliseconds:0,months:0};return n.months=t.month()-e.month()+12*(t.year()-e.year()),e.clone().add(n.months,"M").isAfter(t)&&--n.months,n.milliseconds=+t-+e.clone().add(n.months,"M"),n}function zt(e,t){return function(n,s){var i;return null===s||isNaN(+s)||(T(t,"moment()."+t+"(period, number) is deprecated. Please use moment()."+t+"(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."),i=n,n=s,s=i),$t(this,At(n="string"==typeof n?+n:n,s),e),this}}function $t(e,t,s,i){var r=t._milliseconds,a=Ct(t._days),o=Ct(t._months);e.isValid()&&(i=null==i||i,o&&Ce(e,xe(e,"Month")+o*s),a&&be(e,"Date",xe(e,"Date")+a*s),r&&e._d.setTime(e._d.valueOf()+r*s),i&&n.updateOffset(e,a||o))}At.fn=Ht.prototype,At.invalid=function(){return At(NaN)};var qt=zt(1,"add"),Jt=zt(-1,"subtract");function Bt(e,t){var n=12*(t.year()-e.year())+(t.month()-e.month()),s=e.clone().add(n,"months");return-(n+(t-s<0?(t-s)/(s-e.clone().add(n-1,"months")):(t-s)/(e.clone().add(n+1,"months")-s)))||0}function Qt(e){var t;return void 0===e?this._locale._abbr:(null!=(t=lt(e))&&(this._locale=t),this)}n.defaultFormat="YYYY-MM-DDTHH:mm:ssZ",n.defaultFormatUtc="YYYY-MM-DDTHH:mm:ss[Z]";var Xt=k("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(e){return void 0===e?this.localeData():this.locale(e)});function Kt(){return this._locale}function en(e,t){I(0,[e,e.length],0,t)}function tn(e,t,n,s,i){var r;return null==e?Ie(this,s,i).year:(t>(r=Ae(e,s,i))&&(t=r),function(e,t,n,s,i){var r=Ee(e,t,n,s,i),a=Ge(r.year,0,r.dayOfYear);return this.year(a.getUTCFullYear()),this.month(a.getUTCMonth()),this.date(a.getUTCDate()),this}.call(this,e,t,n,s,i))}I(0,["gg",2],0,function(){return this.weekYear()%100}),I(0,["GG",2],0,function(){return this.isoWeekYear()%100}),en("gggg","weekYear"),en("ggggg","weekYear"),en("GGGG","isoWeekYear"),en("GGGGG","isoWeekYear"),H("weekYear","gg"),H("isoWeekYear","GG"),L("weekYear",1),L("isoWeekYear",1),ue("G",se),ue("g",se),ue("GG",B,z),ue("gg",B,z),ue("GGGG",ee,q),ue("gggg",ee,q),ue("GGGGG",te,J),ue("ggggg",te,J),fe(["gggg","ggggg","GGGG","GGGGG"],function(e,t,n,s){t[s.substr(0,2)]=M(e)}),fe(["gg","GG"],function(e,t,s,i){t[i]=n.parseTwoDigitYear(e)}),I("Q",0,"Qo","quarter"),H("quarter","Q"),L("quarter",7),ue("Q",Z),ce("Q",function(e,t){t[_e]=3*(M(e)-1)}),I("D",["DD",2],"Do","date"),H("date","D"),L("date",9),ue("D",B),ue("DD",B,z),ue("Do",function(e,t){return e?t._dayOfMonthOrdinalParse||t._ordinalParse:t._dayOfMonthOrdinalParseLenient}),ce(["D","DD"],ye),ce("Do",function(e,t){t[ye]=M(e.match(B)[0])});var nn=Te("Date",!0);I("DDD",["DDDD",3],"DDDo","dayOfYear"),H("dayOfYear","DDD"),L("dayOfYear",4),ue("DDD",K),ue("DDDD",$),ce(["DDD","DDDD"],function(e,t,n){n._dayOfYear=M(e)}),I("m",["mm",2],0,"minute"),H("minute","m"),L("minute",14),ue("m",B),ue("mm",B,z),ce(["m","mm"],pe);var sn=Te("Minutes",!1);I("s",["ss",2],0,"second"),H("second","s"),L("second",15),ue("s",B),ue("ss",B,z),ce(["s","ss"],ve);var rn,an=Te("Seconds",!1);for(I("S",0,0,function(){return~~(this.millisecond()/100)}),I(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),I(0,["SSS",3],0,"millisecond"),I(0,["SSSS",4],0,function(){return 10*this.millisecond()}),I(0,["SSSSS",5],0,function(){return 100*this.millisecond()}),I(0,["SSSSSS",6],0,function(){return 1e3*this.millisecond()}),I(0,["SSSSSSS",7],0,function(){return 1e4*this.millisecond()}),I(0,["SSSSSSSS",8],0,function(){return 1e5*this.millisecond()}),I(0,["SSSSSSSSS",9],0,function(){return 1e6*this.millisecond()}),H("millisecond","ms"),L("millisecond",16),ue("S",K,Z),ue("SS",K,z),ue("SSS",K,$),rn="SSSS";rn.length<=9;rn+="S")ue(rn,ne);function on(e,t){t[we]=M(1e3*("0."+e))}for(rn="S";rn.length<=9;rn+="S")ce(rn,on);var un=Te("Milliseconds",!1);I("z",0,0,"zoneAbbr"),I("zz",0,0,"zoneName");var ln=p.prototype;function dn(e){return e}ln.add=qt,ln.calendar=function(e,t){var s=e||Tt(),i=Nt(s,this).startOf("day"),r=n.calendarFormat(this,i)||"sameElse",a=t&&(x(t[r])?t[r].call(this,s):t[r]);return this.format(a||this.localeData().calendar(r,this,Tt(s)))},ln.clone=function(){return new p(this)},ln.diff=function(e,t,n){var s,i,r;if(!this.isValid())return NaN;if(!(s=Nt(e,this)).isValid())return NaN;switch(i=6e4*(s.utcOffset()-this.utcOffset()),t=R(t)){case"year":r=Bt(this,s)/12;break;case"month":r=Bt(this,s);break;case"quarter":r=Bt(this,s)/3;break;case"second":r=(this-s)/1e3;break;case"minute":r=(this-s)/6e4;break;case"hour":r=(this-s)/36e5;break;case"day":r=(this-s-i)/864e5;break;case"week":r=(this-s-i)/6048e5;break;default:r=this-s}return n?r:w(r)},ln.endOf=function(e){return void 0===(e=R(e))||"millisecond"===e?this:("date"===e&&(e="day"),this.startOf(e).add(1,"isoWeek"===e?"week":e).subtract(1,"ms"))},ln.format=function(e){e||(e=this.isUtc()?n.defaultFormatUtc:n.defaultFormat);var t=A(this,e);return this.localeData().postformat(t)},ln.from=function(e,t){return this.isValid()&&(v(e)&&e.isValid()||Tt(e).isValid())?At({to:this,from:e}).locale(this.locale()).humanize(!t):this.localeData().invalidDate()},ln.fromNow=function(e){return this.from(Tt(),e)},ln.to=function(e,t){return this.isValid()&&(v(e)&&e.isValid()||Tt(e).isValid())?At({from:this,to:e}).locale(this.locale()).humanize(!t):this.localeData().invalidDate()},ln.toNow=function(e){return this.to(Tt(),e)},ln.get=function(e){return x(this[e=R(e)])?this[e]():this},ln.invalidAt=function(){return c(this).overflow},ln.isAfter=function(e,t){var n=v(e)?e:Tt(e);return!(!this.isValid()||!n.isValid())&&("millisecond"===(t=R(r(t)?"millisecond":t))?this.valueOf()>n.valueOf():n.valueOf()<this.clone().startOf(t).valueOf())},ln.isBefore=function(e,t){var n=v(e)?e:Tt(e);return!(!this.isValid()||!n.isValid())&&("millisecond"===(t=R(r(t)?"millisecond":t))?this.valueOf()<n.valueOf():this.clone().endOf(t).valueOf()<n.valueOf())},ln.isBetween=function(e,t,n,s){return("("===(s=s||"()")[0]?this.isAfter(e,n):!this.isBefore(e,n))&&(")"===s[1]?this.isBefore(t,n):!this.isAfter(t,n))},ln.isSame=function(e,t){var n,s=v(e)?e:Tt(e);return!(!this.isValid()||!s.isValid())&&("millisecond"===(t=R(t||"millisecond"))?this.valueOf()===s.valueOf():(n=s.valueOf(),this.clone().startOf(t).valueOf()<=n&&n<=this.clone().endOf(t).valueOf()))},ln.isSameOrAfter=function(e,t){return this.isSame(e,t)||this.isAfter(e,t)},ln.isSameOrBefore=function(e,t){return this.isSame(e,t)||this.isBefore(e,t)},ln.isValid=function(){return f(this)},ln.lang=Xt,ln.locale=Qt,ln.localeData=Kt,ln.max=bt,ln.min=xt,ln.parsingFlags=function(){return d({},c(this))},ln.set=function(e,t){if("object"==typeof e)for(var n=function(e){var t=[];for(var n in e)t.push({unit:n,priority:F[n]});return t.sort(function(e,t){return e.priority-t.priority}),t}(e=C(e)),s=0;s<n.length;s++)this[n[s].unit](e[n[s].unit]);else if(x(this[e=R(e)]))return this[e](t);return this},ln.startOf=function(e){switch(e=R(e)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":case"date":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===e&&this.weekday(0),"isoWeek"===e&&this.isoWeekday(1),"quarter"===e&&this.month(3*Math.floor(this.month()/3)),this},ln.subtract=Jt,ln.toArray=function(){var e=this;return[e.year(),e.month(),e.date(),e.hour(),e.minute(),e.second(),e.millisecond()]},ln.toObject=function(){var e=this;return{years:e.year(),months:e.month(),date:e.date(),hours:e.hours(),minutes:e.minutes(),seconds:e.seconds(),milliseconds:e.milliseconds()}},ln.toDate=function(){return new Date(this.valueOf())},ln.toISOString=function(e){if(!this.isValid())return null;var t=!0!==e,n=t?this.clone().utc():this;return n.year()<0||n.year()>9999?A(n,t?"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]":"YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"):x(Date.prototype.toISOString)?t?this.toDate().toISOString():new Date(this.valueOf()+60*this.utcOffset()*1e3).toISOString().replace("Z",A(n,"Z")):A(n,t?"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]":"YYYY-MM-DD[T]HH:mm:ss.SSSZ")},ln.inspect=function(){if(!this.isValid())return"moment.invalid(/* "+this._i+" */)";var e="moment",t="";this.isLocal()||(e=0===this.utcOffset()?"moment.utc":"moment.parseZone",t="Z");var n="["+e+'("]',s=0<=this.year()&&this.year()<=9999?"YYYY":"YYYYYY",i=t+'[")]';return this.format(n+s+"-MM-DD[T]HH:mm:ss.SSS"+i)},ln.toJSON=function(){return this.isValid()?this.toISOString():null},ln.toString=function(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},ln.unix=function(){return Math.floor(this.valueOf()/1e3)},ln.valueOf=function(){return this._d.valueOf()-6e4*(this._offset||0)},ln.creationData=function(){return{input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict}},ln.year=Oe,ln.isLeapYear=function(){return ke(this.year())},ln.weekYear=function(e){return tn.call(this,e,this.week(),this.weekday(),this.localeData()._week.dow,this.localeData()._week.doy)},ln.isoWeekYear=function(e){return tn.call(this,e,this.isoWeek(),this.isoWeekday(),1,4)},ln.quarter=ln.quarters=function(e){return null==e?Math.ceil((this.month()+1)/3):this.month(3*(e-1)+this.month()%3)},ln.month=Fe,ln.daysInMonth=function(){return Pe(this.year(),this.month())},ln.week=ln.weeks=function(e){var t=this.localeData().week(this);return null==e?t:this.add(7*(e-t),"d")},ln.isoWeek=ln.isoWeeks=function(e){var t=Ie(this,1,4).week;return null==e?t:this.add(7*(e-t),"d")},ln.weeksInYear=function(){var e=this.localeData()._week;return Ae(this.year(),e.dow,e.doy)},ln.isoWeeksInYear=function(){return Ae(this.year(),1,4)},ln.date=nn,ln.day=ln.days=function(e){if(!this.isValid())return null!=e?this:NaN;var t,n,s=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=e?(t=e,n=this.localeData(),e="string"!=typeof t?t:isNaN(t)?"number"==typeof(t=n.weekdaysParse(t))?t:null:parseInt(t,10),this.add(e-s,"d")):s},ln.weekday=function(e){if(!this.isValid())return null!=e?this:NaN;var t=(this.day()+7-this.localeData()._week.dow)%7;return null==e?t:this.add(e-t,"d")},ln.isoWeekday=function(e){if(!this.isValid())return null!=e?this:NaN;if(null!=e){var t=(n=e,s=this.localeData(),"string"==typeof n?s.weekdaysParse(n)%7||7:isNaN(n)?null:n);return this.day(this.day()%7?t:t-7)}return this.day()||7;var n,s},ln.dayOfYear=function(e){var t=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==e?t:this.add(e-t,"d")},ln.hour=ln.hours=tt,ln.minute=ln.minutes=sn,ln.second=ln.seconds=an,ln.millisecond=ln.milliseconds=un,ln.utcOffset=function(e,t,s){var i,r=this._offset||0;if(!this.isValid())return null!=e?this:NaN;if(null!=e){if("string"==typeof e){if(null===(e=Ut(re,e)))return this}else Math.abs(e)<16&&!s&&(e*=60);return!this._isUTC&&t&&(i=Gt(this)),this._offset=e,this._isUTC=!0,null!=i&&this.add(i,"m"),r!==e&&(!t||this._changeInProgress?$t(this,At(e-r,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,n.updateOffset(this,!0),this._changeInProgress=null)),this}return this._isUTC?r:Gt(this)},ln.utc=function(e){return this.utcOffset(0,e)},ln.local=function(e){return this._isUTC&&(this.utcOffset(0,e),this._isUTC=!1,e&&this.subtract(Gt(this),"m")),this},ln.parseZone=function(){if(null!=this._tzm)this.utcOffset(this._tzm,!1,!0);else if("string"==typeof this._i){var e=Ut(ie,this._i);null!=e?this.utcOffset(e):this.utcOffset(0,!0)}return this},ln.hasAlignedHourOffset=function(e){return!!this.isValid()&&(e=e?Tt(e).utcOffset():0,(this.utcOffset()-e)%60==0)},ln.isDST=function(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()},ln.isLocal=function(){return!!this.isValid()&&!this._isUTC},ln.isUtcOffset=function(){return!!this.isValid()&&this._isUTC},ln.isUtc=Vt,ln.isUTC=Vt,ln.zoneAbbr=function(){return this._isUTC?"UTC":""},ln.zoneName=function(){return this._isUTC?"Coordinated Universal Time":""},ln.dates=k("dates accessor is deprecated. Use date instead.",nn),ln.months=k("months accessor is deprecated. Use month instead",Fe),ln.years=k("years accessor is deprecated. Use year instead",Oe),ln.zone=k("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",function(e,t){return null!=e?("string"!=typeof e&&(e=-e),this.utcOffset(e,t),this):-this.utcOffset()}),ln.isDSTShifted=k("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",function(){if(!r(this._isDSTShifted))return this._isDSTShifted;var e={};if(y(e,this),(e=Yt(e))._a){var t=e._isUTC?h(e._a):Tt(e._a);this._isDSTShifted=this.isValid()&&S(e._a,t.toArray())>0}else this._isDSTShifted=!1;return this._isDSTShifted});var hn=P.prototype;function cn(e,t,n,s){var i=lt(),r=h().set(s,t);return i[n](r,e)}function fn(e,t,n){if(a(e)&&(t=e,e=void 0),e=e||"",null!=t)return cn(e,t,n,"month");var s,i=[];for(s=0;s<12;s++)i[s]=cn(e,s,n,"month");return i}function mn(e,t,n,s){"boolean"==typeof e?(a(t)&&(n=t,t=void 0),t=t||""):(n=t=e,e=!1,a(t)&&(n=t,t=void 0),t=t||"");var i,r=lt(),o=e?r._week.dow:0;if(null!=n)return cn(t,(n+o)%7,s,"day");var u=[];for(i=0;i<7;i++)u[i]=cn(t,(i+o)%7,s,"day");return u}hn.calendar=function(e,t,n){var s=this._calendar[e]||this._calendar.sameElse;return x(s)?s.call(t,n):s},hn.longDateFormat=function(e){var t=this._longDateFormat[e],n=this._longDateFormat[e.toUpperCase()];return t||!n?t:(this._longDateFormat[e]=n.replace(/MMMM|MM|DD|dddd/g,function(e){return e.slice(1)}),this._longDateFormat[e])},hn.invalidDate=function(){return this._invalidDate},hn.ordinal=function(e){return this._ordinal.replace("%d",e)},hn.preparse=dn,hn.postformat=dn,hn.relativeTime=function(e,t,n,s){var i=this._relativeTime[n];return x(i)?i(e,t,n,s):i.replace(/%d/i,e)},hn.pastFuture=function(e,t){var n=this._relativeTime[e>0?"future":"past"];return x(n)?n(t):n.replace(/%s/i,t)},hn.set=function(e){var t,n;for(n in e)x(t=e[n])?this[n]=t:this["_"+n]=t;this._config=e,this._dayOfMonthOrdinalParseLenient=new RegExp((this._dayOfMonthOrdinalParse.source||this._ordinalParse.source)+"|"+/\d{1,2}/.source)},hn.months=function(e,t){return e?s(this._months)?this._months[e.month()]:this._months[(this._months.isFormat||We).test(t)?"format":"standalone"][e.month()]:s(this._months)?this._months:this._months.standalone},hn.monthsShort=function(e,t){return e?s(this._monthsShort)?this._monthsShort[e.month()]:this._monthsShort[We.test(t)?"format":"standalone"][e.month()]:s(this._monthsShort)?this._monthsShort:this._monthsShort.standalone},hn.monthsParse=function(e,t,n){var s,i,r;if(this._monthsParseExact)return function(e,t,n){var s,i,r,a=e.toLocaleLowerCase();if(!this._monthsParse)for(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[],s=0;s<12;++s)r=h([2e3,s]),this._shortMonthsParse[s]=this.monthsShort(r,"").toLocaleLowerCase(),this._longMonthsParse[s]=this.months(r,"").toLocaleLowerCase();return n?"MMM"===t?-1!==(i=Ye.call(this._shortMonthsParse,a))?i:null:-1!==(i=Ye.call(this._longMonthsParse,a))?i:null:"MMM"===t?-1!==(i=Ye.call(this._shortMonthsParse,a))?i:-1!==(i=Ye.call(this._longMonthsParse,a))?i:null:-1!==(i=Ye.call(this._longMonthsParse,a))?i:-1!==(i=Ye.call(this._shortMonthsParse,a))?i:null}.call(this,e,t,n);for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),s=0;s<12;s++){if(i=h([2e3,s]),n&&!this._longMonthsParse[s]&&(this._longMonthsParse[s]=new RegExp("^"+this.months(i,"").replace(".","")+"$","i"),this._shortMonthsParse[s]=new RegExp("^"+this.monthsShort(i,"").replace(".","")+"$","i")),n||this._monthsParse[s]||(r="^"+this.months(i,"")+"|^"+this.monthsShort(i,""),this._monthsParse[s]=new RegExp(r.replace(".",""),"i")),n&&"MMMM"===t&&this._longMonthsParse[s].test(e))return s;if(n&&"MMM"===t&&this._shortMonthsParse[s].test(e))return s;if(!n&&this._monthsParse[s].test(e))return s}},hn.monthsRegex=function(e){return this._monthsParseExact?(l(this,"_monthsRegex")||Ne.call(this),e?this._monthsStrictRegex:this._monthsRegex):(l(this,"_monthsRegex")||(this._monthsRegex=Ue),this._monthsStrictRegex&&e?this._monthsStrictRegex:this._monthsRegex)},hn.monthsShortRegex=function(e){return this._monthsParseExact?(l(this,"_monthsRegex")||Ne.call(this),e?this._monthsShortStrictRegex:this._monthsShortRegex):(l(this,"_monthsShortRegex")||(this._monthsShortRegex=Le),this._monthsShortStrictRegex&&e?this._monthsShortStrictRegex:this._monthsShortRegex)},hn.week=function(e){return Ie(e,this._week.dow,this._week.doy).week},hn.firstDayOfYear=function(){return this._week.doy},hn.firstDayOfWeek=function(){return this._week.dow},hn.weekdays=function(e,t){return e?s(this._weekdays)?this._weekdays[e.day()]:this._weekdays[this._weekdays.isFormat.test(t)?"format":"standalone"][e.day()]:s(this._weekdays)?this._weekdays:this._weekdays.standalone},hn.weekdaysMin=function(e){return e?this._weekdaysMin[e.day()]:this._weekdaysMin},hn.weekdaysShort=function(e){return e?this._weekdaysShort[e.day()]:this._weekdaysShort},hn.weekdaysParse=function(e,t,n){var s,i,r;if(this._weekdaysParseExact)return function(e,t,n){var s,i,r,a=e.toLocaleLowerCase();if(!this._weekdaysParse)for(this._weekdaysParse=[],this._shortWeekdaysParse=[],this._minWeekdaysParse=[],s=0;s<7;++s)r=h([2e3,1]).day(s),this._minWeekdaysParse[s]=this.weekdaysMin(r,"").toLocaleLowerCase(),this._shortWeekdaysParse[s]=this.weekdaysShort(r,"").toLocaleLowerCase(),this._weekdaysParse[s]=this.weekdays(r,"").toLocaleLowerCase();return n?"dddd"===t?-1!==(i=Ye.call(this._weekdaysParse,a))?i:null:"ddd"===t?-1!==(i=Ye.call(this._shortWeekdaysParse,a))?i:null:-1!==(i=Ye.call(this._minWeekdaysParse,a))?i:null:"dddd"===t?-1!==(i=Ye.call(this._weekdaysParse,a))?i:-1!==(i=Ye.call(this._shortWeekdaysParse,a))?i:-1!==(i=Ye.call(this._minWeekdaysParse,a))?i:null:"ddd"===t?-1!==(i=Ye.call(this._shortWeekdaysParse,a))?i:-1!==(i=Ye.call(this._weekdaysParse,a))?i:-1!==(i=Ye.call(this._minWeekdaysParse,a))?i:null:-1!==(i=Ye.call(this._minWeekdaysParse,a))?i:-1!==(i=Ye.call(this._weekdaysParse,a))?i:-1!==(i=Ye.call(this._shortWeekdaysParse,a))?i:null}.call(this,e,t,n);for(this._weekdaysParse||(this._weekdaysParse=[],this._minWeekdaysParse=[],this._shortWeekdaysParse=[],this._fullWeekdaysParse=[]),s=0;s<7;s++){if(i=h([2e3,1]).day(s),n&&!this._fullWeekdaysParse[s]&&(this._fullWeekdaysParse[s]=new RegExp("^"+this.weekdays(i,"").replace(".",".?")+"$","i"),this._shortWeekdaysParse[s]=new RegExp("^"+this.weekdaysShort(i,"").replace(".",".?")+"$","i"),this._minWeekdaysParse[s]=new RegExp("^"+this.weekdaysMin(i,"").replace(".",".?")+"$","i")),this._weekdaysParse[s]||(r="^"+this.weekdays(i,"")+"|^"+this.weekdaysShort(i,"")+"|^"+this.weekdaysMin(i,""),this._weekdaysParse[s]=new RegExp(r.replace(".",""),"i")),n&&"dddd"===t&&this._fullWeekdaysParse[s].test(e))return s;if(n&&"ddd"===t&&this._shortWeekdaysParse[s].test(e))return s;if(n&&"dd"===t&&this._minWeekdaysParse[s].test(e))return s;if(!n&&this._weekdaysParse[s].test(e))return s}},hn.weekdaysRegex=function(e){return this._weekdaysParseExact?(l(this,"_weekdaysRegex")||Be.call(this),e?this._weekdaysStrictRegex:this._weekdaysRegex):(l(this,"_weekdaysRegex")||(this._weekdaysRegex=$e),this._weekdaysStrictRegex&&e?this._weekdaysStrictRegex:this._weekdaysRegex)},hn.weekdaysShortRegex=function(e){return this._weekdaysParseExact?(l(this,"_weekdaysRegex")||Be.call(this),e?this._weekdaysShortStrictRegex:this._weekdaysShortRegex):(l(this,"_weekdaysShortRegex")||(this._weekdaysShortRegex=qe),this._weekdaysShortStrictRegex&&e?this._weekdaysShortStrictRegex:this._weekdaysShortRegex)},hn.weekdaysMinRegex=function(e){return this._weekdaysParseExact?(l(this,"_weekdaysRegex")||Be.call(this),e?this._weekdaysMinStrictRegex:this._weekdaysMinRegex):(l(this,"_weekdaysMinRegex")||(this._weekdaysMinRegex=Je),this._weekdaysMinStrictRegex&&e?this._weekdaysMinStrictRegex:this._weekdaysMinRegex)},hn.isPM=function(e){return"p"===(e+"").toLowerCase().charAt(0)},hn.meridiem=function(e,t,n){return e>11?n?"pm":"PM":n?"am":"AM"},ot("en",{dayOfMonthOrdinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(e){var t=e%10;return e+(1===M(e%100/10)?"th":1===t?"st":2===t?"nd":3===t?"rd":"th")}}),n.lang=k("moment.lang is deprecated. Use moment.locale instead.",ot),n.langData=k("moment.langData is deprecated. Use moment.localeData instead.",lt);var _n=Math.abs;function yn(e,t,n,s){var i=At(t,n);return e._milliseconds+=s*i._milliseconds,e._days+=s*i._days,e._months+=s*i._months,e._bubble()}function gn(e){return e<0?Math.floor(e):Math.ceil(e)}function pn(e){return 4800*e/146097}function vn(e){return 146097*e/4800}function wn(e){return function(){return this.as(e)}}var Mn=wn("ms"),Sn=wn("s"),Dn=wn("m"),kn=wn("h"),Yn=wn("d"),On=wn("w"),Tn=wn("M"),xn=wn("y");function bn(e){return function(){return this.isValid()?this._data[e]:NaN}}var Pn=bn("milliseconds"),Wn=bn("seconds"),Hn=bn("minutes"),Rn=bn("hours"),Cn=bn("days"),Fn=bn("months"),Ln=bn("years");var Un=Math.round,Nn={ss:44,s:45,m:45,h:22,d:26,M:11};var Gn=Math.abs;function Vn(e){return(e>0)-(e<0)||+e}function En(){if(!this.isValid())return this.localeData().invalidDate();var e,t,n=Gn(this._milliseconds)/1e3,s=Gn(this._days),i=Gn(this._months);t=w((e=w(n/60))/60),n%=60,e%=60;var r=w(i/12),a=i%=12,o=s,u=t,l=e,d=n?n.toFixed(3).replace(/\.?0+$/,""):"",h=this.asSeconds();if(!h)return"P0D";var c=h<0?"-":"",f=Vn(this._months)!==Vn(h)?"-":"",m=Vn(this._days)!==Vn(h)?"-":"",_=Vn(this._milliseconds)!==Vn(h)?"-":"";return c+"P"+(r?f+r+"Y":"")+(a?f+a+"M":"")+(o?m+o+"D":"")+(u||l||d?"T":"")+(u?_+u+"H":"")+(l?_+l+"M":"")+(d?_+d+"S":"")}var In=Ht.prototype;return In.isValid=function(){return this._isValid},In.abs=function(){var e=this._data;return this._milliseconds=_n(this._milliseconds),this._days=_n(this._days),this._months=_n(this._months),e.milliseconds=_n(e.milliseconds),e.seconds=_n(e.seconds),e.minutes=_n(e.minutes),e.hours=_n(e.hours),e.months=_n(e.months),e.years=_n(e.years),this},In.add=function(e,t){return yn(this,e,t,1)},In.subtract=function(e,t){return yn(this,e,t,-1)},In.as=function(e){if(!this.isValid())return NaN;var t,n,s=this._milliseconds;if("month"===(e=R(e))||"year"===e)return t=this._days+s/864e5,n=this._months+pn(t),"month"===e?n:n/12;switch(t=this._days+Math.round(vn(this._months)),e){case"week":return t/7+s/6048e5;case"day":return t+s/864e5;case"hour":return 24*t+s/36e5;case"minute":return 1440*t+s/6e4;case"second":return 86400*t+s/1e3;case"millisecond":return Math.floor(864e5*t)+s;default:throw new Error("Unknown unit "+e)}},In.asMilliseconds=Mn,In.asSeconds=Sn,In.asMinutes=Dn,In.asHours=kn,In.asDays=Yn,In.asWeeks=On,In.asMonths=Tn,In.asYears=xn,In.valueOf=function(){return this.isValid()?this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*M(this._months/12):NaN},In._bubble=function(){var e,t,n,s,i,r=this._milliseconds,a=this._days,o=this._months,u=this._data;return r>=0&&a>=0&&o>=0||r<=0&&a<=0&&o<=0||(r+=864e5*gn(vn(o)+a),a=0,o=0),u.milliseconds=r%1e3,e=w(r/1e3),u.seconds=e%60,t=w(e/60),u.minutes=t%60,n=w(t/60),u.hours=n%24,o+=i=w(pn(a+=w(n/24))),a-=gn(vn(i)),s=w(o/12),o%=12,u.days=a,u.months=o,u.years=s,this},In.clone=function(){return At(this)},In.get=function(e){return e=R(e),this.isValid()?this[e+"s"]():NaN},In.milliseconds=Pn,In.seconds=Wn,In.minutes=Hn,In.hours=Rn,In.days=Cn,In.weeks=function(){return w(this.days()/7)},In.months=Fn,In.years=Ln,In.humanize=function(e){if(!this.isValid())return this.localeData().invalidDate();var t,n,s,i,r,a,o,u,l,d,h,c=this.localeData(),f=(n=!e,s=c,i=At(t=this).abs(),r=Un(i.as("s")),a=Un(i.as("m")),o=Un(i.as("h")),u=Un(i.as("d")),l=Un(i.as("M")),d=Un(i.as("y")),(h=r<=Nn.ss&&["s",r]||r<Nn.s&&["ss",r]||a<=1&&["m"]||a<Nn.m&&["mm",a]||o<=1&&["h"]||o<Nn.h&&["hh",o]||u<=1&&["d"]||u<Nn.d&&["dd",u]||l<=1&&["M"]||l<Nn.M&&["MM",l]||d<=1&&["y"]||["yy",d])[2]=n,h[3]=+t>0,h[4]=s,function(e,t,n,s,i){return i.relativeTime(t||1,!!n,e,s)}.apply(null,h));return e&&(f=c.pastFuture(+this,f)),c.postformat(f)},In.toISOString=En,In.toString=En,In.toJSON=En,In.locale=Qt,In.localeData=Kt,In.toIsoString=k("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",En),In.lang=Xt,I("X",0,0,"unix"),I("x",0,0,"valueOf"),ue("x",se),ue("X",/[+-]?\d+(\.\d{1,3})?/),ce("X",function(e,t,n){n._d=new Date(1e3*parseFloat(e,10))}),ce("x",function(e,t,n){n._d=new Date(M(e))}),n.version="2.21.0",e=Tt,n.fn=ln,n.min=function(){return Pt("isBefore",[].slice.call(arguments,0))},n.max=function(){return Pt("isAfter",[].slice.call(arguments,0))},n.now=function(){return Date.now?Date.now():+new Date},n.utc=h,n.unix=function(e){return Tt(1e3*e)},n.months=function(e,t){return fn(e,t,"months")},n.isDate=o,n.locale=ot,n.invalid=m,n.duration=At,n.isMoment=v,n.weekdays=function(e,t,n){return mn(e,t,n,"weekdays")},n.parseZone=function(){return Tt.apply(null,arguments).parseZone()},n.localeData=lt,n.isDuration=Rt,n.monthsShort=function(e,t){return fn(e,t,"monthsShort")},n.weekdaysMin=function(e,t,n){return mn(e,t,n,"weekdaysMin")},n.defineLocale=ut,n.updateLocale=function(e,t){if(null!=t){var n,s,i=nt;null!=(s=at(e))&&(i=s._config),(n=new P(t=b(i,t))).parentLocale=st[e],st[e]=n,ot(e)}else null!=st[e]&&(null!=st[e].parentLocale?st[e]=st[e].parentLocale:null!=st[e]&&delete st[e]);return st[e]},n.locales=function(){return Y(st)},n.weekdaysShort=function(e,t,n){return mn(e,t,n,"weekdaysShort")},n.normalizeUnits=R,n.relativeTimeRounding=function(e){return void 0===e?Un:"function"==typeof e&&(Un=e,!0)},n.relativeTimeThreshold=function(e,t){return void 0!==Nn[e]&&(void 0===t?Nn[e]:(Nn[e]=t,"s"===e&&(Nn.ss=t-1),!0))},n.calendarFormat=function(e,t){var n=e.diff(t,"days",!0);return n<-6?"sameElse":n<-1?"lastWeek":n<0?"lastDay":n<1?"sameDay":n<2?"nextDay":n<7?"nextWeek":"sameElse"},n.prototype=ln,n.HTML5_FMT={DATETIME_LOCAL:"YYYY-MM-DDTHH:mm",DATETIME_LOCAL_SECONDS:"YYYY-MM-DDTHH:mm:ss",DATETIME_LOCAL_MS:"YYYY-MM-DDTHH:mm:ss.SSS",DATE:"YYYY-MM-DD",TIME:"HH:mm",TIME_SECONDS:"HH:mm:ss",TIME_MS:"HH:mm:ss.SSS",WEEK:"YYYY-[W]WW",MONTH:"YYYY-MM"},n});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(24)(module)))

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

module.exports = function isBuffer (obj) {
  return obj != null && obj.constructor != null &&
    typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

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
var requestPipeline_1 = __webpack_require__(11);
var exponentialRetryPolicyFilter_1 = __webpack_require__(12);
var systemErrorRetryPolicyFilter_1 = __webpack_require__(13);
var redirectFilter_1 = __webpack_require__(14);
var signingFilter_1 = __webpack_require__(15);
var rpRegistrationFilter_1 = __webpack_require__(31);
var msRestUserAgentFilter_1 = __webpack_require__(16);
var webResource_1 = __webpack_require__(3);
var constants_1 = __webpack_require__(2);
/**
 * @class
 * Initializes a new instance of the ServiceClient.
 */
var ServiceClient = /** @class */ (function () {
    /**
     * The ServiceClient constructor
     * @constructor
     * @param {ServiceClientCredentials }[credentials] - BasicAuthenticationCredentials or
     * TokenCredentials object used for authentication.
     * @param { ServiceClientOptions } [options] The service client options that govern the behavior of the client.
     */
    function ServiceClient(credentials, options) {
        if (!options) {
            options = {};
        }
        if (!options.requestOptions) {
            options.requestOptions = {};
        }
        if (!options.filters) {
            options.filters = [];
        }
        this.userAgentInfo = { value: [] };
        if (credentials && !credentials.signRequest) {
            throw new Error("credentials argument needs to implement signRequest method");
        }
        try {
            var moduleName = "ms-rest-js";
            var moduleVersion = constants_1.Constants.msRestVersion;
            this.addUserAgentInfo(moduleName + "/" + moduleVersion);
        }
        catch (err) {
            // do nothing
        }
        if (credentials) {
            options.filters.push(new signingFilter_1.SigningFilter(credentials));
        }
        options.filters.push(new msRestUserAgentFilter_1.MsRestUserAgentFilter(this.userAgentInfo.value));
        options.filters.push(new redirectFilter_1.RedirectFilter());
        options.filters.push(new rpRegistrationFilter_1.RPRegistrationFilter(options.rpRegistrationRetryTimeout));
        if (!options.noRetryPolicy) {
            options.filters.push(new exponentialRetryPolicyFilter_1.ExponentialRetryPolicyFilter());
            options.filters.push(new systemErrorRetryPolicyFilter_1.SystemErrorRetryPolicyFilter());
        }
        this.pipeline = new requestPipeline_1.RequestPipeline(options.filters, options.requestOptions).create();
    }
    /**
     * Adds custom information to user agent header
     * @param {any} additionalUserAgentInfo - information to be added to user agent header, as string.
     */
    ServiceClient.prototype.addUserAgentInfo = function (additionalUserAgentInfo) {
        if (this.userAgentInfo.value.indexOf(additionalUserAgentInfo) === -1) {
            this.userAgentInfo.value.push(additionalUserAgentInfo);
        }
        return;
    };
    ServiceClient.prototype.sendRequest = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var httpRequest, operationResponse, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (options === null || options === undefined || typeof options !== "object") {
                            throw new Error("options cannot be null or undefined and it must be of type object.");
                        }
                        try {
                            if (options instanceof webResource_1.WebResource) {
                                options.validateRequestProperties();
                                httpRequest = options;
                            }
                            else {
                                httpRequest = new webResource_1.WebResource();
                                httpRequest = httpRequest.prepare(options);
                            }
                        }
                        catch (error) {
                            return [2 /*return*/, Promise.reject(error)];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.pipeline(httpRequest)];
                    case 2:
                        operationResponse = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        return [2 /*return*/, Promise.reject(err_1)];
                    case 4: return [2 /*return*/, Promise.resolve(operationResponse)];
                }
            });
        });
    };
    return ServiceClient;
}());
exports.ServiceClient = ServiceClient;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var required = __webpack_require__(29)
  , qs = __webpack_require__(30)
  , protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i
  , slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;

/**
 * These are the parse rules for the URL parser, it informs the parser
 * about:
 *
 * 0. The char it Needs to parse, if it's a string it should be done using
 *    indexOf, RegExp using exec and NaN means set as current value.
 * 1. The property we should set when parsing this value.
 * 2. Indication if it's backwards or forward parsing, when set as number it's
 *    the value of extra chars that should be split off.
 * 3. Inherit from location if non existing in the parser.
 * 4. `toLowerCase` the resulting value.
 */
var rules = [
  ['#', 'hash'],                        // Extract from the back.
  ['?', 'query'],                       // Extract from the back.
  ['/', 'pathname'],                    // Extract from the back.
  ['@', 'auth', 1],                     // Extract from the front.
  [NaN, 'host', undefined, 1, 1],       // Set left over value.
  [/:(\d+)$/, 'port', undefined, 1],    // RegExp the back.
  [NaN, 'hostname', undefined, 1, 1]    // Set left over.
];

/**
 * These properties should not be copied or inherited from. This is only needed
 * for all non blob URL's as a blob URL does not include a hash, only the
 * origin.
 *
 * @type {Object}
 * @private
 */
var ignore = { hash: 1, query: 1 };

/**
 * The location object differs when your code is loaded through a normal page,
 * Worker or through a worker using a blob. And with the blobble begins the
 * trouble as the location object will contain the URL of the blob, not the
 * location of the page where our code is loaded in. The actual origin is
 * encoded in the `pathname` so we can thankfully generate a good "default"
 * location from it so we can generate proper relative URL's again.
 *
 * @param {Object|String} loc Optional default location object.
 * @returns {Object} lolcation object.
 * @api public
 */
function lolcation(loc) {
  loc = loc || global.location || {};

  var finaldestination = {}
    , type = typeof loc
    , key;

  if ('blob:' === loc.protocol) {
    finaldestination = new URL(unescape(loc.pathname), {});
  } else if ('string' === type) {
    finaldestination = new URL(loc, {});
    for (key in ignore) delete finaldestination[key];
  } else if ('object' === type) {
    for (key in loc) {
      if (key in ignore) continue;
      finaldestination[key] = loc[key];
    }

    if (finaldestination.slashes === undefined) {
      finaldestination.slashes = slashes.test(loc.href);
    }
  }

  return finaldestination;
}

/**
 * @typedef ProtocolExtract
 * @type Object
 * @property {String} protocol Protocol matched in the URL, in lowercase.
 * @property {Boolean} slashes `true` if protocol is followed by "//", else `false`.
 * @property {String} rest Rest of the URL that is not part of the protocol.
 */

/**
 * Extract protocol information from a URL with/without double slash ("//").
 *
 * @param {String} address URL we want to extract from.
 * @return {ProtocolExtract} Extracted information.
 * @api private
 */
function extractProtocol(address) {
  var match = protocolre.exec(address);

  return {
    protocol: match[1] ? match[1].toLowerCase() : '',
    slashes: !!match[2],
    rest: match[3]
  };
}

/**
 * Resolve a relative URL pathname against a base URL pathname.
 *
 * @param {String} relative Pathname of the relative URL.
 * @param {String} base Pathname of the base URL.
 * @return {String} Resolved pathname.
 * @api private
 */
function resolve(relative, base) {
  var path = (base || '/').split('/').slice(0, -1).concat(relative.split('/'))
    , i = path.length
    , last = path[i - 1]
    , unshift = false
    , up = 0;

  while (i--) {
    if (path[i] === '.') {
      path.splice(i, 1);
    } else if (path[i] === '..') {
      path.splice(i, 1);
      up++;
    } else if (up) {
      if (i === 0) unshift = true;
      path.splice(i, 1);
      up--;
    }
  }

  if (unshift) path.unshift('');
  if (last === '.' || last === '..') path.push('');

  return path.join('/');
}

/**
 * The actual URL instance. Instead of returning an object we've opted-in to
 * create an actual constructor as it's much more memory efficient and
 * faster and it pleases my OCD.
 *
 * @constructor
 * @param {String} address URL we want to parse.
 * @param {Object|String} location Location defaults for relative paths.
 * @param {Boolean|Function} parser Parser for the query string.
 * @api public
 */
function URL(address, location, parser) {
  if (!(this instanceof URL)) {
    return new URL(address, location, parser);
  }

  var relative, extracted, parse, instruction, index, key
    , instructions = rules.slice()
    , type = typeof location
    , url = this
    , i = 0;

  //
  // The following if statements allows this module two have compatibility with
  // 2 different API:
  //
  // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
  //    where the boolean indicates that the query string should also be parsed.
  //
  // 2. The `URL` interface of the browser which accepts a URL, object as
  //    arguments. The supplied object will be used as default values / fall-back
  //    for relative paths.
  //
  if ('object' !== type && 'string' !== type) {
    parser = location;
    location = null;
  }

  if (parser && 'function' !== typeof parser) parser = qs.parse;

  location = lolcation(location);

  //
  // Extract protocol information before running the instructions.
  //
  extracted = extractProtocol(address || '');
  relative = !extracted.protocol && !extracted.slashes;
  url.slashes = extracted.slashes || relative && location.slashes;
  url.protocol = extracted.protocol || location.protocol || '';
  address = extracted.rest;

  //
  // When the authority component is absent the URL starts with a path
  // component.
  //
  if (!extracted.slashes) instructions[2] = [/(.*)/, 'pathname'];

  for (; i < instructions.length; i++) {
    instruction = instructions[i];
    parse = instruction[0];
    key = instruction[1];

    if (parse !== parse) {
      url[key] = address;
    } else if ('string' === typeof parse) {
      if (~(index = address.indexOf(parse))) {
        if ('number' === typeof instruction[2]) {
          url[key] = address.slice(0, index);
          address = address.slice(index + instruction[2]);
        } else {
          url[key] = address.slice(index);
          address = address.slice(0, index);
        }
      }
    } else if ((index = parse.exec(address))) {
      url[key] = index[1];
      address = address.slice(0, index.index);
    }

    url[key] = url[key] || (
      relative && instruction[3] ? location[key] || '' : ''
    );

    //
    // Hostname, host and protocol should be lowercased so they can be used to
    // create a proper `origin`.
    //
    if (instruction[4]) url[key] = url[key].toLowerCase();
  }

  //
  // Also parse the supplied query string in to an object. If we're supplied
  // with a custom parser as function use that instead of the default build-in
  // parser.
  //
  if (parser) url.query = parser(url.query);

  //
  // If the URL is relative, resolve the pathname against the base URL.
  //
  if (
      relative
    && location.slashes
    && url.pathname.charAt(0) !== '/'
    && (url.pathname !== '' || location.pathname !== '')
  ) {
    url.pathname = resolve(url.pathname, location.pathname);
  }

  //
  // We should not add port numbers if they are already the default port number
  // for a given protocol. As the host also contains the port number we're going
  // override it with the hostname which contains no port number.
  //
  if (!required(url.port, url.protocol)) {
    url.host = url.hostname;
    url.port = '';
  }

  //
  // Parse down the `auth` for the username and password.
  //
  url.username = url.password = '';
  if (url.auth) {
    instruction = url.auth.split(':');
    url.username = instruction[0] || '';
    url.password = instruction[1] || '';
  }

  url.origin = url.protocol && url.host && url.protocol !== 'file:'
    ? url.protocol +'//'+ url.host
    : 'null';

  //
  // The href is just the compiled result.
  //
  url.href = url.toString();
}

/**
 * This is convenience method for changing properties in the URL instance to
 * insure that they all propagate correctly.
 *
 * @param {String} part          Property we need to adjust.
 * @param {Mixed} value          The newly assigned value.
 * @param {Boolean|Function} fn  When setting the query, it will be the function
 *                               used to parse the query.
 *                               When setting the protocol, double slash will be
 *                               removed from the final url if it is true.
 * @returns {URL}
 * @api public
 */
function set(part, value, fn) {
  var url = this;

  switch (part) {
    case 'query':
      if ('string' === typeof value && value.length) {
        value = (fn || qs.parse)(value);
      }

      url[part] = value;
      break;

    case 'port':
      url[part] = value;

      if (!required(value, url.protocol)) {
        url.host = url.hostname;
        url[part] = '';
      } else if (value) {
        url.host = url.hostname +':'+ value;
      }

      break;

    case 'hostname':
      url[part] = value;

      if (url.port) value += ':'+ url.port;
      url.host = value;
      break;

    case 'host':
      url[part] = value;

      if (/:\d+$/.test(value)) {
        value = value.split(':');
        url.port = value.pop();
        url.hostname = value.join(':');
      } else {
        url.hostname = value;
        url.port = '';
      }

      break;

    case 'protocol':
      url.protocol = value.toLowerCase();
      url.slashes = !fn;
      break;

    case 'pathname':
    case 'hash':
      if (value) {
        var char = part === 'pathname' ? '/' : '#';
        url[part] = value.charAt(0) !== char ? char + value : value;
      } else {
        url[part] = value;
      }
      break;

    default:
      url[part] = value;
  }

  for (var i = 0; i < rules.length; i++) {
    var ins = rules[i];

    if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
  }

  url.origin = url.protocol && url.host && url.protocol !== 'file:'
    ? url.protocol +'//'+ url.host
    : 'null';

  url.href = url.toString();

  return url;
}

/**
 * Transform the properties back in to a valid and full URL string.
 *
 * @param {Function} stringify Optional query stringify function.
 * @returns {String}
 * @api public
 */
function toString(stringify) {
  if (!stringify || 'function' !== typeof stringify) stringify = qs.stringify;

  var query
    , url = this
    , protocol = url.protocol;

  if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';

  var result = protocol + (url.slashes ? '//' : '');

  if (url.username) {
    result += url.username;
    if (url.password) result += ':'+ url.password;
    result += '@';
  }

  result += url.host + url.pathname;

  query = 'object' === typeof url.query ? stringify(url.query) : url.query;
  if (query) result += '?' !== query.charAt(0) ? '?'+ query : query;

  if (url.hash) result += url.hash;

  return result;
}

URL.prototype = { set: set, toString: toString };

//
// Expose the URL parser and some additional properties that might be useful for
// others or testing.
//
URL.extractProtocol = extractProtocol;
URL.location = lolcation;
URL.qs = qs;

module.exports = URL;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)))

/***/ }),
/* 28 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Check if we're required to add a port number.
 *
 * @see https://url.spec.whatwg.org/#default-port
 * @param {Number|String} port Port number we need to check
 * @param {String} protocol Protocol we need to check against.
 * @returns {Boolean} Is it a default port for the given protocol
 * @api private
 */
module.exports = function required(port, protocol) {
  protocol = protocol.split(':')[0];
  port = +port;

  if (!port) return false;

  switch (protocol) {
    case 'http':
    case 'ws':
    return port !== 80;

    case 'https':
    case 'wss':
    return port !== 443;

    case 'ftp':
    return port !== 21;

    case 'gopher':
    return port !== 70;

    case 'file':
    return false;
  }

  return port !== 0;
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;

/**
 * Decode a URI encoded string.
 *
 * @param {String} input The URI encoded string.
 * @returns {String} The decoded string.
 * @api private
 */
function decode(input) {
  return decodeURIComponent(input.replace(/\+/g, ' '));
}

/**
 * Simple query string parser.
 *
 * @param {String} query The query string that needs to be parsed.
 * @returns {Object}
 * @api public
 */
function querystring(query) {
  var parser = /([^=?&]+)=?([^&]*)/g
    , result = {}
    , part;

  //
  // Little nifty parsing hack, leverage the fact that RegExp.exec increments
  // the lastIndex property so we can continue executing this loop until we've
  // parsed all results.
  //
  for (;
    part = parser.exec(query);
    result[decode(part[1])] = decode(part[2])
  );

  return result;
}

/**
 * Transform a query string to an object.
 *
 * @param {Object} obj Object that should be transformed.
 * @param {String} prefix Optional prefix.
 * @returns {String}
 * @api public
 */
function querystringify(obj, prefix) {
  prefix = prefix || '';

  var pairs = [];

  //
  // Optionally prefix with a '?' if needed
  //
  if ('string' !== typeof prefix) prefix = '?';

  for (var key in obj) {
    if (has.call(obj, key)) {
      pairs.push(encodeURIComponent(key) +'='+ encodeURIComponent(obj[key]));
    }
  }

  return pairs.length ? prefix + pairs.join('&') : '';
}

//
// Expose the module.
//
exports.stringify = querystringify;
exports.parse = querystring;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var baseFilter_1 = __webpack_require__(1);
var utils = __webpack_require__(0);
/* tslint:disable:prefer-const */
var retryTimeout = 30;
/* tslint:enable:prefer-const */
var RPRegistrationFilter = /** @class */ (function (_super) {
    __extends(RPRegistrationFilter, _super);
    function RPRegistrationFilter(retryTimeout) {
        if (retryTimeout === void 0) { retryTimeout = 30; }
        var _this = _super.call(this) || this;
        retryTimeout = retryTimeout;
        return _this;
    }
    RPRegistrationFilter.prototype.after = function (operationResponse) {
        return __awaiter(this, void 0, void 0, function () {
            var rpName, urlPrefix, options, registrationStatus, err_1, finalRes, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = operationResponse.request;
                        if (operationResponse.response.status === 409) {
                            rpName = this.checkRPNotRegisteredError(operationResponse.bodyAsText);
                        }
                        if (!rpName) return [3 /*break*/, 9];
                        urlPrefix = this.extractSubscriptionUrl(options.url);
                        registrationStatus = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.registerRP(urlPrefix, rpName, options)];
                    case 2:
                        registrationStatus = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4:
                        if (!registrationStatus) return [3 /*break*/, 9];
                        // Retry the original request. We have to change the x-ms-client-request-id
                        // otherwise Azure endpoint will return the initial 409 (cached) response.
                        options.headers["x-ms-client-request-id"] = utils.generateUuid();
                        finalRes = void 0;
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, utils.dispatchRequest(options)];
                    case 6:
                        finalRes = _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        err_2 = _a.sent();
                        return [2 /*return*/, Promise.reject(err_2)];
                    case 8: return [2 /*return*/, Promise.resolve(finalRes)];
                    case 9: return [2 /*return*/, Promise.resolve(operationResponse)];
                }
            });
        });
    };
    /**
     * Reuses the headers of the original request and url (if specified).
     * @param {WebResource} originalRequest The original request
     * @param {boolean} reuseUrlToo Should the url from the original request be reused as well. Default false.
     * @returns {object} reqOptions - A new request object with desired headers.
     */
    RPRegistrationFilter.prototype.getRequestEssentials = function (originalRequest, reuseUrlToo) {
        if (reuseUrlToo === void 0) { reuseUrlToo = false; }
        var reqOptions = {
            headers: {}
        };
        if (reuseUrlToo) {
            reqOptions.url = originalRequest.url;
        }
        // Copy over the original request headers. This will get us the auth token and other useful stuff from
        // the original request header. Thus making it easier to make requests from this filter.
        for (var h in originalRequest.headers) {
            reqOptions.headers[h] = originalRequest.headers[h];
        }
        // We have to change the x-ms-client-request-id otherwise Azure endpoint
        // will return the initial 409 (cached) response.
        reqOptions.headers["x-ms-client-request-id"] = utils.generateUuid();
        // Set content-type to application/json
        reqOptions.headers["Content-Type"] = "application/json; charset=utf-8";
        return reqOptions;
    };
    /**
     * Validates the error code and message associated with 409 response status code. If it matches to that of
     * RP not registered then it returns the name of the RP else returns undefined.
     * @param {string} body - The response body received after making the original request.
     * @returns {string} result The name of the RP if condition is satisfied else undefined.
     */
    RPRegistrationFilter.prototype.checkRPNotRegisteredError = function (body) {
        var result, responseBody;
        if (body) {
            try {
                responseBody = JSON.parse(body);
            }
            catch (err) {
                // do nothing;
            }
            if (responseBody && responseBody.error && responseBody.error.message &&
                responseBody.error.code && responseBody.error.code === "MissingSubscriptionRegistration") {
                var matchRes = responseBody.error.message.match(/.*'(.*)'/i);
                if (matchRes) {
                    result = matchRes.pop();
                }
            }
        }
        return result;
    };
    /**
     * Extracts the first part of the URL, just after subscription:
     * https://management.azure.com/subscriptions/00000000-0000-0000-0000-000000000000/
     * @param {string} url - The original request url
     * @returns {string} urlPrefix The url prefix as explained above.
     */
    RPRegistrationFilter.prototype.extractSubscriptionUrl = function (url) {
        var result;
        var matchRes = url.match(/.*\/subscriptions\/[a-f0-9-]+\//ig);
        if (matchRes && matchRes[0]) {
            result = matchRes[0];
        }
        else {
            throw new Error("Unable to extract subscriptionId from the given url - " + url + ".");
        }
        return result;
    };
    /**
     * Registers the given provider.
     * @param {string} urlPrefix - https://management.azure.com/subscriptions/00000000-0000-0000-0000-000000000000/
     * @param {string} provider - The provider name to be registered.
     * @param {object} originalRequest - The original request sent by the user that returned a 409 response
     * with a message that the provider is not registered.
     * @param {registrationCallback} callback - The callback that handles the RP registration
     */
    RPRegistrationFilter.prototype.registerRP = function (urlPrefix, provider, originalRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var postUrl, getUrl, reqOptions, res, err_3, statusRes, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postUrl = urlPrefix + "providers/" + provider + "/register?api-version=2016-02-01";
                        getUrl = urlPrefix + "providers/" + provider + "?api-version=2016-02-01";
                        reqOptions = this.getRequestEssentials(originalRequest);
                        reqOptions.method = "POST";
                        reqOptions.url = postUrl;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, utils.dispatchRequest(reqOptions)];
                    case 2:
                        res = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        return [2 /*return*/, Promise.reject(err_3)];
                    case 4:
                        if (res.response.status !== 200) {
                            return [2 /*return*/, Promise.reject(new Error("Autoregistration of " + provider + " failed. Please try registering manually."))];
                        }
                        statusRes = false;
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.getRegistrationStatus(getUrl, originalRequest)];
                    case 6:
                        statusRes = _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        err_4 = _a.sent();
                        return [2 /*return*/, Promise.reject(err_4)];
                    case 8: return [2 /*return*/, Promise.resolve(statusRes)];
                }
            });
        });
    };
    /**
     * Polls the registration status of the provider that was registered. Polling happens at an interval of 30 seconds.
     * Polling will happen till the registrationState property of the response body is "Registered".
     * @param {string} url - The request url for polling
     * @param {object} originalRequest - The original request sent by the user that returned a 409 response
     * with a message that the provider is not registered.
     * @returns {Promise<boolean>} promise - True if RP Registration is successful.
     */
    RPRegistrationFilter.prototype.getRegistrationStatus = function (url, originalRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var reqOptions, res, result, err_5, obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reqOptions = this.getRequestEssentials(originalRequest);
                        result = false;
                        reqOptions.url = url;
                        reqOptions.method = "GET";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, utils.dispatchRequest(reqOptions)];
                    case 2:
                        res = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_5 = _a.sent();
                        return [2 /*return*/, Promise.reject(err_5)];
                    case 4:
                        obj = res.bodyAsJson;
                        if (res.bodyAsJson && obj.registrationState && obj.registrationState === "Registered") {
                            result = true;
                        }
                        else {
                            setTimeout(function () { return _this.getRegistrationStatus(url, originalRequest); }, retryTimeout * 1000);
                        }
                        return [2 /*return*/, Promise.resolve(result)];
                }
            });
        });
    };
    return RPRegistrationFilter;
}(baseFilter_1.BaseFilter));
exports.RPRegistrationFilter = RPRegistrationFilter;


/***/ }),
/* 32 */
/***/ (function(module, exports) {

exports.endianness = function () { return 'LE' };

exports.hostname = function () {
    if (typeof location !== 'undefined') {
        return location.hostname
    }
    else return '';
};

exports.loadavg = function () { return [] };

exports.uptime = function () { return 0 };

exports.freemem = function () {
    return Number.MAX_VALUE;
};

exports.totalmem = function () {
    return Number.MAX_VALUE;
};

exports.cpus = function () { return [] };

exports.type = function () { return 'Browser' };

exports.release = function () {
    if (typeof navigator !== 'undefined') {
        return navigator.appVersion;
    }
    return '';
};

exports.networkInterfaces
= exports.getNetworkInterfaces
= function () { return {} };

exports.arch = function () { return 'javascript' };

exports.platform = function () { return 'browser' };

exports.tmpdir = exports.tmpDir = function () {
    return '/tmp';
};

exports.EOL = '\n';


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var baseFilter_1 = __webpack_require__(1);
var LogFilter = /** @class */ (function (_super) {
    __extends(LogFilter, _super);
    function LogFilter(logger) {
        if (logger === void 0) { logger = console.log; }
        var _this = _super.call(this) || this;
        _this.logger = logger;
        return _this;
    }
    LogFilter.prototype.after = function (operationResponse) {
        var self = this;
        self.logger(">> Request: " + JSON.stringify(operationResponse.request, undefined, 2));
        self.logger(">> Response status code: " + operationResponse.response.status);
        var responseBody = operationResponse.bodyAsText;
        self.logger(">> Body: " + responseBody);
        return Promise.resolve(operationResponse);
    };
    return LogFilter;
}(baseFilter_1.BaseFilter));
exports.LogFilter = LogFilter;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __webpack_require__(2);
var HeaderConstants = constants_1.Constants.HeaderConstants;
var DEFAULT_AUTHORIZATION_SCHEME = "Bearer";
/**
 * Creates a new TokenCredentials object.
 *
 * @constructor
 * @param {string} token               The token.
 * @param {string} authorizationScheme The authorization scheme.
 */
var TokenCredentials = /** @class */ (function () {
    function TokenCredentials(token, authorizationScheme) {
        if (authorizationScheme === void 0) { authorizationScheme = DEFAULT_AUTHORIZATION_SCHEME; }
        this.authorizationScheme = DEFAULT_AUTHORIZATION_SCHEME;
        if (!token) {
            throw new Error("token cannot be null or undefined.");
        }
        this.token = token;
        this.authorizationScheme = authorizationScheme;
    }
    /**
     * Signs a request with the Authentication header.
     *
     * @param {WebResource} The WebResource to be signed.
     * @return {Promise<WebResource>} The signed request object.
     */
    TokenCredentials.prototype.signRequest = function (webResource) {
        if (!webResource.headers)
            webResource.headers = {};
        webResource.headers[HeaderConstants.AUTHORIZATION] = this.authorizationScheme + " " + this.token;
        return Promise.resolve(webResource);
    };
    return TokenCredentials;
}());
exports.TokenCredentials = TokenCredentials;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __webpack_require__(2);
var HeaderConstants = constants_1.Constants.HeaderConstants;
var DEFAULT_AUTHORIZATION_SCHEME = "Basic";
/**
 * Creates a new BasicAuthenticationCredentials object.
 *
 * @constructor
 * @param {string} userName                 User name.
 * @param {string} password                 Password.
 * @param {string} [authorizationScheme]    The authorization scheme.
 */
var BasicAuthenticationCredentials = /** @class */ (function () {
    function BasicAuthenticationCredentials(userName, password, authorizationScheme) {
        if (authorizationScheme === void 0) { authorizationScheme = DEFAULT_AUTHORIZATION_SCHEME; }
        this.authorizationScheme = DEFAULT_AUTHORIZATION_SCHEME;
        if (userName === null || userName === undefined || typeof userName.valueOf() !== "string") {
            throw new Error("userName cannot be null or undefined and must be of type string.");
        }
        if (password === null || password === undefined || typeof password.valueOf() !== "string") {
            throw new Error("password cannot be null or undefined and must be of type string.");
        }
        this.userName = userName;
        this.password = password;
        this.authorizationScheme = authorizationScheme;
    }
    /**
     * Signs a request with the Authentication header.
     *
     * @param {WebResource} The WebResource to be signed.
     * @returns {Promise<WebResource>} - The signed request object.
     */
    BasicAuthenticationCredentials.prototype.signRequest = function (webResource) {
        var credentials = this.userName + ":" + this.password;
        var encodedCredentials = this.authorizationScheme + " " + Buffer.from(credentials).toString("base64");
        if (!webResource.headers)
            webResource.headers = {};
        webResource.headers[HeaderConstants.AUTHORIZATION] = encodedCredentials;
        return Promise.resolve(webResource);
    };
    return BasicAuthenticationCredentials;
}());
exports.BasicAuthenticationCredentials = BasicAuthenticationCredentials;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Authenticates to a service using an API key.
 */
var ApiKeyCredentials = /** @class */ (function () {
    /**
     * @constructor
     * @param {object} options   Specifies the options to be provided for auth. Either header or query needs to be provided.
     * @param {object} [inHeader]  A key value pair of the header parameters that need to be applied to the request.
     * @param {object} [inQuery]   A key value pair of the query parameters that need to be applied to the request.
     */
    function ApiKeyCredentials(options) {
        if (!options || (options && !options.inHeader && !options.inQuery)) {
            throw new Error("options cannot be null or undefined. Either \"inHeader\" or \"inQuery\" property of the options object needs to be provided.");
        }
        this.inHeader = options.inHeader;
        this.inQuery = options.inQuery;
    }
    /**
     * Signs a request with the values provided in the inHeader and inQuery parameter.
     *
     * @param {WebResource} The WebResource to be signed.
     * @returns {Promise<WebResource>} - The signed request object.
     */
    ApiKeyCredentials.prototype.signRequest = function (webResource) {
        if (!webResource) {
            return Promise.reject(new Error("webResource cannot be null or undefined and must be of type \"object\"."));
        }
        if (this.inHeader) {
            if (!webResource.headers) {
                webResource.headers = {};
            }
            Object.assign(webResource.headers, this.inHeader);
        }
        if (this.inQuery) {
            if (!webResource.url) {
                return Promise.reject(new Error("url cannot be null in the request object."));
            }
            if (webResource.url.indexOf("?") < 0) {
                webResource.url += "?";
            }
            for (var key in this.inQuery) {
                if (!webResource.url.endsWith("?")) {
                    webResource.url += "&";
                }
                webResource.url += key + "=" + this.inQuery[key];
            }
        }
        return Promise.resolve(webResource);
    };
    return ApiKeyCredentials;
}());
exports.ApiKeyCredentials = ApiKeyCredentials;


/***/ })
/******/ ]);
//# sourceMappingURL=msRestBundle.js.map