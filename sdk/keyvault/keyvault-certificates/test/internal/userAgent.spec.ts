// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { version } from "../../package.json";
import { SDK_VERSION } from "../../src/generated/utils/constants";
import { packageVersion } from "../../src/generated/keyVaultClientContext";

describe("Certificates client's user agent", () => {
  // The tests follow

  it("the version at constants should be as expected", async function() {
    assert.equal(version, SDK_VERSION);
  });

  it("the version at KeyVaultClientContext should be as expected", async function() {
    assert.equal(version, packageVersion);
  });
});
