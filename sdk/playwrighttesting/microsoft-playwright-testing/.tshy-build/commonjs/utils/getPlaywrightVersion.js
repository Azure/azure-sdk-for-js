"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlaywrightVersion = void 0;
const packageManager_js_1 = require("./packageManager.js");
const constants_js_1 = require("../common/constants.js");
const node_child_process_1 = require("node:child_process");
const logger_js_1 = require("../common/logger.js");
const getPlaywrightVersion = () => {
    if (process.env[constants_js_1.InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION]) {
        return process.env[constants_js_1.InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION];
    }
    const packageManager = (0, packageManager_js_1.getPackageManager)();
    const command = packageManager.runCommand("playwright", "--version");
    const stdout = (0, node_child_process_1.execSync)(command).toString().trim();
    const version = packageManager.getVersionFromStdout(stdout);
    process.env[constants_js_1.InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION] = version;
    logger_js_1.coreLogger.info(`Playwright version being used - ${process.env[constants_js_1.InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION]}`);
    return process.env[constants_js_1.InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION];
};
exports.getPlaywrightVersion = getPlaywrightVersion;
//# sourceMappingURL=getPlaywrightVersion.js.map