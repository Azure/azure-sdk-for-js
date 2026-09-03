// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";

const AcceptHeaderName = "Accept";
const EventStreamContentType = "text/event-stream";

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
      const mediaType = request.headers
        .get(AcceptHeaderName)
        ?.split(";", 1)[0]
        .trim()
        .toLowerCase();
      if (mediaType !== EventStreamContentType) {
        request.headers.set(AcceptHeaderName, `application/json;odata.metadata=${metadataLevel}`);
      }
      return next(request);
    },
  };
}
