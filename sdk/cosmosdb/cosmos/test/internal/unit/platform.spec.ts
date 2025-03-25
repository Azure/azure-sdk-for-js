// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import assert from "node:assert";
import { Constants } from "../../../src/common/constants.js";
import { getUserAgent } from "../../../src/common/platform.js";
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
      "Package.json and Constants.SDKVersion don't match",
    );
  });
});
