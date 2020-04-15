import { join } from "path";
import * as assert from "assert";

import { packageVersion } from "../src/appConfigurationClient";

describe("packagejson related tests", () => {
  // if this test is failing you need to update the contant `packageVersion` referenced above
  // in the generated code.
  it("user agent string matches the package version", () => {
    const packageJsonFilePath = join(__dirname, "../../package.json");
    const packageJsonContents = require(packageJsonFilePath);

    assert.equal(packageJsonContents.version, packageVersion);
  });
});
