// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelineResponse,
  PipelineRequest,
  SendRequest,
  PipelinePolicy,
} from "@azure/core-rest-pipeline";

export const webPubSubReverseProxyPolicyName = "webPubSubReverseProxyPolicy";

/**
 * Create an HTTP pipeline policy to use a reverse proxy.
 * This is generally going to be an Azure APIM endpoint.
 * @internal
 */
export function webPubSubReverseProxyPolicy(endpoint: string): PipelinePolicy {
  const rpEndpointUrl = new URL(endpoint);
  return {
    name: webPubSubReverseProxyPolicyName,
    sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      const parsedUrl = new URL(request.url);
      parsedUrl.host = rpEndpointUrl.host;
      request.url = parsedUrl.toString();
      return next(request);
    },
  };
}
