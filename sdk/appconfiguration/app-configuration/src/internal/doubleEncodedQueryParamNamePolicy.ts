// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import { logger } from "../logger.js";

const queryParameterNameReplacements = new Map([
  // The emitter re-encodes the already encoded $Select name when its value is an array.
  ["%2524select", "%24Select"],
]);

/**
 * Corrects query parameter names that the TypeScript emitter double-encodes
 * when expanding array-valued RFC 6570 template variables.
 */
export function doubleEncodedQueryParamNamePolicy(): PipelinePolicy {
  return {
    name: "doubleEncodedQueryParamNamePolicy",
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      let url: URL;
      try {
        url = new URL(request.url);
      } catch (error) {
        if (error instanceof TypeError) {
          logger.warning(
            `"[doubleEncodedQueryParamNamePolicy] Could not parse URL: ${request.url}"`,
          );
          return next(request);
        }
        throw error;
      }

      if (url.search === "") {
        return next(request);
      }

      const query = url.search.substring(1);
      const normalizedQuery = query
        .split("&")
        .map((entry) => {
          const equalIndex = entry.indexOf("=");
          const name = equalIndex === -1 ? entry : entry.substring(0, equalIndex);
          const value = equalIndex === -1 ? "" : entry.substring(equalIndex);
          const normalizedName = queryParameterNameReplacements.get(name.toLowerCase()) ?? name;
          return `${normalizedName}${value}`;
        })
        .join("&");

      if (normalizedQuery !== query) {
        url.search = normalizedQuery;
        request.url = url.toString();
      }

      return next(request);
    },
  };
}
