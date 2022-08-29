// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createDefaultRetryPolicy, createRetryOptions } from "../../../src/utils/retryPolicy.js";
import { AbortError } from "@azure/abort-controller";
import { RestError } from "@azure/core-rest-pipeline";
import { assert } from "@azure/test-utils";

describe("DefaultRetryPolicy", () => {
  describe("runOperation", () => {
    it("should run an operation without error without retrying", async () => {
      const retryOptions = createRetryOptions();
      const retryPolicy = createDefaultRetryPolicy(retryOptions);

      let operationCount = 0;
      const result = await retryPolicy.runOperation(async () => {
        operationCount++;

        return 42;
      });

      assert.equal(result, 42);
      assert.equal(operationCount, 1);
    });

    it("should not retry an AbortError", async () => {
      const retryOptions = createRetryOptions();
      const retryPolicy = createDefaultRetryPolicy(retryOptions);
      let operationCount = 0;

      assert.isRejected(
        retryPolicy.runOperation(async () => {
          operationCount++;
          throw new AbortError();
        })
      );

      assert.equal(operationCount, 1);
    });

    it("should retry after a retryable error", async () => {
      const retryOptions = createRetryOptions();
      const retryPolicy = createDefaultRetryPolicy(retryOptions);
      let operationCount = 0;

      const result = await retryPolicy.runOperation(async () => {
        operationCount++;
        if (operationCount === 1) {
          throw new RestError("Error", {
            statusCode: 429,
          });
        }

        return 42;
      });

      assert.equal(result, 42);
      assert.equal(operationCount, 2);
    });

    it("should stop retrying after max failures", async () => {
      const retryOptions = createRetryOptions({ maxRetries: 2 });
      const retryPolicy = createDefaultRetryPolicy(retryOptions);
      let operationCount = 0;

      try {
        await retryPolicy.runOperation(async () => {
          operationCount++;
          throw new RestError("Error", {
            statusCode: 429,
          });
        });
      } catch (err) {
        assert.isNotNull(err);
      }

      assert.equal(operationCount, 3);
    });
  });
});
