// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { isVersionInSupportedRange, versionsToTest } from "$internal/multiVersion.js";

describe("Multi-service-version test support", () => {
  const allVersions = ["1.0", "1.1", "1.2"];
  describe("isVersionInSupportedRange() on version list", () => {
    [
      { currentVersion: "1.0", supported: ["1.0", "1.1"], expected: true },
      { currentVersion: "1.2", supported: ["1.0", "1.1"], expected: false },
      { currentVersion: "1.0", supported: { minVer: "1.0", maxVer: undefined }, expected: true },
      { currentVersion: "1.1", supported: { minVer: "1.0", maxVer: undefined }, expected: true },
      { currentVersion: "1.0", supported: { minVer: "1.1", maxVer: undefined }, expected: false },
      { currentVersion: "1.0", supported: { minVer: undefined, maxVer: "1.1" }, expected: true },
      { currentVersion: "1.1", supported: { minVer: undefined, maxVer: "1.1" }, expected: true },
      { currentVersion: "1.2", supported: { minVer: undefined, maxVer: "1.1" }, expected: false },
    ].forEach((arg) => {
      const { currentVersion, supported, expected } = arg;
      let versions: string;
      if (supported instanceof Array) {
        versions = `[${supported.join()}]`;
      } else {
        versions = `[min ${supported.minVer ?? "<unspecified>"}, max ${
          supported.maxVer ?? "<unspecified>"
        }]`;
      }
      it(`returns ${expected} for ${currentVersion} and supported versions ${versions}`, () => {
        const result = isVersionInSupportedRange(currentVersion, supported, allVersions);
        assert.equal(result.isSupported, expected);
      });
    });
  });
});

const serviceVersions = ["7.0", "7.1"] as const;
versionsToTest(serviceVersions, {}, (serviceVersion, onVersions) => {
  describe("test suite 1", () => {
    beforeEach(async () => {
      console.log(`creating test client for service version ${serviceVersion}`);
    });

    afterEach(async () => {
      /** empty */
    });

    it("test case 2", () => {
      if (serviceVersion === "7.0") {
        console.log(`verifying behavior specific to ${serviceVersion}`);
      }
    });

    describe("nested test suite 3a", () => {
      it("nested test 4a", () => {
        /** empty */
      });
    });

    onVersions(["7.0"]).describe("nested test suite 3b", () => {
      it("nested test 4b", () => {
        assert.equal(serviceVersion, "7.0");
      });
    });

    onVersions(["7.0"]).it("test case 5 only runs on 7.0", () => {
      assert.equal(serviceVersion, "7.0");
    });

    onVersions({ minVer: "7.1" }).it("test case 6 only runs on 7.1", async () => {
      assert.notEqual(serviceVersion, "7.0");
    });

    onVersions({ minVer: "7.1" }).it.skip("test case 7 should be skipped", async () => {
      throw new Error("Test should have been skipped.");
    });
  });

  onVersions(["7.0"]).describe("test suite 2", async () => {
    console.log(`onVersions() can be added to top-level describe as well to have nicer test title`);
    it("test case 8", () => {
      assert.equal(serviceVersion, "7.0");
    });
  });
});
