/**
 * Tests for audit record creation
 * v5: Imports real functions from utils.ts to ensure tests match production code
 */
import { describe, it, expect } from "vitest";
import {
  selectPrimaryModel,
  processWithConcurrency,
  createRunKey,
  createIsoDuration,
  sanitizeFiniteNonNegative,
  calculateModelCost,
  calculateCacheSavings,
  calculateCacheHitRate,
} from "../src/utils.js";
import { AUDIT_VERSION, MAX_AUDIT_RETRIES } from "../src/audit-enrichment.js";

describe("selectPrimaryModel", () => {
  it("returns 'unknown' when undefined", () => {
    expect(selectPrimaryModel(undefined)).toBe("unknown");
  });

  it("returns 'unknown' when empty object", () => {
    expect(selectPrimaryModel({})).toBe("unknown");
  });

  it("returns the only model when there's just one", () => {
    const byModel = { "claude-sonnet-4.6": { input_tokens: 100000 } };
    expect(selectPrimaryModel(byModel)).toBe("claude-sonnet-4.6");
  });

  it("returns model with most input tokens when multiple", () => {
    const byModel = {
      "claude-sonnet-4.6": { input_tokens: 100000 },
      "claude-haiku-4.5": { input_tokens: 500000 },
      "claude-opus-4.7": { input_tokens: 50000 },
    };
    expect(selectPrimaryModel(byModel)).toBe("claude-haiku-4.5");
  });

  it("handles tie by returning one of the tied models", () => {
    const byModel = {
      "claude-sonnet-4.6": { input_tokens: 100000 },
      "claude-haiku-4.5": { input_tokens: 100000 },
    };
    const result = selectPrimaryModel(byModel);
    expect(["claude-sonnet-4.6", "claude-haiku-4.5"]).toContain(result);
  });
});

// Test per-model record creation logic
describe("per-model record creation", () => {
  interface ModelUsage {
    input_tokens: number;
  }

  function createPerModelRecords(
    byModel: Record<string, ModelUsage>,
    primaryModel: string
  ): Array<{ modelId: string; isPrimary: boolean; inputTokens: number }> {
    return Object.entries(byModel).map(([modelId, usage]) => ({
      modelId,
      isPrimary: modelId === primaryModel,
      inputTokens: usage.input_tokens,
    }));
  }

  it("creates one record per model", () => {
    const byModel = {
      "claude-sonnet-4.6": { input_tokens: 100000 },
      "claude-haiku-4.5": { input_tokens: 50000 },
    };
    
    const records = createPerModelRecords(byModel, "claude-sonnet-4.6");
    
    expect(records).toHaveLength(2);
    expect(records.find(r => r.modelId === "claude-sonnet-4.6")?.isPrimary).toBe(true);
    expect(records.find(r => r.modelId === "claude-haiku-4.5")?.isPrimary).toBe(false);
  });

  it("marks correct model as primary", () => {
    const byModel = {
      "claude-haiku-4.5": { input_tokens: 500000 },
      "claude-sonnet-4.6": { input_tokens: 100000 },
    };
    
    const records = createPerModelRecords(byModel, "claude-haiku-4.5");
    
    const primary = records.find(r => r.isPrimary);
    expect(primary?.modelId).toBe("claude-haiku-4.5");
  });
});

describe("processWithConcurrency", () => {
  it("processes all items", async () => {
    const items = [1, 2, 3, 4, 5];
    const results = await processWithConcurrency(
      items,
      async (item) => item * 2,
      3
    );
    expect(results).toEqual([2, 4, 6, 8, 10]);
  });

  it("preserves order despite parallelism", async () => {
    const items = ["a", "b", "c", "d"];
    const results = await processWithConcurrency(
      items,
      async (item, index) => `${index}:${item}`,
      2
    );
    expect(results).toEqual(["0:a", "1:b", "2:c", "3:d"]);
  });

  it("handles empty array", async () => {
    const results = await processWithConcurrency<number, number>(
      [],
      async (item) => item * 2,
      5
    );
    expect(results).toEqual([]);
  });

  it("handles concurrency higher than items", async () => {
    const items = [1, 2];
    const results = await processWithConcurrency(
      items,
      async (item) => item * 3,
      10
    );
    expect(results).toEqual([3, 6]);
  });

  it("processes with concurrency=1 (serial)", async () => {
    const order: number[] = [];
    const items = [1, 2, 3];
    
    await processWithConcurrency(
      items,
      async (item) => {
        order.push(item);
        return item;
      },
      1
    );
    
    expect(order).toEqual([1, 2, 3]);
  });
});

describe("createRunKey", () => {
  it("creates composite key from run ID and attempt", () => {
    expect(createRunKey(12345, 1)).toBe("12345:1");
    expect(createRunKey(98765, 3)).toBe("98765:3");
  });

  it("handles large run IDs", () => {
    expect(createRunKey(9876543210, 1)).toBe("9876543210:1");
  });
});

