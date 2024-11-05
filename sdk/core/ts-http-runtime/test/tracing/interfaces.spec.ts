// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import type { GetTokenOptions } from "../../src/auth/tokenCredential.js";
import type { OperationTracingOptions } from "../../src/tracing/interfaces.js";
import { createTracingContext } from "../../src/tracing/tracingContext.js";

describe("Interface compatibility", () => {
  describe("OperationTracingOptions", () => {
    it("is compatible with core-auth", () => {
      const tracingOptions: OperationTracingOptions = {
        tracingContext: createTracingContext({}),
      };
      const authOptions: GetTokenOptions = {
        tracingOptions,
      };
      assert.ok(authOptions.tracingOptions);
    });
  });
});
