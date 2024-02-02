// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import type { GetTokenOptions } from "../../src/auth/tokenCredential.js";
import { OperationTracingOptions } from "../../src/tracing/interfaces.js";
import { assert } from "chai";
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
