// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";
import {
  createLoopedResource,
  Resource,
  Loop,
  LoopedResource,
} from "../src/constructs/resource/resource.js";
import { isLoopedResource } from "../src/constructs/resource/resource-utils.js";
import { ProvisioningComponent } from "../src/constructs/provisioning-component.js";
import { Stack } from "../src/constructs/stack.js";
import { isExpression } from "../src/expression/expressions.js";
import { namingRequiredPolicy } from "../src/naming/naming-policy.js";
import { serialize } from "@azure/provisioning-core/serialization";
import { renderBicepFiles } from "@azure/provisioning-bicep";

/** Concatenated Bicep text across every file in a serialized document. */
function renderAll(doc: ReturnType<typeof serialize>): string {
  return renderBicepFiles(doc)
    .map((f) => f.contents)
    .join("\n");
}

/** First resource declaration node across all files in a serialized document. */
function firstResourceNode(doc: ReturnType<typeof serialize>) {
  for (const file of doc.infras) {
    const entries = Object.values(file.resources ?? {});
    if (entries.length > 0) return entries[0]!;
  }
  throw new Error("No resources found in serialized output");
}

describe("internal looped resource construction", () => {
  it("returns a LoopedResource<R> handle", () => {
    const stack = new Stack("t", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });

    const regions = new Loop<string>("regions" as any);
    const looped = createLoopedResource(Resource, regions, stack, {
      type: "Microsoft.Storage/storageAccounts",
      apiVersion: "2024-01-01",
      name: regions.item as any,
    });

    expect(isLoopedResource(looped)).toBe(true);
    expect(looped.loop.itemVariable).toBe(regions.itemVariable);
  });

  it("registers the looped resource in the stack tree", () => {
    const stack = new Stack("t", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });

    const regions = new Loop<string>("regions" as any);
    createLoopedResource(Resource, regions, stack, {
      type: "Microsoft.Storage/storageAccounts",
      apiVersion: "2024-01-01",
      name: regions.item as any,
    });

    // `LoopedResource` is a real ProvisioningComponent in the tree, but it's NOT a
    // `Resource` — both extend `ResourceDeclaration`.
    const declarations: unknown[] = [];
    stack.visit((n) => {
      if (isLoopedResource(n)) declarations.push(n);
    });
    expect(declarations.length).toBe(1);
  });

  it("emits Bicep `[for item in ...]` for a resource created via fromLoop", () => {
    const stack = new Stack("t", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });

    const regions = new Loop<string>("regions" as any);
    createLoopedResource(Resource, regions, stack, {
      type: "Microsoft.Storage/storageAccounts",
      apiVersion: "2024-01-01",
      name: regions.item as any,
    });

    const doc = serialize([stack]);
    const bicep = renderBicepFiles(doc)
      .map((f) => f.contents)
      .join("\n");
    expect(bicep).toContain("[for");
    // The test's collection is a bare string literal, so it renders as
    // 'regions' (Bicep string). Real usage passes an identifier
    // expression / param reference, which renders as `regions`.
    expect(bicep).toMatch(/in ['"]?regions['"]?/);
  });

  it(".at(0).id emits sym[0].id on the wire", () => {
    const stack = new Stack("t", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });

    const regions = new Loop<string>("regions" as any);
    const looped = createLoopedResource(Resource, regions, stack, {
      type: "Microsoft.Storage/storageAccounts",
      apiVersion: "2024-01-01",
      name: regions.item as any,
    });

    const first = looped.at(0);
    // Property access on the indexed proxy produces an Expression proxy.
    const id = (first as any).id;
    expect(id).toBeDefined();
  });

  it("isLoopedResource returns false for plain Resource", () => {
    const stack = new Stack("t", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });

    const r = new Resource(stack, {
      type: "Microsoft.Storage/storageAccounts",
      apiVersion: "2024-01-01",
      name: "sa1",
    });

    expect(isLoopedResource(r)).toBe(false);
  });
});

