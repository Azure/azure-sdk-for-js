import assert from "assert";
import * as os from "os";
import * as util from "util";
import * as packageJson from "../../../package.json";
import { Platform } from "../../common";
import { Constants } from "../../index";

describe("Platform.getUserAgent", function() {
  it("getUserAgent()", function() {
    const userAgent = Platform.getUserAgent();
    const expectedUserAgent = util.format(
      "%s/%s Nodejs/%s azure-cosmos-js/%s",
      os.platform(),
      os.release(),
      process.version,
      Constants.SDKVersion
    );
    assert.strictEqual(userAgent, expectedUserAgent, "invalid UserAgent format");
  });

  describe("Platform._getSafeUserAgentSegmentInfo()", function() {
    it("Removing spaces", function() {
      const safeString = Platform._getSafeUserAgentSegmentInfo("a b    c");
      assert.strictEqual(safeString, "abc");
    });
    it("empty string handling", function() {
      const safeString = Platform._getSafeUserAgentSegmentInfo("");
      assert.strictEqual(safeString, "unknown");
    });
    it("undefined", function() {
      const safeString = Platform._getSafeUserAgentSegmentInfo(undefined);
      assert.strictEqual(safeString, "unknown");
    });
    it("null", function() {
      const safeString = Platform._getSafeUserAgentSegmentInfo(null);
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
