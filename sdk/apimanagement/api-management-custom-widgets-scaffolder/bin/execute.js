#!/usr/bin/env node
'use strict';

var inquirer = require('inquirer');
var Parser = require('yargs-parser');
var assert = require('assert');
var path = require('path');
var fs = require('fs');
var util = require('util');
var url = require('url');
var chalk = require('chalk');
var glob = require('glob');
var mustache = require('mustache');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var inquirer__default = /*#__PURE__*/_interopDefaultLegacy(inquirer);
var Parser__default = /*#__PURE__*/_interopDefaultLegacy(Parser);
var chalk__default = /*#__PURE__*/_interopDefaultLegacy(chalk);
var mustache__default = /*#__PURE__*/_interopDefaultLegacy(mustache);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/**
 * Unique identifier under which is specified which port to use for injecting locally hosted custom widget to a running DevPortal instance.
 */
const OVERRIDE_PORT_KEY = "MS_APIM_CW_localhost_port";
/**
 * Default port for running local dev server on.
 */
const OVERRIDE_DEFAULT_PORT = 3000;
/** List of all supported technologies to scaffold a widget in. */
const TECHNOLOGIES = ["typescript", "react", "vue"];
/**
 * Converts user defined name of a custom widget to a unique ID, which is in context of Dev Portal known as "name".
 *
 * @param displayName - User defined name of the custom widget.
 */
const displayNameToName = (displayName) => encodeURIComponent(displayName
    .normalize("NFD")
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9-]/g, "-"));
/**
 * Returns name of the folder for widget project.
 *
 * @param name - name of the widget
 */
const widgetFolderName = (name) => `azure-api-management-widget-${name}`;

// Copyright (c) Microsoft Corporation.
const fieldIdToName = {
    displayName: "Widget display name",
    technology: "Technology",
    iconUrl: "iconUrl",
    resourceId: "Azure API Management resource ID (following format: subscriptions/<subscription-id>/resourceGroups/<resource-group-name>/providers/Microsoft.ApiManagement/service/<api-management service-name>)",
    managementApiEndpoint: "Management API hostname",
    apiVersion: "Management API version",
    openUrl: "Developer portal URL",
};
const prefixUrlProtocol = (value) => /https?:\/\//.test(value) ? value : `https://${value}`;
const validateRequired = (name, msg = `The “${name}” parameter is required.`) => (input) => (input != null && input !== "") || msg;
const validateUrl = (name, msg = (input) => `Provided “${name}” parameter value (“${prefixUrlProtocol(input)}”) isn’t a valid URL. Use the correct URL format, e.g., https://contoso.com.`) => (input) => {
    try {
        new URL(prefixUrlProtocol(input));
        return true;
    }
    catch (e) {
        return msg(prefixUrlProtocol(input));
    }
};
const validateWidgetConfig = {
    displayName: validateRequired(fieldIdToName.displayName),
    technology: (input) => {
        const required = validateRequired(fieldIdToName.technology)(input);
        if (required !== true)
            return required;
        if (TECHNOLOGIES.includes(input)) {
            return true;
        }
        else {
            return ("Provided “technology” parameter value isn’t correct. Use one of the following: " +
                TECHNOLOGIES.join(", "));
        }
    },
};
const validateDeployConfig = {
    resourceId: (input) => {
        const required = validateRequired(fieldIdToName.resourceId)(input);
        if (required !== true)
            return required;
        const regex = /^\/?subscriptions\/[^/]+\/resourceGroups\/[^/]+\/providers\/Microsoft\.ApiManagement\/service\/[^/]+\/?$/;
        return input === "test" || regex.test(input)
            ? true
            : "Resource ID needs to be a valid Azure resource ID. For example, subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contoso-group/providers/Microsoft.ApiManagement/service/contoso-apis.";
    },
    managementApiEndpoint: (input) => validateRequired(fieldIdToName.managementApiEndpoint)(input),
};
const validateMiscConfig = {
    openUrl: (input) => {
        if (!input)
            return true;
        return validateUrl(fieldIdToName.openUrl)(input);
    },
};
const promptWidgetConfig = (partial) => inquirer__default["default"].prompt([
    {
        name: "displayName",
        type: "input",
        message: fieldIdToName.displayName,
        validate: validateWidgetConfig.displayName,
    },
    {
        name: "technology",
        type: "list",
        message: fieldIdToName.technology,
        choices: [
            { name: "React", value: "react" },
            { name: "Vue", value: "vue" },
            { name: "TypeScript", value: "typescript" },
        ],
    },
], partial);
const promptDeployConfig = (partial) => inquirer__default["default"].prompt([
    {
        name: "resourceId",
        type: "input",
        message: fieldIdToName.resourceId,
        validate: validateDeployConfig.resourceId,
    },
    {
        name: "managementApiEndpoint",
        type: "list",
        message: fieldIdToName.managementApiEndpoint,
        choices: [
            {
                name: "management.azure.com (if you're not sure what to select, use this option)",
                value: "management.azure.com",
            },
            { name: "management.usgovcloudapi.net", value: "management.usgovcloudapi.net" },
            { name: "management.chinacloudapi.cn", value: "management.chinacloudapi.cn" },
        ],
        transformer: prefixUrlProtocol,
        validate: validateDeployConfig.managementApiEndpoint,
    },
    {
        name: "apiVersion",
        type: "input",
        message: fieldIdToName.apiVersion + " (optional; e.g., 2021-08-01)",
    },
], partial);
const promptMiscConfig = (partial) => inquirer__default["default"].prompt([
    {
        name: "openUrl",
        type: "input",
        message: fieldIdToName.openUrl +
            " for widget development and testing (optional; e.g., https://contoso.developer.azure-api.net/ or http://localhost:8080)",
        transformer: prefixUrlProtocol,
        validate: validateMiscConfig.openUrl,
    },
], partial);

