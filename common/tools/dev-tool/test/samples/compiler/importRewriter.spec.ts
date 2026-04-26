// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import ts from "typescript";
import { rewriteImports } from "../../../src/util/samples/compiler/importRewriter.js";
import type { ClassifiedImport, ImportCategory } from "../../../src/util/samples/compiler/types.js";
import { CompilerError } from "../../../src/util/samples/compiler/types.js";
import {
  createAnalyzer,
  resolveNamesToSymbols,
  type BindingAnalyzer,
} from "../../../src/util/samples/compiler/bindingAnalyzer.js";
import { printNode, parseSource } from "./helpers.js";

/**
 * Create a single analyzer from all import strings and classify each import.
 * All imports come from one source file so symbols resolve correctly.
 */
function setupImports(
  importStrs: string[],
  categories: ImportCategory[],
): { classified: ClassifiedImport[]; analyzer: BindingAnalyzer } {
  const source = importStrs.join("\n");
  const analyzer = createAnalyzer(source, "test.ts");
  const imports = analyzer.sourceFile.statements.filter(ts.isImportDeclaration);
  const classified = imports.map((node, i) => ({
    node,
    category: categories[i],
    moduleSpecifier: (node.moduleSpecifier as ts.StringLiteral).text,
  }));
  return { classified, analyzer };
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
const NO_DEAD = new Set<ts.Symbol>();

describe("rewriteImports", () => {
  // 1. Source code rewrite
  it("rewrites source code import specifier to packageName", () => {
    const { classified, analyzer } = setupImports(
      ['import { Client } from "../src/index.js";'],
      ["sourceCode"],
    );
    const { imports } = rewriteImports(classified, PKG, NO_DEAD, analyzer);
    const printed = printAll(imports);
    expect(printed).toContainEqual(expect.stringContaining(`from "${PKG}"`));
    expect(printed).toContainEqual(expect.stringContaining("Client"));
  });

  // 2. Multiple source imports merged
  it("merges multiple sourceCode imports into one", () => {
    const { classified, analyzer } = setupImports(
      ['import { A } from "../src/index.js";', 'import { B } from "../src/models.js";'],
      ["sourceCode", "sourceCode"],
    );
    const { imports } = rewriteImports(classified, PKG, NO_DEAD, analyzer);
    // Should have exactly one import from PKG
    const pkgImports = imports.filter((d) => (d.moduleSpecifier as ts.StringLiteral).text === PKG);
    expect(pkgImports).toHaveLength(1);
    const text = printImport(pkgImports[0]);
    expect(text).toContain("A");
    expect(text).toContain("B");
  });

  // 3. Test import removed
  it("removes test imports entirely", () => {
    const { classified, analyzer } = setupImports(
      ['import { describe, it } from "vitest";'],
      ["test"],
    );
    const { imports } = rewriteImports(classified, PKG, NO_DEAD, analyzer);
    const texts = printAll(imports);
    expect(texts.some((t) => t.includes("vitest"))).toBe(false);
  });

  // 4. External kept
  it("keeps external imports unchanged", () => {
    const { classified, analyzer } = setupImports(
      ['import { DefaultAzureCredential } from "@azure/identity";'],
      ["external"],
    );
    const { imports } = rewriteImports(classified, PKG, NO_DEAD, analyzer);
    const texts = printAll(imports);
    expect(texts).toContainEqual(expect.stringContaining("@azure/identity"));
    expect(texts).toContainEqual(expect.stringContaining("DefaultAzureCredential"));
  });

  // 5. Local helper kept
  it("keeps local helper imports", () => {
    const { classified, analyzer } = setupImports(
      ['import { setup } from "./setup.js";'],
      ["localHelper"],
    );
    const { imports } = rewriteImports(classified, PKG, NO_DEAD, analyzer);
    const texts = printAll(imports);
    expect(texts).toContainEqual(expect.stringContaining("./setup.js"));
  });

  // 6. Data file kept (with import assertion)
  it("keeps data file imports with assertions", () => {
    const { classified, analyzer } = setupImports(
      ['import data from "./data.json" with { type: "json" };'],
      ["dataFile"],
    );
    const { imports } = rewriteImports(classified, PKG, NO_DEAD, analyzer);
    const texts = printAll(imports);
    expect(texts).toContainEqual(expect.stringContaining("./data.json"));
    expect(texts).toContainEqual(expect.stringContaining("data"));
  });

  // 7. Dead binding removal from non-test import (partial)
  it("removes dead bindings from named imports", () => {
    const { classified, analyzer } = setupImports(
      ['import { live, dead } from "@azure/identity";'],
      ["external"],
    );
    const deadSymbols = resolveNamesToSymbols(analyzer, new Set(["dead"]));
    const { imports } = rewriteImports(classified, PKG, deadSymbols, analyzer);
    const texts = printAll(imports);
    const identityImport = texts.find((t) => t.includes("@azure/identity"));
    expect(identityImport).toBeDefined();
    expect(identityImport).toContain("live");
    expect(identityImport).not.toContain("dead");
  });

  // 8. All bindings dead in non-test import → removed
  it("removes import entirely when all bindings are dead", () => {
    const { classified, analyzer } = setupImports(
      ['import { dead1, dead2 } from "@azure/identity";'],
      ["external"],
    );
    const deadSymbols = resolveNamesToSymbols(analyzer, new Set(["dead1", "dead2"]));
    const { imports } = rewriteImports(classified, PKG, deadSymbols, analyzer);
    const texts = printAll(imports);
    expect(texts.some((t) => t.includes("@azure/identity"))).toBe(false);
  });

  // 9. dotenv/config passed through when present
  it("passes through dotenv/config from source file", () => {
    const { classified, analyzer } = setupImports(
      ['import "dotenv/config";', 'import { Client } from "../src/index.js";'],
      ["external", "sourceCode"],
    );
    const { imports } = rewriteImports(classified, PKG, NO_DEAD, analyzer);
    const dotenvCount = imports.filter(
      (d) => (d.moduleSpecifier as ts.StringLiteral).text === "dotenv/config",
    ).length;
    expect(dotenvCount).toBe(1);
  });

  it("does not auto-inject dotenv/config when not present", () => {
    const { classified, analyzer } = setupImports(
      ['import { Client } from "../src/index.js";'],
      ["sourceCode"],
    );
    const { imports } = rewriteImports(classified, PKG, NO_DEAD, analyzer);
    const texts = printAll(imports);
    expect(texts).not.toContainEqual(expect.stringContaining("dotenv/config"));
  });

  // 11. Side-effect external import kept
  it("keeps side-effect external imports", () => {
    const { classified, analyzer } = setupImports(['import "some-polyfill";'], ["external"]);
    const { imports } = rewriteImports(classified, PKG, NO_DEAD, analyzer);
    const texts = printAll(imports);
    expect(texts).toContainEqual(expect.stringContaining("some-polyfill"));
  });

  // 12. Side-effect test import removed
  it("removes side-effect test imports", () => {
    const { classified, analyzer } = setupImports(['import "@azure-tools/test-utils";'], ["test"]);
    const { imports } = rewriteImports(classified, PKG, NO_DEAD, analyzer);
    const texts = printAll(imports);
    expect(texts.some((t) => t.includes("@azure-tools/test-utils"))).toBe(false);
  });

  // 13. Sort order: external before local, alphabetical
  it("sorts external/package imports before local imports", () => {
    const { classified, analyzer } = setupImports(
      [
        'import { setup } from "./setup.js";',
        'import { A } from "@azure/identity";',
        'import { Client } from "../src/index.js";',
      ],
      ["localHelper", "external", "sourceCode"],
    );
    const { imports } = rewriteImports(classified, PKG, NO_DEAD, analyzer);
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
    const { classified, analyzer } = setupImports(
      ['import Client from "../src/index.js";'],
      ["sourceCode"],
    );
    const { imports } = rewriteImports(classified, PKG, NO_DEAD, analyzer);
    const texts = printAll(imports);
    expect(texts).toContainEqual(expect.stringContaining(`from "${PKG}"`));
    expect(texts).toContainEqual(expect.stringContaining("Client"));
  });

  // 15. Namespace import rewrite
  it("rewrites namespace import specifier to packageName", () => {
    const { classified, analyzer } = setupImports(
      ['import * as SDK from "../src/index.js";'],
      ["sourceCode"],
    );
    const { imports } = rewriteImports(classified, PKG, NO_DEAD, analyzer);
    const texts = printAll(imports);
    expect(texts).toContainEqual(expect.stringContaining(`from "${PKG}"`));
    expect(texts).toContainEqual(expect.stringContaining("* as SDK"));
  });

  // 16. Type-only test import removed
  it("removes type-only test imports", () => {
    const { classified, analyzer } = setupImports(['import type { Foo } from "vitest";'], ["test"]);
    const { imports } = rewriteImports(classified, PKG, NO_DEAD, analyzer);
    const texts = printAll(imports);
    expect(texts.some((t) => t.includes("vitest"))).toBe(false);
  });

  // 17. Empty input → empty output
  it("returns empty imports for empty input", () => {
    const { analyzer } = setupImports([], []);
    const { imports } = rewriteImports([], PKG, NO_DEAD, analyzer);
    expect(imports).toHaveLength(0);
  });

  // 18. Mixed test and non-test
  it("handles mixed test and non-test imports correctly", () => {
    const { classified, analyzer } = setupImports(
      [
        'import { describe, it } from "vitest";',
        'import { DefaultAzureCredential } from "@azure/identity";',
        'import { Client } from "../src/index.js";',
        'import { setup } from "./setup.js";',
        'import "@azure-tools/test-utils";',
      ],
      ["test", "external", "sourceCode", "localHelper", "test"],
    );

    const { imports } = rewriteImports(classified, PKG, NO_DEAD, analyzer);
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

  // 19. Default + named source imports merged into one statement
  it("merges default and named source imports into a single statement", () => {
    const { classified, analyzer } = setupImports(
      ['import Client, { Foo, Bar } from "../src/index.js";'],
      ["sourceCode"],
    );
    const { imports } = rewriteImports(classified, PKG, NO_DEAD, analyzer);
    const texts = printAll(imports);

    // Should produce exactly one import
    expect(texts).toHaveLength(1);
    // That import should have both the default and named bindings
    expect(texts[0]).toContain("Client");
    expect(texts[0]).toContain("Foo");
    expect(texts[0]).toContain("Bar");
    expect(texts[0]).toContain(PKG);
  });

  // 20. Default-only source import still works alone
  it("emits standalone default import when no named imports exist", () => {
    const { classified, analyzer } = setupImports(
      ['import Client from "../src/index.js";'],
      ["sourceCode"],
    );
    const { imports } = rewriteImports(classified, PKG, NO_DEAD, analyzer);
    const texts = printAll(imports);

    expect(texts).toHaveLength(1);
    expect(texts[0]).toContain("Client");
    expect(texts[0]).toContain(PKG);
  });

  // Side-effect source imports
  it("preserves side-effect source import rewritten to package name", () => {
    const { classified, analyzer } = setupImports(['import "./types/index.js";'], ["sourceCode"]);
    const { imports } = rewriteImports(classified, PKG, NO_DEAD, analyzer);
    const texts = printAll(imports);
    expect(texts).toHaveLength(1);
    expect(texts[0]).toContain(PKG);
    // Should be a bare side-effect import (no bindings)
    expect(texts[0]).not.toContain("from");
  });

  it("side-effect source import does not interfere with named source merging", () => {
    const { classified, analyzer } = setupImports(
      ['import { Foo } from "../src/models.js";', 'import "./types/index.js";'],
      ["sourceCode", "sourceCode"],
    );
    const { imports } = rewriteImports(classified, PKG, NO_DEAD, analyzer);
    const texts = printAll(imports);
    // Should have both a named import and a side-effect import
    expect(texts).toHaveLength(2);
    expect(texts).toContainEqual(expect.stringContaining("Foo"));
    // One should be a side-effect import (no "from")
    const sideEffect = texts.find((t) => !t.includes("from"));
    expect(sideEffect).toBeDefined();
    expect(sideEffect).toContain(PKG);
  });

  // Deduplication of merged source imports
  describe("deduplication of merged source imports", () => {
    it("deduplicates same named import from multiple source files", () => {
      const { classified, analyzer } = setupImports(
        ['import { Foo } from "../src/index.js";', 'import { Foo } from "../src/models.js";'],
        ["sourceCode", "sourceCode"],
      );
      const { imports } = rewriteImports(classified, PKG, NO_DEAD, analyzer);
      const pkgImports = imports.filter(
        (d) => (d.moduleSpecifier as ts.StringLiteral).text === PKG,
      );
      expect(pkgImports).toHaveLength(1);
      const text = printImport(pkgImports[0]);
      // Should contain exactly one Foo, not "Foo, Foo"
      const matches = text.match(/\bFoo\b/g);
      expect(matches).toHaveLength(1);
    });

    it("deduplicates aliased import when alias matches", () => {
      const { classified, analyzer } = setupImports(
        [
          'import { Foo as Bar } from "../src/index.js";',
          'import { Foo as Bar } from "../src/models.js";',
        ],
        ["sourceCode", "sourceCode"],
      );
      const { imports } = rewriteImports(classified, PKG, NO_DEAD, analyzer);
      const pkgImports = imports.filter(
        (d) => (d.moduleSpecifier as ts.StringLiteral).text === PKG,
      );
      expect(pkgImports).toHaveLength(1);
      const text = printImport(pkgImports[0]);
      const matches = text.match(/\bBar\b/g);
      expect(matches).toHaveLength(1);
    });

    it("keeps different names from multiple source files", () => {
      const { classified, analyzer } = setupImports(
        ['import { Foo } from "../src/index.js";', 'import { Bar } from "../src/models.js";'],
        ["sourceCode", "sourceCode"],
      );
      const { imports } = rewriteImports(classified, PKG, NO_DEAD, analyzer);
      const pkgImports = imports.filter(
        (d) => (d.moduleSpecifier as ts.StringLiteral).text === PKG,
      );
      expect(pkgImports).toHaveLength(1);
      const text = printImport(pkgImports[0]);
      expect(text).toContain("Foo");
      expect(text).toContain("Bar");
    });

    it("deduplicates type-only specifiers separately", () => {
      const { classified, analyzer } = setupImports(
        [
          'import type { MyType } from "../src/index.js";',
          'import type { MyType } from "../src/models.js";',
        ],
        ["sourceCode", "sourceCode"],
      );
      const { imports } = rewriteImports(classified, PKG, NO_DEAD, analyzer);
      const pkgImports = imports.filter(
        (d) => (d.moduleSpecifier as ts.StringLiteral).text === PKG,
      );
      expect(pkgImports).toHaveLength(1);
      const text = printImport(pkgImports[0]);
      const matches = text.match(/\bMyType\b/g);
      expect(matches).toHaveLength(1);
      expect(text).toContain("import type");
    });
  });

  describe("symbol-based pruning", () => {
    // 21. Aliased import: dead by local alias symbol
    it("prunes aliased import when the local alias symbol is dead", () => {
      const { classified, analyzer } = setupImports(
        ['import { Foo as Bar } from "@azure/identity";'],
        ["external"],
      );
      // "Bar" is the local binding name — resolveNamesToSymbols matches sym.name
      const deadSymbols = resolveNamesToSymbols(analyzer, new Set(["Bar"]));
      expect(deadSymbols.size).toBe(1);

      const { imports } = rewriteImports(classified, PKG, deadSymbols, analyzer);
      const texts = printAll(imports);
      // The entire import should be removed because the only binding (Bar) is dead
      expect(texts.some((t) => t.includes("@azure/identity"))).toBe(false);
    });

    // 22. Aliased import: only original survives when alias is dead
    it("keeps surviving specifiers when only the aliased binding is dead", () => {
      const { classified, analyzer } = setupImports(
        ['import { Foo as Bar, Baz } from "@azure/identity";'],
        ["external"],
      );
      // Mark only Bar as dead — Baz should survive
      const deadSymbols = resolveNamesToSymbols(analyzer, new Set(["Bar"]));
      expect(deadSymbols.size).toBe(1);

      const { imports } = rewriteImports(classified, PKG, deadSymbols, analyzer);
      const texts = printAll(imports);
      const identityImport = texts.find((t) => t.includes("@azure/identity"));
      expect(identityImport).toBeDefined();
      expect(identityImport).toContain("Baz");
      expect(identityImport).not.toContain("Bar");
    });

    // 23. Same-name imports from different modules resolved by symbol identity
    it("prunes by symbol identity, not by name string", () => {
      const { classified, analyzer } = setupImports(
        ['import { Thing } from "@azure/identity";', 'import { Thing } from "./helper.js";'],
        ["external", "localHelper"],
      );

      // Get the symbol from only the first import (identity Thing)
      const firstImport = analyzer.sourceFile.statements.filter(ts.isImportDeclaration)[0];
      const identitySymbols = analyzer.getImportBindingSymbols(firstImport);
      expect(identitySymbols).toHaveLength(1);

      const deadSymbols = new Set<ts.Symbol>(identitySymbols);

      const { imports } = rewriteImports(classified, PKG, deadSymbols, analyzer);
      const texts = printAll(imports);

      // identity import should be pruned (all bindings dead)
      expect(texts.some((t) => t.includes("@azure/identity"))).toBe(false);
      // helper import should survive — different symbol despite same name
      expect(texts).toContainEqual(expect.stringContaining("./helper.js"));
      expect(texts).toContainEqual(expect.stringContaining("Thing"));
    });
  });

  // ── F5: Type-only default source import ──────────────────────────────

  it("rewrites type-only default source import to package name", () => {
    const { classified, analyzer } = setupImports(
      ['import type Foo from "../src/index.js";'],
      ["sourceCode"],
    );
    const { imports } = rewriteImports(classified, PKG, NO_DEAD, analyzer);
    const texts = printAll(imports);
    expect(texts).toHaveLength(1);
    expect(texts[0]).toContain("import type");
    expect(texts[0]).toContain("Foo");
    expect(texts[0]).toContain(`from "${PKG}"`);
  });

  // ── F6: Side-effect import ordering ─────────────────────────────────

  it("preserves side-effect import order before sorted declarative imports", () => {
    const { classified, analyzer } = setupImports(
      ['import "z-polyfill";', 'import "a-polyfill";', 'import { Foo } from "@azure/identity";'],
      ["external", "external", "external"],
    );
    const { imports } = rewriteImports(classified, PKG, NO_DEAD, analyzer);
    const texts = printAll(imports);

    const zIdx = texts.findIndex((t) => t.includes("z-polyfill"));
    const aIdx = texts.findIndex((t) => t.includes("a-polyfill"));
    const fooIdx = texts.findIndex((t) => t.includes("@azure/identity"));

    // Side-effect imports preserve original order (z before a)
    expect(zIdx).toBeLessThan(aIdx);
    // Side-effect imports come before declarative imports
    expect(aIdx).toBeLessThan(fooIdx);
  });

  // ── F8: Multiple default source imports ─────────────────────────────

  it("throws CompilerError for multiple default source imports", () => {
    const { classified, analyzer } = setupImports(
      ['import A from "../src/index.js";', 'import B from "../src/models.js";'],
      ["sourceCode", "sourceCode"],
    );
    expect(() => rewriteImports(classified, PKG, NO_DEAD, analyzer)).toThrow(CompilerError);
    expect(() => rewriteImports(classified, PKG, NO_DEAD, analyzer)).toThrow(/[Mm]ultiple default/);
  });
});
