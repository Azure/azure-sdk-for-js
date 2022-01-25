// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { createTracingContext } from "../src/tracingContext";
import * as coreTracing from "../src";
import * as coreAuth from "@azure/core-auth";

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
