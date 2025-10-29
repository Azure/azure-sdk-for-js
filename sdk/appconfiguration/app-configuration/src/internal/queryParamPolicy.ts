// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import { logger } from "../logger.js";

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
      const originalUrl: string = request.url;
      let url: URL;
      try {
        url = new URL(originalUrl);
      } catch (error) {
        if (error instanceof TypeError) {
          logger.warning(`"[queryParamPolicy] Could not parse URL: ${request.url}"`);
          return next(request);
        }
        throw error;
      }

      if (url.search === "") {
        return next(request);
      }

      const params: ParamEntry[] = [];
      for (const entry of url.search.substring(1).split("&")) {
        if (entry === "") {
          continue;
        }
        const equalIndex = entry.indexOf("=");
        const name = equalIndex === -1 ? entry : entry.substring(0, equalIndex);
        const value = equalIndex === -1 ? "" : entry.substring(equalIndex + 1);
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

      const newSearchParams: string = params
        .map(({ lowercaseName, value }) => `${lowercaseName}=${value}`)
        .join("&");

      const newUrl = url.origin + url.pathname + "?" + newSearchParams + url.hash;
      if (newUrl !== originalUrl) {
        request.url = newUrl;
      }

      return next(request);
    },
  };
}

interface ParamEntry {
  lowercaseName: string;
  value: string;
}
