// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { GetTokenOptions } from "../../src/auth/tokenCredential";
import { OperationTracingOptions } from "../../src/tracing/interfaces";
import { assert } from "chai";
import { createTracingContext } from "../../src/tracing/tracingContext";

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
