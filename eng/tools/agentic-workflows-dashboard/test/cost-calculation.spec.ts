/**
 * Tests for cost calculation logic
 * v5: Imports real functions from utils.ts to ensure tests match production code
 * v6: Added tests for token validation edge cases and calculateCacheHitRate
 */
import { describe, it, expect } from "vitest";
import {
  MODEL_PRICING,
  calculateModelCost,
  calculateCacheSavings,
  calculateCacheHitRate,
  selectPrimaryModel,
} from "../src/utils.js";

describe("calculateModelCost", () => {
  it("calculates cost for Sonnet with no cache", () => {
    const cost = calculateModelCost(
      "claude-sonnet-4.6",
      1_000_000, // 1M input
      500_000,   // 500K output
      0,         // no cache
      0          // no cache write
    );
    // 1M * $3/M + 500K * $15/M = $3 + $7.50 = $10.50
    expect(cost).toBeCloseTo(10.5, 2);
  });

  it("calculates cost for Sonnet with 50% cache hit", () => {
    const cost = calculateModelCost(
      "claude-sonnet-4.6",
      1_000_000, // 1M input (includes cached)
      500_000,   // 500K output
      500_000,   // 500K from cache
      0          // no cache write
    );
    // Uncached: 500K * $3/M = $1.50
    // Cached: 500K * $0.3/M = $0.15
    // Output: 500K * $15/M = $7.50
    // Total = $9.15
    expect(cost).toBeCloseTo(9.15, 2);
  });

  it("calculates cost for Haiku (cheaper model)", () => {
    const cost = calculateModelCost(
      "claude-haiku-4.5",
      1_000_000, // 1M input
      500_000,   // 500K output
      0,         // no cache
      0          // no cache write
    );
    // 1M * $0.8/M + 500K * $4/M = $0.80 + $2.00 = $2.80
    expect(cost).toBeCloseTo(2.8, 2);
  });

  it("calculates cost for Opus (expensive model)", () => {
    const cost = calculateModelCost(
      "claude-opus-4.7",
      1_000_000, // 1M input
      500_000,   // 500K output
      0,         // no cache
      0          // no cache write
    );
    // 1M * $15/M + 500K * $75/M = $15 + $37.50 = $52.50
    expect(cost).toBeCloseTo(52.5, 2);
  });

  it("uses default pricing for unknown models", () => {
    const cost = calculateModelCost(
      "gpt-5.0",  // unknown model
      1_000_000,
      500_000,
      0,
      0
    );
    // Uses Sonnet pricing by default
    expect(cost).toBeCloseTo(10.5, 2);
  });

  it("handles zero tokens", () => {
    const cost = calculateModelCost("claude-sonnet-4.6", 0, 0, 0, 0);
    expect(cost).toBe(0);
  });

  it("handles 100% cache hit rate", () => {
    const cost = calculateModelCost(
      "claude-sonnet-4.6",
      1_000_000,  // 1M input
      100_000,    // 100K output
      1_000_000,  // All from cache
      0
    );
    // Uncached: 0 * $3/M = $0
    // Cached: 1M * $0.3/M = $0.30
    // Output: 100K * $15/M = $1.50
    // Total = $1.80
    expect(cost).toBeCloseTo(1.8, 2);
  });

  it("handles cache write tokens (currently $0)", () => {
    const cost = calculateModelCost(
      "claude-sonnet-4.6",
      1_000_000,
      500_000,
      0,
      500_000  // cache write tokens
    );
    // Cache write is $0 currently
    expect(cost).toBeCloseTo(10.5, 2);
  });
});

