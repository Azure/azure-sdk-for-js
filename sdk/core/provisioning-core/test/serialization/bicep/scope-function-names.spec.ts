// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { beforeEach, describe, expect, it, vi } from "vitest";
import { Resource, ResourceGroup, Stack, fn } from "@azure/provisioning-core";
import * as core from "../../../src/serialization/ast/declaration-builder.js";
import * as symbols from "../../../src/serialization/symbol-map.js";
import { serialize } from "../../../src/serialization/index.js";
import { RESOURCE_NAME_OVERRIDES } from "../../../src/serialization/bicep/file-layout/bicep-namer.js";
import { compile, files, storage } from "./support.js";

describe("built-in name aliases", () => {
  beforeEach(() => Stack.clearRoots());

  it.each([...RESOURCE_NAME_OVERRIDES])(
    "uses %s's alias %s and builds declarations only once even without a function call",
    (name, alias) => {
      const stack = new Stack(`alias-${name}`, {
        targetScope: "resourceGroup",
      });
      new Resource(stack, {
        type: `Contoso.Test/${name}s`,
        apiVersion: "2024-01-01",
        name: "existing",
        existing: true,
      });
      const allocate = vi.spyOn(symbols, "createSymbolMap");
      const build = vi.spyOn(core, "buildStackDeclarations");
      try {
        const [file] = files(stack);
        expect(Object.keys(file!.resources!)).toEqual([alias]);
        expect(allocate).toHaveBeenCalledTimes(1);
        expect(build).toHaveBeenCalledTimes(1);
      } finally {
        allocate.mockRestore();
        build.mockRestore();
      }
    },
  );

  it("handles alias collisions and updates references without changing authored names or JSON symbols", () => {
    const stack = new Stack("alias-collision");
    const input = stack.parameters.add("rg", "string", {
      defaultValue: "authored",
    });
    const first = new ResourceGroup(stack, {
      name: "first-rg",
      location: "eastus",
    });
    const second = new ResourceGroup(stack, {
      name: "second-rg",
      location: "eastus",
    });
    stack.outputs.add("resourceGroup", "string", first.id);
    stack.outputs.add("rg", "string", input);
    stack.outputs.add("secondId", "string", second.id);
    const before = serialize(stack);
    const [file] = files(stack);
    expect(Object.keys(file!.resources!)).toEqual(["rg2", "rg3"]);
    expect(Object.keys(file!.parameters!)).toEqual(["rg"]);
    expect(Object.keys(file!.outputs!)).toEqual(["resourceGroup", "rg", "secondId"]);
    expect(file!.outputs!.resourceGroup!.value).toMatchObject({
      base: { id: "rg2" },
    });
    expect(serialize(stack)).toEqual(before);
    compile(stack);
  }, 30_000);

  it("aliases a resource named after a non-scope function without a provisional build", () => {
    const stack = new Stack("guid-alias", { targetScope: "resourceGroup" });
    const resource = new Resource(stack, {
      type: "Contoso.Test/guids",
      apiVersion: "2024-01-01",
      name: fn.guid("resource"),
    });
    stack.outputs.add("id", "string", resource.id);
    expect(Object.keys(files(stack)[0]!.resources!)).toEqual(["guidResource"]);
    compile(stack);
  }, 30_000);

  it.each([
    ["resourceGroup", () => fn.resourceGroup("external-rg")],
    ["subscription", () => fn.subscription()],
    ["managementGroup", () => fn.managementGroup("external-mg")],
    ["tenant", () => fn.tenant()],
  ] as const)(
    "keeps an unqualified %s scope call valid alongside the aliased resource",
    (functionName, scope) => {
      const stack = new Stack(`scope-${functionName}`, {
        targetScope: "resourceGroup",
      });
      const resource = new Resource(stack, {
        type: `Contoso.Test/${functionName}s`,
        apiVersion: "2024-01-01",
        name: "external",
        existing: true,
        scope: scope(),
      });
      stack.outputs.add("id", "string", resource.id);
      const result = files(stack)[0]!;
      const alias = RESOURCE_NAME_OVERRIDES.get(functionName)!;
      expect(Object.keys(result.resources!)).toEqual([alias]);
      expect(result.resources![alias]!.value).toMatchObject({
        value: { scope: { target: functionName } },
      });
      compile(stack);
    },
    30_000,
  );

  it("does not claim to cover built-in names outside the selected sublist", () => {
    const stack = new Stack("unlisted-function", {
      targetScope: "resourceGroup",
    });
    const resource = new Resource(stack, {
      type: "Contoso.Test/lengths",
      apiVersion: "2024-01-01",
      name: "existing",
      existing: true,
    });
    stack.outputs.add("id", "string", resource.id);
    expect(Object.keys(files(stack)[0]!.resources!)).toEqual(["length"]);
    expect(RESOURCE_NAME_OVERRIDES.has("length")).toBe(false);
  });

  it.each(["parameter", "variable"] as const)(
    "preserves an authored %s conflict and lets Bicep report it",
    (kind) => {
      const stack = new Stack(`authored-${kind}`, {
        targetScope: "resourceGroup",
      });
      const value =
        kind === "parameter"
          ? stack.parameters.add("resourceGroup", "string", {
              defaultValue: "value",
            })
          : stack.variables.add("resourceGroup", "value");
      const resource = storage(stack, "externalstorage", {
        existing: true,
        scope: fn.resourceGroup("external-rg"),
      });
      stack.outputs.add("value", "string", value);
      stack.outputs.add("id", "string", resource.id);
      const result = files(stack)[0]!;
      expect(Object.keys(kind === "parameter" ? result.parameters! : result.variables!)).toEqual([
        "resourceGroup",
      ]);
      expect(result.resources!.storageAccount!.value).toMatchObject({
        value: { scope: { target: "resourceGroup" } },
      });
      expect(() => compile(stack)).toThrow("BCP265");
    },
    30_000,
  );
});
