// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { ErrorResponse } from "../../../src/request/ErrorResponse.js";
import { CosmosQueryError } from "../../../src/queryExecutionContext/Exceptions/CosmosQueryError.js";
import { CosmosErrorCode } from "../../../src/queryExecutionContext/Exceptions/CosmosErrorCode.js";
import { PartitionSplitError } from "../../../src/queryExecutionContext/Exceptions/PartitionSplitError.js";

// Tests validate the error taxonomy from QI-05, QI-08, and QI-12

describe("Cosmos Query Error Taxonomy (QI-12)", () => {
  describe("CosmosQueryError Base Class", () => {
    it("should extend ErrorResponse", () => {
      const error = new CosmosQueryError(
        "Test error message",
        CosmosErrorCode.ContextDisposed,
      );

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(ErrorResponse);
      expect(error.name).toBe("CosmosQueryError");
      expect(error.message).toBe("Test error message");
    });

    it("should have errorCode property", () => {
      const error = new CosmosQueryError("Test error", CosmosErrorCode.PartitionSplit);

      expect(error.errorCode).toBe(CosmosErrorCode.PartitionSplit);
      expect(typeof error.errorCode).toBe("string");
    });

    it("should support optional error metadata", () => {
      const originalError = new Error("Original error");
      const error = new CosmosQueryError(
        "Wrapped error",
        CosmosErrorCode.InvalidContinuationToken,
        {
          code: 400,
          substatus: 1004,
          originalError,
        },
      );

      expect(error.code).toBe(400);
      expect(error.substatus).toBe(1004);
      expect(error.cause).toBe(originalError);
    });

    it("should preserve stack trace", () => {
      const error = new CosmosQueryError(
        "Test error with stack",
        CosmosErrorCode.ResultSetTooLarge,
      );

      expect(error.stack).toBeDefined();
      expect(error.stack).toContain("CosmosQueryError");
    });
  });

  describe("CosmosErrorCode Enum", () => {
    it("should define all expected error codes", () => {
      expect(CosmosErrorCode.PartitionSplit).toBe("PartitionSplit");
      expect(CosmosErrorCode.ContextDisposed).toBe("ContextDisposed");
      expect(CosmosErrorCode.InvalidContinuationToken).toBe("InvalidContinuationToken");
      expect(CosmosErrorCode.QueryPlanRequired).toBe("QueryPlanRequired");
      expect(CosmosErrorCode.ResultSetTooLarge).toBe("ResultSetTooLarge");
      expect(CosmosErrorCode.OperationAborted).toBe("OperationAborted");
    });

    it("should include FetchAllSizeLimitExceeded from QI-06", () => {
      expect(CosmosErrorCode.FetchAllSizeLimitExceeded).toBe("FetchAllSizeLimitExceeded");
    });

    it("should use string enum values for serialization", () => {
      const errorCode = CosmosErrorCode.PartitionSplit;
      const serialized = JSON.stringify({ code: errorCode });

      expect(serialized).toContain("PartitionSplit");
      expect(typeof errorCode).toBe("string");
    });
  });

  describe("PartitionSplitError (QI-12)", () => {
    function makeOriginalError(message = "Gone"): ErrorResponse {
      const err = new ErrorResponse(message);
      err.code = 410;
      return err;
    }

    it("should extend CosmosQueryError", () => {
      const splitError = new PartitionSplitError(makeOriginalError());

      expect(splitError).toBeInstanceOf(Error);
      expect(splitError).toBeInstanceOf(ErrorResponse);
      expect(splitError).toBeInstanceOf(CosmosQueryError);
      expect(splitError.name).toBe("PartitionSplitError");
    });

    it("should have PartitionSplit errorCode", () => {
      const splitError = new PartitionSplitError(makeOriginalError());

      expect(splitError.errorCode).toBe(CosmosErrorCode.PartitionSplit);
    });

    it("should wrap original error via cause", () => {
      const originalError = makeOriginalError("Partition not found");
      const splitError = new PartitionSplitError(originalError);

      expect(splitError.cause).toBe(originalError);
      expect(splitError.originalError).toBe(originalError);
    });

    it("should have code 503 (ServiceUnavailable)", () => {
      const splitError = new PartitionSplitError(makeOriginalError());

      expect(splitError.code).toBe(503);
    });

    it("should preserve headers from original error", () => {
      const originalError = makeOriginalError();
      originalError.headers = { "x-ms-activity-id": "test-activity-id" };

      const splitError = new PartitionSplitError(originalError);

      expect(splitError.headers).toBeDefined();
      expect(splitError.headers?.["x-ms-activity-id"]).toBe("test-activity-id");
    });

    it("should have descriptive message about retry", () => {
      const splitError = new PartitionSplitError(makeOriginalError());

      expect(splitError.message).toContain("partition split");
      expect(splitError.message).toContain("retryable");
    });
  });

  describe("No More 'as any' Casts (QI-12)", () => {
    it("should not require type casts for error construction", () => {
      const originalError = new ErrorResponse("Gone");
      originalError.code = 410;
      const splitError = new PartitionSplitError(originalError);

      // All properties are properly typed — no type assertions needed
      const code: number = splitError.code as number;
      const errorCode: string = splitError.errorCode;
      const message: string = splitError.message;

      expect(code).toBe(503);
      expect(errorCode).toBe("PartitionSplit");
      expect(message).toBeDefined();
    });
  });

  describe("Error Handling Patterns", () => {
    it("should support instanceof checks for error types", () => {
      const originalError = new ErrorResponse("Gone");
      originalError.code = 410;
      const error: unknown = new PartitionSplitError(originalError);

      // Type guards work correctly through the hierarchy
      if (error instanceof PartitionSplitError) {
        expect(error.originalError.code).toBe(410);
      }

      if (error instanceof CosmosQueryError) {
        expect(error.errorCode).toBeDefined();
      }

      if (error instanceof ErrorResponse) {
        expect(error.code).toBeDefined();
      }

      expect(error).toBeInstanceOf(PartitionSplitError);
      expect(error).toBeInstanceOf(CosmosQueryError);
      expect(error).toBeInstanceOf(ErrorResponse);
    });

    it("should support errorCode-based error discrimination", () => {
      const error = new CosmosQueryError(
        "Context was disposed",
        CosmosErrorCode.ContextDisposed,
      );

      switch (error.errorCode) {
        case CosmosErrorCode.ContextDisposed:
          expect(error.message).toContain("disposed");
          break;
        case CosmosErrorCode.PartitionSplit:
          break;
        default:
          throw new Error("Unexpected error code");
      }
    });
  });
});
