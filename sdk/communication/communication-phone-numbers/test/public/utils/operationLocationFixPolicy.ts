// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelinePolicy, PipelineRequest, PipelineResponse, SendRequest } from "@azure/core-rest-pipeline";
import { isPlaybackMode } from "@azure-tools/test-recorder";

/**
 * Policy to fix Operation-Location headers and URLs that get incorrectly sanitized during test playback.
 * This policy handles various Long Running Operation (LRO) scenarios across Azure Communication Services.
 */
export function createOperationLocationFixPolicy(): PipelinePolicy {
  return {
    name: "OperationLocationFixPolicy",
    sendRequest: async (request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> => {
      
      // Fix broken request URLs before they're sent (only during playback)
      if (isPlaybackMode() && request.url) {
        const originalUrl = request.url;
        let fixedUrl = originalUrl;
        
        // Pattern 1: URLs with "/Sanitized" path component
        if (originalUrl.includes("/Sanitized?") || originalUrl.includes("/Sanitized&") || originalUrl.endsWith("/Sanitized")) {
          // Extract the query parameters to preserve them
          const urlObj = new URL(originalUrl);
          const queryParams = urlObj.searchParams.toString();
          
          // Common LRO result endpoints for Azure Communication Services
          const baseUrl = "https://Sanitized.com";
          fixedUrl = `${baseUrl}/availablePhoneNumbers/searchResults/00000000-0000-0000-0000-000000000000${queryParams ? `?${queryParams}` : ''}`;
          
          // eslint-disable-next-line no-param-reassign
          request.url = fixedUrl;
        }
        
        // Pattern 2: URLs pointing to example.com
        else if (originalUrl.includes("example.com")) {
          const urlObj = new URL(originalUrl);
          const queryParams = urlObj.searchParams.toString();
          const baseUrl = "https://Sanitized.com";
          
          // Try to infer the correct path based on common patterns
          if (queryParams.includes("api-version")) {
            // Default to phoneNumbers operations path if we can't determine the specific operation
            fixedUrl = `${baseUrl}/phoneNumbers/operations/search_00000000-0000-0000-0000-000000000000${queryParams ? `?${queryParams}` : ''}`;
          }
          
          // eslint-disable-next-line no-param-reassign
          request.url = fixedUrl;
        }
      }
      
      const response = await next(request);
      
      // Fix response headers (only during playback)
      if (isPlaybackMode() && response.headers) {
        const operationLocation = response.headers.get("operation-location") || response.headers.get("Operation-Location");
        const operationId = response.headers.get("operation-id");
        const location = response.headers.get("location") || response.headers.get("Location");
        
        // Fix Operation-Location header if it's broken
        if (operationLocation && 
            (operationLocation === "https://example.com" || 
             operationLocation === "https://Sanitized.com" || 
             operationLocation.includes("example.com") ||
             operationLocation.endsWith("/Sanitized"))) {
          
          let fixedOperationUrl: string;
          
          if (operationId) {
            // Use the operation ID to construct the correct URL
            const baseUrl = "https://Sanitized.com";
            
            // Determine operation type from operation ID pattern
            if (operationId.startsWith("search_")) {
              fixedOperationUrl = `${baseUrl}/phoneNumbers/operations/${operationId}?api-version=2025-04-01`;
            } else if (operationId.startsWith("purchase_")) {
              fixedOperationUrl = `${baseUrl}/phoneNumbers/operations/${operationId}?api-version=2025-04-01`;
            } else if (operationId.startsWith("release_")) {
              fixedOperationUrl = `${baseUrl}/phoneNumbers/operations/${operationId}?api-version=2025-04-01`;
            } else {
              // Generic fallback for any other operation type
              fixedOperationUrl = `${baseUrl}/phoneNumbers/operations/${operationId}?api-version=2025-04-01`;
            }
          } else {
            // Fallback if no operation ID is available
            fixedOperationUrl = `https://Sanitized.com/phoneNumbers/operations/operation_00000000-0000-0000-0000-000000000000?api-version=2025-04-01`;
          }
          
          response.headers.set("Operation-Location", fixedOperationUrl);
          response.headers.set("operation-location", fixedOperationUrl);
        }
        
        // Fix Location header if it's broken (used for result retrieval)
        if (location && 
            (location === "Sanitized" || 
             location === "/Sanitized" ||
             location.includes("example.com"))) {
          
          // Common patterns for Location headers in Azure Communication Services
          let fixedLocationUrl: string;
          
          if (operationId && operationId.startsWith("search_")) {
            const searchId = operationId.replace("search_", "");
            fixedLocationUrl = `/availablePhoneNumbers/searchResults/${searchId}?api-version=2025-04-01`;
          } else {
            // Generic fallback
            fixedLocationUrl = `/availablePhoneNumbers/searchResults/00000000-0000-0000-0000-000000000000?api-version=2025-04-01`;
          }
          
          response.headers.set("Location", fixedLocationUrl);
          response.headers.set("location", fixedLocationUrl);
        }
      }
      
      return response;
    },
  };
}
