// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Context, getInstance } from "../../src/platform";
import * as assert from "assert";

describe("context.ts", () => {
  describe("#constructor", () => {
    const context = getInstance();
    assert.ok(Context.nodeVersion, "Missing nodeVersion");
    assert.ok(Context.opentelemetryVersion, "Missing opentelemetryVersion");
    assert.ok(Context.sdkVersion, "Missing sdkVersion");
    assert.ok(context.tags["ai.device.osVersion"], "Missing ai.device.osVersion");
    assert.ok(context.tags["ai.internal.sdkVersion"], "Missing ai.internal.sdkVersion");
  });

  describe("#_loadInternalContext", () => {
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
      context.tags["ai.internal.sdkVersion"].endsWith(":ext_testDistroVersion"),
      "Wrong ai.internal.sdkVersion",
    );
  });
});
