// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import { isPlaybackMode } from "@azure-tools/test-recorder";

// Global constant for the sanitized base URL used in test recordings
const SANITIZED_BASE_URL = "https://Sanitized.com";

// Default API version for use in test recordings and URL fixes
const DEFAULT_API_VERSION = "2025-04-01";

/**
 * Policy to fix Operation-Location headers and URLs that get incorrectly sanitized during test playback.
 * This policy handles various Long Running Operation (LRO) scenarios across Azure Communication Services.
 */
export function createOperationLocationFixPolicy(): PipelinePolicy {
  return {
    name: "OperationLocationFixPolicy",
    sendRequest: async (request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> => {
      // Extract API version from the current request URL to use consistently
      function getApiVersion(url: string): string {
        try {
          const urlObj = new URL(url);
          return urlObj.searchParams.get("api-version") || DEFAULT_API_VERSION;
        } catch {
          return DEFAULT_API_VERSION;
        }
      }

      // Fix broken request URLs before they're sent (only during playback)
      if (isPlaybackMode() && request.url) {
        const originalUrl = request.url;
        let fixedUrl = originalUrl;

        // Pattern 1: URLs with "/Sanitized" path component
        if (
          originalUrl.includes("/Sanitized?") ||
          originalUrl.includes("/Sanitized&") ||
          originalUrl.endsWith("/Sanitized")
        ) {
          // Extract the query parameters to preserve them
          const urlObj = new URL(originalUrl);
          const queryParams = urlObj.searchParams.toString();

          // Common LRO result endpoints for Azure Communication Services
          fixedUrl = `${SANITIZED_BASE_URL}/availablePhoneNumbers/searchResults/00000000-0000-0000-0000-000000000000${queryParams ? `?${queryParams}` : ""}`;

          request.url = fixedUrl;
        }

        // Pattern 2: URLs pointing to example.com
        else if (originalUrl.includes("example.com")) {
          const urlObj = new URL(originalUrl);
          const queryParams = urlObj.searchParams.toString();

          // Try to infer the correct path based on common patterns
          if (queryParams.includes("api-version")) {
            // Default to phoneNumbers operations path if we can't determine the specific operation
            fixedUrl = `${SANITIZED_BASE_URL}/phoneNumbers/operations/search_00000000-0000-0000-0000-000000000000${queryParams ? `?${queryParams}` : ""}`;
          }

          request.url = fixedUrl;
        }
      }

      const response = await next(request);

      // Fix response headers (only during playback)
      if (isPlaybackMode() && response.headers) {
        const apiVersion = request.url ? getApiVersion(request.url) : DEFAULT_API_VERSION;
        const operationLocation =
          response.headers.get("operation-location") || response.headers.get("Operation-Location");
        const operationId = response.headers.get("operation-id");
        const location = response.headers.get("location") || response.headers.get("Location");

        // Fix Operation-Location header if it's broken
        if (
          operationLocation &&
          (operationLocation === "https://example.com" ||
            operationLocation === SANITIZED_BASE_URL ||
            operationLocation.includes("example.com") ||
            operationLocation.endsWith("/Sanitized"))
        ) {
          let fixedOperationUrl: string;

          if (operationId) {
            // Determine operation type from operation ID pattern
            fixedOperationUrl = `${SANITIZED_BASE_URL}/phoneNumbers/operations/${operationId}?api-version=${apiVersion}`;
          } else {
            // Fallback if no operation ID is available
            fixedOperationUrl = `${SANITIZED_BASE_URL}/phoneNumbers/operations/operation_00000000-0000-0000-0000-000000000000?api-version=${apiVersion}`;
          }

          response.headers.set("Operation-Location", fixedOperationUrl);
          response.headers.set("operation-location", fixedOperationUrl);
        }

        // Fix Location header if it's broken (used for result retrieval)
        if (
          location &&
          (location === "Sanitized" ||
            location === "/Sanitized" ||
            location.includes("example.com"))
        ) {
          // Common patterns for Location headers in Azure Communication Services
          let fixedLocationUrl: string;

          if (operationId && operationId.startsWith("search_")) {
            const searchId = operationId.replace("search_", "");
            fixedLocationUrl = `/availablePhoneNumbers/searchResults/${searchId}?api-version=${apiVersion}`;
          } else {
            // Generic fallback
            fixedLocationUrl = `/availablePhoneNumbers/searchResults/00000000-0000-0000-0000-000000000000?api-version=${apiVersion}`;
          }

          response.headers.set("Location", fixedLocationUrl);
          response.headers.set("location", fixedLocationUrl);
        }
      }

      return response;
    },
  };
}
