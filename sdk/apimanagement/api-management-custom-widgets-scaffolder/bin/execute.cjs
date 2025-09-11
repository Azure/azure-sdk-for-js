#!/usr/bin/env node
'use strict';

var Parser = require('yargs-parser');
require('assert');
var path = require('path');
var fs = require('fs');
var util = require('util');
var url = require('url');
var chalk = require('chalk');
var node_path = require('node:path');
var node_url = require('node:url');
var fs$1 = require('node:fs/promises');
var glob = require('glob');
var mustache = require('mustache');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
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
 * Prefix "cw-" to avoid conflicts with existing widgets.
 *
 * @param displayName - User defined name of the custom widget.
 */
const displayNameToName = (displayName) => encodeURIComponent(("cw-" + displayName)
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
// Licensed under the MIT License.
const fieldIdToName = {
    displayName: "Widget display name",
    technology: "Technology",
    iconUrl: "iconUrl",
    resourceId: "Azure API Management resource ID (following format: subscriptions/<subscription-id>/resourceGroups/<resource-group-name>/providers/Microsoft.ApiManagement/service/<api-management service-name>)",
    managementApiEndpoint: "Management API hostname",
    apiVersion: "Management API version",
    openUrl: "Developer portal URL",
    configAdvancedTenantId: "Tenant ID",
    configAdvancedRedirectUri: "Redirect URI",
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
    configAdvancedTenantId: () => {
        return true;
    },
    configAdvancedRedirectUri: (input) => {
        if (!input)
            return true;
        return validateUrl(fieldIdToName.openUrl)(input);
    },
};
const promptWidgetConfig = async (partial) => {
    const inquirerImport = await import('inquirer');
    const inquirer = inquirerImport.default;
    return inquirer.prompt([
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
};
const promptServiceInformation = async (partial) => {
    const inquirerImport = await import('inquirer');
    const inquirer = inquirerImport.default;
    return inquirer.prompt([
        {
            name: "resourceId",
            type: "input",
            message: fieldIdToName.resourceId,
            validate: validateDeployConfig.resourceId,
        },
        {
            name: "managementApiEndpoint",
            type: "select",
            message: fieldIdToName.managementApiEndpoint,
            choices: [
                {
                    name: "https://management.azure.com (if you're not sure what to select, use this option)",
                    value: "https://management.azure.com",
                },
                {
                    name: "https://management.usgovcloudapi.net",
                    value: "https://management.usgovcloudapi.net",
                },
                {
                    name: "https://management.chinacloudapi.cn",
                    value: "https://management.chinacloudapi.cn",
                },
            ],
        },
        {
            name: "apiVersion",
            type: "input",
            message: fieldIdToName.apiVersion + " (optional; e.g., 2021-08-01)",
        },
    ], partial);
};
const promptMiscConfig = async (partial) => {
    const inquirerImport = await import('inquirer');
    const inquirer = inquirerImport.default;
    return inquirer.prompt([
        {
            name: "openUrl",
            type: "input",
            message: fieldIdToName.openUrl +
                " for widget development and testing (optional; e.g., https://contoso.developer.azure-api.net/ or http://localhost:8080)",
            transformer: prefixUrlProtocol,
            validate: validateMiscConfig.openUrl,
        },
        {
            name: "configAdvancedTenantId",
            type: "input",
            message: fieldIdToName.configAdvancedTenantId +
                " to be used in Azure Identity InteractiveBrowserCredential class (optional)",
            validate: validateMiscConfig.openUrl,
        },
        {
            name: "configAdvancedRedirectUri",
            type: "input",
            message: fieldIdToName.configAdvancedRedirectUri +
                " to be used in Azure Identity InteractiveBrowserCredential class (optional; default is http://localhost:1337)",
            validate: validateMiscConfig.openUrl,
        },
    ], partial);
};

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

let __dirname$1;
try {
  __dirname$1 = url.fileURLToPath((typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('execute.cjs', document.baseURI).href)));
} catch (e) {
  __dirname$1 = process.cwd();
}
const mainFilename = __dirname$1.substring(0, __dirname$1.lastIndexOf('node_modules'));

({
  mainFilename: mainFilename || process.cwd(),
  process: {
    cwd: process.cwd,
    exit: process.exit,
    nextTick: process.nextTick,
    stdColumns: typeof process.stdout.columns !== 'undefined' ? process.stdout.columns : null
  },
  y18n: y18n({
    directory: path.resolve(__dirname$1, '../../../locales'),
    updateFiles: false
  })
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
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
    const argv = Parser(hideBin(process.argv));
    return async (promptForConfig, validateConfig) => {
        const { configPartial, missing } = extractConfigFromArgs(argv, validateConfig, red);
        if (missing || !Object.values(configPartial).length) {
            return promptForConfig(configPartial);
        }
        else {
            gray("Retrieved from the command parameters");
            Object.entries(configPartial).forEach(([key, value]) => value != null && gray(`${fieldIdToName[key] ?? key}: ${value}`));
            return configPartial;
        }
    };
};

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const sourceDir = node_path.dirname(node_url.fileURLToPath((typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('execute.cjs', document.baseURI).href))));

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
async function getTemplates(template) {
    const sharedFiles = await getFiles(node_path.join(sourceDir, "..", "templates", "_shared", "**", "**", "*.*"));
    const templateFiles = await getFiles(node_path.join(sourceDir, "..", "templates", template, "**", "**", "*.*"));
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
// Licensed under the MIT License.
const templateSuffix = ".mustache";
/**
 * Generates a scaffold project of Custom widget for API Managements' Dev Portal.
 *
 * @param widgetConfig - JSON object with data required by DevPortal to handle a widget integration.
 * @param deploymentConfig - JSON object with data for deployment.
 * @param options - JSON object with other data, which will not be stored in the DevPortal.
 */
async function generateProject(widgetConfig, deploymentConfig, options = {}) {
    const { openUrl, configAdvancedTenantId, configAdvancedRedirectUri } = options;
    const openUrlParsed = openUrl ? new URL(openUrl) : null;
    if (openUrlParsed) {
        openUrlParsed.searchParams.append(OVERRIDE_PORT_KEY, String(OVERRIDE_DEFAULT_PORT));
    }
    const name = displayNameToName(widgetConfig.displayName);
    const serverSettings = {
        port: OVERRIDE_DEFAULT_PORT,
        open: openUrlParsed ? openUrlParsed.toString() : true,
    };
    const configAdditional = {
        interactiveBrowserCredentialOptions: { redirectUri: "http://localhost:1337" },
    };
    if (configAdvancedTenantId) {
        configAdditional.interactiveBrowserCredentialOptions.tenantId = configAdvancedTenantId;
    }
    if (configAdvancedRedirectUri) {
        configAdditional.interactiveBrowserCredentialOptions.redirectUri = configAdvancedRedirectUri;
    }
    const renderTemplate = async (file) => {
        const isTemplate = file.endsWith(templateSuffix);
        const encoding = file.endsWith(".ttf") ? "binary" : "utf8";
        let fileData = await fs$1.readFile(file, { encoding });
        if (isTemplate) {
            fileData = mustache.render(fileData, {
                name,
                displayName: widgetConfig.displayName,
                config: JSON.stringify({ ...widgetConfig, name }, null, "\t"),
                configDeploy: JSON.stringify(deploymentConfig, null, "\t"),
                configAdditional: JSON.stringify(configAdditional, null, "\t"),
                serverSettings: JSON.stringify(serverSettings, null, "\t"),
            });
        }
        let relativePath = file;
        if (sourceDir.includes("\\")) {
            relativePath = relativePath.replace(/\//g, "\\");
        }
        relativePath = relativePath
            .replace(node_path.join(sourceDir, "..", "templates", "_shared"), "")
            .replace(node_path.join(sourceDir, "..", "templates", widgetConfig.technology), "")
            .replace(templateSuffix, "");
        const newFilePath = node_path.join(process.cwd(), widgetFolderName(name), relativePath);
        const dir = node_path.parse(newFilePath).dir;
        await fs$1.mkdir(dir, { recursive: true });
        await fs$1.writeFile(newFilePath, fileData, { encoding });
    };
    const templates = await getTemplates(widgetConfig.technology);
    for (const file of Object.values(templates)) {
        await renderTemplate(file);
    }
    return;
}

const log = console.log;
const white = (msg) => log(chalk.white(msg));
const green = (msg) => log(chalk.green(msg));
const red = (msg) => log(chalk.red(msg));
const gray = (msg) => log(chalk.gray(msg));
async function main() {
    green("\nThis tool generates code scaffold for custom widgets in the Azure API Management’s developer portal. Learn more at https://aka.ms/apimdocs/portal/customwidgets.\n");
    const getConfig = buildGetConfig(gray, red);
    white("Specify the custom widget configuration.");
    const widgetConfig = await getConfig(promptWidgetConfig, validateWidgetConfig);
    white("Specify the Azure API Management service configuration.");
    const serviceInformation = await getConfig(promptServiceInformation, validateDeployConfig);
    white("Specify other options");
    const miscConfig = await getConfig(promptMiscConfig, validateMiscConfig);
    if (serviceInformation.resourceId[0] === "/") {
        serviceInformation.resourceId = serviceInformation.resourceId.slice(1);
    }
    if (serviceInformation.resourceId.slice(-1) === "/") {
        serviceInformation.resourceId = serviceInformation.resourceId.slice(0, -1);
    }
    if (serviceInformation.apiVersion === "") {
        delete serviceInformation.apiVersion;
    }
    serviceInformation.managementApiEndpoint = prefixUrlProtocol(serviceInformation.managementApiEndpoint);
    miscConfig.openUrl = miscConfig.openUrl
        ? prefixUrlProtocol(miscConfig.openUrl)
        : miscConfig.openUrl;
    return generateProject(widgetConfig, serviceInformation, miscConfig)
        .then(() => green("\nThe custom widget’s code scaffold has been successfully generated.\n"))
        .catch(console.error);
}
main()
    .then(() => process.exit(0))
    .catch((err) => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=execute.cjs.map
