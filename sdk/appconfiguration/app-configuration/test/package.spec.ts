import { packageVersion } from "../src/generated/src/appConfigurationContext";
import { join } from "path";
import { readFileSync } from "fs";
import * as assert from "assert";

describe("packagejson related tests", () => {
  it("user agent string", () => {
    const packageJsonFilePath = join(__dirname, "../package.json");
    const rawFileContents = readFileSync(packageJsonFilePath, { encoding: "utf-8" });
    const packageJsonContents = JSON.parse(rawFileContents);

    assert.equal(packageJsonContents.version, packageVersion);
  });
});