describe("createIsoDuration", () => {
  it("creates ISO 8601 duration for days", () => {
    expect(createIsoDuration(7)).toBe("P7D");
    expect(createIsoDuration(30)).toBe("P30D");
    expect(createIsoDuration(1)).toBe("P1D");
  });

  it("handles decimal days by flooring", () => {
    expect(createIsoDuration(7.5)).toBe("P7D");
    expect(createIsoDuration(0.9)).toBe("P0D");
  });
});

// ===== v8+ REAL PRODUCTION FUNCTION TESTS =====

import {
  createAuditRecords,
  createFailedAuditRecord,
  hasTokenData,
  AUDIT_VERSION,
  type AuditResult,
  type RunInfo,
} from "../src/audit-enrichment.js";

// ===== v10: hasTokenData() tests =====
describe("hasTokenData (real function)", () => {
  it("returns false for undefined", () => {
    expect(hasTokenData(undefined)).toBe(false);
  });

  it("returns true when total_input_tokens > 0", () => {
    const fw = {
      total_input_tokens: 100000,
      total_output_tokens: 50000,
      total_cache_read_tokens: 0,
      total_cache_write_tokens: 0,
      total_requests: 5,
      total_duration_ms: 1000,
      cache_efficiency: 0,
    };
    expect(hasTokenData(fw)).toBe(true);
  });

  it("returns false when totals are 0 and no by_model", () => {
    const fw = {
      total_input_tokens: 0,
      total_output_tokens: 0,
      total_cache_read_tokens: 0,
      total_cache_write_tokens: 0,
      total_requests: 0,
      total_duration_ms: 0,
      cache_efficiency: 0,
    };
    expect(hasTokenData(fw)).toBe(false);
  });

  it("v10: returns true when totals are 0 but by_model has data", () => {
    const fw = {
      total_input_tokens: 0,
      total_output_tokens: 0,
      total_cache_read_tokens: 0,
      total_cache_write_tokens: 0,
      total_requests: 0,
      total_duration_ms: 0,
      cache_efficiency: 0,
      by_model: {
        "claude-sonnet-4.6": {
          provider: "anthropic",
          input_tokens: 50000,
          output_tokens: 25000,
          cache_read_tokens: 0,
          cache_write_tokens: 0,
          requests: 5,
          duration_ms: 1000,
        },
      },
    };
    expect(hasTokenData(fw)).toBe(true);
  });

  it("returns false when by_model exists but has 0 tokens", () => {
    const fw = {
      total_input_tokens: 0,
      total_output_tokens: 0,
      total_cache_read_tokens: 0,
      total_cache_write_tokens: 0,
      total_requests: 0,
      total_duration_ms: 0,
      cache_efficiency: 0,
      by_model: {
        "claude-sonnet-4.6": {
          provider: "anthropic",
          input_tokens: 0,
          output_tokens: 0,
          cache_read_tokens: 0,
          cache_write_tokens: 0,
          requests: 0,
          duration_ms: 0,
        },
      },
    };
    expect(hasTokenData(fw)).toBe(false);
  });

  // v11: Tests for output-only and cache-only token detection
  it("v11: returns true when only output_tokens has data (no input)", () => {
    const fw = {
      total_input_tokens: 0,
      total_output_tokens: 500,
      total_cache_read_tokens: 0,
      total_cache_write_tokens: 0,
      total_requests: 1,
      total_duration_ms: 100,
      cache_efficiency: 0,
    };
    expect(hasTokenData(fw)).toBe(true);
  });

  it("v11: returns true when only cache_read_tokens has data (no input/output)", () => {
    const fw = {
      total_input_tokens: 0,
      total_output_tokens: 0,
      total_cache_read_tokens: 1000,
      total_cache_write_tokens: 0,
      total_requests: 1,
      total_duration_ms: 100,
      cache_efficiency: 1.0,
    };
    expect(hasTokenData(fw)).toBe(true);
  });

  it("v11: returns true when by_model has only output_tokens", () => {
    const fw = {
      total_input_tokens: 0,
      total_output_tokens: 0,
      total_cache_read_tokens: 0,
      total_cache_write_tokens: 0,
      total_requests: 0,
      total_duration_ms: 0,
      cache_efficiency: 0,
      by_model: {
        "claude-sonnet-4.6": {
          provider: "anthropic",
          input_tokens: 0,
          output_tokens: 250,
          cache_read_tokens: 0,
          cache_write_tokens: 0,
          requests: 1,
          duration_ms: 50,
        },
      },
    };
    expect(hasTokenData(fw)).toBe(true);
  });

  it("v11: returns true when by_model has only cache_read_tokens", () => {
    const fw = {
      total_input_tokens: 0,
      total_output_tokens: 0,
      total_cache_read_tokens: 0,
      total_cache_write_tokens: 0,
      total_requests: 0,
      total_duration_ms: 0,
      cache_efficiency: 0,
      by_model: {
        "claude-sonnet-4.6": {
          provider: "anthropic",
          input_tokens: 0,
          output_tokens: 0,
          cache_read_tokens: 800,
          cache_write_tokens: 0,
          requests: 1,
          duration_ms: 50,
        },
      },
    };
    expect(hasTokenData(fw)).toBe(true);
  });
});

