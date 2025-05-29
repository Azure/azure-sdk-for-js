// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { __rest } from "tslib";
import { AzureCliCredential, AzureDeveloperCliCredential, AzurePipelinesCredential, AzurePowerShellCredential, ChainedTokenCredential, EnvironmentCredential, } from "@azure/identity";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import { NoOpCredential } from "./noOpCredential.js";
import { isBrowser } from "@azure/core-util";
import { createBrowserRelayCredential } from "./browserRelayCredential.js";
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
export function createTestCredential(tokenCredentialOptions = {}) {
    if (isPlaybackMode()) {
        return new NoOpCredential();
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
export function createLiveCredential(tokenCredentialOptions = {}) {
    if (isBrowser) {
        return createBrowserRelayCredential(tokenCredentialOptions);
    }
    else {
        const { browserRelayServerUrl: _ } = tokenCredentialOptions, dacOptions = __rest(tokenCredentialOptions, ["browserRelayServerUrl"]);
        const systemAccessToken = process.env.SYSTEM_ACCESSTOKEN;
        // If we have a system access token, we are in Azure Pipelines
        if (systemAccessToken) {
            const serviceConnectionID = process.env.AZURESUBSCRIPTION_SERVICE_CONNECTION_ID;
            const clientID = process.env.AZURESUBSCRIPTION_CLIENT_ID;
            const tenantID = process.env.AZURESUBSCRIPTION_TENANT_ID;
            if (serviceConnectionID && clientID && tenantID) {
                return new AzurePipelinesCredential(tenantID, clientID, serviceConnectionID, systemAccessToken, dacOptions);
            }
            throw new Error(`Running in Azure Pipelines environment. Missing environment variables: 
        serviceConnectionID: ${serviceConnectionID}, tenantID: ${tenantID}, clientID: ${clientID}`);
        }
        return new ChainedTokenCredential(new AzurePowerShellCredential(dacOptions), new AzureCliCredential(dacOptions), new AzureDeveloperCliCredential(dacOptions), 
        // Keep Environment Credential for packages that have not migrated to Federated Authentication
        // See the migration guide for more information
        // https://dev.azure.com/azure-sdk/internal/_wiki/wikis/internal.wiki/1080/Secret-auth-migration
        new EnvironmentCredential(dacOptions));
    }
}
export { NoOpCredential };
//# sourceMappingURL=index.js.map