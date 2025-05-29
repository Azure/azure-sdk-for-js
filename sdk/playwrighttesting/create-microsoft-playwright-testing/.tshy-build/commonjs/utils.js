"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCLIArguments = exports.showHelpForCLI = exports.getFileReferenceForImport = exports.getLanguageAndConfigInfoFromConfigurationFile = exports.getLanguageAndConfigInfoFromDirectory = exports.executeCommand = void 0;
const tslib_1 = require("tslib");
const node_child_process_1 = require("node:child_process");
const node_fs_1 = tslib_1.__importDefault(require("node:fs"));
const node_path_1 = tslib_1.__importStar(require("node:path"));
const constants_js_1 = require("./constants.js");
const executeCommand = (command) => {
    return new Promise((resolve, reject) => {
        (0, node_child_process_1.exec)(command, (error, stdout, _) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(stdout);
            }
        });
    });
};
exports.executeCommand = executeCommand;
const getLanguageAndConfigInfoFromDirectory = () => {
    if (node_fs_1.default.existsSync("playwright.config.js")) {
        return {
            playwrightConfigFile: "playwright.config.js",
            projectLanguage: constants_js_1.Languages.JavaScript,
        };
    }
    else if (node_fs_1.default.existsSync("playwright.config.ts")) {
        return {
            playwrightConfigFile: "playwright.config.ts",
            projectLanguage: constants_js_1.Languages.TypeScript,
        };
    }
    else {
        throw new Error(constants_js_1.ErrorMessages.NO_CONFIGURATION_FILE_FOUND);
    }
};
exports.getLanguageAndConfigInfoFromDirectory = getLanguageAndConfigInfoFromDirectory;
const getLanguageAndConfigInfoFromConfigurationFile = (playwrightConfigFile) => {
    const extension = (0, node_path_1.extname)(playwrightConfigFile);
    if (extension === constants_js_1.Extensions.TypeScript) {
        return {
            playwrightConfigFile,
            projectLanguage: constants_js_1.Languages.TypeScript,
        };
    }
    else if (extension === constants_js_1.Extensions.JavaScript) {
        return {
            playwrightConfigFile,
            projectLanguage: constants_js_1.Languages.JavaScript,
        };
    }
    else
        throw new Error(constants_js_1.ErrorMessages.UNSUPPORTED_CONFIGURATION_FILE);
};
exports.getLanguageAndConfigInfoFromConfigurationFile = getLanguageAndConfigInfoFromConfigurationFile;
const getFileReferenceForImport = (filePath) => {
    const normalizedPath = filePath.split(node_path_1.default.sep).join("/");
    const parsedPath = node_path_1.default.parse(normalizedPath);
    const withoutExtension = node_path_1.default.posix.join(parsedPath.dir, parsedPath.name);
    if (node_path_1.default.isAbsolute(filePath)) {
        return withoutExtension;
    }
    if (!withoutExtension.startsWith("./") && !withoutExtension.startsWith("../")) {
        return `./${withoutExtension}`;
    }
    return withoutExtension;
};
exports.getFileReferenceForImport = getFileReferenceForImport;
const showHelpForCLI = () => {
    return `
Usage: index [options]

playwright configuration file

Options:
  -c, --config <config>
  -h, --help             display help for command
`;
};
exports.showHelpForCLI = showHelpForCLI;
const parseCLIArguments = () => {
    const args = process.argv.slice(2);
    const cliArguments = {
        config: "",
    };
    for (let i = 0; i < args.length; i++) {
        if (args[i] === "-c" || args[i] === "--config") {
            cliArguments.config = args[i + 1];
        }
        else if (args[i] === "-h" || args[i] === "--help") {
            console.log((0, exports.showHelpForCLI)());
            process.exit(0);
        }
    }
    return cliArguments;
};
exports.parseCLIArguments = parseCLIArguments;
//# sourceMappingURL=utils.js.map