// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";

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
      const queryStart = request.url.indexOf("?");
      if (queryStart === -1) {
        return next(request);
      }

      const fragmentStart = request.url.indexOf("#", queryStart);
      const queryEnd = fragmentStart === -1 ? request.url.length : fragmentStart;
      const query = request.url.substring(queryStart + 1, queryEnd);
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
        request.url =
          request.url.substring(0, queryStart + 1) +
          normalizedQuery +
          request.url.substring(queryEnd);
      }

      return next(request);
    },
  };
}
