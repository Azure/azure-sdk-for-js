"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommunicationAuthPolicy = createCommunicationAuthPolicy;
const core_rest_pipeline_1 = require("@azure/core-rest-pipeline");
const core_auth_1 = require("@azure/core-auth");
const communicationAccessKeyCredentialPolicy_js_1 = require("./communicationAccessKeyCredentialPolicy.js");
/**
 * Creates a pipeline policy to authenticate request based
 * on the credential passed in.
 * @hidden
 *
 * @param credential - The KeyCredential or TokenCredential.
 */
function createCommunicationAuthPolicy(credential) {
    if ((0, core_auth_1.isTokenCredential)(credential)) {
        const policyOptions = {
            credential: credential,
            scopes: ["https://communication.azure.com//.default"],
        };
        return (0, core_rest_pipeline_1.bearerTokenAuthenticationPolicy)(policyOptions);
    }
    else {
        return (0, communicationAccessKeyCredentialPolicy_js_1.createCommunicationAccessKeyCredentialPolicy)(credential);
    }
}
//# sourceMappingURL=communicationAuthPolicy.js.map