class YError extends Error {
    constructor(msg) {
        super(msg || 'yargs error');
        this.name = 'YError';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, YError);
        }
    }
}

function getProcessArgvBinIndex() {
    if (isBundledElectronApp())
        return 0;
    return 1;
}
function isBundledElectronApp() {
    return isElectronApp() && !process.defaultApp;
}
function isElectronApp() {
    return !!process.versions.electron;
}
function hideBin(argv) {
    return argv.slice(getProcessArgvBinIndex() + 1);
}
function getProcessArgvBin() {
    return process.argv[getProcessArgvBinIndex()];
}

const align = {
    right: alignRight,
    center: alignCenter
};
const top = 0;
const right = 1;
const bottom = 2;
const left = 3;
class UI {
    constructor(opts) {
        var _a;
        this.width = opts.width;
        this.wrap = (_a = opts.wrap) !== null && _a !== void 0 ? _a : true;
        this.rows = [];
    }
    span(...args) {
        const cols = this.div(...args);
        cols.span = true;
    }
    resetOutput() {
        this.rows = [];
    }
    div(...args) {
        if (args.length === 0) {
            this.div('');
        }
        if (this.wrap && this.shouldApplyLayoutDSL(...args) && typeof args[0] === 'string') {
            return this.applyLayoutDSL(args[0]);
        }
        const cols = args.map(arg => {
            if (typeof arg === 'string') {
                return this.colFromString(arg);
            }
            return arg;
        });
        this.rows.push(cols);
        return cols;
    }
    shouldApplyLayoutDSL(...args) {
        return args.length === 1 && typeof args[0] === 'string' &&
            /[\t\n]/.test(args[0]);
    }
    applyLayoutDSL(str) {
        const rows = str.split('\n').map(row => row.split('\t'));
        let leftColumnWidth = 0;
        // simple heuristic for layout, make sure the
        // second column lines up along the left-hand.
        // don't allow the first column to take up more
        // than 50% of the screen.
        rows.forEach(columns => {
            if (columns.length > 1 && mixin.stringWidth(columns[0]) > leftColumnWidth) {
                leftColumnWidth = Math.min(Math.floor(this.width * 0.5), mixin.stringWidth(columns[0]));
            }
        });
        // generate a table:
        //  replacing ' ' with padding calculations.
        //  using the algorithmically generated width.
        rows.forEach(columns => {
            this.div(...columns.map((r, i) => {
                return {
                    text: r.trim(),
                    padding: this.measurePadding(r),
                    width: (i === 0 && columns.length > 1) ? leftColumnWidth : undefined
                };
            }));
        });
        return this.rows[this.rows.length - 1];
    }
    colFromString(text) {
        return {
            text,
            padding: this.measurePadding(text)
        };
    }
    measurePadding(str) {
        // measure padding without ansi escape codes
        const noAnsi = mixin.stripAnsi(str);
        return [0, noAnsi.match(/\s*$/)[0].length, 0, noAnsi.match(/^\s*/)[0].length];
    }
    toString() {
        const lines = [];
        this.rows.forEach(row => {
            this.rowToString(row, lines);
        });
        // don't display any lines with the
        // hidden flag set.
        return lines
            .filter(line => !line.hidden)
            .map(line => line.text)
            .join('\n');
    }
    rowToString(row, lines) {
        this.rasterize(row).forEach((rrow, r) => {
            let str = '';
            rrow.forEach((col, c) => {
                const { width } = row[c]; // the width with padding.
                const wrapWidth = this.negatePadding(row[c]); // the width without padding.
                let ts = col; // temporary string used during alignment/padding.
                if (wrapWidth > mixin.stringWidth(col)) {
                    ts += ' '.repeat(wrapWidth - mixin.stringWidth(col));
                }
                // align the string within its column.
                if (row[c].align && row[c].align !== 'left' && this.wrap) {
                    const fn = align[row[c].align];
                    ts = fn(ts, wrapWidth);
                    if (mixin.stringWidth(ts) < wrapWidth) {
                        ts += ' '.repeat((width || 0) - mixin.stringWidth(ts) - 1);
                    }
                }
                // apply border and padding to string.
                const padding = row[c].padding || [0, 0, 0, 0];
                if (padding[left]) {
                    str += ' '.repeat(padding[left]);
                }
                str += addBorder(row[c], ts, '| ');
                str += ts;
                str += addBorder(row[c], ts, ' |');
                if (padding[right]) {
                    str += ' '.repeat(padding[right]);
                }
                // if prior row is span, try to render the
                // current row on the prior line.
                if (r === 0 && lines.length > 0) {
                    str = this.renderInline(str, lines[lines.length - 1]);
                }
            });
            // remove trailing whitespace.
            lines.push({
                text: str.replace(/ +$/, ''),
                span: row.span
            });
        });
        return lines;
    }
    // if the full 'source' can render in
    // the target line, do so.
    renderInline(source, previousLine) {
        const match = source.match(/^ */);
        const leadingWhitespace = match ? match[0].length : 0;
        const target = previousLine.text;
        const targetTextWidth = mixin.stringWidth(target.trimRight());
        if (!previousLine.span) {
            return source;
        }
        // if we're not applying wrapping logic,
        // just always append to the span.
        if (!this.wrap) {
            previousLine.hidden = true;
            return target + source;
        }
        if (leadingWhitespace < targetTextWidth) {
            return source;
        }
        previousLine.hidden = true;
        return target.trimRight() + ' '.repeat(leadingWhitespace - targetTextWidth) + source.trimLeft();
    }
    rasterize(row) {
        const rrows = [];
        const widths = this.columnWidths(row);
        let wrapped;
        // word wrap all columns, and create
        // a data-structure that is easy to rasterize.
        row.forEach((col, c) => {
            // leave room for left and right padding.
            col.width = widths[c];
            if (this.wrap) {
                wrapped = mixin.wrap(col.text, this.negatePadding(col), { hard: true }).split('\n');
            }
            else {
                wrapped = col.text.split('\n');
            }
            if (col.border) {
                wrapped.unshift('.' + '-'.repeat(this.negatePadding(col) + 2) + '.');
                wrapped.push("'" + '-'.repeat(this.negatePadding(col) + 2) + "'");
            }
            // add top and bottom padding.
            if (col.padding) {
                wrapped.unshift(...new Array(col.padding[top] || 0).fill(''));
                wrapped.push(...new Array(col.padding[bottom] || 0).fill(''));
            }
            wrapped.forEach((str, r) => {
                if (!rrows[r]) {
                    rrows.push([]);
                }
                const rrow = rrows[r];
                for (let i = 0; i < c; i++) {
                    if (rrow[i] === undefined) {
                        rrow.push('');
                    }
                }
                rrow.push(str);
            });
        });
        return rrows;
    }
    negatePadding(col) {
        let wrapWidth = col.width || 0;
        if (col.padding) {
            wrapWidth -= (col.padding[left] || 0) + (col.padding[right] || 0);
        }
        if (col.border) {
            wrapWidth -= 4;
        }
        return wrapWidth;
    }
    columnWidths(row) {
        if (!this.wrap) {
            return row.map(col => {
                return col.width || mixin.stringWidth(col.text);
            });
        }
        let unset = row.length;
        let remainingWidth = this.width;
        // column widths can be set in config.
        const widths = row.map(col => {
            if (col.width) {
                unset--;
                remainingWidth -= col.width;
                return col.width;
            }
            return undefined;
        });
        // any unset widths should be calculated.
        const unsetWidth = unset ? Math.floor(remainingWidth / unset) : 0;
        return widths.map((w, i) => {
            if (w === undefined) {
                return Math.max(unsetWidth, _minWidth(row[i]));
            }
            return w;
        });
    }
}
function addBorder(col, ts, style) {
    if (col.border) {
        if (/[.']-+[.']/.test(ts)) {
            return '';
        }
        if (ts.trim().length !== 0) {
            return style;
        }
        return '  ';
    }
    return '';
}
// calculates the minimum width of
// a column, based on padding preferences.
function _minWidth(col) {
    const padding = col.padding || [];
    const minWidth = 1 + (padding[left] || 0) + (padding[right] || 0);
    if (col.border) {
        return minWidth + 4;
    }
    return minWidth;
}
function getWindowWidth() {
    /* istanbul ignore next: depends on terminal */
    if (typeof process === 'object' && process.stdout && process.stdout.columns) {
        return process.stdout.columns;
    }
    return 80;
}
function alignRight(str, width) {
    str = str.trim();
    const strWidth = mixin.stringWidth(str);
    if (strWidth < width) {
        return ' '.repeat(width - strWidth) + str;
    }
    return str;
}
function alignCenter(str, width) {
    str = str.trim();
    const strWidth = mixin.stringWidth(str);
    /* istanbul ignore next */
    if (strWidth >= width) {
        return str;
    }
    return ' '.repeat((width - strWidth) >> 1) + str;
}
let mixin;
function cliui(opts, _mixin) {
    mixin = _mixin;
    return new UI({
        width: (opts === null || opts === void 0 ? void 0 : opts.width) || getWindowWidth(),
        wrap: opts === null || opts === void 0 ? void 0 : opts.wrap
    });
}

