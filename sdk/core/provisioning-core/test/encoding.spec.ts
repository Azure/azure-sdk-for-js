// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { encodeWireValue } from "../src/serialization/json/encoding.js";
import type { DateTimeTextEncodingDescriptor } from "../src/shape/value-encoding.js";
import { describe, expect, it } from "vitest";

const rfc7231WireEncoding = {
  kind: "date-time-text",
  source: "offsetDateTime",
  format: "rfc7231",
  clientMode: "wire",
  wire: { kind: "string" },
} satisfies DateTimeTextEncodingDescriptor;

describe("wire encoding", () => {
  it("rejects RFC3339 fractional seconds that RFC7231 cannot preserve", () => {
    expect(() => encodeWireValue("2026-01-01T00:00:00.0001Z", rfc7231WireEncoding)).toThrow(
      "RFC7231 conversion would lose subsecond precision.",
    );
  });

  it("accepts RFC3339 fractional seconds that contain only zeros", () => {
    expect(encodeWireValue("2026-01-01T00:00:00.0000Z", rfc7231WireEncoding)).toBe(
      "Thu, 01 Jan 2026 00:00:00 GMT",
    );
  });
});