describe("calculateCacheSavings", () => {
  it("calculates savings for Sonnet ($2.7/M saved)", () => {
    const savings = calculateCacheSavings("claude-sonnet-4.6", 1_000_000);
    // Sonnet: savings = input - cachedInput = $3 - $0.3 = $2.7/M
    expect(savings).toBeCloseTo(2.7, 2);
  });

  it("calculates savings for Haiku ($0.72/M saved)", () => {
    const savings = calculateCacheSavings("claude-haiku-4.5", 1_000_000);
    // Haiku: savings = $0.8 - $0.08 = $0.72/M
    expect(savings).toBeCloseTo(0.72, 2);
  });

  it("calculates savings for Opus ($13.5/M saved)", () => {
    const savings = calculateCacheSavings("claude-opus-4.7", 1_000_000);
    // Opus: savings = $15 - $1.5 = $13.5/M
    expect(savings).toBeCloseTo(13.5, 2);
  });

  it("uses default pricing for unknown models", () => {
    const savings = calculateCacheSavings("gpt-5.0", 1_000_000);
    // Uses Sonnet pricing by default: $2.7/M
    expect(savings).toBeCloseTo(2.7, 2);
  });

  it("handles zero cache tokens", () => {
    const savings = calculateCacheSavings("claude-sonnet-4.6", 0);
    expect(savings).toBe(0);
  });
});

describe("selectPrimaryModel", () => {
  it("selects model with most input tokens", () => {
    const byModel = {
      "claude-sonnet-4.6": { input_tokens: 100_000 },
      "claude-haiku-4.5": { input_tokens: 500_000 },
      "claude-opus-4.7": { input_tokens: 50_000 },
    };
    const primary = selectPrimaryModel(byModel);
    expect(primary).toBe("claude-haiku-4.5");
  });

  it("returns one model when tied", () => {
    const byModel = {
      "model-a": { input_tokens: 100_000 },
      "model-b": { input_tokens: 100_000 },
    };
    const primary = selectPrimaryModel(byModel);
    // Returns one of the tied models
    expect(["model-a", "model-b"]).toContain(primary);
  });

  it("returns 'unknown' for empty object", () => {
    const primary = selectPrimaryModel({});
    expect(primary).toBe("unknown");
  });

  it("handles single model", () => {
    const byModel = { "claude-sonnet-4.6": { input_tokens: 100_000 } };
    const primary = selectPrimaryModel(byModel);
    expect(primary).toBe("claude-sonnet-4.6");
  });
});

describe("multi-model cost calculation", () => {
  it("sums costs across multiple models correctly", () => {
    const sonnetCost = calculateModelCost(
      "claude-sonnet-4.6",
      500_000,
      250_000,
      100_000,
      0
    );
    const haikuCost = calculateModelCost(
      "claude-haiku-4.5",
      500_000,
      250_000,
      100_000,
      0
    );
    
    const totalCost = sonnetCost + haikuCost;
    
    // Sonnet: (400K * $3/M) + (100K * $0.3/M) + (250K * $15/M) = $1.20 + $0.03 + $3.75 = $4.98
    // Haiku:  (400K * $0.8/M) + (100K * $0.08/M) + (250K * $4/M) = $0.32 + $0.008 + $1.00 = $1.328
    // Total = $6.308
    expect(totalCost).toBeCloseTo(6.31, 1);
  });
});

describe("cache rate calculation", () => {
  it("calculates cache hit rate correctly", () => {
    const inputTokens = 1_000_000;
    const cacheReadTokens = 300_000;
    
    const cacheRate = inputTokens > 0 
      ? (cacheReadTokens / inputTokens) * 100 
      : 0;
    
    expect(cacheRate).toBe(30);
  });

  it("handles zero input tokens", () => {
    const inputTokens = 0;
    const cacheReadTokens = 0;
    
    const cacheRate = inputTokens > 0 
      ? (cacheReadTokens / inputTokens) * 100 
      : 0;
    
    expect(cacheRate).toBe(0);
  });
});

describe("MODEL_PRICING", () => {
  it("has expected Sonnet models", () => {
    expect(MODEL_PRICING["claude-sonnet-4.6"]).toBeDefined();
    expect(MODEL_PRICING["claude-sonnet-4.5"]).toBeDefined();
    expect(MODEL_PRICING["claude-sonnet-4"]).toBeDefined();
  });

  it("has expected Haiku model", () => {
    expect(MODEL_PRICING["claude-haiku-4.5"]).toBeDefined();
    expect(MODEL_PRICING["claude-haiku-4.5"].input).toBe(0.8);
  });

  it("has expected Opus models", () => {
    expect(MODEL_PRICING["claude-opus-4.5"]).toBeDefined();
    expect(MODEL_PRICING["claude-opus-4.6"]).toBeDefined();
    expect(MODEL_PRICING["claude-opus-4.7"]).toBeDefined();
  });

  it("has default pricing fallback", () => {
    expect(MODEL_PRICING["default"]).toBeDefined();
  });
});