// Minimal replacement for ansi string helpers "wrap-ansi" and "strip-ansi".
// to facilitate ESM and Deno modules.
// TODO: look at porting https://www.npmjs.com/package/wrap-ansi to ESM.
// The npm application
// Copyright (c) npm, Inc. and Contributors
// Licensed on the terms of The Artistic License 2.0
// See: https://github.com/npm/cli/blob/4c65cd952bc8627811735bea76b9b110cc4fc80e/lib/utils/ansi-trim.js
const ansi = new RegExp('\x1b(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|' +
    '\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)', 'g');
function stripAnsi(str) {
    return str.replace(ansi, '');
}
function wrap(str, width) {
    const [start, end] = str.match(ansi) || ['', ''];
    str = stripAnsi(str);
    let wrapped = '';
    for (let i = 0; i < str.length; i++) {
        if (i !== 0 && (i % width) === 0) {
            wrapped += '\n';
        }
        wrapped += str.charAt(i);
    }
    if (start && end) {
        wrapped = `${start}${wrapped}${end}`;
    }
    return wrapped;
}

// Bootstrap cliui with CommonJS dependencies:

function ui (opts) {
  return cliui(opts, {
    stringWidth: (str) => {
      return [...str].length
    },
    stripAnsi,
    wrap
  })
}

