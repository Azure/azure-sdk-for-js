// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelineRequest } from "../interfaces.js";

function getHeaderValues(headers: unknown, name: string): unknown[] {
  if (Array.isArray(headers)) {
    const pairs = Array.isArray(headers[0])
      ? (headers as unknown[][])
      : Array.from({ length: Math.ceil(headers.length / 2) }, (_, index) => [
          headers[index * 2],
          headers[index * 2 + 1],
        ]);
    return pairs
      .filter(([key]) => typeof key === "string" && key.toLowerCase() === name)
      .map(([, value]) => value);
  }

  if (headers && typeof headers === "object") {
    const get = Reflect.get(headers, "get");
    if (typeof get === "function") {
      const value = Reflect.apply(get, headers, [name]);
      return value === undefined || value === null ? [] : [value];
    }

    let value: unknown;
    for (const [key, entry] of Object.entries(headers)) {
      if (key.toLowerCase() === name) {
        value = entry;
      }
    }
    return value === undefined ? [] : Array.isArray(value) ? value : [value];
  }

  return [];
}

export function getEffectiveHeaderValues(request: PipelineRequest, name: string): unknown[] {
  const headers =
    request.requestOverrides && "headers" in request.requestOverrides
      ? request.requestOverrides.headers
      : request.headers;
  return getHeaderValues(headers, name.toLowerCase());
}

export function hasExpectHeader(request: PipelineRequest): boolean {
  return getEffectiveHeaderValues(request, "expect").length > 0;
}

export function hasExpectContinue(request: PipelineRequest): boolean {
  return getEffectiveHeaderValues(request, "expect").some(
    (value) =>
      typeof value === "string" &&
      value.split(",").some((token) => token.trim().toLowerCase() === "100-continue"),
  );
}
