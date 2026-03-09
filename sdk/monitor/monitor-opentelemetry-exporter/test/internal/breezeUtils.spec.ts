// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { parseRetryAfterHeader } from "../../src/utils/breezeUtils.js";
import { describe, it, expect, vi, afterEach } from "vitest";

describe("breezeUtils", () => {
  describe("#parseRetryAfterHeader", () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("should return undefined for undefined input", () => {
      expect(parseRetryAfterHeader(undefined)).toBeUndefined();
    });

    it("should return undefined for empty string", () => {
      expect(parseRetryAfterHeader("")).toBeUndefined();
    });

    it("should parse delay-seconds value", () => {
      expect(parseRetryAfterHeader("120")).toBe(120_000);
    });

    it("should parse delay-seconds value of 1", () => {
      expect(parseRetryAfterHeader("1")).toBe(1000);
    });

    it("should return undefined for zero delay-seconds", () => {
      expect(parseRetryAfterHeader("0")).toBeUndefined();
    });

    it("should return undefined for negative delay-seconds", () => {
      expect(parseRetryAfterHeader("-5")).toBeUndefined();
    });

    it("should parse an HTTP-date in the future", () => {
      const futureDate = new Date(Date.now() + 60_000).toUTCString();
      const result = parseRetryAfterHeader(futureDate);
      expect(result).toBeDefined();
      // Should be approximately 60 seconds (allow some tolerance)
      expect(result!).toBeGreaterThan(50_000);
      expect(result!).toBeLessThanOrEqual(61_000);
    });

    it("should return undefined for an HTTP-date in the past", () => {
      const pastDate = new Date(Date.now() - 60_000).toUTCString();
      expect(parseRetryAfterHeader(pastDate)).toBeUndefined();
    });

    it("should return undefined for non-parseable string", () => {
      expect(parseRetryAfterHeader("not-a-number-or-date")).toBeUndefined();
    });
  });
});
