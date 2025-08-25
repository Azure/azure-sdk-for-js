// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type * as coreAuth from "@azure/core-auth";
import type * as coreTracing from "@azure/core-tracing";
import { describe, it, assert } from "vitest";
import { createTracingContext } from "$internal/tracingContext.js";

describe("Interface compatibility", () => {
  describe("OperationTracingOptions", () => {
    it("is compatible with core-auth", () => {
      const tracingOptions: coreTracing.OperationTracingOptions = {
        tracingContext: createTracingContext({}),
      };
      const authOptions: coreAuth.GetTokenOptions = {
        tracingOptions,
      };
      assert.ok(authOptions.tracingOptions);
    });
  });
});
