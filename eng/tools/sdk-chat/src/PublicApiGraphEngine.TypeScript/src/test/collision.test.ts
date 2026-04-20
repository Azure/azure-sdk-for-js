// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, vi } from "vitest";
import { resolveCollisions, replaceTypeIdentifiers, type CollisionAliasMap } from "../collision.js";
import type { ApiIndex, ClassInfo, InterfaceInfo, TypeAliasInfo, FunctionInfo, CallSignatureInfo, ConstructSignatureInfo } from "../models.js";

/** Helper to build contextRefPackages in the new Map<string, Map<string, Set<string>>> format */
function makeContextRefs(
  entries: [string, [string, string][]][]
): Map<string, Map<string, Set<string>>> {
  const result = new Map<string, Map<string, Set<string>>>();
  for (const [entity, refs] of entries) {
    const inner = new Map<string, Set<string>>();
    for (const [typeName, pkg] of refs) {
      if (!inner.has(typeName)) inner.set(typeName, new Set());
      inner.get(typeName)!.add(pkg);
    }
    result.set(entity, inner);
  }
  return result;
}

function makeApi(overrides: Partial<ApiIndex> = {}): ApiIndex {
  return {
    package: "@azure/test-pkg",
    modules: [],
    ...overrides,
  };
}

describe("collision detection", () => {
  it("no collision when dep types don't overlap with main", () => {
    const api = makeApi({
      modules: [{ name: "main", classes: [{ name: "Foo", extends: "Bar" } as ClassInfo] }],
      dependencies: [{ package: "dep-a", interfaces: [{ name: "Bar" } as InterfaceInfo] }],
    });
    const contextRefs = makeContextRefs([]);
    const result = resolveCollisions(api, contextRefs);
    expect(Object.keys(result)).toHaveLength(0);
  });

  it("main-dep collision: main keeps bare name, dep gets alias", () => {
    const api = makeApi({
      modules: [{
        name: "main",
        types: [{ name: "OperationState", type: "string" } as TypeAliasInfo],
        classes: [{
          name: "MyClient",
          methods: [{ name: "poll", sig: "(state: OperationState) => void", ret: "PollerLike<OperationState<MyResult>>" }],
        } as ClassInfo],
      }],
      dependencies: [{
        package: "@azure/core-lro",
        interfaces: [{ name: "OperationState", typeParams: "<TResult>" } as InterfaceInfo],
      }],
    });

    // MyClient references OperationState from @azure/core-lro in its return type
    const contextRefs = makeContextRefs([
      ["MyClient", [["OperationState", "@azure/core-lro"]]],
    ]);

    const result = resolveCollisions(api, contextRefs);

    // Should detect collision
    expect(result).toHaveProperty("OperationState");
    expect(result["OperationState"]["@azure/test-pkg"]).toBe("OperationState"); // main keeps bare name
    expect(result["OperationState"]["@azure/core-lro"]).toBe("_corelro_OperationState"); // dep gets alias

    // MyClient's method return type should be rewritten
    const myClient = api.modules[0].classes![0];
    expect(myClient.methods![0].ret).toContain("_corelro_OperationState");
    // sig references main's OperationState — no alias applied since it comes from a different package
  });

  it("cross-dep collision: first dep (lexicographic) keeps bare name", () => {
    const api = makeApi({
      modules: [{ name: "main", classes: [{ name: "Foo" } as ClassInfo] }],
      dependencies: [
        { package: "pkg-b", interfaces: [{ name: "SharedType" } as InterfaceInfo] },
        { package: "pkg-a", types: [{ name: "SharedType", type: "string" } as TypeAliasInfo] },
      ],
    });

    const contextRefs = makeContextRefs([]);
    const result = resolveCollisions(api, contextRefs);

    expect(result).toHaveProperty("SharedType");
    // pkg-a is lexicographically first → keeps bare name
    expect(result["SharedType"]["pkg-a"]).toBe("SharedType");
    // pkg-b gets aliased
    expect(result["SharedType"]["pkg-b"]).toBe("_pkgb_SharedType");
  });

  it("no collision when only one dep has the name and main doesn't", () => {
    const api = makeApi({
      modules: [{ name: "main", classes: [{ name: "Foo" } as ClassInfo] }],
      dependencies: [{ package: "dep-a", interfaces: [{ name: "UniqueType" } as InterfaceInfo] }],
    });
    const contextRefs = makeContextRefs([]);
    const result = resolveCollisions(api, contextRefs);
    expect(Object.keys(result)).toHaveLength(0);
  });

  it("multiple collisions are all detected", () => {
    const api = makeApi({
      modules: [{
        name: "main",
        types: [
          { name: "ClientOptions", type: "{ }" } as TypeAliasInfo,
          { name: "OperationState", type: "string" } as TypeAliasInfo,
        ],
      }],
      dependencies: [
        { package: "dep-x", interfaces: [{ name: "ClientOptions" } as InterfaceInfo, { name: "OperationState" } as InterfaceInfo] },
        { package: "dep-y", types: [{ name: "ClientOptions", type: "any" } as TypeAliasInfo] },
      ],
    });

    const contextRefs = makeContextRefs([]);
    const result = resolveCollisions(api, contextRefs);

    expect(Object.keys(result)).toHaveLength(2);
    expect(result["ClientOptions"]["@azure/test-pkg"]).toBe("ClientOptions");
    expect(result["ClientOptions"]["dep-x"]).toBe("_depx_ClientOptions");
    expect(result["ClientOptions"]["dep-y"]).toBe("_depy_ClientOptions");
    expect(result["OperationState"]["@azure/test-pkg"]).toBe("OperationState");
    expect(result["OperationState"]["dep-x"]).toBe("_depx_OperationState");
  });

  it("generates unique aliases when package suffixes collide", () => {
    // Two packages with the same suffix "corelro" after hyphen removal
    const api = makeApi({
      modules: [{ name: "main", types: [{ name: "State", type: "string" } as TypeAliasInfo] }],
      dependencies: [
        { package: "@azure/core-lro", interfaces: [{ name: "State" } as InterfaceInfo] },
        { package: "corelro", types: [{ name: "State", type: "any" } as TypeAliasInfo] },
      ],
    });
    const contextRefs = makeContextRefs([]);
    const result = resolveCollisions(api, contextRefs);

    // Both deps should get aliases, and they must be different
    const aliases = Object.values(result["State"]).filter(v => v !== "State");
    expect(aliases).toHaveLength(2);
    expect(new Set(aliases).size).toBe(2); // all unique
  });

  it("excludes dep functions and namespaces from collision detection", () => {
    // Main has a function named "doWork", dep has a function named "doWork"
    // Functions are not imported by the C# formatter, so no collision
    const api = makeApi({
      modules: [{ name: "main", functions: [{ name: "doWork", sig: "() => void" } as FunctionInfo] }],
      dependencies: [{ package: "dep-a", functions: [{ name: "doWork", sig: "() => void" } as any] }],
    });
    const contextRefs = makeContextRefs([]);
    const result = resolveCollisions(api, contextRefs);
    // No collision because dep functions aren't collected
    expect(Object.keys(result)).toHaveLength(0);
  });
});