function escalade (start, callback) {
	let dir = path.resolve('.', start);
	let tmp, stats = fs.statSync(dir);

	if (!stats.isDirectory()) {
		dir = path.dirname(dir);
	}

	while (true) {
		tmp = callback(dir, fs.readdirSync(dir));
		if (tmp) return path.resolve(dir, tmp);
		dir = path.dirname(tmp = dir);
		if (tmp === dir) break;
	}
}

var shim$1 = {
    fs: {
        readFileSync: fs.readFileSync,
        writeFile: fs.writeFile
    },
    format: util.format,
    resolve: path.resolve,
    exists: (file) => {
        try {
            return fs.statSync(file).isFile();
        }
        catch (err) {
            return false;
        }
    }
};

let shim;
class Y18N {
    constructor(opts) {
        // configurable options.
        opts = opts || {};
        this.directory = opts.directory || './locales';
        this.updateFiles = typeof opts.updateFiles === 'boolean' ? opts.updateFiles : true;
        this.locale = opts.locale || 'en';
        this.fallbackToLanguage = typeof opts.fallbackToLanguage === 'boolean' ? opts.fallbackToLanguage : true;
        // internal stuff.
        this.cache = Object.create(null);
        this.writeQueue = [];
    }
    __(...args) {
        if (typeof arguments[0] !== 'string') {
            return this._taggedLiteral(arguments[0], ...arguments);
        }
        const str = args.shift();
        let cb = function () { }; // start with noop.
        if (typeof args[args.length - 1] === 'function')
            cb = args.pop();
        cb = cb || function () { }; // noop.
        if (!this.cache[this.locale])
            this._readLocaleFile();
        // we've observed a new string, update the language file.
        if (!this.cache[this.locale][str] && this.updateFiles) {
            this.cache[this.locale][str] = str;
            // include the current directory and locale,
            // since these values could change before the
            // write is performed.
            this._enqueueWrite({
                directory: this.directory,
                locale: this.locale,
                cb
            });
        }
        else {
            cb();
        }
        return shim.format.apply(shim.format, [this.cache[this.locale][str] || str].concat(args));
    }
    __n() {
        const args = Array.prototype.slice.call(arguments);
        const singular = args.shift();
        const plural = args.shift();
        const quantity = args.shift();
        let cb = function () { }; // start with noop.
        if (typeof args[args.length - 1] === 'function')
            cb = args.pop();
        if (!this.cache[this.locale])
            this._readLocaleFile();
        let str = quantity === 1 ? singular : plural;
        if (this.cache[this.locale][singular]) {
            const entry = this.cache[this.locale][singular];
            str = entry[quantity === 1 ? 'one' : 'other'];
        }
        // we've observed a new string, update the language file.
        if (!this.cache[this.locale][singular] && this.updateFiles) {
            this.cache[this.locale][singular] = {
                one: singular,
                other: plural
            };
            // include the current directory and locale,
            // since these values could change before the
            // write is performed.
            this._enqueueWrite({
                directory: this.directory,
                locale: this.locale,
                cb
            });
        }
        else {
            cb();
        }
        // if a %d placeholder is provided, add quantity
        // to the arguments expanded by util.format.
        const values = [str];
        if (~str.indexOf('%d'))
            values.push(quantity);
        return shim.format.apply(shim.format, values.concat(args));
    }
    setLocale(locale) {
        this.locale = locale;
    }
    getLocale() {
        return this.locale;
    }
    updateLocale(obj) {
        if (!this.cache[this.locale])
            this._readLocaleFile();
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                this.cache[this.locale][key] = obj[key];
            }
        }
    }
    _taggedLiteral(parts, ...args) {
        let str = '';
        parts.forEach(function (part, i) {
            const arg = args[i + 1];
            str += part;
            if (typeof arg !== 'undefined') {
                str += '%s';
            }
        });
        return this.__.apply(this, [str].concat([].slice.call(args, 1)));
    }
    _enqueueWrite(work) {
        this.writeQueue.push(work);
        if (this.writeQueue.length === 1)
            this._processWriteQueue();
    }
    _processWriteQueue() {
        const _this = this;
        const work = this.writeQueue[0];
        // destructure the enqueued work.
        const directory = work.directory;
        const locale = work.locale;
        const cb = work.cb;
        const languageFile = this._resolveLocaleFile(directory, locale);
        const serializedLocale = JSON.stringify(this.cache[locale], null, 2);
        shim.fs.writeFile(languageFile, serializedLocale, 'utf-8', function (err) {
            _this.writeQueue.shift();
            if (_this.writeQueue.length > 0)
                _this._processWriteQueue();
            cb(err);
        });
    }
    _readLocaleFile() {
        let localeLookup = {};
        const languageFile = this._resolveLocaleFile(this.directory, this.locale);
        try {
            // When using a bundler such as webpack, readFileSync may not be defined:
            if (shim.fs.readFileSync) {
                localeLookup = JSON.parse(shim.fs.readFileSync(languageFile, 'utf-8'));
            }
        }
        catch (err) {
            if (err instanceof SyntaxError) {
                err.message = 'syntax error in ' + languageFile;
            }
            if (err.code === 'ENOENT')
                localeLookup = {};
            else
                throw err;
        }
        this.cache[this.locale] = localeLookup;
    }
    _resolveLocaleFile(directory, locale) {
        let file = shim.resolve(directory, './', locale + '.json');
        if (this.fallbackToLanguage && !this._fileExistsSync(file) && ~locale.lastIndexOf('_')) {
            // attempt fallback to language only
            const languageFile = shim.resolve(directory, './', locale.split('_')[0] + '.json');
            if (this._fileExistsSync(languageFile))
                file = languageFile;
        }
        return file;
    }
    _fileExistsSync(file) {
        return shim.exists(file);
    }
}
function y18n$1(opts, _shim) {
    shim = _shim;
    const y18n = new Y18N(opts);
    return {
        __: y18n.__.bind(y18n),
        __n: y18n.__n.bind(y18n),
        setLocale: y18n.setLocale.bind(y18n),
        getLocale: y18n.getLocale.bind(y18n),
        updateLocale: y18n.updateLocale.bind(y18n),
        locale: y18n.locale
    };
}