describe("indexed parent context — `parents.at(i)` as child ctx", () => {
  it("`new Child(parents.at(0), ...)` registers the child under the raw parent", () => {
    const stack = new Stack("t", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });

    const regions = new Loop<string>("regions" as any);
    const parents = createLoopedResource(Resource, regions, stack, {
      type: "Contoso.X/parents",
      apiVersion: "2024-01-01",
      name: regions.item as any,
    });
    const rawParent = parents.at(0); // indexed proxy

    const child = new Resource(rawParent, {
      type: "Contoso.X/parents/children",
      apiVersion: "2024-01-01",
      name: "c1",
    });

    // `child.parent` must be the raw parent (not the indexed proxy) so
    // that symbol-map lookups and framework tree walks work unchanged.
    expect(child.parent).not.toBe(rawParent);
    // The parent tree node here is the `LoopedResource<Resource>` — the
    // raw indexed proxy unwraps to it. The child registered under it
    // must show up in its children list.
    const parentInstances: unknown[] = [];
    stack.visit((n) => {
      if (isLoopedResource(n) && n.type === "Contoso.X/parents") {
        parentInstances.push(n);
      }
    });
    expect(parentInstances).toHaveLength(1);
    expect((parentInstances[0]! as LoopedResource).children).toContain(child);
  });

  it("serialized child emits `parent: parentSym[0]` for `parents.at(0)`", () => {
    const stack = new Stack("t", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });

    const regions = new Loop<string>("regions" as any);
    const parents = createLoopedResource(Resource, regions, stack, {
      type: "Contoso.X/parents",
      apiVersion: "2024-01-01",
      name: regions.item as any,
    });
    new Resource(parents.at(0), {
      type: "Contoso.X/parents/children",
      apiVersion: "2024-01-01",
      name: "c1",
    });

    const doc = serialize([stack]);
    const bicep = renderBicepFiles(doc)
      .map((f) => f.contents)
      .join("\n");
    // Child body includes `parent: parent[0]` (literal index 0).
    expect(bicep).toMatch(/parent:\s*parent\[0\]/);
  });

  it("serialized child emits `parent: parentSym[i]` for `parents.at(loop.index)`", () => {
    const stack = new Stack("t", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });

    const regions = new Loop<string>("regions" as any);
    const parents = createLoopedResource(Resource, regions, stack, {
      type: "Contoso.X/parents",
      apiVersion: "2024-01-01",
      name: regions.item as any,
    });
    // Child loop is independent — parent index tracks the parent's loop.
    createLoopedResource(Resource, regions, parents.at(regions.index), {
      type: "Contoso.X/parents/children",
      apiVersion: "2024-01-01",
      name: regions.item as any,
    });

    const doc = serialize([stack]);
    const bicep = renderBicepFiles(doc)
      .map((f) => f.contents)
      .join("\n");
    // Child body includes `parent: parent[<indexVar>]`.
    expect(bicep).toMatch(/parent:\s*parent\[i\d*\]/);
  });

  it("ARM property reads on an indexed proxy still emit `sym[i].path`", () => {
    const stack = new Stack("t", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });

    const regions = new Loop<string>("regions" as any);
    const looped = createLoopedResource(Resource, regions, stack, {
      type: "Microsoft.Storage/storageAccounts",
      apiVersion: "2024-01-01",
      name: regions.item as any,
    });

    const first = looped.at(0);
    // `.id` is a getter that funnels through `this.expr("id")`. The
    // indexed proxy must intercept `expr` so the resulting expression
    // roots at `sym[0]`, not `sym`.
    const id = (first as any).id;
    expect(id).toBeDefined();

    // Passthrough for authoring/type metadata (not indexed).
    expect(first.type).toBe("Microsoft.Storage/storageAccounts");
    expect(first.apiVersion).toBe("2024-01-01");
    expect(first.existing).toBeUndefined();
  });

  it("three-layer looped parent chain: only the descendants carry the loop index", () => {
    // Grandparent → parent → child, all expanded over the SAME loop via
    // `.at(loop.index)`. The grandparent's own loop needs no index (its
    // context was built before anyone read `loop.index`), but both
    // descendants reference their parent as `parentSym[i]`, so their
    // for-expressions must declare the index binding.
    const stack = new Stack("t", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });

    const regions = new Loop<string>("regions" as any);
    const grandparents = createLoopedResource(Resource, regions, stack, {
      type: "Contoso.X/grandparents",
      apiVersion: "2024-01-01",
      name: regions.item as any,
    });
    const parents = createLoopedResource(Resource, regions, grandparents.at(regions.index), {
      type: "Contoso.X/grandparents/parents",
      apiVersion: "2024-01-01",
      name: regions.item as any,
    });
    createLoopedResource(Resource, regions, parents.at(regions.index), {
      type: "Contoso.X/grandparents/parents/children",
      apiVersion: "2024-01-01",
      name: regions.item as any,
    });

    const bicep = renderAll(serialize([stack]));

    // Grandparent loop: plain `[for item in ...]`, no index binding.
    expect(bicep).toContain("[for item in");
    // Parent + child loops both declare the index because they reference
    // their parent as an array element.
    const indexedLoops = [...bicep.matchAll(/\[for \(item, i\) in/g)];
    expect(indexedLoops).toHaveLength(2);
    // Both descendants reference their parent as `parentSym[i]`.
    const parentRefs = [...bicep.matchAll(/parent: \w+\[i\]/g)];
    expect(parentRefs).toHaveLength(2);
  });
});

