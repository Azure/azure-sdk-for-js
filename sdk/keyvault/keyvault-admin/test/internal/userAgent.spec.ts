// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { SDK_VERSION } from "../../src/constants";
import { packageVersion } from "../../src/generated/keyVaultClientContext";
import { isNode } from "@azure/core-http";
import path from "path";
import fs from "fs";

describe("Key Vault Admin's user agent (only in Node, because of fs)", function() {
  beforeEach(function() {
    if (!isNode) {
      this.skip();
    }
  });

  it("SDK_VERSION and packageVersion should match", async function() {
    assert.equal(SDK_VERSION, packageVersion);
  });

  it("the version should also match with the one available in the package.json  (only in Node, because of fs)", async function() {
    let version: string;
    try {
      const fileContents = JSON.parse(
        fs.readFileSync(path.join(__dirname, "../package.json"), { encoding: "utf-8" })
      );
      version = fileContents.version;
    } catch {
      const fileContents = JSON.parse(
        fs.readFileSync(path.join(__dirname, "../../../../package.json"), { encoding: "utf-8" })
      );
      version = fileContents.version;
    }
    assert.equal(version, packageVersion);
  });
});
