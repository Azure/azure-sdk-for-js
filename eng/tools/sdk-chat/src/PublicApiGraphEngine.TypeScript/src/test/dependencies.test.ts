// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { Project, ts } from "ts-morph";
import {
  collectCompanionNamespaceAliases,
  extractDeclaration,
  extractTypeFromResolvedModule,
  filterNamespaceMembers,
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
