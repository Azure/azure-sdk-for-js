// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import assert from "assert";
import * as fs from "fs";
import { Context } from "mocha";
import * as path from "path";

const validOpenTelemetryVersions = ["0.20.0"];

describe("cache", () => {
  it("ensure current @opentelemetry/api has been validated", function(this: Context) {
    if (!fs) {
      this.skip();
    }
    // This test ensures that we make a conscious and deliberate decision whether two tracers are compatible.
    // When upgrading our @opentelemetry/api version, if the changes to the _tracer_ are incompatible we should
    // Update GLOBAL_TRACER_SYMBOL to be unique by incrementing the version and remove the existing entries in `validOpenTelemetryVersions`. Otherwise we can share a tracer cache.
    // When finished, you can add this version to the `validOpenTelemetryVersions` array.
    const packageJson = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../package.json"), { encoding: "utf8" })
    );
    assert.ok(
      validOpenTelemetryVersions.includes(packageJson["dependencies"]["@opentelemetry/api"]),
      "Detected new version of @opentelemetry/api. Please ensure compatibility with current versions or bump the cache version to ensure uniqueness, then add it to the `validOpenTelemetryVersions` list."
    );
  });
});