const y18n = (opts) => {
  return y18n$1(opts, shim$1)
};

const REQUIRE_ERROR = 'require is not supported by ESM';
const REQUIRE_DIRECTORY_ERROR = 'loading a directory of commands is not supported yet for ESM';

let __dirname$1;
try {
  __dirname$1 = url.fileURLToPath((typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('execute.js', document.baseURI).href)));
} catch (e) {
  __dirname$1 = process.cwd();
}
const mainFilename = __dirname$1.substring(0, __dirname$1.lastIndexOf('node_modules'));

({
  assert: {
    notStrictEqual: assert.notStrictEqual,
    strictEqual: assert.strictEqual
  },
  cliui: ui,
  findUp: escalade,
  getEnv: (key) => {
    return process.env[key]
  },
  inspect: util.inspect,
  getCallerFile: () => {
    throw new YError(REQUIRE_DIRECTORY_ERROR)
  },
  getProcessArgvBin,
  mainFilename: mainFilename || process.cwd(),
  Parser: Parser__default["default"],
  path: {
    basename: path.basename,
    dirname: path.dirname,
    extname: path.extname,
    relative: path.relative,
    resolve: path.resolve
  },
  process: {
    argv: () => process.argv,
    cwd: process.cwd,
    emitWarning: (warning, type) => process.emitWarning(warning, type),
    execPath: () => process.execPath,
    exit: process.exit,
    nextTick: process.nextTick,
    stdColumns: typeof process.stdout.columns !== 'undefined' ? process.stdout.columns : null
  },
  readFileSync: fs.readFileSync,
  require: () => {
    throw new YError(REQUIRE_ERROR)
  },
  requireDirectory: () => {
    throw new YError(REQUIRE_DIRECTORY_ERROR)
  },
  stringWidth: (str) => {
    return [...str].length
  },
  y18n: y18n({
    directory: path.resolve(__dirname$1, '../../../locales'),
    updateFiles: false
  })
});

