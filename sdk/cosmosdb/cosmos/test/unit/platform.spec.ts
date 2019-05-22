import assert from "assert";
import * as os from "os";
import * as util from "util";
import { getSafeUserAgentSegmentInfo, getUserAgent } from "../../dist-esm/common/index";
import { Constants } from "../../dist-esm/index";

const packageJson = require("../../package.json");

describe("getUserAgent", function() {
  it("getUserAgent()", function() {
    const userAgent = getUserAgent();
    const expectedUserAgent = util.format(
      "%s/%s Nodejs/%s azure-cosmos-js/%s",
      os.platform(),
      os.release(),
      process.version,
      Constants.SDKVersion
    );
    assert.strictEqual(userAgent, expectedUserAgent, "invalid UserAgent format");
  });

  describe("Platform.getSafeUserAgentSegmentInfo()", function() {
    it("Removing spaces", function() {
      const safeString = getSafeUserAgentSegmentInfo("a b    c");
      assert.strictEqual(safeString, "abc");
    });
    it("empty string handling", function() {
      const safeString = getSafeUserAgentSegmentInfo("");
      assert.strictEqual(safeString, "unknown");
    });
    it("undefined", function() {
      const safeString = getSafeUserAgentSegmentInfo(undefined);
      assert.strictEqual(safeString, "unknown");
    });
    it("null", function() {
      const safeString = getSafeUserAgentSegmentInfo(null);
      assert.strictEqual(safeString, "unknown");
    });
  });
});

describe("Version", function() {
  it("should have matching constant version & package version", function() {
    const packageVersion = packageJson["version"];
    const constantVersion = Constants.SDKVersion;
    assert.equal(constantVersion, packageVersion, "Package.json and Constants.SDKVersion don't match");
  });
});
