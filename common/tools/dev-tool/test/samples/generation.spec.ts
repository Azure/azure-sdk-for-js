// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import semver from "semver";
import { createPackageJson } from "../../src/util/samples/generation.ts";
import { MIN_SUPPORTED_NODE_VERSION } from "../../src/util/samples/configuration.ts";
import type { SampleGenerationInfo } from "../../src/util/samples/info.ts";
import { OutputKind } from "../../src/util/samples/info.ts";

const info: SampleGenerationInfo = {
  baseName: "example",
  productName: "Example",
  projectRepoPath: "sdk/example/example",
  packageKeywords: [],
  sampleSourcesPath: "",
  topLevelDirectory: "",
  moduleInfos: [],
  computeSampleDependencies: () => ({ dependencies: {} }),
};

describe("sample Node.js engine requirements", () => {
  for (const kind of [OutputKind.JavaScript, OutputKind.TypeScript]) {
    it(`preserves the shared default for ${kind} samples without an override`, () => {
      expect(createPackageJson(info, kind)).toHaveProperty(
        "engines.node",
        `>=${MIN_SUPPORTED_NODE_VERSION}`,
      );
    });

    it(`preserves per-major security floors for ${kind} samples`, () => {
      const nodeEngine = "^22.23.4 || ^24.22.1 || >=26.12.1";
      expect(createPackageJson({ ...info, nodeEngine }, kind)).toHaveProperty(
        "engines.node",
        nodeEngine,
      );
      for (const version of ["22.23.4", "22.24.0", "24.22.1", "24.23.0", "26.12.1"]) {
        expect(semver.satisfies(version, nodeEngine), version).toBe(true);
      }
      for (const version of ["22.23.3", "24.22.0", "26.12.0", "20.20.0", "23.11.1", "25.9.0"]) {
        expect(semver.satisfies(version, nodeEngine), version).toBe(false);
      }
    });

    it(`rejects an invalid engine override for ${kind} samples`, () => {
      for (const nodeEngine of ["not-a-version", "", " "]) {
        expect(() => createPackageJson({ ...info, nodeEngine }, kind)).toThrow(
          "Invalid sample Node.js engine range",
        );
      }
    });
  }
});
