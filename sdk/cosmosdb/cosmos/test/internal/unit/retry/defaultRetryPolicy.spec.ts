// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, it } from "vitest";
import { DefaultRetryPolicy } from "../../../../src/retry/defaultRetryPolicy.js";
import {
  DiagnosticNodeInternal,
  DiagnosticNodeType,
  OperationType,
  StatusCodes,
} from "../../../../src/index.js";
import { CosmosDbDiagnosticLevel } from "../../../../dist/esm/index.js";

describe("DefaultRetryPolicy", () => {
  const dummyError = {
    name: "EPIPE",
    code: "EPIPE",
    message: "Simulated EPIPE error",
  };

  it("should return true for first 10 invocations and then false (for a 'read' operation)", async () => {
    const diagnosticNode = new DiagnosticNodeInternal(
      CosmosDbDiagnosticLevel.debug,
      DiagnosticNodeType.CLIENT_REQUEST_NODE,
      null,
    );
    const retryPolicy = new DefaultRetryPolicy(OperationType.Read);

    const results: boolean[] = [];
    // Call shouldRetry in a loop.
    // Our DefaultRetryPolicy is configured with maxTries = 10.
    // On the 11th invocation, it should return false.
    for (let i = 0; i < 11; i++) {
      const result = await retryPolicy.shouldRetry(dummyError, diagnosticNode);
      results.push(result);
    }
    // Expect first 10 calls to return true and 11th call false.
    for (let i = 0; i < 10; i++) {
      assert.isTrue(results[i], `Expected attempt ${i + 1} to be retriable`);
    }
    assert.isFalse(results[10], "Expected 11th call to return false as maxTries was reached");
  });

  it("should return false immediately if error code does not require retry", async () => {
    const retryPolicy = new DefaultRetryPolicy(OperationType.Read);
    // Create an error that will not trigger retry (code not ENOTFOUND, and not in the connection error list)
    const nonRetryError = {
      name: "SOME_OTHER_ERROR",
      code: "SOME_OTHER_ERROR",
      message: "Error that should not be retried",
    };
    const diagnosticNode = new DiagnosticNodeInternal(
      CosmosDbDiagnosticLevel.debug,
      DiagnosticNodeType.CLIENT_REQUEST_NODE,
      null,
    );
    const result = await retryPolicy.shouldRetry(nonRetryError, diagnosticNode);
    assert.isFalse(result, "Expected non-retriable error to return false");
  });
});
