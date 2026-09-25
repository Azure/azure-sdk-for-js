// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { encodeWireValue } from "../src/serialization/json/encoding.js";
import type {
  DateTimeTextEncodingDescriptor,
  DurationIso8601EncodingDescriptor,
} from "../src/shape/value-encoding.js";
import { describe, expect, it } from "vitest";

const rfc7231WireEncoding = {
  kind: "date-time-text",
  source: "offsetDateTime",
  format: "rfc7231",
  clientMode: "wire",
  wire: { kind: "string" },
} satisfies DateTimeTextEncodingDescriptor;

const isoDurationEncoding = {
  kind: "duration-iso8601",
  source: "duration",
  clientMode: "wire",
  wire: { kind: "string" },
} satisfies DurationIso8601EncodingDescriptor;

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

  it.each(["P1.5Y2M", "PT1.5H30M"])(
    "rejects a fractional ISO duration component followed by %s",
    (value) => {
      expect(() => encodeWireValue(value, isoDurationEncoding)).toThrow(
        "Expected an ISO8601 day/time duration",
      );
    },
  );

  it.each(["P1Y2.5M", "PT1H30.5M", "PT1H30M0.5S"])(
    "accepts a fractional rightmost ISO duration component in %s",
    (value) => {
      expect(encodeWireValue(value, isoDurationEncoding)).toBe(value);
    },
  );
});
