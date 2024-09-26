// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it } from "vitest";
import { createTracingClient } from "@azure/core-tracing";

describe("snippets", () => {
  it("with_span_example", () => {
    const tracingClient = createTracingClient({
      namespace: "test.namespace",
      packageName: "test-package",
      packageVersion: "1.0.0",
    });

    const options = {};

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
