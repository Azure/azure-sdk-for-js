// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest
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
    name: "normalizeQueryPolicy",
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      try {
        const originalUrl = request.url;

        // Separate out any hash fragment so we can keep it verbatim.
        const hashIndex = originalUrl.indexOf("#");
        const beforeHash = hashIndex >= 0 ? originalUrl.slice(0, hashIndex) : originalUrl;
        const hashFrag = hashIndex >= 0 ? originalUrl.slice(hashIndex) : "";

        const qIndex = beforeHash.indexOf("?");
        if (qIndex < 0) {
          return next(request);
        }

        // We don't use URLSearchParams because it will do percent-encoding.
        // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams#percent_encoding
        const base = beforeHash.slice(0, qIndex);
        const queryString = beforeHash.slice(qIndex + 1);
        const segments = queryString.split("&").filter((s) => s.length > 0);

        type Entry = {
          rawName: string;
          lowerName: string;
          value: string | undefined;
          index: number;
        };

        const entries: Entry[] = segments.map((seg, i) => {
          const eq = seg.indexOf("=");
          const rawName = eq === -1 ? seg : seg.slice(0, eq);
          const value = eq === -1 ? undefined : seg.slice(eq + 1);
          return {
            rawName,
            lowerName: rawName.toLowerCase(),
            value,
            index: i
          };
        });

        entries.sort((a, b) => {
          if (a.lowerName < b.lowerName) return -1;
          if (a.lowerName > b.lowerName) return 1;
          return a.index - b.index; // stability for duplicates
        });

        const normalizedQuery = entries
          .map((e) => (e.value !== undefined ? `${e.lowerName}=${e.value}` : e.lowerName))
          .join("&");

        const newUrl = `${base}${normalizedQuery ? "?" + normalizedQuery : ""}${hashFrag}`;

        // Only update if changed (optional, but nice to avoid surprising downstream logic).
        if (newUrl !== originalUrl) {
          request.url = newUrl;
        }
      } catch {
        // If anything goes wrong, fall back to sending the original request.
      }

      return next(request);
    }
  };
}
