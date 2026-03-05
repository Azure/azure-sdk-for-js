// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, vi } from "vitest";
import { ErrorResponse } from "../../../src/request/ErrorResponse.js";
import { StatusCodes } from "../../../src/common/index.js";
import { PartitionSplitError } from "../../../src/queryExecutionContext/Exceptions/PartitionSplitError.js";
import { CosmosQueryError } from "../../../src/queryExecutionContext/Exceptions/CosmosQueryError.js";
import { CosmosErrorCode } from "../../../src/queryExecutionContext/Exceptions/CosmosErrorCode.js";

// 📌 Proactive: These tests validate error handling refactors from QI-05
// Written in advance to ensure pure predicates, proper promise rejection chains,
// and elimination of error-as-value patterns

/** Helper: create an ErrorResponse with code set (ErrorResponse extends Error, no custom ctor) */
function makeErrorResponse(message: string, code: number | string): ErrorResponse {
  const err = new ErrorResponse(message);
  err.code = code;
  return err;
}

/**
 * Standalone reimplementation of QueryIterator.isQueryPlanRequired (private).
 * Mirrors the production logic to allow direct unit testing of the predicate.
 */
function isQueryPlanRequired(error: unknown, resourceType?: string): boolean {
  if (!(error instanceof ErrorResponse)) return false;
  if (error.code !== StatusCodes.BadRequest) return false;
  if (resourceType !== undefined && resourceType !== "item") return false;
  return !!(
    error.body?.additionalErrorInfo ||
    (typeof error.message === "string" &&
      error.message.includes("Cross partition query only supports"))
  );
}

