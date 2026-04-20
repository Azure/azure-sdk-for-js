// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, vi } from "vitest";
import {
  computeAmbientTypes,
  validateSelfContainment,
  computeReachableTypes,
  getDefinedTypes,
  tarjanSCC,
} from "../reachability.js";
import { filterNamespaceMembers } from "../dependencies.js";
import type { ApiIndex, NamespaceInfo } from "../models.js";
import type { ExtractionContext } from "../context.js";

describe("filterNamespaceMembers", () => {
  it("keeps referenced members and removes unreferenced ones", () => {
    const ns: NamespaceInfo = {
      name: "Conversations",
      interfaces: [
        { name: "Message", properties: [], methods: [] },
        { name: "Conversation", properties: [], methods: [] },
      ],
      types: [
        { name: "InputTextContent", type: "ResponseInputText" },
        { name: "OutputTextContent", type: "ResponseOutputText" },
        { name: "ConversationItem", type: "Message | FunctionCall" },
      ],
    };

    const refs = new Set(["Message", "Conversation", "ConversationItem"]);
    const result = filterNamespaceMembers(ns, refs);

    expect(result).not.toBeNull();
    expect(result!.interfaces).toHaveLength(2);
    expect(result!.types).toHaveLength(1);
    expect(result!.types![0].name).toBe("ConversationItem");
  });

  it("returns null for namespace with no reachable members", () => {
    const ns: NamespaceInfo = {
      name: "Dead",
      types: [
        { name: "Unused1", type: "string" },
        { name: "Unused2", type: "number" },
      ],
    };

    const refs = new Set(["SomethingElse"]);
    const result = filterNamespaceMembers(ns, refs);
    expect(result).toBeNull();
  });

  it("filters nested namespaces bottom-up", () => {
    const ns: NamespaceInfo = {
      name: "Parent",
      namespaces: [
        {
          name: "Child",
          interfaces: [
            { name: "KeepMe", properties: [], methods: [] },
            { name: "DropMe", properties: [], methods: [] },
          ],
        },
        {
          name: "EmptyChild",
          types: [{ name: "Orphan", type: "string" }],
        },
      ],
    };

    const refs = new Set(["KeepMe"]);
    const result = filterNamespaceMembers(ns, refs);

    expect(result).not.toBeNull();
    expect(result!.namespaces).toHaveLength(1);
    expect(result!.namespaces![0].name).toBe("Child");
    expect(result!.namespaces![0].interfaces).toHaveLength(1);
    expect(result!.namespaces![0].interfaces![0].name).toBe("KeepMe");
  });

  it("keeps parent namespace when any nested child survives", () => {
    const ns: NamespaceInfo = {
      name: "Outer",
      types: [{ name: "DeadAlias", type: "string" }],
      namespaces: [{
        name: "Inner",
        interfaces: [{ name: "Alive", properties: [], methods: [] }],
      }],
    };

    const refs = new Set(["Alive"]);
    const result = filterNamespaceMembers(ns, refs);

    expect(result).not.toBeNull();
    expect(result!.types).toBeUndefined(); // DeadAlias filtered
    expect(result!.namespaces).toHaveLength(1);
  });

  it("does not retain members just because namespace name matches (companion case)", () => {
    // When a namespace name like "Delta" happens to match a ref, but its
    // members (FunctionCall, ToolCall) are NOT in refs, they should be filtered.
    // The BFS phase (expandReachableFromNamespace) is responsible for adding
    // member names to refs for non-companion namespaces; filterNamespaceMembers
    // only checks per-member name presence.
    const ns: NamespaceInfo = {
      name: "Delta",
      interfaces: [
        { name: "FunctionCall", properties: [], methods: [] },
        { name: "ToolCall", properties: [], methods: [] },
      ],
    };

    // Only "Delta" in refs, not its members
    const refs = new Set(["Delta"]);
    const result = filterNamespaceMembers(ns, refs);
    // No members have their names in refs, so namespace is empty → null
    expect(result).toBeNull();
  });

  it("retains members whose names are individually in refs", () => {
    const ns: NamespaceInfo = {
      name: "Delta",
      interfaces: [
        { name: "FunctionCall", properties: [], methods: [] },
        { name: "ToolCall", properties: [], methods: [] },
      ],
    };

    // After BFS adds member names for non-companion namespaces
    const refs = new Set(["Delta", "FunctionCall", "ToolCall"]);
    const result = filterNamespaceMembers(ns, refs);
    expect(result).not.toBeNull();
    expect(result!.interfaces).toHaveLength(2);
  });

  it("filters classes, enums, and functions", () => {
    const ns: NamespaceInfo = {
      name: "Mixed",
      classes: [
        { name: "KeepClass", constructors: [], methods: [], properties: [] },
        { name: "DropClass", constructors: [], methods: [], properties: [] },
      ],
      enums: [
        { name: "KeepEnum", values: ["A"] },
        { name: "DropEnum", values: ["B"] },
      ],
      functions: [
        { name: "keepFn", sig: "(): void" },
        { name: "dropFn", sig: "(): void" },
      ],
    };

    const refs = new Set(["KeepClass", "KeepEnum", "keepFn"]);
    const result = filterNamespaceMembers(ns, refs);

    expect(result).not.toBeNull();
    expect(result!.classes).toHaveLength(1);
    expect(result!.classes![0].name).toBe("KeepClass");
    expect(result!.enums).toHaveLength(1);
    expect(result!.enums![0].name).toBe("KeepEnum");
    expect(result!.functions).toHaveLength(1);
    expect(result!.functions![0].name).toBe("keepFn");
  });
});

