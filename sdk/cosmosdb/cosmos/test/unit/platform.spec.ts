import assert from "assert";
import { Constants } from "../../dist-esm/index";
import { getUserAgent } from "../../dist-esm/common";

const packageJson = require("../../package.json");
const packageVersion = packageJson["version"];
const constantVersion = Constants.SDKVersion;

const userAgent = getUserAgent();

describe("getUserAgent", function() {
  it("should contain the current SDK version", () => {
    assert(userAgent.includes(packageVersion));
  });

  it("should contain the current node version", () => {
    assert(userAgent.includes(process.version.replace("v", "")));
  });
});

describe("Version", function() {
  it("should have matching constant version & package version", function() {
    assert.equal(constantVersion, packageVersion, "Package.json and Constants.SDKVersion don't match");
  });
});
