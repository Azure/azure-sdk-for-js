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
 *  - Do not percent-encode values; keep original text
 */
export function queryParamPolicy(): PipelinePolicy {
  return {
    name: "queryParamPolicy",
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      try {
        const originalUrl = request.url;

        // Use URL API to decompose parts
        const url = new URL(originalUrl);

        if (url.search === "") {
          return next(request);
        }

        const search: string = url.search.slice(1); // Remove leading '?'
        // We don't use URLSearchParams because it doesn't distinguish ?param= and ?param.
        const rawParams = search.split("&").filter((value) => value !== "");

        const params: ParamEntry[] = [];
        for (const p of rawParams) {
          const eq = p.indexOf("=");
          if (eq >= 0) {
            params.push({
              lowercaseName: p.substring(0, eq).toLowerCase(),
              value: p.substring(eq), // Keep the '='
            });
          } else {
            params.push({
              lowercaseName: p.toLowerCase(),
              value: "",
            });
          }
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

        const newSearch = params.map((p) => p.lowercaseName + p.value).join("&");
        const newUrl = url.origin + url.pathname + "?" + newSearch + url.hash;
        request.url = newUrl;
      } catch {
        // If anything goes wrong, fall back to sending the original request.
      }

      return next(request);
    },
  };
}

interface ParamEntry {
  lowercaseName: string;
  value: string;
}
