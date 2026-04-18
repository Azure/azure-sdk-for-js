// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import ts from "typescript";
import { rewriteImports } from "../../../src/util/samples/compiler/importRewriter.js";
import type { ClassifiedImport, ImportCategory } from "../../../src/util/samples/compiler/types.js";
import { parseSource, getImports, printNode } from "./helpers.js";

/** Helper: parse one import and wrap it as a ClassifiedImport. */
function makeClassified(importStr: string, category: ImportCategory): ClassifiedImport {
  const sf = parseSource(importStr);
  const node = getImports(sf)[0];
  const specifier = (node.moduleSpecifier as ts.StringLiteral).text;
  return { node, category, moduleSpecifier: specifier };
}

/** Print an ImportDeclaration to a normalised string for comparison. */
function printImport(decl: ts.ImportDeclaration): string {
  const sf = parseSource("");
  return printNode(decl, sf).replace(/\s+/g, " ").trim();
}

/** Convenience: get all printed import strings from a RewriteResult. */
function printAll(decls: ts.ImportDeclaration[]): string[] {
  return decls.map(printImport);
}

const PKG = "@azure/storage-blob";

describe("rewriteImports", () => {
  // 1. Source code rewrite
  it("rewrites source code import specifier to packageName", () => {
    const ci = makeClassified('import { Client } from "../src/index.js";', "sourceCode");
    const { imports } = rewriteImports([ci], PKG, new Set());
    const printed = printAll(imports);
    expect(printed).toContainEqual(expect.stringContaining(`from "${PKG}"`));
    expect(printed).toContainEqual(expect.stringContaining("Client"));
  });

  // 2. Multiple source imports merged
  it("merges multiple sourceCode imports into one", () => {
    const ci1 = makeClassified('import { A } from "../src/index.js";', "sourceCode");
    const ci2 = makeClassified('import { B } from "../src/models.js";', "sourceCode");
    const { imports } = rewriteImports([ci1, ci2], PKG, new Set());
    // Should have exactly one import from PKG
    const pkgImports = imports.filter(
      (d) => (d.moduleSpecifier as ts.StringLiteral).text === PKG,
    );
    expect(pkgImports).toHaveLength(1);
    const text = printImport(pkgImports[0]);
    expect(text).toContain("A");
    expect(text).toContain("B");
  });

  // 3. Test import removed
  it("removes test imports entirely", () => {
    const ci = makeClassified('import { describe, it } from "vitest";', "test");
    const { imports } = rewriteImports([ci], PKG, new Set());
    const texts = printAll(imports);
    expect(texts.some((t) => t.includes("vitest"))).toBe(false);
  });

  // 4. External kept
  it("keeps external imports unchanged", () => {
    const ci = makeClassified(
      'import { DefaultAzureCredential } from "@azure/identity";',
      "external",
    );
    const { imports } = rewriteImports([ci], PKG, new Set());
    const texts = printAll(imports);
    expect(texts).toContainEqual(expect.stringContaining("@azure/identity"));
    expect(texts).toContainEqual(expect.stringContaining("DefaultAzureCredential"));
  });

  // 5. Local helper kept
  it("keeps local helper imports", () => {
    const ci = makeClassified('import { setup } from "./setup.js";', "localHelper");
    const { imports } = rewriteImports([ci], PKG, new Set());
    const texts = printAll(imports);
    expect(texts).toContainEqual(expect.stringContaining("./setup.js"));
  });

  // 6. Data file kept (with import assertion)
  it("keeps data file imports with assertions", () => {
    const ci = makeClassified(
      'import data from "./data.json" with { type: "json" };',
      "dataFile",
    );
    const { imports } = rewriteImports([ci], PKG, new Set());
    const texts = printAll(imports);
    expect(texts).toContainEqual(expect.stringContaining("./data.json"));
    expect(texts).toContainEqual(expect.stringContaining("data"));
  });

  // 7. Dead binding removal from non-test import (partial)
  it("removes dead bindings from named imports", () => {
    const ci = makeClassified('import { live, dead } from "@azure/identity";', "external");
    const { imports } = rewriteImports([ci], PKG, new Set(["dead"]));
    const texts = printAll(imports);
    const identityImport = texts.find((t) => t.includes("@azure/identity"));
    expect(identityImport).toBeDefined();
    expect(identityImport).toContain("live");
    expect(identityImport).not.toContain("dead");
  });

  // 8. All bindings dead in non-test import → removed
  it("removes import entirely when all bindings are dead", () => {
    const ci = makeClassified('import { dead1, dead2 } from "@azure/identity";', "external");
    const { imports } = rewriteImports([ci], PKG, new Set(["dead1", "dead2"]));
    const texts = printAll(imports);
    expect(texts.some((t) => t.includes("@azure/identity"))).toBe(false);
  });

  // 9. dotenv/config passed through when present
  it("passes through dotenv/config from source file", () => {
    const ci1 = makeClassified('import "dotenv/config";', "external");
    const ci2 = makeClassified('import { Client } from "../src/index.js";', "sourceCode");
    const { imports } = rewriteImports([ci1, ci2], PKG, new Set());
    const dotenvCount = imports.filter(
      (d) => (d.moduleSpecifier as ts.StringLiteral).text === "dotenv/config",
    ).length;
    expect(dotenvCount).toBe(1);
  });

  it("does not auto-inject dotenv/config when not present", () => {
    const ci = makeClassified('import { Client } from "../src/index.js";', "sourceCode");
    const { imports } = rewriteImports([ci], PKG, new Set());
    const texts = printAll(imports);
    expect(texts).not.toContainEqual(expect.stringContaining("dotenv/config"));
  });

  // 11. Side-effect external import kept
  it("keeps side-effect external imports", () => {
    const ci = makeClassified('import "some-polyfill";', "external");
    const { imports } = rewriteImports([ci], PKG, new Set());
    const texts = printAll(imports);
    expect(texts).toContainEqual(expect.stringContaining("some-polyfill"));
  });

  // 12. Side-effect test import removed
  it("removes side-effect test imports", () => {
    const ci = makeClassified('import "@azure-tools/test-utils";', "test");
    const { imports } = rewriteImports([ci], PKG, new Set());
    const texts = printAll(imports);
    expect(texts.some((t) => t.includes("@azure-tools/test-utils"))).toBe(false);
  });

  // 13. Sort order: external before local, alphabetical
  it("sorts external/package imports before local imports", () => {
    const ext = makeClassified('import { A } from "@azure/identity";', "external");
    const local = makeClassified('import { setup } from "./setup.js";', "localHelper");
    const src = makeClassified('import { Client } from "../src/index.js";', "sourceCode");
    const { imports } = rewriteImports([local, ext, src], PKG, new Set());
    const texts = printAll(imports);

    // Find indices
    const identityIdx = texts.findIndex((t) => t.includes("@azure/identity"));
    const pkgIdx = texts.findIndex((t) => t.includes(PKG));
    const setupIdx = texts.findIndex((t) => t.includes("./setup.js"));

    // External/package before local
    expect(identityIdx).toBeLessThan(setupIdx);
    expect(pkgIdx).toBeLessThan(setupIdx);
  });

  // 14. Default import rewrite
  it("rewrites default import specifier to packageName", () => {
    const ci = makeClassified('import Client from "../src/index.js";', "sourceCode");
    const { imports } = rewriteImports([ci], PKG, new Set());
    const texts = printAll(imports);
    expect(texts).toContainEqual(expect.stringContaining(`from "${PKG}"`));
    expect(texts).toContainEqual(expect.stringContaining("Client"));
  });

  // 15. Namespace import rewrite
  it("rewrites namespace import specifier to packageName", () => {
    const ci = makeClassified('import * as SDK from "../src/index.js";', "sourceCode");
    const { imports } = rewriteImports([ci], PKG, new Set());
    const texts = printAll(imports);
    expect(texts).toContainEqual(expect.stringContaining(`from "${PKG}"`));
    expect(texts).toContainEqual(expect.stringContaining("* as SDK"));
  });

  // 16. Type-only test import removed
  it("removes type-only test imports", () => {
    const ci = makeClassified('import type { Foo } from "vitest";', "test");
    const { imports } = rewriteImports([ci], PKG, new Set());
    const texts = printAll(imports);
    expect(texts.some((t) => t.includes("vitest"))).toBe(false);
  });

  // 17. Empty input → just dotenv/config
  it("returns empty imports for empty input", () => {
    const { imports } = rewriteImports([], PKG, new Set());
    expect(imports).toHaveLength(0);
  });

  // 18. Mixed test and non-test
  it("handles mixed test and non-test imports correctly", () => {
    const test1 = makeClassified('import { describe, it } from "vitest";', "test");
    const ext = makeClassified('import { DefaultAzureCredential } from "@azure/identity";', "external");
    const src = makeClassified('import { Client } from "../src/index.js";', "sourceCode");
    const local = makeClassified('import { setup } from "./setup.js";', "localHelper");
    const test2 = makeClassified('import "@azure-tools/test-utils";', "test");

    const { imports } = rewriteImports([test1, ext, src, local, test2], PKG, new Set());
    const texts = printAll(imports);

    // Test imports gone
    expect(texts.some((t) => t.includes("vitest"))).toBe(false);
    expect(texts.some((t) => t.includes("@azure-tools/test-utils"))).toBe(false);

    // Others present
    expect(texts).toContainEqual(expect.stringContaining("@azure/identity"));
    expect(texts).toContainEqual(expect.stringContaining(PKG));
    expect(texts).toContainEqual(expect.stringContaining("./setup.js"));

    // dotenv not auto-injected
    expect(texts).not.toContainEqual(expect.stringContaining("dotenv/config"));
  });
});
