// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CommonClientOptions, ServiceClient } from "@azure/core-client";

export class PopTokenClient extends ServiceClient {}

export interface PopTokenClientOptions extends CommonClientOptions {}

import {
  createEmptyPipeline,
  createPipelineRequest,
  createDefaultHttpClient,
  PipelineResponse,
} from "@azure/core-rest-pipeline";
import { popTokenAuthenticationPolicy } from "./popTokenAuthenticationPolicy";
import { TokenCredential } from "@azure/core-auth";
import { authorizeRequestOnPopTokenChallenge } from "./authRequestPopTokenChallenge";

export async function sendGraphRequest(credential: TokenCredential): Promise<PipelineResponse> {
  const pipeline = createEmptyPipeline();
  // create pop token policy
  pipeline.addPolicy(
    popTokenAuthenticationPolicy({
      credential,
      scopes: "https://graph.microsoft.com/.default",
      challengeCallbacks: {
        authorizeRequestOnChallenge: authorizeRequestOnPopTokenChallenge,
      },
    }),
  );

  const req = createPipelineRequest({
    url: "https://graph.microsoft.com/v1.0/me",
  });

  const client = createDefaultHttpClient();
  const response = await pipeline.sendRequest(client, req);
  return response;
}
