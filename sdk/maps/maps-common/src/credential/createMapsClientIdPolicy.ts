// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";

const MAPS_CLIENT_ID_HEADER_NAME = "x-ms-client-id";

/**
 * The programmatic identifier of the mapsTokenCredentialPolicy.
 */
const mapsClientIdPolicyName = "mapsClientIdPolicy";

/**
 * Create an HTTP pipeline policy to add x-ms-client-id header
 * for `TokenCredential` based authentication for Azure Maps
 */
export function createMapsClientIdPolicy(mapsClientId: string): PipelinePolicy {
  return {
    name: mapsClientIdPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      if (!request.headers.has(MAPS_CLIENT_ID_HEADER_NAME)) {
        request.headers.set(MAPS_CLIENT_ID_HEADER_NAME, mapsClientId);
      }
      return next(request);
    },
  };
}
