// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { describe, it, assert, expect } from "vitest";
import path from "node:path";
import { resolveProject } from "../src/util/resolveProject";

describe("Project Resolution", () => {
  it("resolution halts at monorepo root", async () => {
    await expect(resolveProject(path.join(__dirname, "..", ".."))).rejects.toThrow(/monorepo root/);
  });

  it("resolution halts at filesystem root", async () => {
    const p = path.join(__dirname, "..", "..", "..", "..", "..");
    await expect(resolveProject(p)).rejects.toThrow(/filesystem root/);
  });

  it("resolution finds dev-tool package", async () => {
    const packageInfo = await resolveProject(__dirname);
    assert.equal(packageInfo.name, "@azure/dev-tool");
    assert.match(
      packageInfo.path,
      // Replacement below is required because of escaping. A single backslash is
      // interpreted as an escape character in the RegExp compiler, but we need
      // it to be interpreted _literally_ in windows file paths, so we double-escape them.
      new RegExp(
        `.*${(path.sep + path.join("common", "tools", "dev-tool")).replace(/\\/g, "\\\\")}`,
      ),
    );
  });
});