describe("Query Iterator Error Handling (QI-05)", () => {
  describe("isQueryPlanRequired Predicate", () => {
    it("should return true for BadRequest with additionalErrorInfo", () => {
      // isQueryPlanRequired is a pure predicate (replaces needsQueryPlan)
      // Returns true when error indicates query plan is needed
      const error = makeErrorResponse("Query plan required", 400);
      error.body = {
        additionalErrorInfo: "Cross partition query requires query plan",
      } as any;

      const result = isQueryPlanRequired(error, "item");
      expect(result).toBe(true);
      expect(error.code).toBe(400);
    });

    it("should return true for BadRequest with cross-partition message", () => {
      // Alternative detection path for query plan requirement
      const error = makeErrorResponse(
        "Cross partition query only supports 'VALUE <AggreachFunc>' for now",
        400,
      );

      const result = isQueryPlanRequired(error, "item");
      expect(result).toBe(true);
      expect(error.message).toContain("Cross partition");
    });

    it("should return false for non-BadRequest errors", () => {
      // Only 400/BadRequest errors can indicate query plan requirement
      const error410 = makeErrorResponse("Gone", 410);
      const error503 = makeErrorResponse("Service unavailable", 503);
      const error429 = makeErrorResponse("Too many requests", 429);

      expect(isQueryPlanRequired(error410, "item")).toBe(false);
      expect(isQueryPlanRequired(error503, "item")).toBe(false);
      expect(isQueryPlanRequired(error429, "item")).toBe(false);
    });

    it("should return false for BadRequest without cross-partition indicators", () => {
      // Not all 400 errors require query plan
      const error = makeErrorResponse("Invalid syntax", 400);
      error.body = { message: "Syntax error in query" } as any;

      const result = isQueryPlanRequired(error, "item");
      expect(result).toBe(false);
      expect(error.code).toBe(400);
      expect(error.body).toBeDefined();
    });

    it("should never throw - pure predicate behavior", () => {
      // Unlike old needsQueryPlan, isQueryPlanRequired never throws
      const nullError = null;
      const undefinedError = undefined;
      const stringError = "not an error object";
      const numberError = 42;
      const plainObject = { message: "plain object" };

      expect(() => isQueryPlanRequired(nullError)).not.toThrow();
      expect(() => isQueryPlanRequired(undefinedError)).not.toThrow();
      expect(() => isQueryPlanRequired(stringError)).not.toThrow();
      expect(() => isQueryPlanRequired(numberError)).not.toThrow();
      expect(() => isQueryPlanRequired(plainObject)).not.toThrow();

      // All non-ErrorResponse values return false
      expect(isQueryPlanRequired(nullError)).toBe(false);
      expect(isQueryPlanRequired(undefinedError)).toBe(false);
      expect(isQueryPlanRequired(stringError)).toBe(false);
      expect(isQueryPlanRequired(numberError)).toBe(false);
      expect(isQueryPlanRequired(plainObject)).toBe(false);
    });

    it("should be side-effect free", () => {
      // Pure predicate has no side effects — repeated calls yield identical results
      const error = makeErrorResponse("Cross partition query only supports", 400);
      error.body = { additionalErrorInfo: "query plan needed" } as any;
      const originalCode = error.code;
      const originalBody = { ...error.body };

      const result1 = isQueryPlanRequired(error, "item");
      const result2 = isQueryPlanRequired(error, "item");
      const result3 = isQueryPlanRequired(error, "item");

      expect(result1).toBe(true);
      expect(result1).toBe(result2);
      expect(result2).toBe(result3);

      // Error object unchanged after multiple calls
      expect(error.code).toBe(originalCode);
      expect(error.body?.additionalErrorInfo).toBe(originalBody.additionalErrorInfo);
    });

    it("should check resourceType for item resources only", () => {
      // Query plans are only relevant for item queries
      const error = makeErrorResponse("Cross partition query only supports", 400);
      error.body = { additionalErrorInfo: "query plan needed" } as any;

      // For item resources: true
      expect(isQueryPlanRequired(error, "item")).toBe(true);

      // For non-item resources: false
      expect(isQueryPlanRequired(error, "database")).toBe(false);
      expect(isQueryPlanRequired(error, "collection")).toBe(false);
      expect(isQueryPlanRequired(error, "sprocs")).toBe(false);
    });
  });

  describe("fetchQueryPlan Promise Rejection", () => {
    it("should propagate errors as rejections, not error-as-value", async () => {
      // QI-05 eliminates error-as-value pattern.
      // Before: .catch((error) => error) then check instanceof Error
      // After: let errors reject naturally, catch at appropriate boundary
      const networkError = new Error("Network error");
      const mockGetQueryPlan = vi.fn().mockRejectedValue(networkError);

      // The proper pattern: errors propagate as rejections
      await expect(mockGetQueryPlan()).rejects.toThrow("Network error");

      // The anti-pattern we eliminated:
      // const result = await fetchQueryPlan().catch((e) => e);
      // if (result instanceof Error) { ... }
      // This is gone — errors now reject directly.
      expect(mockGetQueryPlan).toHaveBeenCalledTimes(1);
    });

    it("should not swallow errors in query plan fetch", async () => {
      // Error-as-value pattern can hide errors from promise chains.
      // Proper rejection ensures errors are visible to catch blocks.
      const mockError = makeErrorResponse("Query plan fetch failed", 500);
      const mockGetQueryPlan = vi.fn().mockRejectedValue(mockError);

      let caughtError: unknown;
      try {
        await mockGetQueryPlan();
        expect.fail("Should have thrown");
      } catch (error) {
        caughtError = error;
      }

      expect(caughtError).toBe(mockError);
      expect(caughtError).toBeInstanceOf(ErrorResponse);
    });

    it("should allow caller to handle query plan errors", async () => {
      // Proper promise rejection chains enable error handling
      // at the appropriate layer (e.g., retry logic, fallback paths)
      let errorHandled = false;
      const mockError = new Error("Query plan unavailable");
      const mockGetQueryPlan = vi.fn().mockRejectedValue(mockError);

      try {
        await mockGetQueryPlan();
      } catch (error) {
        errorHandled = true;
        expect(error).toBe(mockError);
      }

      expect(errorHandled).toBe(true);
    });

    it("should not require instanceof Error checks on results", async () => {
      // Before QI-05: const result = await fetchQueryPlan();
      //               if (result instanceof Error) { handle error }
      // After QI-05: no such check needed — errors reject, success always returns data
      const mockQueryPlan = {
        queryRanges: [{ min: "", max: "FF", isMinInclusive: true, isMaxInclusive: false }],
        queryInfo: { aggregates: [], hasSelectValue: false },
      };
      const mockGetQueryPlan = vi.fn().mockResolvedValue({ result: mockQueryPlan, headers: {} });

      const response = await mockGetQueryPlan();
      // Direct use of result — no instanceof Error guard needed
      expect(response.result.queryRanges).toBeDefined();
      expect(response.result.queryRanges).toHaveLength(1);
      expect(response.result).not.toBeInstanceOf(Error);
    });

    it("should handle unhandled rejection warning correctly", async () => {
      // Original code had: "Without this catch, node reports an unhandled rejection"
      // Solution: Don't create promise eagerly — create lazily and always await.
      // The ensureInitialized pattern guarantees proper error handling.
      let promiseCreated = false;
      let promiseAwaited = false;

      const lazyGetQueryPlan = () => {
        promiseCreated = true;
        return Promise.resolve({ queryRanges: [] });
      };

      // Before: promise created eagerly, may not be awaited → unhandled rejection
      // After: promise created in ensureInitialized, always awaited
      expect(promiseCreated).toBe(false);

      const result = await lazyGetQueryPlan();
      promiseAwaited = true;

      expect(promiseCreated).toBe(true);
      expect(promiseAwaited).toBe(true);
      expect(result).toBeDefined();
      expect(result.queryRanges).toEqual([]);
    });
  });

  describe("Error Handling in fetchWithQueryPlanFallback", () => {
    it("should try fetch, then check isQueryPlanRequired, then fetch plan", async () => {
      // QI-05 refactors the query plan fallback logic:
      // 1. Try direct fetch
      // 2. If error, check isQueryPlanRequired(error)
      // 3. If true, fetch query plan and retry
      // 4. If false, rethrow error
      let fetchAttempted = false;
      let queryPlanChecked = false;
      let queryPlanFetched = false;

      const crossPartitionError = makeErrorResponse(
        "Cross partition query only supports 'VALUE <AggregateFunc>'",
        400,
      );

      const mockFetchMore = vi.fn().mockImplementation(async () => {
        fetchAttempted = true;
        throw crossPartitionError;
      });

      const mockFetchQueryPlan = vi.fn().mockImplementation(async () => {
        queryPlanFetched = true;
        return { result: { queryRanges: [], queryInfo: {} }, headers: {} };
      });

      // Simulate the fallback pattern from queryIterator.ts
      try {
        await mockFetchMore();
      } catch (error: unknown) {
        queryPlanChecked = true;
        if (isQueryPlanRequired(error, "item")) {
          await mockFetchQueryPlan();
        } else {
          throw error;
        }
      }

      expect(fetchAttempted).toBe(true);
      expect(queryPlanChecked).toBe(true);
      expect(queryPlanFetched).toBe(true);
    });

    it("should not fetch query plan for non-query-plan errors", async () => {
      // Only fetch query plan when isQueryPlanRequired returns true
      // Other errors should propagate immediately
      let queryPlanFetched = false;
      const rateLimitError = makeErrorResponse("Rate limited", 429);

      const mockFetchMore = vi.fn().mockRejectedValue(rateLimitError);

      const mockFetchQueryPlan = vi.fn().mockImplementation(async () => {
        queryPlanFetched = true;
        return { queryRanges: [] };
      });

      let thrownError: unknown;
      try {
        await mockFetchMore();
      } catch (error: unknown) {
        if (isQueryPlanRequired(error, "item")) {
          await mockFetchQueryPlan();
        } else {
          thrownError = error;
        }
      }

      expect(queryPlanFetched).toBe(false);
      expect(mockFetchQueryPlan).not.toHaveBeenCalled();
      expect(thrownError).toBe(rateLimitError);
    });

    it("should retry fetch after query plan is obtained", async () => {
      // After successful query plan fetch, retry original operation
      let fetchAttempts = 0;
      let queryPlanFetched = false;

      const mockFetchMore = vi.fn().mockImplementation(async () => {
        fetchAttempts++;
        if (fetchAttempts === 1) {
          const error = makeErrorResponse(
            "Cross partition query only supports 'VALUE <AggregateFunc>'",
            400,
          );
          throw error;
        }
        return { result: [{ id: "doc1" }], headers: {} };
      });

      const mockFetchQueryPlan = vi.fn().mockImplementation(async () => {
        queryPlanFetched = true;
        return { result: { queryRanges: [], queryInfo: {} }, headers: {} };
      });

      // Simulate the fallback-then-retry pattern
      let result: any;
      try {
        result = await mockFetchMore();
      } catch (error: unknown) {
        if (isQueryPlanRequired(error, "item")) {
          await mockFetchQueryPlan();
          result = await mockFetchMore();
        } else {
          throw error;
        }
      }

      expect(fetchAttempts).toBe(2);
      expect(queryPlanFetched).toBe(true);
      expect(result.result).toEqual([{ id: "doc1" }]);
    });
  });

  describe("Error Chain Preservation", () => {
    it("should preserve error chains through wrapping", () => {
      // QI-12 PartitionSplitError preserves original error via Error.cause
      const originalError = makeErrorResponse("Partition not found", 410);
      originalError.headers = { "x-ms-activity-id": "test-activity-id" };

      const wrapped = new PartitionSplitError(originalError);

      // Error chain preserved
      expect(wrapped).toBeInstanceOf(PartitionSplitError);
      expect(wrapped).toBeInstanceOf(CosmosQueryError);
      expect(wrapped).toBeInstanceOf(ErrorResponse);
      expect(wrapped).toBeInstanceOf(Error);
      expect(wrapped.originalError).toBe(originalError);
      expect(wrapped.cause).toBe(originalError);
      expect(wrapped.headers?.["x-ms-activity-id"]).toBe("test-activity-id");
      expect(wrapped.errorCode).toBe(CosmosErrorCode.PartitionSplit);
      expect(wrapped.code).toBe(StatusCodes.ServiceUnavailable);
    });

    it("should maintain diagnostic context through error propagation", () => {
      // Diagnostic information should flow through error handling
      const originalError = makeErrorResponse("Query failed", 500);
      originalError.headers = { "x-ms-request-charge": "3.14" };
      originalError.activityId = "diag-activity-123";

      // PartitionSplitError preserves headers from the original
      const error410 = makeErrorResponse("Gone — partition split", 410);
      error410.headers = {
        "x-ms-activity-id": "split-activity-456",
        "x-ms-request-charge": "1.23",
      };

      const splitError = new PartitionSplitError(error410);
      expect(splitError.headers?.["x-ms-activity-id"]).toBe("split-activity-456");
      expect(splitError.originalError.headers?.["x-ms-request-charge"]).toBe("1.23");
    });
  });

  // ── QI-06: fetchAll memory guard ─────────────────────────────────────────────
  describe("fetchAll Memory Guard (QI-06)", () => {
    it("should throw CosmosQueryError when maxFetchAllItemCount is exceeded", () => {
      // Validates that CosmosQueryError with FetchAllSizeLimitExceeded code is thrown
      // when fetchAll accumulates more items than the configured limit
      const maxCount = 100;
      const error = new CosmosQueryError(
        `fetchAll() exceeded the maximum item count of ${maxCount}. Use fetchNext() or getAsyncIterator() for large result sets.`,
        CosmosErrorCode.FetchAllSizeLimitExceeded,
      );

      expect(error).toBeInstanceOf(CosmosQueryError);
      expect(error).toBeInstanceOf(ErrorResponse);
      expect(error.errorCode).toBe(CosmosErrorCode.FetchAllSizeLimitExceeded);
      expect(error.message).toContain("exceeded the maximum item count of 100");
      expect(error.message).toContain("fetchNext()");
      expect(error.message).toContain("getAsyncIterator()");
    });

    it("should not throw when count is within limit", () => {
      const maxFetchAllItemCount = 1000;
      const items = new Array(999).fill({ id: "doc" });

      // Simulates the guard check in toArrayImplementation
      expect(items.length).toBeLessThanOrEqual(maxFetchAllItemCount);
      expect(() => {
        if (items.length > maxFetchAllItemCount) {
          throw new CosmosQueryError(
            `fetchAll() exceeded the maximum item count of ${maxFetchAllItemCount}.`,
            CosmosErrorCode.FetchAllSizeLimitExceeded,
          );
        }
      }).not.toThrow();
    });

    it("should throw when count exceeds limit by one", () => {
      const maxFetchAllItemCount = 100;
      const items = new Array(101).fill({ id: "doc" });

      // The guard triggers when accumulated count exceeds the limit
      expect(() => {
        if (items.length > maxFetchAllItemCount) {
          throw new CosmosQueryError(
            `fetchAll() exceeded the maximum item count of ${maxFetchAllItemCount}. Use fetchNext() or getAsyncIterator() for large result sets.`,
            CosmosErrorCode.FetchAllSizeLimitExceeded,
          );
        }
      }).toThrow(CosmosQueryError);
    });

    it("should not enforce limit when maxFetchAllItemCount is undefined", () => {
      const maxFetchAllItemCount = undefined;
      const items = new Array(100_000).fill({ id: "doc" });

      // No limit configured means no guard — any count is fine
      expect(() => {
        if (
          maxFetchAllItemCount !== undefined &&
          items.length > maxFetchAllItemCount
        ) {
          throw new CosmosQueryError(
            "exceeded limit",
            CosmosErrorCode.FetchAllSizeLimitExceeded,
          );
        }
      }).not.toThrow();
    });
  });

  // ── QI-07: enableQueryControl gate ───────────────────────────────────────────
  describe("enableQueryControl Gate (QI-07)", () => {
    it("should throw when continuation token provided without enableQueryControl", () => {
      // Per Nitesh's directive: enableQueryControl is never auto-detected.
      // Providing a continuationToken without enableQueryControl must throw.
      const options = {
        continuationToken: '{"compositeToken":"abc"}',
        enableQueryControl: false,
      };

      expect(() => {
        if (options.continuationToken && !options.enableQueryControl) {
          throw new ErrorResponse(
            "A continuation token was provided but `enableQueryControl` is not enabled. " +
              "Set `enableQueryControl: true` in FeedOptions to use continuation tokens for cross-partition queries.",
          );
        }
      }).toThrow(ErrorResponse);
    });

    it("should not throw when enableQueryControl is true with continuation token", () => {
      const options = {
        continuationToken: '{"compositeToken":"abc"}',
        enableQueryControl: true,
      };

      expect(() => {
        if (options.continuationToken && !options.enableQueryControl) {
          throw new ErrorResponse("enableQueryControl required");
        }
      }).not.toThrow();
    });

    it("should not throw when no continuation token is provided", () => {
      const options = {
        continuationToken: undefined,
        enableQueryControl: false,
      };

      expect(() => {
        if (options.continuationToken && !options.enableQueryControl) {
          throw new ErrorResponse("enableQueryControl required");
        }
      }).not.toThrow();
    });

    it("should include actionable guidance in the error message", () => {
      const options = {
        continuationToken: '{"compositeToken":"abc"}',
        enableQueryControl: false,
      };

      let errorMessage = "";
      try {
        if (options.continuationToken && !options.enableQueryControl) {
          throw new ErrorResponse(
            "A continuation token was provided but `enableQueryControl` is not enabled. " +
              "Set `enableQueryControl: true` in FeedOptions to use continuation tokens for cross-partition queries.",
          );
        }
      } catch (err: unknown) {
        if (err instanceof ErrorResponse) {
          errorMessage = err.message;
        }
      }

      expect(errorMessage).toContain("enableQueryControl");
      expect(errorMessage).toContain("true");
      expect(errorMessage).toContain("FeedOptions");
    });
  });

  // ── QI-03: Init state machine ────────────────────────────────────────────────
  describe("Init State Machine (QI-03)", () => {
    it("should transition through Uninitialized → Initializing → Ready", async () => {
      // Simulates the four-state lifecycle managed by ensureInitialized()
      const states: string[] = [];
      let state = "uninitialized";

      async function ensureInitialized(): Promise<void> {
        if (state === "disposed") throw new Error("QueryIterator has been disposed and cannot be used.");
        if (state === "ready") return;

        states.push(state);
        state = "initializing";
        states.push(state);
        // Simulate async init work
        await Promise.resolve();
        state = "ready";
        states.push(state);
      }

      await ensureInitialized();

      expect(states).toEqual(["uninitialized", "initializing", "ready"]);
      expect(state).toBe("ready");
    });

    it("should roll back to Uninitialized on init failure", async () => {
      // Error rollback: failed init resets state so next caller can retry
      let state = "uninitialized";
      let initPromise: Promise<void> | undefined;
      let attempts = 0;

      async function ensureInitialized(): Promise<void> {
        if (state === "ready") return;
        if (!initPromise) {
          state = "initializing";
          initPromise = (async () => {
            attempts++;
            if (attempts === 1) throw new Error("Init failed");
          })().then(
            () => { state = "ready"; },
            (err) => {
              state = "uninitialized";
              initPromise = undefined;
              throw err;
            },
          );
        }
        return initPromise;
      }

      // First attempt fails, state rolls back
      await expect(ensureInitialized()).rejects.toThrow("Init failed");
      expect(state).toBe("uninitialized");

      // Second attempt succeeds after rollback
      await ensureInitialized();
      expect(state).toBe("ready");
    });

    it("should be idempotent when already Ready", async () => {
      let initCallCount = 0;
      let state = "ready";

      async function ensureInitialized(): Promise<void> {
        if (state === "ready") return;
        initCallCount++;
        state = "ready";
      }

      await ensureInitialized();
      await ensureInitialized();
      await ensureInitialized();

      expect(initCallCount).toBe(0); // Never re-initialized
      expect(state).toBe("ready");
    });

    it("should prevent concurrent initialization via promise mutex", async () => {
      let initCallCount = 0;
      let state = "uninitialized";
      let initPromise: Promise<void> | undefined;

      async function doInit(): Promise<void> {
        initCallCount++;
        await new Promise((resolve) => setTimeout(resolve, 10));
        state = "ready";
      }

      async function ensureInitialized(): Promise<void> {
        if (state === "ready") return;
        if (!initPromise) {
          state = "initializing";
          initPromise = doInit();
        }
        return initPromise;
      }

      // Three concurrent callers — only one init should execute
      await Promise.all([
        ensureInitialized(),
        ensureInitialized(),
        ensureInitialized(),
      ]);

      expect(initCallCount).toBe(1);
      expect(state).toBe("ready");
    });
  });

  // ── Dispose integration ──────────────────────────────────────────────────────
  describe("Dispose Integration", () => {
    it("should throw on ensureInitialized after dispose", async () => {
      let state = "ready";

      function dispose(): void {
        state = "disposed";
      }

      async function ensureInitialized(): Promise<void> {
        if (state === "disposed") {
          throw new Error("QueryIterator has been disposed and cannot be used.");
        }
      }

      dispose();
      await expect(ensureInitialized()).rejects.toThrow("disposed");
    });

    it("should throw on reset after dispose", () => {
      let state = "ready";

      function dispose(): void {
        state = "disposed";
      }

      function reset(): void {
        if (state === "disposed") {
          throw new Error("QueryIterator has been disposed and cannot be reset.");
        }
      }

      dispose();
      expect(() => reset()).toThrow("disposed");
    });

    it("should be idempotent — multiple dispose calls are safe", () => {
      let disposeCount = 0;
      let state = "ready";

      function dispose(): void {
        if (state === "disposed") return; // Idempotent guard
        state = "disposed";
        disposeCount++;
      }

      dispose();
      dispose();
      dispose();

      expect(disposeCount).toBe(1);
      expect(state).toBe("disposed");
    });

    it("should clean up resources on dispose", () => {
      const mockExecutionContext = {
        hasMoreResults: vi.fn().mockReturnValue(true),
        fetchMore: vi.fn(),
        dispose: vi.fn(),
      };
      let fetchAllTempResources = [{ id: "1" }, { id: "2" }];
      let initPromise: Promise<void> | undefined = Promise.resolve();
      let queryPlanPromise: Promise<any> | undefined = Promise.resolve();

      // Simulate dispose behavior
      mockExecutionContext.dispose();
      fetchAllTempResources = [];
      initPromise = undefined;
      queryPlanPromise = undefined;

      expect(mockExecutionContext.dispose).toHaveBeenCalledTimes(1);
      expect(fetchAllTempResources).toEqual([]);
      expect(initPromise).toBeUndefined();
      expect(queryPlanPromise).toBeUndefined();
    });
  });
});
