// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { beforeEach, describe, expect, it } from "vitest";
import { Resource, Stack, fn } from "@azure/provisioning-core";
import { compile, files, storage, subscriptionStack } from "./support.js";

describe("authored mixed deployment trees", () => {
  beforeEach(() => Stack.clearRoots());

  it.each([false, true])(
    "owns existing parents and deployable descendants once (referenced: %s)",
    (referenced) => {
      const { stack, group } = subscriptionStack("mixed");
      const parent = storage(group, "externalstorage", {
        existing: true,
        scope: fn.resourceGroup("external-rg"),
      });
      const child = new Resource(parent, {
        type: "Microsoft.Storage/storageAccounts/blobServices",
        apiVersion: "2024-01-01",
        name: "default",
      });
      new Resource(parent, {
        type: "Microsoft.Authorization/locks",
        apiVersion: "2020-05-01",
        name: "protect",
        properties: { level: "CanNotDelete" },
      });
      for (const name of ["mixedfirst", "mixedsecond"]) {
        storage(group, name, referenced ? { tags: { source: child.id } } : {});
      }
      if (referenced) stack.outputs.add("childId", "string", child.id);
      const result = files(stack);
      expect(result).toHaveLength(4);
      expect(Object.keys(result[1]!.resources!)).toEqual(["storageAccount", "blobService", "lock"]);
      expect(
        result.slice(2).every((file) => !file.resources?.blobService && !file.resources?.lock),
      ).toBe(true);
      expect(result[1]!.resources!.storageAccount!.existing).toBe(true);
      expect(result[1]!.resources!.storageAccount!.value).not.toHaveProperty("value.scope");
      expect(result[1]!.resources!.lock!.value).toMatchObject({
        value: { scope: { id: "storageAccount" } },
      });
      compile(stack);
    },
    30_000,
  );

  it("recognizes a new extension as deployment work under an existing-only parent", () => {
    const stack = new Stack("extension-mixed", {
      targetScope: "resourceGroup",
    });
    const parent = storage(stack, "sharedstorage", {
      existing: true,
      scope: fn.resourceGroup("external-rg"),
    });
    new Resource(parent, {
      type: "Microsoft.Authorization/locks",
      apiVersion: "2020-05-01",
      name: "protect",
      properties: { level: "CanNotDelete" },
    });
    const result = files(stack);
    expect(result).toHaveLength(2);
    expect(result[0]!.modules!.storageAccountModule!.value).toMatchObject({
      value: { scope: { target: "resourceGroup" } },
    });
    expect(result[1]!.resources!.lock!.value).toMatchObject({
      value: { scope: { id: "storageAccount" } },
    });
    compile(stack);
  }, 30_000);

  it("keeps a sole current-scope mixed tree in one file", () => {
    const stack = new Stack("local-mixed", { targetScope: "resourceGroup" });
    const parent = storage(stack, "sharedstorage", { existing: true });
    new Resource(parent, {
      type: "Microsoft.Storage/storageAccounts/blobServices",
      apiVersion: "2024-01-01",
      name: "default",
    });
    expect(files(stack)).toHaveLength(1);
    compile(stack);
  }, 30_000);

  it.each(["subscription", "managementGroup"] as const)(
    "compiles a new policy version under an existing policy at another %s",
    (targetScope) => {
      const stack = new Stack(`mixed-${targetScope}`, { targetScope });
      const parent = new Resource(stack, {
        type: "Microsoft.Authorization/policyDefinitions",
        apiVersion: "2023-04-01",
        name: "policy",
        existing: true,
        scope:
          targetScope === "subscription"
            ? fn.subscription("00000000-0000-0000-0000-000000000001")
            : fn.managementGroup("external-mg"),
      });
      new Resource(parent, {
        type: "Microsoft.Authorization/policyDefinitions/versions",
        apiVersion: "2023-04-01",
        name: "1.0.0",
        properties: {
          policyType: "Custom",
          mode: "All",
          policyRule: {
            if: { field: "type", equals: "Microsoft.Storage/storageAccounts" },
            then: { effect: "audit" },
          },
        },
      });
      const result = files(stack);
      expect(result).toHaveLength(2);
      expect(result[1]!.targetScope).toBe(targetScope);
      expect(result[1]!.resources!.policyDefinition!.value).not.toHaveProperty("value.scope");
      compile(stack);
    },
    30_000,
  );
});