// ===== v6 TOKEN VALIDATION TESTS =====

describe("calculateModelCost - v6 validation", () => {
  it("clamps negative input tokens to zero", () => {
    const cost = calculateModelCost(
      "claude-sonnet-4.6",
      -100_000,  // negative input - should clamp to 0
      100_000,
      0,
      0
    );
    // Only output cost: 100K * $15/M = $1.50
    expect(cost).toBeCloseTo(1.5, 2);
  });

  it("clamps negative output tokens to zero", () => {
    const cost = calculateModelCost(
      "claude-sonnet-4.6",
      100_000,
      -100_000,  // negative output - should clamp to 0
      0,
      0
    );
    // Only input cost: 100K * $3/M = $0.30
    expect(cost).toBeCloseTo(0.3, 2);
  });

  it("clamps cacheRead to input when cacheRead > input", () => {
    const cost = calculateModelCost(
      "claude-sonnet-4.6",
      100_000,    // 100K input
      100_000,    // 100K output
      500_000,    // 500K cache read > input - should clamp to 100K
      0
    );
    // Uncached: 0 (all from cache)
    // Cached: 100K * $0.3/M = $0.03
    // Output: 100K * $15/M = $1.50
    // Total = $1.53
    expect(cost).toBeCloseTo(1.53, 2);
  });

  it("clamps negative cacheRead tokens to zero", () => {
    const cost = calculateModelCost(
      "claude-sonnet-4.6",
      100_000,
      100_000,
      -50_000,   // negative cache read - should clamp to 0
      0
    );
    // Input: 100K * $3/M = $0.30
    // Output: 100K * $15/M = $1.50
    // Total = $1.80
    expect(cost).toBeCloseTo(1.8, 2);
  });

  it("clamps negative cacheWrite tokens to zero", () => {
    const cost = calculateModelCost(
      "claude-sonnet-4.6",
      100_000,
      100_000,
      0,
      -50_000   // negative cache write - should clamp to 0
    );
    // Input: 100K * $3/M = $0.30
    // Output: 100K * $15/M = $1.50
    // Cache write: 0 (clamped, and $0 anyway)
    expect(cost).toBeCloseTo(1.8, 2);
  });

  it("handles all negative inputs gracefully", () => {
    const cost = calculateModelCost(
      "claude-sonnet-4.6",
      -100_000,
      -100_000,
      -50_000,
      -50_000
    );
    // All clamped to 0
    expect(cost).toBe(0);
  });
});

describe("calculateCacheSavings - v6 validation", () => {
  it("clamps negative cache read to zero", () => {
    const savings = calculateCacheSavings("claude-sonnet-4.6", -100_000);
    expect(savings).toBe(0);
  });

  it("handles zero gracefully", () => {
    const savings = calculateCacheSavings("claude-sonnet-4.6", 0);
    expect(savings).toBe(0);
  });
});

describe("calculateCacheHitRate - v6 function", () => {
  it("calculates normal cache hit rate", () => {
    const rate = calculateCacheHitRate(1_000_000, 300_000);
    expect(rate).toBe(30);
  });

  it("returns 0 for zero input tokens", () => {
    const rate = calculateCacheHitRate(0, 0);
    expect(rate).toBe(0);
  });

  it("returns 100 for equal cache and input", () => {
    const rate = calculateCacheHitRate(1_000_000, 1_000_000);
    expect(rate).toBe(100);
  });

  it("clamps cacheRead > input to 100%", () => {
    const rate = calculateCacheHitRate(100_000, 500_000);
    expect(rate).toBe(100);
  });

  it("clamps negative input to zero (returns 0)", () => {
    const rate = calculateCacheHitRate(-100_000, 50_000);
    expect(rate).toBe(0);
  });

  it("clamps negative cacheRead to zero", () => {
    const rate = calculateCacheHitRate(100_000, -50_000);
    expect(rate).toBe(0);
  });

  it("handles both negative inputs", () => {
    const rate = calculateCacheHitRate(-100_000, -50_000);
    expect(rate).toBe(0);
  });
});

