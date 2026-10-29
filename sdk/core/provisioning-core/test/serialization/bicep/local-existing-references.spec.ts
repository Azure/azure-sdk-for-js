// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { beforeEach, describe, expect, it } from "vitest";
import { ProvisioningComponent, Resource, Stack, fn } from "../../../src/index.js";
import { compile, files, storage, subscriptionStack } from "./support.js";

describe("local existing references in RG modules", () => {
  beforeEach(() => Stack.clearRoots());

  it("shares a current-RG lookup between siblings without parameters or producer outputs", () => {
    const { stack, group } = subscriptionStack("local-lookups");
    const lookup = storage(group, "sharedstorage", { existing: true });
    for (const name of ["localfirst", "localsecond"]) {
      storage(group, name, { tags: { source: lookup.id } });
    }
    const result = files(stack);
    expect(result).toHaveLength(3);
    expect(result[0]!.resources!.storageAccount).toBeUndefined();
    expect(result[1]!.resources!.storageAccount!.existing).toBe(true);
    expect(result[1]!.resources!.storageAccount!.value).not.toHaveProperty("value.scope");
    expect(result[1]!.parameters).toBeUndefined();
    expect(result[1]!.outputs).toBeUndefined();
    expect(result[2]!.resources!.storageAccount!.existing).toBe(true);
    expect(result[2]!.parameters).toBeUndefined();
    compile(stack);
  }, 30_000);

  it("copies only a referenced explicit existing parent chain, not unused siblings", () => {
    const { stack, group } = subscriptionStack("existing-chain");
    const parent = storage(group, "externalstorage", {
      existing: true,
      scope: fn.resourceGroup("external-rg"),
    });
    const child = new Resource(parent, {
      type: "Microsoft.Storage/storageAccounts/blobServices",
      apiVersion: "2024-01-01",
      name: "default",
      existing: true,
    });
    new Resource(parent, {
      type: "Microsoft.Storage/storageAccounts/fileServices",
      apiVersion: "2024-01-01",
      name: "default",
      existing: true,
    });
    storage(group, "consumerstorage", { tags: { source: child.id } });
    const result = files(stack);
    expect(result).toHaveLength(2);
    expect(Object.keys(result[1]!.resources!)).toEqual([
      "storageAccount",
      "blobService",
      "storageAccount2",
    ]);
    expect(result[1]!.resources!.storageAccount!.value).toHaveProperty("value.scope");
    expect(result[1]!.resources!.blobService!.value).toMatchObject({
      value: { parent: { id: "storageAccount" } },
    });
    compile(stack);
  }, 30_000);

  it("selects required external ancestors and existing descendants around a new resource", () => {
    const { stack, group } = subscriptionStack("mixed-existing-chain");
    const parent = storage(group, "externalstorage", {
      existing: true,
      scope: fn.resourceGroup("external-rg"),
    });
    const service = new Resource(new ProvisioningComponent(parent), {
      type: "Microsoft.Storage/storageAccounts/blobServices",
      apiVersion: "2024-01-01",
      name: "default",
      existing: true,
    });
    const container = new Resource(new ProvisioningComponent(service), {
      type: "Microsoft.Storage/storageAccounts/blobServices/containers",
      apiVersion: "2024-01-01",
      name: "data",
    });
    const policy = new Resource(new ProvisioningComponent(container), {
      type: "Microsoft.Storage/storageAccounts/blobServices/containers/immutabilityPolicies",
      apiVersion: "2024-01-01",
      name: "default",
      existing: true,
    });
    new Resource(parent, {
      type: "Microsoft.Storage/storageAccounts/fileServices",
      apiVersion: "2024-01-01",
      name: "default",
      existing: true,
    });
    storage(group, "consumerstorage", { tags: { source: policy.id } });
    const result = files(stack);
    expect(result).toHaveLength(3);
    expect(Object.keys(result[1]!.resources!)).toEqual([
      "storageAccount",
      "blobService",
      "container",
      "immutabilityPolicy",
      "fileService",
    ]);
    expect(result[2]!.resources!.immutabilityPolicy).toBeUndefined();
    expect(result[2]!.parameters!.immutabilityPolicyId).toBeDefined();
    expect(result[1]!.outputs!.immutabilityPolicyId).toBeDefined();
    expect(result[1]!.resources!.storageAccount!.value).not.toHaveProperty("value.scope");
    expect(result[1]!.resources!.blobService!.value).toMatchObject({
      value: { parent: { id: "storageAccount" } },
    });
    compile(stack);
  }, 30_000);

  it("keeps unreferenced existing descendants of a deployed ancestor through components", () => {
    const { stack, group } = subscriptionStack("deployed-parent-chain");
    const parent = storage(group, "newstorage");
    const service = new Resource(new ProvisioningComponent(parent), {
      type: "Microsoft.Storage/storageAccounts/blobServices",
      apiVersion: "2024-01-01",
      name: "default",
      existing: true,
    });
    new Resource(new ProvisioningComponent(service), {
      type: "Microsoft.Storage/storageAccounts/blobServices/containers",
      apiVersion: "2024-01-01",
      name: "data",
      existing: true,
    });
    const result = files(stack);
    expect(result).toHaveLength(2);
    expect(Object.keys(result[1]!.resources!)).toEqual([
      "storageAccount",
      "blobService",
      "container",
    ]);
    expect(result[0]!.resources!.blobService).toBeUndefined();
    expect(result[1]!.resources!.container!.existing).toBe(true);
    compile(stack);
  }, 30_000);
});
