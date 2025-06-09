// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelinePolicy, PipelineRequest, PipelineResponse, SendRequest } from "@azure/core-rest-pipeline";

/**
 * The programmatic identifier of the errorParsingPolicy.
 */
export const errorParsingPolicyName = "errorParsingPolicy";

/**
 * This policy ensures error responses are properly parsed as JSON when they come as strings.
 * It's needed to handle cases where response.body is a string that needs to be parsed
 * to match the ErrorResponseOutput type.
 */
export function errorParsingPolicy(): PipelinePolicy {
  return {
    name: errorParsingPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      const response = await next(request);
      
      // Check if this is an error response (non-2xx status code)
      const statusCode = Number(response.status);
      if (statusCode < 200 || statusCode >= 300) {
        // If the body is a string and looks like JSON, parse it
        if (response.body && typeof response.body === "string") {
          try {
            // Only parse if it looks like a JSON string
            if (response.body.trim().startsWith("{") && response.body.trim().endsWith("}")) {
              response.body = JSON.parse(response.body);
            }
          } catch (error) {
            // If parsing fails, leave the body as is
            console.warn(`Failed to parse error response body: ${error}`);
          }
        }
      }

      return response;
    }
  };
}