// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CommonClientOptions, ServiceClient } from "@azure/core-client";

export class PopTokenClient extends ServiceClient {}

export interface PopTokenClientOptions extends CommonClientOptions {}

import {
  createEmptyPipeline,
  bearerTokenAuthenticationPolicy,
  createPipelineRequest,
  createDefaultHttpClient,
} from "@azure/core-rest-pipeline";
import { popTokenAuthenticationPolicy } from "./popTokenAuthenticationPolicy";

async function sendGraphRequest() {
  const pipeline = createEmptyPipeline();
  // how to create pop policy?
  pipeline.addPolicy(popTokenAuthenticationPolicy());

  const req = createPipelineRequest({
    url: "https://graph...",
  });

  const client = createDefaultHttpClient();

  const result = await pipeline.sendRequest(client, req);

  // assert something on the result
  result.status;
  result.bodyAsText;
}
