// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CommonClientOptions, ServiceClient } from "@azure/core-client";

export class PopTokenClient extends ServiceClient {}

export interface PopTokenClientOptions extends CommonClientOptions {}

import {
  createEmptyPipeline,
  createPipelineRequest,
  createDefaultHttpClient,
} from "@azure/core-rest-pipeline";
import { popTokenAuthenticationPolicy } from "./popTokenAuthenticationPolicy";
import { TokenCredential } from "@azure/core-auth";
import { authorizeRequestOnPopTokenChallenge } from "./authRequestPopTokenChallenge";

export async function sendGraphRequest(credential: TokenCredential) {
  const pipeline = createEmptyPipeline();
  // how to create pop policy?
  pipeline.addPolicy(
    popTokenAuthenticationPolicy({
      credential,
      scopes: "https://graph.microsoft.com/.default",
      challengeCallbacks: {
        authorizeRequestOnChallenge: authorizeRequestOnPopTokenChallenge,
      },
    })
  );

  const req = createPipelineRequest({
    url: "https://graph.microsoft.com/v1.0/me",
  });

  const client = createDefaultHttpClient();
  const result = await pipeline.sendRequest(client, req);
  console.log(result.status);
  console.log(result.bodyAsText);
}
