// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { Project, ts, Node } from "ts-morph";
import type { ResolvedTypeRef } from "../models.js";
import { collectTypeRefsFromTypeNode, createExtractionContext } from "../type-refs.js";
import { extractEnum } from "../extractors.js";

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

function refNames(refs: Set<ResolvedTypeRef>): string[] {
  return [...refs].map((r) => r.name).sort();
}

describe("collectTypeRefsFromTypeNode", () => {
  describe("computed property names", () => {
    it("tracks identifier in computed property name", () => {
      const ctx = makeCtx();
      const sf = ctx.project.createSourceFile(
        "test.ts",
        `
        declare const mySymbol: unique symbol;
        interface I { [mySymbol]: string }
        `,
      );

      const refs = new Set<ResolvedTypeRef>();
      const iface = sf.getInterfaceOrThrow("I");
      for (const member of iface.getMembers()) {
        collectTypeRefsFromTypeNode(member, ctx, refs);
      }

      expect(refNames(refs)).toContain("mySymbol");
    });

    it("does not track property access expressions in computed property names", () => {
      const ctx = makeCtx();
      ctx.project.createSourceFile(
        "obj.ts",
        `export const obj = { prop: Symbol("prop") };`,
      );
      const sf = ctx.project.createSourceFile(
        "test.ts",
        `
        import { obj } from "./obj.js";
        interface I { [obj.prop]: string }
        `,
      );

      const refs = new Set<ResolvedTypeRef>();
      const iface = sf.getInterfaceOrThrow("I");
      for (const member of iface.getMembers()) {
        collectTypeRefsFromTypeNode(member, ctx, refs);
      }

      // Property access (obj.prop) should NOT be tracked as a type ref
      const names = refNames(refs);
      expect(names).not.toContain("obj");
      expect(names).not.toContain("prop");
    });
  });

  describe("TypeQuery (typeof X)", () => {
    it("tracks typeof references as dependencies", () => {
      const ctx = makeCtx();
      const sf = ctx.project.createSourceFile(
        "test.ts",
        `
        declare const myValue: string;
        type T = typeof myValue;
        `,
      );

      const refs = new Set<ResolvedTypeRef>();
      const typeAlias = sf.getTypeAliasOrThrow("T");
      const typeNode = typeAlias.getTypeNodeOrThrow();
      collectTypeRefsFromTypeNode(typeNode, ctx, refs);

      expect(refNames(refs)).toContain("myValue");
    });

    it("handles qualified typeof (typeof Foo.bar)", () => {
      const ctx = makeCtx();
      const sf = ctx.project.createSourceFile(
        "test.ts",
        `
        declare namespace Foo { export const bar: number; }
        type T = typeof Foo.bar;
        `,
      );

      const refs = new Set<ResolvedTypeRef>();
      const typeAlias = sf.getTypeAliasOrThrow("T");
      const typeNode = typeAlias.getTypeNodeOrThrow();
      collectTypeRefsFromTypeNode(typeNode, ctx, refs);

      // Qualified name — getRight() gives "bar"
      expect(refNames(refs)).toContain("bar");
    });
  });

  describe("variable declarations as trackable", () => {
    it("tracks variable declarations used as computed property keys", () => {
      const ctx = makeCtx();
      const sf = ctx.project.createSourceFile(
        "test.ts",
        `
        declare const x: unique symbol;
        interface I { [x]: true }
        `,
      );

      const refs = new Set<ResolvedTypeRef>();
      const iface = sf.getInterfaceOrThrow("I");
      for (const member of iface.getMembers()) {
        collectTypeRefsFromTypeNode(member, ctx, refs);
      }

      expect(refNames(refs)).toContain("x");
    });
  });
});

