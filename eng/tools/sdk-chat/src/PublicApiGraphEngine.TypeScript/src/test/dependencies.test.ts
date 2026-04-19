// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { Project, ts } from "ts-morph";
import {
  collectCompanionNamespaceAliases,
  extractDeclaration,
  extractTypeFromResolvedModule,
  filterNamespaceMembers,
  makeDepKey,
  splitDepKey,
  getPackageRoot,
  buildImportResolutionMap,
} from "../dependencies.js";
import type { NamespaceInfo } from "../models.js";
import { createExtractionContext } from "../type-refs.js";

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
          name: "Choice", // companion namespace
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