describe("alias application to entity bodies", () => {
  it("rewrites extends, implements, typeParams, methods, properties", () => {
    const cls: ClassInfo = {
      name: "MyClass",
      extends: "BaseClass<OperationState<Foo>>",
      implements: ["Pollable<OperationState<Bar>>"],
      typeParams: "<T extends OperationState<any>>",
      methods: [{
        name: "get",
        sig: "(opts: OperationState<X>) => void",
        ret: "Promise<OperationState<Y>>",
        params: [{ name: "opts", type: "OperationState<X>" }],
      }],
      properties: [{ name: "state", type: "OperationState<Z>" }],
      constructors: [{ sig: "(state: OperationState<A>) => void", params: [{ name: "state", type: "OperationState<A>" }] }],
      indexSignatures: [{ keyName: "key", keyType: "string", valueType: "OperationState<B>" }],
    };

    const api = makeApi({
      modules: [{
        name: "main",
        types: [{ name: "OperationState", type: "string" } as TypeAliasInfo],
        classes: [cls],
      }],
      dependencies: [{
        package: "@azure/core-lro",
        interfaces: [{ name: "OperationState", typeParams: "<T>" } as InterfaceInfo],
      }],
    });

    const contextRefs = makeContextRefs([
      ["MyClass", [["OperationState", "@azure/core-lro"]]],
    ]);

    resolveCollisions(api, contextRefs);
    const alias = "_corelro_OperationState";

    const updated = api.modules[0].classes![0];
    expect(updated.extends).toBe(`BaseClass<${alias}<Foo>>`);
    expect(updated.implements![0]).toBe(`Pollable<${alias}<Bar>>`);
    expect(updated.typeParams).toBe(`<T extends ${alias}<any>>`);
    expect(updated.methods![0].sig).toContain(alias);
    expect(updated.methods![0].ret).toContain(alias);
    expect(updated.methods![0].params![0].type).toContain(alias);
    expect(updated.properties![0].type).toBe(`${alias}<Z>`);
    expect(updated.constructors![0].sig).toContain(alias);
    expect(updated.constructors![0].params![0].type).toContain(alias);
    expect(updated.indexSignatures![0].valueType).toBe(`${alias}<B>`);
  });

  it("rewrites interface call signatures", () => {
    const iface: InterfaceInfo = {
      name: "Callable",
      callSignatures: [
        { sig: "x: OperationState", ret: "OperationState", typeParams: "T extends OperationState" },
      ],
    };

    const api = makeApi({
      modules: [{
        name: "main",
        types: [{ name: "OperationState", type: "string" } as TypeAliasInfo],
        interfaces: [iface],
      }],
      dependencies: [{
        package: "@azure/core-lro",
        interfaces: [{ name: "OperationState", typeParams: "<T>" } as InterfaceInfo],
      }],
    });

    const contextRefs = makeContextRefs([
      ["Callable", [["OperationState", "@azure/core-lro"]]],
    ]);

    resolveCollisions(api, contextRefs);
    const alias = "_corelro_OperationState";

    const updated = api.modules[0].interfaces![0];
    expect(updated.callSignatures![0].sig).toBe(`x: ${alias}`);
    expect(updated.callSignatures![0].ret).toBe(alias);
    expect(updated.callSignatures![0].typeParams).toBe(`T extends ${alias}`);
  });

  it("rewrites interface construct signatures", () => {
    const iface: InterfaceInfo = {
      name: "Constructable",
      constructSignatures: [
        { sig: "x: OperationState", ret: "OperationState" },
      ],
    };

    const api = makeApi({
      modules: [{
        name: "main",
        types: [{ name: "OperationState", type: "string" } as TypeAliasInfo],
        interfaces: [iface],
      }],
      dependencies: [{
        package: "@azure/core-lro",
        interfaces: [{ name: "OperationState", typeParams: "<T>" } as InterfaceInfo],
      }],
    });

    const contextRefs = makeContextRefs([
      ["Constructable", [["OperationState", "@azure/core-lro"]]],
    ]);

    resolveCollisions(api, contextRefs);
    const alias = "_corelro_OperationState";

    const updated = api.modules[0].interfaces![0];
    expect(updated.constructSignatures![0].sig).toBe(`x: ${alias}`);
    expect(updated.constructSignatures![0].ret).toBe(alias);
  });

  it("rewrites interface extends and methods", () => {
    const iface: InterfaceInfo = {
      name: "MyInterface",
      extends: ["Base<OperationState>"],
      methods: [{ name: "run", sig: "() => OperationState", ret: "OperationState" }],
      properties: [{ name: "val", type: "OperationState" }],
    };

    const api = makeApi({
      modules: [{
        name: "main",
        types: [{ name: "OperationState", type: "string" } as TypeAliasInfo],
        interfaces: [iface],
      }],
      dependencies: [{
        package: "@azure/core-lro",
        interfaces: [{ name: "OperationState", typeParams: "<T>" } as InterfaceInfo],
      }],
    });

    const contextRefs = makeContextRefs([
      ["MyInterface", [["OperationState", "@azure/core-lro"]]],
    ]);

    resolveCollisions(api, contextRefs);
    const alias = "_corelro_OperationState";

    const updated = api.modules[0].interfaces![0];
    expect(updated.extends![0]).toBe(`Base<${alias}>`);
    expect(updated.methods![0].ret).toBe(alias);
    expect(updated.properties![0].type).toBe(alias);
  });

  it("rewrites type alias body", () => {
    const api = makeApi({
      modules: [{
        name: "main",
        types: [
          { name: "OperationState", type: "string" } as TypeAliasInfo,
          { name: "MyState", type: "OperationState | null", typeParams: "" } as TypeAliasInfo,
        ],
      }],
      dependencies: [{
        package: "@azure/core-lro",
        interfaces: [{ name: "OperationState", typeParams: "<T>" } as InterfaceInfo],
      }],
    });

    const contextRefs = makeContextRefs([
      ["MyState", [["OperationState", "@azure/core-lro"]]],
    ]);

    resolveCollisions(api, contextRefs);

    const updated = api.modules[0].types![1]; // MyState
    expect(updated.type).toBe("_corelro_OperationState | null");
  });

  it("rewrites function sig and ret", () => {
    const fn: FunctionInfo = {
      name: "doWork",
      sig: "(state: OperationState) => void",
      ret: "Promise<OperationState>",
      params: [{ name: "state", type: "OperationState" }],
    };

    const api = makeApi({
      modules: [{
        name: "main",
        types: [{ name: "OperationState", type: "string" } as TypeAliasInfo],
        functions: [fn],
      }],
      dependencies: [{
        package: "@azure/core-lro",
        interfaces: [{ name: "OperationState", typeParams: "<T>" } as InterfaceInfo],
      }],
    });

    const contextRefs = makeContextRefs([
      ["doWork", [["OperationState", "@azure/core-lro"]]],
    ]);

    resolveCollisions(api, contextRefs);
    const alias = "_corelro_OperationState";

    const updated = api.modules[0].functions![0];
    expect(updated.sig).toContain(alias);
    expect(updated.ret).toContain(alias);
    expect(updated.params![0].type).toBe(alias);
  });

  it("does not rewrite entity that references the main package's version", () => {
    const api = makeApi({
      modules: [{
        name: "main",
        types: [
          { name: "OperationState", type: "string" } as TypeAliasInfo,
          { name: "MyAlias", type: "OperationState[]" } as TypeAliasInfo,
        ],
      }],
      dependencies: [{
        package: "@azure/core-lro",
        interfaces: [{ name: "OperationState", typeParams: "<T>" } as InterfaceInfo],
      }],
    });

    // MyAlias references the main package's OperationState, not core-lro's
    const contextRefs = makeContextRefs([
      ["MyAlias", [["OperationState", "@azure/test-pkg"]]],
    ]);

    resolveCollisions(api, contextRefs);

    // Main's version keeps bare name → no rewrite
    const updated = api.modules[0].types![1]; // MyAlias
    expect(updated.type).toBe("OperationState[]");
  });

  it("handles nested namespace members", () => {
    const api = makeApi({
      modules: [{
        name: "main",
        types: [{ name: "OperationState", type: "string" } as TypeAliasInfo],
        namespaces: [{
          name: "Inner",
          types: [{ name: "Nested", type: "OperationState | null" } as TypeAliasInfo],
        }],
      }],
      dependencies: [{
        package: "@azure/core-lro",
        interfaces: [{ name: "OperationState", typeParams: "<T>" } as InterfaceInfo],
      }],
    });

    const contextRefs = makeContextRefs([
      ["Inner.Nested", [["OperationState", "@azure/core-lro"]]],
    ]);

    resolveCollisions(api, contextRefs);

    const nested = api.modules[0].namespaces![0].types![0];
    expect(nested.type).toBe("_corelro_OperationState | null");
  });

  it("skips node dependency types in collision detection", () => {
    const api = makeApi({
      modules: [{ name: "main", types: [{ name: "Buffer", type: "Uint8Array" } as TypeAliasInfo] }],
      dependencies: [{ package: "node:buffer", isNode: true, types: [{ name: "Buffer", type: "Buffer" } as TypeAliasInfo] }],
    });

    const contextRefs = makeContextRefs([]);
    const result = resolveCollisions(api, contextRefs);
    expect(Object.keys(result)).toHaveLength(0);
  });
});

