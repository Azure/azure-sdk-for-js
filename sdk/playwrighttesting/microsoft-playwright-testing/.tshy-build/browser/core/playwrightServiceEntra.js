// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { EntraIdAccessTokenConstants } from "../common/constants.js";
import { coreLogger } from "../common/logger.js";
import { EntraIdAccessToken } from "../common/entraIdAccessToken.js";
class PlaywrightServiceEntra {
    set entraIdAccessToken(credential) {
        this._entraIdAccessToken = new EntraIdAccessToken(credential);
    }
    constructor() {
        this.globalSetup = async () => {
            coreLogger.info("Entra id access token setup start");
            await this._entraIdAccessToken.fetchEntraIdAccessToken();
            this.entraIdGlobalSetupRotationHandler();
        };
        this.globalTeardown = () => {
            coreLogger.info("Entra id access token teardown start");
            if (this._entraIdAccessTokenRotationInterval) {
                clearInterval(this._entraIdAccessTokenRotationInterval);
                coreLogger.info("Entra id access token rotation interval cleared");
            }
        };
        this.entraIdGlobalSetupRotationHandler = () => {
            this._entraIdAccessTokenRotationInterval = setInterval(this.entraIdAccessTokenRotation, EntraIdAccessTokenConstants.ROTATION_INTERVAL_PERIOD_IN_MINUTES * 60 * 1000);
            coreLogger.info("Entra id access token rotation handler setup done");
        };
        this.entraIdAccessTokenRotation = async () => {
            coreLogger.info("Entra id access token rotation handler");
            try {
                if (this._entraIdAccessToken.doesEntraIdAccessTokenNeedRotation()) {
                    await this._entraIdAccessToken.fetchEntraIdAccessToken();
                }
            }
            catch (err) {
                coreLogger.error(err); // log error and continue if it's an intermittent issue (optimistic approach)
            }
        };
        this._entraIdAccessToken = new EntraIdAccessToken();
    }
}
PlaywrightServiceEntra.getInstance = () => {
    if (!PlaywrightServiceEntra.instance) {
        PlaywrightServiceEntra.instance = new PlaywrightServiceEntra();
    }
    return PlaywrightServiceEntra.instance;
};
const instance = PlaywrightServiceEntra.getInstance();
export default instance;
//# sourceMappingURL=playwrightServiceEntra.js.map