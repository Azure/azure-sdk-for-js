// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";
import { buildVitestCommand } from "../src/util/vitestCommand.ts";

describe("test:vitest command safety", () => {
  it("preserves trailing arguments as separate values", () => {
    const args = ["path with spaces", "x;whoami", "x&whoami", "$(whoami)"];
    const command = buildVitestCommand(args, { browser: false, esm: false });
    expect(command[0]).toBe(process.execPath);
    expect(command[1]).toBe("--");
    expect(command[2]).toMatch(/vitest\.mjs$/);
    expect(command.slice(3)).toEqual(args);
  });

  it("adds a browser config as separate arguments", () => {
    const command = buildVitestCommand(["test/**/*.spec.ts"], { browser: true, esm: false });
    expect(command.slice(3)).toEqual(["-c", "vitest.browser.config.ts", "test/**/*.spec.ts"]);
  });

  it("preserves an explicitly supplied config", () => {
    const command = buildVitestCommand(["--config", "custom config.ts"], {
      browser: true,
      esm: false,
    });
    expect(command.slice(3)).toEqual(["--config", "custom config.ts"]);
  });
});
