// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { beforeEach, describe, expect, it } from "vitest";
import { Resource, Stack } from "../../src/index.js";
import { unwrapExpression } from "../../src/expression/expressions.js";
import { createLoopedResource, Loop } from "../../src/internal-loop.js";
import { createSymbolMap } from "../../src/serialization/symbol-map.js";

describe("declaration symbol allocation", () => {
  beforeEach(() => Stack.clearRoots());

  it("maps metadata and expression handles to the same symbols", () => {
    const stack = new Stack("handles");
    const parameter = stack.parameters.add("name", "string");
    const variable = stack.variables.add("value", parameter);
    const symbols = createSymbolMap([], stack);

    expect(symbols.get(stack.parameters.getMetadata("name")!)).toBe("name");
    expect(symbols.get(unwrapExpression(parameter))).toBe("name");
    expect(symbols.get(stack.variables.getMetadata("value")!)).toBe("value");
    expect(symbols.get(unwrapExpression(variable))).toBe("value");
  });

  it("allocates parameters, variables, and resources in order without reusing suffixed names", () => {
    const stack = new Stack("collisions");
    const parameter = stack.parameters.add("widget", "string");
    const suffixedParameter = stack.parameters.add("widget2", "string");
    const variable = stack.variables.add("widget", "configured");
    const resources = ["first", "second"].map(
      (name) =>
        new Resource(stack, {
          type: "Contoso.Test/widgets",
          apiVersion: "2024-01-01",
          name,
        }),
    );
    stack.outputs.add("widget", "string", resources[0]!.id);

    const symbols = createSymbolMap(resources, stack);
    expect(symbols.get(unwrapExpression(parameter))).toBe("widget");
    expect(symbols.get(unwrapExpression(suffixedParameter))).toBe("widget2");
    expect(symbols.get(unwrapExpression(variable))).toBe("widget3");
    expect(resources.map((resource) => symbols.get(resource))).toEqual(["widget4", "widget5"]);
    expect(stack.parameters.listMetadata().map(({ name }) => name)).toEqual(["widget", "widget2"]);
    expect(stack.variables.listMetadata().map(({ name }) => name)).toEqual(["widget"]);
    expect(stack.outputs.list().map(({ name }) => name)).toEqual(["widget"]);
    expect(symbols.size).toBe(8);
  });

  it("applies resource name overrides without renaming authored declarations or changing default symbols", () => {
    const stack = new Stack("reserved-symbols");
    const parameter = stack.parameters.add("resourceGroup", "string");
    const variable = stack.variables.add("subscription", "configured");
    stack.outputs.add("tenant", "string", "authored-output");
    const resources = ["resourceGroups", "subscriptions", "managementGroups", "tenants"].map(
      (type) =>
        new Resource(stack, {
          type: `Contoso.Test/${type}`,
          apiVersion: "2024-01-01",
          name: type,
        }),
    );
    const overrides = new Map([
      ["resourceGroup", "rg"],
      ["subscription", "subscriptionResource"],
      ["managementGroup", "managementGroupResource"],
      ["tenant", "tenantResource"],
    ]);
    const symbols = createSymbolMap(resources, stack, overrides);

    expect(symbols.get(unwrapExpression(parameter))).toBe("resourceGroup");
    expect(symbols.get(unwrapExpression(variable))).toBe("subscription");
    expect(stack.outputs.list()[0]!.name).toBe("tenant");
    expect(resources.map((resource) => symbols.get(resource))).toEqual([
      "rg",
      "subscriptionResource",
      "managementGroupResource",
      "tenantResource",
    ]);
    expect(createSymbolMap(resources, stack).get(resources[2]!)).toBe("managementGroup");
  });

  it("resolves aliases using the same declaration namespace", () => {
    const stack = new Stack("alias-collisions");
    stack.parameters.add("rg", "string");
    stack.variables.add("rg2", "reserved");
    const resources = ["first", "second"].map(
      (name) =>
        new Resource(stack, {
          type: "Contoso.Test/resourceGroups",
          apiVersion: "2024-01-01",
          name,
        }),
    );
    const symbols = createSymbolMap(resources, stack, new Map([["resourceGroup", "rg"]]));
    expect(resources.map((resource) => symbols.get(resource))).toEqual(["rg3", "rg4"]);
  });

  it("allocates scalar and looped resource identities independently per Stack", () => {
    for (const name of ["first", "second"]) {
      const stack = new Stack(name);
      const scalar = new Resource(stack, {
        type: "Contoso.Test/widgets",
        apiVersion: "2024-01-01",
        name: "scalar",
      });
      const loop = new Loop(["a", "b"]);
      const looped = createLoopedResource(Resource, loop, stack, {
        type: "Contoso.Test/widgets",
        apiVersion: "2024-01-01",
        name: loop.item,
      });
      const symbols = createSymbolMap([scalar, looped], stack);
      expect(symbols.get(scalar)).toBe("widget");
      expect(symbols.get(looped)).toBe("widget2");
    }
  });
});
