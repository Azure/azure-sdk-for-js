// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PipelineRequest,
  PipelineResponse,
  SendRequest,
  PipelinePolicy,
} from "@azure/core-rest-pipeline";

/**
 * The programmatic identifier of the StorageRequestFailureDetailsParserPolicy.
 */
export const storageRequestFailureDetailsParserPolicyName =
  "storageRequestFailureDetailsParserPolicy";

/**
 * StorageRequestFailureDetailsParserPolicy
 */
export function storageRequestFailureDetailsParserPolicy(): PipelinePolicy {
  return {
    name: storageRequestFailureDetailsParserPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      try {
        const response = await next(request);
        return response;
      } catch (err) {
        if (
          typeof err === "object" &&
          err !== null &&
          (err as any).response &&
          (err as any).response.parsedBody
        ) {
          if (
            (err as any).response.parsedBody.code === "InvalidHeaderValue" &&
            (err as any).response.parsedBody.HeaderName === "x-ms-version"
          ) {
            (err as any).message =
              "The provided service version is not enabled on this storage account. Please see https://learn.microsoft.com/rest/api/storageservices/versioning-for-the-azure-storage-services for additional information.\n";
          }
        }
        throw err;
      }
    },
  };
}
