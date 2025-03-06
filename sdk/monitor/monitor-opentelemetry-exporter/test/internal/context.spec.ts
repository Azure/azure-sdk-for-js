// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Context, getInstance } from "../../src/platform/index.js";
import { describe, it, assert } from "vitest";

describe("context.ts", () => {
  it("#constructor", () => {
    const context = getInstance();
    assert.ok(Context.nodeVersion, "Missing nodeVersion");
    assert.ok(Context.opentelemetryVersion, "Missing opentelemetryVersion");
    assert.ok(Context.sdkVersion, "Missing sdkVersion");
    assert.ok(context.tags["ai.device.osVersion"], "Missing ai.device.osVersion");
    assert.ok(context.tags["ai.internal.sdkVersion"], "Missing ai.internal.sdkVersion");
  });

  it("#_loadInternalContext", () => {
    const context = getInstance();
    context["_loadInternalContext"]();
    assert.ok(
      context.tags["ai.internal.sdkVersion"].startsWith("node"),
      "Wrong ai.internal.sdkVersion",
    );
    assert.ok(
      context.tags["ai.internal.sdkVersion"].indexOf(":otel") > 0,
      "Wrong ai.internal.sdkVersion",
    );
    assert.ok(
      context.tags["ai.internal.sdkVersion"].indexOf(":ext") > 0,
      "Wrong ai.internal.sdkVersion",
    );

    process.env["AZURE_MONITOR_PREFIX"] = "testPrefix_";
    process.env["AZURE_MONITOR_DISTRO_VERSION"] = "_testDistroVersion";
    context["_loadInternalContext"]();
    assert.ok(
      context.tags["ai.internal.sdkVersion"].startsWith("testPrefix_node"),
      "Wrong ai.internal.sdkVersion",
    );
    assert.ok(
      context.tags["ai.internal.sdkVersion"].indexOf(":otel") > 0,
      "Wrong ai.internal.sdkVersion",
    );
    assert.ok(
      context.tags["ai.internal.sdkVersion"].endsWith(":dst_testDistroVersion"),
      "Wrong ai.internal.sdkVersion",
    );
  });
  it("caputres the shim version when present", () => {
    const originalEnv = process.env;
    const newEnv = <{ [id: string]: string }>{};
    newEnv["APPLICATION_INSIGHTS_SHIM_VERSION"] = "_testShimVersion";
    process.env = newEnv;
    const context = new Context();
    context["_loadInternalContext"]();
    assert.ok(
      context.tags["ai.internal.sdkVersion"].endsWith(":sha_testShimVersion"),
      "Wrong ai.internal.sdkVersion",
    );
    process.env = originalEnv;
  });
});
