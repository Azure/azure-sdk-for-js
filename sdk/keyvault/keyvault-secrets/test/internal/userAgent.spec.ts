// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { SDK_VERSION } from "../../src/generated/utils/constants";
import { packageVersion } from "../../src/generated/keyVaultClientContext";
import { isNode } from "@azure/core-http";
import path from "path";
import fs from "fs";

describe("Secrets client's user agent (only in Node, because of fs)", () => {
  it("SDK_VERSION and packageVersion should match", async function() {
    assert.equal(SDK_VERSION, packageVersion);
  });

  it("the version should also match with the one available in the package.json  (only in Node, because of fs)", async function() {
    if (!isNode) {
      this.skip();
      return;
    }
    let version: string;
    try {
      // The unit-test script has this test file at: test/internal/userAgent.spec.ts
      const fileContents = JSON.parse(
        fs.readFileSync(path.join(__dirname, "../package.json"), { encoding: "utf-8" })
      );
      version = fileContents.version;
    } catch {
      // The integration-test script has this test file in a considerably different place,
      // Along the lines of: dist-esm/keyvault-keys/test/internal/userAgent.spec.ts
      const fileContents = JSON.parse(
        fs.readFileSync(path.join(__dirname, "../../../../package.json"), { encoding: "utf-8" })
      );
      version = fileContents.version;
    }
    assert.equal(version, packageVersion);
  });
});