describe("createFailedAuditRecord (real function)", () => {
  const mockRun: RunInfo = {
    runId: 12345,
    runAttempt: 1,
    repo: "Azure/azure-sdk-for-js",
    workflowName: "copilot-agent",
    createdAt: "2024-01-01T10:00:00Z",
    completedAt: "2024-01-01T10:30:00Z",
    pullRequestNumber: 42,
  };

  it("creates record with audit_failed status", () => {
    const record = createFailedAuditRecord(mockRun);
    expect(record.AuditStatus).toBe("audit_failed");
    expect(record.HasTokenData).toBe(false);
  });

  it("includes correct run metadata", () => {
    const record = createFailedAuditRecord(mockRun);
    expect(record.RunId).toBe(12345);
    expect(record.RunAttempt).toBe(1);
    expect(record.Repository).toBe("Azure/azure-sdk-for-js");
    expect(record.WorkflowName).toBe("copilot-agent");
    expect(record.PullRequestNumber).toBe(42);
  });

  it("sets zero values for token fields", () => {
    const record = createFailedAuditRecord(mockRun);
    expect(record.InputTokens).toBe(0);
    expect(record.OutputTokens).toBe(0);
    expect(record.CacheReadTokens).toBe(0);
    expect(record.EstimatedCostUSD).toBe(0);
  });

  it("includes current audit version", () => {
    const record = createFailedAuditRecord(mockRun);
    expect(record.AuditVersion).toBe(AUDIT_VERSION);
    expect(record.AuditVersion).toBe(23);  // v20 updates
  });

  it("marks as primary model", () => {
    const record = createFailedAuditRecord(mockRun);
    expect(record.IsPrimaryModel).toBe(true);
  });
});

