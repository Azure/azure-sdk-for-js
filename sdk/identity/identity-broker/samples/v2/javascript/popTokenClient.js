// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { createEmptyPipeline, createPipelineRequest, createDefaultHttpClient } = require('@azure/core-rest-pipeline');
const { popTokenAuthenticationPolicy } = require('./popTokenAuthenticationPolicy');
const { authorizeRequestOnClaimChallenge } = require('./authRequestPopChallenge');

module.exports = async function sendGraphRequest(credential) {
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