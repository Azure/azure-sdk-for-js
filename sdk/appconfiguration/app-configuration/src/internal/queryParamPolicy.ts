// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";

/**
 * Creates a PipelinePolicy that normalizes query parameters:
 *  - Lowercase names
 *  - Sort by lowercase name
 *  - Preserve the relative order of duplicates
 */
export function queryParamPolicy(): PipelinePolicy {
  return {
    name: "queryParamPolicy",
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      try {
        const originalUrl: string = request.url;
        const url = new URL(originalUrl);

        if (url.search === "") {
          return next(request);
        }

        const params: ParamEntry[] = [];
        for (const entry of url.search.substring(1).split("&")) {
          const [name, value] = entry.split("=", 1);
          params.push({ lowercaseName: name.toLowerCase(), value });
        }

        // Modern JavaScript Array.prototype.sort is stable
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#sort_stability
        params.sort((a, b) => {
          if (a.lowercaseName < b.lowercaseName) {
            return -1;
          } else if (a.lowercaseName > b.lowercaseName) {
            return 1;
          }
          return 0;
        });

        const newSearchParams = params
          .map(({ lowercaseName, value }) => `${lowercaseName}=${value}`)
          .join("&");

        const newUrl = url.origin + url.pathname + "?" + newSearchParams + url.hash;
        if (newUrl !== originalUrl) {
          request.url = newUrl;
        }
      } catch {
        // If anything goes wrong, fall back to sending the original request.
        console.log("Failed to normalize query parameters.");
      }

      return next(request);
    },
  };
}

interface ParamEntry {
  lowercaseName: string;
  value: string;
}
