// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import fs from "node:fs/promises";
import { stripVTControlCharacters } from "node:util";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as releaseChecks from "../src/checks/release.ts";
import checkCommand from "../src/commands/check.ts";
import {
  isCheck,
  packageJsonCheck,
  scriptCheck,
  workingTreeUnchangedCheck,
} from "../src/framework/check.ts";
import { silenceLogger } from "./util.ts";

describe("isCheck", () => {
  it.each([
    ["a script check", scriptCheck({ checkCommand: ["pnpm", "lint"] })],
    ["a package.json check", packageJsonCheck({ fix: ({ packageJson }) => packageJson })],
    ["a working tree check", workingTreeUnchangedCheck({ fixCommand: ["pnpm", "build"] })],
    ["an object with a check function", { check: () => undefined }],
  ])("accepts %s", (_description, value) => {
    expect(isCheck(value)).toBe(true);
  });

  it.each([
    ["a helper function", releaseChecks.parsePnpmPackResult],
    ["a string", "check"],
    ["a number", 1],
    ["null", null],
    ["undefined", undefined],
    ["an array", []],
    ["an object without a check function", { description: "not a check" }],
    ["an object whose check is not a function", { check: true }],
  ])("rejects %s", (_description, value) => {
    expect(isCheck(value)).toBe(false);
  });

  it("finds only the checks among the exports of a check module", () => {
    const checks = Object.entries(releaseChecks)
      .filter(([, value]) => isCheck(value))
      .map(([name]) => name);

    expect(checks).toEqual(expect.arrayContaining(["installable", "areTheTypesWrong"]));
    expect(checks).not.toContain("parsePnpmPackResult");
  });
});

describe("check command", () => {
  let output: string[];

  beforeEach(() => {
    silenceLogger();
    output = [];
    vi.spyOn(console, "log").mockImplementation((...values: unknown[]) => {
      output.push(stripVTControlCharacters(values.join(" ")));
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("does not run helpers exported from a check module as checks", async () => {
    // release.ts exports a helper next to its checks. The checks are tagged, so without --tag
    // the only thing the runner could run from this module is the helper.
    vi.spyOn(fs, "readdir").mockResolvedValue(["release.ts"] as never);

    await expect(checkCommand()).resolves.toBe(true);

    const text = output.join("\n");
    expect(text).toContain("release.ts");
    expect(text).not.toContain("parsePnpmPackResult");
  });
});
