// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { beforeEach, describe, expect, it } from "vitest";
import { ProvisioningComponent, Resource, ResourceGroup, Stack, fn } from "../src/index.js";
import {
  getArmParent,
  getResourceGroupAncestor,
  getResourceScope,
} from "../src/constructs/resource/resource-relationships.js";
import { unwrapResourceHandle } from "../src/constructs/resource/resource-proxy.js";
import { unwrapExpression } from "../src/expression/expressions.js";
import { createLoopedResource, Loop } from "../src/internal-loop.js";

describe("authored resource relationships", () => {
  beforeEach(() => Stack.clearRoots());

  it("skips components and keeps resource-group containment separate from ARM parents", () => {
    const stack = new Stack("relationships");
    const group = new ResourceGroup(new ProvisioningComponent(stack), {
      name: "rg-relationships",
      location: "eastus",
    });
    const parent = new Resource(new ProvisioningComponent(group), {
      type: "Contoso.Test/widgets",
      apiVersion: "2024-01-01",
      name: "parent",
    });
    const child = new Resource(new ProvisioningComponent(parent), {
      type: "Contoso.Test/widgets/children",
      apiVersion: "2024-01-01",
      name: "child",
    });
    const extension = new Resource(parent, {
      type: "Microsoft.Authorization/locks",
      apiVersion: "2020-05-01",
      name: "protect",
    });

    expect(getArmParent(group)).toBeUndefined();
    expect(getResourceGroupAncestor(group)).toBeUndefined();
    expect(getArmParent(parent)).toBeUndefined();
    expect(getResourceGroupAncestor(parent)).toBe(group);
    expect(getArmParent(child)).toBe(parent);
    expect(getResourceGroupAncestor(child)).toBe(group);
    expect(getArmParent(extension)).toBe(parent);
    expect(getResourceGroupAncestor(extension)).toBe(group);
  });

  it("returns no relationships or explicit scope for a direct Stack resource", () => {
    const resource = new Resource(new Stack("direct"), {
      type: "Contoso.Test/widgets",
      apiVersion: "2024-01-01",
      name: "widget",
    });
    expect(getArmParent(resource)).toBeUndefined();
    expect(getResourceGroupAncestor(resource)).toBeUndefined();
    expect(getResourceScope(resource)).toBeUndefined();
  });

  it("retains looped parents and indexed child attachment identities", () => {
    const stack = new Stack("loops");
    const group = new ResourceGroup(stack, {
      name: "rg-loops",
      location: "eastus",
    });
    const loop = new Loop(["first", "second"]);
    const parent = createLoopedResource(Resource, loop, new ProvisioningComponent(group), {
      type: "Contoso.Test/widgets",
      apiVersion: "2024-01-01",
      name: loop.item,
    });
    const child = new Resource(parent.at(0), {
      type: "Contoso.Test/widgets/children",
      apiVersion: "2024-01-01",
      name: "child",
    });
    expect(getArmParent(parent)).toBeUndefined();
    expect(getResourceGroupAncestor(parent)).toBe(group);
    expect(getArmParent(child)).toBe(parent);
    expect(getResourceGroupAncestor(child)).toBe(group);
  });

  it.each([false, true])(
    "reads raw explicit lookup scope without changing containment (looped: %s)",
    (looped) => {
      const stack = new Stack("lookup");
      const group = new ResourceGroup(stack, {
        name: "rg-authored",
        location: "eastus",
      });
      const scope = fn.resourceGroup("external");
      const loop = new Loop(["first", "second"]);
      const props = {
        type: "Contoso.Test/widgets",
        apiVersion: "2024-01-01",
        name: "lookup",
        existing: true,
        scope,
      };
      const lookup = looped
        ? createLoopedResource(Resource, loop, group, props)
        : new Resource(group, props);
      expect(getResourceScope(lookup)).toBe(unwrapExpression(scope));
      expect(getArmParent(lookup)).toBeUndefined();
      expect(getResourceGroupAncestor(lookup)).toBe(group);
    },
  );

  it("rejects an invalid raw scope instead of treating it as an absent scope", () => {
    const lookup = new Resource(new Stack("invalid"), {
      type: "Contoso.Test/widgets",
      apiVersion: "2024-01-01",
      name: "lookup",
      existing: true,
    });
    Object.defineProperty(unwrapResourceHandle(lookup), "scope", {
      value: "invalid",
      configurable: true,
    });
    expect(() => getResourceScope(lookup)).toThrow(
      'Invalid authored scope for resource "Contoso.Test/widgets".',
    );
  });
});