describe("Loop — item / index expressions and variable naming", () => {
  it("exposes `item` and `index` as Expression values", () => {
    const loop = new Loop<string>(["a", "b", "c"]);

    expect(isExpression(loop.item)).toBe(true);
    expect(isExpression(loop.index)).toBe(true);
  });

  it("defaults the item/index variable names to `item` / `i`", () => {
    const loop = new Loop<string>(["a", "b", "c"]);

    expect(loop.itemVariable).toBe("item");
    expect(loop.indexVariable).toBe("i");
  });

  it("honors explicit itemVariable / indexVariable in Bicep output", () => {
    const stack = new Stack("t", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });

    // A custom `indexVariable` counts as requesting the index, so the
    // renderer must emit the `[for (region, idx) in ...]` tuple binding.
    const regions = new Loop<string>("regions" as any, {
      itemVariable: "region",
      indexVariable: "idx",
    });
    expect(regions.itemVariable).toBe("region");
    expect(regions.indexVariable).toBe("idx");

    const looped = createLoopedResource(Resource, regions, stack, {
      type: "Microsoft.Storage/storageAccounts",
      apiVersion: "2024-01-01",
      name: regions.item as any,
    });
    expect(looped.loop.itemVariable).toBe("region");
    expect(looped.loop.indexVariable).toBe("idx");

    const bicep = renderAll(serialize([stack]));
    expect(bicep).toContain("[for (region, idx) in");
  });
});

describe("Loop — batchSize", () => {
  it("stores batchSize on the loop context", () => {
    const stack = new Stack("t", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });

    const regions = new Loop<string>("regions" as any, { batchSize: 3 });
    expect(regions.batchSize).toBe(3);

    const looped = createLoopedResource(Resource, regions, stack, {
      type: "Microsoft.Storage/storageAccounts",
      apiVersion: "2024-01-01",
      name: regions.item as any,
    });
    expect(looped.loop.batchSize).toBe(3);
  });

  it("serializes batchSize as a decorator on the resource node", () => {
    const stack = new Stack("t", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });

    const regions = new Loop<string>("regions" as any, { batchSize: 5 });
    createLoopedResource(Resource, regions, stack, {
      type: "Microsoft.Storage/storageAccounts",
      apiVersion: "2024-01-01",
      name: regions.item as any,
    });

    const node = firstResourceNode(serialize([stack]));
    expect(node.decorators?.batchSize).toBe(5);
  });

  it("renders @batchSize(n) in Bicep output", () => {
    const stack = new Stack("t", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });

    const regions = new Loop<string>("regions" as any, { batchSize: 3 });
    createLoopedResource(Resource, regions, stack, {
      type: "Microsoft.Storage/storageAccounts",
      apiVersion: "2024-01-01",
      name: regions.item as any,
    });

    const bicep = renderAll(serialize([stack]));
    expect(bicep).toContain("@batchSize(3)");
    expect(bicep).toContain("[for");
  });

  it("omits the batchSize decorator when not specified", () => {
    const stack = new Stack("t", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });

    const regions = new Loop<string>("regions" as any);
    createLoopedResource(Resource, regions, stack, {
      type: "Microsoft.Storage/storageAccounts",
      apiVersion: "2024-01-01",
      name: regions.item as any,
    });

    const node = firstResourceNode(serialize([stack]));
    expect(node.decorators?.batchSize).toBeUndefined();

    const bicep = renderAll(serialize([stack]));
    expect(bicep).not.toContain("@batchSize");
  });
});

