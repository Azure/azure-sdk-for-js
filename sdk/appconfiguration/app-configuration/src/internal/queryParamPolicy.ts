// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelinePolicy } from "@azure/core-rest-pipeline";

/**
 * A policy factory for normalizing query parameters in outgoing requests.
 * @internal
 */
export function urlQueryParamsNormalizationPolicy(): PipelinePolicy {
  return {
    name: "UrlQueryParamsNormalizationPolicy",
    async sendRequest(request, next) {
      const qIndex = request.url.indexOf("?");
      if (qIndex === -1) {
        return next(request);
      }

      const base = request.url.substring(0, qIndex);
      const queryString = request.url.substring(qIndex + 1);

      if (!queryString.includes("&")) {
        return next(request);
      }

      const params = new URLSearchParams(queryString);
      const collected: Array<{ name: string; value: string; lower: string }> = [];
      for (const [name, value] of params.entries()) {
        collected.push({ name, value, lower: name.toLowerCase() });
      }
      if (collected.length > 1) {
        collected.sort((a, b) => (a.lower < b.lower ? -1 : a.lower > b.lower ? 1 : 0));
        const sorted = new URLSearchParams();
        for (const p of collected) {
          sorted.append(p.name, p.value);
        }
        Object.assign(request, { url: `${base}?${sorted.toString()}` });
      }
      return next(request);
    },
  };
}
