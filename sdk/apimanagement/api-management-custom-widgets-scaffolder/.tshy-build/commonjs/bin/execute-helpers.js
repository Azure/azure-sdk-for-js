"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildGetConfig = exports.extractConfigFromArgs = void 0;
const tslib_1 = require("tslib");
const execute_configs_js_1 = require("./execute-configs.js");
const helpers_1 = require("yargs/helpers");
const yargs_parser_1 = tslib_1.__importDefault(require("yargs-parser"));
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
exports.extractConfigFromArgs = extractConfigFromArgs;
const buildGetConfig = (gray, red) => {
    const argv = (0, yargs_parser_1.default)((0, helpers_1.hideBin)(process.argv));
    return async (promptForConfig, validateConfig) => {
        const { configPartial, missing } = (0, exports.extractConfigFromArgs)(argv, validateConfig, red);
        if (missing || !Object.values(configPartial).length) {
            return promptForConfig(configPartial);
        }
        else {
            gray("Retrieved from the command parameters");
            Object.entries(configPartial).forEach(([key, value]) => { var _a; return value != null && gray(`${(_a = execute_configs_js_1.fieldIdToName[key]) !== null && _a !== void 0 ? _a : key}: ${value}`); });
            return configPartial;
        }
    };
};
exports.buildGetConfig = buildGetConfig;
//# sourceMappingURL=execute-helpers.js.map