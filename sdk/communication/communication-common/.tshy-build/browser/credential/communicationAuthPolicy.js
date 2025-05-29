// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { bearerTokenAuthenticationPolicy, } from "@azure/core-rest-pipeline";
import { isTokenCredential } from "@azure/core-auth";
import { createCommunicationAccessKeyCredentialPolicy } from "./communicationAccessKeyCredentialPolicy.js";
/**
 * Creates a pipeline policy to authenticate request based
 * on the credential passed in.
 * @hidden
 *
 * @param credential - The KeyCredential or TokenCredential.
 */
export function createCommunicationAuthPolicy(credential) {
    if (isTokenCredential(credential)) {
        const policyOptions = {
            credential: credential,
            scopes: ["https://communication.azure.com//.default"],
        };
        return bearerTokenAuthenticationPolicy(policyOptions);
    }
    else {
        return createCommunicationAccessKeyCredentialPolicy(credential);
    }
}
//# sourceMappingURL=communicationAuthPolicy.js.map