describe("lexer-based replacement", () => {
  it("does not replace property keys in object literal types", () => {
    const api = makeApi({
      modules: [{
        name: "main",
        types: [
          { name: "OperationState", type: "string" } as TypeAliasInfo,
          { name: "MyType", type: "{ OperationState: string }" } as TypeAliasInfo,
        ],
      }],
      dependencies: [{
        package: "@azure/core-lro",
        interfaces: [{ name: "OperationState", typeParams: "<T>" } as InterfaceInfo],
      }],
    });

    const contextRefs = makeContextRefs([
      ["MyType", [["OperationState", "@azure/core-lro"]]],
    ]);

    resolveCollisions(api, contextRefs);
    const updated = api.modules[0].types![1];
    // Property keys in object type literals like `{ OperationState: string }` are labels,
    // not type references. They should NOT be replaced — only identifiers in type positions
    // (e.g., type annotations, extends clauses) are rewritten.
    expect(updated.type).toBe("{ OperationState: string }");
  });

  it("does not replace inside string literals", () => {
    const api = makeApi({
      modules: [{
        name: "main",
        types: [
          { name: "OperationState", type: "string" } as TypeAliasInfo,
          { name: "MyType", type: '"OperationState" | "Other"' } as TypeAliasInfo,
        ],
      }],
      dependencies: [{
        package: "@azure/core-lro",
        interfaces: [{ name: "OperationState", typeParams: "<T>" } as InterfaceInfo],
      }],
    });

    const contextRefs = makeContextRefs([
      ["MyType", [["OperationState", "@azure/core-lro"]]],
    ]);

    resolveCollisions(api, contextRefs);
    const updated = api.modules[0].types![1];
    // String literal content should NOT be replaced
    expect(updated.type).toBe('"OperationState" | "Other"');
  });

  it("does not replace qualified references (after dot)", () => {
    const api = makeApi({
      modules: [{
        name: "main",
        types: [
          { name: "OperationState", type: "string" } as TypeAliasInfo,
          { name: "MyType", type: "Foo.OperationState | OperationState" } as TypeAliasInfo,
        ],
      }],
      dependencies: [{
        package: "@azure/core-lro",
        interfaces: [{ name: "OperationState", typeParams: "<T>" } as InterfaceInfo],
      }],
    });

    const contextRefs = makeContextRefs([
      ["MyType", [["OperationState", "@azure/core-lro"]]],
    ]);

    resolveCollisions(api, contextRefs);
    const updated = api.modules[0].types![1];
    // Foo.OperationState should NOT have OperationState replaced (qualified)
    // But standalone OperationState should be replaced
    expect(updated.type).toBe("Foo.OperationState | _corelro_OperationState");
  });
});

