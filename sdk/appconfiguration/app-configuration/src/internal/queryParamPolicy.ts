// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelinePolicy } from "@azure/core-rest-pipeline";

/**
 * A policy that normalizes query parameters for stable, canonical request URLs.
 * Behavior:
 * 1. All query parameter names are converted to lowercase (canonical form).
 * 2. Parameters are sorted lexicographically by their lowercase names.
 * 3. Relative order of duplicate names (ignoring case) is preserved (stable sort guarantee).
 *
 * This improves determinism for recordings and avoids casing-related cache misses.
 * NOTE: Only enable if the target service treats parameter names case-insensitively.
 * @internal
 */
export function urlQueryParamNormalizationPolicy(): PipelinePolicy {
  return {
    name: "urlQueryParamNormalizationPolicy",
    async sendRequest(request, next) {
      const qIndex = request.url.indexOf("?");
      if (qIndex === -1) {
        return next(request);
      }

      const base = request.url.substring(0, qIndex);
      const queryString = request.url.substring(qIndex + 1);
      const params = new URLSearchParams(queryString);
      const collected: Array<{ name: string; value: string; lower: string }> = [];
      for (const [name, value] of params.entries()) {
        collected.push({ name, value, lower: name.toLowerCase() });
      }
      if (collected.length > 1) {
        collected.sort((a, b) => (a.lower < b.lower ? -1 : a.lower > b.lower ? 1 : 0));
      }
      const normalized = new URLSearchParams();
      for (const p of collected) {
        normalized.append(p.lower, p.value);
      }
      request.url = `${base}?${normalized.toString()}`;
      return next(request);
    },
  };
}
