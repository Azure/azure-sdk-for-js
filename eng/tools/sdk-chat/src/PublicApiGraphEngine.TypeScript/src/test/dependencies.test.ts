// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { Project, ts } from "ts-morph";
import {
  collectCompanionNamespaceAliases,
  extractDeclaration,
  extractTypeFromResolvedModule,
} from "../dependencies.js";
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
