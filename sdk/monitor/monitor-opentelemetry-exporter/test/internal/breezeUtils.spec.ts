// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MAX_RETRY_AFTER_MS, parseRetryAfterHeader } from "../../src/utils/breezeUtils.js";
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

    it("should parse delay-seconds with leading zeros", () => {
      expect(parseRetryAfterHeader("00120")).toBe(120_000);
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

    // Node's setTimeout silently clamps any delay above 2^31-1 ms (~24.85 days) to 1 ms
    // and emits a TimeoutOverflowWarning. A server-controlled Retry-After must never be
    // able to reach that ceiling, so parseRetryAfterHeader caps the result.
    const NODE_SET_TIMEOUT_MAX_MS = 2 ** 31 - 1;

    it("should clamp a delay-seconds value above the cap to MAX_RETRY_AFTER_MS", () => {
      // 9999999999 s -> 9999999999000 ms, far above Node's setTimeout ceiling
      expect(parseRetryAfterHeader("9999999999")).toBe(MAX_RETRY_AFTER_MS);
    });

    it("should clamp the max-safe-int seconds value (~24.8 day stall) to MAX_RETRY_AFTER_MS", () => {
      // 2147483 s -> ~24.8 days, just under Node's ceiling; without a cap this parks retries for weeks
      expect(parseRetryAfterHeader("2147483")).toBe(MAX_RETRY_AFTER_MS);
    });

    it("should keep a clamped result safely below Node's setTimeout ceiling", () => {
      const result = parseRetryAfterHeader("9999999999");
      expect(result!).toBeLessThan(NODE_SET_TIMEOUT_MAX_MS);
    });

    it("should not clamp a delay-seconds value below the cap", () => {
      // 23 hours, just under the 24h cap
      expect(parseRetryAfterHeader("82800")).toBe(82_800_000);
    });

    it("should return exactly the cap for a delay-seconds value at the boundary", () => {
      // 86400 s === 24h === MAX_RETRY_AFTER_MS
      expect(parseRetryAfterHeader("86400")).toBe(MAX_RETRY_AFTER_MS);
    });

    it("should clamp a far-future HTTP-date to MAX_RETRY_AFTER_MS", () => {
      const farFutureDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
      expect(parseRetryAfterHeader(farFutureDate)).toBe(MAX_RETRY_AFTER_MS);
    });
  });
});
