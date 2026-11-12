// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { beforeEach, describe, expect, it } from "vitest";
import { ProvisioningComponent, Resource, ResourceGroup, Stack, fn } from "../../../src/index.js";
import {
  buildOutputDeclarations,
  buildParameterDeclarations,
  buildResourceDeclaration,
  buildVariableDeclarations,
  buildStackDeclarations,
} from "../../../src/serialization/ast/declaration-builder.js";
import { createSymbolMap } from "../../../src/serialization/symbol-map.js";
import { collectResourceDeclarations } from "../../../src/constructs/resource/resource-query.js";
import { createLoopedResource, Loop } from "../../../src/internal-loop.js";

describe("contract declaration builder", () => {
  beforeEach(() => Stack.clearRoots());

  it("retains resource identities and separates ownership, ARM parents, and lookup scopes", () => {
    const stack = new Stack("relationships");
    const group = new ResourceGroup(stack, {
      name: "rg-shared",
      location: "eastus",
    });
    const context = new ProvisioningComponent(group);
    const parent = new Resource(context, {
      name: "parent",
      type: "Contoso.Test/widgets",
      apiVersion: "2024-01-01",
    });
    const child = new Resource(parent, {
      name: "child",
      type: "Contoso.Test/widgets/children",
      apiVersion: "2024-01-01",
    });
    const lookup = new Resource(context, {
      existing: true,
      name: "lookup",
      type: "Contoso.Test/lookups",
      apiVersion: "2024-01-01",
      scope: fn.resourceGroup("external"),
    });
    const resources = collectResourceDeclarations(stack);
    expect(resources).toEqual([group, parent, child, lookup]);
    const symbols = createSymbolMap(resources, stack);
    const prepared = buildStackDeclarations(stack, resources, symbols);
    expect(prepared.resources![symbols.get(child)!]).toEqual(
      buildResourceDeclaration(child, symbols)[1],
    );
    expect(buildResourceDeclaration(parent, symbols)[1].value).toMatchObject({
      kind: "object",
      value: { scope: { kind: "identifier", id: symbols.get(group) } },
    });
    expect(buildResourceDeclaration(child, symbols)[1].value).toMatchObject({
      kind: "object",
      value: { parent: { kind: "identifier", id: symbols.get(parent) } },
    });
    expect(buildResourceDeclaration(parent, symbols)[1].value).not.toHaveProperty("value.parent");
    expect(buildResourceDeclaration(child, symbols)[1].value).not.toHaveProperty("value.scope");
    expect(buildResourceDeclaration(lookup, symbols)[1].value).toMatchObject({
      kind: "object",
      value: {
        scope: {
          kind: "function-call",
          target: "resourceGroup",
          args: [{ kind: "string", value: "external" }],
        },
      },
    });
  });

  it("lowers declaration references and decorators without assembling a document", () => {
    const stack = new Stack("symbols");
    const parameter = stack.parameters.add("widget", "string", {
      defaultValue: "configured",
      description: "Widget name",
      allowed: ["configured", "other"],
    });
    const variable = stack.variables.add("widgetName", fn.concat(parameter, "-suffix"), {
      description: "Derived name",
      export: true,
    });
    const resource = new Resource(stack, {
      name: variable,
      type: "Contoso.Test/widgets",
      apiVersion: "2024-01-01",
    });
    stack.outputs.add("widget", "string", resource.name, {
      description: "Authored output",
    });
    const symbols = createSymbolMap(collectResourceDeclarations(stack), stack);
    expect(symbols.get(resource)).toBe("widget2");
    expect(buildParameterDeclarations(stack, symbols)).toMatchObject({
      widget: {
        decorators: {
          description: "Widget name",
          allowed: [
            { kind: "string", value: "configured" },
            { kind: "string", value: "other" },
          ],
        },
      },
    });
    expect(buildVariableDeclarations(stack, symbols)).toMatchObject({
      widgetName: {
        value: {
          kind: "function-call",
          target: "concat",
          args: [
            { kind: "identifier", id: "widget" },
            { kind: "string", value: "-suffix" },
          ],
        },
        decorators: { export: true },
      },
    });
    expect(buildOutputDeclarations(stack, symbols)).toMatchObject({
      widget: {
        value: {
          kind: "property-access",
          base: { kind: "identifier", id: "widget2" },
          property: "name",
        },
        decorators: { description: "Authored output" },
      },
    });
    expect(buildParameterDeclarations(new Stack("empty"), new Map())).toBeUndefined();
  });

  it("preserves conditions, loop bindings, and indexed parents", () => {
    const stack = new Stack("loops");
    const enabled = stack.parameters.add("enabled", "bool");
    const loop = new Loop(["first", "second"], {
      itemVariable: "item",
      indexVariable: "index",
      batchSize: 2,
    });

    const parent = createLoopedResource(
      Resource,
      loop,
      stack,
      {
        type: "Contoso.Test/widgets",
        apiVersion: "2024-01-01",
        name: loop.item,
      },
      { condition: enabled },
    );
    const child = new Resource(parent.at(0), {
      type: "Contoso.Test/widgets/children",
      apiVersion: "2024-01-01",
      name: "child",
    });
    const symbols = createSymbolMap(collectResourceDeclarations(stack), stack);
    expect(buildResourceDeclaration(parent, symbols)[1]).toMatchObject({
      decorators: { batchSize: 2 },
      value: {
        kind: "for-expression",
        itemVariable: "item",
        indexVariable: "index",
        body: {
          kind: "if-condition",
          condition: { kind: "identifier", id: "enabled" },
        },
      },
    });
    expect(buildResourceDeclaration(child, symbols)[1].value).toMatchObject({
      kind: "if-condition",
      body: {
        kind: "object",
        value: {
          parent: {
            kind: "array-access",
            base: { kind: "identifier", id: symbols.get(parent) },
            index: { kind: "integer", value: "0" },
          },
        },
      },
    });
  });
});
