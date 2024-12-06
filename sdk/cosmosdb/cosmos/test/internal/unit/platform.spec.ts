// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Constants } from "../../../src/common/constants.js";
import { getUserAgent } from "../../../src/common/platform.js";
import { describe, it, assert, expect } from "vitest";
import process from "node:process";
import packageJson from "../../../package.json" assert { type: "json" };

const packageVersion = packageJson["version"];
const constantVersion = Constants.SDKVersion;

describe("getUserAgent", () => {
  it("should contain the current SDK version", () => {
    console.log(getUserAgent());
    assert(getUserAgent().includes(packageVersion));
  });

  it("should contain the current node version", () => {
    const majorVersion = process.versions.node.split(".")[0];
    expect(getUserAgent()).toContain(majorVersion);
  });

  it("should allow a custom suffix", () => {
    const suffix = "myApp";
    assert(getUserAgent(suffix).includes(suffix));
  });
});

describe("Version", () => {
  it("should have matching constant version & package version", () => {
    assert.equal(
      constantVersion,
      packageVersion,
      "Package.json and Constants.SDKVersion don't match",
    );
  });
});