describe("ambiguous provenance skips rewrite", () => {
  it("skips rewrite when type maps to multiple packages (ambiguous)", () => {
    const api = makeApi({
      modules: [{
        name: "main",
        types: [
          { name: "Foo", type: "string" } as TypeAliasInfo,
          { name: "Consumer", type: "Foo | null" } as TypeAliasInfo,
        ],
      }],
      dependencies: [
        { package: "pkg-a", interfaces: [{ name: "Foo" } as InterfaceInfo] },
        { package: "pkg-b", types: [{ name: "Foo", type: "any" } as TypeAliasInfo] },
      ],
    });

    // Consumer references Foo from BOTH pkg-a and pkg-b — ambiguous provenance
    const contextRefs = makeContextRefs([
      ["Consumer", [["Foo", "pkg-a"], ["Foo", "pkg-b"]]],
    ]);

    resolveCollisions(api, contextRefs);

    // Because packageNames.size !== 1, buildReplacementsForEntity skips Foo
    const updated = api.modules[0].types![1]; // Consumer
    expect(updated.type).toBe("Foo | null");
  });
});

describe("alias uniqueness with dep names", () => {
  it("generated alias does not collide with existing dep type name", () => {
    // dep A exports "_pkgb_State" (which is also the natural alias for dep B's "State")
    // dep B exports "State" — collision with main's "State"
    const api = makeApi({
      modules: [{ name: "main", types: [{ name: "State", type: "string" } as TypeAliasInfo] }],
      dependencies: [
        { package: "pkg-a", types: [{ name: "_pkgb_State", type: "any" } as TypeAliasInfo] },
        { package: "pkg-b", interfaces: [{ name: "State" } as InterfaceInfo] },
      ],
    });
    const contextRefs = makeContextRefs([]);
    const result = resolveCollisions(api, contextRefs);

    expect(result).toHaveProperty("State");
    const alias = result["State"]["pkg-b"];
    // The natural alias "_pkgb_State" collides with dep A's export — must disambiguate
    expect(alias).not.toBe("_pkgb_State");
    expect(alias).toBeDefined();
  });
});

