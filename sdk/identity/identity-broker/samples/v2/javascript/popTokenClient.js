// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { ServiceClient } from "@azure/core-client";
export class PopTokenClient extends ServiceClient {
}
import { createEmptyPipeline, createPipelineRequest, createDefaultHttpClient, } from "@azure/core-rest-pipeline";
import { popTokenAuthenticationPolicy } from "./popTokenAuthenticationPolicy";
import { authorizeRequestOnClaimChallenge } from "./authRequestPopChallenge";
export async function sendGraphRequest(credential) {
    const pipeline = createEmptyPipeline();
    // how to create pop policy?
    pipeline.addPolicy(popTokenAuthenticationPolicy({
        credential,
        "scopes": "https://graph.microsoft.com/.default",
        challengeCallbacks: {
            authorizeRequestOnChallenge: authorizeRequestOnClaimChallenge
        },
    }));
    const req = createPipelineRequest({
        //url: "https://graph.microsoft.com/v1.0/me",
        url: "https://graph.microsoft.com/v1.0/users/kaghiya@microsoft.com"
    });
    const client = createDefaultHttpClient();
    const result = await pipeline.sendRequest(client, req);
    // assert something on the result
    result.status;
    result.bodyAsText;
}
//# sourceMappingURL=popTokenClient.js.map