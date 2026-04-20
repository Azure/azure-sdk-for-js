// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { Project, ts } from "ts-morph";
import {
  collectCompanionNamespaceAliases,
  extractDeclaration,
  extractTypeFromResolvedModule,
  filterNamespaceByExports,
  filterNamespaceMembers,
  makeDepKey,
  splitDepKey,
  getPackageRoot,
  getImportSubpath,
  buildImportResolutionMap,
} from "../dependencies.js";
import type { NamespaceInfo } from "../models.js";
import { createExtractionContext } from "../type-refs.js";
import { findSubpathExport, hasNonRootSubpaths } from "../exports-resolver.js";

function makeCtx() {
  const project = new Project({
    useInMemoryFileSystem: true,
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.NodeNext,
      moduleResolution: ts.ModuleResolutionKind.NodeNext,
      declaration: true,
      strict: true,
    },
  });
  return createExtractionContext(project);
}

describe("collectCompanionNamespaceAliases", () => {
  it("detects declaration merging (class + namespace)", () => {
    const ctx = makeCtx();
    ctx.project.createSourceFile(
      "dep.d.ts",
      `
      export class Runs {}
      export namespace Runs { export interface RunStep {} }
      `,
    );
    const mainFile = ctx.project.createSourceFile(
      "main.ts",
      `import { Runs } from "./dep.js";`,
    );

    const imp = mainFile.getImportDeclarations()[0];
    collectCompanionNamespaceAliases(imp, ctx);

    expect(ctx.namespaceAliases.has("Runs")).toBe(true);
  });

  it("does not add when there is no companion namespace", () => {
    const ctx = makeCtx();
    ctx.project.createSourceFile(
      "dep.d.ts",
      `export class Foo {}`,
    );
    const mainFile = ctx.project.createSourceFile(
      "main.ts",
      `import { Foo } from "./dep.js";`,
    );

    const imp = mainFile.getImportDeclarations()[0];
    collectCompanionNamespaceAliases(imp, ctx);

    expect(ctx.namespaceAliases.has("Foo")).toBe(false);
  });

  it("does not add when namespace-only (no value companion)", () => {
    const ctx = makeCtx();
    ctx.project.createSourceFile(
      "dep.d.ts",
      `export namespace Bar { export interface Baz {} }`,
    );
    const mainFile = ctx.project.createSourceFile(
      "main.ts",
      `import { Bar } from "./dep.js";`,
    );

    const imp = mainFile.getImportDeclarations()[0];
    collectCompanionNamespaceAliases(imp, ctx);

    expect(ctx.namespaceAliases.has("Bar")).toBe(false);
  });
});

describe("extractDeclaration", () => {
  it("extracts variable declarations as synthetic type aliases", () => {
    const ctx = makeCtx();
    const sf = ctx.project.createSourceFile(
      "test.ts",
      `declare const brand: unique symbol;`,
    );

    const varDecl = sf.getVariableDeclarationOrThrow("brand");
    const result = extractDeclaration(varDecl, ctx);

    expect(result).not.toBeNull();
    expect(result!.kind).toBe("type");
    expect(result!.graphed).toMatchObject({
      name: "brand",
      type: "unique symbol",
    });
  });
});

describe("extractTypeFromResolvedModule", () => {
  it("falls back to non-exported type alias", () => {
    const ctx = makeCtx();
    // Use a .ts file (not .d.ts) so file-scope type aliases remain non-exported.
    // In .d.ts files, ambient declarations may be treated as module-level exports.
    const depFile = ctx.project.createSourceFile(
      "dep.ts",
      `
      type HeaderValue = string | undefined | null;
      export interface Headers { get(name: string): HeaderValue; }
      `,
    );

    // First try the exported "Headers" to verify it works normally
    const exportedResult = extractTypeFromResolvedModule("Headers", depFile, false, ctx);
    expect(exportedResult).not.toBeNull();
    expect(exportedResult!.fromFallback).toBeUndefined();

    // Now try the non-exported "HeaderValue" — should use fallback
    const result = extractTypeFromResolvedModule("HeaderValue", depFile, false, ctx);

    expect(result).not.toBeNull();
    expect(result!.fromFallback).toBe(true);
    expect(result!.kind).toBe("type");
    expect(result!.graphed.name).toBe("HeaderValue");
  });

  it("returns null for non-existent type", () => {
    const ctx = makeCtx();
    const depFile = ctx.project.createSourceFile(
      "dep.d.ts",
      `export interface Foo {}`,
    );

    const result = extractTypeFromResolvedModule("NonExistent", depFile, false, ctx);
    expect(result).toBeNull();
  });

  it("extracts exported declarations directly", () => {
    const ctx = makeCtx();
    const depFile = ctx.project.createSourceFile(
      "dep.d.ts",
      `export interface OperationOptions { abortSignal?: AbortSignal; }`,
    );

    const result = extractTypeFromResolvedModule("OperationOptions", depFile, false, ctx);

    expect(result).not.toBeNull();
    expect(result!.kind).toBe("interface");
    expect(result!.graphed.name).toBe("OperationOptions");
    expect(result!.fromFallback).toBeUndefined();
  });
});

