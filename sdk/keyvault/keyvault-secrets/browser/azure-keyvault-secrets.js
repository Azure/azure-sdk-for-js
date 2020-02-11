/*!
 * Copyright (c) Microsoft and contributors. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 * 
 * Azure KeyVault Secrets SDK for JavaScript - 4.0.3
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.azurekeyvaultsecrets = {}));
}(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
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
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    // Copyright (c) Microsoft Corporation.
    // Licensed under the MIT License.
    /**
     * A collection of HttpHeaders that can be sent with a HTTP request.
     */
    function getHeaderKey(headerName) {
        return headerName.toLowerCase();
    }
    /**
     * A collection of HTTP header key/value pairs.
     */
    var HttpHeaders = /** @class */ (function () {
        function HttpHeaders(rawHeaders) {
            this._headersMap = {};
            if (rawHeaders) {
                for (var headerName in rawHeaders) {
                    this.set(headerName, rawHeaders[headerName]);
                }
            }
        }
        /**
         * Set a header in this collection with the provided name and value. The name is
         * case-insensitive.
         * @param headerName The name of the header to set. This value is case-insensitive.
         * @param headerValue The value of the header to set.
         */
        HttpHeaders.prototype.set = function (headerName, headerValue) {
            this._headersMap[getHeaderKey(headerName)] = {
                name: headerName,
                value: headerValue.toString()
            };
        };
        /**
         * Get the header value for the provided header name, or undefined if no header exists in this
         * collection with the provided name.
         * @param headerName The name of the header.
         */
        HttpHeaders.prototype.get = function (headerName) {
            var header = this._headersMap[getHeaderKey(headerName)];
            return !header ? undefined : header.value;
        };
        /**
         * Get whether or not this header collection contains a header entry for the provided header name.
         */
        HttpHeaders.prototype.contains = function (headerName) {
            return !!this._headersMap[getHeaderKey(headerName)];
        };
        /**
         * Remove the header with the provided headerName. Return whether or not the header existed and
         * was removed.
         * @param headerName The name of the header to remove.
         */
        HttpHeaders.prototype.remove = function (headerName) {
            var result = this.contains(headerName);
            delete this._headersMap[getHeaderKey(headerName)];
            return result;
        };
        /**
         * Get the headers that are contained this collection as an object.
         */
        HttpHeaders.prototype.rawHeaders = function () {
            var result = {};
            for (var headerKey in this._headersMap) {
                var header = this._headersMap[headerKey];
                result[header.name.toLowerCase()] = header.value;
            }
            return result;
        };
        /**
         * Get the headers that are contained in this collection as an array.
         */
        HttpHeaders.prototype.headersArray = function () {
            var headers = [];
            for (var headerKey in this._headersMap) {
                headers.push(this._headersMap[headerKey]);
            }
            return headers;
        };
        /**
         * Get the header names that are contained in this collection.
         */
        HttpHeaders.prototype.headerNames = function () {
            var headerNames = [];
            var headers = this.headersArray();
            for (var i = 0; i < headers.length; ++i) {
                headerNames.push(headers[i].name);
            }
            return headerNames;
        };
        /**
         * Get the header names that are contained in this collection.
         */
        HttpHeaders.prototype.headerValues = function () {
            var headerValues = [];
            var headers = this.headersArray();
            for (var i = 0; i < headers.length; ++i) {
                headerValues.push(headers[i].value);
            }
            return headerValues;
        };
        /**
         * Get the JSON object representation of this HTTP header collection.
         */
        HttpHeaders.prototype.toJson = function () {
            return this.rawHeaders();
        };
        /**
         * Get the string representation of this HTTP header collection.
         */
        HttpHeaders.prototype.toString = function () {
            return JSON.stringify(this.toJson());
        };
        /**
         * Create a deep clone/copy of this HttpHeaders collection.
         */
        HttpHeaders.prototype.clone = function () {
            return new HttpHeaders(this.rawHeaders());
        };
        return HttpHeaders;
    }());

    // Copyright (c) Microsoft Corporation.
    /**
     * Encodes a byte array in base64 format.
     * @param value the Uint8Aray to encode
     */
    function encodeByteArray(value) {
        var str = "";
        for (var i = 0; i < value.length; i++) {
            str += String.fromCharCode(value[i]);
        }
        return btoa(str);
    }
    /**
     * Decodes a base64 string into a byte array.
     * @param value the base64 string to decode
     */
    function decodeString(value) {
        var byteString = atob(value);
        var arr = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            arr[i] = byteString.charCodeAt(i);
        }
        return arr;
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function unwrapExports (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var rngBrowser = createCommonjsModule(function (module) {
    // Unique ID creation requires a high quality random # generator.  In the
    // browser this is a little complicated due to unknown quality of Math.random()
    // and inconsistent support for the `crypto` API.  We do the best we can via
    // feature-detection

    // getRandomValues needs to be invoked in a context where "this" is a Crypto
    // implementation. Also, find the complete implementation of crypto on IE11.
    var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                          (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

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
    });

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
      // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
      return ([
        bth[buf[i++]], bth[buf[i++]],
        bth[buf[i++]], bth[buf[i++]], '-',
        bth[buf[i++]], bth[buf[i++]], '-',
        bth[buf[i++]], bth[buf[i++]], '-',
        bth[buf[i++]], bth[buf[i++]], '-',
        bth[buf[i++]], bth[buf[i++]],
        bth[buf[i++]], bth[buf[i++]],
        bth[buf[i++]], bth[buf[i++]]
      ]).join('');
    }

    var bytesToUuid_1 = bytesToUuid;

    function v4(options, buf, offset) {
      var i = buf && offset || 0;

      if (typeof(options) == 'string') {
        buf = options === 'binary' ? new Array(16) : null;
        options = null;
      }
      options = options || {};

      var rnds = options.random || (options.rng || rngBrowser)();

      // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
      rnds[6] = (rnds[6] & 0x0f) | 0x40;
      rnds[8] = (rnds[8] & 0x3f) | 0x80;

      // Copy bytes to buffer, if provided
      if (buf) {
        for (var ii = 0; ii < 16; ++ii) {
          buf[i + ii] = rnds[ii];
        }
      }

      return buf || bytesToUuid_1(rnds);
    }

    var v4_1 = v4;

    // Copyright (c) Microsoft Corporation.
    // Licensed under the MIT License.
    var Constants = {
        /**
         * The core-http version
         * @const
         * @type {string}
         */
        coreHttpVersion: "1.0.4",
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
            StatusCodes: {
                TooManyRequests: 429
            }
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
             * The Retry-After response-header field can be used with a 503 (Service
             * Unavailable) or 349 (Too Many Requests) responses to indicate how long
             * the service is expected to be unavailable to the requesting client.
             *
             * @const
             * @type {string}
             */
            RETRY_AFTER: "Retry-After",
            /**
             * The UserAgent header.
             *
             * @const
             * @type {string}
             */
            USER_AGENT: "User-Agent"
        }
    };

    // Copyright (c) Microsoft Corporation.
    var validUuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/gi;
    /**
     * A constant that indicates whether the environment is node.js or browser based.
     */
    var isNode = typeof process !== "undefined" &&
        !!process.version &&
        !!process.versions &&
        !!process.versions.node;
    /**
     * Validates the given uuid as a string
     *
     * @param {string} uuid The uuid as a string that needs to be validated
     *
     * @return {boolean} True if the uuid is valid; false otherwise.
     */
    function isValidUuid(uuid) {
        return validUuidRegex.test(uuid);
    }
    /**
     * Generated UUID
     *
     * @return {string} RFC4122 v4 UUID.
     */
    function generateUuid() {
        return v4_1();
    }
    /**
     * A wrapper for setTimeout that resolves a promise after t milliseconds.
     * @param {number} t The number of milliseconds to be delayed.
     * @param {T} value The value to be resolved with after a timeout of t milliseconds.
     * @returns {Promise<T>} Resolved promise
     */
    function delay(t, value) {
        return new Promise(function (resolve) { return setTimeout(function () { return resolve(value); }, t); });
    }
    function prepareXMLRootList(obj, elementName) {
        var _a;
        if (!Array.isArray(obj)) {
            obj = [obj];
        }
        return _a = {}, _a[elementName] = obj, _a;
    }
    var validateISODuration = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
    /**
     * Indicates whether the given string is in ISO 8601 format.
     * @param {string} value The value to be validated for ISO 8601 duration format.
     * @return {boolean} `true` if valid, `false` otherwise.
     */
    function isDuration(value) {
        return validateISODuration.test(value);
    }
    /**
     * Replace all of the instances of searchValue in value with the provided replaceValue.
     * @param {string | undefined} value The value to search and replace in.
     * @param {string} searchValue The value to search for in the value argument.
     * @param {string} replaceValue The value to replace searchValue with in the value argument.
     * @returns {string | undefined} The value where each instance of searchValue was replaced with replacedValue.
     */
    function replaceAll(value, searchValue, replaceValue) {
        return !value || !searchValue ? value : value.split(searchValue).join(replaceValue || "");
    }
    /**
     * Determines whether the given entity is a basic/primitive type
     * (string, number, boolean, null, undefined).
     * @param {any} value Any entity
     * @return {boolean} - true is it is primitive type, false otherwise.
     */
    function isPrimitiveType(value) {
        return (typeof value !== "object" && typeof value !== "function") || value === null;
    }

    // Copyright (c) Microsoft Corporation.
    var Serializer = /** @class */ (function () {
        function Serializer(modelMappers, isXML) {
            if (modelMappers === void 0) { modelMappers = {}; }
            this.modelMappers = modelMappers;
            this.isXML = isXML;
        }
        Serializer.prototype.validateConstraints = function (mapper, value, objectName) {
            var failValidation = function (constraintName, constraintValue) {
                throw new Error("\"" + objectName + "\" with value \"" + value + "\" should satisfy the constraint \"" + constraintName + "\": " + constraintValue + ".");
            };
            if (mapper.constraints && value != undefined) {
                var _a = mapper.constraints, ExclusiveMaximum = _a.ExclusiveMaximum, ExclusiveMinimum = _a.ExclusiveMinimum, InclusiveMaximum = _a.InclusiveMaximum, InclusiveMinimum = _a.InclusiveMinimum, MaxItems = _a.MaxItems, MaxLength = _a.MaxLength, MinItems = _a.MinItems, MinLength = _a.MinLength, MultipleOf = _a.MultipleOf, Pattern = _a.Pattern, UniqueItems = _a.UniqueItems;
                if (ExclusiveMaximum != undefined && value >= ExclusiveMaximum) {
                    failValidation("ExclusiveMaximum", ExclusiveMaximum);
                }
                if (ExclusiveMinimum != undefined && value <= ExclusiveMinimum) {
                    failValidation("ExclusiveMinimum", ExclusiveMinimum);
                }
                if (InclusiveMaximum != undefined && value > InclusiveMaximum) {
                    failValidation("InclusiveMaximum", InclusiveMaximum);
                }
                if (InclusiveMinimum != undefined && value < InclusiveMinimum) {
                    failValidation("InclusiveMinimum", InclusiveMinimum);
                }
                if (MaxItems != undefined && value.length > MaxItems) {
                    failValidation("MaxItems", MaxItems);
                }
                if (MaxLength != undefined && value.length > MaxLength) {
                    failValidation("MaxLength", MaxLength);
                }
                if (MinItems != undefined && value.length < MinItems) {
                    failValidation("MinItems", MinItems);
                }
                if (MinLength != undefined && value.length < MinLength) {
                    failValidation("MinLength", MinLength);
                }
                if (MultipleOf != undefined && value % MultipleOf !== 0) {
                    failValidation("MultipleOf", MultipleOf);
                }
                if (Pattern) {
                    var pattern = typeof Pattern === "string" ? new RegExp(Pattern) : Pattern;
                    if (typeof value !== "string" || value.match(pattern) === null) {
                        failValidation("Pattern", Pattern);
                    }
                }
                if (UniqueItems &&
                    value.some(function (item, i, ar) { return ar.indexOf(item) !== i; })) {
                    failValidation("UniqueItems", UniqueItems);
                }
            }
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
            if (!objectName) {
                objectName = mapper.serializedName;
            }
            if (mapperType.match(/^Sequence$/gi) !== null) {
                payload = [];
            }
            if (mapper.isConstant) {
                object = mapper.defaultValue;
            }
            // This table of allowed values should help explain
            // the mapper.required and mapper.nullable properties.
            // X means "neither undefined or null are allowed".
            //           || required
            //           || true      | false
            //  nullable || ==========================
            //      true || null      | undefined/null
            //     false || X         | undefined
            // undefined || X         | undefined/null
            var required = mapper.required, nullable = mapper.nullable;
            if (required && nullable && object === undefined) {
                throw new Error(objectName + " cannot be undefined.");
            }
            if (required && !nullable && object == undefined) {
                throw new Error(objectName + " cannot be null or undefined.");
            }
            if (!required && nullable === false && object === null) {
                throw new Error(objectName + " cannot be null.");
            }
            if (object == undefined) {
                payload = object;
            }
            else {
                // Validate Constraints if any
                this.validateConstraints(mapper, object, objectName);
                if (mapperType.match(/^any$/gi) !== null) {
                    payload = object;
                }
                else if (mapperType.match(/^(Number|String|Boolean|Object|Stream|Uuid)$/gi) !== null) {
                    payload = serializeBasicTypes(mapperType, objectName, object);
                }
                else if (mapperType.match(/^Enum$/gi) !== null) {
                    var enumMapper = mapper;
                    payload = serializeEnumType(objectName, enumMapper.type.allowedValues, object);
                }
                else if (mapperType.match(/^(Date|DateTime|TimeSpan|DateTimeRfc1123|UnixTime)$/gi) !== null) {
                    payload = serializeDateTypes(mapperType, object, objectName);
                }
                else if (mapperType.match(/^ByteArray$/gi) !== null) {
                    payload = serializeByteArrayType(objectName, object);
                }
                else if (mapperType.match(/^Base64Url$/gi) !== null) {
                    payload = serializeBase64UrlType(objectName, object);
                }
                else if (mapperType.match(/^Sequence$/gi) !== null) {
                    payload = serializeSequenceType(this, mapper, object, objectName);
                }
                else if (mapperType.match(/^Dictionary$/gi) !== null) {
                    payload = serializeDictionaryType(this, mapper, object, objectName);
                }
                else if (mapperType.match(/^Composite$/gi) !== null) {
                    payload = serializeCompositeType(this, mapper, object, objectName);
                }
            }
            return payload;
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
            if (responseBody == undefined) {
                if (this.isXML && mapper.type.name === "Sequence" && !mapper.xmlIsWrapped) {
                    // Edge case for empty XML non-wrapped lists. xml2js can't distinguish
                    // between the list being empty versus being missing,
                    // so let's do the more user-friendly thing and return an empty list.
                    responseBody = [];
                }
                // specifically check for undefined as default value can be a falsey value `0, "", false, null`
                if (mapper.defaultValue !== undefined) {
                    responseBody = mapper.defaultValue;
                }
                return responseBody;
            }
            var payload;
            var mapperType = mapper.type.name;
            if (!objectName) {
                objectName = mapper.serializedName;
            }
            if (mapperType.match(/^Composite$/gi) !== null) {
                payload = deserializeCompositeType(this, mapper, responseBody, objectName);
            }
            else {
                if (this.isXML) {
                    /**
                     * If the mapper specifies this as a non-composite type value but the responseBody contains
                     * both header ("$") and body ("_") properties, then just reduce the responseBody value to
                     * the body ("_") property.
                     */
                    if (responseBody["$"] != undefined && responseBody["_"] != undefined) {
                        responseBody = responseBody["_"];
                    }
                }
                if (mapperType.match(/^Number$/gi) !== null) {
                    payload = parseFloat(responseBody);
                    if (isNaN(payload)) {
                        payload = responseBody;
                    }
                }
                else if (mapperType.match(/^Boolean$/gi) !== null) {
                    if (responseBody === "true") {
                        payload = true;
                    }
                    else if (responseBody === "false") {
                        payload = false;
                    }
                    else {
                        payload = responseBody;
                    }
                }
                else if (mapperType.match(/^(String|Enum|Object|Stream|Uuid|TimeSpan|any)$/gi) !== null) {
                    payload = responseBody;
                }
                else if (mapperType.match(/^(Date|DateTime|DateTimeRfc1123)$/gi) !== null) {
                    payload = new Date(responseBody);
                }
                else if (mapperType.match(/^UnixTime$/gi) !== null) {
                    payload = unixTimeToDate(responseBody);
                }
                else if (mapperType.match(/^ByteArray$/gi) !== null) {
                    payload = decodeString(responseBody);
                }
                else if (mapperType.match(/^Base64Url$/gi) !== null) {
                    payload = base64UrlToByteArray(responseBody);
                }
                else if (mapperType.match(/^Sequence$/gi) !== null) {
                    payload = deserializeSequenceType(this, mapper, responseBody, objectName);
                }
                else if (mapperType.match(/^Dictionary$/gi) !== null) {
                    payload = deserializeDictionaryType(this, mapper, responseBody, objectName);
                }
            }
            if (mapper.isConstant) {
                payload = mapper.defaultValue;
            }
            return payload;
        };
        return Serializer;
    }());
    function trimEnd(str, ch) {
        var len = str.length;
        while (len - 1 >= 0 && str[len - 1] === ch) {
            --len;
        }
        return str.substr(0, len);
    }
    function bufferToBase64Url(buffer) {
        if (!buffer) {
            return undefined;
        }
        if (!(buffer instanceof Uint8Array)) {
            throw new Error("Please provide an input of type Uint8Array for converting to Base64Url.");
        }
        // Uint8Array to Base64.
        var str = encodeByteArray(buffer);
        // Base64 to Base64Url.
        return trimEnd(str, "=")
            .replace(/\+/g, "-")
            .replace(/\//g, "_");
    }
    function base64UrlToByteArray(str) {
        if (!str) {
            return undefined;
        }
        if (str && typeof str.valueOf() !== "string") {
            throw new Error("Please provide an input of type string for converting to Uint8Array");
        }
        // Base64Url to Base64.
        str = str.replace(/\-/g, "+").replace(/\_/g, "/");
        // Base64 to Uint8Array.
        return decodeString(str);
    }
    function splitSerializeName(prop) {
        var classes = [];
        var partialclass = "";
        if (prop) {
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
        }
        return classes;
    }
    function dateToUnixTime(d) {
        if (!d) {
            return undefined;
        }
        if (typeof d.valueOf() === "string") {
            d = new Date(d);
        }
        return Math.floor(d.getTime() / 1000);
    }
    function unixTimeToDate(n) {
        if (!n) {
            return undefined;
        }
        return new Date(n * 1000);
    }
    function serializeBasicTypes(typeName, objectName, value) {
        if (value !== null && value !== undefined) {
            if (typeName.match(/^Number$/gi) !== null) {
                if (typeof value !== "number") {
                    throw new Error(objectName + " with value " + value + " must be of type number.");
                }
            }
            else if (typeName.match(/^String$/gi) !== null) {
                if (typeof value.valueOf() !== "string") {
                    throw new Error(objectName + " with value \"" + value + "\" must be of type string.");
                }
            }
            else if (typeName.match(/^Uuid$/gi) !== null) {
                if (!(typeof value.valueOf() === "string" && isValidUuid(value))) {
                    throw new Error(objectName + " with value \"" + value + "\" must be of type string and a valid uuid.");
                }
            }
            else if (typeName.match(/^Boolean$/gi) !== null) {
                if (typeof value !== "boolean") {
                    throw new Error(objectName + " with value " + value + " must be of type boolean.");
                }
            }
            else if (typeName.match(/^Stream$/gi) !== null) {
                var objectType = typeof value;
                if (objectType !== "string" &&
                    objectType !== "function" &&
                    !(value instanceof ArrayBuffer) &&
                    !ArrayBuffer.isView(value) &&
                    !(typeof Blob === "function" && value instanceof Blob)) {
                    throw new Error(objectName + " must be a string, Blob, ArrayBuffer, ArrayBufferView, or a function returning NodeJS.ReadableStream.");
                }
            }
        }
        return value;
    }
    function serializeEnumType(objectName, allowedValues, value) {
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
    }
    function serializeByteArrayType(objectName, value) {
        if (value != undefined) {
            if (!(value instanceof Uint8Array)) {
                throw new Error(objectName + " must be of type Uint8Array.");
            }
            value = encodeByteArray(value);
        }
        return value;
    }
    function serializeBase64UrlType(objectName, value) {
        if (value != undefined) {
            if (!(value instanceof Uint8Array)) {
                throw new Error(objectName + " must be of type Uint8Array.");
            }
            value = bufferToBase64Url(value);
        }
        return value;
    }
    function serializeDateTypes(typeName, value, objectName) {
        if (value != undefined) {
            if (typeName.match(/^Date$/gi) !== null) {
                if (!(value instanceof Date ||
                    (typeof value.valueOf() === "string" && !isNaN(Date.parse(value))))) {
                    throw new Error(objectName + " must be an instanceof Date or a string in ISO8601 format.");
                }
                value =
                    value instanceof Date
                        ? value.toISOString().substring(0, 10)
                        : new Date(value).toISOString().substring(0, 10);
            }
            else if (typeName.match(/^DateTime$/gi) !== null) {
                if (!(value instanceof Date ||
                    (typeof value.valueOf() === "string" && !isNaN(Date.parse(value))))) {
                    throw new Error(objectName + " must be an instanceof Date or a string in ISO8601 format.");
                }
                value = value instanceof Date ? value.toISOString() : new Date(value).toISOString();
            }
            else if (typeName.match(/^DateTimeRfc1123$/gi) !== null) {
                if (!(value instanceof Date ||
                    (typeof value.valueOf() === "string" && !isNaN(Date.parse(value))))) {
                    throw new Error(objectName + " must be an instanceof Date or a string in RFC-1123 format.");
                }
                value = value instanceof Date ? value.toUTCString() : new Date(value).toUTCString();
            }
            else if (typeName.match(/^UnixTime$/gi) !== null) {
                if (!(value instanceof Date ||
                    (typeof value.valueOf() === "string" && !isNaN(Date.parse(value))))) {
                    throw new Error(objectName + " must be an instanceof Date or a string in RFC-1123/ISO8601 format " +
                        "for it to be serialized in UnixTime/Epoch format.");
                }
                value = dateToUnixTime(value);
            }
            else if (typeName.match(/^TimeSpan$/gi) !== null) {
                if (!isDuration(value)) {
                    throw new Error(objectName + " must be a string in ISO 8601 format. Instead was \"" + value + "\".");
                }
                value = value;
            }
        }
        return value;
    }
    function serializeSequenceType(serializer, mapper, object, objectName) {
        if (!Array.isArray(object)) {
            throw new Error(objectName + " must be of type Array.");
        }
        var elementType = mapper.type.element;
        if (!elementType || typeof elementType !== "object") {
            throw new Error("element\" metadata for an Array must be defined in the " +
                ("mapper and it must of type \"object\" in " + objectName + "."));
        }
        var tempArray = [];
        for (var i = 0; i < object.length; i++) {
            tempArray[i] = serializer.serialize(elementType, object[i], objectName);
        }
        return tempArray;
    }
    function serializeDictionaryType(serializer, mapper, object, objectName) {
        if (typeof object !== "object") {
            throw new Error(objectName + " must be of type object.");
        }
        var valueType = mapper.type.value;
        if (!valueType || typeof valueType !== "object") {
            throw new Error("\"value\" metadata for a Dictionary must be defined in the " +
                ("mapper and it must of type \"object\" in " + objectName + "."));
        }
        var tempDictionary = {};
        for (var _i = 0, _a = Object.keys(object); _i < _a.length; _i++) {
            var key = _a[_i];
            tempDictionary[key] = serializer.serialize(valueType, object[key], objectName + "." + key);
        }
        return tempDictionary;
    }
    /**
     * Resolves a composite mapper's modelProperties.
     * @param serializer the serializer containing the entire set of mappers
     * @param mapper the composite mapper to resolve
     */
    function resolveModelProperties(serializer, mapper, objectName) {
        var modelProps = mapper.type.modelProperties;
        if (!modelProps) {
            var className = mapper.type.className;
            if (!className) {
                throw new Error("Class name for model \"" + objectName + "\" is not provided in the mapper \"" + JSON.stringify(mapper, undefined, 2) + "\".");
            }
            var modelMapper = serializer.modelMappers[className];
            if (!modelMapper) {
                throw new Error("mapper() cannot be null or undefined for model \"" + className + "\".");
            }
            modelProps = modelMapper.type.modelProperties;
            if (!modelProps) {
                throw new Error("modelProperties cannot be null or undefined in the " +
                    ("mapper \"" + JSON.stringify(modelMapper) + "\" of type \"" + className + "\" for object \"" + objectName + "\"."));
            }
        }
        return modelProps;
    }
    function serializeCompositeType(serializer, mapper, object, objectName) {
        var _a;
        if (getPolymorphicDiscriminatorRecursively(serializer, mapper)) {
            mapper = getPolymorphicMapper(serializer, mapper, object, "clientName");
        }
        if (object != undefined) {
            var payload = {};
            var modelProps = resolveModelProperties(serializer, mapper, objectName);
            for (var _i = 0, _b = Object.keys(modelProps); _i < _b.length; _i++) {
                var key = _b[_i];
                var propertyMapper = modelProps[key];
                if (propertyMapper.readOnly) {
                    continue;
                }
                var propName = void 0;
                var parentObject = payload;
                if (serializer.isXML) {
                    if (propertyMapper.xmlIsWrapped) {
                        propName = propertyMapper.xmlName;
                    }
                    else {
                        propName = propertyMapper.xmlElementName || propertyMapper.xmlName;
                    }
                }
                else {
                    var paths = splitSerializeName(propertyMapper.serializedName);
                    propName = paths.pop();
                    for (var _c = 0, paths_1 = paths; _c < paths_1.length; _c++) {
                        var pathName = paths_1[_c];
                        var childObject = parentObject[pathName];
                        if (childObject == undefined && object[key] != undefined) {
                            parentObject[pathName] = {};
                        }
                        parentObject = parentObject[pathName];
                    }
                }
                if (parentObject != undefined) {
                    var propertyObjectName = propertyMapper.serializedName !== ""
                        ? objectName + "." + propertyMapper.serializedName
                        : objectName;
                    var toSerialize = object[key];
                    var polymorphicDiscriminator = getPolymorphicDiscriminatorRecursively(serializer, mapper);
                    if (polymorphicDiscriminator &&
                        polymorphicDiscriminator.clientName === key &&
                        toSerialize == undefined) {
                        toSerialize = mapper.serializedName;
                    }
                    var serializedValue = serializer.serialize(propertyMapper, toSerialize, propertyObjectName);
                    if (serializedValue !== undefined && propName != undefined) {
                        if (propertyMapper.xmlIsAttribute) {
                            // $ is the key attributes are kept under in xml2js.
                            // This keeps things simple while preventing name collision
                            // with names in user documents.
                            parentObject.$ = parentObject.$ || {};
                            parentObject.$[propName] = serializedValue;
                        }
                        else if (propertyMapper.xmlIsWrapped) {
                            parentObject[propName] = (_a = {}, _a[propertyMapper.xmlElementName] = serializedValue, _a);
                        }
                        else {
                            parentObject[propName] = serializedValue;
                        }
                    }
                }
            }
            var additionalPropertiesMapper = mapper.type.additionalProperties;
            if (additionalPropertiesMapper) {
                var propNames = Object.keys(modelProps);
                var _loop_1 = function (clientPropName) {
                    var isAdditionalProperty = propNames.every(function (pn) { return pn !== clientPropName; });
                    if (isAdditionalProperty) {
                        payload[clientPropName] = serializer.serialize(additionalPropertiesMapper, object[clientPropName], objectName + '["' + clientPropName + '"]');
                    }
                };
                for (var clientPropName in object) {
                    _loop_1(clientPropName);
                }
            }
            return payload;
        }
        return object;
    }
    function isSpecialXmlProperty(propertyName) {
        return ["$", "_"].includes(propertyName);
    }
    function deserializeCompositeType(serializer, mapper, responseBody, objectName) {
        if (getPolymorphicDiscriminatorRecursively(serializer, mapper)) {
            mapper = getPolymorphicMapper(serializer, mapper, responseBody, "serializedName");
        }
        var modelProps = resolveModelProperties(serializer, mapper, objectName);
        var instance = {};
        var handledPropertyNames = [];
        for (var _i = 0, _a = Object.keys(modelProps); _i < _a.length; _i++) {
            var key = _a[_i];
            var propertyMapper = modelProps[key];
            var paths = splitSerializeName(modelProps[key].serializedName);
            handledPropertyNames.push(paths[0]);
            var serializedName = propertyMapper.serializedName, xmlName = propertyMapper.xmlName, xmlElementName = propertyMapper.xmlElementName;
            var propertyObjectName = objectName;
            if (serializedName !== "" && serializedName !== undefined) {
                propertyObjectName = objectName + "." + serializedName;
            }
            var headerCollectionPrefix = propertyMapper.headerCollectionPrefix;
            if (headerCollectionPrefix) {
                var dictionary = {};
                for (var _b = 0, _c = Object.keys(responseBody); _b < _c.length; _b++) {
                    var headerKey = _c[_b];
                    if (headerKey.startsWith(headerCollectionPrefix)) {
                        dictionary[headerKey.substring(headerCollectionPrefix.length)] = serializer.deserialize(propertyMapper.type.value, responseBody[headerKey], propertyObjectName);
                    }
                    handledPropertyNames.push(headerKey);
                }
                instance[key] = dictionary;
            }
            else if (serializer.isXML) {
                if (propertyMapper.xmlIsAttribute && responseBody.$) {
                    instance[key] = serializer.deserialize(propertyMapper, responseBody.$[xmlName], propertyObjectName);
                }
                else {
                    var propertyName = xmlElementName || xmlName || serializedName;
                    var unwrappedProperty = responseBody[propertyName];
                    if (propertyMapper.xmlIsWrapped) {
                        unwrappedProperty = responseBody[xmlName];
                        unwrappedProperty = unwrappedProperty && unwrappedProperty[xmlElementName];
                        var isEmptyWrappedList = unwrappedProperty === undefined;
                        if (isEmptyWrappedList) {
                            unwrappedProperty = [];
                        }
                    }
                    instance[key] = serializer.deserialize(propertyMapper, unwrappedProperty, propertyObjectName);
                }
            }
            else {
                // deserialize the property if it is present in the provided responseBody instance
                var propertyInstance = void 0;
                var res = responseBody;
                // traversing the object step by step.
                for (var _d = 0, paths_2 = paths; _d < paths_2.length; _d++) {
                    var item = paths_2[_d];
                    if (!res)
                        break;
                    res = res[item];
                }
                propertyInstance = res;
                var polymorphicDiscriminator = mapper.type.polymorphicDiscriminator;
                // checking that the model property name (key)(ex: "fishtype") and the
                // clientName of the polymorphicDiscriminator {metadata} (ex: "fishtype")
                // instead of the serializedName of the polymorphicDiscriminator (ex: "fish.type")
                // is a better approach. The generator is not consistent with escaping '\.' in the
                // serializedName of the property (ex: "fish\.type") that is marked as polymorphic discriminator
                // and the serializedName of the metadata polymorphicDiscriminator (ex: "fish.type"). However,
                // the clientName transformation of the polymorphicDiscriminator (ex: "fishtype") and
                // the transformation of model property name (ex: "fishtype") is done consistently.
                // Hence, it is a safer bet to rely on the clientName of the polymorphicDiscriminator.
                if (polymorphicDiscriminator &&
                    key === polymorphicDiscriminator.clientName &&
                    propertyInstance == undefined) {
                    propertyInstance = mapper.serializedName;
                }
                var serializedValue = void 0;
                // paging
                if (Array.isArray(responseBody[key]) && modelProps[key].serializedName === "") {
                    propertyInstance = responseBody[key];
                    instance = serializer.deserialize(propertyMapper, propertyInstance, propertyObjectName);
                }
                else if (propertyInstance !== undefined || propertyMapper.defaultValue !== undefined) {
                    serializedValue = serializer.deserialize(propertyMapper, propertyInstance, propertyObjectName);
                    instance[key] = serializedValue;
                }
            }
        }
        var additionalPropertiesMapper = mapper.type.additionalProperties;
        if (additionalPropertiesMapper) {
            var isAdditionalProperty = function (responsePropName) {
                for (var clientPropName in modelProps) {
                    var paths = splitSerializeName(modelProps[clientPropName].serializedName);
                    if (paths[0] === responsePropName) {
                        return false;
                    }
                }
                return true;
            };
            for (var responsePropName in responseBody) {
                if (isAdditionalProperty(responsePropName)) {
                    instance[responsePropName] = serializer.deserialize(additionalPropertiesMapper, responseBody[responsePropName], objectName + '["' + responsePropName + '"]');
                }
            }
        }
        else if (responseBody) {
            for (var _e = 0, _f = Object.keys(responseBody); _e < _f.length; _e++) {
                var key = _f[_e];
                if (instance[key] === undefined &&
                    !handledPropertyNames.includes(key) &&
                    !isSpecialXmlProperty(key)) {
                    instance[key] = responseBody[key];
                }
            }
        }
        return instance;
    }
    function deserializeDictionaryType(serializer, mapper, responseBody, objectName) {
        /*jshint validthis: true */
        var value = mapper.type.value;
        if (!value || typeof value !== "object") {
            throw new Error("\"value\" metadata for a Dictionary must be defined in the " +
                ("mapper and it must of type \"object\" in " + objectName));
        }
        if (responseBody) {
            var tempDictionary = {};
            for (var _i = 0, _a = Object.keys(responseBody); _i < _a.length; _i++) {
                var key = _a[_i];
                tempDictionary[key] = serializer.deserialize(value, responseBody[key], objectName);
            }
            return tempDictionary;
        }
        return responseBody;
    }
    function deserializeSequenceType(serializer, mapper, responseBody, objectName) {
        /*jshint validthis: true */
        var element = mapper.type.element;
        if (!element || typeof element !== "object") {
            throw new Error("element\" metadata for an Array must be defined in the " +
                ("mapper and it must of type \"object\" in " + objectName));
        }
        if (responseBody) {
            if (!Array.isArray(responseBody)) {
                // xml2js will interpret a single element array as just the element, so force it to be an array
                responseBody = [responseBody];
            }
            var tempArray = [];
            for (var i = 0; i < responseBody.length; i++) {
                tempArray[i] = serializer.deserialize(element, responseBody[i], objectName + "[" + i + "]");
            }
            return tempArray;
        }
        return responseBody;
    }
    function getPolymorphicMapper(serializer, mapper, object, polymorphicPropertyName) {
        var polymorphicDiscriminator = getPolymorphicDiscriminatorRecursively(serializer, mapper);
        if (polymorphicDiscriminator) {
            var discriminatorName = polymorphicDiscriminator[polymorphicPropertyName];
            if (discriminatorName != undefined) {
                var discriminatorValue = object[discriminatorName];
                if (discriminatorValue != undefined) {
                    var typeName = mapper.type.uberParent || mapper.type.className;
                    var indexDiscriminator = discriminatorValue === typeName
                        ? discriminatorValue
                        : typeName + "." + discriminatorValue;
                    var polymorphicMapper = serializer.modelMappers.discriminators[indexDiscriminator];
                    if (polymorphicMapper) {
                        mapper = polymorphicMapper;
                    }
                }
            }
        }
        return mapper;
    }
    function getPolymorphicDiscriminatorRecursively(serializer, mapper) {
        return (mapper.type.polymorphicDiscriminator ||
            getPolymorphicDiscriminatorSafely(serializer, mapper.type.uberParent) ||
            getPolymorphicDiscriminatorSafely(serializer, mapper.type.className));
    }
    function getPolymorphicDiscriminatorSafely(serializer, typeName) {
        return (typeName &&
            serializer.modelMappers[typeName] &&
            serializer.modelMappers[typeName].type.polymorphicDiscriminator);
    }
    /**
     * Utility function to create a K:V from a list of strings
     */
    function strEnum(o) {
        var result = {};
        for (var _i = 0, o_1 = o; _i < o_1.length; _i++) {
            var key = o_1[_i];
            result[key] = key;
        }
        return result;
    }
    var MapperType = strEnum([
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

    // Copyright (c) Microsoft Corporation.
    /**
     * Creates a new WebResource object.
     *
     * This class provides an abstraction over a REST call by being library / implementation agnostic and wrapping the necessary
     * properties to initiate a request.
     *
     * @constructor
     */
    var WebResource = /** @class */ (function () {
        function WebResource(url, method, body, query, headers, streamResponseBody, withCredentials, abortSignal, timeout, onUploadProgress, onDownloadProgress, proxySettings, keepAlive) {
            this.streamResponseBody = streamResponseBody;
            this.url = url || "";
            this.method = method || "GET";
            this.headers = headers instanceof HttpHeaders ? headers : new HttpHeaders(headers);
            this.body = body;
            this.query = query;
            this.formData = undefined;
            this.withCredentials = withCredentials || false;
            this.abortSignal = abortSignal;
            this.timeout = timeout || 0;
            this.onUploadProgress = onUploadProgress;
            this.onDownloadProgress = onDownloadProgress;
            this.proxySettings = proxySettings;
            this.keepAlive = keepAlive;
            this.requestId = this.headers.get("x-ms-client-request-id") || generateUuid();
        }
        /**
         * Validates that the required properties such as method, url, headers["Content-Type"],
         * headers["accept-language"] are defined. It will throw an error if one of the above
         * mentioned properties are not defined.
         */
        WebResource.prototype.validateRequestProperties = function () {
            if (!this.method) {
                throw new Error("WebResource.method is required.");
            }
            if (!this.url) {
                throw new Error("WebResource.url is required.");
            }
        };
        /**
         * Prepares the request.
         * @param {RequestPrepareOptions} options Options to provide for preparing the request.
         * @returns {WebResource} Returns the prepared WebResource (HTTP Request) object that needs to be given to the request pipeline.
         */
        WebResource.prototype.prepare = function (options) {
            if (!options) {
                throw new Error("options object is required");
            }
            if (options.method == undefined || typeof options.method.valueOf() !== "string") {
                throw new Error("options.method must be a string.");
            }
            if (options.url && options.pathTemplate) {
                throw new Error("options.url and options.pathTemplate are mutually exclusive. Please provide exactly one of them.");
            }
            if ((options.pathTemplate == undefined || typeof options.pathTemplate.valueOf() !== "string") &&
                (options.url == undefined || typeof options.url.valueOf() !== "string")) {
                throw new Error("Please provide exactly one of options.pathTemplate or options.url.");
            }
            // set the url if it is provided.
            if (options.url) {
                if (typeof options.url !== "string") {
                    throw new Error('options.url must be of type "string".');
                }
                this.url = options.url;
            }
            // set the method
            if (options.method) {
                var validMethods = ["GET", "PUT", "HEAD", "DELETE", "OPTIONS", "POST", "PATCH", "TRACE"];
                if (validMethods.indexOf(options.method.toUpperCase()) === -1) {
                    throw new Error('The provided method "' +
                        options.method +
                        '" is invalid. Supported HTTP methods are: ' +
                        JSON.stringify(validMethods));
                }
            }
            this.method = options.method.toUpperCase();
            // construct the url if path template is provided
            if (options.pathTemplate) {
                var pathTemplate_1 = options.pathTemplate, pathParameters_1 = options.pathParameters;
                if (typeof pathTemplate_1 !== "string") {
                    throw new Error('options.pathTemplate must be of type "string".');
                }
                if (!options.baseUrl) {
                    options.baseUrl = "https://management.azure.com";
                }
                var baseUrl = options.baseUrl;
                var url_1 = baseUrl +
                    (baseUrl.endsWith("/") ? "" : "/") +
                    (pathTemplate_1.startsWith("/") ? pathTemplate_1.slice(1) : pathTemplate_1);
                var segments = url_1.match(/({\w*\s*\w*})/gi);
                if (segments && segments.length) {
                    if (!pathParameters_1) {
                        throw new Error("pathTemplate: " + pathTemplate_1 + " has been provided. Hence, options.pathParameters must also be provided.");
                    }
                    segments.forEach(function (item) {
                        var pathParamName = item.slice(1, -1);
                        var pathParam = pathParameters_1[pathParamName];
                        if (pathParam === null ||
                            pathParam === undefined ||
                            !(typeof pathParam === "string" || typeof pathParam === "object")) {
                            var stringifiedPathParameters = JSON.stringify(pathParameters_1, undefined, 2);
                            throw new Error("pathTemplate: " + pathTemplate_1 + " contains the path parameter " + pathParamName +
                                (" however, it is not present in parameters: " + stringifiedPathParameters + ".") +
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
                var queryParameters = options.queryParameters;
                if (typeof queryParameters !== "object") {
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
                for (var _i = 0, _a = Object.keys(options.headers); _i < _a.length; _i++) {
                    var headerName = _a[_i];
                    this.headers.set(headerName, headers[headerName]);
                }
            }
            // ensure accept-language is set correctly
            if (!this.headers.get("accept-language")) {
                this.headers.set("accept-language", "en-US");
            }
            // ensure the request-id is set correctly
            if (!this.headers.get("x-ms-client-request-id") && !options.disableClientRequestId) {
                this.headers.set("x-ms-client-request-id", this.requestId);
            }
            // default
            if (!this.headers.get("Content-Type")) {
                this.headers.set("Content-Type", "application/json; charset=utf-8");
            }
            // set the request body. request.js automatically sets the Content-Length request header, so we need not set it explicilty
            this.body = options.body;
            if (options.body != undefined) {
                // body as a stream special case. set the body as-is and check for some special request headers specific to sending a stream.
                if (options.bodyIsStream) {
                    if (!this.headers.get("Transfer-Encoding")) {
                        this.headers.set("Transfer-Encoding", "chunked");
                    }
                    if (this.headers.get("Content-Type") !== "application/octet-stream") {
                        this.headers.set("Content-Type", "application/octet-stream");
                    }
                }
                else {
                    if (options.serializationMapper) {
                        this.body = new Serializer(options.mappers).serialize(options.serializationMapper, options.body, "requestBody");
                    }
                    if (!options.disableJsonStringifyOnBody) {
                        this.body = JSON.stringify(options.body);
                    }
                }
            }
            if (options.spanOptions) {
                this.spanOptions = options.spanOptions;
            }
            this.abortSignal = options.abortSignal;
            this.onDownloadProgress = options.onDownloadProgress;
            this.onUploadProgress = options.onUploadProgress;
            return this;
        };
        /**
         * Clone this WebResource HTTP request object.
         * @returns {WebResource} The clone of this WebResource HTTP request object.
         */
        WebResource.prototype.clone = function () {
            var result = new WebResource(this.url, this.method, this.body, this.query, this.headers && this.headers.clone(), this.streamResponseBody, this.withCredentials, this.abortSignal, this.timeout, this.onUploadProgress, this.onDownloadProgress, this.proxySettings, this.keepAlive);
            if (this.formData) {
                result.formData = this.formData;
            }
            if (this.operationSpec) {
                result.operationSpec = this.operationSpec;
            }
            if (this.shouldDeserialize) {
                result.shouldDeserialize = this.shouldDeserialize;
            }
            if (this.operationResponseGetter) {
                result.operationResponseGetter = this.operationResponseGetter;
            }
            return result;
        };
        return WebResource;
    }());

    var listenersMap = new WeakMap();
    var abortedMap = new WeakMap();
    /**
     * An aborter instance implements AbortSignal interface, can abort HTTP requests.
     *
     * - Call AbortSignal.none to create a new AbortSignal instance that cannot be cancelled.
     * Use `AbortSignal.none` when you are required to pass a cancellation token but the operation
     * cannot or will not ever be cancelled.
     *
     * @example
     * // Abort without timeout
     * await doAsyncWork(AbortSignal.none);
     *
     * @export
     * @class AbortSignal
     * @implements {AbortSignalLike}
     */
    var AbortSignal = /** @class */ (function () {
        function AbortSignal() {
            /**
             * onabort event listener.
             *
             * @memberof AbortSignal
             */
            this.onabort = null;
            listenersMap.set(this, []);
            abortedMap.set(this, false);
        }
        Object.defineProperty(AbortSignal.prototype, "aborted", {
            /**
             * Status of whether aborted or not.
             *
             * @readonly
             * @type {boolean}
             * @memberof AbortSignal
             */
            get: function () {
                if (!abortedMap.has(this)) {
                    throw new TypeError("Expected `this` to be an instance of AbortSignal.");
                }
                return abortedMap.get(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AbortSignal, "none", {
            /**
             * Creates a new AbortSignal instance that will never be aborted.
             *
             * @readonly
             * @static
             * @type {AbortSignal}
             * @memberof AbortSignal
             */
            get: function () {
                return new AbortSignal();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Added new "abort" event listener, only support "abort" event.
         *
         * @param {"abort"} _type Only support "abort" event
         * @param {(this: AbortSignalLike, ev: any) => any} listener
         * @memberof AbortSignal
         */
        AbortSignal.prototype.addEventListener = function (
        // tslint:disable-next-line:variable-name
        _type, listener) {
            if (!listenersMap.has(this)) {
                throw new TypeError("Expected `this` to be an instance of AbortSignal.");
            }
            var listeners = listenersMap.get(this);
            listeners.push(listener);
        };
        /**
         * Remove "abort" event listener, only support "abort" event.
         *
         * @param {"abort"} _type Only support "abort" event
         * @param {(this: AbortSignalLike, ev: any) => any} listener
         * @memberof AbortSignal
         */
        AbortSignal.prototype.removeEventListener = function (
        // tslint:disable-next-line:variable-name
        _type, listener) {
            if (!listenersMap.has(this)) {
                throw new TypeError("Expected `this` to be an instance of AbortSignal.");
            }
            var listeners = listenersMap.get(this);
            var index = listeners.indexOf(listener);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        };
        /**
         * Dispatches a synthetic event to the AbortSignal.
         */
        AbortSignal.prototype.dispatchEvent = function (_event) {
            throw new Error("This is a stub dispatchEvent implementation that should not be used.  It only exists for type-checking purposes.");
        };
        return AbortSignal;
    }());
    /**
     * Helper to trigger an abort event immediately, the onabort and all abort event listeners will be triggered.
     * Will try to trigger abort event for all linked AbortSignal nodes.
     *
     * - If there is a timeout, the timer will be cancelled.
     * - If aborted is true, nothing will happen.
     *
     * @returns
     * @internal
     */
    function abortSignal(signal) {
        if (signal.aborted) {
            return;
        }
        if (signal.onabort) {
            signal.onabort.call(signal);
        }
        var listeners = listenersMap.get(signal);
        if (listeners) {
            listeners.forEach(function (listener) {
                listener.call(signal, { type: "abort" });
            });
        }
        abortedMap.set(signal, true);
    }

    /**
     * This error is thrown when an asynchronous operation has been aborted.
     * Check for this error by testing the `name` that the name property of the
     * error matches `"AbortError"`.
     *
     * @example
     * const controller = new AbortController();
     * controller.abort();
     * try {
     *   doAsyncWork(controller.signal)
     * } catch (e) {
     *   if (e.name === 'AbortError') {
     *     // handle abort error here.
     *   }
     * }
     */
    var AbortError = /** @class */ (function (_super) {
        __extends(AbortError, _super);
        function AbortError(message) {
            var _this = _super.call(this, message) || this;
            _this.name = "AbortError";
            return _this;
        }
        return AbortError;
    }(Error));
    /**
     * An AbortController provides an AbortSignal and the associated controls to signal
     * that an asynchronous operation should be aborted.
     *
     * @example
     * // Abort an operation when another event fires
     * const controller = new AbortController();
     * const signal = controller.signal;
     * doAsyncWork(signal);
     * button.addEventListener('click', () => controller.abort());
     *
     * @example
     * // Share aborter cross multiple operations in 30s
     * // Upload the same data to 2 different data centers at the same time,
     * // abort another when any of them is finished
     * const controller = AbortController.withTimeout(30 * 1000);
     * doAsyncWork(controller.signal).then(controller.abort);
     * doAsyncWork(controller.signal).then(controller.abort);
     *
     * @example
     * // Cascaded aborting
     * // All operations can't take more than 30 seconds
     * const aborter = Aborter.timeout(30 * 1000);
     *
     * // Following 2 operations can't take more than 25 seconds
     * await doAsyncWork(aborter.withTimeout(25 * 1000));
     * await doAsyncWork(aborter.withTimeout(25 * 1000));
     *
     * @export
     * @class AbortController
     * @implements {AbortSignalLike}
     */
    var AbortController = /** @class */ (function () {
        function AbortController(parentSignals) {
            var _this = this;
            this._signal = new AbortSignal();
            if (!parentSignals) {
                return;
            }
            // coerce parentSignals into an array
            if (!Array.isArray(parentSignals)) {
                parentSignals = arguments;
            }
            for (var _i = 0, parentSignals_1 = parentSignals; _i < parentSignals_1.length; _i++) {
                var parentSignal = parentSignals_1[_i];
                // if the parent signal has already had abort() called,
                // then call abort on this signal as well.
                if (parentSignal.aborted) {
                    this.abort();
                }
                else {
                    // when the parent signal aborts, this signal should as well.
                    parentSignal.addEventListener("abort", function () {
                        _this.abort();
                    });
                }
            }
        }
        Object.defineProperty(AbortController.prototype, "signal", {
            /**
             * The AbortSignal associated with this controller that will signal aborted
             * when the abort method is called on this controller.
             *
             * @readonly
             * @type {AbortSignal}
             * @memberof AbortController
             */
            get: function () {
                return this._signal;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Signal that any operations passed this controller's associated abort signal
         * to cancel any remaining work and throw an `AbortError`.
         *
         * @memberof AbortController
         */
        AbortController.prototype.abort = function () {
            abortSignal(this._signal);
        };
        /**
         * Creates a new AbortSignal instance that will abort after the provided ms.
         *
         * @static
         * @params {number} ms Elapsed time in milliseconds to trigger an abort.
         * @returns {AbortSignal}
         */
        AbortController.timeout = function (ms) {
            var signal = new AbortSignal();
            var timer = setTimeout(abortSignal, ms, signal);
            // Prevent the active Timer from keeping the Node.js event loop active.
            if (typeof timer.unref === "function") {
                timer.unref();
            }
            return signal;
        };
        return AbortController;
    }());

    // Copyright (c) Microsoft Corporation.
    // Licensed under the MIT License.
    var custom = {};

    // Copyright (c) Microsoft Corporation.
    /**
     * A class that handles the query portion of a URLBuilder.
     */
    var URLQuery = /** @class */ (function () {
        function URLQuery() {
            this._rawQuery = {};
        }
        /**
         * Get whether or not there any query parameters in this URLQuery.
         */
        URLQuery.prototype.any = function () {
            return Object.keys(this._rawQuery).length > 0;
        };
        /**
         * Get the keys of the query string.
         */
        URLQuery.prototype.keys = function () {
            return Object.keys(this._rawQuery);
        };
        /**
         * Set a query parameter with the provided name and value. If the parameterValue is undefined or
         * empty, then this will attempt to remove an existing query parameter with the provided
         * parameterName.
         */
        URLQuery.prototype.set = function (parameterName, parameterValue) {
            if (parameterName) {
                if (parameterValue != undefined) {
                    var newValue = Array.isArray(parameterValue) ? parameterValue : parameterValue.toString();
                    this._rawQuery[parameterName] = newValue;
                }
                else {
                    delete this._rawQuery[parameterName];
                }
            }
        };
        /**
         * Get the value of the query parameter with the provided name. If no parameter exists with the
         * provided parameter name, then undefined will be returned.
         */
        URLQuery.prototype.get = function (parameterName) {
            return parameterName ? this._rawQuery[parameterName] : undefined;
        };
        /**
         * Get the string representation of this query. The return value will not start with a "?".
         */
        URLQuery.prototype.toString = function () {
            var result = "";
            for (var parameterName in this._rawQuery) {
                if (result) {
                    result += "&";
                }
                var parameterValue = this._rawQuery[parameterName];
                if (Array.isArray(parameterValue)) {
                    var parameterStrings = [];
                    for (var _i = 0, parameterValue_1 = parameterValue; _i < parameterValue_1.length; _i++) {
                        var parameterValueElement = parameterValue_1[_i];
                        parameterStrings.push(parameterName + "=" + parameterValueElement);
                    }
                    result += parameterStrings.join("&");
                }
                else {
                    result += parameterName + "=" + parameterValue;
                }
            }
            return result;
        };
        /**
         * Parse a URLQuery from the provided text.
         */
        URLQuery.parse = function (text) {
            var result = new URLQuery();
            if (text) {
                if (text.startsWith("?")) {
                    text = text.substring(1);
                }
                var currentState = "ParameterName";
                var parameterName = "";
                var parameterValue = "";
                for (var i = 0; i < text.length; ++i) {
                    var currentCharacter = text[i];
                    switch (currentState) {
                        case "ParameterName":
                            switch (currentCharacter) {
                                case "=":
                                    currentState = "ParameterValue";
                                    break;
                                case "&":
                                    parameterName = "";
                                    parameterValue = "";
                                    break;
                                default:
                                    parameterName += currentCharacter;
                                    break;
                            }
                            break;
                        case "ParameterValue":
                            switch (currentCharacter) {
                                case "=":
                                    parameterName = "";
                                    parameterValue = "";
                                    currentState = "Invalid";
                                    break;
                                case "&":
                                    result.set(parameterName, parameterValue);
                                    parameterName = "";
                                    parameterValue = "";
                                    currentState = "ParameterName";
                                    break;
                                default:
                                    parameterValue += currentCharacter;
                                    break;
                            }
                            break;
                        case "Invalid":
                            if (currentCharacter === "&") {
                                currentState = "ParameterName";
                            }
                            break;
                        default:
                            throw new Error("Unrecognized URLQuery parse state: " + currentState);
                    }
                }
                if (currentState === "ParameterValue") {
                    result.set(parameterName, parameterValue);
                }
            }
            return result;
        };
        return URLQuery;
    }());
    /**
     * A class that handles creating, modifying, and parsing URLs.
     */
    var URLBuilder = /** @class */ (function () {
        function URLBuilder() {
        }
        /**
         * Set the scheme/protocol for this URL. If the provided scheme contains other parts of a URL
         * (such as a host, port, path, or query), those parts will be added to this URL as well.
         */
        URLBuilder.prototype.setScheme = function (scheme) {
            if (!scheme) {
                this._scheme = undefined;
            }
            else {
                this.set(scheme, "SCHEME");
            }
        };
        /**
         * Get the scheme that has been set in this URL.
         */
        URLBuilder.prototype.getScheme = function () {
            return this._scheme;
        };
        /**
         * Set the host for this URL. If the provided host contains other parts of a URL (such as a
         * port, path, or query), those parts will be added to this URL as well.
         */
        URLBuilder.prototype.setHost = function (host) {
            if (!host) {
                this._host = undefined;
            }
            else {
                this.set(host, "SCHEME_OR_HOST");
            }
        };
        /**
         * Get the host that has been set in this URL.
         */
        URLBuilder.prototype.getHost = function () {
            return this._host;
        };
        /**
         * Set the port for this URL. If the provided port contains other parts of a URL (such as a
         * path or query), those parts will be added to this URL as well.
         */
        URLBuilder.prototype.setPort = function (port) {
            if (port == undefined || port === "") {
                this._port = undefined;
            }
            else {
                this.set(port.toString(), "PORT");
            }
        };
        /**
         * Get the port that has been set in this URL.
         */
        URLBuilder.prototype.getPort = function () {
            return this._port;
        };
        /**
         * Set the path for this URL. If the provided path contains a query, then it will be added to
         * this URL as well.
         */
        URLBuilder.prototype.setPath = function (path) {
            if (!path) {
                this._path = undefined;
            }
            else {
                if (path.indexOf("://") !== -1) {
                    this.set(path, "SCHEME");
                }
                else {
                    this.set(path, "PATH");
                }
            }
        };
        /**
         * Append the provided path to this URL's existing path. If the provided path contains a query,
         * then it will be added to this URL as well.
         */
        URLBuilder.prototype.appendPath = function (path) {
            if (path) {
                var currentPath = this.getPath();
                if (currentPath) {
                    if (!currentPath.endsWith("/")) {
                        currentPath += "/";
                    }
                    if (path.startsWith("/")) {
                        path = path.substring(1);
                    }
                    path = currentPath + path;
                }
                this.set(path, "PATH");
            }
        };
        /**
         * Get the path that has been set in this URL.
         */
        URLBuilder.prototype.getPath = function () {
            return this._path;
        };
        /**
         * Set the query in this URL.
         */
        URLBuilder.prototype.setQuery = function (query) {
            if (!query) {
                this._query = undefined;
            }
            else {
                this._query = URLQuery.parse(query);
            }
        };
        /**
         * Set a query parameter with the provided name and value in this URL's query. If the provided
         * query parameter value is undefined or empty, then the query parameter will be removed if it
         * existed.
         */
        URLBuilder.prototype.setQueryParameter = function (queryParameterName, queryParameterValue) {
            if (queryParameterName) {
                if (!this._query) {
                    this._query = new URLQuery();
                }
                this._query.set(queryParameterName, queryParameterValue);
            }
        };
        /**
         * Get the value of the query parameter with the provided query parameter name. If no query
         * parameter exists with the provided name, then undefined will be returned.
         */
        URLBuilder.prototype.getQueryParameterValue = function (queryParameterName) {
            return this._query ? this._query.get(queryParameterName) : undefined;
        };
        /**
         * Get the query in this URL.
         */
        URLBuilder.prototype.getQuery = function () {
            return this._query ? this._query.toString() : undefined;
        };
        /**
         * Set the parts of this URL by parsing the provided text using the provided startState.
         */
        URLBuilder.prototype.set = function (text, startState) {
            var tokenizer = new URLTokenizer(text, startState);
            while (tokenizer.next()) {
                var token = tokenizer.current();
                if (token) {
                    switch (token.type) {
                        case "SCHEME":
                            this._scheme = token.text || undefined;
                            break;
                        case "HOST":
                            this._host = token.text || undefined;
                            break;
                        case "PORT":
                            this._port = token.text || undefined;
                            break;
                        case "PATH":
                            var tokenPath = token.text || undefined;
                            if (!this._path || this._path === "/" || tokenPath !== "/") {
                                this._path = tokenPath;
                            }
                            break;
                        case "QUERY":
                            this._query = URLQuery.parse(token.text);
                            break;
                        default:
                            throw new Error("Unrecognized URLTokenType: " + token.type);
                    }
                }
            }
        };
        URLBuilder.prototype.toString = function () {
            var result = "";
            if (this._scheme) {
                result += this._scheme + "://";
            }
            if (this._host) {
                result += this._host;
            }
            if (this._port) {
                result += ":" + this._port;
            }
            if (this._path) {
                if (!this._path.startsWith("/")) {
                    result += "/";
                }
                result += this._path;
            }
            if (this._query && this._query.any()) {
                result += "?" + this._query.toString();
            }
            return result;
        };
        /**
         * If the provided searchValue is found in this URLBuilder, then replace it with the provided
         * replaceValue.
         */
        URLBuilder.prototype.replaceAll = function (searchValue, replaceValue) {
            if (searchValue) {
                this.setScheme(replaceAll(this.getScheme(), searchValue, replaceValue));
                this.setHost(replaceAll(this.getHost(), searchValue, replaceValue));
                this.setPort(replaceAll(this.getPort(), searchValue, replaceValue));
                this.setPath(replaceAll(this.getPath(), searchValue, replaceValue));
                this.setQuery(replaceAll(this.getQuery(), searchValue, replaceValue));
            }
        };
        URLBuilder.parse = function (text) {
            var result = new URLBuilder();
            result.set(text, "SCHEME_OR_HOST");
            return result;
        };
        return URLBuilder;
    }());
    var URLToken = /** @class */ (function () {
        function URLToken(text, type) {
            this.text = text;
            this.type = type;
        }
        URLToken.scheme = function (text) {
            return new URLToken(text, "SCHEME");
        };
        URLToken.host = function (text) {
            return new URLToken(text, "HOST");
        };
        URLToken.port = function (text) {
            return new URLToken(text, "PORT");
        };
        URLToken.path = function (text) {
            return new URLToken(text, "PATH");
        };
        URLToken.query = function (text) {
            return new URLToken(text, "QUERY");
        };
        return URLToken;
    }());
    /**
     * Get whether or not the provided character (single character string) is an alphanumeric (letter or
     * digit) character.
     */
    function isAlphaNumericCharacter(character) {
        var characterCode = character.charCodeAt(0);
        return ((48 /* '0' */ <= characterCode && characterCode <= 57) /* '9' */ ||
            (65 /* 'A' */ <= characterCode && characterCode <= 90) /* 'Z' */ ||
            (97 /* 'a' */ <= characterCode && characterCode <= 122) /* 'z' */);
    }
    /**
     * A class that tokenizes URL strings.
     */
    var URLTokenizer = /** @class */ (function () {
        function URLTokenizer(_text, state) {
            this._text = _text;
            this._textLength = _text ? _text.length : 0;
            this._currentState = state != undefined ? state : "SCHEME_OR_HOST";
            this._currentIndex = 0;
        }
        /**
         * Get the current URLToken this URLTokenizer is pointing at, or undefined if the URLTokenizer
         * hasn't started or has finished tokenizing.
         */
        URLTokenizer.prototype.current = function () {
            return this._currentToken;
        };
        /**
         * Advance to the next URLToken and return whether or not a URLToken was found.
         */
        URLTokenizer.prototype.next = function () {
            if (!hasCurrentCharacter(this)) {
                this._currentToken = undefined;
            }
            else {
                switch (this._currentState) {
                    case "SCHEME":
                        nextScheme(this);
                        break;
                    case "SCHEME_OR_HOST":
                        nextSchemeOrHost(this);
                        break;
                    case "HOST":
                        nextHost(this);
                        break;
                    case "PORT":
                        nextPort(this);
                        break;
                    case "PATH":
                        nextPath(this);
                        break;
                    case "QUERY":
                        nextQuery(this);
                        break;
                    default:
                        throw new Error("Unrecognized URLTokenizerState: " + this._currentState);
                }
            }
            return !!this._currentToken;
        };
        return URLTokenizer;
    }());
    /**
     * Read the remaining characters from this Tokenizer's character stream.
     */
    function readRemaining(tokenizer) {
        var result = "";
        if (tokenizer._currentIndex < tokenizer._textLength) {
            result = tokenizer._text.substring(tokenizer._currentIndex);
            tokenizer._currentIndex = tokenizer._textLength;
        }
        return result;
    }
    /**
     * Whether or not this URLTokenizer has a current character.
     */
    function hasCurrentCharacter(tokenizer) {
        return tokenizer._currentIndex < tokenizer._textLength;
    }
    /**
     * Get the character in the text string at the current index.
     */
    function getCurrentCharacter(tokenizer) {
        return tokenizer._text[tokenizer._currentIndex];
    }
    /**
     * Advance to the character in text that is "step" characters ahead. If no step value is provided,
     * then step will default to 1.
     */
    function nextCharacter(tokenizer, step) {
        if (hasCurrentCharacter(tokenizer)) {
            if (!step) {
                step = 1;
            }
            tokenizer._currentIndex += step;
        }
    }
    /**
     * Starting with the current character, peek "charactersToPeek" number of characters ahead in this
     * Tokenizer's stream of characters.
     */
    function peekCharacters(tokenizer, charactersToPeek) {
        var endIndex = tokenizer._currentIndex + charactersToPeek;
        if (tokenizer._textLength < endIndex) {
            endIndex = tokenizer._textLength;
        }
        return tokenizer._text.substring(tokenizer._currentIndex, endIndex);
    }
    /**
     * Read characters from this Tokenizer until the end of the stream or until the provided condition
     * is false when provided the current character.
     */
    function readWhile(tokenizer, condition) {
        var result = "";
        while (hasCurrentCharacter(tokenizer)) {
            var currentCharacter = getCurrentCharacter(tokenizer);
            if (!condition(currentCharacter)) {
                break;
            }
            else {
                result += currentCharacter;
                nextCharacter(tokenizer);
            }
        }
        return result;
    }
    /**
     * Read characters from this Tokenizer until a non-alphanumeric character or the end of the
     * character stream is reached.
     */
    function readWhileLetterOrDigit(tokenizer) {
        return readWhile(tokenizer, function (character) { return isAlphaNumericCharacter(character); });
    }
    /**
     * Read characters from this Tokenizer until one of the provided terminating characters is read or
     * the end of the character stream is reached.
     */
    function readUntilCharacter(tokenizer) {
        var terminatingCharacters = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            terminatingCharacters[_i - 1] = arguments[_i];
        }
        return readWhile(tokenizer, function (character) { return terminatingCharacters.indexOf(character) === -1; });
    }
    function nextScheme(tokenizer) {
        var scheme = readWhileLetterOrDigit(tokenizer);
        tokenizer._currentToken = URLToken.scheme(scheme);
        if (!hasCurrentCharacter(tokenizer)) {
            tokenizer._currentState = "DONE";
        }
        else {
            tokenizer._currentState = "HOST";
        }
    }
    function nextSchemeOrHost(tokenizer) {
        var schemeOrHost = readUntilCharacter(tokenizer, ":", "/", "?");
        if (!hasCurrentCharacter(tokenizer)) {
            tokenizer._currentToken = URLToken.host(schemeOrHost);
            tokenizer._currentState = "DONE";
        }
        else if (getCurrentCharacter(tokenizer) === ":") {
            if (peekCharacters(tokenizer, 3) === "://") {
                tokenizer._currentToken = URLToken.scheme(schemeOrHost);
                tokenizer._currentState = "HOST";
            }
            else {
                tokenizer._currentToken = URLToken.host(schemeOrHost);
                tokenizer._currentState = "PORT";
            }
        }
        else {
            tokenizer._currentToken = URLToken.host(schemeOrHost);
            if (getCurrentCharacter(tokenizer) === "/") {
                tokenizer._currentState = "PATH";
            }
            else {
                tokenizer._currentState = "QUERY";
            }
        }
    }
    function nextHost(tokenizer) {
        if (peekCharacters(tokenizer, 3) === "://") {
            nextCharacter(tokenizer, 3);
        }
        var host = readUntilCharacter(tokenizer, ":", "/", "?");
        tokenizer._currentToken = URLToken.host(host);
        if (!hasCurrentCharacter(tokenizer)) {
            tokenizer._currentState = "DONE";
        }
        else if (getCurrentCharacter(tokenizer) === ":") {
            tokenizer._currentState = "PORT";
        }
        else if (getCurrentCharacter(tokenizer) === "/") {
            tokenizer._currentState = "PATH";
        }
        else {
            tokenizer._currentState = "QUERY";
        }
    }
    function nextPort(tokenizer) {
        if (getCurrentCharacter(tokenizer) === ":") {
            nextCharacter(tokenizer);
        }
        var port = readUntilCharacter(tokenizer, "/", "?");
        tokenizer._currentToken = URLToken.port(port);
        if (!hasCurrentCharacter(tokenizer)) {
            tokenizer._currentState = "DONE";
        }
        else if (getCurrentCharacter(tokenizer) === "/") {
            tokenizer._currentState = "PATH";
        }
        else {
            tokenizer._currentState = "QUERY";
        }
    }
    function nextPath(tokenizer) {
        var path = readUntilCharacter(tokenizer, "?");
        tokenizer._currentToken = URLToken.path(path);
        if (!hasCurrentCharacter(tokenizer)) {
            tokenizer._currentState = "DONE";
        }
        else {
            tokenizer._currentState = "QUERY";
        }
    }
    function nextQuery(tokenizer) {
        if (getCurrentCharacter(tokenizer) === "?") {
            nextCharacter(tokenizer);
        }
        var query = readRemaining(tokenizer);
        tokenizer._currentToken = URLToken.query(query);
        tokenizer._currentState = "DONE";
    }

    // Copyright (c) Microsoft Corporation.
    var RedactedString = "REDACTED";
    var defaultAllowedHeaderNames = [
        "x-ms-client-request-id",
        "x-ms-return-client-request-id",
        "x-ms-useragent",
        "traceparent",
        "Accept",
        "Cache-Control",
        "Connection",
        "Content-Length",
        "Content-Type",
        "Date",
        "ETag",
        "Expires",
        "If-Match",
        "If-Modified-Since",
        "If-None-Match",
        "If-Unmodified-Since",
        "Last-Modified",
        "Pragma",
        "Request-Id",
        "Retry-After",
        "Server",
        "Transfer-Encoding",
        "User-Agent"
    ];
    var defaultAllowedQueryParameters = ["api-version"];
    var Sanitizer = /** @class */ (function () {
        function Sanitizer(_a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.allowedHeaderNames, allowedHeaderNames = _c === void 0 ? [] : _c, _d = _b.allowedQueryParameters, allowedQueryParameters = _d === void 0 ? [] : _d;
            allowedHeaderNames = Array.isArray(allowedHeaderNames)
                ? defaultAllowedHeaderNames.concat(allowedHeaderNames)
                : defaultAllowedHeaderNames;
            allowedQueryParameters = Array.isArray(allowedQueryParameters)
                ? defaultAllowedQueryParameters.concat(allowedQueryParameters)
                : defaultAllowedQueryParameters;
            this.allowedHeaderNames = new Set(allowedHeaderNames.map(function (n) { return n.toLowerCase(); }));
            this.allowedQueryParameters = new Set(allowedQueryParameters.map(function (p) { return p.toLowerCase(); }));
        }
        Sanitizer.prototype.sanitize = function (obj) {
            return JSON.stringify(obj, this.replacer.bind(this), 2);
        };
        Sanitizer.prototype.replacer = function (key, value) {
            if (key === "_headersMap") {
                return this.sanitizeHeaders(key, value);
            }
            else if (key === "url") {
                return this.sanitizeUrl(value);
            }
            else if (key === "query") {
                return this.sanitizeQuery(value);
            }
            else if (key === "body") {
                // Don't log the request body
                return undefined;
            }
            else if (key === "response") {
                // Don't log response again
                return undefined;
            }
            else if (key === "operationSpec") {
                // When using sendOperationRequest, the request carries a massive
                // field with the autorest spec. No need to log it.
                return undefined;
            }
            return value;
        };
        Sanitizer.prototype.sanitizeHeaders = function (_, value) {
            return this.sanitizeObject(value, this.allowedHeaderNames, function (v, k) { return v[k].value; });
        };
        Sanitizer.prototype.sanitizeQuery = function (value) {
            return this.sanitizeObject(value, this.allowedQueryParameters, function (v, k) { return v[k]; });
        };
        Sanitizer.prototype.sanitizeObject = function (value, allowedKeys, accessor) {
            if (typeof value !== "object" || value === null) {
                return value;
            }
            var sanitized = {};
            for (var _i = 0, _a = Object.keys(value); _i < _a.length; _i++) {
                var k = _a[_i];
                if (allowedKeys.has(k.toLowerCase())) {
                    sanitized[k] = accessor(value, k);
                }
                else {
                    sanitized[k] = RedactedString;
                }
            }
            return sanitized;
        };
        Sanitizer.prototype.sanitizeUrl = function (value) {
            if (typeof value !== "string" || value === null) {
                return value;
            }
            var urlBuilder = URLBuilder.parse(value);
            var queryString = urlBuilder.getQuery();
            if (!queryString) {
                return value;
            }
            var query = URLQuery.parse(queryString);
            for (var _i = 0, _a = query.keys(); _i < _a.length; _i++) {
                var k = _a[_i];
                if (!this.allowedQueryParameters.has(k.toLowerCase())) {
                    query.set(k, RedactedString);
                }
            }
            urlBuilder.setQuery(query.toString());
            return urlBuilder.toString();
        };
        return Sanitizer;
    }());

    // Copyright (c) Microsoft Corporation.
    var errorSanitizer = new Sanitizer();
    var RestError = /** @class */ (function (_super) {
        __extends(RestError, _super);
        function RestError(message, code, statusCode, request, response) {
            var _this = _super.call(this, message) || this;
            _this.code = code;
            _this.statusCode = statusCode;
            _this.request = request;
            _this.response = response;
            Object.setPrototypeOf(_this, RestError.prototype);
            return _this;
        }
        /**
         * Logging method for util.inspect in Node
         */
        RestError.prototype[custom] = function () {
            return errorSanitizer.sanitize(this);
        };
        RestError.REQUEST_SEND_ERROR = "REQUEST_SEND_ERROR";
        RestError.PARSE_ERROR = "PARSE_ERROR";
        return RestError;
    }(Error));

    // Copyright (c) Microsoft Corporation.
    /**
     * A HttpClient implementation that uses XMLHttpRequest to send HTTP requests.
     */
    var XhrHttpClient = /** @class */ (function () {
        function XhrHttpClient() {
        }
        XhrHttpClient.prototype.sendRequest = function (request) {
            var xhr = new XMLHttpRequest();
            if (request.proxySettings) {
                throw new Error("HTTP proxy is not supported in browser environment");
            }
            var abortSignal = request.abortSignal;
            if (abortSignal) {
                if (abortSignal.aborted) {
                    return Promise.reject(new AbortError("The operation was aborted."));
                }
                var listener_1 = function () {
                    xhr.abort();
                };
                abortSignal.addEventListener("abort", listener_1);
                xhr.addEventListener("readystatechange", function () {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        abortSignal.removeEventListener("abort", listener_1);
                    }
                });
            }
            addProgressListener(xhr.upload, request.onUploadProgress);
            addProgressListener(xhr, request.onDownloadProgress);
            if (request.formData) {
                var formData = request.formData;
                var requestForm_1 = new FormData();
                var appendFormValue = function (key, value) {
                    if (value && value.hasOwnProperty("value") && value.hasOwnProperty("options")) {
                        requestForm_1.append(key, value.value, value.options);
                    }
                    else {
                        requestForm_1.append(key, value);
                    }
                };
                for (var _i = 0, _a = Object.keys(formData); _i < _a.length; _i++) {
                    var formKey = _a[_i];
                    var formValue = formData[formKey];
                    if (Array.isArray(formValue)) {
                        for (var j = 0; j < formValue.length; j++) {
                            appendFormValue(formKey, formValue[j]);
                        }
                    }
                    else {
                        appendFormValue(formKey, formValue);
                    }
                }
                request.body = requestForm_1;
                request.formData = undefined;
                var contentType = request.headers.get("Content-Type");
                if (contentType && contentType.indexOf("multipart/form-data") !== -1) {
                    // browser will automatically apply a suitable content-type header
                    request.headers.remove("Content-Type");
                }
            }
            xhr.open(request.method, request.url);
            xhr.timeout = request.timeout;
            xhr.withCredentials = request.withCredentials;
            for (var _b = 0, _c = request.headers.headersArray(); _b < _c.length; _b++) {
                var header = _c[_b];
                xhr.setRequestHeader(header.name, header.value);
            }
            xhr.responseType = request.streamResponseBody ? "blob" : "text";
            // tslint:disable-next-line:no-null-keyword
            xhr.send(request.body === undefined ? null : request.body);
            if (request.streamResponseBody) {
                return new Promise(function (resolve, reject) {
                    xhr.addEventListener("readystatechange", function () {
                        // Resolve as soon as headers are loaded
                        if (xhr.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
                            var blobBody = new Promise(function (resolve, reject) {
                                xhr.addEventListener("load", function () {
                                    resolve(xhr.response);
                                });
                                rejectOnTerminalEvent(request, xhr, reject);
                            });
                            resolve({
                                request: request,
                                status: xhr.status,
                                headers: parseHeaders(xhr),
                                blobBody: blobBody
                            });
                        }
                    });
                    rejectOnTerminalEvent(request, xhr, reject);
                });
            }
            else {
                return new Promise(function (resolve, reject) {
                    xhr.addEventListener("load", function () {
                        return resolve({
                            request: request,
                            status: xhr.status,
                            headers: parseHeaders(xhr),
                            bodyAsText: xhr.responseText
                        });
                    });
                    rejectOnTerminalEvent(request, xhr, reject);
                });
            }
        };
        return XhrHttpClient;
    }());
    function addProgressListener(xhr, listener) {
        if (listener) {
            xhr.addEventListener("progress", function (rawEvent) {
                return listener({
                    loadedBytes: rawEvent.loaded
                });
            });
        }
    }
    // exported locally for testing
    function parseHeaders(xhr) {
        var responseHeaders = new HttpHeaders();
        var headerLines = xhr
            .getAllResponseHeaders()
            .trim()
            .split(/[\r\n]+/);
        for (var _i = 0, headerLines_1 = headerLines; _i < headerLines_1.length; _i++) {
            var line = headerLines_1[_i];
            var index = line.indexOf(":");
            var headerName = line.slice(0, index);
            var headerValue = line.slice(index + 2);
            responseHeaders.set(headerName, headerValue);
        }
        return responseHeaders;
    }
    function rejectOnTerminalEvent(request, xhr, reject) {
        xhr.addEventListener("error", function () {
            return reject(new RestError("Failed to send request to " + request.url, RestError.REQUEST_SEND_ERROR, undefined, request));
        });
        var abortError = new AbortError("The operation was aborted.");
        xhr.addEventListener("abort", function () { return reject(abortError); });
        xhr.addEventListener("timeout", function () { return reject(abortError); });
    }

    // Copyright (c) Microsoft Corporation.
    // Licensed under the MIT License.
    /**
     * The different levels of logs that can be used with the HttpPipelineLogger.
     */
    var HttpPipelineLogLevel;
    (function (HttpPipelineLogLevel) {
        /**
         * A log level that indicates that no logs will be logged.
         */
        HttpPipelineLogLevel[HttpPipelineLogLevel["OFF"] = 0] = "OFF";
        /**
         * An error log.
         */
        HttpPipelineLogLevel[HttpPipelineLogLevel["ERROR"] = 1] = "ERROR";
        /**
         * A warning log.
         */
        HttpPipelineLogLevel[HttpPipelineLogLevel["WARNING"] = 2] = "WARNING";
        /**
         * An information log.
         */
        HttpPipelineLogLevel[HttpPipelineLogLevel["INFO"] = 3] = "INFO";
    })(HttpPipelineLogLevel || (HttpPipelineLogLevel = {}));

    /**
     * Converts an OperationOptions to a RequestOptionsBase
     *
     * @param opts OperationOptions object to convert to RequestOptionsBase
     */
    function operationOptionsToRequestOptionsBase(opts) {
        var requestOptions = opts.requestOptions, tracingOptions = opts.tracingOptions, additionalOptions = __rest(opts, ["requestOptions", "tracingOptions"]);
        var result = additionalOptions;
        if (requestOptions) {
            result = __assign(__assign({}, result), requestOptions);
        }
        if (tracingOptions) {
            result.spanOptions = tracingOptions.spanOptions;
        }
        return result;
    }

    // Copyright (c) Microsoft Corporation.
    // Licensed under the MIT License.
    /**
     * Tests an object to determine whether it implements TokenCredential.
     *
     * @param credential The assumed TokenCredential to be tested.
     */
    function isTokenCredential(credential) {
        // Check for an object with a 'getToken' function and possibly with
        // a 'signRequest' function.  We do this check to make sure that
        // a ServiceClientCredentials implementor (like TokenClientCredentials
        // in ms-rest-nodeauth) doesn't get mistaken for a TokenCredential if
        // it doesn't actually implement TokenCredential also.
        return (credential &&
            typeof credential.getToken === "function" &&
            (credential.signRequest === undefined || credential.getToken.length > 0));
    }

    // Copyright (c) Microsoft Corporation.
    var BaseRequestPolicy = /** @class */ (function () {
        function BaseRequestPolicy(_nextPolicy, _options) {
            this._nextPolicy = _nextPolicy;
            this._options = _options;
        }
        /**
         * Get whether or not a log with the provided log level should be logged.
         * @param logLevel The log level of the log that will be logged.
         * @returns Whether or not a log with the provided log level should be logged.
         */
        BaseRequestPolicy.prototype.shouldLog = function (logLevel) {
            return this._options.shouldLog(logLevel);
        };
        /**
         * Attempt to log the provided message to the provided logger. If no logger was provided or if
         * the log level does not meat the logger's threshold, then nothing will be logged.
         * @param logLevel The log level of this log.
         * @param message The message of this log.
         */
        BaseRequestPolicy.prototype.log = function (logLevel, message) {
            this._options.log(logLevel, message);
        };
        return BaseRequestPolicy;
    }());
    /**
     * Optional properties that can be used when creating a RequestPolicy.
     */
    var RequestPolicyOptions = /** @class */ (function () {
        function RequestPolicyOptions(_logger) {
            this._logger = _logger;
        }
        /**
         * Get whether or not a log with the provided log level should be logged.
         * @param logLevel The log level of the log that will be logged.
         * @returns Whether or not a log with the provided log level should be logged.
         */
        RequestPolicyOptions.prototype.shouldLog = function (logLevel) {
            return (!!this._logger &&
                logLevel !== HttpPipelineLogLevel.OFF &&
                logLevel <= this._logger.minimumLogLevel);
        };
        /**
         * Attempt to log the provided message to the provided logger. If no logger was provided or if
         * the log level does not meat the logger's threshold, then nothing will be logged.
         * @param logLevel The log level of this log.
         * @param message The message of this log.
         */
        RequestPolicyOptions.prototype.log = function (logLevel, message) {
            if (this._logger && this.shouldLog(logLevel)) {
                this._logger.log(logLevel, message);
            }
        };
        return RequestPolicyOptions;
    }());

    // Copyright (c) Microsoft Corporation. All rights reserved.
    var logFunction = console.debug || console.log;
    function log() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        logFunction.apply(void 0, __spread(args));
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    var debugEnvVariable = (typeof process !== "undefined" && process.env && process.env.DEBUG) || undefined;
    var enabledString;
    var enabledNamespaces = [];
    var skippedNamespaces = [];
    var debuggers = [];
    if (debugEnvVariable) {
        enable(debugEnvVariable);
    }
    function enable(namespaces) {
        var e_1, _a, e_2, _b;
        enabledString = namespaces;
        enabledNamespaces = [];
        skippedNamespaces = [];
        var wildcard = /\*/g;
        var namespaceList = namespaces.split(",").map(function (ns) { return ns.trim().replace(wildcard, ".*?"); });
        try {
            for (var namespaceList_1 = __values(namespaceList), namespaceList_1_1 = namespaceList_1.next(); !namespaceList_1_1.done; namespaceList_1_1 = namespaceList_1.next()) {
                var ns = namespaceList_1_1.value;
                if (ns.startsWith("-")) {
                    skippedNamespaces.push(new RegExp("^" + ns.substr(1) + "$"));
                }
                else {
                    enabledNamespaces.push(new RegExp("^" + ns + "$"));
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (namespaceList_1_1 && !namespaceList_1_1.done && (_a = namespaceList_1.return)) _a.call(namespaceList_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            for (var debuggers_1 = __values(debuggers), debuggers_1_1 = debuggers_1.next(); !debuggers_1_1.done; debuggers_1_1 = debuggers_1.next()) {
                var instance = debuggers_1_1.value;
                instance.enabled = enabled(instance.namespace);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (debuggers_1_1 && !debuggers_1_1.done && (_b = debuggers_1.return)) _b.call(debuggers_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    function enabled(namespace) {
        var e_3, _a, e_4, _b;
        if (namespace.endsWith("*")) {
            return true;
        }
        try {
            for (var skippedNamespaces_1 = __values(skippedNamespaces), skippedNamespaces_1_1 = skippedNamespaces_1.next(); !skippedNamespaces_1_1.done; skippedNamespaces_1_1 = skippedNamespaces_1.next()) {
                var skipped = skippedNamespaces_1_1.value;
                if (skipped.test(namespace)) {
                    return false;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (skippedNamespaces_1_1 && !skippedNamespaces_1_1.done && (_a = skippedNamespaces_1.return)) _a.call(skippedNamespaces_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        try {
            for (var enabledNamespaces_1 = __values(enabledNamespaces), enabledNamespaces_1_1 = enabledNamespaces_1.next(); !enabledNamespaces_1_1.done; enabledNamespaces_1_1 = enabledNamespaces_1.next()) {
                var enabled_1 = enabledNamespaces_1_1.value;
                if (enabled_1.test(namespace)) {
                    return true;
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (enabledNamespaces_1_1 && !enabledNamespaces_1_1.done && (_b = enabledNamespaces_1.return)) _b.call(enabledNamespaces_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return false;
    }
    function disable() {
        var result = enabledString || "";
        enable("");
        return result;
    }
    function createDebugger(namespace) {
        function debug() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (!newDebugger.enabled) {
                return;
            }
            if (args.length > 0) {
                args[0] = namespace + " " + args[0];
            }
            newDebugger.log.apply(newDebugger, __spread(args));
        }
        var newDebugger = Object.assign(debug, {
            enabled: enabled(namespace),
            destroy: destroy,
            log: debugObj.log,
            namespace: namespace,
            extend: extend
        });
        debuggers.push(newDebugger);
        return newDebugger;
    }
    function destroy() {
        var index = debuggers.indexOf(this);
        if (index >= 0) {
            debuggers.splice(index, 1);
            return true;
        }
        return false;
    }
    function extend(namespace) {
        var newDebugger = createDebugger(this.namespace + ":" + namespace);
        newDebugger.log = this.log;
        return newDebugger;
    }
    var debugObj = Object.assign(function (namespace) {
        return createDebugger(namespace);
    }, {
        enable: enable,
        enabled: enabled,
        disable: disable,
        log: log
    });

    // Copyright (c) Microsoft Corporation. All rights reserved.
    var registeredLoggers = new Set();
    var logLevelFromEnv = (typeof process !== "undefined" && process.env && process.env.AZURE_LOG_LEVEL) || undefined;
    var azureLogLevel;
    /**
     * The AzureLogger provides a mechanism for overriding where logs are output to.
     * By default, logs are sent to stderr.
     * Override the `log` method to redirect logs to another location.
     */
    var AzureLogger = debugObj("azure");
    AzureLogger.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        debugObj.log.apply(debugObj, __spread(args));
    };
    var AZURE_LOG_LEVELS = ["verbose", "info", "warning", "error"];
    if (logLevelFromEnv) {
        // avoid calling setLogLevel because we don't want a mis-set environment variable to crash
        if (isAzureLogLevel(logLevelFromEnv)) {
            setLogLevel(logLevelFromEnv);
        }
        else {
            console.error("AZURE_LOG_LEVEL set to unknown log level '" + logLevelFromEnv + "'; logging is not enabled. Acceptable values: " + AZURE_LOG_LEVELS.join(", ") + ".");
        }
    }
    /**
     * Immediately enables logging at the specified log level.
     * @param level The log level to enable for logging.
     * Options from most verbose to least verbose are:
     * - verbose
     * - info
     * - warning
     * - error
     */
    function setLogLevel(level) {
        var e_1, _a;
        if (level && !isAzureLogLevel(level)) {
            throw new Error("Unknown log level '" + level + "'. Acceptable values: " + AZURE_LOG_LEVELS.join(","));
        }
        azureLogLevel = level;
        var enabledNamespaces = [];
        try {
            for (var registeredLoggers_1 = __values(registeredLoggers), registeredLoggers_1_1 = registeredLoggers_1.next(); !registeredLoggers_1_1.done; registeredLoggers_1_1 = registeredLoggers_1.next()) {
                var logger = registeredLoggers_1_1.value;
                if (shouldEnable(logger)) {
                    enabledNamespaces.push(logger.namespace);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (registeredLoggers_1_1 && !registeredLoggers_1_1.done && (_a = registeredLoggers_1.return)) _a.call(registeredLoggers_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        debugObj.enable(enabledNamespaces.join(","));
    }
    var levelMap = {
        verbose: 400,
        info: 300,
        warning: 200,
        error: 100
    };
    /**
     * Creates a logger for use by the Azure SDKs that inherits from `AzureLogger`.
     * @param namespace The name of the SDK package.
     * @ignore
     */
    function createClientLogger(namespace) {
        var clientRootLogger = AzureLogger.extend(namespace);
        patchLogMethod(AzureLogger, clientRootLogger);
        return {
            error: createLogger(clientRootLogger, "error"),
            warning: createLogger(clientRootLogger, "warning"),
            info: createLogger(clientRootLogger, "info"),
            verbose: createLogger(clientRootLogger, "verbose")
        };
    }
    function patchLogMethod(parent, child) {
        child.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            parent.log.apply(parent, __spread(args));
        };
    }
    function createLogger(parent, level) {
        var logger = Object.assign(parent.extend(level), {
            level: level
        });
        patchLogMethod(parent, logger);
        if (shouldEnable(logger)) {
            var enabledNamespaces = debugObj.disable();
            debugObj.enable(enabledNamespaces + "," + logger.namespace);
        }
        registeredLoggers.add(logger);
        return logger;
    }
    function shouldEnable(logger) {
        if (azureLogLevel && levelMap[logger.level] <= levelMap[azureLogLevel]) {
            return true;
        }
        else {
            return false;
        }
    }
    function isAzureLogLevel(logLevel) {
        return AZURE_LOG_LEVELS.includes(logLevel);
    }

    var logger = createClientLogger("core-http");

    // Copyright (c) Microsoft Corporation.
    function logPolicy(loggingOptions) {
        if (loggingOptions === void 0) { loggingOptions = {}; }
        return {
            create: function (nextPolicy, options) {
                return new LogPolicy(nextPolicy, options, loggingOptions);
            }
        };
    }
    var LogPolicy = /** @class */ (function (_super) {
        __extends(LogPolicy, _super);
        function LogPolicy(nextPolicy, options, _a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.logger, logger$1 = _c === void 0 ? logger.info : _c, _d = _b.allowedHeaderNames, allowedHeaderNames = _d === void 0 ? [] : _d, _e = _b.allowedQueryParameters, allowedQueryParameters = _e === void 0 ? [] : _e;
            var _this = _super.call(this, nextPolicy, options) || this;
            _this.logger = logger$1;
            _this.sanitizer = new Sanitizer({ allowedHeaderNames: allowedHeaderNames, allowedQueryParameters: allowedQueryParameters });
            return _this;
        }
        Object.defineProperty(LogPolicy.prototype, "allowedHeaderNames", {
            /**
             * Header names whose values will be logged when logging is enabled. Defaults to
             * Date, traceparent, x-ms-client-request-id, and x-ms-request id.  Any headers
             * specified in this field will be added to that list.  Any other values will
             * be written to logs as "REDACTED".
             * @deprecated Pass these into the constructor instead.
             */
            get: function () {
                return this.sanitizer.allowedHeaderNames;
            },
            /**
             * Header names whose values will be logged when logging is enabled. Defaults to
             * Date, traceparent, x-ms-client-request-id, and x-ms-request id.  Any headers
             * specified in this field will be added to that list.  Any other values will
             * be written to logs as "REDACTED".
             * @deprecated Pass these into the constructor instead.
             */
            set: function (allowedHeaderNames) {
                this.sanitizer.allowedHeaderNames = allowedHeaderNames;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LogPolicy.prototype, "allowedQueryParameters", {
            /**
             * Query string names whose values will be logged when logging is enabled. By default no
             * query string values are logged.
             * @deprecated Pass these into the constructor instead.
             */
            get: function () {
                return this.sanitizer.allowedQueryParameters;
            },
            /**
             * Query string names whose values will be logged when logging is enabled. By default no
             * query string values are logged.
             * @deprecated Pass these into the constructor instead.
             */
            set: function (allowedQueryParameters) {
                this.sanitizer.allowedQueryParameters = allowedQueryParameters;
            },
            enumerable: true,
            configurable: true
        });
        LogPolicy.prototype.sendRequest = function (request) {
            var _this = this;
            if (!this.logger.enabled)
                return this._nextPolicy.sendRequest(request);
            this.logRequest(request);
            return this._nextPolicy.sendRequest(request).then(function (response) { return _this.logResponse(response); });
        };
        LogPolicy.prototype.logRequest = function (request) {
            this.logger("Request: " + this.sanitizer.sanitize(request));
        };
        LogPolicy.prototype.logResponse = function (response) {
            this.logger("Response status code: " + response.status);
            this.logger("Headers: " + this.sanitizer.sanitize(response.headers));
            return response;
        };
        return LogPolicy;
    }(BaseRequestPolicy));

    // Copyright (c) Microsoft Corporation.
    // Licensed under the MIT License.
    /**
     * Get the path to this parameter's value as a dotted string (a.b.c).
     * @param parameter The parameter to get the path string for.
     * @returns The path to this parameter's value as a dotted string.
     */
    function getPathStringFromParameter(parameter) {
        return getPathStringFromParameterPath(parameter.parameterPath, parameter.mapper);
    }
    function getPathStringFromParameterPath(parameterPath, mapper) {
        var result;
        if (typeof parameterPath === "string") {
            result = parameterPath;
        }
        else if (Array.isArray(parameterPath)) {
            result = parameterPath.join(".");
        }
        else {
            result = mapper.serializedName;
        }
        return result;
    }

    // Copyright (c) Microsoft Corporation.
    function isStreamOperation(operationSpec) {
        var result = false;
        for (var statusCode in operationSpec.responses) {
            var operationResponse = operationSpec.responses[statusCode];
            if (operationResponse.bodyMapper &&
                operationResponse.bodyMapper.type.name === MapperType.Stream) {
                result = true;
                break;
            }
        }
        return result;
    }

    // Copyright (c) Microsoft Corporation.
    // Licensed under the MIT License.
    // tslint:disable-next-line:no-null-keyword
    var doc = document.implementation.createDocument(null, null, null);
    var parser = new DOMParser();
    function parseXML(str, opts) {
        try {
            var dom = parser.parseFromString(str, "application/xml");
            throwIfError(dom);
            var obj = void 0;
            if (opts && opts.includeRoot) {
                obj = domToObject(dom);
            }
            else {
                obj = domToObject(dom.childNodes[0]);
            }
            return Promise.resolve(obj);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    var errorNS = "";
    try {
        errorNS = parser.parseFromString("INVALID", "text/xml").getElementsByTagName("parsererror")[0]
            .namespaceURI;
    }
    catch (ignored) {
        // Most browsers will return a document containing <parsererror>, but IE will throw.
    }
    function throwIfError(dom) {
        if (errorNS) {
            var parserErrors = dom.getElementsByTagNameNS(errorNS, "parsererror");
            if (parserErrors.length) {
                throw new Error(parserErrors.item(0).innerHTML);
            }
        }
    }
    function isElement(node) {
        return !!node.attributes;
    }
    /**
     * Get the Element-typed version of the provided Node if the provided node is an element with
     * attributes. If it isn't, then undefined is returned.
     */
    function asElementWithAttributes(node) {
        return isElement(node) && node.hasAttributes() ? node : undefined;
    }
    function domToObject(node) {
        var result = {};
        var childNodeCount = node.childNodes.length;
        var firstChildNode = node.childNodes[0];
        var onlyChildTextValue = (firstChildNode &&
            childNodeCount === 1 &&
            firstChildNode.nodeType === Node.TEXT_NODE &&
            firstChildNode.nodeValue) ||
            undefined;
        var elementWithAttributes = asElementWithAttributes(node);
        if (elementWithAttributes) {
            result["$"] = {};
            for (var i = 0; i < elementWithAttributes.attributes.length; i++) {
                var attr = elementWithAttributes.attributes[i];
                result["$"][attr.nodeName] = attr.nodeValue;
            }
            if (onlyChildTextValue) {
                result["_"] = onlyChildTextValue;
            }
        }
        else if (childNodeCount === 0) {
            result = "";
        }
        else if (onlyChildTextValue) {
            result = onlyChildTextValue;
        }
        if (!onlyChildTextValue) {
            for (var i = 0; i < childNodeCount; i++) {
                var child = node.childNodes[i];
                // Ignore leading/trailing whitespace nodes
                if (child.nodeType !== Node.TEXT_NODE) {
                    var childObject = domToObject(child);
                    if (!result[child.nodeName]) {
                        result[child.nodeName] = childObject;
                    }
                    else if (Array.isArray(result[child.nodeName])) {
                        result[child.nodeName].push(childObject);
                    }
                    else {
                        result[child.nodeName] = [result[child.nodeName], childObject];
                    }
                }
            }
        }
        return result;
    }
    var serializer = new XMLSerializer();
    function stringifyXML(content, opts) {
        var rootName = (opts && opts.rootName) || "root";
        var dom = buildNode(content, rootName)[0];
        return ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + serializer.serializeToString(dom));
    }
    function buildAttributes(attrs) {
        var result = [];
        for (var _i = 0, _a = Object.keys(attrs); _i < _a.length; _i++) {
            var key = _a[_i];
            var attr = doc.createAttribute(key);
            attr.value = attrs[key].toString();
            result.push(attr);
        }
        return result;
    }
    function buildNode(obj, elementName) {
        if (obj == undefined ||
            typeof obj === "string" ||
            typeof obj === "number" ||
            typeof obj === "boolean") {
            var elem = doc.createElement(elementName);
            elem.textContent = obj == undefined ? "" : obj.toString();
            return [elem];
        }
        else if (Array.isArray(obj)) {
            var result = [];
            for (var _i = 0, obj_1 = obj; _i < obj_1.length; _i++) {
                var arrayElem = obj_1[_i];
                for (var _a = 0, _b = buildNode(arrayElem, elementName); _a < _b.length; _a++) {
                    var child = _b[_a];
                    result.push(child);
                }
            }
            return result;
        }
        else if (typeof obj === "object") {
            var elem = doc.createElement(elementName);
            for (var _c = 0, _d = Object.keys(obj); _c < _d.length; _c++) {
                var key = _d[_c];
                if (key === "$") {
                    for (var _e = 0, _f = buildAttributes(obj[key]); _e < _f.length; _e++) {
                        var attr = _f[_e];
                        elem.attributes.setNamedItem(attr);
                    }
                }
                else if (key === "_") {
                    elem.textContent = obj[key].toString();
                }
                else {
                    for (var _g = 0, _h = buildNode(obj[key], key); _g < _h.length; _g++) {
                        var child = _h[_g];
                        elem.appendChild(child);
                    }
                }
            }
            return [elem];
        }
        else {
            throw new Error("Illegal value passed to buildObject: " + obj);
        }
    }

    // Copyright (c) Microsoft Corporation.
    /**
     * Create a new serialization RequestPolicyCreator that will serialized HTTP request bodies as they
     * pass through the HTTP pipeline.
     */
    function deserializationPolicy(deserializationContentTypes) {
        return {
            create: function (nextPolicy, options) {
                return new DeserializationPolicy(nextPolicy, deserializationContentTypes, options);
            }
        };
    }
    var defaultJsonContentTypes = ["application/json", "text/json", "text/plain"];
    var defaultXmlContentTypes = ["application/xml", "application/atom+xml"];
    var DefaultDeserializationOptions = {
        expectedContentTypes: {
            json: defaultJsonContentTypes,
            xml: defaultXmlContentTypes
        }
    };
    /**
     * A RequestPolicy that will deserialize HTTP response bodies and headers as they pass through the
     * HTTP pipeline.
     */
    var DeserializationPolicy = /** @class */ (function (_super) {
        __extends(DeserializationPolicy, _super);
        function DeserializationPolicy(nextPolicy, deserializationContentTypes, options) {
            var _this = _super.call(this, nextPolicy, options) || this;
            _this.jsonContentTypes =
                (deserializationContentTypes && deserializationContentTypes.json) || defaultJsonContentTypes;
            _this.xmlContentTypes =
                (deserializationContentTypes && deserializationContentTypes.xml) || defaultXmlContentTypes;
            return _this;
        }
        DeserializationPolicy.prototype.sendRequest = function (request) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, this._nextPolicy
                            .sendRequest(request)
                            .then(function (response) {
                            return deserializeResponseBody(_this.jsonContentTypes, _this.xmlContentTypes, response);
                        })];
                });
            });
        };
        return DeserializationPolicy;
    }(BaseRequestPolicy));
    function getOperationResponse(parsedResponse) {
        var result;
        var request = parsedResponse.request;
        var operationSpec = request.operationSpec;
        if (operationSpec) {
            var operationResponseGetter = request.operationResponseGetter;
            if (!operationResponseGetter) {
                result = operationSpec.responses[parsedResponse.status];
            }
            else {
                result = operationResponseGetter(operationSpec, parsedResponse);
            }
        }
        return result;
    }
    function shouldDeserializeResponse(parsedResponse) {
        var shouldDeserialize = parsedResponse.request.shouldDeserialize;
        var result;
        if (shouldDeserialize === undefined) {
            result = true;
        }
        else if (typeof shouldDeserialize === "boolean") {
            result = shouldDeserialize;
        }
        else {
            result = shouldDeserialize(parsedResponse);
        }
        return result;
    }
    function deserializeResponseBody(jsonContentTypes, xmlContentTypes, response) {
        return parse(jsonContentTypes, xmlContentTypes, response).then(function (parsedResponse) {
            if (!shouldDeserializeResponse(parsedResponse)) {
                return parsedResponse;
            }
            var operationSpec = parsedResponse.request.operationSpec;
            if (!operationSpec || !operationSpec.responses) {
                return parsedResponse;
            }
            var responseSpec = getOperationResponse(parsedResponse);
            var expectedStatusCodes = Object.keys(operationSpec.responses);
            var hasNoExpectedStatusCodes = expectedStatusCodes.length === 0 ||
                (expectedStatusCodes.length === 1 && expectedStatusCodes[0] === "default");
            var isExpectedStatusCode = hasNoExpectedStatusCodes
                ? 200 <= parsedResponse.status && parsedResponse.status < 300
                : !!responseSpec;
            // There is no operation response spec for current status code.
            // So, treat it as an error case and use the default response spec to deserialize the response.
            if (!isExpectedStatusCode) {
                var defaultResponseSpec = operationSpec.responses.default;
                if (!defaultResponseSpec) {
                    return parsedResponse;
                }
                var defaultBodyMapper = defaultResponseSpec.bodyMapper;
                var defaultHeadersMapper = defaultResponseSpec.headersMapper;
                var initialErrorMessage = isStreamOperation(operationSpec)
                    ? "Unexpected status code: " + parsedResponse.status
                    : parsedResponse.bodyAsText;
                var error = new RestError(initialErrorMessage, undefined, parsedResponse.status, parsedResponse.request, parsedResponse);
                try {
                    // If error response has a body, try to extract error code & message from it
                    // Then try to deserialize it using default body mapper
                    if (parsedResponse.parsedBody) {
                        var parsedBody = parsedResponse.parsedBody;
                        var internalError = parsedBody.error || parsedBody;
                        error.code = internalError.code;
                        if (internalError.message) {
                            error.message = internalError.message;
                        }
                        if (defaultBodyMapper) {
                            var valueToDeserialize = parsedBody;
                            if (operationSpec.isXML && defaultBodyMapper.type.name === MapperType.Sequence) {
                                valueToDeserialize =
                                    typeof parsedBody === "object" ? parsedBody[defaultBodyMapper.xmlElementName] : [];
                            }
                            error.response.parsedBody = operationSpec.serializer.deserialize(defaultBodyMapper, valueToDeserialize, "error.response.parsedBody");
                        }
                    }
                    // If error response has headers, try to deserialize it using default header mapper
                    if (parsedResponse.headers && defaultHeadersMapper) {
                        error.response.parsedHeaders = operationSpec.serializer.deserialize(defaultHeadersMapper, parsedResponse.headers.rawHeaders(), "operationRes.parsedHeaders");
                    }
                }
                catch (defaultError) {
                    error.message = "Error \"" + defaultError.message + "\" occurred in deserializing the responseBody - \"" + parsedResponse.bodyAsText + "\" for the default response.";
                }
                return Promise.reject(error);
            }
            // An operation response spec does exist for current status code, so
            // use it to deserialize the response.
            if (responseSpec) {
                if (responseSpec.bodyMapper) {
                    var valueToDeserialize = parsedResponse.parsedBody;
                    if (operationSpec.isXML && responseSpec.bodyMapper.type.name === MapperType.Sequence) {
                        valueToDeserialize =
                            typeof valueToDeserialize === "object"
                                ? valueToDeserialize[responseSpec.bodyMapper.xmlElementName]
                                : [];
                    }
                    try {
                        parsedResponse.parsedBody = operationSpec.serializer.deserialize(responseSpec.bodyMapper, valueToDeserialize, "operationRes.parsedBody");
                    }
                    catch (error) {
                        var restError = new RestError("Error " + error + " occurred in deserializing the responseBody - " + parsedResponse.bodyAsText, undefined, parsedResponse.status, parsedResponse.request, parsedResponse);
                        return Promise.reject(restError);
                    }
                }
                else if (operationSpec.httpMethod === "HEAD") {
                    // head methods never have a body, but we return a boolean to indicate presence/absence of the resource
                    parsedResponse.parsedBody = response.status >= 200 && response.status < 300;
                }
                if (responseSpec.headersMapper) {
                    parsedResponse.parsedHeaders = operationSpec.serializer.deserialize(responseSpec.headersMapper, parsedResponse.headers.rawHeaders(), "operationRes.parsedHeaders");
                }
            }
            return parsedResponse;
        });
    }
    function parse(jsonContentTypes, xmlContentTypes, operationResponse) {
        var errorHandler = function (err) {
            var msg = "Error \"" + err + "\" occurred while parsing the response body - " + operationResponse.bodyAsText + ".";
            var errCode = err.code || RestError.PARSE_ERROR;
            var e = new RestError(msg, errCode, operationResponse.status, operationResponse.request, operationResponse);
            return Promise.reject(e);
        };
        if (!operationResponse.request.streamResponseBody && operationResponse.bodyAsText) {
            var text_1 = operationResponse.bodyAsText;
            var contentType = operationResponse.headers.get("Content-Type") || "";
            var contentComponents = !contentType
                ? []
                : contentType.split(";").map(function (component) { return component.toLowerCase(); });
            if (contentComponents.length === 0 ||
                contentComponents.some(function (component) { return jsonContentTypes.indexOf(component) !== -1; })) {
                return new Promise(function (resolve) {
                    operationResponse.parsedBody = JSON.parse(text_1);
                    resolve(operationResponse);
                }).catch(errorHandler);
            }
            else if (contentComponents.some(function (component) { return xmlContentTypes.indexOf(component) !== -1; })) {
                return parseXML(text_1)
                    .then(function (body) {
                    operationResponse.parsedBody = body;
                    return operationResponse;
                })
                    .catch(errorHandler);
            }
        }
        return Promise.resolve(operationResponse);
    }

    // Copyright (c) Microsoft Corporation.
    function exponentialRetryPolicy(retryCount, retryInterval, maxRetryInterval) {
        return {
            create: function (nextPolicy, options) {
                return new ExponentialRetryPolicy(nextPolicy, options, retryCount, retryInterval, maxRetryInterval);
            }
        };
    }
    var DEFAULT_CLIENT_RETRY_INTERVAL = 1000 * 30;
    var DEFAULT_CLIENT_RETRY_COUNT = 3;
    var DEFAULT_CLIENT_MAX_RETRY_INTERVAL = 1000 * 90;
    /**
     * Describes the Retry Mode type. Currently supporting only Exponential.
     * @enum RetryMode
     */
    var RetryMode;
    (function (RetryMode) {
        RetryMode[RetryMode["Exponential"] = 0] = "Exponential";
    })(RetryMode || (RetryMode = {}));
    var DefaultRetryOptions = {
        maxRetries: DEFAULT_CLIENT_RETRY_COUNT,
        retryDelayInMs: DEFAULT_CLIENT_RETRY_INTERVAL,
        maxRetryDelayInMs: DEFAULT_CLIENT_MAX_RETRY_INTERVAL
    };
    /**
     * @class
     * Instantiates a new "ExponentialRetryPolicyFilter" instance.
     */
    var ExponentialRetryPolicy = /** @class */ (function (_super) {
        __extends(ExponentialRetryPolicy, _super);
        /**
         * @constructor
         * @param {RequestPolicy} nextPolicy The next RequestPolicy in the pipeline chain.
         * @param {RequestPolicyOptions} options The options for this RequestPolicy.
         * @param {number} [retryCount]        The client retry count.
         * @param {number} [retryInterval]     The client retry interval, in milliseconds.
         * @param {number} [minRetryInterval]  The minimum retry interval, in milliseconds.
         * @param {number} [maxRetryInterval]  The maximum retry interval, in milliseconds.
         */
        function ExponentialRetryPolicy(nextPolicy, options, retryCount, retryInterval, maxRetryInterval) {
            var _this = _super.call(this, nextPolicy, options) || this;
            function isNumber(n) {
                return typeof n === "number";
            }
            _this.retryCount = isNumber(retryCount) ? retryCount : DEFAULT_CLIENT_RETRY_COUNT;
            _this.retryInterval = isNumber(retryInterval) ? retryInterval : DEFAULT_CLIENT_RETRY_INTERVAL;
            _this.maxRetryInterval = isNumber(maxRetryInterval)
                ? maxRetryInterval
                : DEFAULT_CLIENT_MAX_RETRY_INTERVAL;
            return _this;
        }
        ExponentialRetryPolicy.prototype.sendRequest = function (request) {
            var _this = this;
            return this._nextPolicy
                .sendRequest(request.clone())
                .then(function (response) { return retry(_this, request, response); })
                .catch(function (error) { return retry(_this, request, error.response, undefined, error); });
        };
        return ExponentialRetryPolicy;
    }(BaseRequestPolicy));
    /**
     * Determines if the operation should be retried and how long to wait until the next retry.
     *
     * @param {ExponentialRetryPolicy} policy The ExponentialRetryPolicy that this function is being called against.
     * @param {number} statusCode The HTTP status code.
     * @param {RetryData} retryData  The retry data.
     * @return {boolean} True if the operation qualifies for a retry; false otherwise.
     */
    function shouldRetry(policy, statusCode, retryData) {
        if (statusCode == undefined ||
            (statusCode < 500 && statusCode !== 408) ||
            statusCode === 501 ||
            statusCode === 505) {
            return false;
        }
        var currentCount;
        if (!retryData) {
            throw new Error("retryData for the ExponentialRetryPolicyFilter cannot be null.");
        }
        else {
            currentCount = retryData && retryData.retryCount;
        }
        return currentCount < policy.retryCount;
    }
    /**
     * Updates the retry data for the next attempt.
     *
     * @param {ExponentialRetryPolicy} policy The ExponentialRetryPolicy that this function is being called against.
     * @param {RetryData} retryData  The retry data.
     * @param {RetryError} [err] The operation"s error, if any.
     */
    function updateRetryData(policy, retryData, err) {
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
        var boundedRandDelta = policy.retryInterval * 0.8 +
            Math.floor(Math.random() * (policy.retryInterval * 1.2 - policy.retryInterval * 0.8));
        incrementDelta *= boundedRandDelta;
        retryData.retryInterval = Math.min(incrementDelta, policy.maxRetryInterval);
        return retryData;
    }
    function retry(policy, request, response, retryData, requestError) {
        retryData = updateRetryData(policy, retryData, requestError);
        var isAborted = request.abortSignal && request.abortSignal.aborted;
        if (!isAborted && shouldRetry(policy, response && response.status, retryData)) {
            logger.info("Retrying request in " + retryData.retryInterval);
            return delay(retryData.retryInterval)
                .then(function () { return policy._nextPolicy.sendRequest(request.clone()); })
                .then(function (res) { return retry(policy, request, res, retryData, undefined); })
                .catch(function (err) { return retry(policy, request, response, retryData, err); });
        }
        else if (isAborted || requestError || !response) {
            // If the operation failed in the end, return all errors instead of just the last one
            var err = retryData.error ||
                new RestError("Failed to send the request.", RestError.REQUEST_SEND_ERROR, response && response.status, response && response.request, response);
            return Promise.reject(err);
        }
        else {
            return Promise.resolve(response);
        }
    }

    // Copyright (c) Microsoft Corporation.
    function generateClientRequestIdPolicy(requestIdHeaderName) {
        if (requestIdHeaderName === void 0) { requestIdHeaderName = "x-ms-client-request-id"; }
        return {
            create: function (nextPolicy, options) {
                return new GenerateClientRequestIdPolicy(nextPolicy, options, requestIdHeaderName);
            }
        };
    }
    var GenerateClientRequestIdPolicy = /** @class */ (function (_super) {
        __extends(GenerateClientRequestIdPolicy, _super);
        function GenerateClientRequestIdPolicy(nextPolicy, options, _requestIdHeaderName) {
            var _this = _super.call(this, nextPolicy, options) || this;
            _this._requestIdHeaderName = _requestIdHeaderName;
            return _this;
        }
        GenerateClientRequestIdPolicy.prototype.sendRequest = function (request) {
            if (!request.headers.contains(this._requestIdHeaderName)) {
                request.headers.set(this._requestIdHeaderName, request.requestId);
            }
            return this._nextPolicy.sendRequest(request);
        };
        return GenerateClientRequestIdPolicy;
    }(BaseRequestPolicy));

    // Copyright (c) Microsoft Corporation.
    // Licensed under the MIT License.
    function getDefaultUserAgentKey() {
        return "x-ms-command-name";
    }
    function getPlatformSpecificData() {
        var navigator = window.navigator;
        var osInfo = {
            key: "OS",
            value: (navigator.oscpu || navigator.platform).replace(" ", "")
        };
        return [osInfo];
    }

    // Copyright (c) Microsoft Corporation.
    function getRuntimeInfo() {
        var msRestRuntime = {
            key: "core-http",
            value: Constants.coreHttpVersion
        };
        return [msRestRuntime];
    }
    function getUserAgentString(telemetryInfo, keySeparator, valueSeparator) {
        if (keySeparator === void 0) { keySeparator = " "; }
        if (valueSeparator === void 0) { valueSeparator = "/"; }
        return telemetryInfo
            .map(function (info) {
            var value = info.value ? "" + valueSeparator + info.value : "";
            return "" + info.key + value;
        })
            .join(keySeparator);
    }
    var getDefaultUserAgentHeaderName = getDefaultUserAgentKey;
    function getDefaultUserAgentValue() {
        var runtimeInfo = getRuntimeInfo();
        var platformSpecificData = getPlatformSpecificData();
        var userAgent = getUserAgentString(runtimeInfo.concat(platformSpecificData));
        return userAgent;
    }
    function userAgentPolicy(userAgentData) {
        var key = !userAgentData || userAgentData.key == undefined ? getDefaultUserAgentKey() : userAgentData.key;
        var value = !userAgentData || userAgentData.value == undefined
            ? getDefaultUserAgentValue()
            : userAgentData.value;
        return {
            create: function (nextPolicy, options) {
                return new UserAgentPolicy(nextPolicy, options, key, value);
            }
        };
    }
    var UserAgentPolicy = /** @class */ (function (_super) {
        __extends(UserAgentPolicy, _super);
        function UserAgentPolicy(_nextPolicy, _options, headerKey, headerValue) {
            var _this = _super.call(this, _nextPolicy, _options) || this;
            _this._nextPolicy = _nextPolicy;
            _this._options = _options;
            _this.headerKey = headerKey;
            _this.headerValue = headerValue;
            return _this;
        }
        UserAgentPolicy.prototype.sendRequest = function (request) {
            this.addUserAgentHeader(request);
            return this._nextPolicy.sendRequest(request);
        };
        UserAgentPolicy.prototype.addUserAgentHeader = function (request) {
            if (!request.headers) {
                request.headers = new HttpHeaders();
            }
            if (!request.headers.get(this.headerKey) && this.headerValue) {
                request.headers.set(this.headerKey, this.headerValue);
            }
        };
        return UserAgentPolicy;
    }(BaseRequestPolicy));

    // Copyright (c) Microsoft Corporation.
    var DefaultRedirectOptions = {
        handleRedirects: true,
        maxRetries: 20
    };
    function redirectPolicy(maximumRetries) {
        if (maximumRetries === void 0) { maximumRetries = 20; }
        return {
            create: function (nextPolicy, options) {
                return new RedirectPolicy(nextPolicy, options, maximumRetries);
            }
        };
    }
    var RedirectPolicy = /** @class */ (function (_super) {
        __extends(RedirectPolicy, _super);
        function RedirectPolicy(nextPolicy, options, maxRetries) {
            if (maxRetries === void 0) { maxRetries = 20; }
            var _this = _super.call(this, nextPolicy, options) || this;
            _this.maxRetries = maxRetries;
            return _this;
        }
        RedirectPolicy.prototype.sendRequest = function (request) {
            var _this = this;
            return this._nextPolicy
                .sendRequest(request)
                .then(function (response) { return handleRedirect(_this, response, 0); });
        };
        return RedirectPolicy;
    }(BaseRequestPolicy));
    function handleRedirect(policy, response, currentRetries) {
        var request = response.request, status = response.status;
        var locationHeader = response.headers.get("location");
        if (locationHeader &&
            (status === 300 || status === 307 || (status === 303 && request.method === "POST")) &&
            (!policy.maxRetries || currentRetries < policy.maxRetries)) {
            var builder = URLBuilder.parse(request.url);
            builder.setPath(locationHeader);
            request.url = builder.toString();
            // POST request with Status code 303 should be converted into a
            // redirected GET request if the redirect url is present in the location header
            if (status === 303) {
                request.method = "GET";
            }
            return policy._nextPolicy
                .sendRequest(request)
                .then(function (res) { return handleRedirect(policy, res, currentRetries + 1); });
        }
        return Promise.resolve(response);
    }

    function rpRegistrationPolicy(retryTimeout) {
        if (retryTimeout === void 0) { retryTimeout = 30; }
        return {
            create: function (nextPolicy, options) {
                return new RPRegistrationPolicy(nextPolicy, options, retryTimeout);
            }
        };
    }
    var RPRegistrationPolicy = /** @class */ (function (_super) {
        __extends(RPRegistrationPolicy, _super);
        function RPRegistrationPolicy(nextPolicy, options, _retryTimeout) {
            if (_retryTimeout === void 0) { _retryTimeout = 30; }
            var _this = _super.call(this, nextPolicy, options) || this;
            _this._retryTimeout = _retryTimeout;
            return _this;
        }
        RPRegistrationPolicy.prototype.sendRequest = function (request) {
            var _this = this;
            return this._nextPolicy
                .sendRequest(request.clone())
                .then(function (response) { return registerIfNeeded(_this, request, response); });
        };
        return RPRegistrationPolicy;
    }(BaseRequestPolicy));
    function registerIfNeeded(policy, request, response) {
        if (response.status === 409) {
            var rpName = checkRPNotRegisteredError(response.bodyAsText);
            if (rpName) {
                var urlPrefix = extractSubscriptionUrl(request.url);
                return (registerRP(policy, urlPrefix, rpName, request)
                    // Autoregistration of ${provider} failed for some reason. We will not return this error
                    // instead will return the initial response with 409 status code back to the user.
                    // do nothing here as we are returning the original response at the end of this method.
                    .catch(function () { return false; })
                    .then(function (registrationStatus) {
                    if (registrationStatus) {
                        // Retry the original request. We have to change the x-ms-client-request-id
                        // otherwise Azure endpoint will return the initial 409 (cached) response.
                        request.headers.set("x-ms-client-request-id", generateUuid());
                        return policy._nextPolicy.sendRequest(request.clone());
                    }
                    return response;
                }));
            }
        }
        return Promise.resolve(response);
    }
    /**
     * Reuses the headers of the original request and url (if specified).
     * @param {WebResource} originalRequest The original request
     * @param {boolean} reuseUrlToo Should the url from the original request be reused as well. Default false.
     * @returns {object} A new request object with desired headers.
     */
    function getRequestEssentials(originalRequest, reuseUrlToo) {
        if (reuseUrlToo === void 0) { reuseUrlToo = false; }
        var reqOptions = originalRequest.clone();
        if (reuseUrlToo) {
            reqOptions.url = originalRequest.url;
        }
        // We have to change the x-ms-client-request-id otherwise Azure endpoint
        // will return the initial 409 (cached) response.
        reqOptions.headers.set("x-ms-client-request-id", generateUuid());
        // Set content-type to application/json
        reqOptions.headers.set("Content-Type", "application/json; charset=utf-8");
        return reqOptions;
    }
    /**
     * Validates the error code and message associated with 409 response status code. If it matches to that of
     * RP not registered then it returns the name of the RP else returns undefined.
     * @param {string} body The response body received after making the original request.
     * @returns {string} The name of the RP if condition is satisfied else undefined.
     */
    function checkRPNotRegisteredError(body) {
        var result, responseBody;
        if (body) {
            try {
                responseBody = JSON.parse(body);
            }
            catch (err) {
                // do nothing;
            }
            if (responseBody &&
                responseBody.error &&
                responseBody.error.message &&
                responseBody.error.code &&
                responseBody.error.code === "MissingSubscriptionRegistration") {
                var matchRes = responseBody.error.message.match(/.*'(.*)'/i);
                if (matchRes) {
                    result = matchRes.pop();
                }
            }
        }
        return result;
    }
    /**
     * Extracts the first part of the URL, just after subscription:
     * https://management.azure.com/subscriptions/00000000-0000-0000-0000-000000000000/
     * @param {string} url The original request url
     * @returns {string} The url prefix as explained above.
     */
    function extractSubscriptionUrl(url) {
        var result;
        var matchRes = url.match(/.*\/subscriptions\/[a-f0-9-]+\//gi);
        if (matchRes && matchRes[0]) {
            result = matchRes[0];
        }
        else {
            throw new Error("Unable to extract subscriptionId from the given url - " + url + ".");
        }
        return result;
    }
    /**
     * Registers the given provider.
     * @param {RPRegistrationPolicy} policy The RPRegistrationPolicy this function is being called against.
     * @param {string} urlPrefix https://management.azure.com/subscriptions/00000000-0000-0000-0000-000000000000/
     * @param {string} provider The provider name to be registered.
     * @param {WebResource} originalRequest The original request sent by the user that returned a 409 response
     * with a message that the provider is not registered.
     * @param {registrationCallback} callback The callback that handles the RP registration
     */
    function registerRP(policy, urlPrefix, provider, originalRequest) {
        var postUrl = urlPrefix + "providers/" + provider + "/register?api-version=2016-02-01";
        var getUrl = urlPrefix + "providers/" + provider + "?api-version=2016-02-01";
        var reqOptions = getRequestEssentials(originalRequest);
        reqOptions.method = "POST";
        reqOptions.url = postUrl;
        return policy._nextPolicy.sendRequest(reqOptions).then(function (response) {
            if (response.status !== 200) {
                throw new Error("Autoregistration of " + provider + " failed. Please try registering manually.");
            }
            return getRegistrationStatus(policy, getUrl, originalRequest);
        });
    }
    /**
     * Polls the registration status of the provider that was registered. Polling happens at an interval of 30 seconds.
     * Polling will happen till the registrationState property of the response body is "Registered".
     * @param {RPRegistrationPolicy} policy The RPRegistrationPolicy this function is being called against.
     * @param {string} url The request url for polling
     * @param {WebResource} originalRequest The original request sent by the user that returned a 409 response
     * with a message that the provider is not registered.
     * @returns {Promise<boolean>} True if RP Registration is successful.
     */
    function getRegistrationStatus(policy, url, originalRequest) {
        var reqOptions = getRequestEssentials(originalRequest);
        reqOptions.url = url;
        reqOptions.method = "GET";
        return policy._nextPolicy.sendRequest(reqOptions).then(function (res) {
            var obj = res.parsedBody;
            if (res.parsedBody && obj.registrationState && obj.registrationState === "Registered") {
                return true;
            }
            else {
                return delay(policy._retryTimeout * 1000)
                    .then(function () { return getRegistrationStatus(policy, url, originalRequest); });
            }
        });
    }

    // Copyright (c) Microsoft Corporation.
    // Licensed under the MIT License.
    /**
     * Defines the default token refresh buffer duration.
     */
    var TokenRefreshBufferMs = 2 * 60 * 1000; // 2 Minutes
    /**
     * Provides an {@link AccessTokenCache} implementation which clears
     * the cached {@link AccessToken}'s after the expiresOnTimestamp has
     * passed.
     */
    var ExpiringAccessTokenCache = /** @class */ (function () {
        /**
         * Constructs an instance of {@link ExpiringAccessTokenCache} with
         * an optional expiration buffer time.
         */
        function ExpiringAccessTokenCache(tokenRefreshBufferMs) {
            if (tokenRefreshBufferMs === void 0) { tokenRefreshBufferMs = TokenRefreshBufferMs; }
            this.cachedToken = undefined;
            this.tokenRefreshBufferMs = tokenRefreshBufferMs;
        }
        ExpiringAccessTokenCache.prototype.setCachedToken = function (accessToken) {
            this.cachedToken = accessToken;
        };
        ExpiringAccessTokenCache.prototype.getCachedToken = function () {
            if (this.cachedToken &&
                Date.now() + this.tokenRefreshBufferMs >= this.cachedToken.expiresOnTimestamp) {
                this.cachedToken = undefined;
            }
            return this.cachedToken;
        };
        return ExpiringAccessTokenCache;
    }());

    // Copyright (c) Microsoft Corporation.
    /**
     * Creates a new BearerTokenAuthenticationPolicy factory.
     *
     * @param credential The TokenCredential implementation that can supply the bearer token.
     * @param scopes The scopes for which the bearer token applies.
     */
    function bearerTokenAuthenticationPolicy(credential, scopes) {
        var tokenCache = new ExpiringAccessTokenCache();
        return {
            create: function (nextPolicy, options) {
                return new BearerTokenAuthenticationPolicy(nextPolicy, options, credential, scopes, tokenCache);
            }
        };
    }
    /**
     *
     * Provides a RequestPolicy that can request a token from a TokenCredential
     * implementation and then apply it to the Authorization header of a request
     * as a Bearer token.
     *
     */
    var BearerTokenAuthenticationPolicy = /** @class */ (function (_super) {
        __extends(BearerTokenAuthenticationPolicy, _super);
        /**
         * Creates a new BearerTokenAuthenticationPolicy object.
         *
         * @param nextPolicy The next RequestPolicy in the request pipeline.
         * @param options Options for this RequestPolicy.
         * @param credential The TokenCredential implementation that can supply the bearer token.
         * @param scopes The scopes for which the bearer token applies.
         * @param tokenCache The cache for the most recent AccessToken returned from the TokenCredential.
         */
        function BearerTokenAuthenticationPolicy(nextPolicy, options, credential, scopes, tokenCache) {
            var _this = _super.call(this, nextPolicy, options) || this;
            _this.credential = credential;
            _this.scopes = scopes;
            _this.tokenCache = tokenCache;
            return _this;
        }
        /**
         * Applies the Bearer token to the request through the Authorization header.
         * @param webResource
         */
        BearerTokenAuthenticationPolicy.prototype.sendRequest = function (webResource) {
            return __awaiter(this, void 0, void 0, function () {
                var token;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!webResource.headers)
                                webResource.headers = new HttpHeaders();
                            return [4 /*yield*/, this.getToken({
                                    abortSignal: webResource.abortSignal,
                                    tracingOptions: {
                                        spanOptions: webResource.spanOptions
                                    }
                                })];
                        case 1:
                            token = _a.sent();
                            webResource.headers.set(Constants.HeaderConstants.AUTHORIZATION, "Bearer " + token);
                            return [2 /*return*/, this._nextPolicy.sendRequest(webResource)];
                    }
                });
            });
        };
        BearerTokenAuthenticationPolicy.prototype.getToken = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var accessToken;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            accessToken = this.tokenCache.getCachedToken();
                            if (!(accessToken === undefined)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.credential.getToken(this.scopes, options)];
                        case 1:
                            accessToken = (_a.sent()) || undefined;
                            this.tokenCache.setCachedToken(accessToken);
                            _a.label = 2;
                        case 2: return [2 /*return*/, accessToken ? accessToken.token : undefined];
                    }
                });
            });
        };
        return BearerTokenAuthenticationPolicy;
    }(BaseRequestPolicy));

    // Copyright (c) Microsoft Corporation.
    function systemErrorRetryPolicy(retryCount, retryInterval, minRetryInterval, maxRetryInterval) {
        return {
            create: function (nextPolicy, options) {
                return new SystemErrorRetryPolicy(nextPolicy, options, retryCount, retryInterval, minRetryInterval, maxRetryInterval);
            }
        };
    }
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
    var SystemErrorRetryPolicy = /** @class */ (function (_super) {
        __extends(SystemErrorRetryPolicy, _super);
        function SystemErrorRetryPolicy(nextPolicy, options, retryCount, retryInterval, minRetryInterval, maxRetryInterval) {
            var _this = _super.call(this, nextPolicy, options) || this;
            _this.DEFAULT_CLIENT_RETRY_INTERVAL = 1000 * 30;
            _this.DEFAULT_CLIENT_RETRY_COUNT = 3;
            _this.DEFAULT_CLIENT_MAX_RETRY_INTERVAL = 1000 * 90;
            _this.DEFAULT_CLIENT_MIN_RETRY_INTERVAL = 1000 * 3;
            _this.retryCount = typeof retryCount === "number" ? retryCount : _this.DEFAULT_CLIENT_RETRY_COUNT;
            _this.retryInterval =
                typeof retryInterval === "number" ? retryInterval : _this.DEFAULT_CLIENT_RETRY_INTERVAL;
            _this.minRetryInterval =
                typeof minRetryInterval === "number"
                    ? minRetryInterval
                    : _this.DEFAULT_CLIENT_MIN_RETRY_INTERVAL;
            _this.maxRetryInterval =
                typeof maxRetryInterval === "number"
                    ? maxRetryInterval
                    : _this.DEFAULT_CLIENT_MAX_RETRY_INTERVAL;
            return _this;
        }
        SystemErrorRetryPolicy.prototype.sendRequest = function (request) {
            var _this = this;
            return this._nextPolicy
                .sendRequest(request.clone())
                .then(function (response) { return retry$1(_this, request, response); });
        };
        return SystemErrorRetryPolicy;
    }(BaseRequestPolicy));
    /**
     * Determines if the operation should be retried and how long to wait until the next retry.
     *
     * @param {number} statusCode The HTTP status code.
     * @param {RetryData} retryData  The retry data.
     * @return {boolean} True if the operation qualifies for a retry; false otherwise.
     */
    function shouldRetry$1(policy, retryData) {
        var currentCount;
        if (!retryData) {
            throw new Error("retryData for the SystemErrorRetryPolicyFilter cannot be null.");
        }
        else {
            currentCount = retryData && retryData.retryCount;
        }
        return currentCount < policy.retryCount;
    }
    /**
     * Updates the retry data for the next attempt.
     *
     * @param {RetryData} retryData  The retry data.
     * @param {object} err        The operation"s error, if any.
     */
    function updateRetryData$1(policy, retryData, err) {
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
        var boundedRandDelta = policy.retryInterval * 0.8 +
            Math.floor(Math.random() * (policy.retryInterval * 1.2 - policy.retryInterval * 0.8));
        incrementDelta *= boundedRandDelta;
        retryData.retryInterval = Math.min(policy.minRetryInterval + incrementDelta, policy.maxRetryInterval);
        return retryData;
    }
    function retry$1(policy, request, operationResponse, retryData, err) {
        retryData = updateRetryData$1(policy, retryData, err);
        if (err &&
            err.code &&
            shouldRetry$1(policy, retryData) &&
            (err.code === "ETIMEDOUT" ||
                err.code === "ESOCKETTIMEDOUT" ||
                err.code === "ECONNREFUSED" ||
                err.code === "ECONNRESET" ||
                err.code === "ENOENT")) {
            // If previous operation ended with an error and the policy allows a retry, do that
            return delay(retryData.retryInterval)
                .then(function () { return policy._nextPolicy.sendRequest(request.clone()); })
                .then(function (res) { return retry$1(policy, request, res, retryData, err); })
                .catch(function (err) { return retry$1(policy, request, operationResponse, retryData, err); });
        }
        else {
            if (err != undefined) {
                // If the operation failed in the end, return all errors instead of just the last one
                err = retryData.error;
                return Promise.reject(err);
            }
            return Promise.resolve(operationResponse);
        }
    }

    // Copyright (c) Microsoft Corporation.
    // Licensed under the MIT License.
    /**
     * The format that will be used to join an array of values together for a query parameter value.
     */
    var QueryCollectionFormat;
    (function (QueryCollectionFormat) {
        QueryCollectionFormat["Csv"] = ",";
        QueryCollectionFormat["Ssv"] = " ";
        QueryCollectionFormat["Tsv"] = "\t";
        QueryCollectionFormat["Pipes"] = "|";
        QueryCollectionFormat["Multi"] = "Multi";
    })(QueryCollectionFormat || (QueryCollectionFormat = {}));

    // Copyright (c) Microsoft Corporation.
    var StatusCodes = Constants.HttpConstants.StatusCodes;
    function throttlingRetryPolicy() {
        return {
            create: function (nextPolicy, options) {
                return new ThrottlingRetryPolicy(nextPolicy, options);
            }
        };
    }
    /**
     * To learn more, please refer to
     * https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-manager-request-limits,
     * https://docs.microsoft.com/en-us/azure/azure-subscription-service-limits and
     * https://docs.microsoft.com/en-us/azure/virtual-machines/troubleshooting/troubleshooting-throttling-errors
     */
    var ThrottlingRetryPolicy = /** @class */ (function (_super) {
        __extends(ThrottlingRetryPolicy, _super);
        function ThrottlingRetryPolicy(nextPolicy, options, _handleResponse) {
            var _this = _super.call(this, nextPolicy, options) || this;
            _this._handleResponse = _handleResponse || _this._defaultResponseHandler;
            return _this;
        }
        ThrottlingRetryPolicy.prototype.sendRequest = function (httpRequest) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, this._nextPolicy.sendRequest(httpRequest.clone()).then(function (response) {
                            if (response.status !== StatusCodes.TooManyRequests) {
                                return response;
                            }
                            else {
                                return _this._handleResponse(httpRequest, response);
                            }
                        })];
                });
            });
        };
        ThrottlingRetryPolicy.prototype._defaultResponseHandler = function (httpRequest, httpResponse) {
            return __awaiter(this, void 0, void 0, function () {
                var retryAfterHeader, delayInMs;
                var _this = this;
                return __generator(this, function (_a) {
                    retryAfterHeader = httpResponse.headers.get(Constants.HeaderConstants.RETRY_AFTER);
                    if (retryAfterHeader) {
                        delayInMs = ThrottlingRetryPolicy.parseRetryAfterHeader(retryAfterHeader);
                        if (delayInMs) {
                            return [2 /*return*/, delay(delayInMs).then(function (_) { return _this._nextPolicy.sendRequest(httpRequest); })];
                        }
                    }
                    return [2 /*return*/, httpResponse];
                });
            });
        };
        ThrottlingRetryPolicy.parseRetryAfterHeader = function (headerValue) {
            var retryAfterInSeconds = Number(headerValue);
            if (Number.isNaN(retryAfterInSeconds)) {
                return ThrottlingRetryPolicy.parseDateRetryAfterHeader(headerValue);
            }
            else {
                return retryAfterInSeconds * 1000;
            }
        };
        ThrottlingRetryPolicy.parseDateRetryAfterHeader = function (headerValue) {
            try {
                var now = Date.now();
                var date = Date.parse(headerValue);
                var diff = date - now;
                return Number.isNaN(diff) ? undefined : diff;
            }
            catch (error) {
                return undefined;
            }
        };
        return ThrottlingRetryPolicy;
    }(BaseRequestPolicy));

    // Copyright (c) Microsoft Corporation.
    function signingPolicy(authenticationProvider) {
        return {
            create: function (nextPolicy, options) {
                return new SigningPolicy(nextPolicy, options, authenticationProvider);
            }
        };
    }
    var SigningPolicy = /** @class */ (function (_super) {
        __extends(SigningPolicy, _super);
        function SigningPolicy(nextPolicy, options, authenticationProvider) {
            var _this = _super.call(this, nextPolicy, options) || this;
            _this.authenticationProvider = authenticationProvider;
            return _this;
        }
        SigningPolicy.prototype.signRequest = function (request) {
            return this.authenticationProvider.signRequest(request);
        };
        SigningPolicy.prototype.sendRequest = function (request) {
            var _this = this;
            return this.signRequest(request).then(function (nextRequest) {
                return _this._nextPolicy.sendRequest(nextRequest);
            });
        };
        return SigningPolicy;
    }(BaseRequestPolicy));

    // Copyright (c) Microsoft Corporation.
    var DefaultKeepAliveOptions = {
        enable: true
    };
    function keepAlivePolicy(keepAliveOptions) {
        return {
            create: function (nextPolicy, options) {
                return new KeepAlivePolicy(nextPolicy, options, keepAliveOptions || DefaultKeepAliveOptions);
            }
        };
    }
    /**
     * KeepAlivePolicy is a policy used to control keep alive settings for every request.
     */
    var KeepAlivePolicy = /** @class */ (function (_super) {
        __extends(KeepAlivePolicy, _super);
        /**
         * Creates an instance of KeepAlivePolicy.
         *
         * @param {RequestPolicy} nextPolicy
         * @param {RequestPolicyOptions} options
         * @param {KeepAliveOptions} [keepAliveOptions]
         */
        function KeepAlivePolicy(nextPolicy, options, keepAliveOptions) {
            var _this = _super.call(this, nextPolicy, options) || this;
            _this.keepAliveOptions = keepAliveOptions;
            return _this;
        }
        /**
         * Sends out request.
         *
         * @param {WebResource} request
         * @returns {Promise<HttpOperationResponse>}
         * @memberof KeepAlivePolicy
         */
        KeepAlivePolicy.prototype.sendRequest = function (request) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    request.keepAlive = this.keepAliveOptions.enable;
                    return [2 /*return*/, this._nextPolicy.sendRequest(request)];
                });
            });
        };
        return KeepAlivePolicy;
    }(BaseRequestPolicy));

    /**
     * A no-op implementation of Span that can safely be used without side-effects.
     */
    var NoOpSpan = /** @class */ (function () {
        function NoOpSpan() {
        }
        /**
         * Returns the SpanContext associated with this Span.
         */
        NoOpSpan.prototype.context = function () {
            return {
                spanId: "",
                traceId: ""
            };
        };
        /**
         * Marks the end of Span execution.
         * @param _endTime The time to use as the Span's end time. Defaults to
         * the current time.
         */
        NoOpSpan.prototype.end = function (_endTime) {
            /* Noop */
        };
        /**
         * Sets an attribute on the Span
         * @param _key the attribute key
         * @param _value the attribute value
         */
        NoOpSpan.prototype.setAttribute = function (_key, _value) {
            return this;
        };
        /**
         * Sets attributes on the Span
         * @param _attributes the attributes to add
         */
        NoOpSpan.prototype.setAttributes = function (_attributes) {
            return this;
        };
        /**
         * Adds an event to the Span
         * @param _name The name of the event
         * @param _attributes The associated attributes to add for this event
         */
        NoOpSpan.prototype.addEvent = function (_name, _attributes) {
            return this;
        };
        /**
         * Sets a status on the span. Overrides the default of CanonicalCode.OK.
         * @param _status The status to set.
         */
        NoOpSpan.prototype.setStatus = function (_status) {
            return this;
        };
        /**
         * Updates the name of the Span
         * @param _name the new Span name
         */
        NoOpSpan.prototype.updateName = function (_name) {
            return this;
        };
        /**
         * Returns whether this span will be recorded
         */
        NoOpSpan.prototype.isRecording = function () {
            return false;
        };
        return NoOpSpan;
    }());

    // Copyright (c) Microsoft Corporation. All rights reserved.
    // Licensed under the MIT License.
    /**
     * A no-op implementation of BinaryFormat to be used when tracing is disabled.
     */
    var NoOpBinaryFormat = /** @class */ (function () {
        function NoOpBinaryFormat() {
        }
        /** Serialize the given SpanContext to a buffer */
        NoOpBinaryFormat.prototype.toBytes = function (_spanContext) {
            return new ArrayBuffer(0);
        };
        /**
         * Deserialize a SpanContext from binary encoding.
         * Returns null if the buffer does not contain a valid SpanContext.
         */
        NoOpBinaryFormat.prototype.fromBytes = function (_buffer) {
            return null;
        };
        return NoOpBinaryFormat;
    }());

    // Copyright (c) Microsoft Corporation. All rights reserved.
    // Licensed under the MIT License.
    /**
     * A no-op implementation of HttpTextFormat to be used when tracing is disabled.
     */
    var NoOpHttpTextFormat = /** @class */ (function () {
        function NoOpHttpTextFormat() {
        }
        /**
         * Injects the given SpanContext for transmitting to a remote server.
         * @param _spanContext The SpanContext to transmit
         * @param _format The format of the carrier
         * @param _carrier The carrier to propagate through, e.g. an HTTP request
         */
        NoOpHttpTextFormat.prototype.inject = function (_spanContext, _format, _carrier) { };
        /**
         * Returns a SpanContext intance extracted from the carrier.
         * @param _format the format of the carrier
         * @param _carrier The carrier being used for propagation, e.g. an HTTP request
         */
        NoOpHttpTextFormat.prototype.extract = function (_format, _carrier) {
            return null;
        };
        return NoOpHttpTextFormat;
    }());

    // Copyright (c) Microsoft Corporation. All rights reserved.
    /**
     * A no-op implementation of Tracer that can be used when tracing
     * is disabled.
     */
    var NoOpTracer = /** @class */ (function () {
        function NoOpTracer() {
        }
        /**
         * Starts a new Span.
         * @param _name The name of the span.
         * @param _options The SpanOptions used during Span creation.
         */
        NoOpTracer.prototype.startSpan = function (_name, _options) {
            return new NoOpSpan();
        };
        /**
         * Returns the current Span from the current context, if available.
         */
        NoOpTracer.prototype.getCurrentSpan = function () {
            return new NoOpSpan();
        };
        /**
         * Executes the given function within the context provided by a Span.
         * @param _span The span that provides the context.
         * @param fn The function to be executed.
         */
        NoOpTracer.prototype.withSpan = function (_span, fn) {
            return fn();
        };
        /**
         * Bind a Span as the target's scope
         * @param target An object to bind the scope.
         * @param _span A specific Span to use. Otherwise, use the current one.
         */
        NoOpTracer.prototype.bind = function (target, _span) {
            return target;
        };
        /**
         * Send a pre-populated Span object to the exporter.
         * @param _span The span to pass along.
         */
        NoOpTracer.prototype.recordSpanData = function (_span) {
            /* NOOP */
        };
        /**
         * Returns the BinaryFormat interface for serializing/deserializing Spans.
         */
        NoOpTracer.prototype.getBinaryFormat = function () {
            return new NoOpBinaryFormat();
        };
        /**
         * Returns the HttpTextFormat interface for injecting/extracting Spans.
         */
        NoOpTracer.prototype.getHttpTextFormat = function () {
            return new NoOpHttpTextFormat();
        };
        return NoOpTracer;
    }());

    // Copyright (c) Microsoft Corporation. All rights reserved.
    // Licensed under the MIT License.
    function getGlobalObject() {
        return self;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    var GLOBAL_TRACER_VERSION = 2;
    // preview5 shipped with @azure/core-tracing.tracerCache
    // and didn't have smart detection for collisions
    var GLOBAL_TRACER_SYMBOL = Symbol.for("@azure/core-tracing.tracerCache2");
    var cache;
    function loadTracerCache() {
        var globalObj = getGlobalObject();
        var existingCache = globalObj[GLOBAL_TRACER_SYMBOL];
        var setGlobalCache = true;
        if (existingCache) {
            if (existingCache.version === GLOBAL_TRACER_VERSION) {
                cache = existingCache;
            }
            else {
                setGlobalCache = false;
                if (existingCache.tracer) {
                    throw new Error("Two incompatible versions of @azure/core-tracing have been loaded.\n          This library is " + GLOBAL_TRACER_VERSION + ", existing is " + existingCache.version + ".");
                }
            }
        }
        if (!cache) {
            cache = {
                tracer: undefined,
                version: GLOBAL_TRACER_VERSION
            };
        }
        if (setGlobalCache) {
            globalObj[GLOBAL_TRACER_SYMBOL] = cache;
        }
    }
    function getCache() {
        if (!cache) {
            loadTracerCache();
        }
        return cache;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    var defaultTracer;
    function getDefaultTracer() {
        if (!defaultTracer) {
            defaultTracer = new NoOpTracer();
        }
        return defaultTracer;
    }
    /**
     * Retrieves the active tracer, or returns a
     * no-op implementation if one is not set.
     */
    function getTracer() {
        var cache = getCache();
        if (!cache.tracer) {
            return getDefaultTracer();
        }
        return cache.tracer;
    }

    var EntryValue = createCommonjsModule(function (module, exports) {
    /*!
     * Copyright 2019, OpenTelemetry Authors
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      https://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * EntryTtl is an integer that represents number of hops an entry can propagate.
     *
     * For now, ONLY special values (0 and -1) are supported.
     */
    var EntryTtl;
    (function (EntryTtl) {
        /**
         * NO_PROPAGATION is considered to have local scope and is used within the
         * process it created.
         */
        EntryTtl[EntryTtl["NO_PROPAGATION"] = 0] = "NO_PROPAGATION";
        /** UNLIMITED_PROPAGATION can propagate unlimited hops. */
        EntryTtl[EntryTtl["UNLIMITED_PROPAGATION"] = -1] = "UNLIMITED_PROPAGATION";
    })(EntryTtl = exports.EntryTtl || (exports.EntryTtl = {}));

    });

    unwrapExports(EntryValue);
    var EntryValue_1 = EntryValue.EntryTtl;

    var Metric = createCommonjsModule(function (module, exports) {
    /*!
     * Copyright 2019, OpenTelemetry Authors
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      https://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    Object.defineProperty(exports, "__esModule", { value: true });
    /** The Type of value. It describes how the data is reported. */
    var ValueType;
    (function (ValueType) {
        ValueType[ValueType["INT"] = 0] = "INT";
        ValueType[ValueType["DOUBLE"] = 1] = "DOUBLE";
    })(ValueType = exports.ValueType || (exports.ValueType = {}));

    });

    unwrapExports(Metric);
    var Metric_1 = Metric.ValueType;

    var span_kind = createCommonjsModule(function (module, exports) {
    /*!
     * Copyright 2019, OpenTelemetry Authors
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      https://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Type of span. Can be used to specify additional relationships between spans
     * in addition to a parent/child relationship.
     */
    var SpanKind;
    (function (SpanKind) {
        /** Default value. Indicates that the span is used internally. */
        SpanKind[SpanKind["INTERNAL"] = 0] = "INTERNAL";
        /**
         * Indicates that the span covers server-side handling of an RPC or other
         * remote request.
         */
        SpanKind[SpanKind["SERVER"] = 1] = "SERVER";
        /**
         * Indicates that the span covers the client-side wrapper around an RPC or
         * other remote request.
         */
        SpanKind[SpanKind["CLIENT"] = 2] = "CLIENT";
        /**
         * Indicates that the span describes producer sending a message to a
         * broker. Unlike client and server, there is no direct critical path latency
         * relationship between producer and consumer spans.
         */
        SpanKind[SpanKind["PRODUCER"] = 3] = "PRODUCER";
        /**
         * Indicates that the span describes consumer receiving a message from a
         * broker. Unlike client and server, there is no direct critical path latency
         * relationship between producer and consumer spans.
         */
        SpanKind[SpanKind["CONSUMER"] = 4] = "CONSUMER";
    })(SpanKind = exports.SpanKind || (exports.SpanKind = {}));

    });

    unwrapExports(span_kind);
    var span_kind_1 = span_kind.SpanKind;

    var status = createCommonjsModule(function (module, exports) {
    /*!
     * Copyright 2019, OpenTelemetry Authors
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      https://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * An enumeration of canonical status codes.
     */
    var CanonicalCode;
    (function (CanonicalCode) {
        /**
         * Not an error; returned on success
         */
        CanonicalCode[CanonicalCode["OK"] = 0] = "OK";
        /**
         * The operation was cancelled (typically by the caller).
         */
        CanonicalCode[CanonicalCode["CANCELLED"] = 1] = "CANCELLED";
        /**
         * Unknown error.  An example of where this error may be returned is
         * if a status value received from another address space belongs to
         * an error-space that is not known in this address space.  Also
         * errors raised by APIs that do not return enough error information
         * may be converted to this error.
         */
        CanonicalCode[CanonicalCode["UNKNOWN"] = 2] = "UNKNOWN";
        /**
         * Client specified an invalid argument.  Note that this differs
         * from FAILED_PRECONDITION.  INVALID_ARGUMENT indicates arguments
         * that are problematic regardless of the state of the system
         * (e.g., a malformed file name).
         */
        CanonicalCode[CanonicalCode["INVALID_ARGUMENT"] = 3] = "INVALID_ARGUMENT";
        /**
         * Deadline expired before operation could complete.  For operations
         * that change the state of the system, this error may be returned
         * even if the operation has completed successfully.  For example, a
         * successful response from a server could have been delayed long
         * enough for the deadline to expire.
         */
        CanonicalCode[CanonicalCode["DEADLINE_EXCEEDED"] = 4] = "DEADLINE_EXCEEDED";
        /**
         * Some requested entity (e.g., file or directory) was not found.
         */
        CanonicalCode[CanonicalCode["NOT_FOUND"] = 5] = "NOT_FOUND";
        /**
         * Some entity that we attempted to create (e.g., file or directory)
         * already exists.
         */
        CanonicalCode[CanonicalCode["ALREADY_EXISTS"] = 6] = "ALREADY_EXISTS";
        /**
         * The caller does not have permission to execute the specified
         * operation.  PERMISSION_DENIED must not be used for rejections
         * caused by exhausting some resource (use RESOURCE_EXHAUSTED
         * instead for those errors).  PERMISSION_DENIED must not be
         * used if the caller can not be identified (use UNAUTHENTICATED
         * instead for those errors).
         */
        CanonicalCode[CanonicalCode["PERMISSION_DENIED"] = 7] = "PERMISSION_DENIED";
        /**
         * Some resource has been exhausted, perhaps a per-user quota, or
         * perhaps the entire file system is out of space.
         */
        CanonicalCode[CanonicalCode["RESOURCE_EXHAUSTED"] = 8] = "RESOURCE_EXHAUSTED";
        /**
         * Operation was rejected because the system is not in a state
         * required for the operation's execution.  For example, directory
         * to be deleted may be non-empty, an rmdir operation is applied to
         * a non-directory, etc.
         *
         * A litmus test that may help a service implementor in deciding
         * between FAILED_PRECONDITION, ABORTED, and UNAVAILABLE:
         *
         *  - Use UNAVAILABLE if the client can retry just the failing call.
         *  - Use ABORTED if the client should retry at a higher-level
         *    (e.g., restarting a read-modify-write sequence).
         *  - Use FAILED_PRECONDITION if the client should not retry until
         *    the system state has been explicitly fixed.  E.g., if an "rmdir"
         *    fails because the directory is non-empty, FAILED_PRECONDITION
         *    should be returned since the client should not retry unless
         *    they have first fixed up the directory by deleting files from it.
         *  - Use FAILED_PRECONDITION if the client performs conditional
         *    REST Get/Update/Delete on a resource and the resource on the
         *    server does not match the condition. E.g., conflicting
         *    read-modify-write on the same resource.
         */
        CanonicalCode[CanonicalCode["FAILED_PRECONDITION"] = 9] = "FAILED_PRECONDITION";
        /**
         * The operation was aborted, typically due to a concurrency issue
         * like sequencer check failures, transaction aborts, etc.
         *
         * See litmus test above for deciding between FAILED_PRECONDITION,
         * ABORTED, and UNAVAILABLE.
         */
        CanonicalCode[CanonicalCode["ABORTED"] = 10] = "ABORTED";
        /**
         * Operation was attempted past the valid range.  E.g., seeking or
         * reading past end of file.
         *
         * Unlike INVALID_ARGUMENT, this error indicates a problem that may
         * be fixed if the system state changes. For example, a 32-bit file
         * system will generate INVALID_ARGUMENT if asked to read at an
         * offset that is not in the range [0,2^32-1], but it will generate
         * OUT_OF_RANGE if asked to read from an offset past the current
         * file size.
         *
         * There is a fair bit of overlap between FAILED_PRECONDITION and
         * OUT_OF_RANGE.  We recommend using OUT_OF_RANGE (the more specific
         * error) when it applies so that callers who are iterating through
         * a space can easily look for an OUT_OF_RANGE error to detect when
         * they are done.
         */
        CanonicalCode[CanonicalCode["OUT_OF_RANGE"] = 11] = "OUT_OF_RANGE";
        /**
         * Operation is not implemented or not supported/enabled in this service.
         */
        CanonicalCode[CanonicalCode["UNIMPLEMENTED"] = 12] = "UNIMPLEMENTED";
        /**
         * Internal errors.  Means some invariants expected by underlying
         * system has been broken.  If you see one of these errors,
         * something is very broken.
         */
        CanonicalCode[CanonicalCode["INTERNAL"] = 13] = "INTERNAL";
        /**
         * The service is currently unavailable.  This is a most likely a
         * transient condition and may be corrected by retrying with
         * a backoff.
         *
         * See litmus test above for deciding between FAILED_PRECONDITION,
         * ABORTED, and UNAVAILABLE.
         */
        CanonicalCode[CanonicalCode["UNAVAILABLE"] = 14] = "UNAVAILABLE";
        /**
         * Unrecoverable data loss or corruption.
         */
        CanonicalCode[CanonicalCode["DATA_LOSS"] = 15] = "DATA_LOSS";
        /**
         * The request does not have valid authentication credentials for the
         * operation.
         */
        CanonicalCode[CanonicalCode["UNAUTHENTICATED"] = 16] = "UNAUTHENTICATED";
    })(CanonicalCode = exports.CanonicalCode || (exports.CanonicalCode = {}));

    });

    unwrapExports(status);
    var status_1 = status.CanonicalCode;

    var trace_flags = createCommonjsModule(function (module, exports) {
    /*!
     * Copyright 2019, OpenTelemetry Authors
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      https://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * An enumeration that represents global trace flags. These flags are
     * propagated to all child {@link Span}. These determine features such as
     * whether a Span should be traced. It is implemented as a bitmask.
     */
    var TraceFlags;
    (function (TraceFlags) {
        /** Bit to represent whether trace is unsampled in trace flags. */
        TraceFlags[TraceFlags["UNSAMPLED"] = 0] = "UNSAMPLED";
        /** Bit to represent whether trace is sampled in trace flags. */
        TraceFlags[TraceFlags["SAMPLED"] = 1] = "SAMPLED";
    })(TraceFlags = exports.TraceFlags || (exports.TraceFlags = {}));

    });

    unwrapExports(trace_flags);
    var trace_flags_1 = trace_flags.TraceFlags;

    var src = createCommonjsModule(function (module, exports) {
    /*!
     * Copyright 2019, OpenTelemetry Authors
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      https://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(EntryValue);
    __export(Metric);
    __export(span_kind);
    __export(status);
    __export(trace_flags);

    });

    unwrapExports(src);
    var src_1 = src.CanonicalCode;
    var src_2 = src.SpanKind;
    var src_3 = src.TraceFlags;

    // Copyright (c) Microsoft Corporation. All rights reserved.
    var VERSION = "00";
    /**
     * Generates a `traceparent` value given a span context.
     * @param spanContext Contains context for a specific span.
     * @returns The `spanContext` represented as a `traceparent` value.
     */
    function getTraceParentHeader(spanContext) {
        var missingFields = [];
        if (!spanContext.traceId) {
            missingFields.push("traceId");
        }
        if (!spanContext.spanId) {
            missingFields.push("spanId");
        }
        if (missingFields.length) {
            return;
        }
        var flags = spanContext.traceFlags || src_3.UNSAMPLED;
        var hexFlags = flags.toString(16);
        var traceFlags = hexFlags.length === 1 ? "0" + hexFlags : hexFlags;
        // https://www.w3.org/TR/trace-context/#traceparent-header-field-values
        return VERSION + "-" + spanContext.traceId + "-" + spanContext.spanId + "-" + traceFlags;
    }

    // Copyright (c) Microsoft Corporation. All rights reserved.
    function tracingPolicy(tracingOptions) {
        if (tracingOptions === void 0) { tracingOptions = {}; }
        return {
            create: function (nextPolicy, options) {
                return new TracingPolicy(nextPolicy, options, tracingOptions);
            }
        };
    }
    var TracingPolicy = /** @class */ (function (_super) {
        __extends(TracingPolicy, _super);
        function TracingPolicy(nextPolicy, options, tracingOptions) {
            var _this = _super.call(this, nextPolicy, options) || this;
            _this.userAgent = tracingOptions.userAgent;
            return _this;
        }
        TracingPolicy.prototype.sendRequest = function (request) {
            return __awaiter(this, void 0, void 0, function () {
                var tracer, spanOptions, path, span, spanContext, traceParentHeader, traceState, response, serviceRequestId, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!request.spanOptions || !request.spanOptions.parent) {
                                return [2 /*return*/, this._nextPolicy.sendRequest(request)];
                            }
                            tracer = getTracer();
                            spanOptions = __assign(__assign({}, request.spanOptions), { kind: src_2.CLIENT });
                            path = URLBuilder.parse(request.url).getPath() || "/";
                            span = tracer.startSpan(path, spanOptions);
                            span.setAttributes({
                                "http.method": request.method,
                                "http.url": request.url,
                                requestId: request.requestId
                            });
                            if (this.userAgent) {
                                span.setAttribute("http.user_agent", this.userAgent);
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            spanContext = span.context();
                            traceParentHeader = getTraceParentHeader(spanContext);
                            if (traceParentHeader) {
                                request.headers.set("traceparent", traceParentHeader);
                                traceState = spanContext.traceState && spanContext.traceState.serialize();
                                // if tracestate is set, traceparent MUST be set, so only set tracestate after traceparent
                                if (traceState) {
                                    request.headers.set("tracestate", traceState);
                                }
                            }
                            return [4 /*yield*/, this._nextPolicy.sendRequest(request)];
                        case 2:
                            response = _a.sent();
                            span.setAttribute("http.status_code", response.status);
                            serviceRequestId = response.headers.get("x-ms-request-id");
                            if (serviceRequestId) {
                                span.setAttribute("serviceRequestId", serviceRequestId);
                            }
                            span.end();
                            return [2 /*return*/, response];
                        case 3:
                            err_1 = _a.sent();
                            span.end();
                            throw err_1;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        return TracingPolicy;
    }(BaseRequestPolicy));

    // Copyright (c) Microsoft Corporation.
    /**
     * @class
     * Initializes a new instance of the ServiceClient.
     */
    var ServiceClient = /** @class */ (function () {
        /**
         * The ServiceClient constructor
         * @constructor
         * @param credentials The credentials used for authentication with the service.
         * @param options The service client options that govern the behavior of the client.
         */
        function ServiceClient(credentials, options) {
            var _this = this;
            if (!options) {
                options = {};
            }
            this._withCredentials = options.withCredentials || false;
            this._httpClient = options.httpClient || new XhrHttpClient();
            this._requestPolicyOptions = new RequestPolicyOptions(options.httpPipelineLogger);
            var requestPolicyFactories;
            if (Array.isArray(options.requestPolicyFactories)) {
                logger.info("ServiceClient: using custom request policies");
                requestPolicyFactories = options.requestPolicyFactories;
            }
            else {
                var authPolicyFactory = undefined;
                if (isTokenCredential(credentials)) {
                    logger.info("ServiceClient: creating bearer token authentication policy from provided credentials");
                    // Create a wrapped RequestPolicyFactory here so that we can provide the
                    // correct scope to the BearerTokenAuthenticationPolicy at the first time
                    // one is requested.  This is needed because generated ServiceClient
                    // implementations do not set baseUri until after ServiceClient's constructor
                    // is finished, leaving baseUri empty at the time when it is needed to
                    // build the correct scope name.
                    var wrappedPolicyFactory = function () {
                        var bearerTokenPolicyFactory = undefined;
                        var serviceClient = _this;
                        return {
                            create: function (nextPolicy, options) {
                                if (bearerTokenPolicyFactory === undefined) {
                                    bearerTokenPolicyFactory = bearerTokenAuthenticationPolicy(credentials, (serviceClient.baseUri || "") + "/.default");
                                }
                                return bearerTokenPolicyFactory.create(nextPolicy, options);
                            }
                        };
                    };
                    authPolicyFactory = wrappedPolicyFactory();
                }
                else if (credentials && typeof credentials.signRequest === "function") {
                    logger.info("ServiceClient: creating signing policy from provided credentials");
                    authPolicyFactory = signingPolicy(credentials);
                }
                else if (credentials !== undefined) {
                    throw new Error("The credentials argument must implement the TokenCredential interface");
                }
                logger.info("ServiceClient: using default request policies");
                requestPolicyFactories = createDefaultRequestPolicyFactories(authPolicyFactory, options);
                if (options.requestPolicyFactories) {
                    // options.requestPolicyFactories can also be a function that manipulates
                    // the default requestPolicyFactories array
                    var newRequestPolicyFactories = options.requestPolicyFactories(requestPolicyFactories);
                    if (newRequestPolicyFactories) {
                        requestPolicyFactories = newRequestPolicyFactories;
                    }
                }
            }
            this._requestPolicyFactories = requestPolicyFactories;
        }
        /**
         * Send the provided httpRequest.
         */
        ServiceClient.prototype.sendRequest = function (options) {
            if (options === null || options === undefined || typeof options !== "object") {
                throw new Error("options cannot be null or undefined and it must be of type object.");
            }
            var httpRequest;
            try {
                if (options instanceof WebResource) {
                    options.validateRequestProperties();
                    httpRequest = options;
                }
                else {
                    httpRequest = new WebResource();
                    httpRequest = httpRequest.prepare(options);
                }
            }
            catch (error) {
                return Promise.reject(error);
            }
            var httpPipeline = this._httpClient;
            if (this._requestPolicyFactories && this._requestPolicyFactories.length > 0) {
                for (var i = this._requestPolicyFactories.length - 1; i >= 0; --i) {
                    httpPipeline = this._requestPolicyFactories[i].create(httpPipeline, this._requestPolicyOptions);
                }
            }
            return httpPipeline.sendRequest(httpRequest);
        };
        /**
         * Send an HTTP request that is populated using the provided OperationSpec.
         * @param {OperationArguments} operationArguments The arguments that the HTTP request's templated values will be populated from.
         * @param {OperationSpec} operationSpec The OperationSpec to use to populate the httpRequest.
         * @param {ServiceCallback} callback The callback to call when the response is received.
         */
        ServiceClient.prototype.sendOperationRequest = function (operationArguments, operationSpec, callback) {
            return __awaiter(this, void 0, void 0, function () {
                var httpRequest, result, baseUri, requestUrl, _i, _a, urlParameter, urlParameterValue, _b, _c, queryParameter, queryParameterValue, index, item, index, contentType, _d, _e, headerParameter, headerValue, headerCollectionPrefix, _f, _g, key, options, customHeaderName, rawResponse, sendRequestError, error_1, error_2, cb;
                return __generator(this, function (_h) {
                    switch (_h.label) {
                        case 0:
                            if (typeof operationArguments.options === "function") {
                                callback = operationArguments.options;
                                operationArguments.options = undefined;
                            }
                            httpRequest = new WebResource();
                            _h.label = 1;
                        case 1:
                            _h.trys.push([1, 6, , 7]);
                            baseUri = operationSpec.baseUrl || this.baseUri;
                            if (!baseUri) {
                                throw new Error("If operationSpec.baseUrl is not specified, then the ServiceClient must have a baseUri string property that contains the base URL to use.");
                            }
                            httpRequest.method = operationSpec.httpMethod;
                            httpRequest.operationSpec = operationSpec;
                            requestUrl = URLBuilder.parse(baseUri);
                            if (operationSpec.path) {
                                requestUrl.appendPath(operationSpec.path);
                            }
                            if (operationSpec.urlParameters && operationSpec.urlParameters.length > 0) {
                                for (_i = 0, _a = operationSpec.urlParameters; _i < _a.length; _i++) {
                                    urlParameter = _a[_i];
                                    urlParameterValue = getOperationArgumentValueFromParameter(this, operationArguments, urlParameter, operationSpec.serializer);
                                    urlParameterValue = operationSpec.serializer.serialize(urlParameter.mapper, urlParameterValue, getPathStringFromParameter(urlParameter));
                                    if (!urlParameter.skipEncoding) {
                                        urlParameterValue = encodeURIComponent(urlParameterValue);
                                    }
                                    requestUrl.replaceAll("{" + (urlParameter.mapper.serializedName || getPathStringFromParameter(urlParameter)) + "}", urlParameterValue);
                                }
                            }
                            if (operationSpec.queryParameters && operationSpec.queryParameters.length > 0) {
                                for (_b = 0, _c = operationSpec.queryParameters; _b < _c.length; _b++) {
                                    queryParameter = _c[_b];
                                    queryParameterValue = getOperationArgumentValueFromParameter(this, operationArguments, queryParameter, operationSpec.serializer);
                                    if (queryParameterValue != undefined) {
                                        queryParameterValue = operationSpec.serializer.serialize(queryParameter.mapper, queryParameterValue, getPathStringFromParameter(queryParameter));
                                        if (queryParameter.collectionFormat != undefined) {
                                            if (queryParameter.collectionFormat === QueryCollectionFormat.Multi) {
                                                if (queryParameterValue.length === 0) {
                                                    queryParameterValue = "";
                                                }
                                                else {
                                                    for (index in queryParameterValue) {
                                                        item = queryParameterValue[index];
                                                        queryParameterValue[index] = item == undefined ? "" : item.toString();
                                                    }
                                                }
                                            }
                                            else {
                                                queryParameterValue = queryParameterValue.join(queryParameter.collectionFormat);
                                            }
                                        }
                                        if (!queryParameter.skipEncoding) {
                                            if (Array.isArray(queryParameterValue)) {
                                                for (index in queryParameterValue) {
                                                    queryParameterValue[index] = encodeURIComponent(queryParameterValue[index]);
                                                }
                                            }
                                            else {
                                                queryParameterValue = encodeURIComponent(queryParameterValue);
                                            }
                                        }
                                        requestUrl.setQueryParameter(queryParameter.mapper.serializedName || getPathStringFromParameter(queryParameter), queryParameterValue);
                                    }
                                }
                            }
                            httpRequest.url = requestUrl.toString();
                            contentType = operationSpec.contentType || this.requestContentType;
                            if (contentType) {
                                httpRequest.headers.set("Content-Type", contentType);
                            }
                            if (operationSpec.headerParameters) {
                                for (_d = 0, _e = operationSpec.headerParameters; _d < _e.length; _d++) {
                                    headerParameter = _e[_d];
                                    headerValue = getOperationArgumentValueFromParameter(this, operationArguments, headerParameter, operationSpec.serializer);
                                    if (headerValue != undefined) {
                                        headerValue = operationSpec.serializer.serialize(headerParameter.mapper, headerValue, getPathStringFromParameter(headerParameter));
                                        headerCollectionPrefix = headerParameter.mapper
                                            .headerCollectionPrefix;
                                        if (headerCollectionPrefix) {
                                            for (_f = 0, _g = Object.keys(headerValue); _f < _g.length; _f++) {
                                                key = _g[_f];
                                                httpRequest.headers.set(headerCollectionPrefix + key, headerValue[key]);
                                            }
                                        }
                                        else {
                                            httpRequest.headers.set(headerParameter.mapper.serializedName ||
                                                getPathStringFromParameter(headerParameter), headerValue);
                                        }
                                    }
                                }
                            }
                            options = operationArguments.options;
                            if (options) {
                                if (options.customHeaders) {
                                    for (customHeaderName in options.customHeaders) {
                                        httpRequest.headers.set(customHeaderName, options.customHeaders[customHeaderName]);
                                    }
                                }
                                if (options.abortSignal) {
                                    httpRequest.abortSignal = options.abortSignal;
                                }
                                if (options.timeout) {
                                    httpRequest.timeout = options.timeout;
                                }
                                if (options.onUploadProgress) {
                                    httpRequest.onUploadProgress = options.onUploadProgress;
                                }
                                if (options.onDownloadProgress) {
                                    httpRequest.onDownloadProgress = options.onDownloadProgress;
                                }
                                if (options.spanOptions) {
                                    httpRequest.spanOptions = options.spanOptions;
                                }
                            }
                            httpRequest.withCredentials = this._withCredentials;
                            serializeRequestBody(this, httpRequest, operationArguments, operationSpec);
                            if (httpRequest.streamResponseBody == undefined) {
                                httpRequest.streamResponseBody = isStreamOperation(operationSpec);
                            }
                            rawResponse = void 0;
                            sendRequestError = void 0;
                            _h.label = 2;
                        case 2:
                            _h.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, this.sendRequest(httpRequest)];
                        case 3:
                            rawResponse = _h.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            error_1 = _h.sent();
                            sendRequestError = error_1;
                            return [3 /*break*/, 5];
                        case 5:
                            if (sendRequestError) {
                                if (sendRequestError.response) {
                                    sendRequestError.details = flattenResponse(sendRequestError.response, operationSpec.responses[sendRequestError.statusCode] ||
                                        operationSpec.responses["default"]);
                                }
                                result = Promise.reject(sendRequestError);
                            }
                            else {
                                result = Promise.resolve(flattenResponse(rawResponse, operationSpec.responses[rawResponse.status]));
                            }
                            return [3 /*break*/, 7];
                        case 6:
                            error_2 = _h.sent();
                            result = Promise.reject(error_2);
                            return [3 /*break*/, 7];
                        case 7:
                            cb = callback;
                            if (cb) {
                                result
                                    // tslint:disable-next-line:no-null-keyword
                                    .then(function (res) { return cb(null, res._response.parsedBody, res._response.request, res._response); })
                                    .catch(function (err) { return cb(err); });
                            }
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        return ServiceClient;
    }());
    function serializeRequestBody(serviceClient, httpRequest, operationArguments, operationSpec) {
        if (operationSpec.requestBody && operationSpec.requestBody.mapper) {
            httpRequest.body = getOperationArgumentValueFromParameter(serviceClient, operationArguments, operationSpec.requestBody, operationSpec.serializer);
            var bodyMapper = operationSpec.requestBody.mapper;
            var required = bodyMapper.required, xmlName = bodyMapper.xmlName, xmlElementName = bodyMapper.xmlElementName, serializedName = bodyMapper.serializedName;
            var typeName = bodyMapper.type.name;
            try {
                if (httpRequest.body != undefined || required) {
                    var requestBodyParameterPathString = getPathStringFromParameter(operationSpec.requestBody);
                    httpRequest.body = operationSpec.serializer.serialize(bodyMapper, httpRequest.body, requestBodyParameterPathString);
                    var isStream = typeName === MapperType.Stream;
                    if (operationSpec.isXML) {
                        if (typeName === MapperType.Sequence) {
                            httpRequest.body = stringifyXML(prepareXMLRootList(httpRequest.body, xmlElementName || xmlName || serializedName), { rootName: xmlName || serializedName });
                        }
                        else if (!isStream) {
                            httpRequest.body = stringifyXML(httpRequest.body, {
                                rootName: xmlName || serializedName
                            });
                        }
                    }
                    else if (!isStream) {
                        httpRequest.body = JSON.stringify(httpRequest.body);
                    }
                }
            }
            catch (error) {
                throw new Error("Error \"" + error.message + "\" occurred in serializing the payload - " + JSON.stringify(serializedName, undefined, "  ") + ".");
            }
        }
        else if (operationSpec.formDataParameters && operationSpec.formDataParameters.length > 0) {
            httpRequest.formData = {};
            for (var _i = 0, _a = operationSpec.formDataParameters; _i < _a.length; _i++) {
                var formDataParameter = _a[_i];
                var formDataParameterValue = getOperationArgumentValueFromParameter(serviceClient, operationArguments, formDataParameter, operationSpec.serializer);
                if (formDataParameterValue != undefined) {
                    var formDataParameterPropertyName = formDataParameter.mapper.serializedName || getPathStringFromParameter(formDataParameter);
                    httpRequest.formData[formDataParameterPropertyName] = operationSpec.serializer.serialize(formDataParameter.mapper, formDataParameterValue, getPathStringFromParameter(formDataParameter));
                }
            }
        }
    }
    function getValueOrFunctionResult(value, defaultValueCreator) {
        var result;
        if (typeof value === "string") {
            result = value;
        }
        else {
            result = defaultValueCreator();
            if (typeof value === "function") {
                result = value(result);
            }
        }
        return result;
    }
    function createDefaultRequestPolicyFactories(authPolicyFactory, options) {
        var factories = [];
        if (options.generateClientRequestIdHeader) {
            factories.push(generateClientRequestIdPolicy(options.clientRequestIdHeaderName));
        }
        if (authPolicyFactory) {
            factories.push(authPolicyFactory);
        }
        var userAgentHeaderName = getValueOrFunctionResult(options.userAgentHeaderName, getDefaultUserAgentHeaderName);
        var userAgentHeaderValue = getValueOrFunctionResult(options.userAgent, getDefaultUserAgentValue);
        if (userAgentHeaderName && userAgentHeaderValue) {
            factories.push(userAgentPolicy({ key: userAgentHeaderName, value: userAgentHeaderValue }));
        }
        factories.push(redirectPolicy());
        factories.push(rpRegistrationPolicy(options.rpRegistrationRetryTimeout));
        if (!options.noRetryPolicy) {
            factories.push(exponentialRetryPolicy());
            factories.push(systemErrorRetryPolicy());
            factories.push(throttlingRetryPolicy());
        }
        factories.push(deserializationPolicy(options.deserializationContentTypes));
        factories.push(logPolicy({ logger: logger.info }));
        return factories;
    }
    function createPipelineFromOptions(pipelineOptions, authPolicyFactory) {
        var requestPolicyFactories = [];
        var userAgentValue = undefined;
        if (pipelineOptions.userAgentOptions && pipelineOptions.userAgentOptions.userAgentPrefix) {
            var userAgentInfo = [];
            userAgentInfo.push(pipelineOptions.userAgentOptions.userAgentPrefix);
            // Add the default user agent value if it isn't already specified
            // by the userAgentPrefix option.
            var defaultUserAgentInfo = getDefaultUserAgentValue();
            if (userAgentInfo.indexOf(defaultUserAgentInfo) === -1) {
                userAgentInfo.push(defaultUserAgentInfo);
            }
            userAgentValue = userAgentInfo.join(" ");
        }
        var keepAliveOptions = __assign(__assign({}, DefaultKeepAliveOptions), pipelineOptions.keepAliveOptions);
        var retryOptions = __assign(__assign({}, DefaultRetryOptions), pipelineOptions.retryOptions);
        var redirectOptions = __assign(__assign({}, DefaultRedirectOptions), pipelineOptions.redirectOptions);
        var deserializationOptions = __assign(__assign({}, DefaultDeserializationOptions), pipelineOptions.deserializationOptions);
        var loggingOptions = __assign({}, pipelineOptions.loggingOptions);
        requestPolicyFactories.push(tracingPolicy({ userAgent: userAgentValue }), keepAlivePolicy(keepAliveOptions), userAgentPolicy({ value: userAgentValue }), generateClientRequestIdPolicy(), deserializationPolicy(deserializationOptions.expectedContentTypes), throttlingRetryPolicy(), systemErrorRetryPolicy(), exponentialRetryPolicy(retryOptions.maxRetries, retryOptions.retryDelayInMs, retryOptions.maxRetryDelayInMs));
        if (redirectOptions.handleRedirects) {
            requestPolicyFactories.push(redirectPolicy(redirectOptions.maxRetries));
        }
        if (authPolicyFactory) {
            requestPolicyFactories.push(authPolicyFactory);
        }
        requestPolicyFactories.push(logPolicy(loggingOptions));
        return {
            httpClient: pipelineOptions.httpClient,
            requestPolicyFactories: requestPolicyFactories
        };
    }
    function getOperationArgumentValueFromParameter(serviceClient, operationArguments, parameter, serializer) {
        return getOperationArgumentValueFromParameterPath(serviceClient, operationArguments, parameter.parameterPath, parameter.mapper, serializer);
    }
    function getOperationArgumentValueFromParameterPath(serviceClient, operationArguments, parameterPath, parameterMapper, serializer) {
        var value;
        if (typeof parameterPath === "string") {
            parameterPath = [parameterPath];
        }
        if (Array.isArray(parameterPath)) {
            if (parameterPath.length > 0) {
                if (parameterMapper.isConstant) {
                    value = parameterMapper.defaultValue;
                }
                else {
                    var propertySearchResult = getPropertyFromParameterPath(operationArguments, parameterPath);
                    if (!propertySearchResult.propertyFound) {
                        propertySearchResult = getPropertyFromParameterPath(serviceClient, parameterPath);
                    }
                    var useDefaultValue = false;
                    if (!propertySearchResult.propertyFound) {
                        useDefaultValue =
                            parameterMapper.required ||
                                (parameterPath[0] === "options" && parameterPath.length === 2);
                    }
                    value = useDefaultValue ? parameterMapper.defaultValue : propertySearchResult.propertyValue;
                }
                // Serialize just for validation purposes.
                var parameterPathString = getPathStringFromParameterPath(parameterPath, parameterMapper);
                serializer.serialize(parameterMapper, value, parameterPathString);
            }
        }
        else {
            if (parameterMapper.required) {
                value = {};
            }
            for (var propertyName in parameterPath) {
                var propertyMapper = parameterMapper.type.modelProperties[propertyName];
                var propertyPath = parameterPath[propertyName];
                var propertyValue = getOperationArgumentValueFromParameterPath(serviceClient, operationArguments, propertyPath, propertyMapper, serializer);
                // Serialize just for validation purposes.
                var propertyPathString = getPathStringFromParameterPath(propertyPath, propertyMapper);
                serializer.serialize(propertyMapper, propertyValue, propertyPathString);
                if (propertyValue !== undefined) {
                    if (!value) {
                        value = {};
                    }
                    value[propertyName] = propertyValue;
                }
            }
        }
        return value;
    }
    function getPropertyFromParameterPath(parent, parameterPath) {
        var result = { propertyFound: false };
        var i = 0;
        for (; i < parameterPath.length; ++i) {
            var parameterPathPart = parameterPath[i];
            // Make sure to check inherited properties too, so don't use hasOwnProperty().
            if (parent != undefined && parameterPathPart in parent) {
                parent = parent[parameterPathPart];
            }
            else {
                break;
            }
        }
        if (i === parameterPath.length) {
            result.propertyValue = parent;
            result.propertyFound = true;
        }
        return result;
    }
    function flattenResponse(_response, responseSpec) {
        var parsedHeaders = _response.parsedHeaders;
        var bodyMapper = responseSpec && responseSpec.bodyMapper;
        var addOperationResponse = function (obj) {
            return Object.defineProperty(obj, "_response", {
                value: _response
            });
        };
        if (bodyMapper) {
            var typeName = bodyMapper.type.name;
            if (typeName === "Stream") {
                return addOperationResponse(__assign(__assign({}, parsedHeaders), { blobBody: _response.blobBody, readableStreamBody: _response.readableStreamBody }));
            }
            var modelProperties_1 = (typeName === "Composite" && bodyMapper.type.modelProperties) || {};
            var isPageableResponse = Object.keys(modelProperties_1).some(function (k) { return modelProperties_1[k].serializedName === ""; });
            if (typeName === "Sequence" || isPageableResponse) {
                var arrayResponse = __spreadArrays((_response.parsedBody || []));
                for (var _i = 0, _a = Object.keys(modelProperties_1); _i < _a.length; _i++) {
                    var key = _a[_i];
                    if (modelProperties_1[key].serializedName) {
                        arrayResponse[key] = _response.parsedBody[key];
                    }
                }
                if (parsedHeaders) {
                    for (var _b = 0, _c = Object.keys(parsedHeaders); _b < _c.length; _b++) {
                        var key = _c[_b];
                        arrayResponse[key] = parsedHeaders[key];
                    }
                }
                addOperationResponse(arrayResponse);
                return arrayResponse;
            }
            if (typeName === "Composite" || typeName === "Dictionary") {
                return addOperationResponse(__assign(__assign({}, parsedHeaders), _response.parsedBody));
            }
        }
        if (bodyMapper ||
            _response.request.method === "HEAD" ||
            isPrimitiveType(_response.parsedBody)) {
            // primitive body types and HEAD booleans
            return addOperationResponse(__assign(__assign({}, parsedHeaders), { body: _response.parsedBody }));
        }
        return addOperationResponse(__assign(__assign({}, parsedHeaders), _response.parsedBody));
    }

    // Copyright (c) Microsoft Corporation.
    /**
     * The @azure/logger configuration for this package.
     */
    var logger$1 = createClientLogger("keyvault-secrets");

    if (typeof Symbol === undefined || !Symbol.asyncIterator) {
        Symbol.asyncIterator = Symbol.for("Symbol.asyncIterator");
    }

    var distEsm = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    });

    unwrapExports(distEsm);

    /*
     * Copyright (c) Microsoft Corporation. All rights reserved.
     * Licensed under the MIT License. See License.txt in the project root for license information.
     *
     * Code generated by Microsoft (R) AutoRest Code Generator.
     * Changes may cause incorrect behavior and will be lost if the code is regenerated.
     */
    var Attributes = {
        serializedName: "Attributes",
        type: {
            name: "Composite",
            className: "Attributes",
            modelProperties: {
                enabled: {
                    serializedName: "enabled",
                    type: {
                        name: "Boolean"
                    }
                },
                notBefore: {
                    serializedName: "nbf",
                    type: {
                        name: "UnixTime"
                    }
                },
                expires: {
                    serializedName: "exp",
                    type: {
                        name: "UnixTime"
                    }
                },
                created: {
                    readOnly: true,
                    serializedName: "created",
                    type: {
                        name: "UnixTime"
                    }
                },
                updated: {
                    readOnly: true,
                    serializedName: "updated",
                    type: {
                        name: "UnixTime"
                    }
                }
            }
        }
    };
    var JsonWebKey = {
        serializedName: "JsonWebKey",
        type: {
            name: "Composite",
            className: "JsonWebKey",
            modelProperties: {
                kid: {
                    serializedName: "kid",
                    type: {
                        name: "String"
                    }
                },
                kty: {
                    serializedName: "kty",
                    type: {
                        name: "String"
                    }
                },
                keyOps: {
                    serializedName: "key_ops",
                    type: {
                        name: "Sequence",
                        element: {
                            type: {
                                name: "String"
                            }
                        }
                    }
                },
                n: {
                    serializedName: "n",
                    type: {
                        name: "Base64Url"
                    }
                },
                e: {
                    serializedName: "e",
                    type: {
                        name: "Base64Url"
                    }
                },
                d: {
                    serializedName: "d",
                    type: {
                        name: "Base64Url"
                    }
                },
                dp: {
                    serializedName: "dp",
                    type: {
                        name: "Base64Url"
                    }
                },
                dq: {
                    serializedName: "dq",
                    type: {
                        name: "Base64Url"
                    }
                },
                qi: {
                    serializedName: "qi",
                    type: {
                        name: "Base64Url"
                    }
                },
                p: {
                    serializedName: "p",
                    type: {
                        name: "Base64Url"
                    }
                },
                q: {
                    serializedName: "q",
                    type: {
                        name: "Base64Url"
                    }
                },
                k: {
                    serializedName: "k",
                    type: {
                        name: "Base64Url"
                    }
                },
                t: {
                    serializedName: "key_hsm",
                    type: {
                        name: "Base64Url"
                    }
                },
                crv: {
                    serializedName: "crv",
                    type: {
                        name: "String"
                    }
                },
                x: {
                    serializedName: "x",
                    type: {
                        name: "Base64Url"
                    }
                },
                y: {
                    serializedName: "y",
                    type: {
                        name: "Base64Url"
                    }
                }
            }
        }
    };
    var KeyAttributes = {
        serializedName: "KeyAttributes",
        type: {
            name: "Composite",
            className: "KeyAttributes",
            modelProperties: __assign(__assign({}, Attributes.type.modelProperties), { recoveryLevel: {
                    nullable: false,
                    readOnly: true,
                    serializedName: "recoveryLevel",
                    type: {
                        name: "String"
                    }
                } })
        }
    };
    var KeyBundle = {
        serializedName: "KeyBundle",
        type: {
            name: "Composite",
            className: "KeyBundle",
            modelProperties: {
                key: {
                    serializedName: "key",
                    type: {
                        name: "Composite",
                        className: "JsonWebKey"
                    }
                },
                attributes: {
                    serializedName: "attributes",
                    type: {
                        name: "Composite",
                        className: "KeyAttributes"
                    }
                },
                tags: {
                    serializedName: "tags",
                    type: {
                        name: "Dictionary",
                        value: {
                            type: {
                                name: "String"
                            }
                        }
                    }
                },
                managed: {
                    readOnly: true,
                    serializedName: "managed",
                    type: {
                        name: "Boolean"
                    }
                }
            }
        }
    };
    var KeyItem = {
        serializedName: "KeyItem",
        type: {
            name: "Composite",
            className: "KeyItem",
            modelProperties: {
                kid: {
                    serializedName: "kid",
                    type: {
                        name: "String"
                    }
                },
                attributes: {
                    serializedName: "attributes",
                    type: {
                        name: "Composite",
                        className: "KeyAttributes"
                    }
                },
                tags: {
                    serializedName: "tags",
                    type: {
                        name: "Dictionary",
                        value: {
                            type: {
                                name: "String"
                            }
                        }
                    }
                },
                managed: {
                    readOnly: true,
                    serializedName: "managed",
                    type: {
                        name: "Boolean"
                    }
                }
            }
        }
    };
    var DeletedKeyBundle = {
        serializedName: "DeletedKeyBundle",
        type: {
            name: "Composite",
            className: "DeletedKeyBundle",
            modelProperties: __assign(__assign({}, KeyBundle.type.modelProperties), { recoveryId: {
                    serializedName: "recoveryId",
                    type: {
                        name: "String"
                    }
                }, scheduledPurgeDate: {
                    readOnly: true,
                    serializedName: "scheduledPurgeDate",
                    type: {
                        name: "UnixTime"
                    }
                }, deletedDate: {
                    readOnly: true,
                    serializedName: "deletedDate",
                    type: {
                        name: "UnixTime"
                    }
                } })
        }
    };
    var DeletedKeyItem = {
        serializedName: "DeletedKeyItem",
        type: {
            name: "Composite",
            className: "DeletedKeyItem",
            modelProperties: __assign(__assign({}, KeyItem.type.modelProperties), { recoveryId: {
                    serializedName: "recoveryId",
                    type: {
                        name: "String"
                    }
                }, scheduledPurgeDate: {
                    readOnly: true,
                    serializedName: "scheduledPurgeDate",
                    type: {
                        name: "UnixTime"
                    }
                }, deletedDate: {
                    readOnly: true,
                    serializedName: "deletedDate",
                    type: {
                        name: "UnixTime"
                    }
                } })
        }
    };
    var SecretAttributes = {
        serializedName: "SecretAttributes",
        type: {
            name: "Composite",
            className: "SecretAttributes",
            modelProperties: __assign(__assign({}, Attributes.type.modelProperties), { recoveryLevel: {
                    nullable: false,
                    readOnly: true,
                    serializedName: "recoveryLevel",
                    type: {
                        name: "String"
                    }
                } })
        }
    };
    var SecretBundle = {
        serializedName: "SecretBundle",
        type: {
            name: "Composite",
            className: "SecretBundle",
            modelProperties: {
                value: {
                    serializedName: "value",
                    type: {
                        name: "String"
                    }
                },
                id: {
                    serializedName: "id",
                    type: {
                        name: "String"
                    }
                },
                contentType: {
                    serializedName: "contentType",
                    type: {
                        name: "String"
                    }
                },
                attributes: {
                    serializedName: "attributes",
                    type: {
                        name: "Composite",
                        className: "SecretAttributes"
                    }
                },
                tags: {
                    serializedName: "tags",
                    type: {
                        name: "Dictionary",
                        value: {
                            type: {
                                name: "String"
                            }
                        }
                    }
                },
                kid: {
                    readOnly: true,
                    serializedName: "kid",
                    type: {
                        name: "String"
                    }
                },
                managed: {
                    readOnly: true,
                    serializedName: "managed",
                    type: {
                        name: "Boolean"
                    }
                }
            }
        }
    };
    var SecretItem = {
        serializedName: "SecretItem",
        type: {
            name: "Composite",
            className: "SecretItem",
            modelProperties: {
                id: {
                    serializedName: "id",
                    type: {
                        name: "String"
                    }
                },
                attributes: {
                    serializedName: "attributes",
                    type: {
                        name: "Composite",
                        className: "SecretAttributes"
                    }
                },
                tags: {
                    serializedName: "tags",
                    type: {
                        name: "Dictionary",
                        value: {
                            type: {
                                name: "String"
                            }
                        }
                    }
                },
                contentType: {
                    serializedName: "contentType",
                    type: {
                        name: "String"
                    }
                },
                managed: {
                    readOnly: true,
                    serializedName: "managed",
                    type: {
                        name: "Boolean"
                    }
                }
            }
        }
    };
    var DeletedSecretBundle = {
        serializedName: "DeletedSecretBundle",
        type: {
            name: "Composite",
            className: "DeletedSecretBundle",
            modelProperties: __assign(__assign({}, SecretBundle.type.modelProperties), { recoveryId: {
                    serializedName: "recoveryId",
                    type: {
                        name: "String"
                    }
                }, scheduledPurgeDate: {
                    readOnly: true,
                    serializedName: "scheduledPurgeDate",
                    type: {
                        name: "UnixTime"
                    }
                }, deletedDate: {
                    readOnly: true,
                    serializedName: "deletedDate",
                    type: {
                        name: "UnixTime"
                    }
                } })
        }
    };
    var DeletedSecretItem = {
        serializedName: "DeletedSecretItem",
        type: {
            name: "Composite",
            className: "DeletedSecretItem",
            modelProperties: __assign(__assign({}, SecretItem.type.modelProperties), { recoveryId: {
                    serializedName: "recoveryId",
                    type: {
                        name: "String"
                    }
                }, scheduledPurgeDate: {
                    readOnly: true,
                    serializedName: "scheduledPurgeDate",
                    type: {
                        name: "UnixTime"
                    }
                }, deletedDate: {
                    readOnly: true,
                    serializedName: "deletedDate",
                    type: {
                        name: "UnixTime"
                    }
                } })
        }
    };
    var SecretRestoreParameters = {
        serializedName: "SecretRestoreParameters",
        type: {
            name: "Composite",
            className: "SecretRestoreParameters",
            modelProperties: {
                secretBundleBackup: {
                    required: true,
                    serializedName: "value",
                    type: {
                        name: "Base64Url"
                    }
                }
            }
        }
    };
    var StorageRestoreParameters = {
        serializedName: "StorageRestoreParameters",
        type: {
            name: "Composite",
            className: "StorageRestoreParameters",
            modelProperties: {
                storageBundleBackup: {
                    required: true,
                    serializedName: "value",
                    type: {
                        name: "Base64Url"
                    }
                }
            }
        }
    };
    var CertificateAttributes = {
        serializedName: "CertificateAttributes",
        type: {
            name: "Composite",
            className: "CertificateAttributes",
            modelProperties: __assign(__assign({}, Attributes.type.modelProperties), { recoveryLevel: {
                    nullable: false,
                    readOnly: true,
                    serializedName: "recoveryLevel",
                    type: {
                        name: "String"
                    }
                } })
        }
    };
    var CertificateItem = {
        serializedName: "CertificateItem",
        type: {
            name: "Composite",
            className: "CertificateItem",
            modelProperties: {
                id: {
                    serializedName: "id",
                    type: {
                        name: "String"
                    }
                },
                attributes: {
                    serializedName: "attributes",
                    type: {
                        name: "Composite",
                        className: "CertificateAttributes"
                    }
                },
                tags: {
                    serializedName: "tags",
                    type: {
                        name: "Dictionary",
                        value: {
                            type: {
                                name: "String"
                            }
                        }
                    }
                },
                x509Thumbprint: {
                    serializedName: "x5t",
                    type: {
                        name: "Base64Url"
                    }
                }
            }
        }
    };
    var CertificateIssuerItem = {
        serializedName: "CertificateIssuerItem",
        type: {
            name: "Composite",
            className: "CertificateIssuerItem",
            modelProperties: {
                id: {
                    serializedName: "id",
                    type: {
                        name: "String"
                    }
                },
                provider: {
                    serializedName: "provider",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    };
    var KeyProperties = {
        serializedName: "KeyProperties",
        type: {
            name: "Composite",
            className: "KeyProperties",
            modelProperties: {
                exportable: {
                    serializedName: "exportable",
                    type: {
                        name: "Boolean"
                    }
                },
                keyType: {
                    serializedName: "kty",
                    type: {
                        name: "String"
                    }
                },
                keySize: {
                    serializedName: "key_size",
                    type: {
                        name: "Number"
                    }
                },
                reuseKey: {
                    serializedName: "reuse_key",
                    type: {
                        name: "Boolean"
                    }
                },
                curve: {
                    serializedName: "crv",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    };
    var SecretProperties = {
        serializedName: "SecretProperties",
        type: {
            name: "Composite",
            className: "SecretProperties",
            modelProperties: {
                contentType: {
                    serializedName: "contentType",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    };
    var SubjectAlternativeNames = {
        serializedName: "SubjectAlternativeNames",
        type: {
            name: "Composite",
            className: "SubjectAlternativeNames",
            modelProperties: {
                emails: {
                    serializedName: "emails",
                    type: {
                        name: "Sequence",
                        element: {
                            type: {
                                name: "String"
                            }
                        }
                    }
                },
                dnsNames: {
                    serializedName: "dns_names",
                    type: {
                        name: "Sequence",
                        element: {
                            type: {
                                name: "String"
                            }
                        }
                    }
                },
                upns: {
                    serializedName: "upns",
                    type: {
                        name: "Sequence",
                        element: {
                            type: {
                                name: "String"
                            }
                        }
                    }
                }
            }
        }
    };
    var X509CertificateProperties = {
        serializedName: "X509CertificateProperties",
        type: {
            name: "Composite",
            className: "X509CertificateProperties",
            modelProperties: {
                subject: {
                    serializedName: "subject",
                    type: {
                        name: "String"
                    }
                },
                ekus: {
                    serializedName: "ekus",
                    type: {
                        name: "Sequence",
                        element: {
                            type: {
                                name: "String"
                            }
                        }
                    }
                },
                subjectAlternativeNames: {
                    serializedName: "sans",
                    type: {
                        name: "Composite",
                        className: "SubjectAlternativeNames"
                    }
                },
                keyUsage: {
                    serializedName: "key_usage",
                    type: {
                        name: "Sequence",
                        element: {
                            type: {
                                name: "String"
                            }
                        }
                    }
                },
                validityInMonths: {
                    serializedName: "validity_months",
                    constraints: {
                        InclusiveMinimum: 0
                    },
                    type: {
                        name: "Number"
                    }
                }
            }
        }
    };
    var Trigger = {
        serializedName: "Trigger",
        type: {
            name: "Composite",
            className: "Trigger",
            modelProperties: {
                lifetimePercentage: {
                    serializedName: "lifetime_percentage",
                    constraints: {
                        InclusiveMaximum: 99,
                        InclusiveMinimum: 1
                    },
                    type: {
                        name: "Number"
                    }
                },
                daysBeforeExpiry: {
                    serializedName: "days_before_expiry",
                    type: {
                        name: "Number"
                    }
                }
            }
        }
    };
    var Action = {
        serializedName: "Action",
        type: {
            name: "Composite",
            className: "Action",
            modelProperties: {
                actionType: {
                    serializedName: "action_type",
                    type: {
                        name: "Enum",
                        allowedValues: ["EmailContacts", "AutoRenew"]
                    }
                }
            }
        }
    };
    var LifetimeAction = {
        serializedName: "LifetimeAction",
        type: {
            name: "Composite",
            className: "LifetimeAction",
            modelProperties: {
                trigger: {
                    serializedName: "trigger",
                    type: {
                        name: "Composite",
                        className: "Trigger"
                    }
                },
                action: {
                    serializedName: "action",
                    type: {
                        name: "Composite",
                        className: "Action"
                    }
                }
            }
        }
    };
    var IssuerParameters = {
        serializedName: "IssuerParameters",
        type: {
            name: "Composite",
            className: "IssuerParameters",
            modelProperties: {
                name: {
                    serializedName: "name",
                    type: {
                        name: "String"
                    }
                },
                certificateType: {
                    serializedName: "cty",
                    type: {
                        name: "String"
                    }
                },
                certificateTransparency: {
                    serializedName: "cert_transparency",
                    type: {
                        name: "Boolean"
                    }
                }
            }
        }
    };
    var CertificatePolicy = {
        serializedName: "CertificatePolicy",
        type: {
            name: "Composite",
            className: "CertificatePolicy",
            modelProperties: {
                id: {
                    readOnly: true,
                    serializedName: "id",
                    type: {
                        name: "String"
                    }
                },
                keyProperties: {
                    serializedName: "key_props",
                    type: {
                        name: "Composite",
                        className: "KeyProperties"
                    }
                },
                secretProperties: {
                    serializedName: "secret_props",
                    type: {
                        name: "Composite",
                        className: "SecretProperties"
                    }
                },
                x509CertificateProperties: {
                    serializedName: "x509_props",
                    type: {
                        name: "Composite",
                        className: "X509CertificateProperties"
                    }
                },
                lifetimeActions: {
                    serializedName: "lifetime_actions",
                    type: {
                        name: "Sequence",
                        element: {
                            type: {
                                name: "Composite",
                                className: "LifetimeAction"
                            }
                        }
                    }
                },
                issuerParameters: {
                    serializedName: "issuer",
                    type: {
                        name: "Composite",
                        className: "IssuerParameters"
                    }
                },
                attributes: {
                    serializedName: "attributes",
                    type: {
                        name: "Composite",
                        className: "CertificateAttributes"
                    }
                }
            }
        }
    };
    var CertificateBundle = {
        serializedName: "CertificateBundle",
        type: {
            name: "Composite",
            className: "CertificateBundle",
            modelProperties: {
                id: {
                    readOnly: true,
                    serializedName: "id",
                    type: {
                        name: "String"
                    }
                },
                kid: {
                    readOnly: true,
                    serializedName: "kid",
                    type: {
                        name: "String"
                    }
                },
                sid: {
                    readOnly: true,
                    serializedName: "sid",
                    type: {
                        name: "String"
                    }
                },
                x509Thumbprint: {
                    readOnly: true,
                    serializedName: "x5t",
                    type: {
                        name: "Base64Url"
                    }
                },
                policy: {
                    readOnly: true,
                    serializedName: "policy",
                    type: {
                        name: "Composite",
                        className: "CertificatePolicy"
                    }
                },
                cer: {
                    serializedName: "cer",
                    type: {
                        name: "ByteArray"
                    }
                },
                contentType: {
                    serializedName: "contentType",
                    type: {
                        name: "String"
                    }
                },
                attributes: {
                    serializedName: "attributes",
                    type: {
                        name: "Composite",
                        className: "CertificateAttributes"
                    }
                },
                tags: {
                    serializedName: "tags",
                    type: {
                        name: "Dictionary",
                        value: {
                            type: {
                                name: "String"
                            }
                        }
                    }
                }
            }
        }
    };
    var DeletedCertificateBundle = {
        serializedName: "DeletedCertificateBundle",
        type: {
            name: "Composite",
            className: "DeletedCertificateBundle",
            modelProperties: __assign(__assign({}, CertificateBundle.type.modelProperties), { recoveryId: {
                    serializedName: "recoveryId",
                    type: {
                        name: "String"
                    }
                }, scheduledPurgeDate: {
                    readOnly: true,
                    serializedName: "scheduledPurgeDate",
                    type: {
                        name: "UnixTime"
                    }
                }, deletedDate: {
                    readOnly: true,
                    serializedName: "deletedDate",
                    type: {
                        name: "UnixTime"
                    }
                } })
        }
    };
    var DeletedCertificateItem = {
        serializedName: "DeletedCertificateItem",
        type: {
            name: "Composite",
            className: "DeletedCertificateItem",
            modelProperties: __assign(__assign({}, CertificateItem.type.modelProperties), { recoveryId: {
                    serializedName: "recoveryId",
                    type: {
                        name: "String"
                    }
                }, scheduledPurgeDate: {
                    readOnly: true,
                    serializedName: "scheduledPurgeDate",
                    type: {
                        name: "UnixTime"
                    }
                }, deletedDate: {
                    readOnly: true,
                    serializedName: "deletedDate",
                    type: {
                        name: "UnixTime"
                    }
                } })
        }
    };
    var ErrorModel = {
        serializedName: "Error",
        type: {
            name: "Composite",
            className: "ErrorModel",
            modelProperties: {
                code: {
                    readOnly: true,
                    serializedName: "code",
                    type: {
                        name: "String"
                    }
                },
                message: {
                    readOnly: true,
                    serializedName: "message",
                    type: {
                        name: "String"
                    }
                },
                innerError: {
                    readOnly: true,
                    serializedName: "innererror",
                    type: {
                        name: "Composite",
                        className: "ErrorModel"
                    }
                }
            }
        }
    };
    var CertificateOperation = {
        serializedName: "CertificateOperation",
        type: {
            name: "Composite",
            className: "CertificateOperation",
            modelProperties: {
                id: {
                    readOnly: true,
                    serializedName: "id",
                    type: {
                        name: "String"
                    }
                },
                issuerParameters: {
                    serializedName: "issuer",
                    type: {
                        name: "Composite",
                        className: "IssuerParameters"
                    }
                },
                csr: {
                    serializedName: "csr",
                    type: {
                        name: "ByteArray"
                    }
                },
                cancellationRequested: {
                    serializedName: "cancellation_requested",
                    type: {
                        name: "Boolean"
                    }
                },
                status: {
                    serializedName: "status",
                    type: {
                        name: "String"
                    }
                },
                statusDetails: {
                    serializedName: "status_details",
                    type: {
                        name: "String"
                    }
                },
                error: {
                    serializedName: "error",
                    type: {
                        name: "Composite",
                        className: "ErrorModel"
                    }
                },
                target: {
                    serializedName: "target",
                    type: {
                        name: "String"
                    }
                },
                requestId: {
                    serializedName: "request_id",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    };
    var IssuerCredentials = {
        serializedName: "IssuerCredentials",
        type: {
            name: "Composite",
            className: "IssuerCredentials",
            modelProperties: {
                accountId: {
                    serializedName: "account_id",
                    type: {
                        name: "String"
                    }
                },
                password: {
                    serializedName: "pwd",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    };
    var AdministratorDetails = {
        serializedName: "AdministratorDetails",
        type: {
            name: "Composite",
            className: "AdministratorDetails",
            modelProperties: {
                firstName: {
                    serializedName: "first_name",
                    type: {
                        name: "String"
                    }
                },
                lastName: {
                    serializedName: "last_name",
                    type: {
                        name: "String"
                    }
                },
                emailAddress: {
                    serializedName: "email",
                    type: {
                        name: "String"
                    }
                },
                phone: {
                    serializedName: "phone",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    };
    var OrganizationDetails = {
        serializedName: "OrganizationDetails",
        type: {
            name: "Composite",
            className: "OrganizationDetails",
            modelProperties: {
                id: {
                    serializedName: "id",
                    type: {
                        name: "String"
                    }
                },
                adminDetails: {
                    serializedName: "admin_details",
                    type: {
                        name: "Sequence",
                        element: {
                            type: {
                                name: "Composite",
                                className: "AdministratorDetails"
                            }
                        }
                    }
                }
            }
        }
    };
    var IssuerAttributes = {
        serializedName: "IssuerAttributes",
        type: {
            name: "Composite",
            className: "IssuerAttributes",
            modelProperties: {
                enabled: {
                    serializedName: "enabled",
                    type: {
                        name: "Boolean"
                    }
                },
                created: {
                    readOnly: true,
                    serializedName: "created",
                    type: {
                        name: "UnixTime"
                    }
                },
                updated: {
                    readOnly: true,
                    serializedName: "updated",
                    type: {
                        name: "UnixTime"
                    }
                }
            }
        }
    };
    var IssuerBundle = {
        serializedName: "IssuerBundle",
        type: {
            name: "Composite",
            className: "IssuerBundle",
            modelProperties: {
                id: {
                    readOnly: true,
                    serializedName: "id",
                    type: {
                        name: "String"
                    }
                },
                provider: {
                    serializedName: "provider",
                    type: {
                        name: "String"
                    }
                },
                credentials: {
                    serializedName: "credentials",
                    type: {
                        name: "Composite",
                        className: "IssuerCredentials"
                    }
                },
                organizationDetails: {
                    serializedName: "org_details",
                    type: {
                        name: "Composite",
                        className: "OrganizationDetails"
                    }
                },
                attributes: {
                    serializedName: "attributes",
                    type: {
                        name: "Composite",
                        className: "IssuerAttributes"
                    }
                }
            }
        }
    };
    var Contact = {
        serializedName: "Contact",
        type: {
            name: "Composite",
            className: "Contact",
            modelProperties: {
                emailAddress: {
                    serializedName: "email",
                    type: {
                        name: "String"
                    }
                },
                name: {
                    serializedName: "name",
                    type: {
                        name: "String"
                    }
                },
                phone: {
                    serializedName: "phone",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    };
    var Contacts = {
        serializedName: "Contacts",
        type: {
            name: "Composite",
            className: "Contacts",
            modelProperties: {
                id: {
                    readOnly: true,
                    serializedName: "id",
                    type: {
                        name: "String"
                    }
                },
                contactList: {
                    serializedName: "contacts",
                    type: {
                        name: "Sequence",
                        element: {
                            type: {
                                name: "Composite",
                                className: "Contact"
                            }
                        }
                    }
                }
            }
        }
    };
    var KeyCreateParameters = {
        serializedName: "KeyCreateParameters",
        type: {
            name: "Composite",
            className: "KeyCreateParameters",
            modelProperties: {
                kty: {
                    required: true,
                    serializedName: "kty",
                    constraints: {
                        MinLength: 1
                    },
                    type: {
                        name: "String"
                    }
                },
                keySize: {
                    serializedName: "key_size",
                    type: {
                        name: "Number"
                    }
                },
                keyOps: {
                    serializedName: "key_ops",
                    type: {
                        name: "Sequence",
                        element: {
                            type: {
                                name: "String"
                            }
                        }
                    }
                },
                keyAttributes: {
                    serializedName: "attributes",
                    type: {
                        name: "Composite",
                        className: "KeyAttributes"
                    }
                },
                tags: {
                    serializedName: "tags",
                    type: {
                        name: "Dictionary",
                        value: {
                            type: {
                                name: "String"
                            }
                        }
                    }
                },
                curve: {
                    serializedName: "crv",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    };
    var KeyImportParameters = {
        serializedName: "KeyImportParameters",
        type: {
            name: "Composite",
            className: "KeyImportParameters",
            modelProperties: {
                hsm: {
                    serializedName: "Hsm",
                    type: {
                        name: "Boolean"
                    }
                },
                key: {
                    required: true,
                    serializedName: "key",
                    type: {
                        name: "Composite",
                        className: "JsonWebKey"
                    }
                },
                keyAttributes: {
                    serializedName: "attributes",
                    type: {
                        name: "Composite",
                        className: "KeyAttributes"
                    }
                },
                tags: {
                    serializedName: "tags",
                    type: {
                        name: "Dictionary",
                        value: {
                            type: {
                                name: "String"
                            }
                        }
                    }
                }
            }
        }
    };
    var KeyOperationsParameters = {
        serializedName: "KeyOperationsParameters",
        type: {
            name: "Composite",
            className: "KeyOperationsParameters",
            modelProperties: {
                algorithm: {
                    required: true,
                    serializedName: "alg",
                    constraints: {
                        MinLength: 1
                    },
                    type: {
                        name: "String"
                    }
                },
                value: {
                    required: true,
                    serializedName: "value",
                    type: {
                        name: "Base64Url"
                    }
                }
            }
        }
    };
    var KeySignParameters = {
        serializedName: "KeySignParameters",
        type: {
            name: "Composite",
            className: "KeySignParameters",
            modelProperties: {
                algorithm: {
                    required: true,
                    serializedName: "alg",
                    constraints: {
                        MinLength: 1
                    },
                    type: {
                        name: "String"
                    }
                },
                value: {
                    required: true,
                    serializedName: "value",
                    type: {
                        name: "Base64Url"
                    }
                }
            }
        }
    };
    var KeyVerifyParameters = {
        serializedName: "KeyVerifyParameters",
        type: {
            name: "Composite",
            className: "KeyVerifyParameters",
            modelProperties: {
                algorithm: {
                    required: true,
                    serializedName: "alg",
                    constraints: {
                        MinLength: 1
                    },
                    type: {
                        name: "String"
                    }
                },
                digest: {
                    required: true,
                    serializedName: "digest",
                    type: {
                        name: "Base64Url"
                    }
                },
                signature: {
                    required: true,
                    serializedName: "value",
                    type: {
                        name: "Base64Url"
                    }
                }
            }
        }
    };
    var KeyUpdateParameters = {
        serializedName: "KeyUpdateParameters",
        type: {
            name: "Composite",
            className: "KeyUpdateParameters",
            modelProperties: {
                keyOps: {
                    serializedName: "key_ops",
                    type: {
                        name: "Sequence",
                        element: {
                            type: {
                                name: "String"
                            }
                        }
                    }
                },
                keyAttributes: {
                    serializedName: "attributes",
                    type: {
                        name: "Composite",
                        className: "KeyAttributes"
                    }
                },
                tags: {
                    serializedName: "tags",
                    type: {
                        name: "Dictionary",
                        value: {
                            type: {
                                name: "String"
                            }
                        }
                    }
                }
            }
        }
    };
    var KeyRestoreParameters = {
        serializedName: "KeyRestoreParameters",
        type: {
            name: "Composite",
            className: "KeyRestoreParameters",
            modelProperties: {
                keyBundleBackup: {
                    required: true,
                    serializedName: "value",
                    type: {
                        name: "Base64Url"
                    }
                }
            }
        }
    };
    var SecretSetParameters = {
        serializedName: "SecretSetParameters",
        type: {
            name: "Composite",
            className: "SecretSetParameters",
            modelProperties: {
                value: {
                    required: true,
                    serializedName: "value",
                    type: {
                        name: "String"
                    }
                },
                tags: {
                    serializedName: "tags",
                    type: {
                        name: "Dictionary",
                        value: {
                            type: {
                                name: "String"
                            }
                        }
                    }
                },
                contentType: {
                    serializedName: "contentType",
                    type: {
                        name: "String"
                    }
                },
                secretAttributes: {
                    serializedName: "attributes",
                    type: {
                        name: "Composite",
                        className: "SecretAttributes"
                    }
                }
            }
        }
    };
    var SecretUpdateParameters = {
        serializedName: "SecretUpdateParameters",
        type: {
            name: "Composite",
            className: "SecretUpdateParameters",
            modelProperties: {
                contentType: {
                    serializedName: "contentType",
                    type: {
                        name: "String"
                    }
                },
                secretAttributes: {
                    serializedName: "attributes",
                    type: {
                        name: "Composite",
                        className: "SecretAttributes"
                    }
                },
                tags: {
                    serializedName: "tags",
                    type: {
                        name: "Dictionary",
                        value: {
                            type: {
                                name: "String"
                            }
                        }
                    }
                }
            }
        }
    };
    var CertificateCreateParameters = {
        serializedName: "CertificateCreateParameters",
        type: {
            name: "Composite",
            className: "CertificateCreateParameters",
            modelProperties: {
                certificatePolicy: {
                    serializedName: "policy",
                    type: {
                        name: "Composite",
                        className: "CertificatePolicy"
                    }
                },
                certificateAttributes: {
                    serializedName: "attributes",
                    type: {
                        name: "Composite",
                        className: "CertificateAttributes"
                    }
                },
                tags: {
                    serializedName: "tags",
                    type: {
                        name: "Dictionary",
                        value: {
                            type: {
                                name: "String"
                            }
                        }
                    }
                }
            }
        }
    };
    var CertificateImportParameters = {
        serializedName: "CertificateImportParameters",
        type: {
            name: "Composite",
            className: "CertificateImportParameters",
            modelProperties: {
                base64EncodedCertificate: {
                    required: true,
                    serializedName: "value",
                    type: {
                        name: "String"
                    }
                },
                password: {
                    serializedName: "pwd",
                    type: {
                        name: "String"
                    }
                },
                certificatePolicy: {
                    serializedName: "policy",
                    type: {
                        name: "Composite",
                        className: "CertificatePolicy"
                    }
                },
                certificateAttributes: {
                    serializedName: "attributes",
                    type: {
                        name: "Composite",
                        className: "CertificateAttributes"
                    }
                },
                tags: {
                    serializedName: "tags",
                    type: {
                        name: "Dictionary",
                        value: {
                            type: {
                                name: "String"
                            }
                        }
                    }
                }
            }
        }
    };
    var CertificateUpdateParameters = {
        serializedName: "CertificateUpdateParameters",
        type: {
            name: "Composite",
            className: "CertificateUpdateParameters",
            modelProperties: {
                certificatePolicy: {
                    serializedName: "policy",
                    type: {
                        name: "Composite",
                        className: "CertificatePolicy"
                    }
                },
                certificateAttributes: {
                    serializedName: "attributes",
                    type: {
                        name: "Composite",
                        className: "CertificateAttributes"
                    }
                },
                tags: {
                    serializedName: "tags",
                    type: {
                        name: "Dictionary",
                        value: {
                            type: {
                                name: "String"
                            }
                        }
                    }
                }
            }
        }
    };
    var CertificateMergeParameters = {
        serializedName: "CertificateMergeParameters",
        type: {
            name: "Composite",
            className: "CertificateMergeParameters",
            modelProperties: {
                x509Certificates: {
                    required: true,
                    serializedName: "x5c",
                    type: {
                        name: "Sequence",
                        element: {
                            type: {
                                name: "ByteArray"
                            }
                        }
                    }
                },
                certificateAttributes: {
                    serializedName: "attributes",
                    type: {
                        name: "Composite",
                        className: "CertificateAttributes"
                    }
                },
                tags: {
                    serializedName: "tags",
                    type: {
                        name: "Dictionary",
                        value: {
                            type: {
                                name: "String"
                            }
                        }
                    }
                }
            }
        }
    };
    var CertificateIssuerSetParameters = {
        serializedName: "CertificateIssuerSetParameters",
        type: {
            name: "Composite",
            className: "CertificateIssuerSetParameters",
            modelProperties: {
                provider: {
                    required: true,
                    serializedName: "provider",
                    type: {
                        name: "String"
                    }
                },
                credentials: {
                    serializedName: "credentials",
                    type: {
                        name: "Composite",
                        className: "IssuerCredentials"
                    }
                },
                organizationDetails: {
                    serializedName: "org_details",
                    type: {
                        name: "Composite",
                        className: "OrganizationDetails"
                    }
                },
                attributes: {
                    serializedName: "attributes",
                    type: {
                        name: "Composite",
                        className: "IssuerAttributes"
                    }
                }
            }
        }
    };
    var CertificateIssuerUpdateParameters = {
        serializedName: "CertificateIssuerUpdateParameters",
        type: {
            name: "Composite",
            className: "CertificateIssuerUpdateParameters",
            modelProperties: {
                provider: {
                    serializedName: "provider",
                    type: {
                        name: "String"
                    }
                },
                credentials: {
                    serializedName: "credentials",
                    type: {
                        name: "Composite",
                        className: "IssuerCredentials"
                    }
                },
                organizationDetails: {
                    serializedName: "org_details",
                    type: {
                        name: "Composite",
                        className: "OrganizationDetails"
                    }
                },
                attributes: {
                    serializedName: "attributes",
                    type: {
                        name: "Composite",
                        className: "IssuerAttributes"
                    }
                }
            }
        }
    };
    var CertificateOperationUpdateParameter = {
        serializedName: "CertificateOperationUpdateParameter",
        type: {
            name: "Composite",
            className: "CertificateOperationUpdateParameter",
            modelProperties: {
                cancellationRequested: {
                    required: true,
                    serializedName: "cancellation_requested",
                    type: {
                        name: "Boolean"
                    }
                }
            }
        }
    };
    var KeyOperationResult = {
        serializedName: "KeyOperationResult",
        type: {
            name: "Composite",
            className: "KeyOperationResult",
            modelProperties: {
                kid: {
                    readOnly: true,
                    serializedName: "kid",
                    type: {
                        name: "String"
                    }
                },
                result: {
                    readOnly: true,
                    serializedName: "value",
                    type: {
                        name: "Base64Url"
                    }
                }
            }
        }
    };
    var KeyVerifyResult = {
        serializedName: "KeyVerifyResult",
        type: {
            name: "Composite",
            className: "KeyVerifyResult",
            modelProperties: {
                value: {
                    readOnly: true,
                    serializedName: "value",
                    type: {
                        name: "Boolean"
                    }
                }
            }
        }
    };
    var KeyListResult = {
        serializedName: "KeyListResult",
        type: {
            name: "Composite",
            className: "KeyListResult",
            modelProperties: {
                value: {
                    readOnly: true,
                    serializedName: "value",
                    type: {
                        name: "Sequence",
                        element: {
                            type: {
                                name: "Composite",
                                className: "KeyItem"
                            }
                        }
                    }
                },
                nextLink: {
                    readOnly: true,
                    serializedName: "nextLink",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    };
    var DeletedKeyListResult = {
        serializedName: "DeletedKeyListResult",
        type: {
            name: "Composite",
            className: "DeletedKeyListResult",
            modelProperties: {
                value: {
                    readOnly: true,
                    serializedName: "value",
                    type: {
                        name: "Sequence",
                        element: {
                            type: {
                                name: "Composite",
                                className: "DeletedKeyItem"
                            }
                        }
                    }
                },
                nextLink: {
                    readOnly: true,
                    serializedName: "nextLink",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    };
    var SecretListResult = {
        serializedName: "SecretListResult",
        type: {
            name: "Composite",
            className: "SecretListResult",
            modelProperties: {
                value: {
                    readOnly: true,
                    serializedName: "value",
                    type: {
                        name: "Sequence",
                        element: {
                            type: {
                                name: "Composite",
                                className: "SecretItem"
                            }
                        }
                    }
                },
                nextLink: {
                    readOnly: true,
                    serializedName: "nextLink",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    };
    var DeletedSecretListResult = {
        serializedName: "DeletedSecretListResult",
        type: {
            name: "Composite",
            className: "DeletedSecretListResult",
            modelProperties: {
                value: {
                    readOnly: true,
                    serializedName: "value",
                    type: {
                        name: "Sequence",
                        element: {
                            type: {
                                name: "Composite",
                                className: "DeletedSecretItem"
                            }
                        }
                    }
                },
                nextLink: {
                    readOnly: true,
                    serializedName: "nextLink",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    };
    var CertificateListResult = {
        serializedName: "CertificateListResult",
        type: {
            name: "Composite",
            className: "CertificateListResult",
            modelProperties: {
                value: {
                    readOnly: true,
                    serializedName: "value",
                    type: {
                        name: "Sequence",
                        element: {
                            type: {
                                name: "Composite",
                                className: "CertificateItem"
                            }
                        }
                    }
                },
                nextLink: {
                    readOnly: true,
                    serializedName: "nextLink",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    };
    var DeletedCertificateListResult = {
        serializedName: "DeletedCertificateListResult",
        type: {
            name: "Composite",
            className: "DeletedCertificateListResult",
            modelProperties: {
                value: {
                    readOnly: true,
                    serializedName: "value",
                    type: {
                        name: "Sequence",
                        element: {
                            type: {
                                name: "Composite",
                                className: "DeletedCertificateItem"
                            }
                        }
                    }
                },
                nextLink: {
                    readOnly: true,
                    serializedName: "nextLink",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    };
    var CertificateIssuerListResult = {
        serializedName: "CertificateIssuerListResult",
        type: {
            name: "Composite",
            className: "CertificateIssuerListResult",
            modelProperties: {
                value: {
                    readOnly: true,
                    serializedName: "value",
                    type: {
                        name: "Sequence",
                        element: {
                            type: {
                                name: "Composite",
                                className: "CertificateIssuerItem"
                            }
                        }
                    }
                },
                nextLink: {
                    readOnly: true,
                    serializedName: "nextLink",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    };
    var BackupKeyResult = {
        serializedName: "BackupKeyResult",
        type: {
            name: "Composite",
            className: "BackupKeyResult",
            modelProperties: {
                value: {
                    readOnly: true,
                    serializedName: "value",
                    type: {
                        name: "Base64Url"
                    }
                }
            }
        }
    };
    var BackupSecretResult = {
        serializedName: "BackupSecretResult",
        type: {
            name: "Composite",
            className: "BackupSecretResult",
            modelProperties: {
                value: {
                    readOnly: true,
                    serializedName: "value",
                    type: {
                        name: "Base64Url"
                    }
                }
            }
        }
    };
    var BackupStorageResult = {
        serializedName: "BackupStorageResult",
        type: {
            name: "Composite",
            className: "BackupStorageResult",
            modelProperties: {
                value: {
                    readOnly: true,
                    serializedName: "value",
                    type: {
                        name: "Base64Url"
                    }
                }
            }
        }
    };
    var PendingCertificateSigningRequestResult = {
        serializedName: "PendingCertificateSigningRequestResult",
        type: {
            name: "Composite",
            className: "PendingCertificateSigningRequestResult",
            modelProperties: {
                value: {
                    readOnly: true,
                    serializedName: "value",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    };
    var StorageAccountAttributes = {
        serializedName: "StorageAccountAttributes",
        type: {
            name: "Composite",
            className: "StorageAccountAttributes",
            modelProperties: {
                enabled: {
                    serializedName: "enabled",
                    type: {
                        name: "Boolean"
                    }
                },
                created: {
                    readOnly: true,
                    serializedName: "created",
                    type: {
                        name: "UnixTime"
                    }
                },
                updated: {
                    readOnly: true,
                    serializedName: "updated",
                    type: {
                        name: "UnixTime"
                    }
                },
                recoveryLevel: {
                    nullable: false,
                    readOnly: true,
                    serializedName: "recoveryLevel",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    };
    var StorageBundle = {
        serializedName: "StorageBundle",
        type: {
            name: "Composite",
            className: "StorageBundle",
            modelProperties: {
                id: {
                    readOnly: true,
                    serializedName: "id",
                    type: {
                        name: "String"
                    }
                },
                resourceId: {
                    readOnly: true,
                    serializedName: "resourceId",
                    type: {
                        name: "String"
                    }
                },
                activeKeyName: {
                    readOnly: true,
                    serializedName: "activeKeyName",
                    type: {
                        name: "String"
                    }
                },
                autoRegenerateKey: {
                    readOnly: true,
                    serializedName: "autoRegenerateKey",
                    type: {
                        name: "Boolean"
                    }
                },
                regenerationPeriod: {
                    readOnly: true,
                    serializedName: "regenerationPeriod",
                    type: {
                        name: "String"
                    }
                },
                attributes: {
                    readOnly: true,
                    serializedName: "attributes",
                    type: {
                        name: "Composite",
                        className: "StorageAccountAttributes"
                    }
                },
                tags: {
                    readOnly: true,
                    serializedName: "tags",
                    type: {
                        name: "Dictionary",
                        value: {
                            type: {
                                name: "String"
                            }
                        }
                    }
                }
            }
        }
    };
    var DeletedStorageBundle = {
        serializedName: "DeletedStorageBundle",
        type: {
            name: "Composite",
            className: "DeletedStorageBundle",
            modelProperties: __assign(__assign({}, StorageBundle.type.modelProperties), { recoveryId: {
                    serializedName: "recoveryId",
                    type: {
                        name: "String"
                    }
                }, scheduledPurgeDate: {
                    readOnly: true,
                    serializedName: "scheduledPurgeDate",
                    type: {
                        name: "UnixTime"
                    }
                }, deletedDate: {
                    readOnly: true,
                    serializedName: "deletedDate",
                    type: {
                        name: "UnixTime"
                    }
                } })
        }
    };
    var StorageAccountCreateParameters = {
        serializedName: "StorageAccountCreateParameters",
        type: {
            name: "Composite",
            className: "StorageAccountCreateParameters",
            modelProperties: {
                resourceId: {
                    required: true,
                    serializedName: "resourceId",
                    type: {
                        name: "String"
                    }
                },
                activeKeyName: {
                    required: true,
                    serializedName: "activeKeyName",
                    type: {
                        name: "String"
                    }
                },
                autoRegenerateKey: {
                    required: true,
                    serializedName: "autoRegenerateKey",
                    type: {
                        name: "Boolean"
                    }
                },
                regenerationPeriod: {
                    serializedName: "regenerationPeriod",
                    type: {
                        name: "String"
                    }
                },
                storageAccountAttributes: {
                    serializedName: "attributes",
                    type: {
                        name: "Composite",
                        className: "StorageAccountAttributes"
                    }
                },
                tags: {
                    serializedName: "tags",
                    type: {
                        name: "Dictionary",
                        value: {
                            type: {
                                name: "String"
                            }
                        }
                    }
                }
            }
        }
    };
    var StorageAccountUpdateParameters = {
        serializedName: "StorageAccountUpdateParameters",
        type: {
            name: "Composite",
            className: "StorageAccountUpdateParameters",
            modelProperties: {
                activeKeyName: {
                    serializedName: "activeKeyName",
                    type: {
                        name: "String"
                    }
                },
                autoRegenerateKey: {
                    serializedName: "autoRegenerateKey",
                    type: {
                        name: "Boolean"
                    }
                },
                regenerationPeriod: {
                    serializedName: "regenerationPeriod",
                    type: {
                        name: "String"
                    }
                },
                storageAccountAttributes: {
                    serializedName: "attributes",
                    type: {
                        name: "Composite",
                        className: "StorageAccountAttributes"
                    }
                },
                tags: {
                    serializedName: "tags",
                    type: {
                        name: "Dictionary",
                        value: {
                            type: {
                                name: "String"
                            }
                        }
                    }
                }
            }
        }
    };
    var StorageAccountRegenerteKeyParameters = {
        serializedName: "StorageAccountRegenerteKeyParameters",
        type: {
            name: "Composite",
            className: "StorageAccountRegenerteKeyParameters",
            modelProperties: {
                keyName: {
                    required: true,
                    serializedName: "keyName",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    };
    var StorageAccountItem = {
        serializedName: "StorageAccountItem",
        type: {
            name: "Composite",
            className: "StorageAccountItem",
            modelProperties: {
                id: {
                    readOnly: true,
                    serializedName: "id",
                    type: {
                        name: "String"
                    }
                },
                resourceId: {
                    readOnly: true,
                    serializedName: "resourceId",
                    type: {
                        name: "String"
                    }
                },
                attributes: {
                    readOnly: true,
                    serializedName: "attributes",
                    type: {
                        name: "Composite",
                        className: "StorageAccountAttributes"
                    }
                },
                tags: {
                    readOnly: true,
                    serializedName: "tags",
                    type: {
                        name: "Dictionary",
                        value: {
                            type: {
                                name: "String"
                            }
                        }
                    }
                }
            }
        }
    };
    var DeletedStorageAccountItem = {
        serializedName: "DeletedStorageAccountItem",
        type: {
            name: "Composite",
            className: "DeletedStorageAccountItem",
            modelProperties: __assign(__assign({}, StorageAccountItem.type.modelProperties), { recoveryId: {
                    serializedName: "recoveryId",
                    type: {
                        name: "String"
                    }
                }, scheduledPurgeDate: {
                    readOnly: true,
                    serializedName: "scheduledPurgeDate",
                    type: {
                        name: "UnixTime"
                    }
                }, deletedDate: {
                    readOnly: true,
                    serializedName: "deletedDate",
                    type: {
                        name: "UnixTime"
                    }
                } })
        }
    };
    var StorageListResult = {
        serializedName: "StorageListResult",
        type: {
            name: "Composite",
            className: "StorageListResult",
            modelProperties: {
                value: {
                    readOnly: true,
                    serializedName: "value",
                    type: {
                        name: "Sequence",
                        element: {
                            type: {
                                name: "Composite",
                                className: "StorageAccountItem"
                            }
                        }
                    }
                },
                nextLink: {
                    readOnly: true,
                    serializedName: "nextLink",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    };
    var DeletedStorageListResult = {
        serializedName: "DeletedStorageListResult",
        type: {
            name: "Composite",
            className: "DeletedStorageListResult",
            modelProperties: {
                value: {
                    readOnly: true,
                    serializedName: "value",
                    type: {
                        name: "Sequence",
                        element: {
                            type: {
                                name: "Composite",
                                className: "DeletedStorageAccountItem"
                            }
                        }
                    }
                },
                nextLink: {
                    readOnly: true,
                    serializedName: "nextLink",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    };
    var SasDefinitionAttributes = {
        serializedName: "SasDefinitionAttributes",
        type: {
            name: "Composite",
            className: "SasDefinitionAttributes",
            modelProperties: {
                enabled: {
                    serializedName: "enabled",
                    type: {
                        name: "Boolean"
                    }
                },
                created: {
                    readOnly: true,
                    serializedName: "created",
                    type: {
                        name: "UnixTime"
                    }
                },
                updated: {
                    readOnly: true,
                    serializedName: "updated",
                    type: {
                        name: "UnixTime"
                    }
                },
                recoveryLevel: {
                    nullable: false,
                    readOnly: true,
                    serializedName: "recoveryLevel",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    };
    var SasDefinitionBundle = {
        serializedName: "SasDefinitionBundle",
        type: {
            name: "Composite",
            className: "SasDefinitionBundle",
            modelProperties: {
                id: {
                    readOnly: true,
                    serializedName: "id",
                    type: {
                        name: "String"
                    }
                },
                secretId: {
                    readOnly: true,
                    serializedName: "sid",
                    type: {
                        name: "String"
                    }
                },
                templateUri: {
                    readOnly: true,
                    serializedName: "templateUri",
                    type: {
                        name: "String"
                    }
                },
                sasType: {
                    readOnly: true,
                    serializedName: "sasType",
                    type: {
                        name: "String"
                    }
                },
                validityPeriod: {
                    readOnly: true,
                    serializedName: "validityPeriod",
                    type: {
                        name: "String"
                    }
                },
                attributes: {
                    readOnly: true,
                    serializedName: "attributes",
                    type: {
                        name: "Composite",
                        className: "SasDefinitionAttributes"
                    }
                },
                tags: {
                    readOnly: true,
                    serializedName: "tags",
                    type: {
                        name: "Dictionary",
                        value: {
                            type: {
                                name: "String"
                            }
                        }
                    }
                }
            }
        }
    };
    var DeletedSasDefinitionBundle = {
        serializedName: "DeletedSasDefinitionBundle",
        type: {
            name: "Composite",
            className: "DeletedSasDefinitionBundle",
            modelProperties: __assign(__assign({}, SasDefinitionBundle.type.modelProperties), { recoveryId: {
                    serializedName: "recoveryId",
                    type: {
                        name: "String"
                    }
                }, scheduledPurgeDate: {
                    readOnly: true,
                    serializedName: "scheduledPurgeDate",
                    type: {
                        name: "UnixTime"
                    }
                }, deletedDate: {
                    readOnly: true,
                    serializedName: "deletedDate",
                    type: {
                        name: "UnixTime"
                    }
                } })
        }
    };
    var SasDefinitionItem = {
        serializedName: "SasDefinitionItem",
        type: {
            name: "Composite",
            className: "SasDefinitionItem",
            modelProperties: {
                id: {
                    readOnly: true,
                    serializedName: "id",
                    type: {
                        name: "String"
                    }
                },
                secretId: {
                    readOnly: true,
                    serializedName: "sid",
                    type: {
                        name: "String"
                    }
                },
                attributes: {
                    readOnly: true,
                    serializedName: "attributes",
                    type: {
                        name: "Composite",
                        className: "SasDefinitionAttributes"
                    }
                },
                tags: {
                    readOnly: true,
                    serializedName: "tags",
                    type: {
                        name: "Dictionary",
                        value: {
                            type: {
                                name: "String"
                            }
                        }
                    }
                }
            }
        }
    };
    var DeletedSasDefinitionItem = {
        serializedName: "DeletedSasDefinitionItem",
        type: {
            name: "Composite",
            className: "DeletedSasDefinitionItem",
            modelProperties: __assign(__assign({}, SasDefinitionItem.type.modelProperties), { recoveryId: {
                    serializedName: "recoveryId",
                    type: {
                        name: "String"
                    }
                }, scheduledPurgeDate: {
                    readOnly: true,
                    serializedName: "scheduledPurgeDate",
                    type: {
                        name: "UnixTime"
                    }
                }, deletedDate: {
                    readOnly: true,
                    serializedName: "deletedDate",
                    type: {
                        name: "UnixTime"
                    }
                } })
        }
    };
    var SasDefinitionListResult = {
        serializedName: "SasDefinitionListResult",
        type: {
            name: "Composite",
            className: "SasDefinitionListResult",
            modelProperties: {
                value: {
                    readOnly: true,
                    serializedName: "value",
                    type: {
                        name: "Sequence",
                        element: {
                            type: {
                                name: "Composite",
                                className: "SasDefinitionItem"
                            }
                        }
                    }
                },
                nextLink: {
                    readOnly: true,
                    serializedName: "nextLink",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    };
    var DeletedSasDefinitionListResult = {
        serializedName: "DeletedSasDefinitionListResult",
        type: {
            name: "Composite",
            className: "DeletedSasDefinitionListResult",
            modelProperties: {
                value: {
                    readOnly: true,
                    serializedName: "value",
                    type: {
                        name: "Sequence",
                        element: {
                            type: {
                                name: "Composite",
                                className: "DeletedSasDefinitionItem"
                            }
                        }
                    }
                },
                nextLink: {
                    readOnly: true,
                    serializedName: "nextLink",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    };
    var SasDefinitionCreateParameters = {
        serializedName: "SasDefinitionCreateParameters",
        type: {
            name: "Composite",
            className: "SasDefinitionCreateParameters",
            modelProperties: {
                templateUri: {
                    required: true,
                    serializedName: "templateUri",
                    type: {
                        name: "String"
                    }
                },
                sasType: {
                    required: true,
                    serializedName: "sasType",
                    type: {
                        name: "String"
                    }
                },
                validityPeriod: {
                    required: true,
                    serializedName: "validityPeriod",
                    type: {
                        name: "String"
                    }
                },
                sasDefinitionAttributes: {
                    serializedName: "attributes",
                    type: {
                        name: "Composite",
                        className: "SasDefinitionAttributes"
                    }
                },
                tags: {
                    serializedName: "tags",
                    type: {
                        name: "Dictionary",
                        value: {
                            type: {
                                name: "String"
                            }
                        }
                    }
                }
            }
        }
    };
    var SasDefinitionUpdateParameters = {
        serializedName: "SasDefinitionUpdateParameters",
        type: {
            name: "Composite",
            className: "SasDefinitionUpdateParameters",
            modelProperties: {
                templateUri: {
                    serializedName: "templateUri",
                    type: {
                        name: "String"
                    }
                },
                sasType: {
                    serializedName: "sasType",
                    type: {
                        name: "String"
                    }
                },
                validityPeriod: {
                    serializedName: "validityPeriod",
                    type: {
                        name: "String"
                    }
                },
                sasDefinitionAttributes: {
                    serializedName: "attributes",
                    type: {
                        name: "Composite",
                        className: "SasDefinitionAttributes"
                    }
                },
                tags: {
                    serializedName: "tags",
                    type: {
                        name: "Dictionary",
                        value: {
                            type: {
                                name: "String"
                            }
                        }
                    }
                }
            }
        }
    };
    var KeyVaultError = {
        serializedName: "KeyVaultError",
        type: {
            name: "Composite",
            className: "KeyVaultError",
            modelProperties: {
                error: {
                    readOnly: true,
                    serializedName: "error",
                    type: {
                        name: "Composite",
                        className: "ErrorModel"
                    }
                }
            }
        }
    };
    var CertificateRestoreParameters = {
        serializedName: "CertificateRestoreParameters",
        type: {
            name: "Composite",
            className: "CertificateRestoreParameters",
            modelProperties: {
                certificateBundleBackup: {
                    required: true,
                    serializedName: "value",
                    type: {
                        name: "Base64Url"
                    }
                }
            }
        }
    };
    var BackupCertificateResult = {
        serializedName: "BackupCertificateResult",
        type: {
            name: "Composite",
            className: "BackupCertificateResult",
            modelProperties: {
                value: {
                    readOnly: true,
                    serializedName: "value",
                    type: {
                        name: "Base64Url"
                    }
                }
            }
        }
    };

    var Mappers = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Attributes: Attributes,
        JsonWebKey: JsonWebKey,
        KeyAttributes: KeyAttributes,
        KeyBundle: KeyBundle,
        KeyItem: KeyItem,
        DeletedKeyBundle: DeletedKeyBundle,
        DeletedKeyItem: DeletedKeyItem,
        SecretAttributes: SecretAttributes,
        SecretBundle: SecretBundle,
        SecretItem: SecretItem,
        DeletedSecretBundle: DeletedSecretBundle,
        DeletedSecretItem: DeletedSecretItem,
        SecretRestoreParameters: SecretRestoreParameters,
        StorageRestoreParameters: StorageRestoreParameters,
        CertificateAttributes: CertificateAttributes,
        CertificateItem: CertificateItem,
        CertificateIssuerItem: CertificateIssuerItem,
        KeyProperties: KeyProperties,
        SecretProperties: SecretProperties,
        SubjectAlternativeNames: SubjectAlternativeNames,
        X509CertificateProperties: X509CertificateProperties,
        Trigger: Trigger,
        Action: Action,
        LifetimeAction: LifetimeAction,
        IssuerParameters: IssuerParameters,
        CertificatePolicy: CertificatePolicy,
        CertificateBundle: CertificateBundle,
        DeletedCertificateBundle: DeletedCertificateBundle,
        DeletedCertificateItem: DeletedCertificateItem,
        ErrorModel: ErrorModel,
        CertificateOperation: CertificateOperation,
        IssuerCredentials: IssuerCredentials,
        AdministratorDetails: AdministratorDetails,
        OrganizationDetails: OrganizationDetails,
        IssuerAttributes: IssuerAttributes,
        IssuerBundle: IssuerBundle,
        Contact: Contact,
        Contacts: Contacts,
        KeyCreateParameters: KeyCreateParameters,
        KeyImportParameters: KeyImportParameters,
        KeyOperationsParameters: KeyOperationsParameters,
        KeySignParameters: KeySignParameters,
        KeyVerifyParameters: KeyVerifyParameters,
        KeyUpdateParameters: KeyUpdateParameters,
        KeyRestoreParameters: KeyRestoreParameters,
        SecretSetParameters: SecretSetParameters,
        SecretUpdateParameters: SecretUpdateParameters,
        CertificateCreateParameters: CertificateCreateParameters,
        CertificateImportParameters: CertificateImportParameters,
        CertificateUpdateParameters: CertificateUpdateParameters,
        CertificateMergeParameters: CertificateMergeParameters,
        CertificateIssuerSetParameters: CertificateIssuerSetParameters,
        CertificateIssuerUpdateParameters: CertificateIssuerUpdateParameters,
        CertificateOperationUpdateParameter: CertificateOperationUpdateParameter,
        KeyOperationResult: KeyOperationResult,
        KeyVerifyResult: KeyVerifyResult,
        KeyListResult: KeyListResult,
        DeletedKeyListResult: DeletedKeyListResult,
        SecretListResult: SecretListResult,
        DeletedSecretListResult: DeletedSecretListResult,
        CertificateListResult: CertificateListResult,
        DeletedCertificateListResult: DeletedCertificateListResult,
        CertificateIssuerListResult: CertificateIssuerListResult,
        BackupKeyResult: BackupKeyResult,
        BackupSecretResult: BackupSecretResult,
        BackupStorageResult: BackupStorageResult,
        PendingCertificateSigningRequestResult: PendingCertificateSigningRequestResult,
        StorageAccountAttributes: StorageAccountAttributes,
        StorageBundle: StorageBundle,
        DeletedStorageBundle: DeletedStorageBundle,
        StorageAccountCreateParameters: StorageAccountCreateParameters,
        StorageAccountUpdateParameters: StorageAccountUpdateParameters,
        StorageAccountRegenerteKeyParameters: StorageAccountRegenerteKeyParameters,
        StorageAccountItem: StorageAccountItem,
        DeletedStorageAccountItem: DeletedStorageAccountItem,
        StorageListResult: StorageListResult,
        DeletedStorageListResult: DeletedStorageListResult,
        SasDefinitionAttributes: SasDefinitionAttributes,
        SasDefinitionBundle: SasDefinitionBundle,
        DeletedSasDefinitionBundle: DeletedSasDefinitionBundle,
        SasDefinitionItem: SasDefinitionItem,
        DeletedSasDefinitionItem: DeletedSasDefinitionItem,
        SasDefinitionListResult: SasDefinitionListResult,
        DeletedSasDefinitionListResult: DeletedSasDefinitionListResult,
        SasDefinitionCreateParameters: SasDefinitionCreateParameters,
        SasDefinitionUpdateParameters: SasDefinitionUpdateParameters,
        KeyVaultError: KeyVaultError,
        CertificateRestoreParameters: CertificateRestoreParameters,
        BackupCertificateResult: BackupCertificateResult
    });

    /*
     * Copyright (c) Microsoft Corporation. All rights reserved.
     * Licensed under the MIT License. See License.txt in the project root for
     * license information.
     *
     * Code generated by Microsoft (R) AutoRest Code Generator.
     * Changes may cause incorrect behavior and will be lost if the code is
     * regenerated.
     */
    var apiVersion = {
        parameterPath: "apiVersion",
        mapper: {
            required: true,
            serializedName: "api-version",
            type: {
                name: "String"
            }
        }
    };
    var certificateName0 = {
        parameterPath: "certificateName",
        mapper: {
            required: true,
            serializedName: "certificate-name",
            type: {
                name: "String"
            }
        }
    };
    var certificateName1 = {
        parameterPath: "certificateName",
        mapper: {
            required: true,
            serializedName: "certificate-name",
            constraints: {
                Pattern: /^[0-9a-zA-Z-]+$/
            },
            type: {
                name: "String"
            }
        }
    };
    var certificateVersion = {
        parameterPath: "certificateVersion",
        mapper: {
            required: true,
            serializedName: "certificate-version",
            type: {
                name: "String"
            }
        }
    };
    var includePending = {
        parameterPath: ["options", "includePending"],
        mapper: {
            serializedName: "includePending",
            type: {
                name: "Boolean"
            }
        }
    };
    var issuerName = {
        parameterPath: "issuerName",
        mapper: {
            required: true,
            serializedName: "issuer-name",
            type: {
                name: "String"
            }
        }
    };
    var keyName0 = {
        parameterPath: "keyName",
        mapper: {
            required: true,
            serializedName: "key-name",
            constraints: {
                Pattern: /^[0-9a-zA-Z-]+$/
            },
            type: {
                name: "String"
            }
        }
    };
    var keyName1 = {
        parameterPath: "keyName",
        mapper: {
            required: true,
            serializedName: "key-name",
            type: {
                name: "String"
            }
        }
    };
    var keyVersion = {
        parameterPath: "keyVersion",
        mapper: {
            required: true,
            serializedName: "key-version",
            type: {
                name: "String"
            }
        }
    };
    var maxresults = {
        parameterPath: ["options", "maxresults"],
        mapper: {
            serializedName: "maxresults",
            constraints: {
                InclusiveMaximum: 25,
                InclusiveMinimum: 1
            },
            type: {
                name: "Number"
            }
        }
    };
    var sasDefinitionName = {
        parameterPath: "sasDefinitionName",
        mapper: {
            required: true,
            serializedName: "sas-definition-name",
            constraints: {
                Pattern: /^[0-9a-zA-Z]+$/
            },
            type: {
                name: "String"
            }
        }
    };
    var secretName0 = {
        parameterPath: "secretName",
        mapper: {
            required: true,
            serializedName: "secret-name",
            constraints: {
                Pattern: /^[0-9a-zA-Z-]+$/
            },
            type: {
                name: "String"
            }
        }
    };
    var secretName1 = {
        parameterPath: "secretName",
        mapper: {
            required: true,
            serializedName: "secret-name",
            type: {
                name: "String"
            }
        }
    };
    var secretVersion = {
        parameterPath: "secretVersion",
        mapper: {
            required: true,
            serializedName: "secret-version",
            type: {
                name: "String"
            }
        }
    };
    var storageAccountName0 = {
        parameterPath: "storageAccountName",
        mapper: {
            required: true,
            serializedName: "storage-account-name",
            constraints: {
                Pattern: /^[0-9a-zA-Z]+$/
            },
            type: {
                name: "String"
            }
        }
    };
    var storageAccountName1 = {
        parameterPath: "storageAccountName",
        mapper: {
            required: true,
            serializedName: "storage-account-name",
            type: {
                name: "String"
            }
        }
    };
    var vaultBaseUrl = {
        parameterPath: "vaultBaseUrl",
        mapper: {
            required: true,
            serializedName: "vaultBaseUrl",
            defaultValue: "",
            type: {
                name: "String"
            }
        },
        skipEncoding: true
    };

    /*
     * Copyright (c) Microsoft Corporation. All rights reserved.
     * Licensed under the MIT License. See License.txt in the project root for
     * license information.
     *
     * Code generated by Microsoft (R) AutoRest Code Generator.
     * Changes may cause incorrect behavior and will be lost if the code is
     * regenerated.
     */
    var packageName = "@azure/keyvault-secrets";
    var packageVersion = "4.0.3";
    var KeyVaultClientContext = /** @class */ (function (_super) {
        __extends(KeyVaultClientContext, _super);
        /**
         * Initializes a new instance of the KeyVaultClientContext class.
         * @param apiVersion Client API version.
         * @param credentials Subscription credentials which uniquely identify client subscription.
         * @param [options] The parameter options
         */
        function KeyVaultClientContext(credentials, apiVersion, options) {
            var _this = this;
            if (apiVersion == undefined) {
                throw new Error("'apiVersion' cannot be null.");
            }
            if (credentials == undefined) {
                throw new Error("'credentials' cannot be null.");
            }
            if (!options) {
                options = {};
            }
            if (!options.userAgent) {
                var defaultUserAgent = getDefaultUserAgentValue();
                options.userAgent = packageName + "/" + packageVersion + " " + defaultUserAgent;
            }
            _this = _super.call(this, credentials, options) || this;
            _this.baseUri = "{vaultBaseUrl}";
            _this.requestContentType = "application/json; charset=utf-8";
            _this.apiVersion = apiVersion;
            _this.credentials = credentials;
            return _this;
        }
        return KeyVaultClientContext;
    }(ServiceClient));

    /*
     * Copyright (c) Microsoft Corporation. All rights reserved.
     * Licensed under the MIT License. See License.txt in the project root for
     * license information.
     *
     * Code generated by Microsoft (R) AutoRest Code Generator.
     * Changes may cause incorrect behavior and will be lost if the code is
     * regenerated.
     */
    var KeyVaultClient = /** @class */ (function (_super) {
        __extends(KeyVaultClient, _super);
        /**
         * Initializes a new instance of the KeyVaultClient class.
         * @param apiVersion Client API version.
         * @param credentials Subscription credentials which uniquely identify client subscription.
         * @param [options] The parameter options
         */
        function KeyVaultClient(credentials, apiVersion, options) {
            return _super.call(this, credentials, apiVersion, options) || this;
        }
        KeyVaultClient.prototype.createKey = function (vaultBaseUrl, keyName, kty, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                keyName: keyName,
                kty: kty,
                options: options
            }, createKeyOperationSpec, callback);
        };
        KeyVaultClient.prototype.importKey = function (vaultBaseUrl, keyName, key, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                keyName: keyName,
                key: key,
                options: options
            }, importKeyOperationSpec, callback);
        };
        KeyVaultClient.prototype.deleteKey = function (vaultBaseUrl, keyName, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                keyName: keyName,
                options: options
            }, deleteKeyOperationSpec, callback);
        };
        KeyVaultClient.prototype.updateKey = function (vaultBaseUrl, keyName, keyVersion, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                keyName: keyName,
                keyVersion: keyVersion,
                options: options
            }, updateKeyOperationSpec, callback);
        };
        KeyVaultClient.prototype.getKey = function (vaultBaseUrl, keyName, keyVersion, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                keyName: keyName,
                keyVersion: keyVersion,
                options: options
            }, getKeyOperationSpec, callback);
        };
        KeyVaultClient.prototype.getKeyVersions = function (vaultBaseUrl, keyName, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                keyName: keyName,
                options: options
            }, getKeyVersionsOperationSpec, callback);
        };
        KeyVaultClient.prototype.getKeys = function (vaultBaseUrl, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                options: options
            }, getKeysOperationSpec, callback);
        };
        KeyVaultClient.prototype.backupKey = function (vaultBaseUrl, keyName, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                keyName: keyName,
                options: options
            }, backupKeyOperationSpec, callback);
        };
        KeyVaultClient.prototype.restoreKey = function (vaultBaseUrl, keyBundleBackup, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                keyBundleBackup: keyBundleBackup,
                options: options
            }, restoreKeyOperationSpec, callback);
        };
        KeyVaultClient.prototype.encrypt = function (vaultBaseUrl, keyName, keyVersion, algorithm, value, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                keyName: keyName,
                keyVersion: keyVersion,
                algorithm: algorithm,
                value: value,
                options: options
            }, encryptOperationSpec, callback);
        };
        KeyVaultClient.prototype.decrypt = function (vaultBaseUrl, keyName, keyVersion, algorithm, value, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                keyName: keyName,
                keyVersion: keyVersion,
                algorithm: algorithm,
                value: value,
                options: options
            }, decryptOperationSpec, callback);
        };
        KeyVaultClient.prototype.sign = function (vaultBaseUrl, keyName, keyVersion, algorithm, value, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                keyName: keyName,
                keyVersion: keyVersion,
                algorithm: algorithm,
                value: value,
                options: options
            }, signOperationSpec, callback);
        };
        KeyVaultClient.prototype.verify = function (vaultBaseUrl, keyName, keyVersion, algorithm, digest, signature, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                keyName: keyName,
                keyVersion: keyVersion,
                algorithm: algorithm,
                digest: digest,
                signature: signature,
                options: options
            }, verifyOperationSpec, callback);
        };
        KeyVaultClient.prototype.wrapKey = function (vaultBaseUrl, keyName, keyVersion, algorithm, value, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                keyName: keyName,
                keyVersion: keyVersion,
                algorithm: algorithm,
                value: value,
                options: options
            }, wrapKeyOperationSpec, callback);
        };
        KeyVaultClient.prototype.unwrapKey = function (vaultBaseUrl, keyName, keyVersion, algorithm, value, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                keyName: keyName,
                keyVersion: keyVersion,
                algorithm: algorithm,
                value: value,
                options: options
            }, unwrapKeyOperationSpec, callback);
        };
        KeyVaultClient.prototype.getDeletedKeys = function (vaultBaseUrl, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                options: options
            }, getDeletedKeysOperationSpec, callback);
        };
        KeyVaultClient.prototype.getDeletedKey = function (vaultBaseUrl, keyName, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                keyName: keyName,
                options: options
            }, getDeletedKeyOperationSpec, callback);
        };
        KeyVaultClient.prototype.purgeDeletedKey = function (vaultBaseUrl, keyName, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                keyName: keyName,
                options: options
            }, purgeDeletedKeyOperationSpec, callback);
        };
        KeyVaultClient.prototype.recoverDeletedKey = function (vaultBaseUrl, keyName, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                keyName: keyName,
                options: options
            }, recoverDeletedKeyOperationSpec, callback);
        };
        KeyVaultClient.prototype.setSecret = function (vaultBaseUrl, secretName, value, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                secretName: secretName,
                value: value,
                options: options
            }, setSecretOperationSpec, callback);
        };
        KeyVaultClient.prototype.deleteSecret = function (vaultBaseUrl, secretName, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                secretName: secretName,
                options: options
            }, deleteSecretOperationSpec, callback);
        };
        KeyVaultClient.prototype.updateSecret = function (vaultBaseUrl, secretName, secretVersion, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                secretName: secretName,
                secretVersion: secretVersion,
                options: options
            }, updateSecretOperationSpec, callback);
        };
        KeyVaultClient.prototype.getSecret = function (vaultBaseUrl, secretName, secretVersion, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                secretName: secretName,
                secretVersion: secretVersion,
                options: options
            }, getSecretOperationSpec, callback);
        };
        KeyVaultClient.prototype.getSecrets = function (vaultBaseUrl, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                options: options
            }, getSecretsOperationSpec, callback);
        };
        KeyVaultClient.prototype.getSecretVersions = function (vaultBaseUrl, secretName, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                secretName: secretName,
                options: options
            }, getSecretVersionsOperationSpec, callback);
        };
        KeyVaultClient.prototype.getDeletedSecrets = function (vaultBaseUrl, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                options: options
            }, getDeletedSecretsOperationSpec, callback);
        };
        KeyVaultClient.prototype.getDeletedSecret = function (vaultBaseUrl, secretName, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                secretName: secretName,
                options: options
            }, getDeletedSecretOperationSpec, callback);
        };
        KeyVaultClient.prototype.purgeDeletedSecret = function (vaultBaseUrl, secretName, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                secretName: secretName,
                options: options
            }, purgeDeletedSecretOperationSpec, callback);
        };
        KeyVaultClient.prototype.recoverDeletedSecret = function (vaultBaseUrl, secretName, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                secretName: secretName,
                options: options
            }, recoverDeletedSecretOperationSpec, callback);
        };
        KeyVaultClient.prototype.backupSecret = function (vaultBaseUrl, secretName, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                secretName: secretName,
                options: options
            }, backupSecretOperationSpec, callback);
        };
        KeyVaultClient.prototype.restoreSecret = function (vaultBaseUrl, secretBundleBackup, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                secretBundleBackup: secretBundleBackup,
                options: options
            }, restoreSecretOperationSpec, callback);
        };
        KeyVaultClient.prototype.getCertificates = function (vaultBaseUrl, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                options: options
            }, getCertificatesOperationSpec, callback);
        };
        KeyVaultClient.prototype.deleteCertificate = function (vaultBaseUrl, certificateName, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                certificateName: certificateName,
                options: options
            }, deleteCertificateOperationSpec, callback);
        };
        KeyVaultClient.prototype.setCertificateContacts = function (vaultBaseUrl, contacts, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                contacts: contacts,
                options: options
            }, setCertificateContactsOperationSpec, callback);
        };
        KeyVaultClient.prototype.getCertificateContacts = function (vaultBaseUrl, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                options: options
            }, getCertificateContactsOperationSpec, callback);
        };
        KeyVaultClient.prototype.deleteCertificateContacts = function (vaultBaseUrl, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                options: options
            }, deleteCertificateContactsOperationSpec, callback);
        };
        KeyVaultClient.prototype.getCertificateIssuers = function (vaultBaseUrl, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                options: options
            }, getCertificateIssuersOperationSpec, callback);
        };
        KeyVaultClient.prototype.setCertificateIssuer = function (vaultBaseUrl, issuerName, provider, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                issuerName: issuerName,
                provider: provider,
                options: options
            }, setCertificateIssuerOperationSpec, callback);
        };
        KeyVaultClient.prototype.updateCertificateIssuer = function (vaultBaseUrl, issuerName, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                issuerName: issuerName,
                options: options
            }, updateCertificateIssuerOperationSpec, callback);
        };
        KeyVaultClient.prototype.getCertificateIssuer = function (vaultBaseUrl, issuerName, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                issuerName: issuerName,
                options: options
            }, getCertificateIssuerOperationSpec, callback);
        };
        KeyVaultClient.prototype.deleteCertificateIssuer = function (vaultBaseUrl, issuerName, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                issuerName: issuerName,
                options: options
            }, deleteCertificateIssuerOperationSpec, callback);
        };
        KeyVaultClient.prototype.createCertificate = function (vaultBaseUrl, certificateName, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                certificateName: certificateName,
                options: options
            }, createCertificateOperationSpec, callback);
        };
        KeyVaultClient.prototype.importCertificate = function (vaultBaseUrl, certificateName, base64EncodedCertificate, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                certificateName: certificateName,
                base64EncodedCertificate: base64EncodedCertificate,
                options: options
            }, importCertificateOperationSpec, callback);
        };
        KeyVaultClient.prototype.getCertificateVersions = function (vaultBaseUrl, certificateName, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                certificateName: certificateName,
                options: options
            }, getCertificateVersionsOperationSpec, callback);
        };
        KeyVaultClient.prototype.getCertificatePolicy = function (vaultBaseUrl, certificateName, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                certificateName: certificateName,
                options: options
            }, getCertificatePolicyOperationSpec, callback);
        };
        KeyVaultClient.prototype.updateCertificatePolicy = function (vaultBaseUrl, certificateName, certificatePolicy, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                certificateName: certificateName,
                certificatePolicy: certificatePolicy,
                options: options
            }, updateCertificatePolicyOperationSpec, callback);
        };
        KeyVaultClient.prototype.updateCertificate = function (vaultBaseUrl, certificateName, certificateVersion, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                certificateName: certificateName,
                certificateVersion: certificateVersion,
                options: options
            }, updateCertificateOperationSpec, callback);
        };
        KeyVaultClient.prototype.getCertificate = function (vaultBaseUrl, certificateName, certificateVersion, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                certificateName: certificateName,
                certificateVersion: certificateVersion,
                options: options
            }, getCertificateOperationSpec, callback);
        };
        KeyVaultClient.prototype.updateCertificateOperation = function (vaultBaseUrl, certificateName, cancellationRequested, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                certificateName: certificateName,
                cancellationRequested: cancellationRequested,
                options: options
            }, updateCertificateOperationOperationSpec, callback);
        };
        KeyVaultClient.prototype.getCertificateOperation = function (vaultBaseUrl, certificateName, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                certificateName: certificateName,
                options: options
            }, getCertificateOperationOperationSpec, callback);
        };
        KeyVaultClient.prototype.deleteCertificateOperation = function (vaultBaseUrl, certificateName, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                certificateName: certificateName,
                options: options
            }, deleteCertificateOperationOperationSpec, callback);
        };
        KeyVaultClient.prototype.mergeCertificate = function (vaultBaseUrl, certificateName, x509Certificates, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                certificateName: certificateName,
                x509Certificates: x509Certificates,
                options: options
            }, mergeCertificateOperationSpec, callback);
        };
        KeyVaultClient.prototype.backupCertificate = function (vaultBaseUrl, certificateName, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                certificateName: certificateName,
                options: options
            }, backupCertificateOperationSpec, callback);
        };
        KeyVaultClient.prototype.restoreCertificate = function (vaultBaseUrl, certificateBundleBackup, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                certificateBundleBackup: certificateBundleBackup,
                options: options
            }, restoreCertificateOperationSpec, callback);
        };
        KeyVaultClient.prototype.getDeletedCertificates = function (vaultBaseUrl, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                options: options
            }, getDeletedCertificatesOperationSpec, callback);
        };
        KeyVaultClient.prototype.getDeletedCertificate = function (vaultBaseUrl, certificateName, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                certificateName: certificateName,
                options: options
            }, getDeletedCertificateOperationSpec, callback);
        };
        KeyVaultClient.prototype.purgeDeletedCertificate = function (vaultBaseUrl, certificateName, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                certificateName: certificateName,
                options: options
            }, purgeDeletedCertificateOperationSpec, callback);
        };
        KeyVaultClient.prototype.recoverDeletedCertificate = function (vaultBaseUrl, certificateName, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                certificateName: certificateName,
                options: options
            }, recoverDeletedCertificateOperationSpec, callback);
        };
        KeyVaultClient.prototype.getStorageAccounts = function (vaultBaseUrl, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                options: options
            }, getStorageAccountsOperationSpec, callback);
        };
        KeyVaultClient.prototype.getDeletedStorageAccounts = function (vaultBaseUrl, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                options: options
            }, getDeletedStorageAccountsOperationSpec, callback);
        };
        KeyVaultClient.prototype.getDeletedStorageAccount = function (vaultBaseUrl, storageAccountName, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                storageAccountName: storageAccountName,
                options: options
            }, getDeletedStorageAccountOperationSpec, callback);
        };
        KeyVaultClient.prototype.purgeDeletedStorageAccount = function (vaultBaseUrl, storageAccountName, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                storageAccountName: storageAccountName,
                options: options
            }, purgeDeletedStorageAccountOperationSpec, callback);
        };
        KeyVaultClient.prototype.recoverDeletedStorageAccount = function (vaultBaseUrl, storageAccountName, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                storageAccountName: storageAccountName,
                options: options
            }, recoverDeletedStorageAccountOperationSpec, callback);
        };
        KeyVaultClient.prototype.backupStorageAccount = function (vaultBaseUrl, storageAccountName, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                storageAccountName: storageAccountName,
                options: options
            }, backupStorageAccountOperationSpec, callback);
        };
        KeyVaultClient.prototype.restoreStorageAccount = function (vaultBaseUrl, storageBundleBackup, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                storageBundleBackup: storageBundleBackup,
                options: options
            }, restoreStorageAccountOperationSpec, callback);
        };
        KeyVaultClient.prototype.deleteStorageAccount = function (vaultBaseUrl, storageAccountName, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                storageAccountName: storageAccountName,
                options: options
            }, deleteStorageAccountOperationSpec, callback);
        };
        KeyVaultClient.prototype.getStorageAccount = function (vaultBaseUrl, storageAccountName, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                storageAccountName: storageAccountName,
                options: options
            }, getStorageAccountOperationSpec, callback);
        };
        KeyVaultClient.prototype.setStorageAccount = function (vaultBaseUrl, storageAccountName, resourceId, activeKeyName, autoRegenerateKey, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                storageAccountName: storageAccountName,
                resourceId: resourceId,
                activeKeyName: activeKeyName,
                autoRegenerateKey: autoRegenerateKey,
                options: options
            }, setStorageAccountOperationSpec, callback);
        };
        KeyVaultClient.prototype.updateStorageAccount = function (vaultBaseUrl, storageAccountName, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                storageAccountName: storageAccountName,
                options: options
            }, updateStorageAccountOperationSpec, callback);
        };
        KeyVaultClient.prototype.regenerateStorageAccountKey = function (vaultBaseUrl, storageAccountName, keyName, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                storageAccountName: storageAccountName,
                keyName: keyName,
                options: options
            }, regenerateStorageAccountKeyOperationSpec, callback);
        };
        KeyVaultClient.prototype.getSasDefinitions = function (vaultBaseUrl, storageAccountName, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                storageAccountName: storageAccountName,
                options: options
            }, getSasDefinitionsOperationSpec, callback);
        };
        KeyVaultClient.prototype.getDeletedSasDefinitions = function (vaultBaseUrl, storageAccountName, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                storageAccountName: storageAccountName,
                options: options
            }, getDeletedSasDefinitionsOperationSpec, callback);
        };
        KeyVaultClient.prototype.getDeletedSasDefinition = function (vaultBaseUrl, storageAccountName, sasDefinitionName, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                storageAccountName: storageAccountName,
                sasDefinitionName: sasDefinitionName,
                options: options
            }, getDeletedSasDefinitionOperationSpec, callback);
        };
        KeyVaultClient.prototype.recoverDeletedSasDefinition = function (vaultBaseUrl, storageAccountName, sasDefinitionName, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                storageAccountName: storageAccountName,
                sasDefinitionName: sasDefinitionName,
                options: options
            }, recoverDeletedSasDefinitionOperationSpec, callback);
        };
        KeyVaultClient.prototype.deleteSasDefinition = function (vaultBaseUrl, storageAccountName, sasDefinitionName, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                storageAccountName: storageAccountName,
                sasDefinitionName: sasDefinitionName,
                options: options
            }, deleteSasDefinitionOperationSpec, callback);
        };
        KeyVaultClient.prototype.getSasDefinition = function (vaultBaseUrl, storageAccountName, sasDefinitionName, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                storageAccountName: storageAccountName,
                sasDefinitionName: sasDefinitionName,
                options: options
            }, getSasDefinitionOperationSpec, callback);
        };
        KeyVaultClient.prototype.setSasDefinition = function (vaultBaseUrl, storageAccountName, sasDefinitionName, templateUri, sasType, validityPeriod, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                storageAccountName: storageAccountName,
                sasDefinitionName: sasDefinitionName,
                templateUri: templateUri,
                sasType: sasType,
                validityPeriod: validityPeriod,
                options: options
            }, setSasDefinitionOperationSpec, callback);
        };
        KeyVaultClient.prototype.updateSasDefinition = function (vaultBaseUrl, storageAccountName, sasDefinitionName, options, callback) {
            return this.sendOperationRequest({
                vaultBaseUrl: vaultBaseUrl,
                storageAccountName: storageAccountName,
                sasDefinitionName: sasDefinitionName,
                options: options
            }, updateSasDefinitionOperationSpec, callback);
        };
        return KeyVaultClient;
    }(KeyVaultClientContext));
    // Operation Specifications
    var serializer$1 = new Serializer(Mappers);
    var createKeyOperationSpec = {
        httpMethod: "POST",
        path: "keys/{key-name}/create",
        urlParameters: [vaultBaseUrl, keyName0],
        queryParameters: [apiVersion],
        requestBody: {
            parameterPath: {
                kty: "kty",
                keySize: ["options", "keySize"],
                keyOps: ["options", "keyOps"],
                keyAttributes: ["options", "keyAttributes"],
                tags: ["options", "tags"],
                curve: ["options", "curve"]
            },
            mapper: __assign(__assign({}, KeyCreateParameters), { required: true })
        },
        responses: {
            200: {
                bodyMapper: KeyBundle
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var importKeyOperationSpec = {
        httpMethod: "PUT",
        path: "keys/{key-name}",
        urlParameters: [vaultBaseUrl, keyName0],
        queryParameters: [apiVersion],
        requestBody: {
            parameterPath: {
                hsm: ["options", "hsm"],
                key: "key",
                keyAttributes: ["options", "keyAttributes"],
                tags: ["options", "tags"]
            },
            mapper: __assign(__assign({}, KeyImportParameters), { required: true })
        },
        responses: {
            200: {
                bodyMapper: KeyBundle
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var deleteKeyOperationSpec = {
        httpMethod: "DELETE",
        path: "keys/{key-name}",
        urlParameters: [vaultBaseUrl, keyName1],
        queryParameters: [apiVersion],
        responses: {
            200: {
                bodyMapper: DeletedKeyBundle
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var updateKeyOperationSpec = {
        httpMethod: "PATCH",
        path: "keys/{key-name}/{key-version}",
        urlParameters: [vaultBaseUrl, keyName1, keyVersion],
        queryParameters: [apiVersion],
        requestBody: {
            parameterPath: {
                keyOps: ["options", "keyOps"],
                keyAttributes: ["options", "keyAttributes"],
                tags: ["options", "tags"]
            },
            mapper: __assign(__assign({}, KeyUpdateParameters), { required: true })
        },
        responses: {
            200: {
                bodyMapper: KeyBundle
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var getKeyOperationSpec = {
        httpMethod: "GET",
        path: "keys/{key-name}/{key-version}",
        urlParameters: [vaultBaseUrl, keyName1, keyVersion],
        queryParameters: [apiVersion],
        responses: {
            200: {
                bodyMapper: KeyBundle
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var getKeyVersionsOperationSpec = {
        httpMethod: "GET",
        path: "keys/{key-name}/versions",
        urlParameters: [vaultBaseUrl, keyName1],
        queryParameters: [maxresults, apiVersion],
        responses: {
            200: {
                bodyMapper: KeyListResult
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var getKeysOperationSpec = {
        httpMethod: "GET",
        path: "keys",
        urlParameters: [vaultBaseUrl],
        queryParameters: [maxresults, apiVersion],
        responses: {
            200: {
                bodyMapper: KeyListResult
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var backupKeyOperationSpec = {
        httpMethod: "POST",
        path: "keys/{key-name}/backup",
        urlParameters: [vaultBaseUrl, keyName1],
        queryParameters: [apiVersion],
        responses: {
            200: {
                bodyMapper: BackupKeyResult
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var restoreKeyOperationSpec = {
        httpMethod: "POST",
        path: "keys/restore",
        urlParameters: [vaultBaseUrl],
        queryParameters: [apiVersion],
        requestBody: {
            parameterPath: {
                keyBundleBackup: "keyBundleBackup"
            },
            mapper: __assign(__assign({}, KeyRestoreParameters), { required: true })
        },
        responses: {
            200: {
                bodyMapper: KeyBundle
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var encryptOperationSpec = {
        httpMethod: "POST",
        path: "keys/{key-name}/{key-version}/encrypt",
        urlParameters: [vaultBaseUrl, keyName1, keyVersion],
        queryParameters: [apiVersion],
        requestBody: {
            parameterPath: {
                algorithm: "algorithm",
                value: "value"
            },
            mapper: __assign(__assign({}, KeyOperationsParameters), { required: true })
        },
        responses: {
            200: {
                bodyMapper: KeyOperationResult
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var decryptOperationSpec = {
        httpMethod: "POST",
        path: "keys/{key-name}/{key-version}/decrypt",
        urlParameters: [vaultBaseUrl, keyName1, keyVersion],
        queryParameters: [apiVersion],
        requestBody: {
            parameterPath: {
                algorithm: "algorithm",
                value: "value"
            },
            mapper: __assign(__assign({}, KeyOperationsParameters), { required: true })
        },
        responses: {
            200: {
                bodyMapper: KeyOperationResult
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var signOperationSpec = {
        httpMethod: "POST",
        path: "keys/{key-name}/{key-version}/sign",
        urlParameters: [vaultBaseUrl, keyName1, keyVersion],
        queryParameters: [apiVersion],
        requestBody: {
            parameterPath: {
                algorithm: "algorithm",
                value: "value"
            },
            mapper: __assign(__assign({}, KeySignParameters), { required: true })
        },
        responses: {
            200: {
                bodyMapper: KeyOperationResult
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var verifyOperationSpec = {
        httpMethod: "POST",
        path: "keys/{key-name}/{key-version}/verify",
        urlParameters: [vaultBaseUrl, keyName1, keyVersion],
        queryParameters: [apiVersion],
        requestBody: {
            parameterPath: {
                algorithm: "algorithm",
                digest: "digest",
                signature: "signature"
            },
            mapper: __assign(__assign({}, KeyVerifyParameters), { required: true })
        },
        responses: {
            200: {
                bodyMapper: KeyVerifyResult
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var wrapKeyOperationSpec = {
        httpMethod: "POST",
        path: "keys/{key-name}/{key-version}/wrapkey",
        urlParameters: [vaultBaseUrl, keyName1, keyVersion],
        queryParameters: [apiVersion],
        requestBody: {
            parameterPath: {
                algorithm: "algorithm",
                value: "value"
            },
            mapper: __assign(__assign({}, KeyOperationsParameters), { required: true })
        },
        responses: {
            200: {
                bodyMapper: KeyOperationResult
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var unwrapKeyOperationSpec = {
        httpMethod: "POST",
        path: "keys/{key-name}/{key-version}/unwrapkey",
        urlParameters: [vaultBaseUrl, keyName1, keyVersion],
        queryParameters: [apiVersion],
        requestBody: {
            parameterPath: {
                algorithm: "algorithm",
                value: "value"
            },
            mapper: __assign(__assign({}, KeyOperationsParameters), { required: true })
        },
        responses: {
            200: {
                bodyMapper: KeyOperationResult
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var getDeletedKeysOperationSpec = {
        httpMethod: "GET",
        path: "deletedkeys",
        urlParameters: [vaultBaseUrl],
        queryParameters: [maxresults, apiVersion],
        responses: {
            200: {
                bodyMapper: DeletedKeyListResult
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var getDeletedKeyOperationSpec = {
        httpMethod: "GET",
        path: "deletedkeys/{key-name}",
        urlParameters: [vaultBaseUrl, keyName1],
        queryParameters: [apiVersion],
        responses: {
            200: {
                bodyMapper: DeletedKeyBundle
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var purgeDeletedKeyOperationSpec = {
        httpMethod: "DELETE",
        path: "deletedkeys/{key-name}",
        urlParameters: [vaultBaseUrl, keyName1],
        queryParameters: [apiVersion],
        responses: {
            204: {},
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var recoverDeletedKeyOperationSpec = {
        httpMethod: "POST",
        path: "deletedkeys/{key-name}/recover",
        urlParameters: [vaultBaseUrl, keyName1],
        queryParameters: [apiVersion],
        responses: {
            200: {
                bodyMapper: KeyBundle
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var setSecretOperationSpec = {
        httpMethod: "PUT",
        path: "secrets/{secret-name}",
        urlParameters: [vaultBaseUrl, secretName0],
        queryParameters: [apiVersion],
        requestBody: {
            parameterPath: {
                value: "value",
                tags: ["options", "tags"],
                contentType: ["options", "contentType"],
                secretAttributes: ["options", "secretAttributes"]
            },
            mapper: __assign(__assign({}, SecretSetParameters), { required: true })
        },
        responses: {
            200: {
                bodyMapper: SecretBundle
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var deleteSecretOperationSpec = {
        httpMethod: "DELETE",
        path: "secrets/{secret-name}",
        urlParameters: [vaultBaseUrl, secretName1],
        queryParameters: [apiVersion],
        responses: {
            200: {
                bodyMapper: DeletedSecretBundle
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var updateSecretOperationSpec = {
        httpMethod: "PATCH",
        path: "secrets/{secret-name}/{secret-version}",
        urlParameters: [vaultBaseUrl, secretName1, secretVersion],
        queryParameters: [apiVersion],
        requestBody: {
            parameterPath: {
                contentType: ["options", "contentType"],
                secretAttributes: ["options", "secretAttributes"],
                tags: ["options", "tags"]
            },
            mapper: __assign(__assign({}, SecretUpdateParameters), { required: true })
        },
        responses: {
            200: {
                bodyMapper: SecretBundle
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var getSecretOperationSpec = {
        httpMethod: "GET",
        path: "secrets/{secret-name}/{secret-version}",
        urlParameters: [vaultBaseUrl, secretName1, secretVersion],
        queryParameters: [apiVersion],
        responses: {
            200: {
                bodyMapper: SecretBundle
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var getSecretsOperationSpec = {
        httpMethod: "GET",
        path: "secrets",
        urlParameters: [vaultBaseUrl],
        queryParameters: [maxresults, apiVersion],
        responses: {
            200: {
                bodyMapper: SecretListResult
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var getSecretVersionsOperationSpec = {
        httpMethod: "GET",
        path: "secrets/{secret-name}/versions",
        urlParameters: [vaultBaseUrl, secretName1],
        queryParameters: [maxresults, apiVersion],
        responses: {
            200: {
                bodyMapper: SecretListResult
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var getDeletedSecretsOperationSpec = {
        httpMethod: "GET",
        path: "deletedsecrets",
        urlParameters: [vaultBaseUrl],
        queryParameters: [maxresults, apiVersion],
        responses: {
            200: {
                bodyMapper: DeletedSecretListResult
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var getDeletedSecretOperationSpec = {
        httpMethod: "GET",
        path: "deletedsecrets/{secret-name}",
        urlParameters: [vaultBaseUrl, secretName1],
        queryParameters: [apiVersion],
        responses: {
            200: {
                bodyMapper: DeletedSecretBundle
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var purgeDeletedSecretOperationSpec = {
        httpMethod: "DELETE",
        path: "deletedsecrets/{secret-name}",
        urlParameters: [vaultBaseUrl, secretName1],
        queryParameters: [apiVersion],
        responses: {
            204: {},
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var recoverDeletedSecretOperationSpec = {
        httpMethod: "POST",
        path: "deletedsecrets/{secret-name}/recover",
        urlParameters: [vaultBaseUrl, secretName1],
        queryParameters: [apiVersion],
        responses: {
            200: {
                bodyMapper: SecretBundle
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var backupSecretOperationSpec = {
        httpMethod: "POST",
        path: "secrets/{secret-name}/backup",
        urlParameters: [vaultBaseUrl, secretName1],
        queryParameters: [apiVersion],
        responses: {
            200: {
                bodyMapper: BackupSecretResult
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var restoreSecretOperationSpec = {
        httpMethod: "POST",
        path: "secrets/restore",
        urlParameters: [vaultBaseUrl],
        queryParameters: [apiVersion],
        requestBody: {
            parameterPath: {
                secretBundleBackup: "secretBundleBackup"
            },
            mapper: __assign(__assign({}, SecretRestoreParameters), { required: true })
        },
        responses: {
            200: {
                bodyMapper: SecretBundle
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var getCertificatesOperationSpec = {
        httpMethod: "GET",
        path: "certificates",
        urlParameters: [vaultBaseUrl],
        queryParameters: [maxresults, includePending, apiVersion],
        responses: {
            200: {
                bodyMapper: CertificateListResult
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var deleteCertificateOperationSpec = {
        httpMethod: "DELETE",
        path: "certificates/{certificate-name}",
        urlParameters: [vaultBaseUrl, certificateName0],
        queryParameters: [apiVersion],
        responses: {
            200: {
                bodyMapper: DeletedCertificateBundle
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var setCertificateContactsOperationSpec = {
        httpMethod: "PUT",
        path: "certificates/contacts",
        urlParameters: [vaultBaseUrl],
        queryParameters: [apiVersion],
        requestBody: {
            parameterPath: "contacts",
            mapper: __assign(__assign({}, Contacts), { required: true })
        },
        responses: {
            200: {
                bodyMapper: Contacts
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var getCertificateContactsOperationSpec = {
        httpMethod: "GET",
        path: "certificates/contacts",
        urlParameters: [vaultBaseUrl],
        queryParameters: [apiVersion],
        responses: {
            200: {
                bodyMapper: Contacts
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var deleteCertificateContactsOperationSpec = {
        httpMethod: "DELETE",
        path: "certificates/contacts",
        urlParameters: [vaultBaseUrl],
        queryParameters: [apiVersion],
        responses: {
            200: {
                bodyMapper: Contacts
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var getCertificateIssuersOperationSpec = {
        httpMethod: "GET",
        path: "certificates/issuers",
        urlParameters: [vaultBaseUrl],
        queryParameters: [maxresults, apiVersion],
        responses: {
            200: {
                bodyMapper: CertificateIssuerListResult
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var setCertificateIssuerOperationSpec = {
        httpMethod: "PUT",
        path: "certificates/issuers/{issuer-name}",
        urlParameters: [vaultBaseUrl, issuerName],
        queryParameters: [apiVersion],
        requestBody: {
            parameterPath: {
                provider: "provider",
                credentials: ["options", "credentials"],
                organizationDetails: ["options", "organizationDetails"],
                attributes: ["options", "attributes"]
            },
            mapper: __assign(__assign({}, CertificateIssuerSetParameters), { required: true })
        },
        responses: {
            200: {
                bodyMapper: IssuerBundle
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var updateCertificateIssuerOperationSpec = {
        httpMethod: "PATCH",
        path: "certificates/issuers/{issuer-name}",
        urlParameters: [vaultBaseUrl, issuerName],
        queryParameters: [apiVersion],
        requestBody: {
            parameterPath: {
                provider: ["options", "provider"],
                credentials: ["options", "credentials"],
                organizationDetails: ["options", "organizationDetails"],
                attributes: ["options", "attributes"]
            },
            mapper: __assign(__assign({}, CertificateIssuerUpdateParameters), { required: true })
        },
        responses: {
            200: {
                bodyMapper: IssuerBundle
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var getCertificateIssuerOperationSpec = {
        httpMethod: "GET",
        path: "certificates/issuers/{issuer-name}",
        urlParameters: [vaultBaseUrl, issuerName],
        queryParameters: [apiVersion],
        responses: {
            200: {
                bodyMapper: IssuerBundle
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var deleteCertificateIssuerOperationSpec = {
        httpMethod: "DELETE",
        path: "certificates/issuers/{issuer-name}",
        urlParameters: [vaultBaseUrl, issuerName],
        queryParameters: [apiVersion],
        responses: {
            200: {
                bodyMapper: IssuerBundle
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var createCertificateOperationSpec = {
        httpMethod: "POST",
        path: "certificates/{certificate-name}/create",
        urlParameters: [vaultBaseUrl, certificateName1],
        queryParameters: [apiVersion],
        requestBody: {
            parameterPath: {
                certificatePolicy: ["options", "certificatePolicy"],
                certificateAttributes: ["options", "certificateAttributes"],
                tags: ["options", "tags"]
            },
            mapper: __assign(__assign({}, CertificateCreateParameters), { required: true })
        },
        responses: {
            202: {
                bodyMapper: CertificateOperation
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var importCertificateOperationSpec = {
        httpMethod: "POST",
        path: "certificates/{certificate-name}/import",
        urlParameters: [vaultBaseUrl, certificateName1],
        queryParameters: [apiVersion],
        requestBody: {
            parameterPath: {
                base64EncodedCertificate: "base64EncodedCertificate",
                password: ["options", "password"],
                certificatePolicy: ["options", "certificatePolicy"],
                certificateAttributes: ["options", "certificateAttributes"],
                tags: ["options", "tags"]
            },
            mapper: __assign(__assign({}, CertificateImportParameters), { required: true })
        },
        responses: {
            200: {
                bodyMapper: CertificateBundle
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var getCertificateVersionsOperationSpec = {
        httpMethod: "GET",
        path: "certificates/{certificate-name}/versions",
        urlParameters: [vaultBaseUrl, certificateName0],
        queryParameters: [maxresults, apiVersion],
        responses: {
            200: {
                bodyMapper: CertificateListResult
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var getCertificatePolicyOperationSpec = {
        httpMethod: "GET",
        path: "certificates/{certificate-name}/policy",
        urlParameters: [vaultBaseUrl, certificateName0],
        queryParameters: [apiVersion],
        responses: {
            200: {
                bodyMapper: CertificatePolicy
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var updateCertificatePolicyOperationSpec = {
        httpMethod: "PATCH",
        path: "certificates/{certificate-name}/policy",
        urlParameters: [vaultBaseUrl, certificateName0],
        queryParameters: [apiVersion],
        requestBody: {
            parameterPath: "certificatePolicy",
            mapper: __assign(__assign({}, CertificatePolicy), { required: true })
        },
        responses: {
            200: {
                bodyMapper: CertificatePolicy
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var updateCertificateOperationSpec = {
        httpMethod: "PATCH",
        path: "certificates/{certificate-name}/{certificate-version}",
        urlParameters: [
            vaultBaseUrl,
            certificateName0,
            certificateVersion
        ],
        queryParameters: [apiVersion],
        requestBody: {
            parameterPath: {
                certificatePolicy: ["options", "certificatePolicy"],
                certificateAttributes: ["options", "certificateAttributes"],
                tags: ["options", "tags"]
            },
            mapper: __assign(__assign({}, CertificateUpdateParameters), { required: true })
        },
        responses: {
            200: {
                bodyMapper: CertificateBundle
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var getCertificateOperationSpec = {
        httpMethod: "GET",
        path: "certificates/{certificate-name}/{certificate-version}",
        urlParameters: [
            vaultBaseUrl,
            certificateName0,
            certificateVersion
        ],
        queryParameters: [apiVersion],
        responses: {
            200: {
                bodyMapper: CertificateBundle
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var updateCertificateOperationOperationSpec = {
        httpMethod: "PATCH",
        path: "certificates/{certificate-name}/pending",
        urlParameters: [vaultBaseUrl, certificateName0],
        queryParameters: [apiVersion],
        requestBody: {
            parameterPath: {
                cancellationRequested: "cancellationRequested"
            },
            mapper: __assign(__assign({}, CertificateOperationUpdateParameter), { required: true })
        },
        responses: {
            200: {
                bodyMapper: CertificateOperation
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var getCertificateOperationOperationSpec = {
        httpMethod: "GET",
        path: "certificates/{certificate-name}/pending",
        urlParameters: [vaultBaseUrl, certificateName0],
        queryParameters: [apiVersion],
        responses: {
            200: {
                bodyMapper: CertificateOperation
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var deleteCertificateOperationOperationSpec = {
        httpMethod: "DELETE",
        path: "certificates/{certificate-name}/pending",
        urlParameters: [vaultBaseUrl, certificateName0],
        queryParameters: [apiVersion],
        responses: {
            200: {
                bodyMapper: CertificateOperation
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var mergeCertificateOperationSpec = {
        httpMethod: "POST",
        path: "certificates/{certificate-name}/pending/merge",
        urlParameters: [vaultBaseUrl, certificateName0],
        queryParameters: [apiVersion],
        requestBody: {
            parameterPath: {
                x509Certificates: "x509Certificates",
                certificateAttributes: ["options", "certificateAttributes"],
                tags: ["options", "tags"]
            },
            mapper: __assign(__assign({}, CertificateMergeParameters), { required: true })
        },
        responses: {
            201: {
                bodyMapper: CertificateBundle
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var backupCertificateOperationSpec = {
        httpMethod: "POST",
        path: "certificates/{certificate-name}/backup",
        urlParameters: [vaultBaseUrl, certificateName0],
        queryParameters: [apiVersion],
        responses: {
            200: {
                bodyMapper: BackupCertificateResult
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var restoreCertificateOperationSpec = {
        httpMethod: "POST",
        path: "certificates/restore",
        urlParameters: [vaultBaseUrl],
        queryParameters: [apiVersion],
        requestBody: {
            parameterPath: {
                certificateBundleBackup: "certificateBundleBackup"
            },
            mapper: __assign(__assign({}, CertificateRestoreParameters), { required: true })
        },
        responses: {
            200: {
                bodyMapper: CertificateBundle
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var getDeletedCertificatesOperationSpec = {
        httpMethod: "GET",
        path: "deletedcertificates",
        urlParameters: [vaultBaseUrl],
        queryParameters: [maxresults, includePending, apiVersion],
        responses: {
            200: {
                bodyMapper: DeletedCertificateListResult
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var getDeletedCertificateOperationSpec = {
        httpMethod: "GET",
        path: "deletedcertificates/{certificate-name}",
        urlParameters: [vaultBaseUrl, certificateName0],
        queryParameters: [apiVersion],
        responses: {
            200: {
                bodyMapper: DeletedCertificateBundle
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var purgeDeletedCertificateOperationSpec = {
        httpMethod: "DELETE",
        path: "deletedcertificates/{certificate-name}",
        urlParameters: [vaultBaseUrl, certificateName0],
        queryParameters: [apiVersion],
        responses: {
            204: {},
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var recoverDeletedCertificateOperationSpec = {
        httpMethod: "POST",
        path: "deletedcertificates/{certificate-name}/recover",
        urlParameters: [vaultBaseUrl, certificateName0],
        queryParameters: [apiVersion],
        responses: {
            200: {
                bodyMapper: CertificateBundle
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var getStorageAccountsOperationSpec = {
        httpMethod: "GET",
        path: "storage",
        urlParameters: [vaultBaseUrl],
        queryParameters: [maxresults, apiVersion],
        responses: {
            200: {
                bodyMapper: StorageListResult
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var getDeletedStorageAccountsOperationSpec = {
        httpMethod: "GET",
        path: "deletedstorage",
        urlParameters: [vaultBaseUrl],
        queryParameters: [maxresults, apiVersion],
        responses: {
            200: {
                bodyMapper: DeletedStorageListResult
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var getDeletedStorageAccountOperationSpec = {
        httpMethod: "GET",
        path: "deletedstorage/{storage-account-name}",
        urlParameters: [vaultBaseUrl, storageAccountName0],
        queryParameters: [apiVersion],
        responses: {
            200: {
                bodyMapper: DeletedStorageBundle
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var purgeDeletedStorageAccountOperationSpec = {
        httpMethod: "DELETE",
        path: "deletedstorage/{storage-account-name}",
        urlParameters: [vaultBaseUrl, storageAccountName0],
        queryParameters: [apiVersion],
        responses: {
            204: {},
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var recoverDeletedStorageAccountOperationSpec = {
        httpMethod: "POST",
        path: "deletedstorage/{storage-account-name}/recover",
        urlParameters: [vaultBaseUrl, storageAccountName0],
        queryParameters: [apiVersion],
        responses: {
            200: {
                bodyMapper: StorageBundle
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var backupStorageAccountOperationSpec = {
        httpMethod: "POST",
        path: "storage/{storage-account-name}/backup",
        urlParameters: [vaultBaseUrl, storageAccountName1],
        queryParameters: [apiVersion],
        responses: {
            200: {
                bodyMapper: BackupStorageResult
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var restoreStorageAccountOperationSpec = {
        httpMethod: "POST",
        path: "storage/restore",
        urlParameters: [vaultBaseUrl],
        queryParameters: [apiVersion],
        requestBody: {
            parameterPath: {
                storageBundleBackup: "storageBundleBackup"
            },
            mapper: __assign(__assign({}, StorageRestoreParameters), { required: true })
        },
        responses: {
            200: {
                bodyMapper: StorageBundle
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var deleteStorageAccountOperationSpec = {
        httpMethod: "DELETE",
        path: "storage/{storage-account-name}",
        urlParameters: [vaultBaseUrl, storageAccountName0],
        queryParameters: [apiVersion],
        responses: {
            200: {
                bodyMapper: DeletedStorageBundle
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var getStorageAccountOperationSpec = {
        httpMethod: "GET",
        path: "storage/{storage-account-name}",
        urlParameters: [vaultBaseUrl, storageAccountName0],
        queryParameters: [apiVersion],
        responses: {
            200: {
                bodyMapper: StorageBundle
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var setStorageAccountOperationSpec = {
        httpMethod: "PUT",
        path: "storage/{storage-account-name}",
        urlParameters: [vaultBaseUrl, storageAccountName0],
        queryParameters: [apiVersion],
        requestBody: {
            parameterPath: {
                resourceId: "resourceId",
                activeKeyName: "activeKeyName",
                autoRegenerateKey: "autoRegenerateKey",
                regenerationPeriod: ["options", "regenerationPeriod"],
                storageAccountAttributes: ["options", "storageAccountAttributes"],
                tags: ["options", "tags"]
            },
            mapper: __assign(__assign({}, StorageAccountCreateParameters), { required: true })
        },
        responses: {
            200: {
                bodyMapper: StorageBundle
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var updateStorageAccountOperationSpec = {
        httpMethod: "PATCH",
        path: "storage/{storage-account-name}",
        urlParameters: [vaultBaseUrl, storageAccountName0],
        queryParameters: [apiVersion],
        requestBody: {
            parameterPath: {
                activeKeyName: ["options", "activeKeyName"],
                autoRegenerateKey: ["options", "autoRegenerateKey"],
                regenerationPeriod: ["options", "regenerationPeriod"],
                storageAccountAttributes: ["options", "storageAccountAttributes"],
                tags: ["options", "tags"]
            },
            mapper: __assign(__assign({}, StorageAccountUpdateParameters), { required: true })
        },
        responses: {
            200: {
                bodyMapper: StorageBundle
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var regenerateStorageAccountKeyOperationSpec = {
        httpMethod: "POST",
        path: "storage/{storage-account-name}/regeneratekey",
        urlParameters: [vaultBaseUrl, storageAccountName0],
        queryParameters: [apiVersion],
        requestBody: {
            parameterPath: {
                keyName: "keyName"
            },
            mapper: __assign(__assign({}, StorageAccountRegenerteKeyParameters), { required: true })
        },
        responses: {
            200: {
                bodyMapper: StorageBundle
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var getSasDefinitionsOperationSpec = {
        httpMethod: "GET",
        path: "storage/{storage-account-name}/sas",
        urlParameters: [vaultBaseUrl, storageAccountName0],
        queryParameters: [maxresults, apiVersion],
        responses: {
            200: {
                bodyMapper: SasDefinitionListResult
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var getDeletedSasDefinitionsOperationSpec = {
        httpMethod: "GET",
        path: "deletedstorage/{storage-account-name}/sas",
        urlParameters: [vaultBaseUrl, storageAccountName0],
        queryParameters: [maxresults, apiVersion],
        responses: {
            200: {
                bodyMapper: DeletedSasDefinitionListResult
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var getDeletedSasDefinitionOperationSpec = {
        httpMethod: "GET",
        path: "deletedstorage/{storage-account-name}/sas/{sas-definition-name}",
        urlParameters: [
            vaultBaseUrl,
            storageAccountName0,
            sasDefinitionName
        ],
        queryParameters: [apiVersion],
        responses: {
            200: {
                bodyMapper: DeletedSasDefinitionBundle
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var recoverDeletedSasDefinitionOperationSpec = {
        httpMethod: "POST",
        path: "deletedstorage/{storage-account-name}/sas/{sas-definition-name}/recover",
        urlParameters: [
            vaultBaseUrl,
            storageAccountName0,
            sasDefinitionName
        ],
        queryParameters: [apiVersion],
        responses: {
            200: {
                bodyMapper: SasDefinitionBundle
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var deleteSasDefinitionOperationSpec = {
        httpMethod: "DELETE",
        path: "storage/{storage-account-name}/sas/{sas-definition-name}",
        urlParameters: [
            vaultBaseUrl,
            storageAccountName0,
            sasDefinitionName
        ],
        queryParameters: [apiVersion],
        responses: {
            200: {
                bodyMapper: DeletedSasDefinitionBundle
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var getSasDefinitionOperationSpec = {
        httpMethod: "GET",
        path: "storage/{storage-account-name}/sas/{sas-definition-name}",
        urlParameters: [
            vaultBaseUrl,
            storageAccountName0,
            sasDefinitionName
        ],
        queryParameters: [apiVersion],
        responses: {
            200: {
                bodyMapper: SasDefinitionBundle
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var setSasDefinitionOperationSpec = {
        httpMethod: "PUT",
        path: "storage/{storage-account-name}/sas/{sas-definition-name}",
        urlParameters: [
            vaultBaseUrl,
            storageAccountName0,
            sasDefinitionName
        ],
        queryParameters: [apiVersion],
        requestBody: {
            parameterPath: {
                templateUri: "templateUri",
                sasType: "sasType",
                validityPeriod: "validityPeriod",
                sasDefinitionAttributes: ["options", "sasDefinitionAttributes"],
                tags: ["options", "tags"]
            },
            mapper: __assign(__assign({}, SasDefinitionCreateParameters), { required: true })
        },
        responses: {
            200: {
                bodyMapper: SasDefinitionBundle
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };
    var updateSasDefinitionOperationSpec = {
        httpMethod: "PATCH",
        path: "storage/{storage-account-name}/sas/{sas-definition-name}",
        urlParameters: [
            vaultBaseUrl,
            storageAccountName0,
            sasDefinitionName
        ],
        queryParameters: [apiVersion],
        requestBody: {
            parameterPath: {
                templateUri: ["options", "templateUri"],
                sasType: ["options", "sasType"],
                validityPeriod: ["options", "validityPeriod"],
                sasDefinitionAttributes: ["options", "sasDefinitionAttributes"],
                tags: ["options", "tags"]
            },
            mapper: __assign(__assign({}, SasDefinitionUpdateParameters), { required: true })
        },
        responses: {
            200: {
                bodyMapper: SasDefinitionBundle
            },
            default: {
                bodyMapper: KeyVaultError
            }
        },
        serializer: serializer$1
    };

    // Copyright (c) Microsoft Corporation. All rights reserved.
    // Licensed under the MIT License. See License.txt in the project root for license information.
    var SDK_VERSION = "4.0.3";

    // Copyright (c) Microsoft Corporation. All rights reserved.
    /**
     * Creates a new ChallengeBasedAuthenticationPolicy factory.
     *
     * @param credential The TokenCredential implementation that can supply the challenge token.
     */
    function challengeBasedAuthenticationPolicy(credential) {
        var tokenCache = new ExpiringAccessTokenCache();
        return {
            create: function (nextPolicy, options) {
                return new ChallengeBasedAuthenticationPolicy(nextPolicy, options, credential, tokenCache);
            }
        };
    }
    var AuthenticationChallenge = /** @class */ (function () {
        function AuthenticationChallenge(scopes) {
            this.scopes = scopes;
        }
        return AuthenticationChallenge;
    }());
    /**
     *
     * Provides a RequestPolicy that can request a token from a TokenCredential
     * implementation and then apply it to the Authorization header of a request
     * as a Bearer token.
     *
     */
    var ChallengeBasedAuthenticationPolicy = /** @class */ (function (_super) {
        __extends(ChallengeBasedAuthenticationPolicy, _super);
        /**
         * Creates a new ChallengeBasedAuthenticationPolicy object.
         *
         * @param nextPolicy The next RequestPolicy in the request pipeline.
         * @param options Options for this RequestPolicy.
         * @param credential The TokenCredential implementation that can supply the bearer token.
         * @param tokenCache The cache for the most recent AccessToken returned by the TokenCredential.
         */
        function ChallengeBasedAuthenticationPolicy(nextPolicy, options, credential, tokenCache) {
            var _this = _super.call(this, nextPolicy, options) || this;
            _this.credential = credential;
            _this.tokenCache = tokenCache;
            _this.challenge = undefined;
            return _this;
        }
        ChallengeBasedAuthenticationPolicy.prototype.parseWWWAuthenticate = function (www_authenticate) {
            // Parses an authentication message like:
            // ```
            // Bearer authorization="some_authorization", resource="https://some.url"
            // ```
            var authenticateArray = www_authenticate.split(" ");
            // Remove the "Bearer" piece
            delete authenticateArray[0];
            // Split the KV comma-separated list
            var commaSep = authenticateArray.join().split(",");
            for (var _i = 0, commaSep_1 = commaSep; _i < commaSep_1.length; _i++) {
                var item = commaSep_1[_i];
                // Split the key/value pairs
                var kv = item.split("=");
                if (kv[0].trim() == "resource") {
                    // Remove the quotations around the string
                    var resource = kv[1].trim().replace(/['"]+/g, '');
                    return resource;
                }
            }
            return "";
        };
        /**
         * Applies the Bearer token to the request through the Authorization header.
         * @param webResource
         */
        ChallengeBasedAuthenticationPolicy.prototype.sendRequest = function (webResource) {
            return __awaiter(this, void 0, void 0, function () {
                var originalBody, response, www_authenticate, resource, challenge;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!webResource.headers)
                                webResource.headers = new HttpHeaders();
                            // Ensure that we're about to use a secure connection
                            if (!webResource.url.startsWith("https:")) {
                                throw new Error("The resource address for authorization must use the 'https' protocol.");
                            }
                            originalBody = webResource.body;
                            if (!(this.challenge == undefined)) return [3 /*break*/, 1];
                            // Use a blank to start the challenge
                            webResource.body = "";
                            return [3 /*break*/, 3];
                        case 1: 
                        // or use the cached token if we have one
                        return [4 /*yield*/, this.authenticateRequest(webResource)];
                        case 2:
                            // or use the cached token if we have one
                            _a.sent();
                            _a.label = 3;
                        case 3: return [4 /*yield*/, this._nextPolicy.sendRequest(webResource)];
                        case 4:
                            response = _a.sent();
                            if (!(response.status == 401)) return [3 /*break*/, 7];
                            webResource.body = originalBody;
                            www_authenticate = response.headers.get("WWW-Authenticate");
                            if (!www_authenticate) return [3 /*break*/, 6];
                            resource = this.parseWWWAuthenticate(www_authenticate);
                            challenge = new AuthenticationChallenge(resource + "/.default");
                            if (!(this.challenge != challenge)) return [3 /*break*/, 6];
                            this.challenge = challenge;
                            this.tokenCache.setCachedToken(undefined);
                            return [4 /*yield*/, this.authenticateRequest(webResource)];
                        case 5:
                            _a.sent();
                            _a.label = 6;
                        case 6: return [2 /*return*/, this._nextPolicy.sendRequest(webResource)];
                        case 7: return [2 /*return*/, response];
                    }
                });
            });
        };
        ChallengeBasedAuthenticationPolicy.prototype.authenticateRequest = function (webResource) {
            return __awaiter(this, void 0, void 0, function () {
                var accessToken;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            accessToken = this.tokenCache.getCachedToken();
                            if (!(accessToken === undefined)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.credential.getToken(this.challenge.scopes)];
                        case 1:
                            accessToken = (_a.sent()) || undefined;
                            this.tokenCache.setCachedToken(accessToken);
                            _a.label = 2;
                        case 2:
                            if (accessToken) {
                                webResource.headers.set(Constants.HeaderConstants.AUTHORIZATION, "Bearer " + accessToken.token);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        return ChallengeBasedAuthenticationPolicy;
    }(BaseRequestPolicy));

    // Copyright (c) Microsoft Corporation.
    /**
     * When a poller is manually stopped through the `stopPolling` method,
     * the poller will be rejected with an instance of the PollerStoppedError.
     */
    var PollerStoppedError = /** @class */ (function (_super) {
        __extends(PollerStoppedError, _super);
        function PollerStoppedError(message) {
            var _this = _super.call(this, message) || this;
            _this.name = "PollerStoppedError";
            Object.setPrototypeOf(_this, PollerStoppedError.prototype);
            return _this;
        }
        return PollerStoppedError;
    }(Error));
    /**
     * When a poller is cancelled through the `cancelOperation` method,
     * the poller will be rejected with an instance of the PollerCancelledError.
     */
    var PollerCancelledError = /** @class */ (function (_super) {
        __extends(PollerCancelledError, _super);
        function PollerCancelledError(message) {
            var _this = _super.call(this, message) || this;
            _this.name = "PollerCancelledError";
            Object.setPrototypeOf(_this, PollerCancelledError.prototype);
            return _this;
        }
        return PollerCancelledError;
    }(Error));
    /**
     * A class that represents the definition of a program that polls through consecutive requests
     * until it reaches a state of completion.
     *
     * A poller can be executed manually, by polling request by request by calling to the `poll()` method repeatedly, until its operation is completed.
     * It also provides a way to wait until the operation completes, by calling `pollUntilDone()` and waiting until the operation finishes.
     * Pollers can also request the cancellation of the ongoing process to whom is providing the underlying long running operation.
     *
     * ```ts
     * const poller = new MyPoller();
     *
     * // Polling just once:
     * await poller.poll();
     *
     * // We can try to cancel the request here, by calling:
     * //
     * //     await poller.cancelOperation();
     * //
     *
     * // Getting the final result:
     * const result = await poller.pollUntilDone();
     * ```
     *
     * The Poller is defined by two types, a type representing the state of the poller, which
     * must include a basic set of properties from `PollOperationState<TResult>`,
     * and a return type defined by `TResult`, which can be anything.
     *
     * The Poller class implements the `PollerLike` interface, which allows poller implementations to avoid having
     * to export the Poller's class directly, and instead only export the already instantiated poller with the PollerLike type.
     *
     * ```ts
     * class Client {
     *   public async makePoller: PollerLike<MyOperationState, MyResult> {
     *     const poller = new MyPoller({});
     *     // It might be preferred to return the poller after the first request is made,
     *     // so that some information can be obtained right away.
     *     await poller.poll();
     *     return poller;
     *   }
     * }
     *
     * const poller: PollerLike<MyOperationState, MyResult> = myClient.makePoller();
     * ```
     *
     * A poller can be created through its constructor, then it can be polled until it's completed.
     * At any point in time, the state of the poller can be obtained without delay through the getOperationState method.
     * At any point in time, the intermediate forms of the result type can be requested without delay.
     * Once the underlying operation is marked as completed, the poller will stop and the final value will be returned.
     *
     * ```ts
     * const poller = myClient.makePoller();
     * const state: MyOperationState = poller.getOperationState();
     *
     * // The intermediate result can be obtained at any time.
     * const result: MyResult | undefined = poller.getResult();
     *
     * // The final result can only be obtained after the poller finishes.
     * const result: MyResult = await poller.pollUntilDone();
     * ```
     *
     */
    var Poller = /** @class */ (function () {
        /**
         * A poller needs to be initialized by passing in at least the basic properties of the PollOperation<TState, TResult>.
         *
         * When writing an implementation of a Poller, this implementation needs to deal with the initialization
         * of any custom state beyond the basic definition of the poller. The basic poller assumes that the poller's
         * operation has already been defined, at least its basic properties. The code below shows how to approach
         * the definition of the constructor of a new custom poller.
         *
         * ```ts
         * export class MyPoller extends Poller<MyOperationState, string> {
         *   constructor({
         *     // Anything you might need outside of the basics
         *   }) {
         *     let state: MyOperationState = {
         *       privateProperty: private,
         *       publicProperty: public,
         *     };
         *
         *     const operation = {
         *       state,
         *       update,
         *       cancel,
         *       toString
         *     }
         *
         *     // Sending the operation to the parent's constructor.
         *     super(operation);
         *
         *     // You can assign more local properties here.
         *   }
         * }
         * ```
         *
         * Inside of this constructor, a new promise is created. This will be used to
         * tell the user when the poller finishes (see `pollUntilDone()`). The promise's
         * resolve and reject methods are also used internally to control when to resolve
         * or reject anyone waiting for the poller to finish.
         *
         * The constructor of a custom implementation of a poller is where any serialized version of
         * a previous poller's operation should be deserialized into the operation sent to the
         * base constructor. For example:
         *
         * ```ts
         * export class MyPoller extends Poller<MyOperationState, string> {
         *   constructor(
         *     baseOperation: string | undefined
         *   ) {
         *     let state: MyOperationState = {};
         *     if (baseOperation) {
         *       state = {
         *         ...JSON.parse(baseOperation).state,
         *         ...state
         *       };
         *     }
         *     const operation = {
         *       state,
         *       // ...
         *     }
         *     super(operation);
         *   }
         * }
         * ```
         *
         * @param operation Must contain the basic properties of PollOperation<State, TResult>.
         */
        function Poller(operation) {
            var _this = this;
            this.stopped = true;
            this.pollProgressCallbacks = [];
            this.operation = operation;
            this.promise = new Promise(function (resolve, reject) {
                _this.resolve = resolve;
                _this.reject = reject;
            });
            // This prevents the UnhandledPromiseRejectionWarning in node.js from being thrown.
            // The above warning would get thrown if `poller.poll` is called, it returns an error,
            // and pullUntilDone did not have a .catch or await try/catch on it's return value.
            this.promise.catch(function () { });
        }
        /**
         * @internal
         * @ignore
         * Starts a loop that will break only if the poller is done
         * or if the poller is stopped.
         */
        Poller.prototype.startPolling = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.stopped) {
                                this.stopped = false;
                            }
                            _a.label = 1;
                        case 1:
                            if (!(!this.isStopped() && !this.isDone())) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.poll()];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.delay()];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @internal
         * @ignore
         * pollOnce does one polling, by calling to the update method of the underlying
         * poll operation to make any relevant change effective.
         *
         * It only optionally receives an object with an abortSignal property, from @azure/abort-controller's AbortSignalLike.
         *
         * @param options Optional properties passed to the operation's update method.
         */
        Poller.prototype.pollOnce = function (options) {
            if (options === void 0) { options = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var state, _a, e_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            state = this.operation.state;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 4, , 5]);
                            if (!!this.isDone()) return [3 /*break*/, 3];
                            _a = this;
                            return [4 /*yield*/, this.operation.update({
                                    abortSignal: options.abortSignal,
                                    fireProgress: this.fireProgress.bind(this)
                                })];
                        case 2:
                            _a.operation = _b.sent();
                            if (this.isDone() && this.resolve) {
                                this.resolve(state.result);
                            }
                            _b.label = 3;
                        case 3: return [3 /*break*/, 5];
                        case 4:
                            e_1 = _b.sent();
                            state.error = e_1;
                            if (this.reject) {
                                this.reject(e_1);
                            }
                            throw e_1;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @internal
         * @ignore
         * fireProgress calls the functions passed in via onProgress the method of the poller.
         *
         * It loops over all of the callbacks received from onProgress, and executes them, sending them
         * the current operation state.
         *
         * @param state The current operation state.
         */
        Poller.prototype.fireProgress = function (state) {
            for (var _i = 0, _a = this.pollProgressCallbacks; _i < _a.length; _i++) {
                var callback = _a[_i];
                callback(state);
            }
        };
        /**
         * @internal
         * @ignore
         * Invokes the underlying operation's cancel method, and rejects the
         * pollUntilDone promise.
         */
        Poller.prototype.cancelOnce = function (options) {
            if (options === void 0) { options = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this;
                            return [4 /*yield*/, this.operation.cancel(options)];
                        case 1:
                            _a.operation = _b.sent();
                            if (this.reject) {
                                this.reject(new PollerCancelledError("Poller cancelled"));
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Returns a promise that will resolve once a single polling request finishes.
         * It does this by calling the update method of the Poller's operation.
         *
         * It only optionally receives an object with an abortSignal property, from @azure/abort-controller's AbortSignalLike.
         *
         * @param options Optional properties passed to the operation's update method.
         */
        Poller.prototype.poll = function (options) {
            var _this = this;
            if (options === void 0) { options = {}; }
            if (!this.pollOncePromise) {
                this.pollOncePromise = this.pollOnce(options);
                var clearPollOncePromise = function () {
                    _this.pollOncePromise = undefined;
                };
                this.pollOncePromise.then(clearPollOncePromise, clearPollOncePromise);
            }
            return this.pollOncePromise;
        };
        /**
         * Returns a promise that will resolve once the underlying operation is completed.
         */
        Poller.prototype.pollUntilDone = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (this.stopped) {
                        this.startPolling().catch(this.reject);
                    }
                    return [2 /*return*/, this.promise];
                });
            });
        };
        /**
         * Invokes the provided callback after each polling is completed,
         * sending the current state of the poller's operation.
         *
         * It returns a method that can be used to stop receiving updates on the given callback function.
         */
        Poller.prototype.onProgress = function (callback) {
            var _this = this;
            this.pollProgressCallbacks.push(callback);
            return function () {
                _this.pollProgressCallbacks = _this.pollProgressCallbacks.filter(function (c) { return c !== callback; });
            };
        };
        /**
         * Returns true if the poller has finished polling.
         */
        Poller.prototype.isDone = function () {
            var state = this.operation.state;
            return Boolean(state.isCompleted || state.isCancelled || state.error);
        };
        /**
         * Stops the poller from continuing to poll.
         */
        Poller.prototype.stopPolling = function () {
            if (!this.stopped) {
                this.stopped = true;
                if (this.reject) {
                    this.reject(new PollerStoppedError("This poller is already stopped"));
                }
            }
        };
        /**
         * Returns true if the poller is stopped.
         */
        Poller.prototype.isStopped = function () {
            return this.stopped;
        };
        /**
         * Attempts to cancel the underlying operation.
         *
         * It only optionally receives an object with an abortSignal property, from @azure/abort-controller's AbortSignalLike.
         *
         * If it's called again before it finishes, it will throw an error.
         *
         * @param options Optional properties passed to the operation's update method.
         */
        Poller.prototype.cancelOperation = function (options) {
            if (options === void 0) { options = {}; }
            if (!this.stopped) {
                this.stopped = true;
            }
            if (!this.cancelPromise) {
                this.cancelPromise = this.cancelOnce(options);
            }
            else if (options.abortSignal) {
                throw new Error("A cancel request is currently pending");
            }
            return this.cancelPromise;
        };
        /**
         * Returns the state of the operation.
         *
         * Even though TState will be the same type inside any of the methods of any extension of the Poller class,
         * implementations of the pollers can customize what's shared with the public by writing their own
         * version of the `getOperationState` method, and by defining two types, one representing the internal state of the poller
         * and a public type representing a safe to share subset of the properties of the internal state.
         * Their definition of getOperationState can then return their public type.
         *
         * Example:
         *
         * ```ts
         * // Let's say we have our poller's operation state defined as:
         * interface MyOperationState extends PollOperationState<ResultType> {
         *   privateProperty?: string;
         *   publicProperty?: string;
         * }
         *
         * // To allow us to have a true separation of public and private state, we have to define another interface:
         * interface PublicState extends PollOperationState<ResultType> {
         *   publicProperty?: string;
         * }
         *
         * // Then, we define our Poller as follows:
         * export class MyPoller extends Poller<MyOperationState, ResultType> {
         *   // ... More content is needed here ...
         *
         *   public getOperationState(): PublicState {
         *     const state: PublicState = this.operation.state;
         *     return {
         *       // Properties from PollOperationState<TResult>
         *       isStarted: state.isStarted,
         *       isCompleted: state.isCompleted,
         *       isCancelled: state.isCancelled,
         *       error: state.error,
         *       result: state.result,
         *
         *       // The only other property needed by PublicState.
         *       publicProperty: state.publicProperty
         *     }
         *   }
         * }
         * ```
         *
         * You can see this in the tests of this repository, go to the file:
         * `../test/utils/testPoller.ts`
         * and look for the getOperationState implementation.
         */
        Poller.prototype.getOperationState = function () {
            return this.operation.state;
        };
        /**
         * Returns the result value of the operation,
         * regardless of the state of the poller.
         * It can return undefined or an incomplete form of the final TResult value
         * depending on the implementation.
         */
        Poller.prototype.getResult = function () {
            var state = this.operation.state;
            return state.result;
        };
        /**
         * Returns a serialized version of the poller's operation
         * by invoking the operation's toString method.
         */
        Poller.prototype.toString = function () {
            return this.operation.toString();
        };
        return Poller;
    }());

    // Copyright (c) Microsoft Corporation.
    /**
     * @summary Reaches to the service and updates the delete secret's poll operation.
     * @param [options] The optional parameters, which are an abortSignal from @azure/abort-controller and a function that triggers the poller's onProgress function.
     */
    function update(options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var state, name, client, requestOptions, deletedSecret, _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        state = this.state;
                        name = state.name, client = state.client;
                        requestOptions = state.requestOptions || {};
                        if (options.abortSignal) {
                            requestOptions.abortSignal = options.abortSignal;
                        }
                        if (!!state.isStarted) return [3 /*break*/, 2];
                        return [4 /*yield*/, client.deleteSecret(name, requestOptions)];
                    case 1:
                        deletedSecret = _b.sent();
                        state.isStarted = true;
                        state.result = deletedSecret;
                        if (!deletedSecret.properties.recoveryId) {
                            state.isCompleted = true;
                        }
                        _b.label = 2;
                    case 2:
                        if (!!state.isCompleted) return [3 /*break*/, 6];
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        _a = state;
                        return [4 /*yield*/, client.getDeletedSecret(name, { requestOptions: requestOptions })];
                    case 4:
                        _a.result = _b.sent();
                        state.isCompleted = true;
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _b.sent();
                        if (error_1.statusCode === 403) {
                            // At this point, the resource exists but the user doesn't have access to it.
                            state.isCompleted = true;
                        }
                        else if (error_1.statusCode !== 404) {
                            state.error = error_1;
                            state.isCompleted = true;
                        }
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/, makeDeleteSecretPollOperation(state)];
                }
            });
        });
    }
    /**
     * @summary Reaches to the service and cancels the secret's operation, also updating the secret's poll operation
     * @param [options] The optional parameters, which is only an abortSignal from @azure/abort-controller
     */
    function cancel(_) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error("Canceling the deletion of a secret is not supported.");
            });
        });
    }
    /**
     * @summary Serializes the create secret's poll operation
     */
    function toString() {
        return JSON.stringify({
            state: this.state
        });
    }
    /**
     * @summary Builds a create secret's poll operation
     * @param [state] A poll operation's state, in case the new one is intended to follow up where the previous one was left.
     */
    function makeDeleteSecretPollOperation(state) {
        return {
            state: __assign({}, state),
            update: update,
            cancel: cancel,
            toString: toString
        };
    }

    // Copyright (c) Microsoft Corporation.
    /**
     * Class that deletes a poller that waits until a secret finishes being deleted
     */
    var DeleteSecretPoller = /** @class */ (function (_super) {
        __extends(DeleteSecretPoller, _super);
        function DeleteSecretPoller(options) {
            var _this = this;
            var client = options.client, name = options.name, requestOptions = options.requestOptions, _a = options.intervalInMs, intervalInMs = _a === void 0 ? 2000 : _a, resumeFrom = options.resumeFrom;
            var state;
            if (resumeFrom) {
                state = JSON.parse(resumeFrom).state;
            }
            var operation = makeDeleteSecretPollOperation(__assign(__assign({}, state), { name: name,
                requestOptions: requestOptions,
                client: client }));
            _this = _super.call(this, operation) || this;
            _this.intervalInMs = intervalInMs;
            return _this;
        }
        /**
         * The method used by the poller to wait before attempting to update its operation.
         * @memberof DeleteSecretPoller
         */
        DeleteSecretPoller.prototype.delay = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, delay(this.intervalInMs)];
                });
            });
        };
        return DeleteSecretPoller;
    }(Poller));

    // Copyright (c) Microsoft Corporation.
    /**
     * @summary Reaches to the service and updates the delete secret's poll operation.
     * @param [options] The optional parameters, which are an abortSignal from @azure/abort-controller and a function that triggers the poller's onProgress function.
     */
    function update$1(options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var state, name, client, requestOptions, _a, _1, _b, _c, error_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        state = this.state;
                        name = state.name, client = state.client;
                        requestOptions = state.requestOptions || {};
                        if (options.abortSignal) {
                            requestOptions.abortSignal = options.abortSignal;
                        }
                        if (!!state.isStarted) return [3 /*break*/, 6];
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 3, , 4]);
                        _a = state;
                        return [4 /*yield*/, client.getSecret(name, { requestOptions: requestOptions })];
                    case 2:
                        _a.result = (_d.sent()).properties;
                        state.isCompleted = true;
                        return [3 /*break*/, 4];
                    case 3:
                        _1 = _d.sent();
                        return [3 /*break*/, 4];
                    case 4:
                        if (!!state.isCompleted) return [3 /*break*/, 6];
                        _b = state;
                        return [4 /*yield*/, client.recoverDeletedSecret(name, { requestOptions: requestOptions })];
                    case 5:
                        _b.result = _d.sent();
                        state.isStarted = true;
                        _d.label = 6;
                    case 6:
                        if (!!state.isCompleted) return [3 /*break*/, 10];
                        _d.label = 7;
                    case 7:
                        _d.trys.push([7, 9, , 10]);
                        _c = state;
                        return [4 /*yield*/, client.getSecret(name, { requestOptions: requestOptions })];
                    case 8:
                        _c.result = (_d.sent()).properties;
                        state.isCompleted = true;
                        return [3 /*break*/, 10];
                    case 9:
                        error_1 = _d.sent();
                        if (error_1.statusCode === 403) {
                            // At this point, the resource exists but the user doesn't have access to it.
                            state.isCompleted = true;
                        }
                        else if (error_1.statusCode !== 404) {
                            state.error = error_1;
                            state.isCompleted = true;
                        }
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/, makeRecoverDeletedSecretPollOperation(state)];
                }
            });
        });
    }
    /**
     * @summary Reaches to the service and cancels the secret's operation, also updating the secret's poll operation
     * @param [options] The optional parameters, which is only an abortSignal from @azure/abort-controller
     */
    function cancel$1(_) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error("Canceling the deletion of a secret is not supported.");
            });
        });
    }
    /**
     * @summary Serializes the create secret's poll operation
     */
    function toString$1() {
        return JSON.stringify({
            state: this.state
        });
    }
    /**
     * @summary Builds a create secret's poll operation
     * @param [state] A poll operation's state, in case the new one is intended to follow up where the previous one was left.
     */
    function makeRecoverDeletedSecretPollOperation(state) {
        return {
            state: __assign({}, state),
            update: update$1,
            cancel: cancel$1,
            toString: toString$1
        };
    }

    // Copyright (c) Microsoft Corporation.
    /**
     * Class that deletes a poller that waits until a secret finishes being deleted
     */
    var RecoverDeletedSecretPoller = /** @class */ (function (_super) {
        __extends(RecoverDeletedSecretPoller, _super);
        function RecoverDeletedSecretPoller(options) {
            var _this = this;
            var client = options.client, name = options.name, requestOptions = options.requestOptions, _a = options.intervalInMs, intervalInMs = _a === void 0 ? 2000 : _a, resumeFrom = options.resumeFrom;
            var state;
            if (resumeFrom) {
                state = JSON.parse(resumeFrom).state;
            }
            var operation = makeRecoverDeletedSecretPollOperation(__assign(__assign({}, state), { name: name,
                requestOptions: requestOptions,
                client: client }));
            _this = _super.call(this, operation) || this;
            _this.intervalInMs = intervalInMs;
            return _this;
        }
        /**
         * The method used by the poller to wait before attempting to update its operation.
         * @memberof RecoverDeletedSecretPoller
         */
        RecoverDeletedSecretPoller.prototype.delay = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, delay(this.intervalInMs)];
                });
            });
        };
        return RecoverDeletedSecretPoller;
    }(Poller));

    var punycode = createCommonjsModule(function (module, exports) {
    (function(root) {

    	/** Detect free variables */
    	var freeExports =  exports &&
    		!exports.nodeType && exports;
    	var freeModule =  module &&
    		!module.nodeType && module;
    	var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal;
    	if (
    		freeGlobal.global === freeGlobal ||
    		freeGlobal.window === freeGlobal ||
    		freeGlobal.self === freeGlobal
    	) {
    		root = freeGlobal;
    	}

    	/**
    	 * The `punycode` object.
    	 * @name punycode
    	 * @type Object
    	 */
    	var punycode,

    	/** Highest positive signed 32-bit float value */
    	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

    	/** Bootstring parameters */
    	base = 36,
    	tMin = 1,
    	tMax = 26,
    	skew = 38,
    	damp = 700,
    	initialBias = 72,
    	initialN = 128, // 0x80
    	delimiter = '-', // '\x2D'

    	/** Regular expressions */
    	regexPunycode = /^xn--/,
    	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
    	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

    	/** Error messages */
    	errors = {
    		'overflow': 'Overflow: input needs wider integers to process',
    		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
    		'invalid-input': 'Invalid input'
    	},

    	/** Convenience shortcuts */
    	baseMinusTMin = base - tMin,
    	floor = Math.floor,
    	stringFromCharCode = String.fromCharCode,

    	/** Temporary variable */
    	key;

    	/*--------------------------------------------------------------------------*/

    	/**
    	 * A generic error utility function.
    	 * @private
    	 * @param {String} type The error type.
    	 * @returns {Error} Throws a `RangeError` with the applicable error message.
    	 */
    	function error(type) {
    		throw RangeError(errors[type]);
    	}

    	/**
    	 * A generic `Array#map` utility function.
    	 * @private
    	 * @param {Array} array The array to iterate over.
    	 * @param {Function} callback The function that gets called for every array
    	 * item.
    	 * @returns {Array} A new array of values returned by the callback function.
    	 */
    	function map(array, fn) {
    		var length = array.length;
    		var result = [];
    		while (length--) {
    			result[length] = fn(array[length]);
    		}
    		return result;
    	}

    	/**
    	 * A simple `Array#map`-like wrapper to work with domain name strings or email
    	 * addresses.
    	 * @private
    	 * @param {String} domain The domain name or email address.
    	 * @param {Function} callback The function that gets called for every
    	 * character.
    	 * @returns {Array} A new string of characters returned by the callback
    	 * function.
    	 */
    	function mapDomain(string, fn) {
    		var parts = string.split('@');
    		var result = '';
    		if (parts.length > 1) {
    			// In email addresses, only the domain name should be punycoded. Leave
    			// the local part (i.e. everything up to `@`) intact.
    			result = parts[0] + '@';
    			string = parts[1];
    		}
    		// Avoid `split(regex)` for IE8 compatibility. See #17.
    		string = string.replace(regexSeparators, '\x2E');
    		var labels = string.split('.');
    		var encoded = map(labels, fn).join('.');
    		return result + encoded;
    	}

    	/**
    	 * Creates an array containing the numeric code points of each Unicode
    	 * character in the string. While JavaScript uses UCS-2 internally,
    	 * this function will convert a pair of surrogate halves (each of which
    	 * UCS-2 exposes as separate characters) into a single code point,
    	 * matching UTF-16.
    	 * @see `punycode.ucs2.encode`
    	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
    	 * @memberOf punycode.ucs2
    	 * @name decode
    	 * @param {String} string The Unicode input string (UCS-2).
    	 * @returns {Array} The new array of code points.
    	 */
    	function ucs2decode(string) {
    		var output = [],
    		    counter = 0,
    		    length = string.length,
    		    value,
    		    extra;
    		while (counter < length) {
    			value = string.charCodeAt(counter++);
    			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
    				// high surrogate, and there is a next character
    				extra = string.charCodeAt(counter++);
    				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
    					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
    				} else {
    					// unmatched surrogate; only append this code unit, in case the next
    					// code unit is the high surrogate of a surrogate pair
    					output.push(value);
    					counter--;
    				}
    			} else {
    				output.push(value);
    			}
    		}
    		return output;
    	}

    	/**
    	 * Creates a string based on an array of numeric code points.
    	 * @see `punycode.ucs2.decode`
    	 * @memberOf punycode.ucs2
    	 * @name encode
    	 * @param {Array} codePoints The array of numeric code points.
    	 * @returns {String} The new Unicode string (UCS-2).
    	 */
    	function ucs2encode(array) {
    		return map(array, function(value) {
    			var output = '';
    			if (value > 0xFFFF) {
    				value -= 0x10000;
    				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
    				value = 0xDC00 | value & 0x3FF;
    			}
    			output += stringFromCharCode(value);
    			return output;
    		}).join('');
    	}

    	/**
    	 * Converts a basic code point into a digit/integer.
    	 * @see `digitToBasic()`
    	 * @private
    	 * @param {Number} codePoint The basic numeric code point value.
    	 * @returns {Number} The numeric value of a basic code point (for use in
    	 * representing integers) in the range `0` to `base - 1`, or `base` if
    	 * the code point does not represent a value.
    	 */
    	function basicToDigit(codePoint) {
    		if (codePoint - 48 < 10) {
    			return codePoint - 22;
    		}
    		if (codePoint - 65 < 26) {
    			return codePoint - 65;
    		}
    		if (codePoint - 97 < 26) {
    			return codePoint - 97;
    		}
    		return base;
    	}

    	/**
    	 * Converts a digit/integer into a basic code point.
    	 * @see `basicToDigit()`
    	 * @private
    	 * @param {Number} digit The numeric value of a basic code point.
    	 * @returns {Number} The basic code point whose value (when used for
    	 * representing integers) is `digit`, which needs to be in the range
    	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
    	 * used; else, the lowercase form is used. The behavior is undefined
    	 * if `flag` is non-zero and `digit` has no uppercase form.
    	 */
    	function digitToBasic(digit, flag) {
    		//  0..25 map to ASCII a..z or A..Z
    		// 26..35 map to ASCII 0..9
    		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
    	}

    	/**
    	 * Bias adaptation function as per section 3.4 of RFC 3492.
    	 * http://tools.ietf.org/html/rfc3492#section-3.4
    	 * @private
    	 */
    	function adapt(delta, numPoints, firstTime) {
    		var k = 0;
    		delta = firstTime ? floor(delta / damp) : delta >> 1;
    		delta += floor(delta / numPoints);
    		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
    			delta = floor(delta / baseMinusTMin);
    		}
    		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
    	}

    	/**
    	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
    	 * symbols.
    	 * @memberOf punycode
    	 * @param {String} input The Punycode string of ASCII-only symbols.
    	 * @returns {String} The resulting string of Unicode symbols.
    	 */
    	function decode(input) {
    		// Don't use UCS-2
    		var output = [],
    		    inputLength = input.length,
    		    out,
    		    i = 0,
    		    n = initialN,
    		    bias = initialBias,
    		    basic,
    		    j,
    		    index,
    		    oldi,
    		    w,
    		    k,
    		    digit,
    		    t,
    		    /** Cached calculation results */
    		    baseMinusT;

    		// Handle the basic code points: let `basic` be the number of input code
    		// points before the last delimiter, or `0` if there is none, then copy
    		// the first basic code points to the output.

    		basic = input.lastIndexOf(delimiter);
    		if (basic < 0) {
    			basic = 0;
    		}

    		for (j = 0; j < basic; ++j) {
    			// if it's not a basic code point
    			if (input.charCodeAt(j) >= 0x80) {
    				error('not-basic');
    			}
    			output.push(input.charCodeAt(j));
    		}

    		// Main decoding loop: start just after the last delimiter if any basic code
    		// points were copied; start at the beginning otherwise.

    		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

    			// `index` is the index of the next character to be consumed.
    			// Decode a generalized variable-length integer into `delta`,
    			// which gets added to `i`. The overflow checking is easier
    			// if we increase `i` as we go, then subtract off its starting
    			// value at the end to obtain `delta`.
    			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

    				if (index >= inputLength) {
    					error('invalid-input');
    				}

    				digit = basicToDigit(input.charCodeAt(index++));

    				if (digit >= base || digit > floor((maxInt - i) / w)) {
    					error('overflow');
    				}

    				i += digit * w;
    				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

    				if (digit < t) {
    					break;
    				}

    				baseMinusT = base - t;
    				if (w > floor(maxInt / baseMinusT)) {
    					error('overflow');
    				}

    				w *= baseMinusT;

    			}

    			out = output.length + 1;
    			bias = adapt(i - oldi, out, oldi == 0);

    			// `i` was supposed to wrap around from `out` to `0`,
    			// incrementing `n` each time, so we'll fix that now:
    			if (floor(i / out) > maxInt - n) {
    				error('overflow');
    			}

    			n += floor(i / out);
    			i %= out;

    			// Insert `n` at position `i` of the output
    			output.splice(i++, 0, n);

    		}

    		return ucs2encode(output);
    	}

    	/**
    	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
    	 * Punycode string of ASCII-only symbols.
    	 * @memberOf punycode
    	 * @param {String} input The string of Unicode symbols.
    	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
    	 */
    	function encode(input) {
    		var n,
    		    delta,
    		    handledCPCount,
    		    basicLength,
    		    bias,
    		    j,
    		    m,
    		    q,
    		    k,
    		    t,
    		    currentValue,
    		    output = [],
    		    /** `inputLength` will hold the number of code points in `input`. */
    		    inputLength,
    		    /** Cached calculation results */
    		    handledCPCountPlusOne,
    		    baseMinusT,
    		    qMinusT;

    		// Convert the input in UCS-2 to Unicode
    		input = ucs2decode(input);

    		// Cache the length
    		inputLength = input.length;

    		// Initialize the state
    		n = initialN;
    		delta = 0;
    		bias = initialBias;

    		// Handle the basic code points
    		for (j = 0; j < inputLength; ++j) {
    			currentValue = input[j];
    			if (currentValue < 0x80) {
    				output.push(stringFromCharCode(currentValue));
    			}
    		}

    		handledCPCount = basicLength = output.length;

    		// `handledCPCount` is the number of code points that have been handled;
    		// `basicLength` is the number of basic code points.

    		// Finish the basic string - if it is not empty - with a delimiter
    		if (basicLength) {
    			output.push(delimiter);
    		}

    		// Main encoding loop:
    		while (handledCPCount < inputLength) {

    			// All non-basic code points < n have been handled already. Find the next
    			// larger one:
    			for (m = maxInt, j = 0; j < inputLength; ++j) {
    				currentValue = input[j];
    				if (currentValue >= n && currentValue < m) {
    					m = currentValue;
    				}
    			}

    			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
    			// but guard against overflow
    			handledCPCountPlusOne = handledCPCount + 1;
    			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
    				error('overflow');
    			}

    			delta += (m - n) * handledCPCountPlusOne;
    			n = m;

    			for (j = 0; j < inputLength; ++j) {
    				currentValue = input[j];

    				if (currentValue < n && ++delta > maxInt) {
    					error('overflow');
    				}

    				if (currentValue == n) {
    					// Represent delta as a generalized variable-length integer
    					for (q = delta, k = base; /* no condition */; k += base) {
    						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
    						if (q < t) {
    							break;
    						}
    						qMinusT = q - t;
    						baseMinusT = base - t;
    						output.push(
    							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
    						);
    						q = floor(qMinusT / baseMinusT);
    					}

    					output.push(stringFromCharCode(digitToBasic(q, 0)));
    					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
    					delta = 0;
    					++handledCPCount;
    				}
    			}

    			++delta;
    			++n;

    		}
    		return output.join('');
    	}

    	/**
    	 * Converts a Punycode string representing a domain name or an email address
    	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
    	 * it doesn't matter if you call it on a string that has already been
    	 * converted to Unicode.
    	 * @memberOf punycode
    	 * @param {String} input The Punycoded domain name or email address to
    	 * convert to Unicode.
    	 * @returns {String} The Unicode representation of the given Punycode
    	 * string.
    	 */
    	function toUnicode(input) {
    		return mapDomain(input, function(string) {
    			return regexPunycode.test(string)
    				? decode(string.slice(4).toLowerCase())
    				: string;
    		});
    	}

    	/**
    	 * Converts a Unicode string representing a domain name or an email address to
    	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
    	 * i.e. it doesn't matter if you call it with a domain that's already in
    	 * ASCII.
    	 * @memberOf punycode
    	 * @param {String} input The domain name or email address to convert, as a
    	 * Unicode string.
    	 * @returns {String} The Punycode representation of the given domain name or
    	 * email address.
    	 */
    	function toASCII(input) {
    		return mapDomain(input, function(string) {
    			return regexNonASCII.test(string)
    				? 'xn--' + encode(string)
    				: string;
    		});
    	}

    	/*--------------------------------------------------------------------------*/

    	/** Define the public API */
    	punycode = {
    		/**
    		 * A string representing the current Punycode.js version number.
    		 * @memberOf punycode
    		 * @type String
    		 */
    		'version': '1.3.2',
    		/**
    		 * An object of methods to convert from JavaScript's internal character
    		 * representation (UCS-2) to Unicode code points, and back.
    		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
    		 * @memberOf punycode
    		 * @type Object
    		 */
    		'ucs2': {
    			'decode': ucs2decode,
    			'encode': ucs2encode
    		},
    		'decode': decode,
    		'encode': encode,
    		'toASCII': toASCII,
    		'toUnicode': toUnicode
    	};

    	/** Expose `punycode` */
    	// Some AMD build optimizers, like r.js, check for specific condition patterns
    	// like the following:
    	if (freeExports && freeModule) {
    		if (module.exports == freeExports) { // in Node.js or RingoJS v0.8.0+
    			freeModule.exports = punycode;
    		} else { // in Narwhal or RingoJS v0.7.0-
    			for (key in punycode) {
    				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
    			}
    		}
    	} else { // in Rhino or a web browser
    		root.punycode = punycode;
    	}

    }(commonjsGlobal));
    });

    var util = {
      isString: function(arg) {
        return typeof(arg) === 'string';
      },
      isObject: function(arg) {
        return typeof(arg) === 'object' && arg !== null;
      },
      isNull: function(arg) {
        return arg === null;
      },
      isNullOrUndefined: function(arg) {
        return arg == null;
      }
    };

    // Copyright Joyent, Inc. and other Node contributors.

    // If obj.hasOwnProperty has been overridden, then calling
    // obj.hasOwnProperty(prop) will break.
    // See: https://github.com/joyent/node/issues/1707
    function hasOwnProperty(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }

    var decode = function(qs, sep, eq, options) {
      sep = sep || '&';
      eq = eq || '=';
      var obj = {};

      if (typeof qs !== 'string' || qs.length === 0) {
        return obj;
      }

      var regexp = /\+/g;
      qs = qs.split(sep);

      var maxKeys = 1000;
      if (options && typeof options.maxKeys === 'number') {
        maxKeys = options.maxKeys;
      }

      var len = qs.length;
      // maxKeys <= 0 means that we should not limit keys count
      if (maxKeys > 0 && len > maxKeys) {
        len = maxKeys;
      }

      for (var i = 0; i < len; ++i) {
        var x = qs[i].replace(regexp, '%20'),
            idx = x.indexOf(eq),
            kstr, vstr, k, v;

        if (idx >= 0) {
          kstr = x.substr(0, idx);
          vstr = x.substr(idx + 1);
        } else {
          kstr = x;
          vstr = '';
        }

        k = decodeURIComponent(kstr);
        v = decodeURIComponent(vstr);

        if (!hasOwnProperty(obj, k)) {
          obj[k] = v;
        } else if (Array.isArray(obj[k])) {
          obj[k].push(v);
        } else {
          obj[k] = [obj[k], v];
        }
      }

      return obj;
    };

    // Copyright Joyent, Inc. and other Node contributors.

    var stringifyPrimitive = function(v) {
      switch (typeof v) {
        case 'string':
          return v;

        case 'boolean':
          return v ? 'true' : 'false';

        case 'number':
          return isFinite(v) ? v : '';

        default:
          return '';
      }
    };

    var encode = function(obj, sep, eq, name) {
      sep = sep || '&';
      eq = eq || '=';
      if (obj === null) {
        obj = undefined;
      }

      if (typeof obj === 'object') {
        return Object.keys(obj).map(function(k) {
          var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
          if (Array.isArray(obj[k])) {
            return obj[k].map(function(v) {
              return ks + encodeURIComponent(stringifyPrimitive(v));
            }).join(sep);
          } else {
            return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
          }
        }).join(sep);

      }

      if (!name) return '';
      return encodeURIComponent(stringifyPrimitive(name)) + eq +
             encodeURIComponent(stringifyPrimitive(obj));
    };

    var querystring = createCommonjsModule(function (module, exports) {

    exports.decode = exports.parse = decode;
    exports.encode = exports.stringify = encode;
    });
    var querystring_1 = querystring.decode;
    var querystring_2 = querystring.parse;
    var querystring_3 = querystring.encode;
    var querystring_4 = querystring.stringify;

    var parse$1 = urlParse;

    function Url() {
      this.protocol = null;
      this.slashes = null;
      this.auth = null;
      this.host = null;
      this.port = null;
      this.hostname = null;
      this.hash = null;
      this.search = null;
      this.query = null;
      this.pathname = null;
      this.path = null;
      this.href = null;
    }

    // Reference: RFC 3986, RFC 1808, RFC 2396

    // define these here so at least they only have to be
    // compiled once on the first module load.
    var protocolPattern = /^([a-z0-9.+-]+:)/i,
        portPattern = /:[0-9]*$/,

        // Special case for a simple path URL
        simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

        // RFC 2396: characters reserved for delimiting URLs.
        // We actually just auto-escape these.
        delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

        // RFC 2396: characters not allowed for various reasons.
        unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

        // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
        autoEscape = ['\''].concat(unwise),
        // Characters that are never ever allowed in a hostname.
        // Note that any invalid chars are also handled, but these
        // are the ones that are *expected* to be seen, so we fast-path
        // them.
        nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
        hostEndingChars = ['/', '?', '#'],
        hostnameMaxLen = 255,
        hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
        hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
        // protocols that can allow "unsafe" and "unwise" chars.
        unsafeProtocol = {
          'javascript': true,
          'javascript:': true
        },
        // protocols that never have a hostname.
        hostlessProtocol = {
          'javascript': true,
          'javascript:': true
        },
        // protocols that always contain a // bit.
        slashedProtocol = {
          'http': true,
          'https': true,
          'ftp': true,
          'gopher': true,
          'file': true,
          'http:': true,
          'https:': true,
          'ftp:': true,
          'gopher:': true,
          'file:': true
        };

    function urlParse(url, parseQueryString, slashesDenoteHost) {
      if (url && util.isObject(url) && url instanceof Url) return url;

      var u = new Url;
      u.parse(url, parseQueryString, slashesDenoteHost);
      return u;
    }

    Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
      if (!util.isString(url)) {
        throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
      }

      // Copy chrome, IE, opera backslash-handling behavior.
      // Back slashes before the query string get converted to forward slashes
      // See: https://code.google.com/p/chromium/issues/detail?id=25916
      var queryIndex = url.indexOf('?'),
          splitter =
              (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
          uSplit = url.split(splitter),
          slashRegex = /\\/g;
      uSplit[0] = uSplit[0].replace(slashRegex, '/');
      url = uSplit.join(splitter);

      var rest = url;

      // trim before proceeding.
      // This is to support parse stuff like "  http://foo.com  \n"
      rest = rest.trim();

      if (!slashesDenoteHost && url.split('#').length === 1) {
        // Try fast path regexp
        var simplePath = simplePathPattern.exec(rest);
        if (simplePath) {
          this.path = rest;
          this.href = rest;
          this.pathname = simplePath[1];
          if (simplePath[2]) {
            this.search = simplePath[2];
            if (parseQueryString) {
              this.query = querystring.parse(this.search.substr(1));
            } else {
              this.query = this.search.substr(1);
            }
          } else if (parseQueryString) {
            this.search = '';
            this.query = {};
          }
          return this;
        }
      }

      var proto = protocolPattern.exec(rest);
      if (proto) {
        proto = proto[0];
        var lowerProto = proto.toLowerCase();
        this.protocol = lowerProto;
        rest = rest.substr(proto.length);
      }

      // figure out if it's got a host
      // user@server is *always* interpreted as a hostname, and url
      // resolution will treat //foo/bar as host=foo,path=bar because that's
      // how the browser resolves relative URLs.
      if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
        var slashes = rest.substr(0, 2) === '//';
        if (slashes && !(proto && hostlessProtocol[proto])) {
          rest = rest.substr(2);
          this.slashes = true;
        }
      }

      if (!hostlessProtocol[proto] &&
          (slashes || (proto && !slashedProtocol[proto]))) {

        // there's a hostname.
        // the first instance of /, ?, ;, or # ends the host.
        //
        // If there is an @ in the hostname, then non-host chars *are* allowed
        // to the left of the last @ sign, unless some host-ending character
        // comes *before* the @-sign.
        // URLs are obnoxious.
        //
        // ex:
        // http://a@b@c/ => user:a@b host:c
        // http://a@b?@c => user:a host:c path:/?@c

        // v0.12 TODO(isaacs): This is not quite how Chrome does things.
        // Review our test case against browsers more comprehensively.

        // find the first instance of any hostEndingChars
        var hostEnd = -1;
        for (var i = 0; i < hostEndingChars.length; i++) {
          var hec = rest.indexOf(hostEndingChars[i]);
          if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
            hostEnd = hec;
        }

        // at this point, either we have an explicit point where the
        // auth portion cannot go past, or the last @ char is the decider.
        var auth, atSign;
        if (hostEnd === -1) {
          // atSign can be anywhere.
          atSign = rest.lastIndexOf('@');
        } else {
          // atSign must be in auth portion.
          // http://a@b/c@d => host:b auth:a path:/c@d
          atSign = rest.lastIndexOf('@', hostEnd);
        }

        // Now we have a portion which is definitely the auth.
        // Pull that off.
        if (atSign !== -1) {
          auth = rest.slice(0, atSign);
          rest = rest.slice(atSign + 1);
          this.auth = decodeURIComponent(auth);
        }

        // the host is the remaining to the left of the first non-host char
        hostEnd = -1;
        for (var i = 0; i < nonHostChars.length; i++) {
          var hec = rest.indexOf(nonHostChars[i]);
          if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
            hostEnd = hec;
        }
        // if we still have not hit it, then the entire thing is a host.
        if (hostEnd === -1)
          hostEnd = rest.length;

        this.host = rest.slice(0, hostEnd);
        rest = rest.slice(hostEnd);

        // pull out port.
        this.parseHost();

        // we've indicated that there is a hostname,
        // so even if it's empty, it has to be present.
        this.hostname = this.hostname || '';

        // if hostname begins with [ and ends with ]
        // assume that it's an IPv6 address.
        var ipv6Hostname = this.hostname[0] === '[' &&
            this.hostname[this.hostname.length - 1] === ']';

        // validate a little.
        if (!ipv6Hostname) {
          var hostparts = this.hostname.split(/\./);
          for (var i = 0, l = hostparts.length; i < l; i++) {
            var part = hostparts[i];
            if (!part) continue;
            if (!part.match(hostnamePartPattern)) {
              var newpart = '';
              for (var j = 0, k = part.length; j < k; j++) {
                if (part.charCodeAt(j) > 127) {
                  // we replace non-ASCII char with a temporary placeholder
                  // we need this to make sure size of hostname is not
                  // broken by replacing non-ASCII by nothing
                  newpart += 'x';
                } else {
                  newpart += part[j];
                }
              }
              // we test again with ASCII char only
              if (!newpart.match(hostnamePartPattern)) {
                var validParts = hostparts.slice(0, i);
                var notHost = hostparts.slice(i + 1);
                var bit = part.match(hostnamePartStart);
                if (bit) {
                  validParts.push(bit[1]);
                  notHost.unshift(bit[2]);
                }
                if (notHost.length) {
                  rest = '/' + notHost.join('.') + rest;
                }
                this.hostname = validParts.join('.');
                break;
              }
            }
          }
        }

        if (this.hostname.length > hostnameMaxLen) {
          this.hostname = '';
        } else {
          // hostnames are always lower case.
          this.hostname = this.hostname.toLowerCase();
        }

        if (!ipv6Hostname) {
          // IDNA Support: Returns a punycoded representation of "domain".
          // It only converts parts of the domain name that
          // have non-ASCII characters, i.e. it doesn't matter if
          // you call it with a domain that already is ASCII-only.
          this.hostname = punycode.toASCII(this.hostname);
        }

        var p = this.port ? ':' + this.port : '';
        var h = this.hostname || '';
        this.host = h + p;
        this.href += this.host;

        // strip [ and ] from the hostname
        // the host field still retains them, though
        if (ipv6Hostname) {
          this.hostname = this.hostname.substr(1, this.hostname.length - 2);
          if (rest[0] !== '/') {
            rest = '/' + rest;
          }
        }
      }

      // now rest is set to the post-host stuff.
      // chop off any delim chars.
      if (!unsafeProtocol[lowerProto]) {

        // First, make 100% sure that any "autoEscape" chars get
        // escaped, even if encodeURIComponent doesn't think they
        // need to be.
        for (var i = 0, l = autoEscape.length; i < l; i++) {
          var ae = autoEscape[i];
          if (rest.indexOf(ae) === -1)
            continue;
          var esc = encodeURIComponent(ae);
          if (esc === ae) {
            esc = escape(ae);
          }
          rest = rest.split(ae).join(esc);
        }
      }


      // chop off from the tail first.
      var hash = rest.indexOf('#');
      if (hash !== -1) {
        // got a fragment string.
        this.hash = rest.substr(hash);
        rest = rest.slice(0, hash);
      }
      var qm = rest.indexOf('?');
      if (qm !== -1) {
        this.search = rest.substr(qm);
        this.query = rest.substr(qm + 1);
        if (parseQueryString) {
          this.query = querystring.parse(this.query);
        }
        rest = rest.slice(0, qm);
      } else if (parseQueryString) {
        // no query string, but parseQueryString still requested
        this.search = '';
        this.query = {};
      }
      if (rest) this.pathname = rest;
      if (slashedProtocol[lowerProto] &&
          this.hostname && !this.pathname) {
        this.pathname = '/';
      }

      //to support http.request
      if (this.pathname || this.search) {
        var p = this.pathname || '';
        var s = this.search || '';
        this.path = p + s;
      }

      // finally, reconstruct the href based on what has been validated.
      this.href = this.format();
      return this;
    };

    Url.prototype.format = function() {
      var auth = this.auth || '';
      if (auth) {
        auth = encodeURIComponent(auth);
        auth = auth.replace(/%3A/i, ':');
        auth += '@';
      }

      var protocol = this.protocol || '',
          pathname = this.pathname || '',
          hash = this.hash || '',
          host = false,
          query = '';

      if (this.host) {
        host = auth + this.host;
      } else if (this.hostname) {
        host = auth + (this.hostname.indexOf(':') === -1 ?
            this.hostname :
            '[' + this.hostname + ']');
        if (this.port) {
          host += ':' + this.port;
        }
      }

      if (this.query &&
          util.isObject(this.query) &&
          Object.keys(this.query).length) {
        query = querystring.stringify(this.query);
      }

      var search = this.search || (query && ('?' + query)) || '';

      if (protocol && protocol.substr(-1) !== ':') protocol += ':';

      // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
      // unless they had them to begin with.
      if (this.slashes ||
          (!protocol || slashedProtocol[protocol]) && host !== false) {
        host = '//' + (host || '');
        if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
      } else if (!host) {
        host = '';
      }

      if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
      if (search && search.charAt(0) !== '?') search = '?' + search;

      pathname = pathname.replace(/[?#]/g, function(match) {
        return encodeURIComponent(match);
      });
      search = search.replace('#', '%23');

      return protocol + host + pathname + search + hash;
    };

    Url.prototype.resolve = function(relative) {
      return this.resolveObject(urlParse(relative, false, true)).format();
    };

    Url.prototype.resolveObject = function(relative) {
      if (util.isString(relative)) {
        var rel = new Url();
        rel.parse(relative, false, true);
        relative = rel;
      }

      var result = new Url();
      var tkeys = Object.keys(this);
      for (var tk = 0; tk < tkeys.length; tk++) {
        var tkey = tkeys[tk];
        result[tkey] = this[tkey];
      }

      // hash is always overridden, no matter what.
      // even href="" will remove it.
      result.hash = relative.hash;

      // if the relative url is empty, then there's nothing left to do here.
      if (relative.href === '') {
        result.href = result.format();
        return result;
      }

      // hrefs like //foo/bar always cut to the protocol.
      if (relative.slashes && !relative.protocol) {
        // take everything except the protocol from relative
        var rkeys = Object.keys(relative);
        for (var rk = 0; rk < rkeys.length; rk++) {
          var rkey = rkeys[rk];
          if (rkey !== 'protocol')
            result[rkey] = relative[rkey];
        }

        //urlParse appends trailing / to urls like http://www.example.com
        if (slashedProtocol[result.protocol] &&
            result.hostname && !result.pathname) {
          result.path = result.pathname = '/';
        }

        result.href = result.format();
        return result;
      }

      if (relative.protocol && relative.protocol !== result.protocol) {
        // if it's a known url protocol, then changing
        // the protocol does weird things
        // first, if it's not file:, then we MUST have a host,
        // and if there was a path
        // to begin with, then we MUST have a path.
        // if it is file:, then the host is dropped,
        // because that's known to be hostless.
        // anything else is assumed to be absolute.
        if (!slashedProtocol[relative.protocol]) {
          var keys = Object.keys(relative);
          for (var v = 0; v < keys.length; v++) {
            var k = keys[v];
            result[k] = relative[k];
          }
          result.href = result.format();
          return result;
        }

        result.protocol = relative.protocol;
        if (!relative.host && !hostlessProtocol[relative.protocol]) {
          var relPath = (relative.pathname || '').split('/');
          while (relPath.length && !(relative.host = relPath.shift()));
          if (!relative.host) relative.host = '';
          if (!relative.hostname) relative.hostname = '';
          if (relPath[0] !== '') relPath.unshift('');
          if (relPath.length < 2) relPath.unshift('');
          result.pathname = relPath.join('/');
        } else {
          result.pathname = relative.pathname;
        }
        result.search = relative.search;
        result.query = relative.query;
        result.host = relative.host || '';
        result.auth = relative.auth;
        result.hostname = relative.hostname || relative.host;
        result.port = relative.port;
        // to support http.request
        if (result.pathname || result.search) {
          var p = result.pathname || '';
          var s = result.search || '';
          result.path = p + s;
        }
        result.slashes = result.slashes || relative.slashes;
        result.href = result.format();
        return result;
      }

      var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
          isRelAbs = (
              relative.host ||
              relative.pathname && relative.pathname.charAt(0) === '/'
          ),
          mustEndAbs = (isRelAbs || isSourceAbs ||
                        (result.host && relative.pathname)),
          removeAllDots = mustEndAbs,
          srcPath = result.pathname && result.pathname.split('/') || [],
          relPath = relative.pathname && relative.pathname.split('/') || [],
          psychotic = result.protocol && !slashedProtocol[result.protocol];

      // if the url is a non-slashed url, then relative
      // links like ../.. should be able
      // to crawl up to the hostname, as well.  This is strange.
      // result.protocol has already been set by now.
      // Later on, put the first path part into the host field.
      if (psychotic) {
        result.hostname = '';
        result.port = null;
        if (result.host) {
          if (srcPath[0] === '') srcPath[0] = result.host;
          else srcPath.unshift(result.host);
        }
        result.host = '';
        if (relative.protocol) {
          relative.hostname = null;
          relative.port = null;
          if (relative.host) {
            if (relPath[0] === '') relPath[0] = relative.host;
            else relPath.unshift(relative.host);
          }
          relative.host = null;
        }
        mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
      }

      if (isRelAbs) {
        // it's absolute.
        result.host = (relative.host || relative.host === '') ?
                      relative.host : result.host;
        result.hostname = (relative.hostname || relative.hostname === '') ?
                          relative.hostname : result.hostname;
        result.search = relative.search;
        result.query = relative.query;
        srcPath = relPath;
        // fall through to the dot-handling below.
      } else if (relPath.length) {
        // it's relative
        // throw away the existing file, and take the new path instead.
        if (!srcPath) srcPath = [];
        srcPath.pop();
        srcPath = srcPath.concat(relPath);
        result.search = relative.search;
        result.query = relative.query;
      } else if (!util.isNullOrUndefined(relative.search)) {
        // just pull out the search.
        // like href='?foo'.
        // Put this after the other two cases because it simplifies the booleans
        if (psychotic) {
          result.hostname = result.host = srcPath.shift();
          //occationaly the auth can get stuck only in host
          //this especially happens in cases like
          //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
          var authInHost = result.host && result.host.indexOf('@') > 0 ?
                           result.host.split('@') : false;
          if (authInHost) {
            result.auth = authInHost.shift();
            result.host = result.hostname = authInHost.shift();
          }
        }
        result.search = relative.search;
        result.query = relative.query;
        //to support http.request
        if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
          result.path = (result.pathname ? result.pathname : '') +
                        (result.search ? result.search : '');
        }
        result.href = result.format();
        return result;
      }

      if (!srcPath.length) {
        // no path at all.  easy.
        // we've already handled the other stuff above.
        result.pathname = null;
        //to support http.request
        if (result.search) {
          result.path = '/' + result.search;
        } else {
          result.path = null;
        }
        result.href = result.format();
        return result;
      }

      // if a url ENDs in . or .., then it must get a trailing slash.
      // however, if it ends in anything else non-slashy,
      // then it must NOT get a trailing slash.
      var last = srcPath.slice(-1)[0];
      var hasTrailingSlash = (
          (result.host || relative.host || srcPath.length > 1) &&
          (last === '.' || last === '..') || last === '');

      // strip single dots, resolve double dots to parent dir
      // if the path tries to go above the root, `up` ends up > 0
      var up = 0;
      for (var i = srcPath.length; i >= 0; i--) {
        last = srcPath[i];
        if (last === '.') {
          srcPath.splice(i, 1);
        } else if (last === '..') {
          srcPath.splice(i, 1);
          up++;
        } else if (up) {
          srcPath.splice(i, 1);
          up--;
        }
      }

      // if the path is allowed to go above the root, restore leading ..s
      if (!mustEndAbs && !removeAllDots) {
        for (; up--; up) {
          srcPath.unshift('..');
        }
      }

      if (mustEndAbs && srcPath[0] !== '' &&
          (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
        srcPath.unshift('');
      }

      if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
        srcPath.push('');
      }

      var isAbsolute = srcPath[0] === '' ||
          (srcPath[0] && srcPath[0].charAt(0) === '/');

      // put the host back
      if (psychotic) {
        result.hostname = result.host = isAbsolute ? '' :
                                        srcPath.length ? srcPath.shift() : '';
        //occationaly the auth can get stuck only in host
        //this especially happens in cases like
        //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
        var authInHost = result.host && result.host.indexOf('@') > 0 ?
                         result.host.split('@') : false;
        if (authInHost) {
          result.auth = authInHost.shift();
          result.host = result.hostname = authInHost.shift();
        }
      }

      mustEndAbs = mustEndAbs || (result.host && srcPath.length);

      if (mustEndAbs && !isAbsolute) {
        srcPath.unshift('');
      }

      if (!srcPath.length) {
        result.pathname = null;
        result.path = null;
      } else {
        result.pathname = srcPath.join('/');
      }

      //to support request.http
      if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
        result.path = (result.pathname ? result.pathname : '') +
                      (result.search ? result.search : '');
      }
      result.auth = relative.auth || result.auth;
      result.slashes = result.slashes || relative.slashes;
      result.href = result.format();
      return result;
    };

    Url.prototype.parseHost = function() {
      var host = this.host;
      var port = portPattern.exec(host);
      if (port) {
        port = port[0];
        if (port !== ':') {
          this.port = port.substr(1);
        }
        host = host.substr(0, host.length - port.length);
      }
      if (host) this.hostname = host;
    };

    function parseKeyvaultIdentifier(collection, identifier) {
        if (typeof collection != "string" || !(collection = collection.trim())) {
            throw new Error("Invalid collection argument");
        }
        if (typeof identifier != "string" || !(identifier = identifier.trim())) {
            throw new Error("Invalid identifier argument");
        }
        var baseUri;
        try {
            baseUri = parse$1(identifier, true, true);
        }
        catch (e) {
            throw new Error("Invalid " + collection + " identifier: " + identifier + ". Not a valid URI");
        }
        // Path is of the form '/collection/name[/version]'
        var segments = (baseUri.pathname || "").split("/");
        if (segments.length !== 3 && segments.length !== 4) {
            throw new Error("Invalid " + collection + " identifier: " + identifier + ". Bad number of segments: " + segments.length);
        }
        if (collection !== segments[1]) {
            throw new Error("Invalid " + collection + " identifier: " + identifier + ". segment [1] should be \"" + collection + "\", found \"" + segments[1] + "\"");
        }
        var vaultUrl = baseUri.protocol + "//" + baseUri.host;
        var name = segments[2];
        var version = segments.length === 4 ? segments[3] : undefined;
        return {
            vaultUrl: vaultUrl,
            name: name,
            version: version
        };
    }

    // Copyright (c) Microsoft Corporation.
    // This is part of constructing the autogenerated client. In the future, it should not
    // be required. See also: https://github.com/Azure/azure-sdk-for-js/issues/5508
    var SERVICE_API_VERSION = "7.0";
    /**
     * The SecretClient provides methods to manage {@link KeyVaultSecret} in
     * the Azure Key Vault. The client supports creating, retrieving, updating,
     * deleting, purging, backing up, restoring and listing KeyVaultSecrets. The
     * client also supports listing {@link DeletedSecret} for a soft-delete enabled Azure
     * Key Vault.
     */
    var SecretClient = /** @class */ (function () {
        /**
         * Creates an instance of SecretClient.
         *
         * Example usage:
         * ```ts
         * import { SecretClient } from "@azure/keyvault-secrets";
         * import { DefaultAzureCredential } from "@azure/identity";
         *
         * let vaultUrl = `https://<MY KEYVAULT HERE>.vault.azure.net`;
         * let credentials = new DefaultAzureCredential();
         *
         * let client = new SecretClient(vaultUrl, credentials);
         * ```
         * @param {string} vaultUrl the base URL to the vault.
         * @param {TokenCredential} credential An object that implements the `TokenCredential` interface used to authenticate requests to the service. Use the @azure/identity package to create a credential that suits your needs.
         * @param {PipelineOptions} [pipelineOptions] Optional. Pipeline options used to configure Key Vault API requests.
         *                                                         Omit this parameter to use the default pipeline configuration.
         * @memberof SecretClient
         */
        function SecretClient(vaultUrl, credential, pipelineOptions) {
            if (pipelineOptions === void 0) { pipelineOptions = {}; }
            /**
             * @internal
             * @ignore
             * A self reference that bypasses private methods, for the pollers.
             */
            this.pollerClient = {
                recoverDeletedSecret: this.recoverDeletedSecret.bind(this),
                getSecret: this.getSecret.bind(this),
                deleteSecret: this.deleteSecret.bind(this),
                getDeletedSecret: this.getDeletedSecret.bind(this)
            };
            this.vaultUrl = vaultUrl;
            var libInfo = "azsdk-js-keyvault-secrets/" + SDK_VERSION;
            if (pipelineOptions.userAgentOptions) {
                pipelineOptions.userAgentOptions.userAgentPrefix !== undefined
                    ? pipelineOptions.userAgentOptions.userAgentPrefix + " " + libInfo
                    : libInfo;
            }
            else {
                pipelineOptions.userAgentOptions = {
                    userAgentPrefix: libInfo
                };
            }
            var authPolicy = isTokenCredential(credential)
                ? challengeBasedAuthenticationPolicy(credential)
                : signingPolicy(credential);
            var internalPipelineOptions = __assign(__assign({}, pipelineOptions), {
                loggingOptions: {
                    logger: logger$1.info,
                    logPolicyOptions: {
                        allowedHeaderNames: [
                            "x-ms-keyvault-region",
                            "x-ms-keyvault-network-info",
                            "x-ms-keyvault-service-version"
                        ]
                    }
                }
            });
            var pipeline = createPipelineFromOptions(internalPipelineOptions, authPolicy);
            this.client = new KeyVaultClient(credential, SERVICE_API_VERSION, pipeline);
        }
        /**
         * The setSecret method adds a secret or secret version to the Azure Key Vault. If the named secret
         * already exists, Azure Key Vault creates a new version of that secret.
         * This operation requires the secrets/set permission.
         *
         * Example usage:
         * ```ts
         * let client = new SecretClient(url, credentials);
         * await client.setSecret("MySecretName", "ABC123");
         * ```
         * @summary Adds a secret in a specified key vault.
         * @param {string} secretName The name of the secret.
         * @param {string} value The value of the secret.
         * @param {SetSecretOptions} [options] The optional parameters.
         */
        SecretClient.prototype.setSecret = function (secretName, value, options) {
            if (options === void 0) { options = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var requestOptions, enabled, notBefore, expires, remainingOptions, unflattenedOptions, span, response, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            requestOptions = operationOptionsToRequestOptionsBase(options);
                            if (!requestOptions) return [3 /*break*/, 5];
                            enabled = requestOptions.enabled, notBefore = requestOptions.notBefore, expires = requestOptions.expiresOn, remainingOptions = __rest(requestOptions, ["enabled", "notBefore", "expiresOn"]);
                            unflattenedOptions = __assign(__assign({}, remainingOptions), { secretAttributes: {
                                    enabled: enabled,
                                    notBefore: notBefore,
                                    expires: expires
                                } });
                            span = this.createSpan("setSecret", unflattenedOptions);
                            response = void 0;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, , 3, 4]);
                            return [4 /*yield*/, this.client.setSecret(this.vaultUrl, secretName, value, this.setParentSpan(span, unflattenedOptions))];
                        case 2:
                            response = _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            span.end();
                            return [7 /*endfinally*/];
                        case 4: return [2 /*return*/, this.getSecretFromSecretBundle(response)];
                        case 5: return [4 /*yield*/, this.client.setSecret(this.vaultUrl, secretName, value, requestOptions)];
                        case 6:
                            response = _a.sent();
                            return [2 /*return*/, this.getSecretFromSecretBundle(response)];
                    }
                });
            });
        };
        /**
         * Deletes a secret stored in Azure Key Vault.
         * This function returns a Long Running Operation poller that allows you to wait indefinitely until the secret is deleted.
         *
         * This operation requires the secrets/delete permission.
         *
         * Example usage:
         * ```ts
         * const client = new SecretClient(url, credentials);
         * await client.setSecret("MySecretName", "ABC123");
         *
         * const deletePoller = await client.beginDeleteSecret("MySecretName");
         *
         * // Serializing the poller
         * const serialized = deletePoller.toString();
         *
         * // A new poller can be created with:
         * // const newPoller = await client.beginDeleteSecret("MySecretName", { resumeFrom: serialized });
         *
         * // Waiting until it's done
         * const deletedSecret = await deletePoller.pollUntilDone();
         * console.log(deletedSecret);
         * ```
         * @summary Deletes a secret from a specified key vault.
         * @param {string} secretName The name of the secret.
         * @param {BeginDeleteSecretOptions} [options] The optional parameters.
         */
        SecretClient.prototype.beginDeleteSecret = function (name, options) {
            if (options === void 0) { options = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var requestOptions, poller;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            requestOptions = operationOptionsToRequestOptionsBase(options);
                            poller = new DeleteSecretPoller(__assign(__assign({ name: name, client: this.pollerClient }, options), { requestOptions: requestOptions }));
                            // This will initialize the poller's operation (the deletion of the secret).
                            return [4 /*yield*/, poller.poll()];
                        case 1:
                            // This will initialize the poller's operation (the deletion of the secret).
                            _a.sent();
                            return [2 /*return*/, poller];
                    }
                });
            });
        };
        /**
         * The updateSecret method changes specified attributes of an existing stored secret. Properties that
         * are not specified in the request are left unchanged. The value of a secret itself cannot be
         * changed. This operation requires the secrets/set permission.
         *
         * Example usage:
         * ```ts
         * let secretName = "MySecretName";
         * let client = new SecretClient(url, credentials);
         * let secret = await client.getSecret(secretName);
         * await client.updateSecret(secretName, secret.version, { enabled: false });
         * ```
         * @summary Updates the attributes associated with a specified secret in a given key vault.
         * @param {string} secretName The name of the secret.
         * @param {string} secretVersion The version of the secret.
         * @param {UpdateSecretPropertiesOptions} [options] The optional parameters.
         */
        SecretClient.prototype.updateSecretProperties = function (secretName, secretVersion, options) {
            if (options === void 0) { options = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var requestOptions, enabled, notBefore, expires, remainingOptions, unflattenedOptions, span, response, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            requestOptions = operationOptionsToRequestOptionsBase(options);
                            if (!requestOptions) return [3 /*break*/, 5];
                            enabled = requestOptions.enabled, notBefore = requestOptions.notBefore, expires = requestOptions.expiresOn, remainingOptions = __rest(requestOptions, ["enabled", "notBefore", "expiresOn"]);
                            unflattenedOptions = __assign(__assign({}, remainingOptions), { secretAttributes: {
                                    enabled: enabled,
                                    notBefore: notBefore,
                                    expires: expires
                                } });
                            span = this.createSpan("updateSecretProperties", unflattenedOptions);
                            response = void 0;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, , 3, 4]);
                            return [4 /*yield*/, this.client.updateSecret(this.vaultUrl, secretName, secretVersion, this.setParentSpan(span, unflattenedOptions))];
                        case 2:
                            response = _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            span.end();
                            return [7 /*endfinally*/];
                        case 4: return [2 /*return*/, this.getSecretFromSecretBundle(response).properties];
                        case 5: return [4 /*yield*/, this.client.updateSecret(this.vaultUrl, secretName, secretVersion, requestOptions)];
                        case 6:
                            response = _a.sent();
                            return [2 /*return*/, this.getSecretFromSecretBundle(response).properties];
                    }
                });
            });
        };
        /**
         * The getSecret method is applicable to any secret stored in Azure Key Vault. This operation requires
         * the secrets/get permission.
         *
         * Example usage:
         * ```ts
         * let client = new SecretClient(url, credentials);
         * let secret = await client.getSecret("MySecretName");
         * ```
         * @summary Get a specified secret from a given key vault.
         * @param {string} secretName The name of the secret.
         * @param {GetSecretOptions} [options] The optional parameters.
         */
        SecretClient.prototype.getSecret = function (secretName, options) {
            if (options === void 0) { options = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var requestOptions, span, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            requestOptions = operationOptionsToRequestOptionsBase(options);
                            span = this.createSpan("getSecret", requestOptions);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, , 3, 4]);
                            return [4 /*yield*/, this.client.getSecret(this.vaultUrl, secretName, options && options.version ? options.version : "", this.setParentSpan(span, requestOptions))];
                        case 2:
                            response = _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            span.end();
                            return [7 /*endfinally*/];
                        case 4: return [2 /*return*/, this.getSecretFromSecretBundle(response)];
                    }
                });
            });
        };
        /**
         * The getDeletedSecret method returns the specified deleted secret along with its attributes.
         * This operation requires the secrets/get permission.
         *
         * Example usage:
         * ```ts
         * let client = new SecretClient(url, credentials);
         * await client.getDeletedSecret("MyDeletedSecret");
         * ```
         * @summary Gets the specified deleted secret.
         * @param {string} secretName The name of the secret.
         * @param {GetDeletedSecretOptions} [options] The optional parameters.
         */
        SecretClient.prototype.getDeletedSecret = function (secretName, options) {
            if (options === void 0) { options = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var requestOptions, span, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            requestOptions = operationOptionsToRequestOptionsBase(options);
                            span = this.createSpan("getDeletedSecret", requestOptions);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, , 3, 4]);
                            return [4 /*yield*/, this.client.getDeletedSecret(this.vaultUrl, secretName, this.setParentSpan(span, requestOptions))];
                        case 2:
                            response = _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            span.end();
                            return [7 /*endfinally*/];
                        case 4: return [2 /*return*/, this.getSecretFromSecretBundle(response)];
                    }
                });
            });
        };
        /**
         * The purge deleted secret operation removes the secret permanently, without the possibility of
         * recovery. This operation can only be enabled on a soft-delete enabled vault. This operation
         * requires the secrets/purge permission.
         *
         * Example usage:
         * ```ts
         * const client = new SecretClient(url, credentials);
         * const deletePoller = await client.beginDeleteSecret("MySecretName");
         * await deletePoller.pollUntilDone();
         * await client.purgeDeletedSecret("MySecretName");
         * ```
         * @summary Permanently deletes the specified secret.
         * @param {string} secretName The name of the secret.
         * @param {PurgeDeletedSecretOptions} [options] The optional parameters.
         */
        SecretClient.prototype.purgeDeletedSecret = function (secretName, options) {
            if (options === void 0) { options = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var requestOptions, span;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            requestOptions = operationOptionsToRequestOptionsBase(options);
                            span = this.createSpan("purgeDeletedSecret", requestOptions);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, , 3, 4]);
                            return [4 /*yield*/, this.client.purgeDeletedSecret(this.vaultUrl, secretName, this.setParentSpan(span, requestOptions))];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            span.end();
                            return [7 /*endfinally*/];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Recovers the deleted secret in the specified vault.
         * This function returns a Long Running Operation poller that allows you to wait indefinitely until the secret is recovered.
         *
         * This operation requires the secrets/recover permission.
         *
         * Example usage:
         * ```ts
         * const client = new SecretClient(url, credentials);
         * await client.setSecret("MySecretName", "ABC123");
         *
         * const deletePoller = await client.beginDeleteSecret("MySecretName");
         * await deletePoller.pollUntilDone();
         *
         * const recoverPoller = await client.recoverDeletedSecret("MySecretName");
         *
         * // Serializing the poller
         * const serialized = recoverPoller.toString();
         *
         * // A new poller can be created with:
         * // const newPoller = await client.beginRecoverDeletedSecret("MySecretName", { resumeFrom: serialized });
         *
         * // Waiting until it's done
         * const deletedSecret = await recoverPoller.pollUntilDone();
         * console.log(deletedSecret);
         * ```
         * @summary Recovers the deleted secret to the latest version.
         * @param {string} secretName The name of the deleted secret.
         * @param {BeginRecoverDeletedSecretOptions} [options] The optional parameters.
         */
        SecretClient.prototype.beginRecoverDeletedSecret = function (name, options) {
            if (options === void 0) { options = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var requestOptions, poller;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            requestOptions = operationOptionsToRequestOptionsBase(options);
                            poller = new RecoverDeletedSecretPoller(__assign(__assign({ name: name, client: this.pollerClient }, options), { requestOptions: requestOptions }));
                            // This will initialize the poller's operation (the recovery of the deleted secret).
                            return [4 /*yield*/, poller.poll()];
                        case 1:
                            // This will initialize the poller's operation (the recovery of the deleted secret).
                            _a.sent();
                            return [2 /*return*/, poller];
                    }
                });
            });
        };
        /**
         * Requests that a backup of the specified secret be downloaded to the client. All versions of the
         * secret will be downloaded. This operation requires the secrets/backup permission.
         *
         * Example usage:
         * ```ts
         * let client = new SecretClient(url, credentials);
         * let backupResult = await client.backupSecret("MySecretName");
         * ```
         * @summary Backs up the specified secret.
         * @param {string} secretName The name of the secret.
         * @param {BackupSecretOptions} [options] The optional parameters.
         */
        SecretClient.prototype.backupSecret = function (secretName, options) {
            if (options === void 0) { options = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var requestOptions, span, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            requestOptions = operationOptionsToRequestOptionsBase(options);
                            span = this.createSpan("backupSecret", requestOptions);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, , 3, 4]);
                            return [4 /*yield*/, this.client.backupSecret(this.vaultUrl, secretName, this.setParentSpan(span, requestOptions))];
                        case 2:
                            response = _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            span.end();
                            return [7 /*endfinally*/];
                        case 4: return [2 /*return*/, response.value];
                    }
                });
            });
        };
        /**
         * Restores a backed up secret, and all its versions, to a vault. This operation requires the
         * secrets/restore permission.
         *
         * Example usage:
         * ```ts
         * let client = new SecretClient(url, credentials);
         * let mySecretBundle = await client.backupSecret("MySecretName");
         * // ...
         * await client.restoreSecretBackup(mySecretBundle);
         * ```
         * @summary Restores a backed up secret to a vault.
         * @param {Uint8Array} secretBundleBackup The backup blob associated with a secret bundle.
         * @param {RestoreSecretResponse} [options] The optional parameters.
         */
        SecretClient.prototype.restoreSecretBackup = function (secretBundleBackup, options) {
            if (options === void 0) { options = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var requestOptions, span, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            requestOptions = operationOptionsToRequestOptionsBase(options);
                            span = this.createSpan("restoreSecretBackup", requestOptions);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, , 3, 4]);
                            return [4 /*yield*/, this.client.restoreSecret(this.vaultUrl, secretBundleBackup, this.setParentSpan(span, requestOptions))];
                        case 2:
                            response = _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            span.end();
                            return [7 /*endfinally*/];
                        case 4: return [2 /*return*/, this.getSecretFromSecretBundle(response).properties];
                    }
                });
            });
        };
        /**
         * @internal
         * @ignore
         * Sends a delete request for the given KeyVault Secret's name to the KeyVault service.
         * Since the KeyVault Secret won't be immediately deleted, we have {@link beginDeleteSecret}.
         * @param {string} name The name of the KeyVault Secret.
         * @param {RequestOptionsBase} [options] Optional parameters for the underlying HTTP request.
         */
        SecretClient.prototype.deleteSecret = function (secretName, options) {
            if (options === void 0) { options = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var requestOptions, span, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            requestOptions = operationOptionsToRequestOptionsBase(options);
                            span = this.createSpan("deleteSecret", requestOptions);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, , 3, 4]);
                            return [4 /*yield*/, this.client.deleteSecret(this.vaultUrl, secretName, this.setParentSpan(span, requestOptions))];
                        case 2:
                            response = _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            span.end();
                            return [7 /*endfinally*/];
                        case 4: return [2 /*return*/, this.getSecretFromSecretBundle(response)];
                    }
                });
            });
        };
        /**
         * @internal
         * @ignore
         * Sends a request to recover a deleted KeyVault Secret based on the given name.
         * Since the KeyVault Secret won't be immediately recover the deleted secret, we have {@link beginRecoverDeletedSecret}.
         * @param {string} name The name of the KeyVault Secret.
         * @param {RecoverDeletedKeyOptions} [options] Optional parameters for the underlying HTTP request.
         */
        SecretClient.prototype.recoverDeletedSecret = function (secretName, options) {
            if (options === void 0) { options = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var requestOptions, span, properties, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            requestOptions = operationOptionsToRequestOptionsBase(options);
                            span = this.createSpan("recoverDeletedSecret", requestOptions);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, , 3, 4]);
                            return [4 /*yield*/, this.client.recoverDeletedSecret(this.vaultUrl, secretName, this.setParentSpan(span, requestOptions))];
                        case 2:
                            response = _a.sent();
                            properties = this.getSecretFromSecretBundle(response).properties;
                            return [3 /*break*/, 4];
                        case 3:
                            span.end();
                            return [7 /*endfinally*/];
                        case 4: return [2 /*return*/, properties];
                    }
                });
            });
        };
        /**
         * @internal
         * @ignore
         * Deals with the pagination of {@link listPropertiesOfSecretVersions}.
         * @param {string} name The name of the KeyVault Secret.
         * @param {PageSettings} continuationState An object that indicates the position of the paginated request.
         * @param {ListPropertiesOfSecretVersionsOptions} [options] Optional parameters for the underlying HTTP request.
         */
        SecretClient.prototype.listPropertiesOfSecretVersionsPage = function (secretName, continuationState, options) {
            if (options === void 0) { options = {}; }
            return __asyncGenerator(this, arguments, function listPropertiesOfSecretVersionsPage_1() {
                var optionsComplete, currentSetResponse, currentSetResponse;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(continuationState.continuationToken == null)) return [3 /*break*/, 4];
                            optionsComplete = __assign({ maxresults: continuationState.maxPageSize }, options);
                            return [4 /*yield*/, __await(this.client.getSecretVersions(this.vaultUrl, secretName, optionsComplete))];
                        case 1:
                            currentSetResponse = _a.sent();
                            continuationState.continuationToken = currentSetResponse.nextLink;
                            if (!currentSetResponse.value) return [3 /*break*/, 4];
                            return [4 /*yield*/, __await(currentSetResponse.value.map(function (bundle) { return _this.getSecretFromSecretBundle(bundle).properties; }))];
                        case 2: return [4 /*yield*/, _a.sent()];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            if (!continuationState.continuationToken) return [3 /*break*/, 10];
                            return [4 /*yield*/, __await(this.client.getSecretVersions(continuationState.continuationToken, secretName, options))];
                        case 5:
                            currentSetResponse = _a.sent();
                            continuationState.continuationToken = currentSetResponse.nextLink;
                            if (!currentSetResponse.value) return [3 /*break*/, 8];
                            return [4 /*yield*/, __await(currentSetResponse.value.map(function (bundle) { return _this.getSecretFromSecretBundle(bundle).properties; }))];
                        case 6: return [4 /*yield*/, _a.sent()];
                        case 7:
                            _a.sent();
                            return [3 /*break*/, 9];
                        case 8: return [3 /*break*/, 10];
                        case 9: return [3 /*break*/, 4];
                        case 10: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @internal
         * @ignore
         * Deals with the iteration of all the available results of {@link listPropertiesOfSecretVersions}.
         * @param {string} name The name of the KeyVault Secret.
         * @param {ListPropertiesOfSecretVersionsOptions} [options] Optional parameters for the underlying HTTP request.
         */
        SecretClient.prototype.listPropertiesOfSecretVersionsAll = function (secretName, options) {
            if (options === void 0) { options = {}; }
            return __asyncGenerator(this, arguments, function listPropertiesOfSecretVersionsAll_1() {
                var f, _a, _b, page, _i, page_1, item, e_1_1;
                var e_1, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            f = {};
                            _d.label = 1;
                        case 1:
                            _d.trys.push([1, 10, 11, 16]);
                            _a = __asyncValues(this.listPropertiesOfSecretVersionsPage(secretName, f, options));
                            _d.label = 2;
                        case 2: return [4 /*yield*/, __await(_a.next())];
                        case 3:
                            if (!(_b = _d.sent(), !_b.done)) return [3 /*break*/, 9];
                            page = _b.value;
                            _i = 0, page_1 = page;
                            _d.label = 4;
                        case 4:
                            if (!(_i < page_1.length)) return [3 /*break*/, 8];
                            item = page_1[_i];
                            return [4 /*yield*/, __await(item)];
                        case 5: return [4 /*yield*/, _d.sent()];
                        case 6:
                            _d.sent();
                            _d.label = 7;
                        case 7:
                            _i++;
                            return [3 /*break*/, 4];
                        case 8: return [3 /*break*/, 2];
                        case 9: return [3 /*break*/, 16];
                        case 10:
                            e_1_1 = _d.sent();
                            e_1 = { error: e_1_1 };
                            return [3 /*break*/, 16];
                        case 11:
                            _d.trys.push([11, , 14, 15]);
                            if (!(_b && !_b.done && (_c = _a.return))) return [3 /*break*/, 13];
                            return [4 /*yield*/, __await(_c.call(_a))];
                        case 12:
                            _d.sent();
                            _d.label = 13;
                        case 13: return [3 /*break*/, 15];
                        case 14:
                            if (e_1) throw e_1.error;
                            return [7 /*endfinally*/];
                        case 15: return [7 /*endfinally*/];
                        case 16: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Iterates all versions of the given secret in the vault. The full secret identifier and attributes are provided
         * in the response. No values are returned for the secrets. This operations requires the secrets/list permission.
         *
         * Example usage:
         * ```ts
         * let client = new SecretClient(url, credentials);
         * for await (const secretProperties of client.listPropertiesOfSecretVersions("MySecretName")) {
         *   const secret = await client.getSecret(secretProperties.name);
         *   console.log("secret version: ", secret);
         * }
         * ```
         * @param {string} secretName Name of the secret to fetch versions for.
         * @param {ListPropertiesOfSecretVersionsOptions} [options] The optional parameters.
         */
        SecretClient.prototype.listPropertiesOfSecretVersions = function (secretName, options) {
            var _a;
            var _this = this;
            if (options === void 0) { options = {}; }
            var requestOptions = operationOptionsToRequestOptionsBase(options);
            var span = this.createSpan("listPropertiesOfSecretVersions", requestOptions);
            var updatedOptions = __assign(__assign({}, requestOptions), this.setParentSpan(span, requestOptions));
            var iter = this.listPropertiesOfSecretVersionsAll(secretName, updatedOptions);
            span.end();
            return _a = {
                    next: function () {
                        return iter.next();
                    }
                },
                _a[Symbol.asyncIterator] = function () {
                    return this;
                },
                _a.byPage = function (settings) {
                    if (settings === void 0) { settings = {}; }
                    return _this.listPropertiesOfSecretVersionsPage(secretName, settings, updatedOptions);
                },
                _a;
        };
        /**
         * @internal
         * @ignore
         * Deals with the pagination of {@link listPropertiesOfSecrets}.
         * @param {PageSettings} continuationState An object that indicates the position of the paginated request.
         * @param {ListPropertiesOfSecretsOptions} [options] Optional parameters for the underlying HTTP request.
         */
        SecretClient.prototype.listPropertiesOfSecretsPage = function (continuationState, options) {
            if (options === void 0) { options = {}; }
            return __asyncGenerator(this, arguments, function listPropertiesOfSecretsPage_1() {
                var optionsComplete, currentSetResponse, currentSetResponse;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(continuationState.continuationToken == null)) return [3 /*break*/, 4];
                            optionsComplete = __assign({ maxresults: continuationState.maxPageSize }, options);
                            return [4 /*yield*/, __await(this.client.getSecrets(this.vaultUrl, optionsComplete))];
                        case 1:
                            currentSetResponse = _a.sent();
                            continuationState.continuationToken = currentSetResponse.nextLink;
                            if (!currentSetResponse.value) return [3 /*break*/, 4];
                            return [4 /*yield*/, __await(currentSetResponse.value.map(function (bundle) { return _this.getSecretFromSecretBundle(bundle).properties; }))];
                        case 2: return [4 /*yield*/, _a.sent()];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            if (!continuationState.continuationToken) return [3 /*break*/, 10];
                            return [4 /*yield*/, __await(this.client.getSecrets(continuationState.continuationToken, options))];
                        case 5:
                            currentSetResponse = _a.sent();
                            continuationState.continuationToken = currentSetResponse.nextLink;
                            if (!currentSetResponse.value) return [3 /*break*/, 8];
                            return [4 /*yield*/, __await(currentSetResponse.value.map(function (bundle) { return _this.getSecretFromSecretBundle(bundle).properties; }))];
                        case 6: return [4 /*yield*/, _a.sent()];
                        case 7:
                            _a.sent();
                            return [3 /*break*/, 9];
                        case 8: return [3 /*break*/, 10];
                        case 9: return [3 /*break*/, 4];
                        case 10: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @internal
         * @ignore
         * Deals with the iteration of all the available results of {@link listPropertiesOfSecrets}.
         * @param {ListPropertiesOfSecretsOptions} [options] Optional parameters for the underlying HTTP request.
         */
        SecretClient.prototype.listPropertiesOfSecretsAll = function (options) {
            if (options === void 0) { options = {}; }
            return __asyncGenerator(this, arguments, function listPropertiesOfSecretsAll_1() {
                var f, _a, _b, page, _i, page_2, item, e_2_1;
                var e_2, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            f = {};
                            _d.label = 1;
                        case 1:
                            _d.trys.push([1, 10, 11, 16]);
                            _a = __asyncValues(this.listPropertiesOfSecretsPage(f, options));
                            _d.label = 2;
                        case 2: return [4 /*yield*/, __await(_a.next())];
                        case 3:
                            if (!(_b = _d.sent(), !_b.done)) return [3 /*break*/, 9];
                            page = _b.value;
                            _i = 0, page_2 = page;
                            _d.label = 4;
                        case 4:
                            if (!(_i < page_2.length)) return [3 /*break*/, 8];
                            item = page_2[_i];
                            return [4 /*yield*/, __await(item)];
                        case 5: return [4 /*yield*/, _d.sent()];
                        case 6:
                            _d.sent();
                            _d.label = 7;
                        case 7:
                            _i++;
                            return [3 /*break*/, 4];
                        case 8: return [3 /*break*/, 2];
                        case 9: return [3 /*break*/, 16];
                        case 10:
                            e_2_1 = _d.sent();
                            e_2 = { error: e_2_1 };
                            return [3 /*break*/, 16];
                        case 11:
                            _d.trys.push([11, , 14, 15]);
                            if (!(_b && !_b.done && (_c = _a.return))) return [3 /*break*/, 13];
                            return [4 /*yield*/, __await(_c.call(_a))];
                        case 12:
                            _d.sent();
                            _d.label = 13;
                        case 13: return [3 /*break*/, 15];
                        case 14:
                            if (e_2) throw e_2.error;
                            return [7 /*endfinally*/];
                        case 15: return [7 /*endfinally*/];
                        case 16: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Iterates the latest version of all secrets in the vault.  The full secret identifier and attributes are provided
         * in the response. No values are returned for the secrets. This operations requires the secrets/list permission.
         *
         * Example usage:
         * ```ts
         * let client = new SecretClient(url, credentials);
         * for await (const secretProperties of client.listPropertiesOfSecrets()) {
         *   const secret = await client.getSecret(secretProperties.name);
         *   console.log("secret: ", secret);
         * }
         * ```
         * @summary List all secrets in the vault.
         * @param {ListPropertiesOfSecretsOptions} [options] The optional parameters.
         */
        SecretClient.prototype.listPropertiesOfSecrets = function (options) {
            var _a;
            var _this = this;
            if (options === void 0) { options = {}; }
            var requestOptions = operationOptionsToRequestOptionsBase(options);
            var span = this.createSpan("listPropertiesOfSecrets", requestOptions);
            var updatedOptions = __assign(__assign({}, requestOptions), this.setParentSpan(span, requestOptions));
            var iter = this.listPropertiesOfSecretsAll(updatedOptions);
            span.end();
            return _a = {
                    next: function () {
                        return iter.next();
                    }
                },
                _a[Symbol.asyncIterator] = function () {
                    return this;
                },
                _a.byPage = function (settings) {
                    if (settings === void 0) { settings = {}; }
                    return _this.listPropertiesOfSecretsPage(settings, updatedOptions);
                },
                _a;
        };
        /**
         * @internal
         * @ignore
         * Deals with the pagination of {@link listDeletedSecrets}.
         * @param {PageSettings} continuationState An object that indicates the position of the paginated request.
         * @param {ListDeletedSecretsOptions} [options] Optional parameters for the underlying HTTP request.
         */
        SecretClient.prototype.listDeletedSecretsPage = function (continuationState, options) {
            if (options === void 0) { options = {}; }
            return __asyncGenerator(this, arguments, function listDeletedSecretsPage_1() {
                var optionsComplete, currentSetResponse, currentSetResponse;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(continuationState.continuationToken == null)) return [3 /*break*/, 4];
                            optionsComplete = __assign({ maxresults: continuationState.maxPageSize }, options);
                            return [4 /*yield*/, __await(this.client.getDeletedSecrets(this.vaultUrl, optionsComplete))];
                        case 1:
                            currentSetResponse = _a.sent();
                            continuationState.continuationToken = currentSetResponse.nextLink;
                            if (!currentSetResponse.value) return [3 /*break*/, 4];
                            return [4 /*yield*/, __await(currentSetResponse.value.map(function (bundle) { return _this.getSecretFromSecretBundle(bundle); }))];
                        case 2: return [4 /*yield*/, _a.sent()];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            if (!continuationState.continuationToken) return [3 /*break*/, 10];
                            return [4 /*yield*/, __await(this.client.getDeletedSecrets(continuationState.continuationToken, options))];
                        case 5:
                            currentSetResponse = _a.sent();
                            continuationState.continuationToken = currentSetResponse.nextLink;
                            if (!currentSetResponse.value) return [3 /*break*/, 8];
                            return [4 /*yield*/, __await(currentSetResponse.value.map(function (bundle) { return _this.getSecretFromSecretBundle(bundle); }))];
                        case 6: return [4 /*yield*/, _a.sent()];
                        case 7:
                            _a.sent();
                            return [3 /*break*/, 9];
                        case 8: return [3 /*break*/, 10];
                        case 9: return [3 /*break*/, 4];
                        case 10: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @internal
         * @ignore
         * Deals with the iteration of all the available results of {@link listDeletedSecrets}.
         * @param {ListDeletedSecretsOptions} [options] Optional parameters for the underlying HTTP request.
         */
        SecretClient.prototype.listDeletedSecretsAll = function (options) {
            if (options === void 0) { options = {}; }
            return __asyncGenerator(this, arguments, function listDeletedSecretsAll_1() {
                var f, _a, _b, page, _i, page_3, item, e_3_1;
                var e_3, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            f = {};
                            _d.label = 1;
                        case 1:
                            _d.trys.push([1, 10, 11, 16]);
                            _a = __asyncValues(this.listDeletedSecretsPage(f, options));
                            _d.label = 2;
                        case 2: return [4 /*yield*/, __await(_a.next())];
                        case 3:
                            if (!(_b = _d.sent(), !_b.done)) return [3 /*break*/, 9];
                            page = _b.value;
                            _i = 0, page_3 = page;
                            _d.label = 4;
                        case 4:
                            if (!(_i < page_3.length)) return [3 /*break*/, 8];
                            item = page_3[_i];
                            return [4 /*yield*/, __await(item)];
                        case 5: return [4 /*yield*/, _d.sent()];
                        case 6:
                            _d.sent();
                            _d.label = 7;
                        case 7:
                            _i++;
                            return [3 /*break*/, 4];
                        case 8: return [3 /*break*/, 2];
                        case 9: return [3 /*break*/, 16];
                        case 10:
                            e_3_1 = _d.sent();
                            e_3 = { error: e_3_1 };
                            return [3 /*break*/, 16];
                        case 11:
                            _d.trys.push([11, , 14, 15]);
                            if (!(_b && !_b.done && (_c = _a.return))) return [3 /*break*/, 13];
                            return [4 /*yield*/, __await(_c.call(_a))];
                        case 12:
                            _d.sent();
                            _d.label = 13;
                        case 13: return [3 /*break*/, 15];
                        case 14:
                            if (e_3) throw e_3.error;
                            return [7 /*endfinally*/];
                        case 15: return [7 /*endfinally*/];
                        case 16: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Iterates the deleted secrets in the vault.  The full secret identifier and attributes are provided
         * in the response. No values are returned for the secrets. This operations requires the secrets/list permission.
         *
         * Example usage:
         * ```ts
         * let client = new SecretClient(url, credentials);
         * for await (const deletedSecret of client.listDeletedSecrets()) {
         *   const deletedSecret = await client.getSecret(deletedSecret.name);
         *   console.log("deleted secret: ", deletedSecret);
         * }
         * ```
         * @summary List all secrets in the vault.
         * @param {ListDeletedSecretsOptions} [options] The optional parameters.
         */
        SecretClient.prototype.listDeletedSecrets = function (options) {
            var _a;
            var _this = this;
            if (options === void 0) { options = {}; }
            var requestOptions = operationOptionsToRequestOptionsBase(options);
            var span = this.createSpan("listDeletedSecrets", requestOptions);
            var updatedOptions = __assign(__assign({}, requestOptions), this.setParentSpan(span, requestOptions));
            var iter = this.listDeletedSecretsAll(updatedOptions);
            span.end();
            return _a = {
                    next: function () {
                        return iter.next();
                    }
                },
                _a[Symbol.asyncIterator] = function () {
                    return this;
                },
                _a.byPage = function (settings) {
                    if (settings === void 0) { settings = {}; }
                    return _this.listDeletedSecretsPage(settings, updatedOptions);
                },
                _a;
        };
        /**
         * @internal
         * @ignore
         * Shapes the exposed {@link KeyVaultSecret} based on either a received secret bundle or deleted secret bundle.
         */
        SecretClient.prototype.getSecretFromSecretBundle = function (bundle) {
            var secretBundle = bundle;
            var deletedSecretBundle = bundle;
            var parsedId = parseKeyvaultIdentifier("secrets", secretBundle.id);
            var attributes = secretBundle.attributes;
            delete secretBundle.attributes;
            var resultObject = {
                value: secretBundle.value,
                name: parsedId.name,
                properties: __assign(__assign(__assign({ vaultUrl: parsedId.vaultUrl, expiresOn: attributes.expires, createdOn: attributes.created, updatedOn: attributes.updated }, secretBundle), parsedId), attributes)
            };
            if (deletedSecretBundle.deletedDate) {
                resultObject.properties.deletedOn = deletedSecretBundle.deletedDate;
                delete resultObject.properties.deletedDate;
            }
            if (attributes) {
                if (attributes.vaultUrl) {
                    delete resultObject.properties.vaultUrl;
                }
                if (attributes.expires) {
                    delete resultObject.properties.expires;
                }
                if (attributes.created) {
                    delete resultObject.properties.created;
                }
                if (attributes.updated) {
                    delete resultObject.properties.updated;
                }
            }
            return resultObject;
        };
        /**
         * @internal
         * @ignore
         * Creates a span using the tracer that was set by the user
         * @param {string} methodName The name of the method creating the span.
         * @param {RequestOptionsBase} [options] The options for the underlying HTTP request.
         */
        SecretClient.prototype.createSpan = function (methodName, requestOptions) {
            if (requestOptions === void 0) { requestOptions = {}; }
            var tracer = getTracer();
            var span = tracer.startSpan(methodName, requestOptions && requestOptions.spanOptions);
            span.setAttribute("az.namespace", "Microsoft.KeyVault");
            return span;
        };
        /**
         * @internal
         * @ignore
         * Returns updated HTTP options with the given span as the parent of future spans,
         * if applicable.
         * @param {Span} span The span for the current operation.
         * @param {RequestOptionsBase} [options] The options for the underlying HTTP request.
         */
        SecretClient.prototype.setParentSpan = function (span, options) {
            if (options === void 0) { options = {}; }
            if (span.isRecording()) {
                var spanOptions = options.spanOptions || {};
                return __assign(__assign({}, options), { spanOptions: __assign(__assign({}, spanOptions), { parent: span, attributes: __assign(__assign({}, spanOptions.attributes), { "az.namespace": "Microsoft.KeyVault" }) }) });
            }
            else {
                return options;
            }
        };
        return SecretClient;
    }());

    exports.SecretClient = SecretClient;
    exports.logger = logger$1;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=azure-keyvault-secrets.js.map