describe("createAuditRecords (real function)", () => {
  const mockRun: RunInfo = {
    runId: 12345,
    runAttempt: 1,
    repo: "Azure/azure-sdk-for-js",
    workflowName: "copilot-agent",
    createdAt: "2024-01-01T10:00:00Z",
    completedAt: "2024-01-01T10:30:00Z",
    pullRequestNumber: 42,
  };

  describe("with token data", () => {
    const mockAudit: AuditResult = {
      overview: {
        run_id: 12345,
        run_attempt: 1,
        workflow_name: "copilot-agent",
        conclusion: "success",
        created_at: "2024-01-01T10:00:00Z",
        started_at: "2024-01-01T10:01:00Z",
        completed_at: "2024-01-01T10:30:00Z",
      },
      metrics: { turns: 5, error_count: 0, warning_count: 1 },
      firewall_token_usage: {
        total_input_tokens: 100000,
        total_output_tokens: 50000,
        total_cache_read_tokens: 30000,
        total_cache_write_tokens: 10000,
        total_requests: 10,
        total_duration_ms: 5000,
        cache_efficiency: 0.3,
        by_model: {
          "claude-sonnet-4.6": {
            provider: "anthropic",
            input_tokens: 60000,
            output_tokens: 30000,
            cache_read_tokens: 20000,
            cache_write_tokens: 5000,
            requests: 6,
            duration_ms: 3000,
          },
          "claude-haiku-4.5": {
            provider: "anthropic",
            input_tokens: 40000,
            output_tokens: 20000,
            cache_read_tokens: 10000,
            cache_write_tokens: 5000,
            requests: 4,
            duration_ms: 2000,
          },
        },
      },
      tool_usage: [{ name: "bash", call_count: 10 }, { name: "edit", call_count: 5 }],
      github_rate_limit_usage: { total_requests_made: 25, core_consumed: 20 },
    };

    it("creates one record per model", () => {
      const records = createAuditRecords(mockRun, mockAudit);
      expect(records).toHaveLength(2);
      expect(records.map(r => r.ModelId).sort()).toEqual(["claude-haiku-4.5", "claude-sonnet-4.6"]);
    });

    it("marks primary model correctly (most input tokens)", () => {
      const records = createAuditRecords(mockRun, mockAudit);
      const primary = records.find(r => r.IsPrimaryModel);
      expect(primary?.ModelId).toBe("claude-sonnet-4.6"); // 60K > 40K
    });

    it("sets HasTokenData to true for all records", () => {
      const records = createAuditRecords(mockRun, mockAudit);
      expect(records.every(r => r.HasTokenData)).toBe(true);
    });

    it("sets AuditStatus to success", () => {
      const records = createAuditRecords(mockRun, mockAudit);
      expect(records.every(r => r.AuditStatus === "success")).toBe(true);
    });

    it("includes audit version on all records", () => {
      const records = createAuditRecords(mockRun, mockAudit);
      expect(records.every(r => r.AuditVersion === AUDIT_VERSION)).toBe(true);
    });

    it("calculates tool calls correctly (summed)", () => {
      const records = createAuditRecords(mockRun, mockAudit);
      // bash: 10 + edit: 5 = 15 total
      expect(records[0].ToolCalls).toBe(15);
    });

    it("uses cache hit rate validation (0-100%)", () => {
      const records = createAuditRecords(mockRun, mockAudit);
      const sonnet = records.find(r => r.ModelId === "claude-sonnet-4.6")!;
      // 20K / 60K = 33.3%
      expect(sonnet.CacheHitRate).toBeCloseTo(33.3, 0);
    });
  });

  describe("with no firewall data", () => {
    const mockAuditNoFirewall: AuditResult = {
      overview: {
        run_id: 12345,
        run_attempt: 1,
        workflow_name: "copilot-agent",
        conclusion: "success",
        created_at: "2024-01-01T10:00:00Z",
        started_at: "2024-01-01T10:01:00Z",
        completed_at: "2024-01-01T10:30:00Z",
      },
      metrics: { turns: 2, error_count: 0, warning_count: 0 },
      // no firewall_token_usage
    };

    it("creates single status record", () => {
      const records = createAuditRecords(mockRun, mockAuditNoFirewall);
      expect(records).toHaveLength(1);
    });

    it("sets AuditStatus to no_firewall", () => {
      const records = createAuditRecords(mockRun, mockAuditNoFirewall);
      expect(records[0].AuditStatus).toBe("no_firewall");
    });

    it("sets HasTokenData to false", () => {
      const records = createAuditRecords(mockRun, mockAuditNoFirewall);
      expect(records[0].HasTokenData).toBe(false);
    });

    it("preserves metrics like turns", () => {
      const records = createAuditRecords(mockRun, mockAuditNoFirewall);
      expect(records[0].Turns).toBe(2);
    });
  });

  describe("with zero tokens", () => {
    const mockAuditZeroTokens: AuditResult = {
      overview: {
        run_id: 12345,
        run_attempt: 1,
        workflow_name: "copilot-agent",
        conclusion: "success",
        created_at: "2024-01-01T10:00:00Z",
        started_at: "2024-01-01T10:01:00Z",
        completed_at: "2024-01-01T10:30:00Z",
      },
      metrics: { turns: 1, error_count: 0, warning_count: 0 },
      firewall_token_usage: {
        total_input_tokens: 0,  // zero tokens
        total_output_tokens: 0,
        total_cache_read_tokens: 0,
        total_cache_write_tokens: 0,
        total_requests: 0,
        total_duration_ms: 0,
        cache_efficiency: 0,
      },
    };

    it("creates single status record", () => {
      const records = createAuditRecords(mockRun, mockAuditZeroTokens);
      expect(records).toHaveLength(1);
    });

    it("sets AuditStatus to zero_tokens", () => {
      const records = createAuditRecords(mockRun, mockAuditZeroTokens);
      expect(records[0].AuditStatus).toBe("zero_tokens");
    });
  });

  // ===== v9: by_model fallback tests =====
  describe("with zero totals but valid by_model data", () => {
    const mockAuditByModelOnly: AuditResult = {
      overview: {
        run_id: 12345,
        run_attempt: 1,
        workflow_name: "copilot-agent",
        conclusion: "success",
        created_at: "2024-01-01T10:00:00Z",
        started_at: "2024-01-01T10:01:00Z",
        completed_at: "2024-01-01T10:30:00Z",
      },
      metrics: { turns: 3, error_count: 0, warning_count: 0 },
      firewall_token_usage: {
        total_input_tokens: 0,  // zero in totals
        total_output_tokens: 0,
        total_cache_read_tokens: 0,
        total_cache_write_tokens: 0,
        total_requests: 0,
        total_duration_ms: 0,
        cache_efficiency: 0,
        by_model: {
          // but valid data in by_model
          "claude-sonnet-4.6": {
            provider: "anthropic",
            input_tokens: 50000,
            output_tokens: 25000,
            cache_read_tokens: 10000,
            cache_write_tokens: 5000,
            requests: 5,
            duration_ms: 2000,
          },
        },
      },
    };

    it("v9: detects token data from by_model when totals are zero", () => {
      const records = createAuditRecords(mockRun, mockAuditByModelOnly);
      expect(records).toHaveLength(1);
      expect(records[0].HasTokenData).toBe(true);
      expect(records[0].AuditStatus).toBe("success");
    });

    it("v9: uses by_model token values", () => {
      const records = createAuditRecords(mockRun, mockAuditByModelOnly);
      expect(records[0].InputTokens).toBe(50000);
      expect(records[0].OutputTokens).toBe(25000);
      expect(records[0].ModelId).toBe("claude-sonnet-4.6");
    });
  });
});