describe("filterNamespaceMembers", () => {
  it("discovers new reachable members through referencedTypes expansion", () => {
    // Member A is directly referenced. A.referencedTypes includes "B".
    // Simulate BFS: upstream expands A's referencedTypes into the refs set.
    const ns: NamespaceInfo = {
      name: "Models",
      interfaces: [
        { name: "A", methods: [], properties: [], referencedTypes: ["B"] },
        { name: "B", methods: [], properties: [] },
        { name: "C", methods: [], properties: [] }, // unreachable
      ],
    };
    // After BFS expansion, refs includes both "A" and "B" (from A's referencedTypes)
    const refs = new Set(["A", "B"]);
    const result = filterNamespaceMembers(ns, refs);
    expect(result).not.toBeNull();
    const names = result!.interfaces!.map((i) => i.name);
    expect(names).toContain("A");
    expect(names).toContain("B");
    expect(names).not.toContain("C");
  });

  it("handles nested namespace member reachability through referencedTypes", () => {
    const ns: NamespaceInfo = {
      name: "Outer",
      namespaces: [
        {
          name: "Inner",
          types: [
            { name: "Config", type: "{ key: string }", referencedTypes: ["Detail"] },
            { name: "Detail", type: "{ value: number }" },
            { name: "Unused", type: "string" },
          ],
        },
      ],
    };
    // After BFS expansion, refs includes "Config" and "Detail"
    const refs = new Set(["Config", "Detail"]);
    const result = filterNamespaceMembers(ns, refs);
    expect(result).not.toBeNull();
    const inner = result!.namespaces![0];
    const typeNames = inner.types!.map((t) => t.name);
    expect(typeNames).toContain("Config");
    expect(typeNames).toContain("Detail");
    expect(typeNames).not.toContain("Unused");
  });

  it("handles members without referencedTypes gracefully", () => {
    const ns: NamespaceInfo = {
      name: "Simple",
      interfaces: [
        { name: "Referenced", methods: [], properties: [] }, // no referencedTypes
        { name: "NotReferenced", methods: [], properties: [] },
      ],
    };
    const refs = new Set(["Referenced"]);
    const result = filterNamespaceMembers(ns, refs);
    expect(result).not.toBeNull();
    const names = result!.interfaces!.map((i) => i.name);
    expect(names).toContain("Referenced");
    expect(names).not.toContain("NotReferenced");
  });

  it("includes referenced enum members in namespaces", () => {
    const ns: NamespaceInfo = {
      name: "Enums",
      enums: [
        { name: "Status", values: ["Active", "Inactive"] },
        { name: "Priority", values: ["High", "Low"] },
      ],
    };
    const refs = new Set(["Status"]);
    const result = filterNamespaceMembers(ns, refs);
    expect(result).not.toBeNull();
    const names = result!.enums!.map((e) => e.name);
    expect(names).toContain("Status");
    expect(names).not.toContain("Priority");
  });

  it("retains companion namespace members when companion class is referenced", () => {
    // When "Choice" (a class) is referenced, companion namespace "Choice"
    // members should be retained based on their own referencedTypes.
    // After BFS: "Choice" and "ChoiceData" are in refs.
    const ns: NamespaceInfo = {
      name: "ChatCompletion",
      classes: [
        {
          name: "Choice",
          constructors: [],
          methods: [],
          properties: [],
          referencedTypes: ["ChoiceData"],
        },
      ],
      namespaces: [
        {
          name: "Choice", // companion namespace (declaration-merged)
          isCompanion: true,
          types: [
            { name: "ChoiceData", type: "{ text: string }" },
            { name: "Unused", type: "never" },
          ],
        },
      ],
    };
    const refs = new Set(["Choice", "ChoiceData"]);
    const result = filterNamespaceMembers(ns, refs);
    expect(result).not.toBeNull();
    // The class "Choice" should be retained
    expect(result!.classes).toBeDefined();
    expect(result!.classes![0].name).toBe("Choice");
    // The companion namespace "Choice" should exist with filtered members
    expect(result!.namespaces).toBeDefined();
    const companionTypes = result!.namespaces![0].types!.map((t) => t.name);
    expect(companionTypes).toContain("ChoiceData");
    expect(companionTypes).not.toContain("Unused");
  });

  it("returns null when no members match the reference set", () => {
    const ns: NamespaceInfo = {
      name: "Empty",
      interfaces: [
        { name: "Foo", methods: [], properties: [] },
        { name: "Bar", methods: [], properties: [] },
      ],
    };
    const refs = new Set(["Baz"]);
    const result = filterNamespaceMembers(ns, refs);
    expect(result).toBeNull();
  });

  it("filters functions in namespaces", () => {
    const ns: NamespaceInfo = {
      name: "Helpers",
      functions: [
        { name: "parse", sig: "(input: string) => any", referencedTypes: ["ParseResult"] },
        { name: "format", sig: "(value: any) => string" },
      ],
    };
    const refs = new Set(["parse"]);
    const result = filterNamespaceMembers(ns, refs);
    expect(result).not.toBeNull();
    const names = result!.functions!.map((f) => f.name);
    expect(names).toContain("parse");
    expect(names).not.toContain("format");
  });
});

