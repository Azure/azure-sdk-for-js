// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RegionalAuthority, calculateRegionalAuthority } from "../../../src/regionalAuthority";

import { assert } from "chai";

describe("#calculateRegionalAuthority", function () {
  beforeEach(function () {
    process.env.AZURE_REGIONAL_AUTHORITY_NAME = "envProvidedValue";
  });

  afterEach(function () {
    delete process.env.AZURE_REGIONAL_AUTHORITY_NAME;
  });

  it("maps AutoDiscoverRegion to MSAL's value correctly", function () {
    assert.equal(calculateRegionalAuthority(RegionalAuthority.AutoDiscoverRegion), "AUTO_DISCOVER");
  });

  describe("when regionalAuthority is provided", function () {
    it("prefers the provided value", function () {
      assert.equal(calculateRegionalAuthority("japaneast"), "japaneast");
    });
  });

  describe("when regionalAuthority is omitted", function () {
    it("falls back to environment variable", function () {
      assert.equal(calculateRegionalAuthority(), "envProvidedValue");
    });
  });
});
