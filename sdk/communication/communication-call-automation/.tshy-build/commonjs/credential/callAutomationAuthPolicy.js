"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCallAutomationAuthPolicy = createCallAutomationAuthPolicy;
exports.createCustomCallAutomationApiClient = createCustomCallAutomationApiClient;
const core_rest_pipeline_1 = require("@azure/core-rest-pipeline");
const core_auth_1 = require("@azure/core-auth");
const callAutomationAccessKeyCredentialPolicy_js_1 = require("./callAutomationAccessKeyCredentialPolicy.js");
const index_js_1 = require("./../generated/src/index.js");
const communication_common_1 = require("@azure/communication-common");
/**
 * Creates a pipeline policy to authenticate request based
 * on the credential passed in.
 * @hidden
 *
 * @param credential - The KeyCredential or TokenCredential.
 */
function createCallAutomationAuthPolicy(credential, acsUrl) {
    if ((0, core_auth_1.isTokenCredential)(credential)) {
        const policyOptions = {
            credential: credential,
            scopes: ["https://communication.azure.com//.default"],
        };
        return (0, core_rest_pipeline_1.bearerTokenAuthenticationPolicy)(policyOptions);
    }
    else {
        return (0, callAutomationAccessKeyCredentialPolicy_js_1.createCallAutomationAccessKeyCredentialPolicy)(credential, acsUrl);
    }
}
/**
 * Creates CallAutomationApiClient for custom endpoint
 * @hidden
 *
 * @param credential - The KeyCredential or TokenCredential.
 * @param internalPipelineOptions - CallAutomationApiClientOptionalParams if provided.
 * @param url - ACS url.
 */
function createCustomCallAutomationApiClient(credential, internalPipelineOptions, url) {
    // read environment variable for callAutomation auth
    const customEnabled = process.env.COMMUNICATION_CUSTOM_ENDPOINT_ENABLED;
    const customUrl = process.env.COMMUNICATION_CUSTOM_URL;
    let callAutomationApiClient;
    if ((customEnabled === null || customEnabled === void 0 ? void 0 : customEnabled.toLowerCase()) === "true" && customUrl) {
        // add custom header for Call Automation auth when flag is true
        callAutomationApiClient = new index_js_1.CallAutomationApiClient(customUrl, internalPipelineOptions);
        const callAutomationAuthPolicy = createCallAutomationAuthPolicy(credential, url);
        callAutomationApiClient.pipeline.addPolicy(callAutomationAuthPolicy);
    }
    else {
        callAutomationApiClient = new index_js_1.CallAutomationApiClient(url, internalPipelineOptions);
        const authPolicy = (0, communication_common_1.createCommunicationAuthPolicy)(credential);
        callAutomationApiClient.pipeline.addPolicy(authPolicy);
    }
    return callAutomationApiClient;
}
//# sourceMappingURL=callAutomationAuthPolicy.js.map