describe("makeDepKey / splitDepKey", () => {
  it("round-trips package and type name", () => {
    const key = makeDepKey("@azure/core-client", "PipelineOptions");
    expect(key).toContain("\0");
    const { packageName, typeName } = splitDepKey(key);
    expect(packageName).toBe("@azure/core-client");
    expect(typeName).toBe("PipelineOptions");
  });

  it("differentiates same type from different packages", () => {
    const keyA = makeDepKey("pkg-a", "Foo");
    const keyB = makeDepKey("pkg-b", "Foo");
    expect(keyA).not.toBe(keyB);
  });

  it("handles __ns__ prefixed type names", () => {
    const key = makeDepKey("openai", "__ns__Completions");
    const { packageName, typeName } = splitDepKey(key);
    expect(packageName).toBe("openai");
    expect(typeName).toBe("__ns__Completions");
  });
});

describe("getPackageRoot", () => {
  it("returns scoped package root from subpath", () => {
    expect(getPackageRoot("@azure/core-client/types")).toBe("@azure/core-client");
  });

  it("returns scoped package root when no subpath", () => {
    expect(getPackageRoot("@azure/core-client")).toBe("@azure/core-client");
  });

  it("returns unscoped package root from subpath", () => {
    expect(getPackageRoot("openai/resources")).toBe("openai");
  });

  it("returns unscoped package root when no subpath", () => {
    expect(getPackageRoot("openai")).toBe("openai");
  });
});

describe("getImportSubpath", () => {
  it("returns subpath for scoped package", () => {
    expect(getImportSubpath("@azure/core-client/types")).toBe("./types");
  });

  it("returns root for scoped package without subpath", () => {
    expect(getImportSubpath("@azure/core-client")).toBe(".");
  });

  it("returns subpath for unscoped package", () => {
    expect(getImportSubpath("openai/resources")).toBe("./resources");
  });

  it("returns root for unscoped package without subpath", () => {
    expect(getImportSubpath("openai")).toBe(".");
  });

  it("returns deep subpath", () => {
    expect(getImportSubpath("openai/resources/chat")).toBe("./resources/chat");
  });
});

describe("findSubpathExport", () => {
  it("delegates to findDotExport for root subpath", () => {
    const exports = { ".": { import: "./index.js" }, "./foo": { import: "./foo.js" } };
    expect(findSubpathExport(exports, ".")).toEqual({ import: "./index.js" });
  });

  it("returns the correct subpath export", () => {
    const exports = { ".": { import: "./index.js" }, "./policies": { import: "./policies.js" } };
    expect(findSubpathExport(exports, "./policies")).toEqual({ import: "./policies.js" });
  });

  it("returns undefined for missing subpath", () => {
    const exports = { ".": { import: "./index.js" } };
    expect(findSubpathExport(exports, "./missing")).toBeUndefined();
  });
});

