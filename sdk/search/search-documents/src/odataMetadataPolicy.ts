// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";

const AcceptHeaderName = "Accept";

type MetadataLevel = "none" | "minimal";
const odataMetadataPolicy = "OdataMetadataPolicy";

/**
 * A policy factory for setting the Accept header to ignore odata metadata
 * @internal
 */
export function createOdataMetadataPolicy(metadataLevel: MetadataLevel): PipelinePolicy {
  return {
    name: odataMetadataPolicy,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      request.headers.set(AcceptHeaderName, `application/json;odata.metadata=${metadataLevel}`);
      return next(request);
    },
  };
}
