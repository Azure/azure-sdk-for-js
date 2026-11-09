// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { promisify } from "node:util";
import { gzip } from "node:zlib";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpClient } from "@azure/core-rest-pipeline";
import { diag } from "@opentelemetry/api";
import { ALLOWED_REDIRECT_DOMAIN_SUFFIX_GROUPS } from "../../Declarations/Constants.js";

const gzipAsync = promisify(gzip);

function isIngestionUrl(value: string): boolean {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return false;
  }
  const hostname = url.hostname.toLowerCase().replace(/\.+$/, "");
  return (
    url.protocol === "https:" &&
    (url.pathname === "/v2/track" || url.pathname === "/v2.1/track") &&
    ALLOWED_REDIRECT_DOMAIN_SUFFIX_GROUPS.some((group) =>
      group.some((suffix) => hostname.endsWith(suffix)),
    )
  );
}

/**
 * Compress serialized Breeze requests after all policies have run.
 * @internal
 */
export function createGzipHttpClient(httpClient: HttpClient): HttpClient {
  return {
    async sendRequest(request) {
      if (
        request.method !== "POST" ||
        typeof request.body !== "string" ||
        request.body.length === 0 ||
        request.headers.has("Content-Encoding") ||
        !isIngestionUrl(request.url)
      ) {
        return httpClient.sendRequest(request);
      }

      let body: Buffer;
      try {
        body = await gzipAsync(request.body);
      } catch (error) {
        diag.warn("Failed to gzip telemetry. Sending the uncompressed request.", error);
        return httpClient.sendRequest(request);
      }
      const headers = createHttpHeaders(request.headers.toJSON());
      headers.set("Content-Encoding", "gzip");
      headers.set("Content-Length", String(body.length));
      // Keep the original JSON and headers available to policies and subsequent retries.
      return httpClient.sendRequest({ ...request, body, headers });
    },
  };
}