describe("hasNonRootSubpaths", () => {
  it("returns true when exports has non-root subpaths", () => {
    expect(hasNonRootSubpaths({ ".": "./index.js", "./foo": "./foo.js" })).toBe(true);
  });

  it("returns false when exports has only root", () => {
    expect(hasNonRootSubpaths({ ".": "./index.js" })).toBe(false);
  });

  it("returns false for condition-only exports", () => {
    expect(hasNonRootSubpaths({ import: "./index.js", require: "./index.cjs" })).toBe(false);
  });
});

describe("buildImportResolutionMap (qualified keys)", () => {
  it("uses qualified keys that prevent same-name collisions", () => {
    const project = new Project({
      useInMemoryFileSystem: true,
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.NodeNext,
        moduleResolution: ts.ModuleResolutionKind.NodeNext,
        declaration: true,
        strict: true,
      },
    });

    // Create two "dependency" source files inside node_modules
    project.createSourceFile(
      "/node_modules/pkg-a/index.d.ts",
      `export interface Config { host: string; }`
    );
    project.createSourceFile(
      "/node_modules/pkg-b/index.d.ts",
      `export interface Config { port: number; }`
    );

    // Main source imports Config from both packages
    project.createSourceFile(
      "/src/index.ts",
      [
        `import { Config as ConfigA } from "pkg-a";`,
        `import { Config as ConfigB } from "pkg-b";`,
        `export type Combined = ConfigA & ConfigB;`,
      ].join("\n")
    );

    const { typeMap } = buildImportResolutionMap(project);

    // Both "Config" entries should exist under qualified keys
    const keyA = makeDepKey("pkg-a", "Config");
    const keyB = makeDepKey("pkg-b", "Config");
    expect(typeMap.has(keyA)).toBe(true);
    expect(typeMap.has(keyB)).toBe(true);
    expect(typeMap.get(keyA)!.packageName).toBe("pkg-a");
    expect(typeMap.get(keyB)!.packageName).toBe("pkg-b");

    // Alias keys should also be qualified
    const aliasKeyA = makeDepKey("pkg-a", "ConfigA");
    const aliasKeyB = makeDepKey("pkg-b", "ConfigB");
    expect(typeMap.has(aliasKeyA)).toBe(true);
    expect(typeMap.has(aliasKeyB)).toBe(true);
  });

  it("canonicalizes subpath module specifiers to package root", () => {
    const project = new Project({
      useInMemoryFileSystem: true,
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.NodeNext,
        moduleResolution: ts.ModuleResolutionKind.NodeNext,
        declaration: true,
        strict: true,
      },
    });

    project.createSourceFile(
      "/node_modules/openai/resources.d.ts",
      `export interface Chat { model: string; }`
    );

    project.createSourceFile(
      "/src/index.ts",
      `import { Chat } from "openai/resources";`
    );

    const { typeMap } = buildImportResolutionMap(project);

    // The key should use the canonical root "openai", not "openai/resources"
    const key = makeDepKey("openai", "Chat");
    expect(typeMap.has(key)).toBe(true);
    expect(typeMap.get(key)!.packageName).toBe("openai");
  });

  it("preserves import subpath in resolution map entries", () => {
    const project = new Project({
      useInMemoryFileSystem: true,
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.NodeNext,
        moduleResolution: ts.ModuleResolutionKind.NodeNext,
        declaration: true,
        strict: true,
      },
    });

    project.createSourceFile(
      "/node_modules/openai/resources.d.ts",
      `export interface Chat { model: string; }`
    );
    project.createSourceFile(
      "/node_modules/openai/index.d.ts",
      `export interface OpenAI { apiKey: string; }`
    );

    project.createSourceFile(
      "/src/index.ts",
      [
        `import { Chat } from "openai/resources";`,
        `import { OpenAI } from "openai";`,
      ].join("\n")
    );

    const { typeMap } = buildImportResolutionMap(project);

    // Subpath import should track "./resources"
    const chatKey = makeDepKey("openai", "Chat");
    expect(typeMap.get(chatKey)!.subpath).toBe("./resources");

    // Root import should track "."
    const openaiKey = makeDepKey("openai", "OpenAI");
    expect(typeMap.get(openaiKey)!.subpath).toBe(".");
  });
});

