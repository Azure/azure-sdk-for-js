// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";
import path from "node:path";
import { resolveNodeBinTarget, resolveNodeModuleBin } from "../src/util/nodeCli.ts";

describe("Node CLI resolution", () => {
  it("resolves a package CLI from the current project", () => {
    expect(resolveNodeModuleBin("vitest", "vitest")).toMatch(/vitest\.mjs$/);
  });

  it("resolves the Node target behind a package-manager bin shim", () => {
    const shimPath = path.resolve(import.meta.dirname, "..", "node_modules", ".bin", "prettier");
    expect(resolveNodeBinTarget(shimPath)).toMatch(/prettier[\\/]bin[\\/]prettier\.cjs$/);
  });
});