// Copyright (c) Microsoft Corporation.
const extractConfigFromArgs = (argv, validateConfig, red) => {
    const configPartial = {};
    let missing = false;
    Object.entries(validateConfig).forEach(([key, v]) => {
        const validate = v;
        const value = argv[key];
        const response = validate(value);
        if (response === true) {
            if (value !== null && value !== undefined) {
                configPartial[key] = value;
            }
        }
        else if (value === null || value === undefined) {
            missing = true;
        }
        else {
            missing = true;
            red(`"${value}" is not a valid value for "${key}"`);
            if (typeof response === "string")
                red(response);
        }
    });
    return { configPartial, missing };
};
const buildGetConfig = (gray, red) => {
    const argv = Parser__default["default"](hideBin(process.argv));
    return async (promptForConfig, validateConfig) => {
        const { configPartial, missing } = extractConfigFromArgs(argv, validateConfig, red);
        if (missing || !Object.values(configPartial).length) {
            return promptForConfig(configPartial);
        }
        else {
            gray("Retrieved from the command parameters");
            Object.entries(configPartial).forEach(([key, value]) => { var _a; return value != null && gray(`${(_a = fieldIdToName[key]) !== null && _a !== void 0 ? _a : key}: ${value}`); });
            return configPartial;
        }
    };
};

