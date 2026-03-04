// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Constants } from "../../../src/common/constants.js";
import { getUserAgent } from "../../../src/common/platform.js";
import { describe, it, assert } from "vitest";
import packageJson from "../../../package.json" with { type: "json" };
import type { CosmosClientOptions } from "../../../src/index.js";

const packageVersion = packageJson["version"];
const constantVersion = Constants.SDKVersion;

describe("getUserAgent", () => {
  it("should contain the current SDK version", () => {
    assert(getUserAgent().includes(packageVersion));
  });

  it("should contain the current node version", () => {
    assert(getUserAgent().includes(process.version.replace("v", "")));
  });

  it("should allow a custom suffix", () => {
    const suffix = "myApp";
    const options: CosmosClientOptions = {
      userAgentSuffix: suffix,
    };
    assert(getUserAgent(options).includes(suffix));
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