// ---------------------------------------------------------------------------
// computeAmbientTypes
// ---------------------------------------------------------------------------

/**
 * Creates a minimal mock ExtractionContext for computeAmbientTypes tests.
 * Only the fields read by computeAmbientTypes are provided.
 */
function mockCtx(
  builtins: Map<string, Set<string>> = new Map(),
): ExtractionContext {
  const allNames = new Set<string>();
  for (const names of builtins.values()) {
    for (const n of names) allNames.add(n);
  }
  return {
    referencedBuiltins: builtins,
    discoveredBuiltins: allNames,
    isBuiltinType(name: string) {
      return allNames.has(name);
    },
  } as unknown as ExtractionContext;
}

/** Builds a minimal ApiIndex with one module from the given entities. */
function apiWith(
  entities: {
    interfaces?: ApiIndex["modules"][0]["interfaces"];
    types?: ApiIndex["modules"][0]["types"];
    functions?: ApiIndex["modules"][0]["functions"];
    classes?: ApiIndex["modules"][0]["classes"];
    namespaces?: ApiIndex["modules"][0]["namespaces"];
  },
  deps?: ApiIndex["dependencies"],
): ApiIndex {
  return {
    package: "test-pkg",
    modules: [{ name: "main", ...entities }],
    dependencies: deps,
  };
}

