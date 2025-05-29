"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaywrightServiceConfig = void 0;
const constants_js_1 = require("./constants.js");
const utils_js_1 = require("../utils/utils.js");
class PlaywrightServiceConfig {
    constructor() {
        this.setOptions = (options) => {
            if (options === null || options === void 0 ? void 0 : options.exposeNetwork) {
                this.exposeNetwork = options.exposeNetwork;
            }
            if (!process.env[constants_js_1.InternalEnvironmentVariables.MPT_SERVICE_RUN_ID]) {
                if (options === null || options === void 0 ? void 0 : options.runId) {
                    this.runId = options.runId;
                    process.env[constants_js_1.InternalEnvironmentVariables.MPT_SERVICE_RUN_ID] = this.runId;
                }
                else {
                    this.runId = (0, utils_js_1.getAndSetRunId)();
                }
            }
            if (!process.env[constants_js_1.InternalEnvironmentVariables.MPT_SERVICE_RUN_NAME] && (options === null || options === void 0 ? void 0 : options.runName)) {
                this.runName = options.runName;
                process.env[constants_js_1.InternalEnvironmentVariables.MPT_SERVICE_RUN_NAME] = this.runName;
            }
            if (options === null || options === void 0 ? void 0 : options.os) {
                this.serviceOs = options.os;
                process.env[constants_js_1.InternalEnvironmentVariables.MPT_SERVICE_OS] = this.serviceOs;
            }
            if (options === null || options === void 0 ? void 0 : options.slowMo) {
                this.slowMo = options.slowMo;
            }
            if (options === null || options === void 0 ? void 0 : options.timeout) {
                this.timeout = options.timeout;
            }
        };
        this.serviceOs = (process.env[constants_js_1.InternalEnvironmentVariables.MPT_SERVICE_OS] ||
            constants_js_1.DefaultConnectOptionsConstants.DEFAULT_SERVICE_OS);
        this.runName = process.env[constants_js_1.InternalEnvironmentVariables.MPT_SERVICE_RUN_NAME] || "";
        this.runId = process.env[constants_js_1.InternalEnvironmentVariables.MPT_SERVICE_RUN_ID] || "";
        this.timeout = constants_js_1.DefaultConnectOptionsConstants.DEFAULT_TIMEOUT;
        this.slowMo = constants_js_1.DefaultConnectOptionsConstants.DEFAULT_SLOW_MO;
        this.exposeNetwork = constants_js_1.DefaultConnectOptionsConstants.DEFAULT_EXPOSE_NETWORK;
    }
}
exports.PlaywrightServiceConfig = PlaywrightServiceConfig;
//# sourceMappingURL=playwrightServiceConfig.js.map