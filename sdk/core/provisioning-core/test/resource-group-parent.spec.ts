// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { beforeEach, describe, expect, it } from "vitest";
import {
  DefaultNamingPolicy,
  ProvisioningComponent,
  Resource,
  ResourceGroup,
  Stack,
  deref,
  fn,
  type DeploymentContext,
} from "../src/index.js";
import { createLoopedResource, Loop } from "../src/internal-loop.js";
import { deserialize, serialize } from "../src/serialization/index.js";

class ContextComponent extends ProvisioningComponent {
  constructor(parent?: ProvisioningComponent, context?: DeploymentContext) {
    super(parent);
    this._localDeploymentContext = context;
  }
}

describe("ResourceGroup parent validation", () => {
  beforeEach(() => Stack.clearRoots());

  it("allows a new group directly under a subscription Stack", () => {
    const stack = new Stack("subscription");
    const group = new ResourceGroup(stack, {
      name: "rg-subscription",
      location: "eastus",
    });
    expect(group.parent).toBe(stack);
    expect(stack.getResources(ResourceGroup)).toEqual([group]);
    expect(serialize(stack).infras[0]!.resources!.resourceGroup!.type).toBe(
      ResourceGroup.resourceType,
    );
    const [restored] = deserialize(JSON.stringify(serialize(stack)));
    expect(restored!.getResources(ResourceGroup)).toHaveLength(1);
    expect(restored!.targetScope).toBe("subscription");
  });

  it("allows custom component defaults between a new group and its Stack", () => {
    const namingPolicy = new DefaultNamingPolicy({ workload: "custom" });
    const stack = new Stack("components", {
      tags: { environment: "dev", owner: "root" },
    });
    const context = new ContextComponent(stack, {
      location: "westus2",
      tags: { owner: "component" },
      namingPolicy,
    });
    const nested = new ContextComponent(context);
    const group = new ResourceGroup(nested, {
      name: "rg-component",
      location: "eastus",
    });
    expect(group.parent).toBe(nested);
    expect(group.deploymentContext.namingPolicy).toBe(namingPolicy);
    expect(deref(group.tags)).toEqual({
      environment: "dev",
      owner: "component",
    });
    expect(deref(group.location)).toBe("eastus");
    expect(stack.getResources(ResourceGroup)).toEqual([group]);
  });

  it.each(["resourceGroup", "managementGroup", "tenant"] as const)(
    "rejects a new group in a %s Stack before registering it",
    (targetScope) => {
      const stack = new Stack("invalid-scope", { targetScope });
      const context = new ContextComponent(stack, {
        location: "eastus",
      });
      expect(() => new ResourceGroup(context, { name: "invalid", location: "eastus" })).toThrow(
        `requires Stack targetScope "subscription", but Stack "invalid-scope" targets "${targetScope}"`,
      );
      expect(context.children).toEqual([]);
      expect(stack.getResources()).toEqual([]);
    },
  );

  it.each(["resourceGroup", "managementGroup", "tenant"] as const)(
    "rejects a new looped group in a %s Stack before registration",
    (targetScope) => {
      const stack = new Stack("looped-invalid-scope", { targetScope });
      const context = new ProvisioningComponent(stack);
      const loop = new Loop(["rg-invalid"]);
      expect(() =>
        createLoopedResource(ResourceGroup, loop, context, {
          name: loop.item,
          location: "eastus",
        }),
      ).toThrow('requires Stack targetScope "subscription"');
      expect(context.children).toEqual([]);
    },
  );

  it.each([false, true])("rejects a looped group beneath a resource (existing: %s)", (existing) => {
    const stack = new Stack("looped-nested-group");
    const resource = new Resource(stack, {
      type: "Contoso.Test/widgets",
      apiVersion: "2024-01-01",
      name: "widget",
    });
    const context = new ProvisioningComponent(resource);
    const loop = new Loop(["rg-invalid"]);
    expect(() =>
      createLoopedResource(
        ResourceGroup,
        loop,
        context,
        existing ? { existing: true, name: loop.item } : { name: loop.item, location: "eastus" },
      ),
    ).toThrow("cannot be nested beneath a resource declaration");
    expect(context.children).toEqual([]);
  });

  it("validates looped resource-group scope during JSON restoration", () => {
    const stack = new Stack("looped-roundtrip");
    const loop = new Loop(["rg-loop"]);
    createLoopedResource(ResourceGroup, loop, stack, {
      name: loop.item,
      location: "eastus",
    });
    const document = serialize(stack);
    expect(serialize(deserialize(JSON.stringify(document)))).toEqual(document);
    const invalid = {
      infras: document.infras.map((infra) => ({
        ...infra,
        targetScope: "resourceGroup" as const,
      })),
    };
    expect(() => deserialize(JSON.stringify(invalid))).toThrow(
      'requires Stack targetScope "subscription"',
    );
  });

  it.each([false, true])("rejects a direct resource parent (existing group: %s)", (existing) => {
    const stack = new Stack("resource-parent");
    const resource = new Resource(stack, {
      type: "Contoso.Test/widgets",
      apiVersion: "2024-01-01",
      name: "widget",
    });
    const props = existing
      ? { existing: true as const, name: "rg-existing" }
      : { name: "rg-new", location: "eastus" };
    expect(() => new ResourceGroup(resource, props)).toThrow(
      "cannot be nested beneath a resource declaration",
    );
    expect(resource.children).toEqual([]);
    expect(stack.getResources()).toEqual([resource]);
  });

  it("rejects a direct ResourceGroup parent", () => {
    const stack = new Stack("group-parent");
    const parent = new ResourceGroup(stack, {
      name: "rg-parent",
      location: "eastus",
    });
    expect(() => new ResourceGroup(parent, { name: "rg-child", location: "eastus" })).toThrow(
      "cannot be nested beneath a resource declaration",
    );
    expect(parent.children).toEqual([]);
  });

  it("rejects a direct looped resource declaration parent", () => {
    const stack = new Stack("looped-parent");
    const loop = new Loop(["widget"]);
    const parent = createLoopedResource(Resource, loop, stack, {
      type: "Contoso.Test/widgets",
      apiVersion: "2024-01-01",
      name: loop.item,
    });
    expect(() => new ResourceGroup(parent, { name: "rg-child", location: "eastus" })).toThrow(
      "cannot be nested beneath a resource declaration",
    );
    expect(parent.children).toEqual([]);
  });

  it.each([false, true])(
    "rejects an intervening RG through ordinary components (existing ancestor: %s)",
    (existing) => {
      const stack = new Stack("nested-groups");
      const parent = new ResourceGroup(
        stack,
        existing
          ? { existing: true, name: "rg-parent" }
          : { name: "rg-parent", location: "eastus" },
      );
      const context = new ContextComponent(new ContextComponent(parent));
      expect(() => new ResourceGroup(context, { name: "rg-child", location: "eastus" })).toThrow(
        "cannot be nested beneath a resource declaration",
      );
      expect(context.children).toEqual([]);
      expect(stack.getResources(ResourceGroup)).toEqual([parent]);
    },
  );

  it("rejects an intervening generic RG declaration", () => {
    const stack = new Stack("generic-group");
    const parent = new Resource(stack, {
      type: ResourceGroup.resourceType,
      apiVersion: ResourceGroup.apiVersion,
      name: "rg-generic",
      location: "eastus",
    });
    const context = new ContextComponent(parent);
    expect(() => new ResourceGroup(context, { name: "rg-child", location: "eastus" })).toThrow(
      "cannot be nested beneath a resource declaration",
    );
    expect(context.children).toEqual([]);
  });

  it("does not mistake custom defaults for a containing Stack", () => {
    const context = new ContextComponent(undefined, {
      location: "eastus",
      namingPolicy: new DefaultNamingPolicy({ workload: "custom" }),
    });
    expect(() => new ResourceGroup(context, { name: "rg-orphan", location: "eastus" })).toThrow(
      "requires a containing Stack",
    );
    expect(context.children).toEqual([]);
  });

  it("rejects an explicitly scoped existing lookup through a component beneath an RG", () => {
    const stack = new Stack("lookup-component");
    const parent = new ResourceGroup(stack, {
      name: "rg-parent",
      location: "eastus",
    });
    const context = new ContextComponent(parent);
    expect(
      () =>
        new ResourceGroup(context, {
          existing: true,
          name: "rg-external",
          scope: fn.subscription("00000000-0000-0000-0000-000000000000"),
        }),
    ).toThrow("cannot be nested beneath a resource declaration");
    expect(context.children).toEqual([]);
  });

  it.each([false, true])(
    "rejects any resource ancestor through multiple components (existing group: %s)",
    (existing) => {
      const stack = new Stack("resource-ancestor");
      const resource = new Resource(stack, {
        type: "Contoso.Test/widgets",
        apiVersion: "2024-01-01",
        name: "widget",
      });
      const context = new ContextComponent(new ContextComponent(resource));
      const props = existing
        ? {
            existing: true as const,
            name: "rg-existing",
            scope: fn.subscription(),
          }
        : { name: "rg-new", location: "eastus" };
      expect(() => new ResourceGroup(context, props)).toThrow(
        "cannot be nested beneath a resource declaration",
      );
      expect(context.children).toEqual([]);
      expect(stack.getResources()).toEqual([resource]);
    },
  );

  it.each([false, true])(
    "rejects a looped resource ancestor through components (existing group: %s)",
    (existing) => {
      const stack = new Stack("looped-ancestor");
      const loop = new Loop(["widget"]);
      const resource = createLoopedResource(Resource, loop, stack, {
        type: "Contoso.Test/widgets",
        apiVersion: "2024-01-01",
        name: loop.item,
      });
      const context = new ContextComponent(new ContextComponent(resource));
      const props = existing
        ? { existing: true as const, name: "rg-existing" }
        : { name: "rg-new", location: "eastus" };
      expect(() => new ResourceGroup(context, props)).toThrow(
        "cannot be nested beneath a resource declaration",
      );
      expect(context.children).toEqual([]);
    },
  );

  it.each(["subscription", "resourceGroup", "managementGroup", "tenant"] as const)(
    "preserves existing RG lookups from a %s Stack",
    (targetScope) => {
      const stack = new Stack("existing-group", { targetScope });
      const context = new ContextComponent(stack);
      const scope = fn.subscription("00000000-0000-0000-0000-000000000000");
      const group = new ResourceGroup(context, {
        existing: true,
        name: "rg-external",
        scope,
      });
      expect(group.parent).toBe(context);
      expect(group.existing).toBe(true);
      const node = serialize(stack).infras[0]!.resources!.resourceGroup!;
      expect(node.value).toMatchObject({
        kind: "object",
        value: {
          scope: {
            kind: "function-call",
            target: "subscription",
            args: [{ kind: "string", value: "00000000-0000-0000-0000-000000000000" }],
          },
        },
      });
      const [restored] = deserialize(JSON.stringify(serialize(stack)));
      expect(restored!.getResources(ResourceGroup)[0]!.existing).toBe(true);
      expect(restored!.targetScope).toBe(targetScope);
    },
  );
});
