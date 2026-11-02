// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { beforeEach, describe, expect, it } from "vitest";
import { ProvisioningComponent, Resource, Stack, fn } from "../../../src/index.js";
import { Loop, createLoopedResource } from "../../../src/internal-loop.js";
import { compile, files, storage, subscriptionStack, widget } from "./support.js";

describe("authored resource-tree identity", () => {
  beforeEach(() => Stack.clearRoots());

  it.each([
    ["Microsoft.Storage/storageAccounts", "microsoft.storage/storageAccounts/blobServices"],
    ["microsoft.storage/storageAccounts", "Microsoft.Storage/storageAccounts/blobServices"],
  ])(
    "preserves the parent of %s's mixed-case child %s",
    (parentType, childType) => {
      const stack = new Stack("mixed-case-child", { targetScope: "resourceGroup" });
      const parent = new Resource(stack, {
        type: parentType,
        apiVersion: "2024-01-01",
        name: "mixedcasestorage",
        location: "eastus",
        kind: "StorageV2",
        sku: { name: "Standard_LRS" },
      });
      new Resource(parent, {
        type: childType,
        apiVersion: "2024-01-01",
        name: "default",
      });
      new Resource(parent, {
        type: "Microsoft.Authorization/locks",
        apiVersion: "2020-05-01",
        name: "protect",
        properties: { level: "CanNotDelete" },
      });
      const result = files(stack)[0]!;
      expect(result.resources!.blobService!.value).toMatchObject({
        value: { parent: { id: "storageAccount" } },
      });
      expect(result.resources!.blobService!.value).not.toHaveProperty("value.scope");
      expect(result.resources!.lock!.value).toMatchObject({
        value: { scope: { id: "storageAccount" } },
      });
      expect(result.resources!.lock!.value).not.toHaveProperty("value.parent");
      compile(stack);
    },
    30_000,
  );

  it("uses resource objects for extension chains through non-resource components", () => {
    const { stack, group } = subscriptionStack("attachments");
    const first = widget(group, "first");
    const child = new Resource(first, {
      type: "Contoso.Test/widgets/children",
      apiVersion: "2024-01-01",
      name: "child",
    });
    const extension = new Resource(new ProvisioningComponent(child), {
      type: "Contoso.Extensions/settings",
      apiVersion: "2024-01-01",
      name: "settings",
    });
    new Resource(extension, {
      type: "Contoso.Other/locks",
      apiVersion: "2024-01-01",
      name: "lock",
    });
    widget(group, "second");
    const result = files(stack);
    expect(Object.keys(result[1]!.resources!)).toEqual(["widget", "child", "setting", "lock"]);
    expect(result[1]!.resources!.setting!.value).toMatchObject({
      value: { scope: { id: "child" } },
    });
    expect(result[1]!.resources!.lock!.value).toMatchObject({
      value: { scope: { id: "setting" } },
    });
    expect(result).toHaveLength(3);
    expect(Object.keys(result[2]!.resources!)).toEqual(["widget2"]);
  });

  it("keeps authored attachment identity independent of sibling order", () => {
    const { stack, group } = subscriptionStack("ordering");
    const parent = widget(group, "parent");
    const child = new Resource(parent, {
      type: "Contoso.Test/widgets/children",
      apiVersion: "2024-01-01",
      name: "child",
    });
    const extension = new Resource(parent, {
      type: "Contoso.Extensions/settings",
      apiVersion: "2024-01-01",
      name: "setting",
    });
    parent.children.reverse();
    const result = files(stack);
    expect(result).toHaveLength(2);
    expect(result[1]!.fileName).toBe("ordering/widget.bicep");
    expect(Object.keys(result[1]!.resources!)).toEqual(["widget", "setting", "child"]);
    expect(result[1]!.resources!.child!.value).toMatchObject({
      value: { parent: { id: "widget" } },
    });
    expect(child.parent).toBe(parent);
    expect(extension.parent).toBe(parent);
  });

  it("normalizes root scope before selecting scope-only parameters", () => {
    const stack = new Stack("scope-dependencies");
    const destination = stack.parameters.add("destination", "string", {
      defaultValue: "external",
    });
    const scopeName = stack.variables.add("scopeName", destination);
    const name = stack.parameters.add("storageName", "string", {
      defaultValue: "externalstorage",
    });
    const parent = storage(stack, "unused", {
      name,
      existing: true,
      scope: fn.resourceGroup(scopeName),
    });
    new Resource(parent, {
      type: "Microsoft.Storage/storageAccounts/blobServices",
      apiVersion: "2024-01-01",
      name: "default",
    });
    const result = files(stack);
    expect(Object.keys(result[0]!.parameters!)).toEqual(["destination", "storageName"]);
    expect(result[0]!.variables!.scopeName).toBeDefined();
    expect(Object.keys(result[1]!.parameters!)).toEqual(["storageName"]);
    expect(result[1]!.variables).toBeUndefined();
    expect(result[1]!.resources!.storageAccount!.value).not.toHaveProperty("value.scope");
    compile(stack);
  }, 30_000);

  it("rejects resource attachment cycles and parents outside the Stack", () => {
    const stack = new Stack("cycle", { targetScope: "resourceGroup" });
    const first = widget(stack, "first");
    const second = widget(first, "second");
    Object.defineProperty(first, "parent", { value: second });
    expect(() => files(stack)).toThrow("Cyclic resource attachment");
    const other = new Stack("other", { targetScope: "resourceGroup" });
    const outside = widget(other, "outside");
    Object.defineProperty(first, "parent", { value: outside });
    expect(() => files(stack)).toThrow("parent outside Stack");
  });

  it("preserves indexed extension targets under a looped parent", () => {
    const { stack, group } = subscriptionStack("indexed-extension");
    const loop = new Loop(["first", "second"], { itemVariable: "name" });
    const parents = createLoopedResource(Resource, loop, group, {
      type: "Microsoft.Storage/storageAccounts",
      apiVersion: "2024-01-01",
      name: loop.item,
      location: "eastus",
      kind: "StorageV2",
      sku: { name: "Standard_LRS" },
    });
    new Resource(parents.at(0), {
      type: "Microsoft.Authorization/locks",
      apiVersion: "2020-05-01",
      name: "protect",
      properties: { level: "CanNotDelete" },
    });
    const result = files(stack);
    expect(result[1]!.resources!.lock!.value).toMatchObject({
      value: {
        scope: {
          kind: "array-access",
          base: { id: "storageAccount" },
          index: { value: "0" },
        },
      },
    });
    compile(stack);
  }, 30_000);

  it("preserves resource conditions across ordinary component wrappers", () => {
    const { stack, group } = subscriptionStack("conditional-component");
    const enabled = stack.parameters.add("enabled", "bool", {
      defaultValue: true,
    });
    const parent = new Resource(
      group,
      {
        type: "Microsoft.Storage/storageAccounts",
        apiVersion: "2024-01-01",
        name: "conditionalstorage",
        location: "eastus",
        kind: "StorageV2",
        sku: { name: "Standard_LRS" },
      },
      { condition: enabled },
    );
    new Resource(new ProvisioningComponent(parent), {
      type: "Microsoft.Storage/storageAccounts/blobServices",
      apiVersion: "2024-01-01",
      name: "default",
    });
    const result = files(stack);
    expect(result[1]!.resources!.blobService!.value).toMatchObject({
      kind: "if-condition",
      condition: { kind: "identifier", id: "enabled" },
    });
    compile(stack);
  }, 30_000);

  it("does not change a current-group lookup's identity inside an explicitly external module", () => {
    const { stack, group } = subscriptionStack("lookup-scope");
    const local = storage(group, "currentlookup", { existing: true });
    const external = storage(group, "externalstorage", {
      existing: true,
      scope: fn.resourceGroup("external-rg"),
    });
    new Resource(external, {
      type: "Microsoft.Storage/storageAccounts/blobServices",
      apiVersion: "2024-01-01",
      name: "default",
      properties: { cors: { corsRules: [] } },
    });
    // This external resource name is an entry-evaluable reference to the current RG lookup.
    external.name = local.name;
    const result = files(stack);
    expect(result[0]!.resources!.storageAccount!.existing).toBe(true);
    expect(result[1]!.resources!.storageAccount).toBeUndefined();
    expect(result[1]!.parameters!.storageAccountName).toBeDefined();
    compile(stack);
  }, 30_000);
});