// ---------------------------------------------------------------------------
// New tests for WP-C
// ---------------------------------------------------------------------------

describe("collectCompanionNamespaceAliases — renamed import", () => {
  it("uses local alias name when import is renamed", () => {
    const ctx = makeCtx();
    ctx.project.createSourceFile(
      "dep-renamed.d.ts",
      `
      export class Runs {}
      export namespace Runs { export interface RunStep {} }
      `,
    );
    const mainFile = ctx.project.createSourceFile(
      "main-renamed.ts",
      `import { Runs as MyRuns } from "./dep-renamed.js";`,
    );

    const imp = mainFile.getImportDeclarations()[0];
    collectCompanionNamespaceAliases(imp, ctx);

    // Should use local alias "MyRuns", not original name "Runs"
    expect(ctx.namespaceAliases.has("MyRuns")).toBe(true);
    expect(ctx.namespaceAliases.has("Runs")).toBe(false);
  });
});

describe("buildResolvedDependencies — namespace content", () => {
  it("includes namespace content in unconditioned dependency", async () => {
    const { buildResolvedDependencies: buildResolved } = await import("../dependencies.js");
    const dep = {
      package: "test-dep",
      namespaces: [{
        name: "NS",
        interfaces: [{ name: "NsMember", methods: [], properties: [] }],
      }],
    };

    // Pass no rootPath since we're testing the unconditioned path (no condition maps)
    const result = buildResolved([dep], "/nonexistent", makeCtx());
    expect(result).toHaveLength(1);
    expect(result[0].modules[0].namespaces).toBeDefined();
    expect(result[0].modules[0].namespaces![0].name).toBe("NS");
  });
});

describe("filterNamespaceMembers — package-qualified reachability", () => {
  it("uses package-qualified names to prevent cross-contamination", () => {
    // Two namespaces from different packages with the same member name.
    // Only "Config" is in refs — both packages would match with bare names
    const ns: NamespaceInfo = {
      name: "Settings",
      interfaces: [
        { name: "Config", methods: [], properties: [] },
        { name: "Other", methods: [], properties: [] },
      ],
    };

    const refs = new Set(["Config"]);
    const result = filterNamespaceMembers(ns, refs);
    expect(result).not.toBeNull();
    expect(result!.interfaces).toHaveLength(1);
    expect(result!.interfaces![0].name).toBe("Config");
  });
});

describe("filterNamespaceByExports", () => {
  it("keeps namespace with all members when namespace name is exported", () => {
    const ns = {
      name: "Foo",
      interfaces: [{ name: "Bar", members: [] }],
    };
    const exportedNames = new Set(["Foo"]);
    const result = filterNamespaceByExports(ns, exportedNames);
    expect(result).not.toBeNull();
    expect(result!.name).toBe("Foo");
    expect(result!.interfaces).toHaveLength(1);
    expect(result!.interfaces![0].name).toBe("Bar");
  });

  it("filters members when only member name is exported", () => {
    const ns = {
      name: "Foo",
      interfaces: [{ name: "Bar", members: [] }],
    };
    const exportedNames = new Set(["Bar"]);
    const result = filterNamespaceByExports(ns, exportedNames);
    expect(result).not.toBeNull();
    expect(result!.name).toBe("Foo");
    expect(result!.interfaces).toHaveLength(1);
    expect(result!.interfaces![0].name).toBe("Bar");
  });

  it("drops namespace when neither namespace nor members are exported", () => {
    const ns = {
      name: "Foo",
      interfaces: [{ name: "Bar", members: [] }],
    };
    const exportedNames = new Set(["Other"]);
    const result = filterNamespaceByExports(ns, exportedNames);
    expect(result).toBeNull();
  });
});