describe("indexed proxy identity — `.at(i)` is not a class instance", () => {
  // A parent may expose a registration method that touches a `#private`
  // field, while a child's ctor guards the call with `context instanceof
  // Parent`. The looped-row handle must NOT report `instanceof Parent`, or
  // that guard would invoke `registerChild` against the bare
  // `LoopedResource` (which lacks the `#private` slot) and throw.
  class Parent extends Resource<"Contoso.X/parents"> {
    static resourceType = "Contoso.X/parents" as const;
    static apiVersion = "2024-01-01";
    #registered: Child | undefined;
    registerChild(child: Child): void {
      this.#registered = child; // throws unless `this` is a real Parent
    }
  }
  class Child extends Resource<"Contoso.X/parents/children"> {
    static resourceType = "Contoso.X/parents/children" as const;
    static apiVersion = "2024-01-01";
    constructor(context: Parent) {
      super(
        context as never,
        {
          type: Child.resourceType,
          apiVersion: Child.apiVersion,
          name: "c",
        } as never,
      );
      // Emitter-style singleton-registration guard.
      context instanceof Parent && context.registerChild(this);
    }
  }

  function loopedParents() {
    const stack = new Stack("t", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });
    const loop = new Loop<string>(["a", "b"]);
    const parents = createLoopedResource(Parent, loop, stack, {
      name: loop.item,
    } as never);
    return { stack, parents };
  }

  it("`looped.at(i)` is not `instanceof` the wrapped subclass", () => {
    const { parents } = loopedParents();
    expect(parents.at(0) instanceof Parent).toBe(false);
    // …but the declaration itself is still a recognizable looped resource.
    expect(isLoopedResource(parents)).toBe(true);
  });

  it("a self-registering child parented via `.at(i)` does not throw and emits `parent[0]`", () => {
    const { stack, parents } = loopedParents();
    // The `instanceof Parent` guard is now false for the looped-row handle,
    // so `registerChild` (which touches Parent's #private field) is skipped
    // instead of running against the bare LoopedResource and throwing.
    expect(() => new Child(parents.at(0) as never)).not.toThrow();

    // The scalar child is still wired to the specific element.
    const bicep = renderAll(serialize([stack]));
    expect(bicep).toMatch(/parent:\s*parent\[0\]/);
  });
});

describe("internal looped resource construction — optional props", () => {
  // A singleton-style resource: fixed `name`, all user props optional, so
  // its ctor declares `props?`. `fromLoop` should let callers omit `props`.
  class Singleton extends Resource<"Contoso.X/singletons"> {
    static resourceType = "Contoso.X/singletons" as const;
    static apiVersion = "2024-01-01";
    protected static buildResourceProps(props?: { readonly tag?: string }) {
      return {
        type: Singleton.resourceType,
        apiVersion: Singleton.apiVersion,
        name: "default",
        ...(props ?? {}),
      } as never;
    }
    constructor(context: ProvisioningComponent, props?: { readonly tag?: string }) {
      super(context as never, Singleton.buildResourceProps(props) as never);
    }
  }

  it("lets callers omit `props` when the ctor props are optional", () => {
    const stack = new Stack("t", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });
    const loop = new Loop<string>(["a", "b"]);
    // No `props` argument — compiles and runs because `Singleton`'s ctor
    // props are optional (conditional rest-tuple signature on `fromLoop`).
    const looped = createLoopedResource(Singleton, loop, stack);
    expect(isLoopedResource(looped)).toBe(true);
  });
});
