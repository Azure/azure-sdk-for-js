"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoOpCredential = void 0;
exports.createTestCredential = createTestCredential;
exports.createLiveCredential = createLiveCredential;
const tslib_1 = require("tslib");
const identity_1 = require("@azure/identity");
const test_recorder_1 = require("@azure-tools/test-recorder");
const noOpCredential_js_1 = require("./noOpCredential.js");
Object.defineProperty(exports, "NoOpCredential", { enumerable: true, get: function () { return noOpCredential_js_1.NoOpCredential; } });
const core_util_1 = require("@azure/core-util");
const browserRelayCredential_js_1 = require("./browserRelayCredential.js");
/**
 * ## Credential to be used in the tests.
 *
 * ### In playback mode
 *  - returns the NoOpCredential (helps bypass the AAD traffic)
 *
 * ### In record/live modes
 *  - returns the ChainedTokenCredential in Node (expects that you used [`User Auth` or `Auth via development tools`](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#authenticate-users) credentials)
 *  - Returns browser relay credential in browser. Requires the dev-tool browser relay server to be running (dev-tool run start-browser-relay, or is automatically started when using the dev-tool browser test command)
 *  - AAD traffic won't be recorded if this credential is used.
 */
function createTestCredential(tokenCredentialOptions = {}) {
    if ((0, test_recorder_1.isPlaybackMode)()) {
        return new noOpCredential_js_1.NoOpCredential();
    }
    else {
        return createLiveCredential(tokenCredentialOptions);
    }
}
/**
 * ## Credential to be used in live tests.
 *  - returns the ChainedTokenCredential in Node (expects that you used [`User Auth` or `Auth via development tools`](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#authenticate-users) credentials)
 *  - Returns browser relay credential in browser. Requires the dev-tool browser relay server to be running (dev-tool run start-browser-relay, or is automatically started when using the dev-tool browser test command)
 *  - AAD traffic won't be recorded if this credential is used.
 */
function createLiveCredential(tokenCredentialOptions = {}) {
    if (core_util_1.isBrowser) {
        return (0, browserRelayCredential_js_1.createBrowserRelayCredential)(tokenCredentialOptions);
    }
    else {
        const { browserRelayServerUrl: _ } = tokenCredentialOptions, dacOptions = tslib_1.__rest(tokenCredentialOptions, ["browserRelayServerUrl"]);
        const systemAccessToken = process.env.SYSTEM_ACCESSTOKEN;
        // If we have a system access token, we are in Azure Pipelines
        if (systemAccessToken) {
            const serviceConnectionID = process.env.AZURESUBSCRIPTION_SERVICE_CONNECTION_ID;
            const clientID = process.env.AZURESUBSCRIPTION_CLIENT_ID;
            const tenantID = process.env.AZURESUBSCRIPTION_TENANT_ID;
            if (serviceConnectionID && clientID && tenantID) {
                return new identity_1.AzurePipelinesCredential(tenantID, clientID, serviceConnectionID, systemAccessToken, dacOptions);
            }
            throw new Error(`Running in Azure Pipelines environment. Missing environment variables: 
        serviceConnectionID: ${serviceConnectionID}, tenantID: ${tenantID}, clientID: ${clientID}`);
        }
        return new identity_1.ChainedTokenCredential(new identity_1.AzurePowerShellCredential(dacOptions), new identity_1.AzureCliCredential(dacOptions), new identity_1.AzureDeveloperCliCredential(dacOptions), 
        // Keep Environment Credential for packages that have not migrated to Federated Authentication
        // See the migration guide for more information
        // https://dev.azure.com/azure-sdk/internal/_wiki/wikis/internal.wiki/1080/Secret-auth-migration
        new identity_1.EnvironmentCredential(dacOptions));
    }
}
//# sourceMappingURL=index.js.map