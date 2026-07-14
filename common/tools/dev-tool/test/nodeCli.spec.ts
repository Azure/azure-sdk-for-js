// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";
import { resolveNodeModuleBin } from "../src/util/nodeCli.ts";

describe("Node CLI resolution", () => {
  it("resolves a package CLI from the current project", () => {
    expect(resolveNodeModuleBin("vitest", "vitest")).toMatch(/vitest\.mjs$/);
  });
});
