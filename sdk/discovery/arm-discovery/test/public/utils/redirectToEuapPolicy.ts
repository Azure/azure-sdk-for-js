// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";

/**
 * HTTP pipeline policy that redirects requests to the EUAP endpoint.
 * This is required because the Discovery API 2026-02-01-preview is only available
 * in the EUAP environment.
 *
 * The key insight is that we authenticate against the normal management.azure.com
 * endpoint (which works with DefaultAzureCredential), but then redirect the actual
 * API calls to the EUAP endpoint.
 */
export function createRedirectToEuapPolicy(euapEndpoint: string): PipelinePolicy {
  return {
    name: "redirectToEuapPolicy",
    sendRequest: async (request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> => {
      const originalUrl = new URL(request.url);
      const host = originalUrl.host;

      // Replace management.azure.com with EUAP endpoint
      if (host === "management.azure.com" || host.endsWith(".management.azure.com")) {
        const euapUrl = new URL(euapEndpoint);
        originalUrl.host = euapUrl.host;
        request.url = originalUrl.toString();
        console.log(`[RedirectToEuapPolicy] Redirected to: ${request.url}`);
      }

      const response = await next(request);
      if (response.status >= 400) {
        console.log(`[RedirectToEuapPolicy] Error ${response.status}:`, response.bodyAsText);
      }
      return response;
    },
  };
}
