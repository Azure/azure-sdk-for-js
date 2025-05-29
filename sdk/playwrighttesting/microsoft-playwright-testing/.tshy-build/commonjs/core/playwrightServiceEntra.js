"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const constants_js_1 = require("../common/constants.js");
const logger_js_1 = require("../common/logger.js");
const entraIdAccessToken_js_1 = require("../common/entraIdAccessToken.js");
class PlaywrightServiceEntra {
    set entraIdAccessToken(credential) {
        this._entraIdAccessToken = new entraIdAccessToken_js_1.EntraIdAccessToken(credential);
    }
    constructor() {
        this.globalSetup = async () => {
            logger_js_1.coreLogger.info("Entra id access token setup start");
            await this._entraIdAccessToken.fetchEntraIdAccessToken();
            this.entraIdGlobalSetupRotationHandler();
        };
        this.globalTeardown = () => {
            logger_js_1.coreLogger.info("Entra id access token teardown start");
            if (this._entraIdAccessTokenRotationInterval) {
                clearInterval(this._entraIdAccessTokenRotationInterval);
                logger_js_1.coreLogger.info("Entra id access token rotation interval cleared");
            }
        };
        this.entraIdGlobalSetupRotationHandler = () => {
            this._entraIdAccessTokenRotationInterval = setInterval(this.entraIdAccessTokenRotation, constants_js_1.EntraIdAccessTokenConstants.ROTATION_INTERVAL_PERIOD_IN_MINUTES * 60 * 1000);
            logger_js_1.coreLogger.info("Entra id access token rotation handler setup done");
        };
        this.entraIdAccessTokenRotation = async () => {
            logger_js_1.coreLogger.info("Entra id access token rotation handler");
            try {
                if (this._entraIdAccessToken.doesEntraIdAccessTokenNeedRotation()) {
                    await this._entraIdAccessToken.fetchEntraIdAccessToken();
                }
            }
            catch (err) {
                logger_js_1.coreLogger.error(err); // log error and continue if it's an intermittent issue (optimistic approach)
            }
        };
        this._entraIdAccessToken = new entraIdAccessToken_js_1.EntraIdAccessToken();
    }
}
PlaywrightServiceEntra.getInstance = () => {
    if (!PlaywrightServiceEntra.instance) {
        PlaywrightServiceEntra.instance = new PlaywrightServiceEntra();
    }
    return PlaywrightServiceEntra.instance;
};
const instance = PlaywrightServiceEntra.getInstance();
exports.default = instance;
//# sourceMappingURL=playwrightServiceEntra.js.map