// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { Constants } from "../../../src/common/constants";
import { getUserAgent } from "../../../src/common/platform";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const packageJson = require("../../../package.json");
const packageVersion = packageJson["version"];
const constantVersion = Constants.SDKVersion;

describe("getUserAgent", function () {
  it("should contain the current SDK version", () => {
    assert(getUserAgent().includes(packageVersion));
  });

  it("should contain the current node version", () => {
    assert(getUserAgent().includes(process.version.replace("v", "")));
  });

  it("should allow a custom suffix", () => {
    const suffix = "myApp";
    assert(getUserAgent(suffix).includes(suffix));
  });
});

describe("Version", function () {
  it("should have matching constant version & package version", function () {
    assert.equal(
      constantVersion,
      packageVersion,
      "Package.json and Constants.SDKVersion don't match"
    );
  });
});