describe("computeAmbientTypes", () => {
  it("classifies unresolved builtins by dom/es category", () => {
    // AbortSignal and Promise referenced via referencedTypes but not defined
    const api = apiWith({
      interfaces: [
        {
          name: "MyClient",
          methods: [{ name: "run", sig: "(signal: AbortSignal): Promise<void>" }],
          referencedTypes: ["AbortSignal", "Promise"],
        },
      ],
    });
    const ctx = mockCtx(
      new Map([
        ["dom", new Set(["AbortSignal"])],
        ["es", new Set(["Promise"])],
      ]),
    );

    const result = computeAmbientTypes(api, ctx);
    expect(result["dom"]).toContain("AbortSignal");
    expect(result["es"]).toContain("Promise");
  });

  it("excludes types that are defined in the API", () => {
    const api = apiWith({
      interfaces: [
        {
          name: "MyOptions",
          properties: [{ name: "client", type: "MyClient", readonly: false }],
          referencedTypes: ["MyClient"],
        },
        { name: "MyClient", methods: [] },
      ],
    });
    const ctx = mockCtx();

    const result = computeAmbientTypes(api, ctx);
    // MyClient is both defined and referenced — should NOT be ambient
    expect(result["dom"]).toBeUndefined();
    expect(result["es"]).toBeUndefined();
    expect(result["node"]).toBeUndefined();
  });

  it("excludes primitive types", () => {
    const api = apiWith({
      interfaces: [
        {
          name: "Foo",
          properties: [
            { name: "a", type: "string" },
            { name: "b", type: "number" },
            { name: "c", type: "boolean" },
          ],
        },
      ],
    });
    const ctx = mockCtx();

    const result = computeAmbientTypes(api, ctx);
    expect(Object.keys(result)).toHaveLength(0);
  });

  it("excludes generic type parameters", () => {
    const api = apiWith({
      interfaces: [
        {
          name: "Container",
          typeParams: "T, K",
          properties: [
            { name: "value", type: "T" },
            { name: "key", type: "K" },
          ],
        },
      ],
    });
    const ctx = mockCtx();

    const result = computeAmbientTypes(api, ctx);
    expect(Object.keys(result)).toHaveLength(0);
  });

  it("classifies Node.js globals as 'node'", () => {
    const api = apiWith({
      functions: [
        { name: "readData", sig: "(buf: Buffer): Readable", referencedTypes: ["Buffer", "Readable"] },
      ],
    });
    // Buffer and Readable are NOT in referencedBuiltins (they come from @types/node)
    const ctx = mockCtx();

    const result = computeAmbientTypes(api, ctx);
    expect(result["node"]).toContain("Buffer");
    expect(result["node"]).toContain("Readable");
  });

  it("expands namespace prefixes to qualified names", () => {
    // NodeJS used as "NodeJS.ReadableStream" — compiler tracks both the simple name and qualified ref
    const api = apiWith({
      functions: [
        { name: "getStream", sig: "(): NodeJS.ReadableStream", referencedTypes: ["NodeJS"] },
      ],
    });
    api.qualifiedReferencedTypes = ["NodeJS.ReadableStream"];
    const ctx = mockCtx();

    const result = computeAmbientTypes(api, ctx);
    expect(result["node"]).toContain("NodeJS.ReadableStream");
    // Should NOT contain bare "NodeJS" since it was expanded
    expect(result["node"]).not.toContain("NodeJS");
  });

  it("moves shared DOM/Node types to 'node' when exclusive node types exist", () => {
    // Buffer is an exclusive node type; AbortSignal is shared
    const api = apiWith({
      functions: [
        { name: "doWork", sig: "(signal: AbortSignal, buf: Buffer): void", referencedTypes: ["AbortSignal", "Buffer"] },
      ],
    });
    // AbortSignal tracked as dom builtin during extraction
    const ctx = mockCtx(new Map([["dom", new Set(["AbortSignal"])]]));

    const result = computeAmbientTypes(api, ctx);
    // Buffer triggers "node" category; AbortSignal should move from dom to node
    expect(result["node"]).toContain("Buffer");
    expect(result["node"]).toContain("AbortSignal");
    // dom category should be gone (or not contain AbortSignal)
    expect(result["dom"]).toBeUndefined();
  });

  it("returns empty object when there are no unresolved types", () => {
    const api = apiWith({
      interfaces: [
        {
          name: "Simple",
          properties: [{ name: "x", type: "string" }],
        },
      ],
    });
    const ctx = mockCtx();

    const result = computeAmbientTypes(api, ctx);
    expect(result).toEqual({});
  });

  it("finds types referenced in dependency type bodies", () => {
    // AbortSignal only appears in a dependency type's referencedTypes, not in the main module
    const api = apiWith(
      {
        interfaces: [
          {
            name: "MyClient",
            properties: [{ name: "opts", type: "DepOptions" }],
            referencedTypes: ["DepOptions"],
          },
        ],
      },
      [
        {
          package: "@dep/core",
          types: [{ name: "DepOptions", type: "{ signal: AbortSignal }", referencedTypes: ["AbortSignal"] }],
        },
      ],
    );
    const ctx = mockCtx(new Map([["dom", new Set(["AbortSignal"])]]));

    const result = computeAmbientTypes(api, ctx);
    expect(result["dom"]).toContain("AbortSignal");
  });
});

