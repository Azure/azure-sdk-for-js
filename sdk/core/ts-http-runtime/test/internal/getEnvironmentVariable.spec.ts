// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { getEnvironmentVariable } from "#platform/env";

describe("getEnvironmentVariable", function () {
  it("should read environment variables that exist", function () {
    // In Node: process.env.PATH exists natively.
    // In browser tests: vitest.browser.base.config.ts injects process.env
    // via `define: { "process.env": process.env }`, which includes PATH.
    const path = getEnvironmentVariable("PATH");
    expect(path).toBeDefined();
    expect(typeof path).toBe("string");
    expect(path!.length).toBeGreaterThan(0);
  });

  it("should return undefined for non-existent environment variables", function () {
    const value = getEnvironmentVariable(
      "THIS_ENV_VAR_DEFINITELY_DOES_NOT_EXIST_IN_ANY_ENVIRONMENT_12345",
    );
    expect(value).toBeUndefined();
  });
});
