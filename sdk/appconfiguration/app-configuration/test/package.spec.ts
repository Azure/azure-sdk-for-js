import { join } from "path";
import * as assert from "assert";

import { packageVersion } from "../src/appConfigurationClient";

describe("packagejson related tests", () => {
  // if this test is failing you need to update the contant `packageVersion` referenced above
  // in the generated code.
  it("user agent string matches the package version", () => {
    let packageJsonContents: {
      [property: string]: string;
    };

    try {
      // For integration tests
      const packageJsonFilePath = join(__dirname, "../../package.json");
      packageJsonContents = require(packageJsonFilePath);
    } catch (e) {
      // For unit tests
      const packageJsonFilePath = join(__dirname, "../package.json");
      packageJsonContents = require(packageJsonFilePath);
    }

    assert.equal(packageJsonContents.version, packageVersion);
  });
});