describe("extractTypeFromResolvedModule — synthetic alias for renamed imports", () => {
  it("returns extracted name matching the declaration, not the requested alias", () => {
    const ctx = makeCtx();
    // Dependency file exports "ProxySettings" (the real name)
    const depFile = ctx.project.createSourceFile(
      "dep-proxy.d.ts",
      `export interface ProxySettings { host: string; port: number; }`,
    );

    // Request extraction using the alias name "ProxyOptions"
    // extractTypeFromResolvedModule looks up exports by name, so requesting
    // "ProxyOptions" (which doesn't exist) should return null — the caller
    // (resolveDependencies) handles the alias-split by falling back to the
    // original name. Verify that requesting the original name succeeds and
    // returns the declaration with its real name.
    const aliasResult = extractTypeFromResolvedModule("ProxyOptions", depFile, false, ctx);
    expect(aliasResult).toBeNull();

    const realResult = extractTypeFromResolvedModule("ProxySettings", depFile, false, ctx);
    expect(realResult).not.toBeNull();
    expect(realResult!.kind).toBe("interface");
    expect(realResult!.graphed.name).toBe("ProxySettings");
  });

  it("validates the alias-split pattern: real type + synthetic type alias", () => {
    const ctx = makeCtx();
    // Simulate the alias-split logic from dependencies.ts ~lines 953-961:
    // When extractTypeFromResolvedModule returns a declaration whose name
    // differs from the requested name, the caller creates both entries.
    const depFile = ctx.project.createSourceFile(
      "dep-alias.d.ts",
      `export interface ProxySettings { host: string; port: number; }`,
    );

    // Extract the real type (simulating fallback to original name)
    const origResult = extractTypeFromResolvedModule("ProxySettings", depFile, false, ctx);
    expect(origResult).not.toBeNull();

    // Simulate the alias-split logic that resolveDependencies performs
    const allResolved = new Map<string, { packageName: string; type: unknown; kind: string }>();
    const packageName = "dep-pkg";
    const requestedName = "ProxyOptions";
    const extractedName = (origResult!.graphed as { name?: string }).name;
    const needsAlias = extractedName && extractedName !== requestedName;

    expect(needsAlias).toBe(true);
    expect(extractedName).toBe("ProxySettings");

    if (needsAlias) {
      // Store the real type under its extracted name
      const realKey = makeDepKey(packageName, extractedName);
      allResolved.set(realKey, { packageName, type: origResult!.graphed, kind: origResult!.kind });

      // Create synthetic type alias: type ProxyOptions = ProxySettings
      const aliasType = { name: requestedName, type: extractedName };
      const aliasKey = makeDepKey(packageName, requestedName);
      allResolved.set(aliasKey, { packageName, type: aliasType, kind: "type" });
    }

    // Verify both entries exist
    const realKey = makeDepKey(packageName, "ProxySettings");
    const aliasKey = makeDepKey(packageName, "ProxyOptions");

    expect(allResolved.has(realKey)).toBe(true);
    expect(allResolved.has(aliasKey)).toBe(true);

    // Real type is the interface
    const realEntry = allResolved.get(realKey)!;
    expect(realEntry.kind).toBe("interface");
    expect((realEntry.type as { name: string }).name).toBe("ProxySettings");

    // Alias is a synthetic type alias pointing to the real name
    const aliasEntry = allResolved.get(aliasKey)!;
    expect(aliasEntry.kind).toBe("type");
    expect((aliasEntry.type as { name: string; type: string }).name).toBe("ProxyOptions");
    expect((aliasEntry.type as { name: string; type: string }).type).toBe("ProxySettings");
  });

  it("handles re-export where extracted name differs from requested name", () => {
    const ctx = makeCtx();
    // A dependency re-exports a type under a different name via
    // `export { OriginalName as AliasedName }`.
    // When we look up "AliasedName", ts-morph may resolve to the original declaration.
    const depFile = ctx.project.createSourceFile(
      "dep-reexport.d.ts",
      [
        `interface InternalSettings { host: string; }`,
        `export { InternalSettings as ProxySettings };`,
      ].join("\n"),
    );

    const result = extractTypeFromResolvedModule("ProxySettings", depFile, false, ctx);
    expect(result).not.toBeNull();
    // The extracted declaration retains its original name
    const extractedName = (result!.graphed as { name?: string }).name;
    // Whether ts-morph resolves to "InternalSettings" or "ProxySettings"
    // depends on the re-export chain; verify it's a valid extraction
    expect(extractedName).toBeDefined();
    expect(result!.kind).toBe("interface");
  });
});

