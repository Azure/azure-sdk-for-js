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
});