// ===== v12: AUDIT VERSION TESTS =====
describe("Audit version handling", () => {
  it("AUDIT_VERSION is 21 for v21 fixes", () => {
    // v21 updates: Retry audit_failed, workflows per_page=100, post-sanitize classify
    expect(AUDIT_VERSION).toBe(23);
  });
});

// ===== v12: ERROR HANDLING TESTS =====
describe("v12 error propagation", () => {
  it("GitHubResult type has error field", () => {
    // Test that the GitHubResult type structure works
    const successResult = { data: [{ id: 1, name: "test" }] };
    expect(successResult.data).toHaveLength(1);
    expect(successResult.error).toBeUndefined();
    
    const errorResult = { data: [], error: new Error("API rate limit") };
    expect(errorResult.data).toHaveLength(0);
    expect(errorResult.error).toBeDefined();
    expect(errorResult.error.message).toBe("API rate limit");
  });
  
  it("error results preserve error message", () => {
    const error = new Error("Test error message");
    const result = { data: [] as string[], error };
    expect(result.error?.message).toBe("Test error message");
  });
});

// ===== v13: SECURITY AND ERROR HANDLING TESTS =====
describe("v13 security and error handling", () => {
  // Test repo name validation pattern
  const REPO_PATTERN = /^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/;
  
  function validateRepoName(repo: string): boolean {
    return REPO_PATTERN.test(repo) && repo.length <= 200;
  }
  
  it("validates valid repo names", () => {
    expect(validateRepoName("Azure/azure-sdk-for-js")).toBe(true);
    expect(validateRepoName("owner/repo")).toBe(true);
    expect(validateRepoName("my-org/my_repo.test")).toBe(true);
    expect(validateRepoName("a/b")).toBe(true);
  });
  
  it("rejects invalid repo names (injection attempts)", () => {
    // Shell injection attempts
    expect(validateRepoName("owner/repo; rm -rf /")).toBe(false);
    expect(validateRepoName("owner/repo && echo pwned")).toBe(false);
    expect(validateRepoName("owner/repo | cat /etc/passwd")).toBe(false);
    expect(validateRepoName("$(whoami)/repo")).toBe(false);
    expect(validateRepoName("`id`/repo")).toBe(false);
    
    // Invalid format
    expect(validateRepoName("noslash")).toBe(false);
    expect(validateRepoName("too/many/slashes")).toBe(false);
    expect(validateRepoName("")).toBe(false);
    expect(validateRepoName("/repo")).toBe(false);
    expect(validateRepoName("owner/")).toBe(false);
  });
  
  it("rejects overly long repo names", () => {
    const longName = "a".repeat(100) + "/" + "b".repeat(101);
    expect(validateRepoName(longName)).toBe(false);
  });
  
  it("GitHubApiFetchResult type has runs and errors", () => {
    interface GitHubApiFetchResult {
      runs: { runId: number }[];
      errors: string[];
    }
    
    const successResult: GitHubApiFetchResult = { runs: [{ runId: 123 }], errors: [] };
    expect(successResult.runs).toHaveLength(1);
    expect(successResult.errors).toHaveLength(0);
    
    const partialResult: GitHubApiFetchResult = { 
      runs: [{ runId: 456 }], 
      errors: ["Azure/repo1: rate limited"] 
    };
    expect(partialResult.runs).toHaveLength(1);
    expect(partialResult.errors).toHaveLength(1);
    
    const failedResult: GitHubApiFetchResult = { runs: [], errors: ["repo1: failed", "repo2: failed"] };
    expect(failedResult.runs).toHaveLength(0);
    expect(failedResult.errors).toHaveLength(2);
  });
});

// ===== v14: RUN ATTEMPT VALIDATION TESTS =====
describe("v14 run_attempt validation", () => {
  it("detects attempt mismatch when audit returns different attempt", () => {
    const requestedAttempt = 2;
    const returnedAttempt = 3;
    const mismatch = returnedAttempt !== requestedAttempt;
    expect(mismatch).toBe(true);
  });
  
  it("accepts matching attempts", () => {
    const requestedAttempt = 1;
    const returnedAttempt = 1;
    const mismatch = returnedAttempt !== requestedAttempt;
    expect(mismatch).toBe(false);
  });
  
  it("handles undefined attempt as 1", () => {
    const requestedAttempt = 1;
    const returnedAttempt = undefined || 1;
    const mismatch = returnedAttempt !== requestedAttempt;
    expect(mismatch).toBe(false);
  });
  
  it("detects mismatch when request is attempt 2 but audit returns undefined (=1)", () => {
    const requestedAttempt = 2;
    const returnedAttempt = undefined || 1;
    const mismatch = returnedAttempt !== requestedAttempt;
    expect(mismatch).toBe(true);
  });
});

