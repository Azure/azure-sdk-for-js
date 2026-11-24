// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";
import * as releaseChecks from "../src/checks/release.ts";
import { parsePnpmPackResult } from "../src/util/pnpmPack.ts";

it("exports only runnable release checks", () => {
  for (const check of Object.values(releaseChecks)) {
    expect(check.check).toBeTypeOf("function");
  }
});

describe("parsePnpmPackResult", () => {
  it("reads the filename from a single pnpm pack result", () => {
    expect(parsePnpmPackResult(JSON.stringify({ filename: "example-1.0.0.tgz" }))).toEqual({
      filename: "example-1.0.0.tgz",
    });
  });

  it("reads the filename from the first result in a pnpm pack array", () => {
    expect(
      parsePnpmPackResult(
        JSON.stringify([{ filename: "example-1.0.0.tgz" }, { filename: "ignored-2.0.0.tgz" }]),
      ),
    ).toEqual({ filename: "example-1.0.0.tgz" });
  });

  it.each(["{}", "[]", "[{}]", '[{"filename":""}]'])(
    "rejects a pnpm pack result without a filename: %s",
    (packOutput) => {
      expect(() => parsePnpmPackResult(packOutput)).toThrow(
        "pnpm pack did not return a package filename.",
      );
    },
  );
});
