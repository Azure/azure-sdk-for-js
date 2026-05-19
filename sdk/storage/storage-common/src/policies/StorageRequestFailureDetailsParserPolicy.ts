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
        if (
          response.status === 400 &&
          response.bodyAsText?.includes("<Error><Code>InvalidHeaderValue</Code>") &&
          response.bodyAsText.includes("<HeaderName>x-ms-version</HeaderName>")
        ) {
          // replace the error message with a more user-friendly one that includes a link to documentation
          /* example reponse text:
          `<?xml version="1.0" encoding="utf-8"?>
<Error><Code>InvalidHeaderValue</Code><Message>The value for one of the HTTP headers is not in the correct format.
RequestId:e5ea566c-101e-001c-1ec4-acf180000000
Time:2026-03-05T17:24:34.6688015Z</Message><HeaderName>x-ms-version</HeaderName><HeaderValue>3025-01-01</HeaderValue></Error>`
          */
          response.bodyAsText = response.bodyAsText.replace(
            "The value for one of the HTTP headers is not in the correct format.",
            "The provided service version is not enabled on this storage account. Please see https://learn.microsoft.com/rest/api/storageservices/versioning-for-the-azure-storage-services for additional information.",
          );
        }
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