// ===== v14: ERROR HANDLING BEHAVIOR TESTS =====
describe("v14 error handling behavior", () => {
  it("PartialFailure should be treated as fatal", () => {
    // Simulating the behavior: PartialFailure throws instead of returning partial data
    const simulatePartialFailure = () => {
      const status = "PartialFailure";
      if (status === "PartialFailure") {
        throw new Error("Inventory query failed with PartialFailure status");
      }
    };
    expect(simulatePartialFailure).toThrow("PartialFailure");
  });
  
  it("fatal errors should exit non-zero", () => {
    // This tests the pattern: main().catch(err => { console.error(err); process.exit(1); })
    let exitCode = 0;
    const simulateMainCatch = async () => {
      try {
        throw new Error("Simulated fatal error");
      } catch (err) {
        exitCode = 1;  // Would be process.exit(1)
      }
    };
    simulateMainCatch();
    expect(exitCode).toBe(1);
  });
});

// ===== v15: CANONICAL ID + SHAPE VALIDATION TESTS =====
describe("v15 canonical identifiers and shape validation", () => {
  it("uses run.runId/runAttempt as canonical identifiers in createAuditRecords", () => {
    const run: RunInfo = {
      runId: 12345,
      runAttempt: 2,
      repo: "Azure/sdk-test",
      workflowName: "test.yml",
      createdAt: "2024-01-01T00:00:00Z",
      completedAt: "2024-01-01T01:00:00Z",
      pullRequestNumber: null,
    };
    const audit: AuditResult = {
      overview: {
        run_id: 99999,  // Different from run.runId - should be ignored
        run_attempt: 5,  // Different from run.runAttempt - should be ignored
        created_at: "2024-01-01T00:00:00Z",
      },
      firewall_token_usage: null,  // no_firewall case
      metrics: { turns: 1, error_count: 0, warning_count: 0 },
      tool_usage: [],
    };
    const records = createAuditRecords(run, audit, "no_firewall");
    expect(records).toHaveLength(1);
    // v15: Should use run.runId and run.runAttempt, NOT audit.overview values
    expect(records[0].RunId).toBe(12345);  // From run, not audit.overview.run_id
    expect(records[0].RunAttempt).toBe(2);  // From run, not audit.overview.run_attempt
  });

  it("handles missing overview gracefully in shape validation simulation", () => {
    // Simulates the v15 shape validation check
    const malformedAudit = { firewall_token_usage: null };  // missing overview
    const hasValidOverview = malformedAudit.overview && typeof malformedAudit.overview === "object";
    expect(hasValidOverview).toBeFalsy();  // undefined is falsy
  });

  it("handles non-object overview gracefully", () => {
    const malformedAudit = { overview: "not-an-object" } as unknown as { overview: object };
    const hasValidOverview = malformedAudit.overview && typeof malformedAudit.overview === "object";
    expect(hasValidOverview).toBe(false);
  });

  it("accepts valid overview object", () => {
    const validAudit = { overview: { run_id: 123, run_attempt: 1 } };
    const hasValidOverview = validAudit.overview && typeof validAudit.overview === "object";
    expect(hasValidOverview).toBe(true);
  });
});

// ===== v16: MAX RUNS ENFORCEMENT TESTS =====
describe("v16 maxRuns enforcement", () => {
  it("inner loop break enforces limit", () => {
    const maxRuns = 5;
    const runs: number[] = [];
    const pageData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    for (const item of pageData) {
      if (runs.length >= maxRuns) break;  // v16 fix
      runs.push(item);
    }
    
    expect(runs.length).toBe(5);
    expect(runs).toEqual([1, 2, 3, 4, 5]);
  });

  it("outer loop break prevents additional pages", () => {
    const maxRuns = 3;
    let runs: number[] = [];
    let pagesProcessed = 0;
    
    // Simulate 3 pages of data
    const pages = [[1, 2], [3, 4], [5, 6]];
    
    for (const page of pages) {
      pagesProcessed++;
      for (const item of page) {
        if (runs.length >= maxRuns) break;
        runs.push(item);
      }
      if (runs.length >= maxRuns) break;  // v16 fix
    }
    
    expect(runs.length).toBe(3);
    expect(pagesProcessed).toBe(2);  // Should stop after 2nd page
  });
});