// Copyright (c) Microsoft Corporation.
async function getTemplates(template) {
    const sharedFiles = await getFiles(path.join(__dirname, "templates", "_shared", "**", "**", "*.*"));
    const templateFiles = await getFiles(path.join(__dirname, "templates", template, "**", "**", "*.*"));
    return [...sharedFiles, ...templateFiles];
}
async function getFiles(path) {
    // Starting from glob v8 `\` is only used as an escape character, and never as a path separator in glob patterns.
    // Glob pattern paths must use forward-slashes as path separators.
    // See https://github.com/isaacs/node-glob/blob/af57da21c7722bb6edb687ccd4ad3b99d3e7a333/changelog.md#80
    const normalizedPath = path.replace(/\\/g, "/");
    return glob.glob(normalizedPath, { dot: true });
}

// Copyright (c) Microsoft Corporation.
const templateSuffix = ".mustache";
/**
 * Generates a scaffold project of Custom widget for API Managements' Dev Portal.
 *
 * @param widgetConfig - JSON object with data required by DevPortal to handle a widget integration.
 * @param deploymentConfig - JSON object with data for deployment.
 * @param options - JSON object with other data, which will not be stored in the DevPortal.
 */
async function generateProject(widgetConfig, deploymentConfig, options = {}) {
    const { openUrl } = options;
    const openUrlParsed = openUrl ? new URL(openUrl) : null;
    if (openUrlParsed) {
        openUrlParsed.searchParams.append(OVERRIDE_PORT_KEY, String(OVERRIDE_DEFAULT_PORT));
    }
    const name = displayNameToName(widgetConfig.displayName);
    const serverSettings = {
        port: OVERRIDE_DEFAULT_PORT,
        open: openUrlParsed ? openUrlParsed.toString() : true,
    };
    const renderTemplate = async (file) => {
        const isTemplate = file.endsWith(templateSuffix);
        const encoding = file.endsWith(".ttf") ? "binary" : "utf8";
        let fileData = await fs.promises.readFile(file, { encoding });
        if (isTemplate) {
            fileData = mustache__default["default"].render(fileData, {
                name,
                displayName: widgetConfig.displayName,
                config: JSON.stringify(Object.assign(Object.assign({}, widgetConfig), { name }), null, "\t"),
                configDeploy: JSON.stringify(deploymentConfig, null, "\t"),
                serverSettings: JSON.stringify(serverSettings, null, "\t"),
            });
        }
        let relativePath = file;
        if (__dirname.includes("\\")) {
            relativePath = relativePath.replace(/\//g, "\\");
        }
        relativePath = relativePath
            .replace(path.join(__dirname, "templates", "_shared"), "")
            .replace(path.join(__dirname, "templates", widgetConfig.technology), "")
            .replace(templateSuffix, "");
        const newFilePath = path.join(process.cwd(), widgetFolderName(name), relativePath);
        const dir = path.parse(newFilePath).dir;
        await fs.promises.mkdir(dir, { recursive: true });
        await fs.promises.writeFile(newFilePath, fileData, { encoding });
    };
    const templates = await getTemplates(widgetConfig.technology);
    for (const file of Object.values(templates)) {
        await renderTemplate(file);
    }
    return;
}

const log = console.log;
const white = (msg) => log(chalk__default["default"].white(msg));
const green = (msg) => log(chalk__default["default"].green(msg));
const red = (msg) => log(chalk__default["default"].red(msg));
const gray = (msg) => log(chalk__default["default"].gray(msg));
async function main() {
    green("\nThis tool generates code scaffold for custom widgets in the Azure API Management’s developer portal. Learn more at https://aka.ms/apimdocs/portal/customwidgets.\n");
    const getConfig = buildGetConfig(gray, red);
    white("Specify the custom widget configuration.");
    const widgetConfig = await getConfig(promptWidgetConfig, validateWidgetConfig);
    white("Specify the Azure API Management service configuration.");
    const deployConfig = await getConfig(promptDeployConfig, validateDeployConfig);
    white("Specify other options");
    const miscConfig = await getConfig(promptMiscConfig, validateMiscConfig);
    if (deployConfig.resourceId[0] === "/") {
        deployConfig.resourceId = deployConfig.resourceId.slice(1);
    }
    if (deployConfig.resourceId.slice(-1) === "/") {
        deployConfig.resourceId = deployConfig.resourceId.slice(0, -1);
    }
    if (deployConfig.apiVersion === "") {
        delete deployConfig.apiVersion;
    }
    deployConfig.managementApiEndpoint = prefixUrlProtocol(deployConfig.managementApiEndpoint);
    miscConfig.openUrl = miscConfig.openUrl
        ? prefixUrlProtocol(miscConfig.openUrl)
        : miscConfig.openUrl;
    return generateProject(widgetConfig, deployConfig, miscConfig)
        .then(() => green("\nThe custom widget’s code scaffold has been successfully generated.\n"))
        .catch(console.error);
}
main()
    .then(() => process.exit(0))
    .catch((err) => {
    console.error(err);
    process.exit(1);
});
