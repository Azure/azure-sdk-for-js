// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";

import { packageVersion } from "../../../src/appConfigurationClient";
import { Context } from "mocha";
import path from "path";
import fs from "fs";

describe("packagejson related tests", () => {
  // if this test is failing you need to update the contant `packageVersion` referenced above
  // in the generated code.
  it("user agent string matches the package version", function (this: Context) {
    let packageJsonContents: {
      [property: string]: string;
    };

    try {
      // For integration tests
      packageJsonContents = JSON.parse(
        fs.readFileSync(path.join(__dirname, "../../../../package.json"), { encoding: "utf-8" })
      );
    } catch (e) {
      // For unit tests
      packageJsonContents = JSON.parse(
        fs.readFileSync(path.join(__dirname, "../../../package.json"), { encoding: "utf-8" })
      );
    }

    assert.strictEqual(packageJsonContents.version, packageVersion);
  });
});
