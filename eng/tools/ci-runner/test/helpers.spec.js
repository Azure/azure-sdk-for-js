// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import { assert, describe, it } from "vitest";
import {
  getFilteredPackages,
  reducedDependencyTestMatrix,
  restrictedToPackages,
} from "../src/helpers.js";

describe("getDirectionMappedPackages", () => {
  describe("build", () => {
    it("should use reduced core scope for changed core package", () => {
      const changed = ["@azure/core-client"];
      const mapped = getFilteredPackages(changed, "build", ["core"]);
      const expected = reducedDependencyTestMatrix["core"].map((p) =>
        restrictedToPackages.includes(p) ? `${p}...` : `...${p}...`,
      );
      expected.unshift("@azure/core-client...");

      assert.deepStrictEqual(mapped, expected);
    });

    it("it uses --from when building a normal package", () => {
      const changed = ["@azure/app-configuration"];
      const mapped = getFilteredPackages(changed, "build", ["appconfiguration"]);

      assert.deepStrictEqual(mapped, ["...@azure/app-configuration..."]);
    });

    it("it uses --impacted-by when doing subsequent build tasks like build:test", () => {
      const changed = ["@azure/storage-blob"];
      const mapped = getFilteredPackages(changed, "build:test", ["storage"]);

      assert.deepStrictEqual(mapped, ["...@azure/storage-blob..."]);
    });

    it("should use --to and --from for mixed packages", () => {
      const changed = ["@azure/core-rest-pipeline", "@azure/app-configuration"];
      const mapped = getFilteredPackages(changed, "build", ["core", "appconfiguration"]);
      const expected = reducedDependencyTestMatrix["core"].map((p) =>
        restrictedToPackages.includes(p) ? `${p}...` : `...${p}...`,
      );

      expected.unshift("...@azure/app-configuration...");
      expected.unshift("@azure/core-rest-pipeline...");

      assert.deepStrictEqual(mapped, expected);
    });
  });

  describe("test commands", () => {
    it("should use the reduced dependency matrix plus --only when testing a core package", () => {
      const changed = ["@azure/core-client"];
      const mapped = getFilteredPackages(changed, "unit-test", ["core"]);
      const expected = reducedDependencyTestMatrix["core"].map((p) => `${p}`);

      expected.unshift("@azure/core-client");

      assert.deepStrictEqual(mapped, expected);
    });

    it("it uses only when testing a normal package", () => {
      const packages = ["@azure/app-configuration"];
      const mapped = getFilteredPackages(packages, "unit-test", ["appconfiguration"]);

      assert.deepStrictEqual(mapped, ["@azure/app-configuration"]);
    });

    it("should run only when testing two or more service dirs for non-restricted packages", () => {
      const packages = ["@azure/app-configuration", "@azure/storage-blob"];
      const mapped = getFilteredPackages(packages, "unit-test", ["appconfiguration", "storage"]);

      assert.deepStrictEqual(mapped, ["@azure/app-configuration", "@azure/storage-blob"]);
    });

    it("should run impacted-by for changed non-restricted package", () => {
      const packages = ["@azure/app-configuration", "@azure/storage-blob"];
      const mapped = getFilteredPackages(packages, "test", ["appconfiguration", "storage"], {
        changedPackages: new Set(["@azure/storage-blob"]),
        diff: {
          changedFiles: [], // not used
          changedServices: [], // not used
        },
      });

      assert.deepStrictEqual(mapped, ["@azure/app-configuration", "...@azure/storage-blob"]);
    });
  });
});
