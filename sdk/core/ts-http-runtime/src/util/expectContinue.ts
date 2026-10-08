// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelineRequest } from "../interfaces.js";

export function headerValues(headers: unknown, name: string): unknown[] {
  if (Array.isArray(headers)) {
    const values: unknown[] = [];
    if (Array.isArray(headers[0])) {
      for (const pair of headers) {
        if (Array.isArray(pair) && typeof pair[0] === "string" && pair[0].toLowerCase() === name) {
          values.push(pair[1]);
        }
      }
    } else {
      for (let i = 0; i < headers.length; i += 2) {
        if (typeof headers[i] === "string" && headers[i].toLowerCase() === name) {
          values.push(headers[i + 1]);
        }
      }
    }
    return values.flat();
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

export function effectiveHeaders(request: PipelineRequest): unknown {
  return request.requestOverrides && "headers" in request.requestOverrides
    ? request.requestOverrides.headers
    : request.headers.toJSON({ preserveCase: true });
}

export function hasExpectContinue(request: PipelineRequest): boolean {
  return headerValues(effectiveHeaders(request), "expect").some(
    (value) =>
      typeof value === "string" &&
      value.split(",").some((token) => token.trim().toLowerCase() === "100-continue"),
  );
}

function withoutContinue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(withoutContinue).filter((entry) => entry !== undefined);
  }
  if (typeof value !== "string") return value;
  const tokens = value.split(",").filter((token) => token.trim().toLowerCase() !== "100-continue");
  return tokens.length ? tokens.join(",") : undefined;
}

export function removeBodyHeaders(request: PipelineRequest): void {
  const expect = withoutContinue(request.headers.get("Expect"));
  if (typeof expect === "string") request.headers.set("Expect", expect);
  else request.headers.delete("Expect");
  request.headers.delete("Content-Length");
  request.headers.delete("Transfer-Encoding");
  const overrides = request.requestOverrides;
  if (!overrides) return;
  const headers = overrides.headers;
  const remove = (name: string): boolean =>
    name.toLowerCase() === "content-length" || name.toLowerCase() === "transfer-encoding";
  if (Array.isArray(headers)) {
    const pairs: unknown[][] = Array.isArray(headers[0])
      ? headers
      : Array.from({ length: headers.length / 2 }, (_, index) => [
          headers[index * 2],
          headers[index * 2 + 1],
        ]);
    const updated = pairs.flatMap(([name, value]) => {
      if (typeof name !== "string" || remove(name)) return [];
      const result = name.toLowerCase() === "expect" ? withoutContinue(value) : value;
      return result === undefined ? [] : [[name, result]];
    });
    request.requestOverrides = {
      ...overrides,
      method: "GET",
      headers: Array.isArray(headers[0]) ? updated : updated.flat(),
    };
  } else if (headers && typeof headers === "object") {
    const updated: Record<string, unknown> = {};
    for (const [name, value] of Object.entries(headers)) {
      if (remove(name)) continue;
      const result = name.toLowerCase() === "expect" ? withoutContinue(value) : value;
      if (result !== undefined) updated[name] = result;
    }
    request.requestOverrides = { ...overrides, method: "GET", headers: updated };
  } else {
    request.requestOverrides = { ...overrides, method: "GET" };
  }
}