// ===== v7 PRODUCTION INTEGRATION TESTS =====

describe("v7: cost and savings consistency", () => {
  it("cacheRead clamping is consistent between cost and savings", () => {
    // When cacheRead > input, both cost and savings should clamp
    const inputTokens = 100_000;
    const cacheReadTokens = 500_000; // > input
    
    // Cost calculation clamps cacheRead to input
    const cost = calculateModelCost(
      "claude-sonnet-4.6",
      inputTokens,
      50_000,  // output
      cacheReadTokens,
      0
    );
    
    // For savings, we need to clamp manually (as done in createAuditRecords)
    const clampedCacheRead = Math.min(cacheReadTokens, inputTokens);
    const savings = calculateCacheSavings("claude-sonnet-4.6", clampedCacheRead);
    
    // Cost should only use cached pricing for 100K tokens (not 500K)
    // Uncached: 0 (all 100K from cache)
    // Cached: 100K * $0.3/M = $0.03
    // Output: 50K * $15/M = $0.75
    // Total = $0.78
    expect(cost).toBeCloseTo(0.78, 2);
    
    // Savings should be for 100K tokens: 100K * $2.7/M = $0.27
    expect(savings).toBeCloseTo(0.27, 2);
  });

  it("validateAndClampTokens produces consistent results", () => {
    // Simulate what happens in createAuditRecords for bad data
    const badInput = -100;
    const badCacheRead = 500;
    
    // After clamping as in production code
    const validInput = Math.max(0, badInput); // 0
    const validCacheRead = Math.max(0, Math.min(badCacheRead, validInput)); // 0
    
    const rate = calculateCacheHitRate(badInput, badCacheRead);
    expect(rate).toBe(0);
    
    const cost = calculateModelCost("claude-sonnet-4.6", badInput, 100, badCacheRead, 0);
    // Output only: 100 * $15/M = $0.0015
    expect(cost).toBeCloseTo(0.0015, 4);
  });
});

describe("v7: multi-model aggregation patterns", () => {
  it("run-level cost is sum of model costs", () => {
    const sonnetCost = calculateModelCost("claude-sonnet-4.6", 500_000, 100_000, 200_000, 0);
    const haikuCost = calculateModelCost("claude-haiku-4.5", 300_000, 80_000, 100_000, 0);
    
    // This is how we should aggregate in KQL
    const runTotalCost = sonnetCost + haikuCost;
    
    // Sonnet: (300K * $3/M) + (200K * $0.3/M) + (100K * $15/M) = $0.90 + $0.06 + $1.50 = $2.46
    // Haiku:  (200K * $0.8/M) + (100K * $0.08/M) + (80K * $4/M) = $0.16 + $0.008 + $0.32 = $0.488
    // Total = $2.948
    expect(runTotalCost).toBeCloseTo(2.95, 1);
  });

  it("run-level cache rate is weighted average", () => {
    // Two models with different cache rates
    const model1Input = 500_000;
    const model1Cache = 200_000;  // 40%
    const model2Input = 300_000;
    const model2Cache = 150_000;  // 50%
    
    // Run-level aggregation (as done in v7 KQL)
    const runInput = model1Input + model2Input;  // 800K
    const runCache = model1Cache + model2Cache;  // 350K
    const runCacheRate = (runCache / runInput) * 100;  // 43.75%
    
    expect(runCacheRate).toBeCloseTo(43.75, 2);
    
    // Using calculateCacheHitRate gives same result
    expect(calculateCacheHitRate(runInput, runCache)).toBeCloseTo(43.75, 2);
  });
});
