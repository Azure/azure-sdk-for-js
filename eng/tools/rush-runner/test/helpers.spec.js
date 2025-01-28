// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import { assert, describe, it } from "vitest";
import {
  getDirectionMappedPackages,
  reducedDependencyTestMatrix,
  restrictedToPackages,
} from "../src/helpers.js";

describe("getDirectionMappedPackages", () => {
  describe("build", () => {
    it("should use --to reduced core scope for changed core package", () => {
      const changed = ["@azure/core-client"];
      const mapped = getDirectionMappedPackages(changed, "build", ["core"]);
      const expected = reducedDependencyTestMatrix["core"].map((p) => [
        restrictedToPackages.includes(p) ? "--to" : "--from",
        p,
      ]);
      expected.unshift(["--to", "@azure/core-client"]);

      assert.deepStrictEqual(mapped, expected);
    });

    it("it uses --from when building a normal package", () => {
      const changed = ["@azure/app-configuration"];
      const mapped = getDirectionMappedPackages(changed, "build", ["appconfiguration"]);

      assert.deepStrictEqual(mapped, [["--from", "@azure/app-configuration"]]);
    });

    it("it uses --impacted-by when doing subsequent build tasks like build:test", () => {
      const changed = ["@azure/storage-blob"];
      const mapped = getDirectionMappedPackages(changed, "build:test", ["storage"]);

      assert.deepStrictEqual(mapped, [["--impacted-by", "@azure/storage-blob"]]);
    });

    it("should use --to and --from for mixed packages", () => {
      const changed = ["@azure/core-rest-pipeline", "@azure/app-configuration"];
      const mapped = getDirectionMappedPackages(changed, "build", ["core", "appconfiguration"]);
      const expected = reducedDependencyTestMatrix["core"].map((p) => [
        restrictedToPackages.includes(p) ? "--to" : "--from",
        p,
      ]);
      expected.unshift(["--from", "@azure/app-configuration"]);
      expected.unshift(["--to", "@azure/core-rest-pipeline"]);
      assert.deepStrictEqual(mapped, expected);
    });
  });

  describe("test commands", () => {
    it("should use the reduced dependency matrix plus --only when testing a core package", () => {
      const changed = ["@azure/core-client"];
      const mapped = getDirectionMappedPackages(changed, "unit-test", ["core"]);
      const expected = reducedDependencyTestMatrix["core"].map((p) => ["--only", p]);
      expected.unshift(["--only", "@azure/core-client"]);

      assert.deepStrictEqual(mapped, expected);
    });

    it("it uses --impacted-by when testing a normal package", () => {
      const changed = ["@azure/app-configuration"];
      const mapped = getDirectionMappedPackages(changed, "unit-test", ["appconfiguration"]);

      assert.deepStrictEqual(mapped, [["--impacted-by", "@azure/app-configuration"]]);
    });

    it("should use --only when testing two or more service dirs", () => {
      const changed = ["@azure/app-configuration", "@azure/storage-blob"];
      const mapped = getDirectionMappedPackages(changed, "unit-test", [
        "appconfiguration",
        "storage",
      ]);

      assert.deepStrictEqual(mapped, [
        ["--only", "@azure/app-configuration"],
        ["--only", "@azure/storage-blob"],
      ]);
    });
  });
});