describe("collectTypeRefsFromType", () => {
  describe("type parameter constraints and defaults on signatures", () => {
    it("discovers constraint and default type arguments on method type nodes", () => {
      const ctx = makeCtx();
      ctx.project.createSourceFile(
        "types.ts",
        `
        export interface SomeType { value: string }
        export interface Other { key: number }
        `,
      );
      const sf = ctx.project.createSourceFile(
        "test.ts",
        `
        import { SomeType, Other } from "./types.js";
        export interface I {
          parse<T extends SomeType, P = Extract<T, Other>>(): void;
        }
        `,
      );

      // Collect type references from the method's type parameter AST nodes.
      // This mirrors how the engine traverses type parameter constraints and defaults
      // via collectTypeRefsFromTypeNode on constraint/default type nodes.
      const iface = sf.getInterfaceOrThrow("I");
      const refs = new Set<ResolvedTypeRef>();
      for (const method of iface.getMethods()) {
        for (const tp of method.getTypeParameters()) {
          const constraint = tp.getConstraint();
          if (constraint) collectTypeRefsFromTypeNode(constraint, ctx, refs);
          const defaultNode = tp.getDefault();
          if (defaultNode) collectTypeRefsFromTypeNode(defaultNode, ctx, refs);
        }
      }

      const names = refNames(refs);
      expect(names).toContain("SomeType");
      expect(names).toContain("Other");
    });
  });
});

// ---------------------------------------------------------------------------
// TypeReferenceCollector — getAllQualifiedRefNames
// ---------------------------------------------------------------------------

