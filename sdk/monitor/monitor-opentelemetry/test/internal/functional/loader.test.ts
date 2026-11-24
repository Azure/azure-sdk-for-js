// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

describe("instrumentation loader", () => {
  it.each(["--import", "--require"])("instruments ESM imports with %s", async (preload) => {
    const { stdout, stderr } = await promisify(execFile)(
      process.execPath,
      [preload, "@azure/monitor-opentelemetry/loader", "test/esm-app/index.mjs"],
      { cwd: new URL("../../../", import.meta.url) },
    );
    expect(stderr).not.toContain("DEP0205");
    expect(stdout).not.toContain("Failed to register OpenTelemetry instrumentation loader");
  });
});
