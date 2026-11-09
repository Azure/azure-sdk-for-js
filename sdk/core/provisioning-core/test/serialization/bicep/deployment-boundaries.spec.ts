// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { beforeEach, describe, expect, it } from "vitest";
import { Resource, ResourceGroup, Stack, fn } from "../../../src/index.js";
import { compile, files, storage } from "./support.js";

describe("authored deployment-boundary modules", () => {
  beforeEach(() => Stack.clearRoots());

  it.each(["different", "same", "current"] as const)(
    "compiles separate primary trees with %s authored RG destinations",
    (kind) => {
      const stack = new Stack("per-tree", { targetScope: "resourceGroup" });
      const group =
        kind === "current"
          ? stack
          : new ResourceGroup(stack, {
              existing: true,
              name: "first-rg",
              scope: fn.subscription(),
            });
      const secondGroup =
        kind === "different"
          ? new ResourceGroup(stack, {
              existing: true,
              name: "second-rg",
              scope: fn.subscription(),
            })
          : group;
      const first = storage(group, "pertreefirst");
      storage(secondGroup, "pertreesecond", { tags: { source: first.id } });
      const result = files(stack);
      expect(result).toHaveLength(kind === "current" ? 1 : 3);
      const firstFile = result[kind === "current" ? 0 : 1]!;
      const secondFile = result[kind === "current" ? 0 : 2]!;
      expect(firstFile.resources!.storageAccount!.value).not.toHaveProperty("value.scope");
      expect(secondFile.resources!.storageAccount2!.value).not.toHaveProperty("value.scope");
      if (kind === "current") {
        expect(result[0]!.modules).toBeUndefined();
        expect(secondFile.resources!.storageAccount2!.value).toMatchObject({
          value: {
            tags: {
              value: {
                source: { base: { id: "storageAccount" }, property: "id" },
              },
            },
          },
        });
      } else {
        expect(firstFile.outputs!.storageAccountId).toBeDefined();
        expect(secondFile.parameters!.storageAccountId).toBeDefined();
        expect(result[0]!.modules!.storageAccountModule!.value).toMatchObject({
          value: { scope: { id: "rg" } },
        });
      }
      compile(stack);
    },
    60_000,
  );

  it("keeps the entry for deployment into an explicitly declared existing RG", () => {
    const stack = new Stack("single-explicit", {
      targetScope: "resourceGroup",
    });
    const group = new ResourceGroup(stack, {
      existing: true,
      name: "external",
      scope: fn.subscription(),
    });
    storage(group, "pertreesingle");
    expect(files(stack)).toHaveLength(2);
    compile(stack);
  }, 60_000);

  it("keeps relative existing lookup scopes in the entry when deploying to another subscription", () => {
    const stack = new Stack("cross-subscription", {
      targetScope: "resourceGroup",
    });
    const source = storage(stack, "sharedstorage", {
      existing: true,
      scope: fn.resourceGroup("source-rg"),
    });
    const group = new ResourceGroup(stack, {
      existing: true,
      name: "destination-rg",
      scope: fn.subscription("00000000-0000-0000-0000-000000000001"),
    });
    storage(group, "foreignstorage", { tags: { source: source.id } });
    const result = files(stack);
    expect(result[0]!.resources!.storageAccount!.existing).toBe(true);
    expect(result[1]!.resources!.storageAccount).toBeUndefined();
    expect(result[1]!.parameters!.storageAccountId).toBeDefined();
    compile(stack);
  }, 60_000);

  it.each(["managementGroup", "tenant"] as const)(
    "merges independent trees at inherited %s scope without changing target scope",
    (targetScope) => {
      const stack = new Stack("scope", { targetScope });
      for (const name of ["first", "second"]) {
        new Resource(
          stack,
          targetScope === "tenant"
            ? {
                type: "Microsoft.Management/managementGroups",
                apiVersion: "2024-02-01-preview",
                name,
                properties: {},
              }
            : {
                type: "Microsoft.Authorization/policyDefinitions",
                apiVersion: "2023-04-01",
                name,
                properties: {
                  policyType: "Custom",
                  mode: "All",
                  policyRule: {
                    if: {
                      field: "type",
                      equals: "Microsoft.Storage/storageAccounts",
                    },
                    then: { effect: "audit" },
                  },
                },
              },
        );
      }
      const result = files(stack);
      expect(result).toHaveLength(1);
      expect(result.every((file) => file.targetScope === targetScope)).toBe(true);

      compile(stack);
    },
    60_000,
  );

  it("keeps module boundaries when current-scope trees are mixed with an explicit external destination", () => {
    const stack = new Stack("mixed-scopes", {
      targetScope: "resourceGroup",
    });
    storage(stack, "currentfirst");
    storage(stack, "currentsecond");
    const external = storage(stack, "externalstorage", {
      existing: true,
      scope: fn.resourceGroup("external-rg"),
    });
    new Resource(external, {
      type: "Microsoft.Storage/storageAccounts/blobServices",
      apiVersion: "2024-01-01",
      name: "default",
    });
    const result = files(stack);
    expect(result).toHaveLength(4);
    expect(result[0]!.modules!.storageAccount3Module!.value).toMatchObject({
      value: {
        scope: {
          target: "resourceGroup",
          args: [{ value: "external-rg" }],
        },
      },
    });
    compile(stack);
  }, 60_000);

  it("does not create empty modules for RG and external lookup-only branches", () => {
    const stack = new Stack("lookup-boundaries", {
      targetScope: "resourceGroup",
    });
    const group = new ResourceGroup(stack, {
      existing: true,
      name: "lookup-rg",
      scope: fn.subscription(),
    });
    const lookup = storage(group, "externalstorage", {
      existing: true,
      scope: fn.resourceGroup("external-rg"),
    });
    stack.outputs.add("lookupId", "string", lookup.id);
    const result = files(stack);
    expect(result).toHaveLength(1);
    expect(result[0]!.modules).toBeUndefined();
    compile(stack);
  }, 60_000);

  it("separates RG-targeted extensions while keeping resource-targeted extensions with their target", () => {
    const stack = new Stack("rg-extensions");
    const target = new ResourceGroup(stack, {
      name: "extension-rg",
      location: "eastus",
    });
    const account = storage(target, "extensionstorage");
    for (const [parent, name] of [
      [target, "group-lock"],
      [account, "resource-lock"],
    ] as const) {
      new Resource(parent, {
        type: "Microsoft.Authorization/locks",
        apiVersion: "2020-05-01",
        name,
        properties: { level: "CanNotDelete" },
      });
    }
    const result = files(stack);
    expect(result).toHaveLength(3);
    expect(result[2]!.resources!.lock2!.value).not.toHaveProperty("value.scope");
    expect(result[1]!.resources!.lock!.value).toMatchObject({
      value: { scope: { id: "storageAccount" } },
    });
    compile(stack);
  }, 60_000);

  it("keeps an explicit dependency on the same tree's parent local", () => {
    const stack = new Stack("local-parent-dependency", {
      targetScope: "resourceGroup",
    });
    const parent = storage(stack, "parentstorage");
    new Resource(
      parent,
      {
        type: "Microsoft.Storage/storageAccounts/blobServices",
        apiVersion: "2024-01-01",
        name: "default",
      },
      { dependsOn: [parent] },
    );
    const result = files(stack);
    expect(result).toHaveLength(1);
    expect(result[0]!.resources!.blobService!.value).toMatchObject({
      value: {
        parent: { id: "storageAccount" },
        dependsOn: { items: [{ id: "storageAccount" }] },
      },
    });
    compile(stack);
  }, 60_000);
});
