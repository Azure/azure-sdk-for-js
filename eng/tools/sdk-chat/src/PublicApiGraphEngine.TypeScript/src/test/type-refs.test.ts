// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { Project, ts, Node } from "ts-morph";
import type { ResolvedTypeRef } from "../models.js";
import { collectTypeRefsFromTypeNode, createExtractionContext } from "../type-refs.js";

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
