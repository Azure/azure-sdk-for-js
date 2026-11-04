// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelineRequest } from "../interfaces.js";

/**
 * Converts a flat `[name, value, ...]` raw header array to `[name, value]` pairs,
 * or returns an existing pair array unchanged, preserving order and duplicates.
 *
 * @param headers - Header names and values in either array format.
 * @returns The header pairs in their original order.
 * @see https://nodejs.org/api/http.html#messagerawheaders
 */
export function getHeaderPairs(headers: unknown[]): unknown[][] {
  return Array.isArray(headers[0])
    ? (headers as unknown[][])
    : Array.from({ length: Math.ceil(headers.length / 2) }, (_, index) => [
        headers[index * 2],
        headers[index * 2 + 1],
      ]);
}

function isIterable(value: object): value is Iterable<unknown> {
  return Symbol.iterator in value && typeof value[Symbol.iterator] === "function";
}

function removeContinueToken(value: unknown): unknown {
  if (typeof value === "string") {
    const tokens = value.split(",");
    const remaining = tokens.filter((token) => token.trim().toLowerCase() !== "100-continue");
    if (remaining.length === tokens.length) {
      return value;
    }
    return (
      remaining
        .map((token) => token.trim())
        .filter(Boolean)
        .join(", ") || undefined
    );
  }
  if (Array.isArray(value)) {
    const remaining = value.map(removeContinueToken).filter((entry) => entry !== undefined);
    return remaining.length > 0 ? remaining : undefined;
  }
  return value;
}

function stripRequestBodyHeaders(request: PipelineRequest, removeFraming: boolean): void {
  const stripHeaderValue = (name: string, value: unknown): unknown => {
    const lowerName = name.toLowerCase();
    if (
      removeFraming &&
      (lowerName === "content-length" ||
        lowerName === "transfer-encoding" ||
        lowerName === "trailer")
    ) {
      return undefined;
    }
    return lowerName === "expect" ? removeContinueToken(value) : value;
  };
  const stripHeaderPairs = (pairs: unknown[][]): unknown[][] =>
    pairs.flatMap(([name, value]) => {
      const updated = typeof name === "string" ? stripHeaderValue(name, value) : value;
      return updated === undefined ? [] : [[name, updated]];
    });
  for (const [name, value] of request.headers) {
    const updated = stripHeaderValue(name, value);
    if (updated === undefined) {
      request.headers.delete(name);
    } else if (typeof updated === "string" && updated !== value) {
      request.headers.set(name, updated);
    }
  }

  const overrides = request.requestOverrides;
  if (!overrides || !("headers" in overrides)) {
    return;
  }
  const headers = overrides.headers;
  if (Array.isArray(headers)) {
    const updatedPairs = stripHeaderPairs(getHeaderPairs(headers));
    request.requestOverrides = {
      ...overrides,
      headers: Array.isArray(headers[0]) ? updatedPairs : updatedPairs.flat(),
    };
  } else if (headers && typeof headers === "object" && isIterable(headers)) {
    const pairs = Array.from(headers, (entry) => {
      if (!Array.isArray(entry) || entry.length !== 2) {
        throw new TypeError("Header entry must be a name/value pair");
      }
      return entry;
    });
    request.requestOverrides = { ...overrides, headers: stripHeaderPairs(pairs) };
  } else if (headers && typeof headers === "object") {
    const updatedHeaders: Record<string, unknown> = {};
    for (const [name, value] of Object.entries(headers)) {
      const updated = stripHeaderValue(name, value);
      if (updated !== undefined) {
        updatedHeaders[name] = updated;
      }
    }
    request.requestOverrides = { ...overrides, headers: updatedHeaders };
  }
}

/**
 * Removes only the 100-continue expectation from pipeline and replacement headers.
 * Raw header arrays retain their shape, and caller-supplied override headers are not mutated.
 * Iterable override collections are materialized as reusable name/value pairs.
 *
 * @param request - The request whose body is known to be empty.
 */
export function removeExpectContinueHeader(request: PipelineRequest): void {
  stripRequestBodyHeaders(request, false);
}

/**
 * Removes obsolete body framing, trailer declarations, and the 100-continue expectation
 * after discarding a body.
 *
 * @param request - The request whose body has been discarded.
 */
export function removeRequestBodyHeaders(request: PipelineRequest): void {
  stripRequestBodyHeaders(request, true);
}
