// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import {
  classifyImport,
  classifyImports,
} from "../../../src/util/samples/compiler/importClassifier.js";
import { parseSource, getImports } from "./helpers.js";
import type { ImportCategory } from "../../../src/util/samples/compiler/types.js";

/** Helper: parse a single import statement and classify it. */
function classify(importStr: string): { category: ImportCategory; moduleSpecifier: string } {
  const sf = parseSource(importStr);
  const imports = getImports(sf);
  expect(imports).toHaveLength(1);
  const result = classifyImport(imports[0]);
  return { category: result.category, moduleSpecifier: result.moduleSpecifier };
}

describe("importClassifier", () => {
  describe("classifyImport", () => {
    // --- test category ---
    it("classifies vitest as test", () => {
      expect(classify('import { describe, it } from "vitest";').category).toBe("test");
    });

    it("classifies @azure-tools/test-recorder as test", () => {
      expect(classify('import { Recorder } from "@azure-tools/test-recorder";').category).toBe(
        "test",
      );
    });

    it("classifies @azure-tools/test-publishing as test", () => {
      expect(classify('import { something } from "@azure-tools/test-publishing";').category).toBe(
        "test",
      );
    });

    it("classifies @azure-tools/test-credential as test", () => {
      expect(
        classify('import { createTestCredential } from "@azure-tools/test-credential";').category,
      ).toBe("test");
    });

    it("classifies @azure-tools/test-utils-vitest as test", () => {
      expect(classify('import { matrix } from "@azure-tools/test-utils-vitest";').category).toBe(
        "test",
      );
    });

    it("classifies @azure-tools/test-utils as test", () => {
      expect(classify('import { delay } from "@azure-tools/test-utils";').category).toBe("test");
    });

    it("classifies hypothetical @azure-tools/test-something-new as test", () => {
      expect(classify('import { foo } from "@azure-tools/test-something-new";').category).toBe(
        "test",
      );
    });

    it("classifies type-only import from vitest as test", () => {
      expect(classify('import type { Foo } from "vitest";').category).toBe("test");
    });

    it("classifies namespace import from vitest as test", () => {
      expect(classify('import * as vitest from "vitest";').category).toBe("test");
    });

    // --- sourceCode category ---
    it("classifies ../src/index.js as sourceCode", () => {
      const r = classify('import { Client } from "../src/index.js";');
      expect(r.category).toBe("sourceCode");
      expect(r.moduleSpecifier).toBe("../src/index.js");
    });

    it("classifies ../../src/models.js as sourceCode", () => {
      expect(classify('import { Model } from "../../src/models.js";').category).toBe("sourceCode");
    });

    // --- localHelper category ---
    it("classifies ./setup.js as localHelper", () => {
      expect(classify('import { setup } from "./setup.js";').category).toBe("localHelper");
    });

    it("classifies ../helpers/auth.ts as localHelper", () => {
      expect(classify('import { auth } from "../helpers/auth.ts";').category).toBe("localHelper");
    });

    it("classifies side-effect import ./setup.js as localHelper", () => {
      expect(classify('import "./setup.js";').category).toBe("localHelper");
    });

    // --- dataFile category ---
    it("classifies ./data.json with import assertions as dataFile", () => {
      expect(classify('import data from "./data.json" assert { type: "json" };').category).toBe(
        "dataFile",
      );
    });

    it("classifies ./data.json without import assertions as dataFile", () => {
      expect(classify('import data from "./data.json";').category).toBe("dataFile");
    });

    // --- external category ---
    it("classifies @azure/identity as external", () => {
      expect(classify('import { DefaultAzureCredential } from "@azure/identity";').category).toBe(
        "external",
      );
    });

    it("classifies dotenv/config as external", () => {
      expect(classify('import "dotenv/config";').category).toBe("external");
    });

    it("classifies fs as external", () => {
      expect(classify('import { readFile } from "fs";').category).toBe("external");
    });

    it("classifies node:fs as external", () => {
      expect(classify('import { readFile } from "node:fs";').category).toBe("external");
    });

    it("classifies side-effect import dotenv/config as external", () => {
      expect(classify('import "dotenv/config";').category).toBe("external");
    });

    // --- mixed / edge cases ---
    it("classifies named + default mixed import", () => {
      expect(classify('import def, { named } from "@azure/identity";').category).toBe("external");
    });
  });

  describe("classifyImports", () => {
    it("classifies all imports in a source file", () => {
      const source = `
import { describe, it } from "vitest";
import { Client } from "../src/index.js";
import { setup } from "./setup.js";
import data from "./data.json";
import { DefaultAzureCredential } from "@azure/identity";
`;
      const sf = parseSource(source);
      const results = classifyImports(sf);
      expect(results).toHaveLength(5);
      expect(results[0].category).toBe("test");
      expect(results[1].category).toBe("sourceCode");
      expect(results[2].category).toBe("localHelper");
      expect(results[3].category).toBe("dataFile");
      expect(results[4].category).toBe("external");
    });

    it("multiple imports from same module get consistent classification", () => {
      const source = `
import { describe } from "vitest";
import { it, expect } from "vitest";
`;
      const sf = parseSource(source);
      const results = classifyImports(sf);
      expect(results).toHaveLength(2);
      expect(results[0].category).toBe("test");
      expect(results[1].category).toBe("test");
    });
  });
});
