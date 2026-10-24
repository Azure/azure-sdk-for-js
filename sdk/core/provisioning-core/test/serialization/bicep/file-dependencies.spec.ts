// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { beforeEach, describe, expect, it, vi } from "vitest";
import { Resource, ResourceGroup, Stack, fn } from "@azure/provisioning-core";
import { wrapExpression } from "../../../src/internal.js";
import * as dependencies from "../../../src/serialization/ast/declaration-dependencies.js";
import { files, subscriptionStack, widget } from "./support.js";

describe("authored file dependency selection", () => {
  beforeEach(() => Stack.clearRoots());

  it("selects transitive variables and parameters in source order", () => {
    const stack = new Stack("dependencies", { targetScope: "resourceGroup" });
    const input = stack.parameters.add("input", "string");
    stack.parameters.add("unused", "string");
    const second = stack.variables.add("second", input);
    stack.variables.add("unusedVariable", "unused");
    const first = stack.variables.add("first", second);
    widget(stack, "widget", { properties: { value: first } });
    const result = files(stack)[0]!;
    expect(Object.keys(result.variables!)).toEqual(["second", "first"]);
    expect(Object.keys(result.parameters!)).toEqual(["input"]);
  });

  it("follows parameter defaults through lookup scopes without copying unused children", () => {
    const stack = new Stack("defaults", { targetScope: "resourceGroup" });
    const group = stack.parameters.add("lookupGroup", "string", {
      defaultValue: "external",
    });
    const lookup = new Resource(stack, {
      type: "Contoso.Test/lookups",
      apiVersion: "2024-01-01",
      name: "shared",
      existing: true,
      scope: fn.resourceGroup(group),
    });
    new Resource(lookup, {
      type: "Contoso.Test/lookups/children",
      apiVersion: "2024-01-01",
      name: "unused",
      existing: true,
    });
    const input = stack.parameters.add("input", "string", {
      defaultValue: lookup.name,
    });
    widget(stack, "widget", { properties: { input } });
    const result = files(stack)[0]!;
    expect(Object.keys(result.parameters!)).toEqual(["lookupGroup", "input"]);
    expect(Object.keys(result.resources!)).toEqual(["lookup", "widget"]);
  });

  it("includes existing children with their parent chain, not their siblings", () => {
    const stack = new Stack("parents", { targetScope: "resourceGroup" });
    const parent = new Resource(stack, {
      type: "Contoso.Test/lookups",
      apiVersion: "2024-01-01",
      name: "parent",
      existing: true,
      scope: fn.resourceGroup("external"),
    });
    const child = new Resource(parent, {
      type: "Contoso.Test/lookups/children",
      apiVersion: "2024-01-01",
      name: "child",
      existing: true,
    });
    new Resource(parent, {
      type: "Contoso.Test/lookups/children",
      apiVersion: "2024-01-01",
      name: "unused",
      existing: true,
    });
    widget(stack, "widget", { properties: { id: child.id } });
    expect(Object.keys(files(stack)[0]!.resources!)).toEqual(["lookup", "child", "widget"]);
  });

  it("does not copy an existing child whose parent is deployed by another file", () => {
    const { stack, group } = subscriptionStack("owned");
    const parent = widget(group, "parent");
    const child = new Resource(parent, {
      type: "Contoso.Test/widgets/children",
      apiVersion: "2024-01-01",
      name: "child",
      existing: true,
    });
    const consumerGroup = new ResourceGroup(stack, {
      name: "consumer-rg",
      location: "eastus",
    });
    widget(consumerGroup, "consumer", { properties: { id: child.id } });
    const result = files(stack);
    expect(result[1]!.resources!.child!.existing).toBe(true);
    expect(result[2]!.resources!.child).toBeUndefined();
    expect(result[2]!.parameters!.childId).toBeDefined();
  });

  it("handles variable cycles without duplicate selection or mutating the Stack", () => {
    const stack = new Stack("cycles", { targetScope: "resourceGroup" });
    const first = stack.variables.add(
      "first",
      wrapExpression<string>({ kind: "symbolic-value", path: "second" }),
    );
    stack.variables.add(
      "second",
      wrapExpression<string>({ kind: "symbolic-value", path: "first" }),
    );
    widget(stack, "widget", { properties: { value: first } });
    expect(Object.keys(files(stack)[0]!.variables!)).toEqual(["first", "second"]);
  });

  it("uses recursive collection once per finalized file and updates entry module dependencies", () => {
    const { stack, group } = subscriptionStack("entry");
    const input = stack.parameters.add("input", "string");
    widget(group, "widget", { properties: { input } });
    const collect = vi.spyOn(dependencies, "collectDependenciesForDeclaration");
    try {
      const result = files(stack);
      expect(result[0]!.parameters!.input).toBeDefined();
      expect(result[1]!.parameters!.input).toBeDefined();
      expect(collect).toHaveBeenCalledTimes(4);
      expect(collect.mock.calls.every(([, options]) => options?.recursive === true)).toBe(true);
    } finally {
      collect.mockRestore();
    }
  });
});
