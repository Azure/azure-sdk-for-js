// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelineRequest } from "../interfaces.js";

/**
 * Normalizes Node's flat or tuple-array header representation into header pairs.
 *
 * @param headers - The Node request headers to normalize.
 * @returns The normalized header pairs.
 */
export function headerPairs(headers: readonly unknown[]): unknown[][] {
  // Node accepts either [[name, value], ...] or a flat [name, value, ...] list.
  return Array.isArray(headers[0])
    ? (headers as unknown[][])
    : Array.from({ length: Math.ceil(headers.length / 2) }, (_, i) => [
        headers[i * 2],
        headers[i * 2 + 1],
      ]);
}

/**
 * Gets all values for a header from any Node-supported header representation.
 *
 * @param headers - The Node request headers to inspect.
 * @param name - The lowercase header name to find.
 * @returns The matching header values.
 */
export function headerValues(headers: unknown, name: string): unknown[] {
  if (Array.isArray(headers)) {
    return headerPairs(headers)
      .filter(([key]) => typeof key === "string" && key.toLowerCase() === name)
      .flatMap(([, value]) => value);
  }
  if (headers && typeof headers === "object") {
    // Node's setHeader replaces an earlier spelling of the same object key.
    let value: unknown;
    for (const [key, entry] of Object.entries(headers)) {
      if (key.toLowerCase() === name) value = entry;
    }
    return value === undefined ? [] : Array.isArray(value) ? value : [value];
  }
  return [];
}

/**
 * Gets the headers that will be sent after applying request overrides.
 *
 * @param request - The pipeline request whose effective headers are needed.
 * @returns The request's effective headers.
 */
export function effectiveHeaders(request: PipelineRequest): unknown {
  return request.requestOverrides && "headers" in request.requestOverrides
    ? request.requestOverrides.headers
    : request.headers.toJSON({ preserveCase: true });
}

/**
 * Determines whether the effective headers request a 100-continue handshake.
 *
 * @param request - The pipeline request to inspect.
 * @returns Whether an Expect header contains the 100-continue token.
 */
export function hasExpectContinueHeader(request: PipelineRequest): boolean {
  return headerValues(effectiveHeaders(request), "expect").some(
    (value) =>
      typeof value === "string" &&
      value.split(",").some((token) => token.trim().toLowerCase() === "100-continue"),
  );
}

// Removes the 100-continue token while preserving any other Expect tokens.
function withoutContinue(value: unknown): unknown {
  if (Array.isArray(value)) {
    const values = value.map(withoutContinue).filter((entry) => entry !== undefined);
    return values.length ? values : undefined;
  }
  if (typeof value !== "string") return value;
  const tokens = value.split(",").filter((token) => token.trim().toLowerCase() !== "100-continue");
  return tokens.length ? tokens.join(",") : undefined;
}

// Removes body framing and 100-continue headers from a body-less redirected request.
function stripBodyHeader(name: unknown, value: unknown): unknown {
  if (typeof name !== "string") return undefined;
  const lower = name.toLowerCase();
  if (lower === "content-length" || lower === "transfer-encoding") return undefined;
  return lower === "expect" ? withoutContinue(value) : value;
}

/**
 * Removes body-related headers before following a body-less redirect.
 *
 * @param request - The redirected pipeline request to update.
 */
export function removeBodyHeaders(request: PipelineRequest): void {
  const expect = withoutContinue(request.headers.get("Expect"));
  if (typeof expect === "string") request.headers.set("Expect", expect);
  else request.headers.delete("Expect");
  request.headers.delete("Content-Length");
  request.headers.delete("Transfer-Encoding");
  const overrides = request.requestOverrides;
  if (!overrides) return;
  const headers = overrides.headers;
  if (Array.isArray(headers)) {
    const pairs = headerPairs(headers).flatMap(([name, value]) => {
      const result = stripBodyHeader(name, value);
      return result === undefined ? [] : [[name, result]];
    });
    request.requestOverrides = {
      ...overrides,
      headers: Array.isArray(headers[0]) ? pairs : pairs.flat(),
    };
  } else if (headers && typeof headers === "object") {
    const entries = Object.entries(headers).flatMap(([name, value]) => {
      const result = stripBodyHeader(name, value);
      return result === undefined ? [] : [[name, result]];
    });
    request.requestOverrides = {
      ...overrides,
      headers: Object.fromEntries(entries),
    };
  }
}
