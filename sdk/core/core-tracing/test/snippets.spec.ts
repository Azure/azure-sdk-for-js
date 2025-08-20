// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it } from "vitest";
import { createTracingClient } from "@azure/core-tracing";

describe("snippets", () => {
  it("ReadmeSampleWithSpanExample", async () => {
    const tracingClient = createTracingClient({
      namespace: "test.namespace",
      packageName: "test-package",
      packageVersion: "1.0.0",
    });
    // @ts-preserve-whitespace
    const options = {};
    // @ts-preserve-whitespace
    const myOperationResult = await tracingClient.withSpan(
      "myClassName.myOperationName",
      options,
      (updatedOptions) => {
        // Do something with the updated options.
        return "myOperationResult";
      },
    );
  });
});
