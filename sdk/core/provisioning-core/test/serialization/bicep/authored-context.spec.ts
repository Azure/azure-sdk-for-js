// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { beforeEach, describe, expect, it } from "vitest";
import { ProvisioningComponent, Resource, ResourceGroup, Stack, fn } from "../../../src/index.js";
import { buildStackDeclarations } from "../../../src/serialization/ast/declaration-builder.js";
import { createSymbolMap } from "../../../src/serialization/symbol-map.js";
import { collectResourceDeclarations } from "../../../src/constructs/resource/resource-query.js";
import { createLoopedResource, Loop } from "../../../src/internal-loop.js";
import { deserialize, serialize } from "../../../src/serialization/index.js";
import {
  collectAuthoredResourceContexts,
  type AuthoredResourceContext,
} from "../../../src/serialization/bicep/file-layout/authored-context.js";
import type { ExpressionNode } from "../../../src/serialization/ast/index.js";

describe("authored context alongside declaration ASTs", () => {
  beforeEach(() => Stack.clearRoots());

  it.each<{
    existing: boolean;
    scope: ExpressionNode;
    expected: AuthoredResourceContext["scopeOrigin"];
  }>([
    {
      existing: false,
      scope: { kind: "function-call", target: "tenant", args: [] },
      expected: "pass-through-explicit",
    },
    {
      existing: true,
      scope: {
        kind: "function-call",
        target: "resourceGroup",
        args: [{ kind: "string", value: "external" }],
      },
      expected: "existing-explicit",
    },
    {
      existing: true,
      scope: { kind: "function-call", target: "customScope", args: [] },
      expected: "pass-through-explicit",
    },
  ])(
    "classifies explicit scope for Bicep placement: $expected (existing: $existing)",
    ({ existing, scope, expected }) => {
      const [stack] = deserialize(
        JSON.stringify({
          infras: [
            {
              fileName: "scope-context.bicep",
              targetScope: "subscription",
              resources: {
                resource: {
                  bicepIdentifier: "resource",
                  type: "Contoso.Test/widgets",
                  apiVersion: "2024-01-01",
                  existing,
                  value: {
                    kind: "object",
                    value: { name: { kind: "string", value: "widget" }, scope },
                  },
                },
              },
            },
          ],
        }),
      );
      const resources = collectResourceDeclarations(stack!);
      const symbols = createSymbolMap(resources, stack!);
      const contexts = collectAuthoredResourceContexts(resources, symbols);
      expect(contexts.get(symbols.get(resources[0]!)!)!.scopeOrigin).toBe(expected);
    },
  );

  it("retains original RG containment when explicit scope replaces the declaration's RG scope", () => {
    const stack = new Stack("context");
    const group = new ResourceGroup(stack, {
      name: "rg-context",
      location: "eastus",
    });
    const local = new Resource(new ProvisioningComponent(group), {
      type: "Contoso.Test/widgets",
      apiVersion: "2024-01-01",
      name: "local",
    });
    const external = new Resource(new ProvisioningComponent(group), {
      type: "Contoso.Test/widgets",
      apiVersion: "2024-01-01",
      name: "external",
      existing: true,
      scope: fn.resourceGroup("external-rg"),
    });
    const child = new Resource(new ProvisioningComponent(external), {
      type: "Contoso.Test/widgets/children",
      apiVersion: "2024-01-01",
      name: "child",
    });
    const extension = new Resource(new ProvisioningComponent(child), {
      type: "Contoso.Extensions/settings",
      apiVersion: "2024-01-01",
      name: "settings",
    });
    const resources = collectResourceDeclarations(stack);
    const symbols = createSymbolMap(resources, stack);
    const before = serialize(stack);
    const declarations = buildStackDeclarations(stack, resources, symbols);
    const resourceContexts = collectAuthoredResourceContexts(resources, symbols);
    expect([...resourceContexts]).toEqual([
      [symbols.get(group), { authoredParent: undefined, scopeOrigin: "none" }],
      [symbols.get(local), { authoredParent: symbols.get(group), scopeOrigin: "resourceGroup" }],
      [
        symbols.get(external),
        {
          authoredParent: symbols.get(group),
          scopeOrigin: "existing-explicit",
        },
      ],
      [symbols.get(child), { authoredParent: symbols.get(external), scopeOrigin: "none" }],
      [symbols.get(extension), { authoredParent: symbols.get(child), scopeOrigin: "none" }],
    ]);
    expect(declarations.resources![symbols.get(external)!]!.value).toMatchObject({
      value: {
        scope: { target: "resourceGroup", args: [{ value: "external-rg" }] },
      },
    });
    expect(declarations).not.toHaveProperty("resourceContexts");
    expect(serialize(stack)).toEqual(before);
    expect(serialize(stack).infras[0]).not.toHaveProperty("resourceContexts");
    expect(structuredClone(resourceContexts)).toEqual(resourceContexts);
  });

  it("records canonical looped parent identifiers without replacing indexed parent expressions", () => {
    const stack = new Stack("indexed-context", {
      targetScope: "resourceGroup",
    });
    const loop = new Loop(["first", "second"], { itemVariable: "item" });
    const parent = createLoopedResource(Resource, loop, stack, {
      type: "Contoso.Test/widgets",
      apiVersion: "2024-01-01",
      name: loop.item,
    });
    const child = new Resource(parent.at(0), {
      type: "Contoso.Test/widgets/children",
      apiVersion: "2024-01-01",
      name: "child",
    });
    const resources = collectResourceDeclarations(stack);
    const symbols = createSymbolMap(resources, stack);
    const declarations = buildStackDeclarations(stack, resources, symbols);
    const resourceContexts = collectAuthoredResourceContexts(resources, symbols);
    expect(resourceContexts.get(symbols.get(child)!)).toEqual({
      authoredParent: symbols.get(parent),
      scopeOrigin: "none",
    });
    expect(declarations.resources![symbols.get(child)!]!.value).toMatchObject({
      value: {
        parent: {
          kind: "array-access",
          base: { id: symbols.get(parent) },
          index: { value: "0" },
        },
      },
    });
    expect(declarations.resources![symbols.get(parent)!]!.value.kind).toBe("for-expression");
  });

  it("reports missing symbols rather than dropping authored context", () => {
    const stack = new Stack("missing-context");
    const group = new ResourceGroup(stack, {
      name: "rg-missing",
      location: "eastus",
    });
    const child = new Resource(group, {
      type: "Contoso.Test/widgets",
      apiVersion: "2024-01-01",
      name: "child",
    });
    expect(() => collectAuthoredResourceContexts([child], new Map())).toThrow("Missing symbol");
    expect(() => collectAuthoredResourceContexts([child], new Map([[child, "widget"]]))).toThrow(
      "Missing authored parent symbol",
    );
  });

  it("builds an empty stack without adding context to its persisted declarations", () => {
    const stack = new Stack("empty-context");
    expect(collectAuthoredResourceContexts([], new Map()).size).toBe(0);
    expect(buildStackDeclarations(stack, [], new Map())).toEqual({});
  });
});