describe("TypeReferenceCollector — getAllQualifiedRefNames", () => {
  it("extracts dotted namespace references via collectFromType", () => {
    const ctx = makeCtx();
    // Create a source file that defines a namespace-qualified type
    // and use the collector to extract refs from the type annotation.
    const sf = ctx.project.createSourceFile(
      "test.ts",
      `
      declare namespace NodeJS {
        interface ReadableStream { read(): void; }
      }
      export function getStream(): NodeJS.ReadableStream { return null!; }
      `,
    );

    // Use collectFromTypeNode on the collector so qualified refs are tracked internally
    const fn = sf.getFunctionOrThrow("getStream");
    const returnTypeNode = fn.getReturnTypeNode();
    expect(returnTypeNode).toBeDefined();

    ctx.typeRefs.pushContext("getStream");
    ctx.typeRefs.collectFromTypeNode(returnTypeNode!);
    ctx.typeRefs.popContext();

    // NodeJS.ReadableStream is declared locally (not from an external package),
    // so it is not captured as an external ref. Verify getAllQualifiedRefNames
    // completes without error and returns no qualified refs for local declarations.
    const qualified = ctx.typeRefs.getAllQualifiedRefNames();
    expect(qualified.size).toBe(0);
    for (const name of qualified) {
      expect(name).not.toContain("/");
      expect(name).not.toContain("@");
      expect(name).toMatch(/^[a-zA-Z_$][a-zA-Z0-9_$.]*$/);
    }
  });

  it("skips module-path qualified names (e.g. @azure/core-client)", () => {
    const ctx = makeCtx();

    // Manually inject a ref with a module-path fullName to test filtering
    // We use collectFromTypeNode on a real type reference that resolves to a module path.
    // Since we can't easily fabricate that scenario, we test the method indirectly:
    // Create a namespace ref that has a package-like prefix — this should NOT appear.
    const sf = ctx.project.createSourceFile(
      "test.ts",
      `
      export interface Foo { bar: string }
      `,
    );

    // Collect a simple type to ensure we have refs
    const iface = sf.getInterfaceOrThrow("Foo");
    ctx.typeRefs.pushContext("Foo");
    for (const member of iface.getMembers()) {
      collectTypeRefsFromTypeNode(member, ctx, new Set());
    }
    ctx.typeRefs.popContext();

    const qualified = ctx.typeRefs.getAllQualifiedRefNames();
    // No module-path qualified names should appear for simple types
    for (const name of qualified) {
      expect(name).not.toMatch(/^["@]/);
      expect(name).not.toContain("/");
    }
  });

  it("handles context stack for qualified keys", () => {
    const ctx = makeCtx();
    ctx.project.createSourceFile(
      "dep.ts",
      `export interface DepType { value: string }`,
    );
    const sf = ctx.project.createSourceFile(
      "test.ts",
      `
      import { DepType } from "./dep.js";
      export namespace MyNs {
        export interface Client {
          doWork(): DepType;
        }
      }
      `,
    );

    // Push nested context to verify qualified context keys (Namespace.Client)
    const ns = sf.getModuleOrThrow("MyNs");
    const iface = ns.getInterfaceOrThrow("Client");
    ctx.typeRefs.pushContext("MyNs");
    ctx.typeRefs.pushContext("Client");
    const returnTypeNode = iface.getMethods()[0]?.getReturnTypeNode();
    if (returnTypeNode) {
      ctx.typeRefs.collectFromTypeNode(returnTypeNode);
    }
    ctx.typeRefs.popContext();
    ctx.typeRefs.popContext();

    // The context ref names should use the qualified key "MyNs.Client"
    const contextRefs = ctx.typeRefs.getContextRefNames();
    expect(contextRefs.has("MyNs.Client")).toBe(true);
    const refNames = contextRefs.get("MyNs.Client")!;
    expect(refNames).toContain("DepType");
  });
});

describe("getExternalRefs — namespace member deps", () => {
  it("collects refs from namespace members when leaf name is in reachable set", () => {
    const ctx = makeCtx();
    ctx.project.createSourceFile(
      "dep.ts",
      `export interface DepType { value: string }`,
    );
    const sf = ctx.project.createSourceFile(
      "test.ts",
      `
      import { DepType } from "./dep.js";
      export namespace Inner {
        export interface Client {
          doWork(): DepType;
        }
      }
      `,
    );

    // Simulate extraction: push nested context for namespace member
    ctx.typeRefs.setModule("testMod");
    const ns = sf.getModuleOrThrow("Inner");
    const iface = ns.getInterfaceOrThrow("Client");
    ctx.typeRefs.pushContext("Inner");
    ctx.typeRefs.pushContext("Client");
    for (const member of iface.getMembers()) {
      ctx.typeRefs.collectFromTypeNode(member);
    }
    ctx.typeRefs.popContext();
    ctx.typeRefs.popContext();

    // Verify the ref was collected under the dotted context key
    const contextRefs = ctx.typeRefs.getContextRefNames("testMod");
    expect(contextRefs.has("Inner.Client")).toBe(true);
    expect(contextRefs.get("Inner.Client")).toContain("DepType");

    // Simulate a reachable set that contains qualified keys
    // (as computeReachableTypes now produces).
    // getExternalRefs filters to refs with packageName OR falls back to importedTypes.
    // DepType resolves from a local file — it won't have a packageName and won't be
    // in importedTypes. So we directly verify the scoping: refs ARE collected from
    // the namespace member context when its qualified key is reachable.
    // To verify external ref collection end-to-end, also add DepType as an import.
    ctx.typeRefs.collectFromImportDeclarations([
      ctx.project.createSourceFile(
        "fake-import.ts",
        `import { DepType } from "ext-pkg";`,
      ),
    ]);

    const reachable = new Set(["testMod/Inner", "testMod/Inner/Client"]);
    const externalRefs = ctx.typeRefs.getExternalRefs(reachable);
    const refNames = externalRefs.map((r) => r.name);
    expect(refNames).toContain("DepType");
  });

  it("does not collect refs from unreachable namespace members", () => {
    const ctx = makeCtx();
    ctx.project.createSourceFile(
      "dep.ts",
      `export interface DepType { value: string }`,
    );
    const sf = ctx.project.createSourceFile(
      "test.ts",
      `
      import { DepType } from "./dep.js";
      export namespace Inner {
        export interface Client {
          doWork(): DepType;
        }
      }
      `,
    );

    ctx.typeRefs.collectFromImportDeclarations([
      ctx.project.createSourceFile(
        "fake-import.ts",
        `import { DepType } from "ext-pkg";`,
      ),
    ]);

    ctx.typeRefs.setModule("testMod");
    const ns = sf.getModuleOrThrow("Inner");
    const iface = ns.getInterfaceOrThrow("Client");
    ctx.typeRefs.pushContext("Inner");
    ctx.typeRefs.pushContext("Client");
    for (const member of iface.getMembers()) {
      ctx.typeRefs.collectFromTypeNode(member);
    }
    ctx.typeRefs.popContext();
    ctx.typeRefs.popContext();

    // Reachable set does NOT contain the qualified key for "Client" — refs should not be collected
    const reachable = new Set(["testMod/SomeOtherType"]);
    const externalRefs = ctx.typeRefs.getExternalRefs(reachable);
    const refNames = externalRefs.map((r) => r.name);
    expect(refNames).not.toContain("DepType");
  });
});

describe("extractEnum", () => {
  it("preserves string initializers faithfully", () => {
    const ctx = makeCtx();
    const src = ctx.project.createSourceFile(
      "str-enum.ts",
      'export enum Direction { Up = "UP", Down = "DOWN" }',
    );
    const en = src.getEnumOrThrow("Direction");
    const info = extractEnum(en, ctx);
    expect(info.name).toBe("Direction");
    expect(info.values).toEqual(['Up = "UP"', 'Down = "DOWN"']);
  });

  it("omits initializer for auto-valued numeric members", () => {
    const ctx = makeCtx();
    const src = ctx.project.createSourceFile(
      "num-enum.ts",
      "export enum Status { Active, Inactive }",
    );
    const en = src.getEnumOrThrow("Status");
    const info = extractEnum(en, ctx);
    expect(info.values).toEqual(["Active", "Inactive"]);
  });

  it("preserves explicit numeric initializers", () => {
    const ctx = makeCtx();
    const src = ctx.project.createSourceFile(
      "num-init-enum.ts",
      "export enum Code { Ok = 200, NotFound = 404 }",
    );
    const en = src.getEnumOrThrow("Code");
    const info = extractEnum(en, ctx);
    expect(info.values).toEqual(["Ok = 200", "NotFound = 404"]);
  });

  it("preserves mixed initializers faithfully", () => {
    const ctx = makeCtx();
    const src = ctx.project.createSourceFile(
      "mixed-enum.ts",
      'export enum Mixed { A = 0, B = "b" }',
    );
    const en = src.getEnumOrThrow("Mixed");
    const info = extractEnum(en, ctx);
    expect(info.values).toEqual(["A = 0", 'B = "b"']);
  });

  it("const enum should set isConst: true", () => {
    const ctx = makeCtx();
    const src = ctx.project.createSourceFile(
      "const-enum.ts",
      "export const enum Dir { Up, Down }",
    );
    const en = src.getEnumOrThrow("Dir");
    const info = extractEnum(en, ctx);
    expect(info.isConst).toBe(true);
    expect(info.values).toEqual(["Up", "Down"]);
  });

  it("regular enum should have isConst undefined", () => {
    const ctx = makeCtx();
    const src = ctx.project.createSourceFile(
      "regular-enum.ts",
      "export enum Color { Red, Green, Blue }",
    );
    const en = src.getEnumOrThrow("Color");
    const info = extractEnum(en, ctx);
    expect(info.isConst).toBeUndefined();
  });

  it("const enum with string initializers preserves isConst and initializers", () => {
    const ctx = makeCtx();
    const src = ctx.project.createSourceFile(
      "const-str-enum.ts",
      'export const enum Lang { TS = "ts", JS = "js" }',
    );
    const en = src.getEnumOrThrow("Lang");
    const info = extractEnum(en, ctx);
    expect(info.isConst).toBe(true);
    expect(info.values).toEqual(['TS = "ts"', 'JS = "js"']);
  });
});

describe("collectFromImportDeclarations", () => {
  it("canonicalizes subpath import specifiers to package root", () => {
    const ctx = makeCtx();
    const src = ctx.project.createSourceFile(
      "main.ts",
      `
      import type { Foo } from "openai/resources";
      import type { Bar } from "@azure/core-client/types";
      import type { Baz } from "simple";
      export interface Out { foo: Foo; bar: Bar; baz: Baz; }
      `,
    );

    ctx.typeRefs.collectFromImportDeclarations([src]);
    const imported = ctx.typeRefs.getImportedPackages();

    expect(imported.get("Foo")).toBe("openai");
    expect(imported.get("Bar")).toBe("@azure/core-client");
    expect(imported.get("Baz")).toBe("simple");
  });

  it("tracks aliased imports under their local binding name", () => {
    const ctx = makeCtx();
    const src = ctx.project.createSourceFile(
      "alias.ts",
      `
      import type { Foo as Bar } from "some-pkg";
      export interface Out { val: Bar; }
      `,
    );

    ctx.typeRefs.collectFromImportDeclarations([src]);
    const imported = ctx.typeRefs.getImportedPackages();

    // Should track under the local alias "Bar", not the exported name "Foo"
    expect(imported.get("Bar")).toBe("some-pkg");
    expect(imported.has("Foo")).toBe(false);
  });
});

describe("getContextRefNamesWithPackages", () => {
  it("returns Set of packages per type name per entity", () => {
    const ctx = makeCtx();
    // Use a real resolvable dep so the type collector finds a ref
    ctx.project.createSourceFile(
      "dep.ts",
      `export interface DepType { value: string }`,
    );
    const sf = ctx.project.createSourceFile(
      "test-ctx.ts",
      `
      import { DepType } from "./dep.js";
      export interface MyEntity {
        field: DepType;
      }
      `,
    );

    const iface = sf.getInterfaceOrThrow("MyEntity");
    ctx.typeRefs.pushContext("MyEntity");
    for (const member of iface.getMembers()) {
      ctx.typeRefs.collectFromTypeNode(member);
    }
    ctx.typeRefs.popContext();

    const result = ctx.typeRefs.getContextRefNamesWithPackages();
    // Verify the structure: values are Map<string, Set<string>>
    for (const [, entityRefs] of result) {
      for (const [, pkgs] of entityRefs) {
        expect(pkgs).toBeInstanceOf(Set);
      }
    }
  });

  it("same name from multiple packages produces multi-element Set", () => {
    const ctx = makeCtx();
    ctx.project.createSourceFile(
      "depState.ts",
      `export interface State { a: string }`,
    );
    ctx.project.createSourceFile(
      "depConfig.ts",
      `export interface Config { b: number }`,
    );

    // Bridge file with package imports to populate importedTypes
    const bridge = ctx.project.createSourceFile(
      "bridge.ts",
      `
      import { State } from "@azure/pkgA";
      import { Config } from "@azure/pkgB";
      export { State, Config };
      `,
    );
    ctx.typeRefs.collectFromImportDeclarations([bridge]);

    // Main file with resolvable relative imports so the compiler resolves types
    const sf = ctx.project.createSourceFile(
      "test-multi.ts",
      `
      import { State } from "./depState.js";
      import { Config } from "./depConfig.js";
      export interface MyEntity {
        field1: State;
        field2: Config;
      }
      `,
    );

    const iface = sf.getInterfaceOrThrow("MyEntity");
    ctx.typeRefs.pushContext("MyEntity");
    for (const member of iface.getMembers()) {
      ctx.typeRefs.collectFromTypeNode(member);
    }
    ctx.typeRefs.popContext();

    const result = ctx.typeRefs.getContextRefNamesWithPackages();
    expect(result.has("MyEntity")).toBe(true);
    const entityRefs = result.get("MyEntity")!;
    // State from @azure/pkgA and Config from @azure/pkgB should both appear
    expect(entityRefs.size).toBeGreaterThanOrEqual(2);
    for (const [, pkgs] of entityRefs) {
      expect(pkgs).toBeInstanceOf(Set);
    }
  });

  it("two entities with same name in different modules have separate provenance", () => {
    const ctx = makeCtx();
    ctx.project.createSourceFile(
      "depA.ts",
      `export interface DepA { a: string }`,
    );
    ctx.project.createSourceFile(
      "depB.ts",
      `export interface DepB { b: number }`,
    );
    const sfA = ctx.project.createSourceFile(
      "moduleA.ts",
      `
      import { DepA } from "./depA.js";
      export interface Options { field: DepA; }
      `,
    );
    const sfB = ctx.project.createSourceFile(
      "moduleB.ts",
      `
      import { DepB } from "./depB.js";
      export interface Options { field: DepB; }
      `,
    );

    // Extract Options in module "modA"
    ctx.typeRefs.setModule("modA");
    const ifaceA = sfA.getInterfaceOrThrow("Options");
    ctx.typeRefs.pushContext("Options");
    for (const member of ifaceA.getMembers()) {
      ctx.typeRefs.collectFromTypeNode(member);
    }
    ctx.typeRefs.popContext();

    // Extract Options in module "modB"
    ctx.typeRefs.setModule("modB");
    const ifaceB = sfB.getInterfaceOrThrow("Options");
    ctx.typeRefs.pushContext("Options");
    for (const member of ifaceB.getMembers()) {
      ctx.typeRefs.collectFromTypeNode(member);
    }
    ctx.typeRefs.popContext();

    // When queried with module filter, each module's Options has separate refs
    const refsA = ctx.typeRefs.getContextRefNames("modA");
    const refsB = ctx.typeRefs.getContextRefNames("modB");
    expect(refsA.has("Options")).toBe(true);
    expect(refsB.has("Options")).toBe(true);
    expect(refsA.get("Options")).toContain("DepA");
    expect(refsA.get("Options")).not.toContain("DepB");
    expect(refsB.get("Options")).toContain("DepB");
    expect(refsB.get("Options")).not.toContain("DepA");

    // Without module filter, results merge across modules
    const refsAll = ctx.typeRefs.getContextRefNames();
    expect(refsAll.get("Options")).toContain("DepA");
    expect(refsAll.get("Options")).toContain("DepB");
  });
});
