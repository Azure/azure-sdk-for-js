// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { beforeEach, describe, expect, it } from "vitest";
import { Resource, Stack, fn } from "../../../src/index.js";
import { compile, files, storage, subscriptionStack } from "./support.js";

describe("existing lookup placement at authored boundaries", () => {
  beforeEach(() => Stack.clearRoots());

  it("retains lookup-only external branches without creating deployment modules", () => {
    const stack = new Stack("external-lookups", {
      targetScope: "resourceGroup",
    });
    const parent = storage(stack, "lookupstorage", {
      existing: true,
      scope: fn.resourceGroup("external-rg"),
    });
    new Resource(parent, {
      type: "Microsoft.Storage/storageAccounts/blobServices",
      apiVersion: "2024-01-01",
      name: "default",
      existing: true,
    });
    const result = files(stack);
    expect(result).toHaveLength(1);
    expect(result[0]!.modules).toBeUndefined();
    expect(Object.keys(result[0]!.resources!)).toEqual(["storageAccount", "blobService"]);
    compile(stack);
  }, 30_000);

  it("keeps relative lookups in the entry when their authored RG is in another subscription", () => {
    const { stack, group } = subscriptionStack("relative-lookups");
    const source = storage(group, "sourcestorage", {
      existing: true,
      scope: fn.resourceGroup("source-rg"),
    });
    const external = storage(group, "externalstorage", {
      existing: true,
      scope: fn.resourceGroup("00000000-0000-0000-0000-000000000001", "external-rg"),
    });
    new Resource(external, {
      type: "Microsoft.Storage/storageAccounts/blobServices",
      apiVersion: "2024-01-01",
      name: "default",
      properties: { cors: { corsRules: [] } },
    });
    external.name = source.name;
    const result = files(stack);
    expect(result).toHaveLength(2);
    expect(result[0]!.resources!.storageAccount!.value).toMatchObject({
      value: {
        scope: { target: "resourceGroup", args: [{ value: "source-rg" }] },
      },
    });
    expect(result[1]!.resources!.storageAccount).toBeUndefined();
    expect(result[1]!.parameters!.storageAccountName).toBeDefined();
    compile(stack);
  }, 30_000);
});
