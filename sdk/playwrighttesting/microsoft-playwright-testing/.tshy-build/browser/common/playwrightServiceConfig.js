// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { DefaultConnectOptionsConstants, InternalEnvironmentVariables } from "./constants.js";
import { getAndSetRunId } from "../utils/utils.js";
class PlaywrightServiceConfig {
    constructor() {
        this.setOptions = (options) => {
            if (options === null || options === void 0 ? void 0 : options.exposeNetwork) {
                this.exposeNetwork = options.exposeNetwork;
            }
            if (!process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID]) {
                if (options === null || options === void 0 ? void 0 : options.runId) {
                    this.runId = options.runId;
                    process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID] = this.runId;
                }
                else {
                    this.runId = getAndSetRunId();
                }
            }
            if (!process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_NAME] && (options === null || options === void 0 ? void 0 : options.runName)) {
                this.runName = options.runName;
                process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_NAME] = this.runName;
            }
            if (options === null || options === void 0 ? void 0 : options.os) {
                this.serviceOs = options.os;
                process.env[InternalEnvironmentVariables.MPT_SERVICE_OS] = this.serviceOs;
            }
            if (options === null || options === void 0 ? void 0 : options.slowMo) {
                this.slowMo = options.slowMo;
            }
            if (options === null || options === void 0 ? void 0 : options.timeout) {
                this.timeout = options.timeout;
            }
        };
        this.serviceOs = (process.env[InternalEnvironmentVariables.MPT_SERVICE_OS] ||
            DefaultConnectOptionsConstants.DEFAULT_SERVICE_OS);
        this.runName = process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_NAME] || "";
        this.runId = process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID] || "";
        this.timeout = DefaultConnectOptionsConstants.DEFAULT_TIMEOUT;
        this.slowMo = DefaultConnectOptionsConstants.DEFAULT_SLOW_MO;
        this.exposeNetwork = DefaultConnectOptionsConstants.DEFAULT_EXPOSE_NETWORK;
    }
}
export { PlaywrightServiceConfig };
//# sourceMappingURL=playwrightServiceConfig.js.map