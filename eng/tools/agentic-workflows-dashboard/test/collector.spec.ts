/**
 * Tests for collector transformations
 * v5: Imports real functions from utils.ts to ensure tests match production code
 */
import { describe, it, expect } from "vitest";
import {
  determineIsFromFork,
  calculateTimings,
  AUDITABLE_CONCLUSIONS,
  validatePositiveInteger,
} from "../src/utils.js";

describe("determineIsFromFork", () => {
  const repo = "Azure/azure-sdk-for-js";

  it("returns 'unknown' when head_repository is undefined", () => {
    expect(determineIsFromFork(undefined, repo)).toBe("unknown");
  });

  it("returns 'false' when head matches base repo", () => {
    expect(
      determineIsFromFork({ full_name: "Azure/azure-sdk-for-js", fork: false }, repo)
    ).toBe("false");
  });

  it("returns 'true' when head is a fork", () => {
    expect(
      determineIsFromFork({ full_name: "user123/azure-sdk-for-js", fork: true }, repo)
    ).toBe("true");
  });

  it("returns 'true' when head differs even if fork=false", () => {
    // Edge case: head differs but fork flag is false (shouldn't happen normally)
    expect(
      determineIsFromFork({ full_name: "other-org/azure-sdk-for-js", fork: false }, repo)
    ).toBe("true");
  });
});

describe("calculateTimings", () => {
  it("calculates queue time and duration correctly", () => {
    const created = new Date("2024-01-01T10:00:00Z");
    const started = new Date("2024-01-01T10:05:00Z"); // 5 min later
    const completed = new Date("2024-01-01T10:15:00Z"); // 10 min after start

    const { queueTime, duration } = calculateTimings(created, started, completed);

    expect(queueTime).toBe(300); // 5 minutes in seconds
    expect(duration).toBe(600); // 10 minutes in seconds
  });

  it("returns null duration when not completed", () => {
    const created = new Date("2024-01-01T10:00:00Z");
    const started = new Date("2024-01-01T10:05:00Z");

    const { queueTime, duration } = calculateTimings(created, started, null);

    expect(queueTime).toBe(300);
    expect(duration).toBeNull();
  });

  it("returns null for both when not started", () => {
    const created = new Date("2024-01-01T10:00:00Z");

    const { queueTime, duration } = calculateTimings(created, null, null);

    expect(queueTime).toBeNull();
    expect(duration).toBeNull();
  });

  it("handles zero queue time", () => {
    const sameTime = new Date("2024-01-01T10:00:00Z");
    const completed = new Date("2024-01-01T10:10:00Z");

    const { queueTime, duration } = calculateTimings(sameTime, sameTime, completed);

    expect(queueTime).toBe(0);
    expect(duration).toBe(600);
  });
});

describe("AUDITABLE_CONCLUSIONS", () => {
  it("includes success and failure", () => {
    expect(AUDITABLE_CONCLUSIONS.has("success")).toBe(true);
    expect(AUDITABLE_CONCLUSIONS.has("failure")).toBe(true);
  });

  it("includes cancelled and timed_out", () => {
    expect(AUDITABLE_CONCLUSIONS.has("cancelled")).toBe(true);
    expect(AUDITABLE_CONCLUSIONS.has("timed_out")).toBe(true);
  });

  it("includes neutral and action_required", () => {
    expect(AUDITABLE_CONCLUSIONS.has("neutral")).toBe(true);
    expect(AUDITABLE_CONCLUSIONS.has("action_required")).toBe(true);
  });

  it("excludes skipped (no work done)", () => {
    expect(AUDITABLE_CONCLUSIONS.has("skipped")).toBe(false);
  });

  it("excludes in-progress states", () => {
    expect(AUDITABLE_CONCLUSIONS.has("queued")).toBe(false);
    expect(AUDITABLE_CONCLUSIONS.has("in_progress")).toBe(false);
    expect(AUDITABLE_CONCLUSIONS.has("pending")).toBe(false);
  });
});

// ===== v9: Strict numeric validation tests =====
describe("validatePositiveInteger", () => {
  it("accepts valid positive integers", () => {
    expect(validatePositiveInteger("7")).toEqual({ valid: true, value: 7 });
    expect(validatePositiveInteger("100")).toEqual({ valid: true, value: 100 });
    expect(validatePositiveInteger("1")).toEqual({ valid: true, value: 1 });
  });

  it("rejects partial numeric strings like '7abc'", () => {
    // Number("7abc") returns NaN
    expect(validatePositiveInteger("7abc").valid).toBe(false);
    expect(Number.isNaN(validatePositiveInteger("7abc").value)).toBe(true);
    expect(validatePositiveInteger("100x").valid).toBe(false);
  });

  it("rejects negative numbers", () => {
    expect(validatePositiveInteger("-5")).toEqual({ valid: false, value: -5 });
    expect(validatePositiveInteger("-1")).toEqual({ valid: false, value: -1 });
  });

  it("rejects zero", () => {
    expect(validatePositiveInteger("0")).toEqual({ valid: false, value: 0 });
  });

  it("rejects decimal numbers", () => {
    // Number("7.5") returns 7.5, which fails isSafeInteger
    expect(validatePositiveInteger("7.5")).toEqual({ valid: false, value: 7.5 });
    // Note: "1.0" parses as 1 which IS a valid integer - this is acceptable behavior
    expect(validatePositiveInteger("1.0")).toEqual({ valid: true, value: 1 });
    // But actual decimals like 1.5 are rejected
    expect(validatePositiveInteger("1.5")).toEqual({ valid: false, value: 1.5 });
  });

  it("rejects NaN-producing strings", () => {
    expect(validatePositiveInteger("abc").valid).toBe(false);
    expect(Number.isNaN(validatePositiveInteger("abc").value)).toBe(true);
    // Note: Number("") returns 0, not NaN
    expect(validatePositiveInteger("")).toEqual({ valid: false, value: 0 });
    expect(validatePositiveInteger("NaN").valid).toBe(false);
    expect(Number.isNaN(validatePositiveInteger("NaN").value)).toBe(true);
  });

  it("rejects Infinity", () => {
    expect(validatePositiveInteger("Infinity")).toEqual({ valid: false, value: Infinity });
    expect(validatePositiveInteger("-Infinity")).toEqual({ valid: false, value: -Infinity });
  });
});