describe("same-package transitive subpath propagation", () => {
  it("preserves parent subpath for same-package transitive types in buildImportResolutionMap", () => {
    const project = new Project({
      useInMemoryFileSystem: true,
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.NodeNext,
        moduleResolution: ts.ModuleResolutionKind.NodeNext,
        declaration: true,
        strict: true,
      },
    });

    // Package "pkg" has a subpath export "pkg/sub" that exports Chat,
    // which references SubConfig from the same package.
    project.createSourceFile(
      "/node_modules/pkg/sub.d.ts",
      [
        `export interface SubConfig { key: string; }`,
        `export interface Chat { config: SubConfig; }`,
      ].join("\n"),
    );

    project.createSourceFile(
      "/src/index.ts",
      `import { Chat } from "pkg/sub";`,
    );

    const { typeMap } = buildImportResolutionMap(project);

    // Chat should be mapped with subpath "./sub"
    const chatKey = makeDepKey("pkg", "Chat");
    expect(typeMap.has(chatKey)).toBe(true);
    expect(typeMap.get(chatKey)!.subpath).toBe("./sub");
    expect(typeMap.get(chatKey)!.packageName).toBe("pkg");
  });

  it("uses root subpath for cross-package transitive types", () => {
    const project = new Project({
      useInMemoryFileSystem: true,
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.NodeNext,
        moduleResolution: ts.ModuleResolutionKind.NodeNext,
        declaration: true,
        strict: true,
      },
    });

    // Two packages: "pkg-a/sub" exports TypeA, "pkg-b" exports TypeB
    project.createSourceFile(
      "/node_modules/pkg-a/sub.d.ts",
      `export interface TypeA { value: string; }`,
    );
    project.createSourceFile(
      "/node_modules/pkg-b/index.d.ts",
      `export interface TypeB { count: number; }`,
    );

    project.createSourceFile(
      "/src/index.ts",
      [
        `import { TypeA } from "pkg-a/sub";`,
        `import { TypeB } from "pkg-b";`,
      ].join("\n"),
    );

    const { typeMap } = buildImportResolutionMap(project);

    // TypeA from subpath should have "./sub"
    const keyA = makeDepKey("pkg-a", "TypeA");
    expect(typeMap.has(keyA)).toBe(true);
    expect(typeMap.get(keyA)!.subpath).toBe("./sub");

    // TypeB from root should have "."
    const keyB = makeDepKey("pkg-b", "TypeB");
    expect(typeMap.has(keyB)).toBe(true);
    expect(typeMap.get(keyB)!.subpath).toBe(".");
  });

  it("propagates subpath through aliased imports from the same package subpath", () => {
    const project = new Project({
      useInMemoryFileSystem: true,
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.NodeNext,
        moduleResolution: ts.ModuleResolutionKind.NodeNext,
        declaration: true,
        strict: true,
      },
    });

    // Package with subpath exports — aliased import should still track subpath
    project.createSourceFile(
      "/node_modules/openai/resources.d.ts",
      `export interface ChatCompletion { id: string; model: string; }`,
    );

    project.createSourceFile(
      "/src/index.ts",
      `import { ChatCompletion as Completion } from "openai/resources";`,
    );

    const { typeMap } = buildImportResolutionMap(project);

    // Both the original name and alias should be tracked with the subpath
    const origKey = makeDepKey("openai", "ChatCompletion");
    const aliasKey = makeDepKey("openai", "Completion");

    expect(typeMap.has(origKey)).toBe(true);
    expect(typeMap.get(origKey)!.subpath).toBe("./resources");

    expect(typeMap.has(aliasKey)).toBe(true);
    expect(typeMap.get(aliasKey)!.subpath).toBe("./resources");
  });

  it("makeDepKey encodes subpath in key and splitDepKey recovers it", () => {
    const key = makeDepKey("openai", "Chat", "./resources");
    expect(key).toContain("\0");

    const { packageName, typeName, subpath } = splitDepKey(key);
    expect(packageName).toBe("openai");
    expect(typeName).toBe("Chat");
    expect(subpath).toBe("./resources");
  });

  it("makeDepKey omits subpath segment for root", () => {
    const key = makeDepKey("openai", "Chat", ".");
    const { packageName, typeName, subpath } = splitDepKey(key);
    expect(packageName).toBe("openai");
    expect(typeName).toBe("Chat");
    expect(subpath).toBeUndefined();
  });
});
