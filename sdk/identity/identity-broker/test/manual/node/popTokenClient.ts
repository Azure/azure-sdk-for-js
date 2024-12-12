// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CommonClientOptions } from "@azure/core-client";
import { ServiceClient } from "@azure/core-client";

export class PopTokenClient extends ServiceClient {}

export interface PopTokenClientOptions extends CommonClientOptions {}

import type { PipelineResponse } from "@azure/core-rest-pipeline";
import {
  createEmptyPipeline,
  createPipelineRequest,
  createDefaultHttpClient,
} from "@azure/core-rest-pipeline";
import { popTokenAuthenticationPolicy } from "./popTokenAuthenticationPolicy.js";
import type { TokenCredential } from "@azure/core-auth";
import { authorizeRequestOnPopTokenChallenge } from "./authRequestPopTokenChallenge.js";

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