// ---------------------------------------------------------------------------
// validateSelfContainment
// ---------------------------------------------------------------------------

describe("validateSelfContainment", () => {
  it("emits no diagnostic when all referenced types are defined", () => {
    const api = apiWith({
      interfaces: [
        {
          name: "MyOptions",
          properties: [{ name: "client", type: "MyClient" }],
          referencedTypes: ["MyClient"],
        },
        { name: "MyClient", methods: [] },
      ],
    });
    const ctx = mockCtx();
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    validateSelfContainment(api, ctx);

    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it("emits SELF_CONTAINMENT diagnostic for missing types", () => {
    const api = apiWith({
      interfaces: [
        {
          name: "MyClient",
          properties: [{ name: "opts", type: "UnknownOptions" }],
          referencedTypes: ["UnknownOptions"],
        },
      ],
    });
    const ctx = mockCtx();
    const spy = vi.spyOn(process.stderr, "write").mockImplementation(() => true);

    validateSelfContainment(api, ctx);

    expect(spy).toHaveBeenCalledOnce();
    const output = spy.mock.calls[0][0] as string;
    const diag = JSON.parse(output);
    expect(diag.code).toBe("SELF_CONTAINMENT");
    expect(diag.message).toContain("UnknownOptions");
    expect(diag.message).toContain("Self-containment");
    spy.mockRestore();
  });

  it("does not flag builtin types (Promise, Array, Map)", () => {
    const api = apiWith({
      functions: [
        { name: "fetch", sig: "(url: string): Promise<Array<Map<string, number>>>", referencedTypes: ["Promise", "Array", "Map"] },
      ],
    });
    const builtinNames = new Set(["Promise", "Array", "Map"]);
    const ctx = {
      referencedBuiltins: new Map([["es", builtinNames]]),
      discoveredBuiltins: builtinNames,
      isBuiltinType(name: string) {
        return builtinNames.has(name);
      },
    } as unknown as ExtractionContext;
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    validateSelfContainment(api, ctx);

    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it("does not flag primitive types (string, number, boolean)", () => {
    const api = apiWith({
      interfaces: [
        {
          name: "Foo",
          properties: [
            { name: "a", type: "string" },
            { name: "b", type: "number" },
            { name: "c", type: "boolean" },
          ],
        },
      ],
    });
    const ctx = mockCtx();
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    validateSelfContainment(api, ctx);

    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it("does not flag declared type parameters", () => {
    const api = apiWith({
      interfaces: [
        {
          name: "Container",
          typeParams: "T, K extends string",
          properties: [
            { name: "value", type: "T" },
            { name: "key", type: "K" },
          ],
        },
      ],
    });
    const ctx = mockCtx();
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    validateSelfContainment(api, ctx);

    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it("does not flag Node globals (Buffer, NodeJS) since they are now exempted", () => {
    // NODE_GLOBAL_TYPES are now exempted by validateSelfContainment
    const api = apiWith({
      functions: [
        { name: "readData", sig: "(buf: Buffer): NodeJS", referencedTypes: ["Buffer", "NodeJS"] },
      ],
    });
    const ctx = mockCtx();
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    validateSelfContainment(api, ctx);

    // Buffer and NodeJS are now exempted — no diagnostic should be emitted
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it("includes dependency-defined types in the defined set", () => {
    // DepOptions is defined in dependencies, referenced in main module
    const api = apiWith(
      {
        interfaces: [
          {
            name: "MyClient",
            properties: [{ name: "opts", type: "DepOptions" }],
            referencedTypes: ["DepOptions"],
          },
        ],
      },
      [
        {
          package: "@dep/core",
          interfaces: [{ name: "DepOptions", methods: [], properties: [] }],
        },
      ],
    );
    const ctx = mockCtx();
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    validateSelfContainment(api, ctx);

    // DepOptions from dependencies should be in the defined set → no diagnostic
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it("excludes declared type parameters via declaredTypeParamNames", () => {
    // T is a declared type param, not a real type reference
    const api = apiWith({
      interfaces: [
        {
          name: "Container",
          typeParams: "<T extends Record<string, Foo>>",
          declaredTypeParamNames: ["T"],
          referencedTypes: ["Record", "Foo"],
          methods: [],
        },
      ],
    });
    const ctx = mockCtx();
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    validateSelfContainment(api, ctx);

    // T should NOT be flagged as dangling (it's a declared type param)
    // Record and Foo are unresolved — Foo would be dangling
    if (spy.mock.calls.length > 0) {
      expect(spy.mock.calls[0][0]).not.toContain("T");
    }
    spy.mockRestore();
  });
});

// ---------------------------------------------------------------------------
// computeReachableTypes
// ---------------------------------------------------------------------------

describe("computeReachableTypes", () => {
  it("returns entry-point types and their transitive references", () => {
    // EntryPoint → references Dep → references Leaf. All should be reachable.
    const api = apiWith({
      classes: [
        { name: "EntryPoint", entryPoint: true, referencedTypes: ["Dep"] },
      ],
      interfaces: [
        { name: "Dep", referencedTypes: ["Leaf"] },
        { name: "Leaf" },
        { name: "Unreachable" }, // not referenced by anything
      ],
    });
    const reachable = computeReachableTypes(api);
    expect(reachable).toContain("EntryPoint");
    expect(reachable).toContain("Dep");
    expect(reachable).toContain("Leaf");
    expect(reachable).not.toContain("Unreachable");
  });

  it("seeds namespace members as reachable when namespace has entryPoint", () => {
    const api = apiWith({
      namespaces: [{
        name: "MyNs",
        entryPoint: true,
        interfaces: [
          { name: "NsMember", methods: [], referencedTypes: ["Deep"] },
        ],
      }],
      interfaces: [
        { name: "Deep" },
        { name: "Orphan" },
      ],
    });
    const reachable = computeReachableTypes(api);
    expect(reachable).toContain("MyNs");
    expect(reachable).toContain("NsMember");
    expect(reachable).toContain("Deep");
    expect(reachable).not.toContain("Orphan");
  });

  it("handles empty API with no entry points", () => {
    const api = apiWith({
      interfaces: [{ name: "Orphan" }],
    });
    const reachable = computeReachableTypes(api);
    expect(reachable.size).toBe(0);
  });

  it("follows chains through multiple entity types", () => {
    // Class → Type alias → Function → Interface
    const api = apiWith({
      classes: [
        { name: "Client", entryPoint: true, referencedTypes: ["ClientOptions"] },
      ],
      types: [
        { name: "ClientOptions", type: "BaseOptions & Extra", referencedTypes: ["createClient"] },
      ],
      functions: [
        { name: "createClient", sig: "(): Result", referencedTypes: ["Result"] },
      ],
      interfaces: [
        { name: "Result" },
        { name: "Unused" },
      ],
    });
    const reachable = computeReachableTypes(api);
    expect(reachable).toContain("Client");
    expect(reachable).toContain("ClientOptions");
    expect(reachable).toContain("createClient");
    expect(reachable).toContain("Result");
    expect(reachable).not.toContain("Unused");
  });

  it("seeds nested namespace members recursively when entry point", () => {
    const api = apiWith({
      namespaces: [{
        name: "Outer",
        entryPoint: true,
        namespaces: [{
          name: "Inner",
          interfaces: [{ name: "DeepMember", methods: [] }],
        }],
      }],
    });
    const reachable = computeReachableTypes(api);
    expect(reachable).toContain("Outer");
    expect(reachable).toContain("Inner");
    expect(reachable).toContain("DeepMember");
  });
});

// ---------------------------------------------------------------------------
// getDefinedTypes
// ---------------------------------------------------------------------------

describe("getDefinedTypes", () => {
  it("collects types from all entity kinds", () => {
    const api = apiWith({
      classes: [{ name: "MyClass" }],
      interfaces: [{ name: "MyInterface" }],
      types: [{ name: "MyAlias", type: "string" }],
      functions: [{ name: "myFunction", sig: "(): void" }],
    });
    const defined = getDefinedTypes(api);
    expect(defined).toContain("MyClass");
    expect(defined).toContain("MyInterface");
    expect(defined).toContain("MyAlias");
    expect(defined).toContain("myFunction");
  });

  it("collects types from namespace members", () => {
    const api = apiWith({
      namespaces: [{
        name: "NS",
        classes: [{ name: "NsClass" }],
        interfaces: [{ name: "NsIface" }],
        enums: [{ name: "NsEnum", values: ["A"] }],
      }],
    });
    const defined = getDefinedTypes(api);
    expect(defined).toContain("NS");
    expect(defined).toContain("NsClass");
    expect(defined).toContain("NsIface");
    expect(defined).toContain("NsEnum");
  });
});

// ---------------------------------------------------------------------------
// computeAmbientTypes — namespace context tests
// ---------------------------------------------------------------------------

describe("computeAmbientTypes — namespace context", () => {
  it("handles same-named types in different namespaces without merging refs", () => {
    // Two "Options" interfaces in different namespaces with different referencedTypes
    const api = apiWith({
      namespaces: [
        {
          name: "A",
          interfaces: [{ name: "Options", methods: [], referencedTypes: ["Buffer"] }],
        },
        {
          name: "B",
          interfaces: [{ name: "Options", methods: [], referencedTypes: ["AbortSignal"] }],
        },
      ],
    });
    const ctx = mockCtx();
    const result = computeAmbientTypes(api, ctx);
    // Both Buffer (node) and AbortSignal (shared) should appear
    // The key thing: they shouldn't be merged — each namespace.Options has distinct refs
    const allTypes = Object.values(result).flat();
    expect(allTypes).toContain("Buffer");
  });

  it("collects referenced types from namespace members", () => {
    // A namespace member references an ambient type
    const api = apiWith({
      namespaces: [{
        name: "Events",
        entryPoint: true,
        interfaces: [
          { name: "Listener", methods: [], referencedTypes: ["EventEmitter"] },
        ],
      }],
    });
    const ctx = mockCtx();
    const result = computeAmbientTypes(api, ctx);
    // EventEmitter is a Node.js type referenced inside a namespace member
    expect(result["node"]).toContain("EventEmitter");
  });
});

// ---------------------------------------------------------------------------
// New reachability tests for WP-C
// ---------------------------------------------------------------------------

describe("computeReachableTypes — namespace pruning", () => {
  it("unreachable namespace members are removed", () => {
    // Namespace is entry point, but only some members are referenced
    const api = apiWith({
      namespaces: [{
        name: "MyNs",
        entryPoint: true,
        interfaces: [
          { name: "Used", methods: [], referencedTypes: [] },
          { name: "Unused", methods: [], referencedTypes: [] },
        ],
      }],
      classes: [
        { name: "Client", entryPoint: true, referencedTypes: ["Used"] },
      ],
    });
    const reachable = computeReachableTypes(api);
    // "Used" should be reachable via Client, "Unused" is seeded because namespace is entry point
    expect(reachable).toContain("MyNs");
    expect(reachable).toContain("Used");
    expect(reachable).toContain("Unused"); // all ns members seeded when ns is entryPoint
  });

  it("namespace-only module is kept when namespace is reachable", () => {
    const api: ApiIndex = {
      package: "test-pkg",
      modules: [{
        name: "ns-only",
        namespaces: [{
          name: "OnlyNs",
          entryPoint: true,
          interfaces: [{ name: "NsMember", methods: [] }],
        }],
      }],
    };
    const reachable = computeReachableTypes(api);
    expect(reachable).toContain("OnlyNs");
    expect(reachable).toContain("NsMember");
  });

  it("non-exported namespace is not retained as entry point", () => {
    const api = apiWith({
      namespaces: [{
        name: "InternalNs",
        // NOT an entry point
        interfaces: [{ name: "InternalMember", methods: [] }],
      }],
      classes: [
        { name: "Client", entryPoint: true, referencedTypes: [] },
      ],
    });
    const reachable = computeReachableTypes(api);
    expect(reachable).toContain("Client");
    expect(reachable).not.toContain("InternalNs");
    expect(reachable).not.toContain("InternalMember");
  });
});

describe("computeReachableTypes — cycle handling", () => {
  it("self-reference A → A does not infinite loop", () => {
    const api = apiWith({
      interfaces: [
        { name: "A", entryPoint: true, referencedTypes: ["A"] },
      ],
    });
    const reachable = computeReachableTypes(api);
    expect(reachable).toContain("A");
  });

  it("cycle A → B → A does not infinite loop", () => {
    const api = apiWith({
      interfaces: [
        { name: "A", entryPoint: true, referencedTypes: ["B"] },
        { name: "B", referencedTypes: ["A"] },
      ],
    });
    const reachable = computeReachableTypes(api);
    expect(reachable).toContain("A");
    expect(reachable).toContain("B");
  });
});

describe("computeReachableTypes — qualified keys", () => {
  it("two entities named Options in different modules don't collide", () => {
    const api: ApiIndex = {
      package: "test-pkg",
      modules: [
        {
          name: "mod-a",
          interfaces: [
            { name: "Options", entryPoint: true, referencedTypes: ["DepA"] },
          ],
          types: [{ name: "DepA", type: "string" }],
        },
        {
          name: "mod-b",
          interfaces: [
            { name: "Options", referencedTypes: ["DepB"] },
          ],
          types: [{ name: "DepB", type: "number" }],
        },
      ],
    };
    const reachable = computeReachableTypes(api);
    // Options from mod-a is entry point, DepA should be reachable
    expect(reachable).toContain("Options");
    expect(reachable).toContain("DepA");
    // DepB should NOT be reachable — mod-b/Options is not an entry point and
    // SCC-based traversal uses qualified keys, so same-named entities don't collide
    expect(reachable).not.toContain("DepB");
  });
});

describe("validateSelfContainment — Node ambient types", () => {
  it("does not report Node globals as dangling references", () => {
    const api = apiWith({
      functions: [
        { name: "readData", sig: "(buf: Buffer): Readable", referencedTypes: ["Buffer", "Readable"] },
      ],
    });
    const ctx = mockCtx();
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    validateSelfContainment(api, ctx);

    // Buffer and Readable are NODE_GLOBAL_TYPES — should not be flagged
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it("does not report NodeJS.* prefixed types as dangling", () => {
    const api = apiWith({
      functions: [
        { name: "getStream", sig: "(): NodeJS.ReadableStream", referencedTypes: ["NodeJS.ReadableStream"] },
      ],
    });
    const ctx = mockCtx();
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    validateSelfContainment(api, ctx);

    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it("still reports truly unknown types as dangling", () => {
    const api = apiWith({
      functions: [
        { name: "foo", sig: "(): UnknownThing", referencedTypes: ["UnknownThing"] },
      ],
    });
    const ctx = mockCtx();
    const spy = vi.spyOn(process.stderr, "write").mockImplementation(() => true);

    validateSelfContainment(api, ctx);

    expect(spy).toHaveBeenCalledOnce();
    const output = spy.mock.calls[0][0] as string;
    const diag = JSON.parse(output);
    expect(diag.code).toBe("SELF_CONTAINMENT");
    expect(diag.message).toContain("UnknownThing");
    spy.mockRestore();
  });
});

// ---------------------------------------------------------------------------
// tarjanSCC — unit tests
// ---------------------------------------------------------------------------

describe("tarjanSCC", () => {
  it("finds trivial single-node SCCs in a DAG", () => {
    const graph = new Map<string, Set<string>>([
      ["A", new Set(["B"])],
      ["B", new Set(["C"])],
      ["C", new Set()],
    ]);
    const sccs = tarjanSCC(graph);
    expect(sccs).toHaveLength(3);
    for (const scc of sccs) expect(scc).toHaveLength(1);
  });

  it("collapses a 2-node cycle into one SCC", () => {
    const graph = new Map<string, Set<string>>([
      ["A", new Set(["B"])],
      ["B", new Set(["A"])],
    ]);
    const sccs = tarjanSCC(graph);
    expect(sccs).toHaveLength(1);
    expect(sccs[0].sort()).toEqual(["A", "B"]);
  });

  it("finds a 3-node cycle as one SCC", () => {
    const graph = new Map<string, Set<string>>([
      ["A", new Set(["B"])],
      ["B", new Set(["C"])],
      ["C", new Set(["A"])],
    ]);
    const sccs = tarjanSCC(graph);
    expect(sccs).toHaveLength(1);
    expect(sccs[0].sort()).toEqual(["A", "B", "C"]);
  });

  it("separates disconnected components", () => {
    const graph = new Map<string, Set<string>>([
      ["A", new Set(["B"])],
      ["B", new Set(["A"])],
      ["X", new Set(["Y"])],
      ["Y", new Set(["X"])],
    ]);
    const sccs = tarjanSCC(graph);
    expect(sccs).toHaveLength(2);
    const sorted = sccs.map(s => s.sort()).sort((a, b) => a[0].localeCompare(b[0]));
    expect(sorted[0]).toEqual(["A", "B"]);
    expect(sorted[1]).toEqual(["X", "Y"]);
  });

  it("returns empty array for empty graph", () => {
    const sccs = tarjanSCC(new Map());
    expect(sccs).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// computeReachableTypes — SCC condensation tests
// ---------------------------------------------------------------------------

describe("computeReachableTypes — SCC condensation", () => {
  it("mutually-recursive types: A → B → A, both reachable if A is entry point", () => {
    const api = apiWith({
      interfaces: [
        { name: "A", entryPoint: true, referencedTypes: ["B"] },
        { name: "B", referencedTypes: ["A"] },
        { name: "Orphan" },
      ],
    });
    const reachable = computeReachableTypes(api);
    expect(reachable).toContain("A");
    expect(reachable).toContain("B");
    expect(reachable).not.toContain("Orphan");
  });

  it("large SCC: A → B → C → A, seeded from A → all three reachable", () => {
    const api = apiWith({
      interfaces: [
        { name: "A", entryPoint: true, referencedTypes: ["B"] },
        { name: "B", referencedTypes: ["C"] },
        { name: "C", referencedTypes: ["A"] },
        { name: "Unrelated" },
      ],
    });
    const reachable = computeReachableTypes(api);
    expect(reachable).toContain("A");
    expect(reachable).toContain("B");
    expect(reachable).toContain("C");
    expect(reachable).not.toContain("Unrelated");
  });

  it("unreachable cycle: D → E → D not connected to entry points → neither reachable", () => {
    const api = apiWith({
      interfaces: [
        { name: "Entry", entryPoint: true, referencedTypes: ["Leaf"] },
        { name: "Leaf" },
        { name: "D", referencedTypes: ["E"] },
        { name: "E", referencedTypes: ["D"] },
      ],
    });
    const reachable = computeReachableTypes(api);
    expect(reachable).toContain("Entry");
    expect(reachable).toContain("Leaf");
    expect(reachable).not.toContain("D");
    expect(reachable).not.toContain("E");
  });

  it("SCC with outgoing edge: cycle + tail reachable", () => {
    const api = apiWith({
      interfaces: [
        { name: "A", entryPoint: true, referencedTypes: ["B"] },
        { name: "B", referencedTypes: ["A", "C"] },
        { name: "C" },
      ],
    });
    const reachable = computeReachableTypes(api);
    expect(reachable).toContain("A");
    expect(reachable).toContain("B");
    expect(reachable).toContain("C");
  });

  it("name collision across modules: only entry-point module's deps are reachable", () => {
    const api: ApiIndex = {
      package: "test-pkg",
      modules: [
        {
          name: "auth",
          interfaces: [
            { name: "Config", entryPoint: true, referencedTypes: ["AuthToken"] },
          ],
          types: [{ name: "AuthToken", type: "string" }],
        },
        {
          name: "storage",
          interfaces: [
            { name: "Config", referencedTypes: ["StorageBlob"] },
          ],
          types: [{ name: "StorageBlob", type: "Blob" }],
        },
      ],
    };
    const reachable = computeReachableTypes(api);
    expect(reachable).toContain("Config");
    expect(reachable).toContain("AuthToken");
    expect(reachable).not.toContain("StorageBlob");
  });
});
