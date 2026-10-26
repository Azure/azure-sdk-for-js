// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { beforeEach, describe, expect, it } from "vitest";
import {
  ProvisioningComponent,
  Resource,
  ResourceGroup,
  Stack,
  fn,
} from "../../../src/index.js";
import { deserialize, serialize } from "../../../src/serialization/index.js";
import { renderBicepFiles } from "../../../src/internal.js";
import { compile, files, storage, subscriptionStack, widget } from "./support.js";

describe("authored resource file layout", () => {
  beforeEach(() => Stack.clearRoots());

  it("uses one module per primary resource tree, keeping children and extensions with their target", () => {
    const { stack, group } = subscriptionStack();
    const component = new ProvisioningComponent(group);
    const parent = widget(component, "first");
    new Resource(new ProvisioningComponent(parent), {
      type: "Contoso.Test/widgets/children",
      apiVersion: "2024-01-01",
      name: "child",
    });
    new Resource(parent, {
      type: "Microsoft.Authorization/locks",
      apiVersion: "2020-05-01",
      name: "protect",
    });
    widget(group, "second");
    const result = files(stack);
    expect(result.map((file) => file.fileName)).toEqual([
      "infra.bicep",
      "infra/widget.bicep",
      "infra/widget2.bicep",
    ]);
    expect(Object.keys(result[0]!.resources!)).toEqual(["rg"]);
    expect(Object.keys(result[1]!.resources!)).toEqual(["widget", "child", "lock"]);
    expect(result[1]!.resources!.child!.value).toMatchObject({
      value: { parent: { id: "widget" } },
    });
    expect(result[1]!.resources!.lock!.value).toMatchObject({
      value: { scope: { id: "widget" } },
    });
    expect(Object.keys(result[2]!.resources!)).toEqual(["widget2"]);
    expect(result[0]!.modules!.widgetModule!.value).toMatchObject({
      value: { scope: { id: "rg" } },
    });
  });

  it("does not reserve output names in the declaration namespace", () => {
    const { stack, group } = subscriptionStack("output-names");
    const resource = widget(group, "widget");
    stack.outputs.add("widgetModule", "string", resource.id);
    const entry = files(stack)[0]!;
    expect(Object.keys(entry.modules!)).toEqual(["widgetModule"]);
    expect(entry.outputs!.widgetModule!.value).toMatchObject({
      base: { base: { id: "widgetModule" }, property: "outputs" },
    });
  });

  it("retains zero-resource and lookup-only files at their authored path", () => {
    const stack = new Stack("lookup-only", { targetScope: "resourceGroup" });
    const lookup = widget(stack, "existing", { existing: true });
    stack.outputs.add("id", "string", lookup.id);
    const result = files(stack);
    expect(result).toHaveLength(1);
    expect(result[0]!.fileName).toBe("lookup-only.bicep");
    expect(result[0]!.targetScope).toBe("resourceGroup");
    expect(result[0]!.modules).toBeUndefined();
    expect(result[0]!.resources!.widget!.existing).toBe(true);
    expect(files(new Stack("empty"))[0]!.fileName).toBe("empty.bicep");
    expect(files(new Stack("empty-rg", { targetScope: "resourceGroup" }))[0]).toHaveProperty(
      "targetScope",
      "resourceGroup",
    );
  });

  it.each(["resourceGroup", "managementGroup", "tenant"] as const)(
    "merges inherited %s trees into a standalone file",
    (targetScope) => {
      const stack = new Stack("scope", { targetScope });
      widget(stack, "first");
      expect(files(stack).map((file) => file.fileName)).toEqual(["scope/widget.bicep"]);
      widget(stack, "second");
      const result = files(stack);
      expect(result).toHaveLength(1);
      expect(result[0]!.fileName).toBe("scope/widget.bicep");
      expect(Object.keys(result[0]!.resources!)).toEqual(["widget", "widget2"]);
      expect(result.every((file) => file.targetScope === targetScope)).toBe(true);
      expect(result[0]!.modules).toBeUndefined();
    },
  );

  it("keeps subscription-level resources in the entry file", () => {
    const stack = new Stack("subscription");
    widget(stack, "first");
    widget(stack, "second");
    const result = files(stack);
    expect(result).toHaveLength(1);
    expect(result[0]!.targetScope).toBe("subscription");
    expect(Object.keys(result[0]!.resources!)).toEqual(["widget", "widget2"]);
  });

  it("includes a shared explicit lookup locally, without copying its unused existing children", () => {
    const { stack, group } = subscriptionStack("lookups");
    const lookup = new Resource(group, {
      type: "Contoso.Test/lookups",
      apiVersion: "2024-01-01",
      existing: true,
      name: "shared",
      scope: fn.resourceGroup("external"),
    });
    new Resource(lookup, {
      type: "Contoso.Test/lookups/children",
      apiVersion: "2024-01-01",
      existing: true,
      name: "unused",
    });
    widget(group, "first", { properties: { source: lookup.id } });
    widget(group, "second", { properties: { source: lookup.id } });
    stack.outputs.add("lookupId", "string", lookup.id);
    const result = files(stack);
    expect(result).toHaveLength(3);
    expect(result.every((file) => file.resources?.lookup?.existing)).toBe(true);
    expect(result.every((file) => !file.resources?.child)).toBe(true);
    expect(result[1]!.outputs).toBeUndefined();
    expect(result[0]!.outputs!.lookupId!.value).toMatchObject({
      base: { id: "lookup" },
    });
  });

  it("preserves authored trees and renders restored JSON through the same Stack path", () => {
    const { stack, group } = subscriptionStack("roundtrip");
    const first = widget(group, "first");
    widget(group, "second", { properties: { source: first.id } });
    stack.outputs.add("firstId", "string", first.id);
    const before = serialize(stack);
    const rendered = renderBicepFiles(stack);
    expect(renderBicepFiles(deserialize(JSON.stringify(before)))).toEqual(rendered);
    expect(serialize(stack)).toEqual(before);
    expect(first.parent).toBe(group);
  });

  it("moves explicit dependencies between RG siblings to module invocations", () => {
    const { stack, group } = subscriptionStack("dependencies");
    const first = storage(group, "authoredfirst");
    new Resource(
      group,
      {
        type: "Microsoft.Storage/storageAccounts",
        apiVersion: "2024-01-01",
        name: "authoredsecond",
        location: "eastus",
        kind: "StorageV2",
        sku: { name: "Standard_LRS" },
      },
      { dependsOn: [first] },
    );
    const result = files(stack);
    expect(result).toHaveLength(3);
    expect(result[0]!.modules!.storageAccount2Module!.value).toMatchObject({
      value: { dependsOn: { items: [{ id: "storageAccountModule" }] } },
    });
    expect(result[2]!.resources!.storageAccount2!.value).not.toHaveProperty("value.dependsOn");
    compile(stack);
  }, 30_000);

  it("moves explicit cross-RG dependencies to module invocations", () => {
    const { stack, group } = subscriptionStack("cross-rg-dependencies");
    const first = storage(group, "crossrgfirst");
    const secondGroup = new ResourceGroup(stack, {
      name: "second-rg",
      location: "eastus",
    });
    new Resource(
      secondGroup,
      {
        type: "Microsoft.Storage/storageAccounts",
        apiVersion: "2024-01-01",
        name: "crossrgsecond",
        location: "eastus",
        kind: "StorageV2",
        sku: { name: "Standard_LRS" },
      },
      { dependsOn: [first] },
    );
    const result = files(stack);
    expect(result[0]!.modules!.storageAccount2Module!.value).toMatchObject({
      value: { dependsOn: { items: [{ id: "storageAccountModule" }] } },
    });
    expect(result[2]!.resources!.storageAccount2!.value).not.toHaveProperty("value.dependsOn");
    compile(stack);
  }, 30_000);

  it("rewrites entry-owned resource dependencies to their producer modules", () => {
    const { stack, group } = subscriptionStack("entry-dependencies");
    const account = storage(group, "entrydependency");
    const child = new Resource(account, {
      type: "Microsoft.Storage/storageAccounts/blobServices",
      apiVersion: "2024-01-01",
      name: "default",
    });
    new Resource(
      stack,
      {
        type: "Microsoft.Authorization/policyDefinitions",
        apiVersion: "2023-04-01",
        name: "storage-policy",
        properties: {
          policyType: "Custom",
          mode: "All",
          policyRule: {
            if: { field: "type", equals: "Microsoft.Storage/storageAccounts" },
            then: { effect: "audit" },
          },
        },
      },
      { dependsOn: [account, child, group] },
    );
    expect(files(stack)[0]!.resources!.policyDefinition!.value).toMatchObject({
      value: {
        dependsOn: {
          items: [{ id: "storageAccountModule" }, { id: "rg" }],
        },
      },
    });
    compile(stack);
  }, 30_000);

  it("rejects cycles between entry resources and module-owned resources", () => {
    const { stack, group } = subscriptionStack("entry-module-cycle");
    const account = storage(group, "entrycycle");
    const policy = new Resource(
      stack,
      {
        type: "Contoso.Test/policies",
        apiVersion: "2024-01-01",
        name: "policy",
      },
      { dependsOn: [account] },
    );
    Reflect.set(account, "properties", { source: policy.id });
    expect(() => files(stack)).toThrow("Cyclic module dependency");
  });

  it("rejects module cycles introduced by cross-RG references", () => {
    const { stack, group } = subscriptionStack("module-cycle");
    const first = widget(group, "first");
    const secondGroup = new ResourceGroup(stack, {
      name: "second-rg",
      location: "eastus",
    });
    const second = widget(secondGroup, "second", {
      properties: { source: first.id },
    });
    Reflect.set(first, "properties", { source: second.id });
    expect(() => files(stack)).toThrow("Cyclic module dependency");
  });

  it("compiles outputs sharing resource, parameter and variable names", () => {
    const stack = new Stack("shared-names", { targetScope: "resourceGroup" });
    const group = new ResourceGroup(stack, {
      existing: true,
      name: "shared",
      scope: fn.subscription(),
    });
    const input = stack.parameters.add("input", "string", {
      defaultValue: "value",
    });
    const value = stack.variables.add("value", input);
    stack.outputs.add("resourceGroup", "string", group.name);
    stack.outputs.add("input", "string", input);
    stack.outputs.add("value", "string", value);
    compile(stack);
  }, 30_000);
});