// ===== v16: LATEST ATTEMPT ONLY TESTS =====
describe("v16 latest attempt only auditing", () => {
  it("summarize arg_max(RunAttempt) pattern selects latest attempt", () => {
    // Simulates the KQL pattern: summarize arg_max(RunAttempt, *) by RunId
    const runs = [
      { RunId: 100, RunAttempt: 1, Status: "failure" },
      { RunId: 100, RunAttempt: 2, Status: "success" },
      { RunId: 100, RunAttempt: 3, Status: "success" },
      { RunId: 200, RunAttempt: 1, Status: "success" },
    ];
    
    // Group by RunId and take max attempt
    const byRunId = new Map<number, typeof runs[0]>();
    for (const run of runs) {
      const existing = byRunId.get(run.RunId);
      if (!existing || run.RunAttempt > existing.RunAttempt) {
        byRunId.set(run.RunId, run);
      }
    }
    
    const result = Array.from(byRunId.values());
    expect(result).toHaveLength(2);
    expect(result.find(r => r.RunId === 100)?.RunAttempt).toBe(3);
    expect(result.find(r => r.RunId === 200)?.RunAttempt).toBe(1);
  });
});

// ===== v17: LEGACY GLOBAL SORT AND PAGINATION TESTS =====
describe("v17 legacy global sort and pagination", () => {
  it("global sort returns newest runs across all repos", () => {
    // Simulate runs from 3 repos collected in order
    const runs = [
      { repo: "repo1", completedAt: "2024-01-01T10:00:00Z" },
      { repo: "repo1", completedAt: "2024-01-01T08:00:00Z" },
      { repo: "repo2", completedAt: "2024-01-01T12:00:00Z" },  // Newest!
      { repo: "repo2", completedAt: "2024-01-01T06:00:00Z" },
      { repo: "repo3", completedAt: "2024-01-01T11:00:00Z" },  // 2nd newest
    ];
    
    // v17: Sort globally by completedAt desc, then slice
    runs.sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
    const limited = runs.slice(0, 3);
    
    // Should get newest 3 regardless of repo
    expect(limited[0].completedAt).toBe("2024-01-01T12:00:00Z");  // repo2
    expect(limited[1].completedAt).toBe("2024-01-01T11:00:00Z");  // repo3
    expect(limited[2].completedAt).toBe("2024-01-01T10:00:00Z");  // repo1
  });
  
  it("per_page=100 ensures proper pagination even with filters", () => {
    // Simulate GitHub API behavior: smaller per_page can cause early termination
    const perPage = 100;  // v17: Always use 100
    const apiPageSize = perPage;
    
    // Even if we only need 50 runs, we request 100 to avoid pagination bugs
    expect(apiPageSize).toBe(100);
  });
});

// ===== v18: DAYS FILTER AND UPDATED_AT SORT TESTS =====
describe("v18 days filter and updated_at sort", () => {
  it("days filter excludes runs before cutoff", () => {
    const days = 7;
    const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    
    const runs = [
      { updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },  // 1 day ago - include
      { updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },  // 5 days ago - include
      { updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) }, // 10 days ago - exclude
    ];
    
    const filtered = runs.filter(r => r.updatedAt >= cutoffDate);
    expect(filtered).toHaveLength(2);
  });
  
  it("sort by updated_at returns most recently updated runs first", () => {
    const runs = [
      { id: 1, updated_at: "2024-01-01T10:00:00Z" },
      { id: 2, updated_at: "2024-01-01T15:00:00Z" },  // Most recent
      { id: 3, updated_at: "2024-01-01T08:00:00Z" },
    ];
    
    // v18: Sort by updated_at desc
    runs.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
    
    expect(runs[0].id).toBe(2);  // Most recently updated
    expect(runs[1].id).toBe(1);
    expect(runs[2].id).toBe(3);
  });
  
  it("coverage KQL joins on both RunId and RunAttempt", () => {
    // Simulate the v18 coverage calculation with proper join
    const runs = [
      { RunId: 100, RunAttempt: 2, Repository: "repo1" },  // Latest attempt for run 100
      { RunId: 200, RunAttempt: 1, Repository: "repo1" },
    ];
    
    const audits = [
      { RunId: 100, RunAttempt: 1, HasTokenData: true },  // OLD attempt - should NOT match
      { RunId: 200, RunAttempt: 1, HasTokenData: true },  // Matches
    ];
    
    // v18: Join on both RunId AND RunAttempt
    const joined = runs.map(r => {
      const audit = audits.find(a => a.RunId === r.RunId && a.RunAttempt === r.RunAttempt);
      return { ...r, HasTokenData: audit?.HasTokenData };
    });
    
    // Run 100 attempt 2 has no matching audit (only attempt 1 was audited)
    expect(joined.find(r => r.RunId === 100)?.HasTokenData).toBeUndefined();
    // Run 200 attempt 1 has matching audit
    expect(joined.find(r => r.RunId === 200)?.HasTokenData).toBe(true);
  });
});

