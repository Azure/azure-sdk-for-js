// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ClientOptions as OpenAIClientOptions } from "openai";
import type { HttpHeaders, RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";

/*
 * @param headers the openai defaultHeaders in openai client options
 * @returns HttpHeaders, normalized from various OpenAI header formats
 */
export const normalizeOpenAIHeaders = (
  headers?: OpenAIClientOptions["defaultHeaders"],
): HttpHeaders => {
  if (!headers) {
    return createHttpHeaders();
  }

  // Handle NullableHeaders (OpenAI internal type with values and nulls properties)
  // Check this first before other object checks
  if ("values" in headers && "nulls" in headers) {
    const result = normalizeOpenAIHeaders(headers.values as OpenAIClientOptions["defaultHeaders"]);

    // Remove headers that were explicitly set to null
    if (result && headers.nulls instanceof Set && headers.nulls.size > 0) {
      for (const nullHeader of headers.nulls) {
        result.delete(nullHeader);
      }
    }

    return result;
  }

  // Handle array format: readonly HeaderValue[][]
  // Check arrays before forEach to avoid catching arrays with the forEach check
  if (Array.isArray(headers)) {
    const rawHeaders: RawHttpHeadersInput = {};
    for (const [key, value] of headers) {
      if (key && value !== null && value !== undefined) {
        const strValue = String(value);
        // Merge multiple headers with the same name using comma separation
        if (rawHeaders[key]) {
          rawHeaders[key] = `${rawHeaders[key]}, ${strValue}`;
        } else {
          rawHeaders[key] = strValue;
        }
      }
    }
    return createHttpHeaders(rawHeaders);
  }

  // Handle Headers object (Web API Headers) - use duck typing to avoid Node.js version warnings
  if ("forEach" in headers && typeof headers.forEach === "function") {
    const rawHeaders: RawHttpHeadersInput = {};
    // Type assertion since we've verified it has forEach
    (headers as { forEach: (callback: (value: string, key: string) => void) => void }).forEach(
      (value, key) => {
        // Merge multiple headers with the same name using comma separation
        if (rawHeaders[key]) {
          rawHeaders[key] = `${rawHeaders[key]}, ${value}`;
        } else {
          rawHeaders[key] = value;
        }
      },
    );
    return createHttpHeaders(rawHeaders);
  }

  // Handle Record<string, HeaderValue | readonly HeaderValue[]>
  if (typeof headers === "object" && headers !== null) {
    const rawHeaders: RawHttpHeadersInput = {};
    for (const [key, value] of Object.entries(headers)) {
      if (value === null || value === undefined) {
        continue;
      }
      if (Array.isArray(value)) {
        // Join multiple values with comma (standard HTTP header behavior)
        const filtered = value.filter((v) => v !== null && v !== undefined).map(String);
        if (filtered.length > 0) {
          rawHeaders[key] = filtered.join(", ");
        }
      } else {
        rawHeaders[key] = String(value);
      }
    }
    return createHttpHeaders(rawHeaders);
  }

  return createHttpHeaders();
};

/**
 * Get OpenAI default headers with user-agent set appropriately
 * @param defaultHeaders - The default headers from OpenAI client options
 * @param userAgentPrefix - Optional user agent prefix to prepend from  AIProjectClient options
 * @returns HttpHeaders with normalized headers and user-agent set
 */
export const getOpenAIDefaultHeaders = (
  defaultHeaders?: OpenAIClientOptions["defaultHeaders"],
  userAgentPrefix?: string,
): HttpHeaders => {
  const headers = normalizeOpenAIHeaders(defaultHeaders);

  if (!headers.has("User-Agent")) {
    const clientIdentifier = userAgentPrefix
      ? `${userAgentPrefix}-AIProjectClient`
      : "AIProjectClient";
    headers.set("User-Agent", `${clientIdentifier} OpenAI/JS`);
  }

  return headers;
};
