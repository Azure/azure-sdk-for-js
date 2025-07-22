// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Constants } from "../../../src/common/constants.js";
import { getUserAgent } from "../../../src/common/platform.js";
import { describe, it, assert } from "vitest";
import packageJson from "../../../package.json" with { type: "json" };
import { CosmosClientOptions } from "../../../src/index.js";

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

  it("should allow a custom user agent suffix", () => {
    const suffix = "myApp";
    const options: CosmosClientOptions = {
      userAgentSuffix: suffix,
    };
    const userAgent = getUserAgent(options);
    assert(userAgent.includes(suffix));
  });

  it("should add the feature flags to the user agent string", () => {
    const options: CosmosClientOptions = {
      connectionPolicy: {
        enablePartitionLevelFailover: true,
        enablePartitionLevelCircuitBreaker: true,
      },
    };
    const userAgent = getUserAgent(options);
    assert(userAgent.includes(" F3")); 
  });

  it("should correctly handle only partition failover feature flag", () => {
    const options: CosmosClientOptions = {
      connectionPolicy: {
        enablePartitionLevelFailover: true,
      },
    };
    const userAgent = getUserAgent(options);
    assert(userAgent.includes(" F3")); // if ppaf is true ppcb is also true
  });

  it("should correctly handle only circuit breaker feature flag", () => {
    const options: CosmosClientOptions = {
      connectionPolicy: {
        enablePartitionLevelCircuitBreaker: true,
      },
    };
    const userAgent = getUserAgent(options);
    assert(userAgent.includes(" F2")); // Only circuit breaker flag should be set
  });

  it("should handle missing connectionPolicy gracefully", () => {
    const options: CosmosClientOptions = {}; // No connection policy
    const userAgent = getUserAgent(options);
    assert(!userAgent.includes(" F")); // No feature flags should be added
  });

  it("should handle missing or undefined userAgentSuffix gracefully", () => {
    const options: CosmosClientOptions = {}; 
    const userAgent = getUserAgent(options);
    assert(!userAgent.includes("undefined"));
  });

  it("should handle invalid connectionPolicy gracefully", () => {
    const options: CosmosClientOptions = {
      connectionPolicy: null, // Invalid connectionPolicy
    };
    const userAgent = getUserAgent(options);
    assert(!userAgent.includes(" F")); // No feature flags should be added
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