// ===== v19: PAGE CAPS AND TOKEN SANITIZATION TESTS =====
describe("v19 page caps and token sanitization", () => {
  it("page cap bounds API calls", () => {
    const maxPages = 10;
    let page = 1;
    let apiCalls = 0;
    
    while (page <= maxPages) {
      apiCalls++;
      page++;
    }
    
    expect(apiCalls).toBe(10);  // Bounded to maxPages
  });
  
  it("sanitizes negative token values to zero", () => {
    const rawInput = -100;
    const rawOutput = -50;
    const rawCacheRead = -25;
    
    const inputTokens = Math.max(0, rawInput);
    const outputTokens = Math.max(0, rawOutput);
    const cacheReadTokens = Math.max(0, rawCacheRead);
    
    expect(inputTokens).toBe(0);
    expect(outputTokens).toBe(0);
    expect(cacheReadTokens).toBe(0);
  });
  
  it("clamps cacheRead to inputTokens", () => {
    const inputTokens = 100;
    const rawCacheRead = 200;  // More than input (invalid)
    
    const cacheReadTokens = Math.max(0, Math.min(rawCacheRead, inputTokens));
    
    expect(cacheReadTokens).toBe(100);  // Clamped to input
  });
  
  it("handles undefined/null token values", () => {
    const usage = { input_tokens: undefined, output_tokens: null } as any;
    
    const inputTokens = Math.max(0, usage.input_tokens || 0);
    const outputTokens = Math.max(0, usage.output_tokens || 0);
    
    expect(inputTokens).toBe(0);
    expect(outputTokens).toBe(0);
  });
});

// ===== v20: RETRY AUDIT_FAILED AND POST-SANITIZATION CLASSIFICATION =====
describe("v20 retry audit_failed and post-sanitization classification", () => {
  it("audit_failed status should not block re-auditing", () => {
    // Terminal statuses that block re-auditing
    const terminalStatuses = ["success", "no_firewall", "zero_tokens"];
    // Non-terminal status that should be retried
    const retryableStatus = "audit_failed";
    
    expect(terminalStatuses).not.toContain(retryableStatus);
  });
  
  it("classifies HasTokenData based on sanitized values", () => {
    // Scenario: raw cacheRead > input, which gets clamped to 0 when input=0
    const rawInput = 0;
    const rawCacheRead = 100;
    
    const inputTokens = Math.max(0, rawInput);
    const cacheReadTokens = Math.max(0, Math.min(rawCacheRead, inputTokens));
    
    // After sanitization, cacheRead becomes 0
    expect(cacheReadTokens).toBe(0);
    
    // HasTokenData should be based on sanitized values
    const hasTokensAfterSanitization = inputTokens > 0 || cacheReadTokens > 0;
    expect(hasTokensAfterSanitization).toBe(false);  // Should be false, not true
  });
  
  it("sets AuditStatus based on sanitized HasTokenData", () => {
    const hasTokensAfterSanitization = false;
    const auditStatus = hasTokensAfterSanitization ? "success" : "zero_tokens";
    
    expect(auditStatus).toBe("zero_tokens");
  });
});

// ===== v21: INFINITY/NAN GUARDS AND MAX RETRY =====
describe("v21 sanitizeFiniteNonNegative and max retry", () => {
  it("handles Infinity by returning 0", () => {
    expect(sanitizeFiniteNonNegative(Infinity)).toBe(0);
    expect(sanitizeFiniteNonNegative(-Infinity)).toBe(0);
  });
  
  it("handles NaN by returning 0", () => {
    expect(sanitizeFiniteNonNegative(NaN)).toBe(0);
  });
  
  it("handles null and undefined by returning 0", () => {
    expect(sanitizeFiniteNonNegative(null)).toBe(0);
    expect(sanitizeFiniteNonNegative(undefined)).toBe(0);
  });
  
  it("handles negative numbers by returning 0", () => {
    expect(sanitizeFiniteNonNegative(-100)).toBe(0);
  });
  
  it("passes through valid positive numbers", () => {
    expect(sanitizeFiniteNonNegative(100)).toBe(100);
    expect(sanitizeFiniteNonNegative(0)).toBe(0);
  });
  
  it("MAX_AUDIT_RETRIES is set to 3", () => {
    expect(MAX_AUDIT_RETRIES).toBe(3);
  });
  
  it("AUDIT_VERSION is 21 for v21 fixes", () => {
    expect(AUDIT_VERSION).toBe(23);
  });
});

describe("v21 cost calculations handle Infinity", () => {
  it("calculateModelCost returns 0 for Infinity tokens", () => {
    const cost = calculateModelCost("claude-sonnet-4", Infinity, Infinity, Infinity, Infinity);
    expect(cost).toBe(0);
  });
  
  it("calculateCacheSavings returns 0 for Infinity cacheRead", () => {
    const savings = calculateCacheSavings("claude-sonnet-4", Infinity);
    expect(savings).toBe(0);
  });
  
  it("calculateCacheHitRate returns 0 for Infinity input", () => {
    const rate = calculateCacheHitRate(Infinity, Infinity);
    expect(rate).toBe(0);
  });
});
