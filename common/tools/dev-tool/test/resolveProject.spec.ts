// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { assert, use as chaiUse } from "chai";
import chaiPromises from "chai-as-promised";
chaiUse(chaiPromises);

import path from "path";

import { resolveProject } from "../src/util/resolveProject";

describe("Project Resolution", async () => {
  it("resolution halts at monorepo root", async () => {
    await assert.isRejected(resolveProject(path.join(__dirname, "..", "..")), /monorepo root/);
  });

  it("resolution halts at filesystem root", async () => {
    const p = path.join(__dirname, "..", "..", "..", "..", "..");
    await assert.isRejected(resolveProject(p), /filesystem root/);
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
