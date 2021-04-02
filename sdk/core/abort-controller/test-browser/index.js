(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}((function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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

    var __createBinding = Object.create ? (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
    }) : (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    });

    function __exportStar(m, o) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
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

    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }

    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
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

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    var __setModuleDefault = Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
        o["default"] = v;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function commonjsRequire () {
    	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
    }

    function unwrapExports (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    function getCjsExportFromNamespace (n) {
    	return n && n['default'] || n;
    }

    /*
    object-assign
    (c) Sindre Sorhus
    @license MIT
    */

    'use strict';
    /* eslint-disable no-unused-vars */
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;

    function toObject(val) {
    	if (val === null || val === undefined) {
    		throw new TypeError('Object.assign cannot be called with null or undefined');
    	}

    	return Object(val);
    }

    function shouldUseNative() {
    	try {
    		if (!Object.assign) {
    			return false;
    		}

    		// Detect buggy property enumeration order in older V8 versions.

    		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
    		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
    		test1[5] = 'de';
    		if (Object.getOwnPropertyNames(test1)[0] === '5') {
    			return false;
    		}

    		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
    		var test2 = {};
    		for (var i = 0; i < 10; i++) {
    			test2['_' + String.fromCharCode(i)] = i;
    		}
    		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
    			return test2[n];
    		});
    		if (order2.join('') !== '0123456789') {
    			return false;
    		}

    		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
    		var test3 = {};
    		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
    			test3[letter] = letter;
    		});
    		if (Object.keys(Object.assign({}, test3)).join('') !==
    				'abcdefghijklmnopqrst') {
    			return false;
    		}

    		return true;
    	} catch (err) {
    		// We don't expect any of the above to throw, but better to be safe.
    		return false;
    	}
    }

    var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
    	var from;
    	var to = toObject(target);
    	var symbols;

    	for (var s = 1; s < arguments.length; s++) {
    		from = Object(arguments[s]);

    		for (var key in from) {
    			if (hasOwnProperty.call(from, key)) {
    				to[key] = from[key];
    			}
    		}

    		if (getOwnPropertySymbols) {
    			symbols = getOwnPropertySymbols(from);
    			for (var i = 0; i < symbols.length; i++) {
    				if (propIsEnumerable.call(from, symbols[i])) {
    					to[symbols[i]] = from[symbols[i]];
    				}
    			}
    		}
    	}

    	return to;
    };

    var isBufferBrowser = function isBuffer(arg) {
      return arg && typeof arg === 'object'
        && typeof arg.copy === 'function'
        && typeof arg.fill === 'function'
        && typeof arg.readUInt8 === 'function';
    };

    var inherits_browser = createCommonjsModule(function (module) {
    if (typeof Object.create === 'function') {
      // implementation from standard node.js 'util' module
      module.exports = function inherits(ctor, superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
      };
    } else {
      // old school shim for old browsers
      module.exports = function inherits(ctor, superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function () {};
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      };
    }
    });

    var util = createCommonjsModule(function (module, exports) {
    // Copyright Joyent, Inc. and other Node contributors.
    //
    // Permission is hereby granted, free of charge, to any person obtaining a
    // copy of this software and associated documentation files (the
    // "Software"), to deal in the Software without restriction, including
    // without limitation the rights to use, copy, modify, merge, publish,
    // distribute, sublicense, and/or sell copies of the Software, and to permit
    // persons to whom the Software is furnished to do so, subject to the
    // following conditions:
    //
    // The above copyright notice and this permission notice shall be included
    // in all copies or substantial portions of the Software.
    //
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
    // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
    // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
    // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
    // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
    // USE OR OTHER DEALINGS IN THE SOFTWARE.

    var formatRegExp = /%[sdj%]/g;
    exports.format = function(f) {
      if (!isString(f)) {
        var objects = [];
        for (var i = 0; i < arguments.length; i++) {
          objects.push(inspect(arguments[i]));
        }
        return objects.join(' ');
      }

      var i = 1;
      var args = arguments;
      var len = args.length;
      var str = String(f).replace(formatRegExp, function(x) {
        if (x === '%%') return '%';
        if (i >= len) return x;
        switch (x) {
          case '%s': return String(args[i++]);
          case '%d': return Number(args[i++]);
          case '%j':
            try {
              return JSON.stringify(args[i++]);
            } catch (_) {
              return '[Circular]';
            }
          default:
            return x;
        }
      });
      for (var x = args[i]; i < len; x = args[++i]) {
        if (isNull(x) || !isObject(x)) {
          str += ' ' + x;
        } else {
          str += ' ' + inspect(x);
        }
      }
      return str;
    };


    // Mark that a method should not be used.
    // Returns a modified function which warns once by default.
    // If --no-deprecation is set, then it is a no-op.
    exports.deprecate = function(fn, msg) {
      // Allow for deprecating things in the process of starting up.
      if (isUndefined(commonjsGlobal.process)) {
        return function() {
          return exports.deprecate(fn, msg).apply(this, arguments);
        };
      }

      if (process.noDeprecation === true) {
        return fn;
      }

      var warned = false;
      function deprecated() {
        if (!warned) {
          if (process.throwDeprecation) {
            throw new Error(msg);
          } else if (process.traceDeprecation) {
            console.trace(msg);
          } else {
            console.error(msg);
          }
          warned = true;
        }
        return fn.apply(this, arguments);
      }

      return deprecated;
    };


    var debugs = {};
    var debugEnviron;
    exports.debuglog = function(set) {
      if (isUndefined(debugEnviron))
        debugEnviron = process.env.NODE_DEBUG || '';
      set = set.toUpperCase();
      if (!debugs[set]) {
        if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
          var pid = process.pid;
          debugs[set] = function() {
            var msg = exports.format.apply(exports, arguments);
            console.error('%s %d: %s', set, pid, msg);
          };
        } else {
          debugs[set] = function() {};
        }
      }
      return debugs[set];
    };


    /**
     * Echos the value of a value. Trys to print the value out
     * in the best way possible given the different types.
     *
     * @param {Object} obj The object to print out.
     * @param {Object} opts Optional options object that alters the output.
     */
    /* legacy: obj, showHidden, depth, colors*/
    function inspect(obj, opts) {
      // default options
      var ctx = {
        seen: [],
        stylize: stylizeNoColor
      };
      // legacy...
      if (arguments.length >= 3) ctx.depth = arguments[2];
      if (arguments.length >= 4) ctx.colors = arguments[3];
      if (isBoolean(opts)) {
        // legacy...
        ctx.showHidden = opts;
      } else if (opts) {
        // got an "options" object
        exports._extend(ctx, opts);
      }
      // set default options
      if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
      if (isUndefined(ctx.depth)) ctx.depth = 2;
      if (isUndefined(ctx.colors)) ctx.colors = false;
      if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
      if (ctx.colors) ctx.stylize = stylizeWithColor;
      return formatValue(ctx, obj, ctx.depth);
    }
    exports.inspect = inspect;


    // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
    inspect.colors = {
      'bold' : [1, 22],
      'italic' : [3, 23],
      'underline' : [4, 24],
      'inverse' : [7, 27],
      'white' : [37, 39],
      'grey' : [90, 39],
      'black' : [30, 39],
      'blue' : [34, 39],
      'cyan' : [36, 39],
      'green' : [32, 39],
      'magenta' : [35, 39],
      'red' : [31, 39],
      'yellow' : [33, 39]
    };

    // Don't use 'blue' not visible on cmd.exe
    inspect.styles = {
      'special': 'cyan',
      'number': 'yellow',
      'boolean': 'yellow',
      'undefined': 'grey',
      'null': 'bold',
      'string': 'green',
      'date': 'magenta',
      // "name": intentionally not styling
      'regexp': 'red'
    };


    function stylizeWithColor(str, styleType) {
      var style = inspect.styles[styleType];

      if (style) {
        return '\u001b[' + inspect.colors[style][0] + 'm' + str +
               '\u001b[' + inspect.colors[style][1] + 'm';
      } else {
        return str;
      }
    }


    function stylizeNoColor(str, styleType) {
      return str;
    }


    function arrayToHash(array) {
      var hash = {};

      array.forEach(function(val, idx) {
        hash[val] = true;
      });

      return hash;
    }


    function formatValue(ctx, value, recurseTimes) {
      // Provide a hook for user-specified inspect functions.
      // Check that value is an object with an inspect function on it
      if (ctx.customInspect &&
          value &&
          isFunction(value.inspect) &&
          // Filter out the util module, it's inspect function is special
          value.inspect !== exports.inspect &&
          // Also filter out any prototype objects using the circular check.
          !(value.constructor && value.constructor.prototype === value)) {
        var ret = value.inspect(recurseTimes, ctx);
        if (!isString(ret)) {
          ret = formatValue(ctx, ret, recurseTimes);
        }
        return ret;
      }

      // Primitive types cannot have properties
      var primitive = formatPrimitive(ctx, value);
      if (primitive) {
        return primitive;
      }

      // Look up the keys of the object.
      var keys = Object.keys(value);
      var visibleKeys = arrayToHash(keys);

      if (ctx.showHidden) {
        keys = Object.getOwnPropertyNames(value);
      }

      // IE doesn't make error fields non-enumerable
      // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
      if (isError(value)
          && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
        return formatError(value);
      }

      // Some type of object without properties can be shortcutted.
      if (keys.length === 0) {
        if (isFunction(value)) {
          var name = value.name ? ': ' + value.name : '';
          return ctx.stylize('[Function' + name + ']', 'special');
        }
        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
        }
        if (isDate(value)) {
          return ctx.stylize(Date.prototype.toString.call(value), 'date');
        }
        if (isError(value)) {
          return formatError(value);
        }
      }

      var base = '', array = false, braces = ['{', '}'];

      // Make Array say that they are Array
      if (isArray(value)) {
        array = true;
        braces = ['[', ']'];
      }

      // Make functions say that they are functions
      if (isFunction(value)) {
        var n = value.name ? ': ' + value.name : '';
        base = ' [Function' + n + ']';
      }

      // Make RegExps say that they are RegExps
      if (isRegExp(value)) {
        base = ' ' + RegExp.prototype.toString.call(value);
      }

      // Make dates with properties first say the date
      if (isDate(value)) {
        base = ' ' + Date.prototype.toUTCString.call(value);
      }

      // Make error with message first say the error
      if (isError(value)) {
        base = ' ' + formatError(value);
      }

      if (keys.length === 0 && (!array || value.length == 0)) {
        return braces[0] + base + braces[1];
      }

      if (recurseTimes < 0) {
        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
        } else {
          return ctx.stylize('[Object]', 'special');
        }
      }

      ctx.seen.push(value);

      var output;
      if (array) {
        output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
      } else {
        output = keys.map(function(key) {
          return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
        });
      }

      ctx.seen.pop();

      return reduceToSingleString(output, base, braces);
    }


    function formatPrimitive(ctx, value) {
      if (isUndefined(value))
        return ctx.stylize('undefined', 'undefined');
      if (isString(value)) {
        var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                                 .replace(/'/g, "\\'")
                                                 .replace(/\\"/g, '"') + '\'';
        return ctx.stylize(simple, 'string');
      }
      if (isNumber(value))
        return ctx.stylize('' + value, 'number');
      if (isBoolean(value))
        return ctx.stylize('' + value, 'boolean');
      // For some reason typeof null is "object", so special case here.
      if (isNull(value))
        return ctx.stylize('null', 'null');
    }


    function formatError(value) {
      return '[' + Error.prototype.toString.call(value) + ']';
    }


    function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
      var output = [];
      for (var i = 0, l = value.length; i < l; ++i) {
        if (hasOwnProperty(value, String(i))) {
          output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
              String(i), true));
        } else {
          output.push('');
        }
      }
      keys.forEach(function(key) {
        if (!key.match(/^\d+$/)) {
          output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
              key, true));
        }
      });
      return output;
    }


    function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
      var name, str, desc;
      desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
      if (desc.get) {
        if (desc.set) {
          str = ctx.stylize('[Getter/Setter]', 'special');
        } else {
          str = ctx.stylize('[Getter]', 'special');
        }
      } else {
        if (desc.set) {
          str = ctx.stylize('[Setter]', 'special');
        }
      }
      if (!hasOwnProperty(visibleKeys, key)) {
        name = '[' + key + ']';
      }
      if (!str) {
        if (ctx.seen.indexOf(desc.value) < 0) {
          if (isNull(recurseTimes)) {
            str = formatValue(ctx, desc.value, null);
          } else {
            str = formatValue(ctx, desc.value, recurseTimes - 1);
          }
          if (str.indexOf('\n') > -1) {
            if (array) {
              str = str.split('\n').map(function(line) {
                return '  ' + line;
              }).join('\n').substr(2);
            } else {
              str = '\n' + str.split('\n').map(function(line) {
                return '   ' + line;
              }).join('\n');
            }
          }
        } else {
          str = ctx.stylize('[Circular]', 'special');
        }
      }
      if (isUndefined(name)) {
        if (array && key.match(/^\d+$/)) {
          return str;
        }
        name = JSON.stringify('' + key);
        if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
          name = name.substr(1, name.length - 2);
          name = ctx.stylize(name, 'name');
        } else {
          name = name.replace(/'/g, "\\'")
                     .replace(/\\"/g, '"')
                     .replace(/(^"|"$)/g, "'");
          name = ctx.stylize(name, 'string');
        }
      }

      return name + ': ' + str;
    }


    function reduceToSingleString(output, base, braces) {
      var numLinesEst = 0;
      var length = output.reduce(function(prev, cur) {
        numLinesEst++;
        if (cur.indexOf('\n') >= 0) numLinesEst++;
        return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
      }, 0);

      if (length > 60) {
        return braces[0] +
               (base === '' ? '' : base + '\n ') +
               ' ' +
               output.join(',\n  ') +
               ' ' +
               braces[1];
      }

      return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
    }


    // NOTE: These type checking functions intentionally don't use `instanceof`
    // because it is fragile and can be easily faked with `Object.create()`.
    function isArray(ar) {
      return Array.isArray(ar);
    }
    exports.isArray = isArray;

    function isBoolean(arg) {
      return typeof arg === 'boolean';
    }
    exports.isBoolean = isBoolean;

    function isNull(arg) {
      return arg === null;
    }
    exports.isNull = isNull;

    function isNullOrUndefined(arg) {
      return arg == null;
    }
    exports.isNullOrUndefined = isNullOrUndefined;

    function isNumber(arg) {
      return typeof arg === 'number';
    }
    exports.isNumber = isNumber;

    function isString(arg) {
      return typeof arg === 'string';
    }
    exports.isString = isString;

    function isSymbol(arg) {
      return typeof arg === 'symbol';
    }
    exports.isSymbol = isSymbol;

    function isUndefined(arg) {
      return arg === void 0;
    }
    exports.isUndefined = isUndefined;

    function isRegExp(re) {
      return isObject(re) && objectToString(re) === '[object RegExp]';
    }
    exports.isRegExp = isRegExp;

    function isObject(arg) {
      return typeof arg === 'object' && arg !== null;
    }
    exports.isObject = isObject;

    function isDate(d) {
      return isObject(d) && objectToString(d) === '[object Date]';
    }
    exports.isDate = isDate;

    function isError(e) {
      return isObject(e) &&
          (objectToString(e) === '[object Error]' || e instanceof Error);
    }
    exports.isError = isError;

    function isFunction(arg) {
      return typeof arg === 'function';
    }
    exports.isFunction = isFunction;

    function isPrimitive(arg) {
      return arg === null ||
             typeof arg === 'boolean' ||
             typeof arg === 'number' ||
             typeof arg === 'string' ||
             typeof arg === 'symbol' ||  // ES6 symbol
             typeof arg === 'undefined';
    }
    exports.isPrimitive = isPrimitive;

    exports.isBuffer = isBufferBrowser;

    function objectToString(o) {
      return Object.prototype.toString.call(o);
    }


    function pad(n) {
      return n < 10 ? '0' + n.toString(10) : n.toString(10);
    }


    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
                  'Oct', 'Nov', 'Dec'];

    // 26 Feb 16:19:34
    function timestamp() {
      var d = new Date();
      var time = [pad(d.getHours()),
                  pad(d.getMinutes()),
                  pad(d.getSeconds())].join(':');
      return [d.getDate(), months[d.getMonth()], time].join(' ');
    }


    // log is just a thin wrapper to console.log that prepends a timestamp
    exports.log = function() {
      console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
    };


    /**
     * Inherit the prototype methods from one constructor into another.
     *
     * The Function.prototype.inherits from lang.js rewritten as a standalone
     * function (not on Function.prototype). NOTE: If this file is to be loaded
     * during bootstrapping this function needs to be rewritten using some native
     * functions as prototype setup using normal JavaScript does not work as
     * expected during bootstrapping (see mirror.js in r114903).
     *
     * @param {function} ctor Constructor function which needs to inherit the
     *     prototype.
     * @param {function} superCtor Constructor function to inherit prototype from.
     */
    exports.inherits = inherits_browser;

    exports._extend = function(origin, add) {
      // Don't do anything if add isn't an object
      if (!add || !isObject(add)) return origin;

      var keys = Object.keys(add);
      var i = keys.length;
      while (i--) {
        origin[keys[i]] = add[keys[i]];
      }
      return origin;
    };

    function hasOwnProperty(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }
    });
    var util_1 = util.format;
    var util_2 = util.deprecate;
    var util_3 = util.debuglog;
    var util_4 = util.inspect;
    var util_5 = util.isArray;
    var util_6 = util.isBoolean;
    var util_7 = util.isNull;
    var util_8 = util.isNullOrUndefined;
    var util_9 = util.isNumber;
    var util_10 = util.isString;
    var util_11 = util.isSymbol;
    var util_12 = util.isUndefined;
    var util_13 = util.isRegExp;
    var util_14 = util.isObject;
    var util_15 = util.isDate;
    var util_16 = util.isError;
    var util_17 = util.isFunction;
    var util_18 = util.isPrimitive;
    var util_19 = util.isBuffer;
    var util_20 = util.log;
    var util_21 = util.inherits;
    var util_22 = util._extend;

    var assert_1 = createCommonjsModule(function (module) {
    'use strict';



    // compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
    // original notice:

    /*!
     * The buffer module from node.js, for the browser.
     *
     * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
     * @license  MIT
     */
    function compare(a, b) {
      if (a === b) {
        return 0;
      }

      var x = a.length;
      var y = b.length;

      for (var i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
      }

      if (x < y) {
        return -1;
      }
      if (y < x) {
        return 1;
      }
      return 0;
    }
    function isBuffer(b) {
      if (commonjsGlobal.Buffer && typeof commonjsGlobal.Buffer.isBuffer === 'function') {
        return commonjsGlobal.Buffer.isBuffer(b);
      }
      return !!(b != null && b._isBuffer);
    }

    // based on node assert, original notice:
    // NB: The URL to the CommonJS spec is kept just for tradition.
    //     node-assert has evolved a lot since then, both in API and behavior.

    // http://wiki.commonjs.org/wiki/Unit_Testing/1.0
    //
    // THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
    //
    // Originally from narwhal.js (http://narwhaljs.org)
    // Copyright (c) 2009 Thomas Robinson <280north.com>
    //
    // Permission is hereby granted, free of charge, to any person obtaining a copy
    // of this software and associated documentation files (the 'Software'), to
    // deal in the Software without restriction, including without limitation the
    // rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
    // sell copies of the Software, and to permit persons to whom the Software is
    // furnished to do so, subject to the following conditions:
    //
    // The above copyright notice and this permission notice shall be included in
    // all copies or substantial portions of the Software.
    //
    // THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    // FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    // AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
    // ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
    // WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


    var hasOwn = Object.prototype.hasOwnProperty;
    var pSlice = Array.prototype.slice;
    var functionsHaveNames = (function () {
      return function foo() {}.name === 'foo';
    }());
    function pToString (obj) {
      return Object.prototype.toString.call(obj);
    }
    function isView(arrbuf) {
      if (isBuffer(arrbuf)) {
        return false;
      }
      if (typeof commonjsGlobal.ArrayBuffer !== 'function') {
        return false;
      }
      if (typeof ArrayBuffer.isView === 'function') {
        return ArrayBuffer.isView(arrbuf);
      }
      if (!arrbuf) {
        return false;
      }
      if (arrbuf instanceof DataView) {
        return true;
      }
      if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
        return true;
      }
      return false;
    }
    // 1. The assert module provides functions that throw
    // AssertionError's when particular conditions are not met. The
    // assert module must conform to the following interface.

    var assert = module.exports = ok;

    // 2. The AssertionError is defined in assert.
    // new assert.AssertionError({ message: message,
    //                             actual: actual,
    //                             expected: expected })

    var regex = /\s*function\s+([^\(\s]*)\s*/;
    // based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
    function getName(func) {
      if (!util.isFunction(func)) {
        return;
      }
      if (functionsHaveNames) {
        return func.name;
      }
      var str = func.toString();
      var match = str.match(regex);
      return match && match[1];
    }
    assert.AssertionError = function AssertionError(options) {
      this.name = 'AssertionError';
      this.actual = options.actual;
      this.expected = options.expected;
      this.operator = options.operator;
      if (options.message) {
        this.message = options.message;
        this.generatedMessage = false;
      } else {
        this.message = getMessage(this);
        this.generatedMessage = true;
      }
      var stackStartFunction = options.stackStartFunction || fail;
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, stackStartFunction);
      } else {
        // non v8 browsers so we can have a stacktrace
        var err = new Error();
        if (err.stack) {
          var out = err.stack;

          // try to strip useless frames
          var fn_name = getName(stackStartFunction);
          var idx = out.indexOf('\n' + fn_name);
          if (idx >= 0) {
            // once we have located the function frame
            // we need to strip out everything before it (and its line)
            var next_line = out.indexOf('\n', idx + 1);
            out = out.substring(next_line + 1);
          }

          this.stack = out;
        }
      }
    };

    // assert.AssertionError instanceof Error
    util.inherits(assert.AssertionError, Error);

    function truncate(s, n) {
      if (typeof s === 'string') {
        return s.length < n ? s : s.slice(0, n);
      } else {
        return s;
      }
    }
    function inspect(something) {
      if (functionsHaveNames || !util.isFunction(something)) {
        return util.inspect(something);
      }
      var rawname = getName(something);
      var name = rawname ? ': ' + rawname : '';
      return '[Function' +  name + ']';
    }
    function getMessage(self) {
      return truncate(inspect(self.actual), 128) + ' ' +
             self.operator + ' ' +
             truncate(inspect(self.expected), 128);
    }

    // At present only the three keys mentioned above are used and
    // understood by the spec. Implementations or sub modules can pass
    // other keys to the AssertionError's constructor - they will be
    // ignored.

    // 3. All of the following functions must throw an AssertionError
    // when a corresponding condition is not met, with a message that
    // may be undefined if not provided.  All assertion methods provide
    // both the actual and expected values to the assertion error for
    // display purposes.

    function fail(actual, expected, message, operator, stackStartFunction) {
      throw new assert.AssertionError({
        message: message,
        actual: actual,
        expected: expected,
        operator: operator,
        stackStartFunction: stackStartFunction
      });
    }

    // EXTENSION! allows for well behaved errors defined elsewhere.
    assert.fail = fail;

    // 4. Pure assertion tests whether a value is truthy, as determined
    // by !!guard.
    // assert.ok(guard, message_opt);
    // This statement is equivalent to assert.equal(true, !!guard,
    // message_opt);. To test strictly for the value true, use
    // assert.strictEqual(true, guard, message_opt);.

    function ok(value, message) {
      if (!value) fail(value, true, message, '==', assert.ok);
    }
    assert.ok = ok;

    // 5. The equality assertion tests shallow, coercive equality with
    // ==.
    // assert.equal(actual, expected, message_opt);

    assert.equal = function equal(actual, expected, message) {
      if (actual != expected) fail(actual, expected, message, '==', assert.equal);
    };

    // 6. The non-equality assertion tests for whether two objects are not equal
    // with != assert.notEqual(actual, expected, message_opt);

    assert.notEqual = function notEqual(actual, expected, message) {
      if (actual == expected) {
        fail(actual, expected, message, '!=', assert.notEqual);
      }
    };

    // 7. The equivalence assertion tests a deep equality relation.
    // assert.deepEqual(actual, expected, message_opt);

    assert.deepEqual = function deepEqual(actual, expected, message) {
      if (!_deepEqual(actual, expected, false)) {
        fail(actual, expected, message, 'deepEqual', assert.deepEqual);
      }
    };

    assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
      if (!_deepEqual(actual, expected, true)) {
        fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
      }
    };

    function _deepEqual(actual, expected, strict, memos) {
      // 7.1. All identical values are equivalent, as determined by ===.
      if (actual === expected) {
        return true;
      } else if (isBuffer(actual) && isBuffer(expected)) {
        return compare(actual, expected) === 0;

      // 7.2. If the expected value is a Date object, the actual value is
      // equivalent if it is also a Date object that refers to the same time.
      } else if (util.isDate(actual) && util.isDate(expected)) {
        return actual.getTime() === expected.getTime();

      // 7.3 If the expected value is a RegExp object, the actual value is
      // equivalent if it is also a RegExp object with the same source and
      // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
      } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
        return actual.source === expected.source &&
               actual.global === expected.global &&
               actual.multiline === expected.multiline &&
               actual.lastIndex === expected.lastIndex &&
               actual.ignoreCase === expected.ignoreCase;

      // 7.4. Other pairs that do not both pass typeof value == 'object',
      // equivalence is determined by ==.
      } else if ((actual === null || typeof actual !== 'object') &&
                 (expected === null || typeof expected !== 'object')) {
        return strict ? actual === expected : actual == expected;

      // If both values are instances of typed arrays, wrap their underlying
      // ArrayBuffers in a Buffer each to increase performance
      // This optimization requires the arrays to have the same type as checked by
      // Object.prototype.toString (aka pToString). Never perform binary
      // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
      // bit patterns are not identical.
      } else if (isView(actual) && isView(expected) &&
                 pToString(actual) === pToString(expected) &&
                 !(actual instanceof Float32Array ||
                   actual instanceof Float64Array)) {
        return compare(new Uint8Array(actual.buffer),
                       new Uint8Array(expected.buffer)) === 0;

      // 7.5 For all other Object pairs, including Array objects, equivalence is
      // determined by having the same number of owned properties (as verified
      // with Object.prototype.hasOwnProperty.call), the same set of keys
      // (although not necessarily the same order), equivalent values for every
      // corresponding key, and an identical 'prototype' property. Note: this
      // accounts for both named and indexed properties on Arrays.
      } else if (isBuffer(actual) !== isBuffer(expected)) {
        return false;
      } else {
        memos = memos || {actual: [], expected: []};

        var actualIndex = memos.actual.indexOf(actual);
        if (actualIndex !== -1) {
          if (actualIndex === memos.expected.indexOf(expected)) {
            return true;
          }
        }

        memos.actual.push(actual);
        memos.expected.push(expected);

        return objEquiv(actual, expected, strict, memos);
      }
    }

    function isArguments(object) {
      return Object.prototype.toString.call(object) == '[object Arguments]';
    }

    function objEquiv(a, b, strict, actualVisitedObjects) {
      if (a === null || a === undefined || b === null || b === undefined)
        return false;
      // if one is a primitive, the other must be same
      if (util.isPrimitive(a) || util.isPrimitive(b))
        return a === b;
      if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
        return false;
      var aIsArgs = isArguments(a);
      var bIsArgs = isArguments(b);
      if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
        return false;
      if (aIsArgs) {
        a = pSlice.call(a);
        b = pSlice.call(b);
        return _deepEqual(a, b, strict);
      }
      var ka = objectKeys(a);
      var kb = objectKeys(b);
      var key, i;
      // having the same number of owned properties (keys incorporates
      // hasOwnProperty)
      if (ka.length !== kb.length)
        return false;
      //the same set of keys (although not necessarily the same order),
      ka.sort();
      kb.sort();
      //~~~cheap key test
      for (i = ka.length - 1; i >= 0; i--) {
        if (ka[i] !== kb[i])
          return false;
      }
      //equivalent values for every corresponding key, and
      //~~~possibly expensive deep test
      for (i = ka.length - 1; i >= 0; i--) {
        key = ka[i];
        if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
          return false;
      }
      return true;
    }

    // 8. The non-equivalence assertion tests for any deep inequality.
    // assert.notDeepEqual(actual, expected, message_opt);

    assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
      if (_deepEqual(actual, expected, false)) {
        fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
      }
    };

    assert.notDeepStrictEqual = notDeepStrictEqual;
    function notDeepStrictEqual(actual, expected, message) {
      if (_deepEqual(actual, expected, true)) {
        fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
      }
    }


    // 9. The strict equality assertion tests strict equality, as determined by ===.
    // assert.strictEqual(actual, expected, message_opt);

    assert.strictEqual = function strictEqual(actual, expected, message) {
      if (actual !== expected) {
        fail(actual, expected, message, '===', assert.strictEqual);
      }
    };

    // 10. The strict non-equality assertion tests for strict inequality, as
    // determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

    assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
      if (actual === expected) {
        fail(actual, expected, message, '!==', assert.notStrictEqual);
      }
    };

    function expectedException(actual, expected) {
      if (!actual || !expected) {
        return false;
      }

      if (Object.prototype.toString.call(expected) == '[object RegExp]') {
        return expected.test(actual);
      }

      try {
        if (actual instanceof expected) {
          return true;
        }
      } catch (e) {
        // Ignore.  The instanceof check doesn't work for arrow functions.
      }

      if (Error.isPrototypeOf(expected)) {
        return false;
      }

      return expected.call({}, actual) === true;
    }

    function _tryBlock(block) {
      var error;
      try {
        block();
      } catch (e) {
        error = e;
      }
      return error;
    }

    function _throws(shouldThrow, block, expected, message) {
      var actual;

      if (typeof block !== 'function') {
        throw new TypeError('"block" argument must be a function');
      }

      if (typeof expected === 'string') {
        message = expected;
        expected = null;
      }

      actual = _tryBlock(block);

      message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
                (message ? ' ' + message : '.');

      if (shouldThrow && !actual) {
        fail(actual, expected, 'Missing expected exception' + message);
      }

      var userProvidedMessage = typeof message === 'string';
      var isUnwantedException = !shouldThrow && util.isError(actual);
      var isUnexpectedException = !shouldThrow && actual && !expected;

      if ((isUnwantedException &&
          userProvidedMessage &&
          expectedException(actual, expected)) ||
          isUnexpectedException) {
        fail(actual, expected, 'Got unwanted exception' + message);
      }

      if ((shouldThrow && actual && expected &&
          !expectedException(actual, expected)) || (!shouldThrow && actual)) {
        throw actual;
      }
    }

    // 11. Expected to throw an error:
    // assert.throws(block, Error_opt, message_opt);

    assert.throws = function(block, /*optional*/error, /*optional*/message) {
      _throws(true, block, error, message);
    };

    // EXTENSION! This is annoying to write outside this module.
    assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
      _throws(false, block, error, message);
    };

    assert.ifError = function(err) { if (err) throw err; };

    // Expose a strict only variant of assert
    function strict(value, message) {
      if (!value) fail(value, true, message, '==', strict);
    }
    assert.strict = objectAssign(strict, assert, {
      equal: assert.strictEqual,
      deepEqual: assert.deepStrictEqual,
      notEqual: assert.notStrictEqual,
      notDeepEqual: assert.notDeepStrictEqual
    });
    assert.strict.strict = assert.strict;

    var objectKeys = Object.keys || function (obj) {
      var keys = [];
      for (var key in obj) {
        if (hasOwn.call(obj, key)) keys.push(key);
      }
      return keys;
    };
    });
    var assert_2 = assert_1.ok;
    var assert_3 = assert_1.deepEqual;
    var assert_4 = assert_1.equal;
    var assert_5 = assert_1.fail;
    var assert_6 = assert_1.deepStrictEqual;
    var assert_7 = assert_1.notDeepEqual;

    // Copyright (c) Microsoft Corporation.
    // Licensed under the MIT license.
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
     * Abort without timeout
     * ```ts
     * await doAsyncWork(AbortSignal.none);
     * ```
     */
    var AbortSignal = /** @class */ (function () {
        function AbortSignal() {
            /**
             * onabort event listener.
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
             */
            get: function () {
                if (!abortedMap.has(this)) {
                    throw new TypeError("Expected `this` to be an instance of AbortSignal.");
                }
                return abortedMap.get(this);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AbortSignal, "none", {
            /**
             * Creates a new AbortSignal instance that will never be aborted.
             *
             * @readonly
             */
            get: function () {
                return new AbortSignal();
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Added new "abort" event listener, only support "abort" event.
         *
         * @param _type - Only support "abort" event
         * @param listener - The listener to be added
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
         * @param _type - Only support "abort" event
         * @param listener - The listener to be removed
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
     * @internal
     */
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
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

    // Copyright (c) Microsoft Corporation.
    /**
     * This error is thrown when an asynchronous operation has been aborted.
     * Check for this error by testing the `name` that the name property of the
     * error matches `"AbortError"`.
     *
     * @example
     * ```ts
     * const controller = new AbortController();
     * controller.abort();
     * try {
     *   doAsyncWork(controller.signal)
     * } catch (e) {
     *   if (e.name === 'AbortError') {
     *     // handle abort error here.
     *   }
     * }
     * ```
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
     * Abort an operation when another event fires
     * ```ts
     * const controller = new AbortController();
     * const signal = controller.signal;
     * doAsyncWork(signal);
     * button.addEventListener('click', () => controller.abort());
     * ```
     *
     * @example
     * Share aborter cross multiple operations in 30s
     * ```ts
     * // Upload the same data to 2 different data centers at the same time,
     * // abort another when any of them is finished
     * const controller = AbortController.withTimeout(30 * 1000);
     * doAsyncWork(controller.signal).then(controller.abort);
     * doAsyncWork(controller.signal).then(controller.abort);
     *```
     *
     * @example
     * Cascaded aborting
     * ```ts
     * // All operations can't take more than 30 seconds
     * const aborter = Aborter.timeout(30 * 1000);
     *
     * // Following 2 operations can't take more than 25 seconds
     * await doAsyncWork(aborter.withTimeout(25 * 1000));
     * await doAsyncWork(aborter.withTimeout(25 * 1000));
     * ```
     */
    var AbortController = /** @class */ (function () {
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        function AbortController(parentSignals) {
            var _this = this;
            this._signal = new AbortSignal();
            if (!parentSignals) {
                return;
            }
            // coerce parentSignals into an array
            if (!Array.isArray(parentSignals)) {
                // eslint-disable-next-line prefer-rest-params
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
             */
            get: function () {
                return this._signal;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Signal that any operations passed this controller's associated abort signal
         * to cancel any remaining work and throw an `AbortError`.
         */
        AbortController.prototype.abort = function () {
            abortSignal(this._signal);
        };
        /**
         * Creates a new AbortSignal instance that will abort after the provided ms.
         * @param ms - Elapsed time in milliseconds to trigger an abort.
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

    // Copyright (c) Microsoft Corporation.
    describe("AbortController", function () {
        function doAsyncOperation(aborter, runningTimeinMs) {
            if (runningTimeinMs === void 0) { runningTimeinMs = 100; }
            var s = Date.now();
            return new Promise(function (resolve, reject) {
                // check status every 10 ms.
                var handle = setInterval(function () {
                    // check if we're aborted.
                    if (aborter.aborted) {
                        clearInterval(handle);
                        return reject(new AbortError());
                    }
                    // if we're completed, resolve.
                    if (Date.now() - s > runningTimeinMs) {
                        clearInterval(handle);
                        return resolve();
                    }
                    // else, continue trying.
                }, 10);
            });
        }
        it("should not abort without calling abort()", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, doAsyncOperation(AbortSignal.none)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should abort when calling abort() before request finishes", function () { return __awaiter(void 0, void 0, void 0, function () {
            var controller, aborter, response, rs, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        controller = new AbortController();
                        aborter = controller.signal;
                        response = doAsyncOperation(aborter);
                        controller.abort();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, response];
                    case 2:
                        rs = _a.sent();
                        console.log("got result", rs);
                        assert_5();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        assert_4(err_1.name, "AbortError");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it("should abort when calling abort() after creation but before request finishes", function () { return __awaiter(void 0, void 0, void 0, function () {
            var controller, aborter, response, r, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        controller = new AbortController();
                        aborter = controller.signal;
                        response = doAsyncOperation(aborter, 500);
                        setTimeout(function () { return controller.abort(); }, 50);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, response];
                    case 2:
                        r = _a.sent();
                        console.log("got, r", r);
                        assert_5();
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        assert_4(err_2.name, "AbortError");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it("should not abort when calling abort() after request finishes", function () { return __awaiter(void 0, void 0, void 0, function () {
            var controller, aborter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        controller = new AbortController();
                        aborter = controller.signal;
                        return [4 /*yield*/, doAsyncOperation(aborter)];
                    case 1:
                        _a.sent();
                        controller.abort();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should invoke onabort callback when aborting", function () { return __awaiter(void 0, void 0, void 0, function () {
            var controller, aborter, s, response, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        controller = new AbortController();
                        aborter = controller.signal;
                        s = undefined;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        aborter.onabort = function () {
                            s = "aborted";
                        };
                        response = doAsyncOperation(aborter);
                        controller.abort();
                        return [4 /*yield*/, response];
                    case 2:
                        _a.sent();
                        assert_5();
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        assert_4(s, "aborted");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it("should invoke abort listener callbacks when aborting", function () { return __awaiter(void 0, void 0, void 0, function () {
            var controller, aborter, s, response, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        controller = new AbortController();
                        aborter = controller.signal;
                        s = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        aborter.addEventListener("abort", function () {
                            s.push("aborted");
                        });
                        aborter.addEventListener("abort", function () {
                            s.push("aborted");
                        });
                        response = doAsyncOperation(aborter);
                        controller.abort();
                        return [4 /*yield*/, response];
                    case 2:
                        _a.sent();
                        assert_5();
                        return [3 /*break*/, 4];
                    case 3:
                        err_4 = _a.sent();
                        assert_3(s, ["aborted", "aborted"]);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it("should abort after timeout when using created using timeout()", function () { return __awaiter(void 0, void 0, void 0, function () {
            var aborter, s, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        aborter = AbortController.timeout(50);
                        s = undefined;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        aborter.onabort = function () {
                            s = "aborted";
                        };
                        return [4 /*yield*/, doAsyncOperation(aborter, 200)];
                    case 2:
                        _a.sent();
                        assert_5();
                        return [3 /*break*/, 4];
                    case 3:
                        err_5 = _a.sent();
                        assert_3(s, "aborted");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it("should propagate aborted state to child signals", function () { return __awaiter(void 0, void 0, void 0, function () {
            var parentController, parentSignal, s, childController;
            return __generator(this, function (_a) {
                parentController = new AbortController();
                parentSignal = parentController.signal;
                s = undefined;
                parentSignal.addEventListener("abort", function () {
                    s = "parent";
                });
                parentController.abort();
                childController = new AbortController(parentSignal);
                assert_4(true, childController.signal.aborted);
                assert_4(s, "parent");
                return [2 /*return*/];
            });
        }); });
        it("should propagate 'true' aborted state from any parent to child signals", function () { return __awaiter(void 0, void 0, void 0, function () {
            var parent1, parent2, parent3, s, childController;
            return __generator(this, function (_a) {
                parent1 = new AbortController();
                parent2 = new AbortController();
                parent3 = new AbortController();
                s = undefined;
                parent1.signal.addEventListener("abort", function () {
                    s = "parent1";
                });
                parent2.signal.addEventListener("abort", function () {
                    s = "parent2";
                });
                parent3.signal.addEventListener("abort", function () {
                    s = "parent3";
                });
                parent1.abort();
                childController = new AbortController(parent1.signal, parent2.signal, parent3.signal);
                assert_4(true, childController.signal.aborted);
                assert_4(true, parent1.signal.aborted);
                assert_4(false, parent2.signal.aborted);
                assert_4(false, parent3.signal.aborted);
                assert_4(s, "parent1");
                return [2 /*return*/];
            });
        }); });
        it("should propagate 'true' aborted state from any parent to child signals (arrays)", function () { return __awaiter(void 0, void 0, void 0, function () {
            var parent1, parent2, parent3, s, childController;
            return __generator(this, function (_a) {
                parent1 = new AbortController();
                parent2 = new AbortController();
                parent3 = new AbortController();
                s = undefined;
                parent1.signal.addEventListener("abort", function () {
                    s = "parent1";
                });
                parent2.signal.addEventListener("abort", function () {
                    s = "parent2";
                });
                parent3.signal.addEventListener("abort", function () {
                    s = "parent3";
                });
                parent1.abort();
                childController = new AbortController([parent1.signal, parent2.signal, parent3.signal]);
                assert_4(true, childController.signal.aborted);
                assert_4(true, parent1.signal.aborted);
                assert_4(false, parent2.signal.aborted);
                assert_4(false, parent3.signal.aborted);
                assert_4(s, "parent1");
                return [2 /*return*/];
            });
        }); });
        it("should call abort() on child signals that were created before parent abort() call", function () {
            return __awaiter(this, void 0, void 0, function () {
                var parentController, parentSignal, child1, child2, values;
                return __generator(this, function (_a) {
                    parentController = new AbortController();
                    parentSignal = parentController.signal;
                    child1 = new AbortController(parentSignal);
                    child2 = new AbortController(parentSignal);
                    values = [];
                    parentSignal.addEventListener("abort", function () {
                        values.push("parent");
                    });
                    child1.signal.addEventListener("abort", function () {
                        values.push("child1");
                    });
                    child2.signal.addEventListener("abort", function () {
                        values.push("child2");
                    });
                    // trigger abort() on parentSignal, event listeners should trigger on children
                    parentController.abort();
                    assert_4(3, values.length);
                    assert_4(true, parentSignal.aborted);
                    assert_4(true, child1.signal.aborted);
                    assert_4(true, child2.signal.aborted);
                    assert_4(true, values.includes("parent"));
                    assert_4(true, values.includes("child1"));
                    assert_4(true, values.includes("child2"));
                    return [2 /*return*/];
                });
            });
        });
        it("should call abort() on child signal that was created before any parent's abort() call", function () { return __awaiter(void 0, void 0, void 0, function () {
            var parent1, parent2, parent3, child, values;
            return __generator(this, function (_a) {
                parent1 = new AbortController();
                parent2 = new AbortController();
                parent3 = new AbortController();
                child = new AbortController(parent1.signal, parent2.signal, parent3.signal);
                values = [];
                parent1.signal.addEventListener("abort", function () {
                    values.push("parent1");
                });
                parent2.signal.addEventListener("abort", function () {
                    values.push("parent2");
                });
                parent3.signal.addEventListener("abort", function () {
                    values.push("parent3");
                });
                child.signal.addEventListener("abort", function () {
                    values.push("child");
                });
                // trigger abort() on a parent, event listeners should trigger on child
                parent2.abort();
                assert_4(true, child.signal.aborted);
                assert_4(false, parent1.signal.aborted);
                assert_4(true, parent2.signal.aborted);
                assert_4(false, parent3.signal.aborted);
                assert_4(2, values.length);
                assert_4(true, values.includes("parent2"));
                assert_4(true, values.includes("child"));
                return [2 /*return*/];
            });
        }); });
        it("should call abort() on child signal that was created before any parent's abort() call (arrays)", function () { return __awaiter(void 0, void 0, void 0, function () {
            var parent1, parent2, parent3, child, values;
            return __generator(this, function (_a) {
                parent1 = new AbortController();
                parent2 = new AbortController();
                parent3 = new AbortController();
                child = new AbortController([parent1.signal, parent2.signal, parent3.signal]);
                values = [];
                parent1.signal.addEventListener("abort", function () {
                    values.push("parent1");
                });
                parent2.signal.addEventListener("abort", function () {
                    values.push("parent2");
                });
                parent3.signal.addEventListener("abort", function () {
                    values.push("parent3");
                });
                child.signal.addEventListener("abort", function () {
                    values.push("child");
                });
                // trigger abort() on a parent, event listeners should trigger on child
                parent2.abort();
                assert_4(true, child.signal.aborted);
                assert_4(false, parent1.signal.aborted);
                assert_4(true, parent2.signal.aborted);
                assert_4(false, parent3.signal.aborted);
                assert_4(2, values.length);
                assert_4(true, values.includes("parent2"));
                assert_4(true, values.includes("child"));
                return [2 /*return*/];
            });
        }); });
        it("should call abort() on deeply nested child signals that were created before parent abort() call", function () {
            return __awaiter(this, void 0, void 0, function () {
                var parentController, parentSignal, child1, child2, values;
                return __generator(this, function (_a) {
                    parentController = new AbortController();
                    parentSignal = parentController.signal;
                    child1 = new AbortController(parentSignal);
                    child2 = new AbortController(child1.signal);
                    values = [];
                    parentSignal.addEventListener("abort", function () {
                        values.push("parent");
                    });
                    child1.signal.addEventListener("abort", function () {
                        values.push("child1");
                    });
                    child2.signal.addEventListener("abort", function () {
                        values.push("child2");
                    });
                    // trigger abort() on parentSignal, event listeners should trigger on children
                    parentController.abort();
                    assert_4(3, values.length);
                    assert_4(true, parentSignal.aborted);
                    assert_4(true, child1.signal.aborted);
                    assert_4(true, child2.signal.aborted);
                    assert_4(true, values.includes("parent"));
                    assert_4(true, values.includes("child1"));
                    assert_4(true, values.includes("child2"));
                    return [2 /*return*/];
                });
            });
        });
        it("should not call abort() on parent signals when child calls abort()", function () {
            return __awaiter(this, void 0, void 0, function () {
                var parentController, parentSignal, child1, child2, values;
                return __generator(this, function (_a) {
                    parentController = new AbortController();
                    parentSignal = parentController.signal;
                    child1 = new AbortController(parentSignal);
                    child2 = new AbortController(child1.signal);
                    values = [];
                    parentSignal.addEventListener("abort", function () {
                        values.push("parent");
                    });
                    child1.signal.addEventListener("abort", function () {
                        values.push("child1");
                    });
                    child2.signal.addEventListener("abort", function () {
                        values.push("child2");
                    });
                    // trigger abort() on child, event listeners should not trigger on parent
                    child1.abort();
                    assert_4(2, values.length);
                    assert_4(false, parentSignal.aborted);
                    assert_4(true, child1.signal.aborted);
                    assert_4(true, child2.signal.aborted);
                    assert_4(true, values.includes("child1"));
                    assert_4(true, values.includes("child2"));
                    // trigger abort() on parent, children should not invoke listeners again
                    parentController.abort();
                    assert_4(3, values.length);
                    assert_4(true, parentSignal.aborted);
                    assert_4(true, child1.signal.aborted);
                    assert_4(true, child2.signal.aborted);
                    assert_4(true, values.includes("parent"));
                    assert_4(true, values.includes("child1"));
                    assert_4(true, values.includes("child2"));
                    return [2 /*return*/];
                });
            });
        });
    });

})));
//# sourceMappingURL=index.js.map
