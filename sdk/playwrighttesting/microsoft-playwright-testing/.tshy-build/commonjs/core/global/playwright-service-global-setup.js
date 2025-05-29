"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const node_path_1 = require("node:path");
const playwrightServiceEntra_js_1 = tslib_1.__importDefault(require("../playwrightServiceEntra.js"));
const executor_js_1 = require("../../common/executor.js");
const customerConfig_js_1 = tslib_1.__importDefault(require("../../common/customerConfig.js"));
const playwrightServiceGlobalSetupWrapper = async (config) => {
    const rootDir = config.configFile ? (0, node_path_1.dirname)(config.configFile) : process.cwd();
    let customerGlobalSetupFunc = null;
    if (customerConfig_js_1.default.globalSetup && typeof customerConfig_js_1.default.globalSetup === "string") {
        customerGlobalSetupFunc = await (0, executor_js_1.loadCustomerGlobalFunction)(rootDir, customerConfig_js_1.default.globalSetup);
    }
    await playwrightServiceEntra_js_1.default.globalSetup();
    if (customerGlobalSetupFunc) {
        return customerGlobalSetupFunc(config);
    }
};
exports.default = playwrightServiceGlobalSetupWrapper;
//# sourceMappingURL=playwright-service-global-setup.js.map