describe("main function does not trigger collision", () => {
  it("main function name doesn't collide with dep interface of same name", () => {
    const api = makeApi({
      modules: [{
        name: "main",
        functions: [{ name: "Pollable", sig: "() => void" } as FunctionInfo],
      }],
      dependencies: [{
        package: "dep-a",
        interfaces: [{ name: "Pollable" } as InterfaceInfo],
      }],
    });
    const contextRefs = makeContextRefs([]);
    const result = resolveCollisions(api, contextRefs);
    // Main function "Pollable" should NOT trigger collision with dep interface "Pollable"
    // because functions are not importable types
    expect(Object.keys(result)).toHaveLength(0);
  });
});

// --- Direct tests for replaceTypeIdentifiers (AST-based replacement) ---

/** Helper to build a replacements map from entries */
function makeReplacements(entries: [string, string][]): Map<string, string> {
  return new Map(entries);
}

describe("AST-based replaceTypeIdentifiers", () => {
  describe("template literals", () => {
    it("replaces identifier inside template literal expression", () => {
      const result = replaceTypeIdentifiers("`value is ${TypeName}`", makeReplacements([["TypeName", "Alias"]]));
      expect(result).toBe("`value is ${Alias}`");
    });

    it("handles template literal types without false matches in backtick content", () => {
      const result = replaceTypeIdentifiers("`hello ${string}`", makeReplacements([["hello", "replaced"]]));
      // "hello" inside template literal is literal text, not an identifier
      expect(result).toBe("`hello ${string}`");
    });
  });

  describe("comments in type text", () => {
    it("skips identifiers inside block comments", () => {
      const result = replaceTypeIdentifiers("/* MyType */ OtherType", makeReplacements([
        ["MyType", "AliasA"],
        ["OtherType", "AliasB"],
      ]));
      expect(result).toBe("/* MyType */ AliasB");
    });

    it("skips identifiers inside line comments", () => {
      const result = replaceTypeIdentifiers("// MyType\nOtherType", makeReplacements([
        ["MyType", "AliasA"],
        ["OtherType", "AliasB"],
      ]));
      expect(result).toBe("// MyType\nAliasB");
    });
  });

  describe("unicode identifiers", () => {
    it("replaces unicode identifier if in map", () => {
      const result = replaceTypeIdentifiers("Ünîcödé", makeReplacements([["Ünîcödé", "Replaced"]]));
      expect(result).toBe("Replaced");
    });
  });

  describe("qualified access", () => {
    it("does not replace right-hand side of dot access", () => {
      const result = replaceTypeIdentifiers("Foo.Bar", makeReplacements([["Bar", "AliasBar"]]));
      expect(result).toBe("Foo.Bar");
    });

    it("replaces left-hand side of dot access", () => {
      const result = replaceTypeIdentifiers("Foo.Bar", makeReplacements([["Foo", "AliasFoo"]]));
      expect(result).toBe("AliasFoo.Bar");
    });

    it("only replaces leftmost identifier in deeply nested access", () => {
      const result = replaceTypeIdentifiers("A.B.C", makeReplacements([
        ["A", "AliasA"],
        ["B", "AliasB"],
        ["C", "AliasC"],
      ]));
      expect(result).toBe("AliasA.B.C");
    });
  });

  describe("string literals in declarations", () => {
    it("does not replace identifiers inside double-quoted strings", () => {
      const result = replaceTypeIdentifiers('"MyType"', makeReplacements([["MyType", "Alias"]]));
      expect(result).toBe('"MyType"');
    });

    it("does not replace identifiers inside single-quoted strings", () => {
      const result = replaceTypeIdentifiers("'MyType'", makeReplacements([["MyType", "Alias"]]));
      expect(result).toBe("'MyType'");
    });
  });

  describe("complex type expressions", () => {
    it("replaces both sides of union types", () => {
      const result = replaceTypeIdentifiers("Foo | Bar", makeReplacements([
        ["Foo", "AliasFoo"],
        ["Bar", "AliasBar"],
      ]));
      expect(result).toBe("AliasFoo | AliasBar");
    });

    it("replaces both sides of intersection types", () => {
      const result = replaceTypeIdentifiers("Foo & Bar", makeReplacements([
        ["Foo", "AliasFoo"],
        ["Bar", "AliasBar"],
      ]));
      expect(result).toBe("AliasFoo & AliasBar");
    });

    it("replaces identifiers in generic types", () => {
      const result = replaceTypeIdentifiers("Map<Foo, Bar[]>", makeReplacements([
        ["Foo", "AliasFoo"],
        ["Bar", "AliasBar"],
      ]));
      expect(result).toBe("Map<AliasFoo, AliasBar[]>");
    });

    it("replaces all identifiers in conditional types", () => {
      const result = replaceTypeIdentifiers("Foo extends Bar ? Baz : Qux", makeReplacements([
        ["Foo", "AliasFoo"],
        ["Bar", "AliasBar"],
        ["Baz", "AliasBaz"],
        ["Qux", "AliasQux"],
      ]));
      expect(result).toBe("AliasFoo extends AliasBar ? AliasBaz : AliasQux");
    });

    it("replaces identifiers in mapped types", () => {
      const result = replaceTypeIdentifiers("{ [K in keyof Foo]: Bar }", makeReplacements([
        ["Foo", "AliasFoo"],
        ["Bar", "AliasBar"],
      ]));
      expect(result).toBe("{ [K in keyof AliasFoo]: AliasBar }");
    });

    it("replaces identifiers in indexed access types", () => {
      const result = replaceTypeIdentifiers('Foo["key"]', makeReplacements([["Foo", "AliasFoo"]]));
      expect(result).toBe('AliasFoo["key"]');
    });
  });

  describe("unparseable input graceful degradation", () => {
    it("returns original text unchanged for truly malformed input", () => {
      const text = "Foo ??? Bar !!!";
      const result = replaceTypeIdentifiers(text, makeReplacements([
        ["Foo", "AliasFoo"],
        ["Bar", "AliasBar"],
      ]));
      expect(result).toBe(text);
    });

    it("emits a diagnostic warning to stderr for unparseable fragments", () => {
      const chunks: string[] = [];
      const spy = vi.spyOn(process.stderr, "write").mockImplementation((chunk: string | Uint8Array) => {
        chunks.push(typeof chunk === "string" ? chunk : new TextDecoder().decode(chunk));
        return true;
      });
      try {
        replaceTypeIdentifiers("Foo ??? Bar !!!", makeReplacements([
          ["Foo", "AliasFoo"],
        ]));
        expect(spy).toHaveBeenCalledOnce();
        const diagnostic = JSON.parse(chunks[0]);
        expect(diagnostic.code).toBe("COLLISION_REWRITE_SKIP");
        expect(diagnostic.severity).toBe("warning");
        expect(diagnostic.message).toMatch(/Collision rewrite skipped.*Cannot parse type fragment/);
        expect(diagnostic.target).toBe("Foo ??? Bar !!!");
      } finally {
        spy.mockRestore();
      }
    });
  });

  describe("content type strategies", () => {
    it("handles type expressions (union, intersection, generics)", () => {
      const result = replaceTypeIdentifiers("Foo | Bar<Baz>", makeReplacements([
        ["Foo", "AliasFoo"],
        ["Bar", "AliasBar"],
        ["Baz", "AliasBaz"],
      ]));
      expect(result).toBe("AliasFoo | AliasBar<AliasBaz>");
    });

    it("handles parameter lists (function signatures)", () => {
      const result = replaceTypeIdentifiers("(a: Foo, b: Bar)", makeReplacements([
        ["Foo", "AliasFoo"],
        ["Bar", "AliasBar"],
      ]));
      expect(result).toBe("(a: AliasFoo, b: AliasBar)");
    });

    it("handles type parameter lists", () => {
      const result = replaceTypeIdentifiers("T extends Foo, U extends Bar", makeReplacements([
        ["Foo", "AliasFoo"],
        ["Bar", "AliasBar"],
      ]));
      expect(result).toBe("T extends AliasFoo, U extends AliasBar");
    });

    it("handles heritage clauses (extends/implements)", () => {
      const result = replaceTypeIdentifiers("Base<Foo>, Mixin<Bar>", makeReplacements([
        ["Base", "AliasBase"],
        ["Foo", "AliasFoo"],
        ["Mixin", "AliasMixin"],
        ["Bar", "AliasBar"],
      ]));
      expect(result).toBe("AliasBase<AliasFoo>, AliasMixin<AliasBar>");
    });

    it("handles parameter list with default values", () => {
      const result = replaceTypeIdentifiers("(a: Foo, b?: Bar)", makeReplacements([
        ["Foo", "AliasFoo"],
        ["Bar", "AliasBar"],
      ]));
      expect(result).toBe("(a: AliasFoo, b?: AliasBar)");
    });

    it("handles single type parameter with constraint", () => {
      const result = replaceTypeIdentifiers("T extends Foo", makeReplacements([
        ["Foo", "AliasFoo"],
      ]));
      expect(result).toBe("T extends AliasFoo");
    });
  });

  describe("no-op cases", () => {
    it("returns text unchanged when replacements map is empty", () => {
      const text = "Foo | Bar<Baz>";
      const result = replaceTypeIdentifiers(text, new Map());
      expect(result).toBe(text);
    });

    it("returns text unchanged when no identifiers match", () => {
      const text = "Foo | Bar<Baz>";
      const result = replaceTypeIdentifiers(text, makeReplacements([["NotHere", "Alias"]]));
      expect(result).toBe(text);
    });
  });
});
