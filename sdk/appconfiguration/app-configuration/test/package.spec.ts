const packageJson = require("../package.json");
import { packageVersion } from "../src/generated/src/appConfigurationContext";
import * as assert from "assert";

describe("packagejson related tests", () => {
  it("user agent string", () => {
    assert.equal(packageJson.version, packageVersion);
  });
});