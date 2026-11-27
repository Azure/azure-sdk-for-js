// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { AzureSdkInstrumentation } from "@azure/opentelemetry-instrumentation-azure-sdk";

describe("browser instrumentation state", () => {
  it("reports whether the instrumentation is enabled", () => {
    const instrumentation = new AzureSdkInstrumentation({ enabled: false });
    assert.isFalse(instrumentation.isEnabled());
    instrumentation.enable();
    assert.isTrue(instrumentation.isEnabled());
    instrumentation.disable();
    assert.isFalse(instrumentation.isEnabled());
  });
});
