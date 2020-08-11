// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { SDK_VERSION } from "../../src/generated/utils/constants";
import { packageVersion } from "../../src/generated/keyVaultClientContext";
import { isNode } from '@azure/core-http';
import * as fs from "fs";

describe("Secrets client's user agent (only in Node, because of fs)", () => {
  if (!isNode) {
    return;
  }

  const { version } = JSON.parse(fs.readFileSync(__dirname + "/../package.json", { encoding: "utf-8" }))

  it("the version at constants should be as expected", async function() {
    assert.equal(version, SDK_VERSION);
  });

  it("the version at KeyVaultClientContext should be as expected", async function() {
    assert.equal(version, packageVersion);
  });
});
