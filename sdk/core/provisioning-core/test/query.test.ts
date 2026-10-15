// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { beforeEach, describe, expect, it } from "vitest";

import { addLoopedResource, getLoopedResources, Stack } from "../src/constructs/stack.js";
import { createLoopedResource, Resource, Loop } from "../src/constructs/resource/resource.js";
import { ProvisioningComponent } from "../src/constructs/provisioning-component.js";
import {
  isResourceOf,
  isLoopedResource,
  isLoopedResourceOf,
} from "../src/constructs/resource/resource-utils.js";
import type { ResourceCtor } from "../src/constructs/resource/resource-registry.js";
import { resource } from "./support.js";

import { namingRequiredPolicy } from "../src/naming/naming-policy.js";
beforeEach(() => {
  Stack.clearRoots();
});

// Small class stubs — real subclasses that carry `resourceType`
// and `apiVersion` statics, matching the shape of emitter-generated
// classes. Not registered with the subclass registry (the deserializer
// isn't exercised here).
class StorageAccount extends Resource<"Microsoft.Storage/storageAccounts"> {
  static resourceType = "Microsoft.Storage/storageAccounts" as const;
  static apiVersion = "2024-01-01";
}
class Vault extends Resource<"Microsoft.KeyVault/vaults"> {
  static resourceType = "Microsoft.KeyVault/vaults" as const;
  static apiVersion = "2024-01-01";
}
class VirtualMachine extends Resource<"Microsoft.Compute/virtualMachines"> {
  static resourceType = "Microsoft.Compute/virtualMachines" as const;
  static apiVersion = "2024-01-01";
}

// Helper to instantiate a stub subclass with its own type/apiVersion,
// so `instanceof` checks match.
function newOf<T extends Resource>(
  ctor: ResourceCtor<T>,
  context: ProvisioningComponent,
  extra: Record<string, unknown> = {},
): T {
  return new ctor(context, {
    type: ctor.resourceType,
    apiVersion: ctor.apiVersion,
    ...extra,
  });
}

function createTestStack() {
  const s = new Stack("test", {
    targetScope: "resourceGroup",
    namingPolicy: namingRequiredPolicy,
  });

  const storage = newOf(StorageAccount, s, {
    name: "myStorage",
    sku: { name: "Standard_LRS" },
  });

  const vault = newOf(Vault, s, {
    name: "myVault",
  });

  return { stack: s, storage, vault };
}

describe("query", () => {
  describe("getResources(type)", () => {
    it("returns matching resources (via instanceof)", () => {
      const { stack: s } = createTestStack();
      const results = s.getResources(StorageAccount);
      expect(results).toHaveLength(1);
      expect(results[0]).toBeInstanceOf(StorageAccount);
    });

    it("returns empty array when no match", () => {
      const { stack: s } = createTestStack();
      expect(s.getResources(VirtualMachine)).toEqual([]);
    });

    it("rejects a base-Resource impostor whose type/apiVersion happen to match", () => {
      // A base `Resource` hand-crafted with the subclass's ARM type is
      // not `instanceof StorageAccount`, so the query correctly skips
      // it. This is exactly what protects callers from a false-positive
      // `results[0].sku` access at runtime.
      const s = new Stack("impostor", {
        targetScope: "resourceGroup",
        namingPolicy: namingRequiredPolicy,
      });
      resource(s, {
        type: StorageAccount.resourceType,
        apiVersion: StorageAccount.apiVersion,
        name: "impostor",
      });
      expect(s.getResources(StorageAccount)).toEqual([]);
    });

    it("exposes the first match via [0]", () => {
      const { stack: s } = createTestStack();
      expect(s.getResources(StorageAccount)[0]).toBeInstanceOf(StorageAccount);
      expect(s.getResources(VirtualMachine)[0]).toBeUndefined();
    });
  });

  describe("isResourceOf()", () => {
    it("returns true for matching instance", () => {
      const { storage } = createTestStack();
      expect(isResourceOf(storage, StorageAccount)).toBe(true);
    });

    it("returns false for a different subclass", () => {
      const { vault } = createTestStack();
      expect(isResourceOf(vault, StorageAccount)).toBe(false);
    });

    it("returns false for a base-Resource impostor with matching strings", () => {
      const s = new Stack("impostor", {
        targetScope: "resourceGroup",
        namingPolicy: namingRequiredPolicy,
      });
      const impostor = resource(s, {
        type: StorageAccount.resourceType,
        apiVersion: StorageAccount.apiVersion,
        name: "impostor",
      });
      expect(isResourceOf(impostor, StorageAccount)).toBe(false);
    });

    it("narrows via Array.filter with an arrow wrapper", () => {
      const { stack: s } = createTestStack();
      const filtered = s.getResources().filter((r) => isResourceOf(r, StorageAccount));
      expect(filtered).toHaveLength(1);
      expect(filtered[0]).toBeInstanceOf(StorageAccount);
    });
  });

  describe("isLoopedResourceOf()", () => {
    it("returns true for a looped declaration wrapping the given class", () => {
      const s = new Stack("looped", {
        targetScope: "resourceGroup",
        namingPolicy: namingRequiredPolicy,
      });
      const loop = new Loop<string>(["a", "b"]);
      const looped = createLoopedResource(StorageAccount, loop, s, {
        type: StorageAccount.resourceType,
        apiVersion: StorageAccount.apiVersion,
        name: loop.item as never,
      });
      expect(isLoopedResourceOf(looped, StorageAccount)).toBe(true);
      expect(isLoopedResourceOf(looped, Vault)).toBe(false);
    });

    it("returns false for a scalar resource and for non-resources", () => {
      const { storage } = createTestStack();
      expect(isLoopedResourceOf(storage, StorageAccount)).toBe(false);
      expect(isLoopedResourceOf(undefined, StorageAccount)).toBe(false);
    });
  });

  describe("filtering by ARM type string (native)", () => {
    it("returns resources matching the type string", () => {
      const { stack: s } = createTestStack();
      const results = s
        .getResources()
        .filter((r) => r.type === "Microsoft.Storage/storageAccounts");
      expect(results).toHaveLength(1);
      expect(results[0]!.type).toBe("Microsoft.Storage/storageAccounts");
    });

    it("returns empty array for non-existent type", () => {
      const { stack: s } = createTestStack();
      expect(
        s.getResources().filter((r) => r.type === "Microsoft.Compute/virtualMachines"),
      ).toEqual([]);
    });
  });

  describe("filtering by predicate (native)", () => {
    it("filters by arbitrary predicate", () => {
      const { stack: s } = createTestStack();
      const results = s.getResources().filter((r) => r.type === "Microsoft.KeyVault/vaults");
      expect(results).toHaveLength(1);
      expect(results[0]!.type).toBe("Microsoft.KeyVault/vaults");
    });

    it("returns empty when no resources match", () => {
      const { stack: s } = createTestStack();
      expect(s.getResources().filter(() => false)).toEqual([]);
    });
  });

  describe("getResources() — everything", () => {
    it("returns all resources", () => {
      const { stack: s } = createTestStack();
      expect(s.getResources()).toHaveLength(2);
    });
  });

  describe("resources composed through components", () => {
    it("getResources() includes resources created in nested components", () => {
      const parent = new Stack("parent", {
        targetScope: "resourceGroup",
        namingPolicy: namingRequiredPolicy,
      });
      newOf(StorageAccount, parent, { name: "parentStorage" });

      class ChildComponent extends ProvisioningComponent {
        readonly vault = newOf(Vault, this, { name: "childVault" });
      }

      new ChildComponent(parent);

      const results = parent.getResources();
      expect(results.length).toBeGreaterThanOrEqual(2);
      expect(results.some((r) => r instanceof StorageAccount)).toBe(true);
      expect(results.some((r) => r instanceof Vault)).toBe(true);
    });

    it("deep component nesting still contributes resources to stack queries", () => {
      const root = new Stack("root", {
        targetScope: "resourceGroup",
        namingPolicy: namingRequiredPolicy,
      });

      class DeepComponent extends ProvisioningComponent {
        readonly vm = newOf(VirtualMachine, this, { name: "deepVm" });
      }

      class MidComponent extends ProvisioningComponent {
        readonly deep = new DeepComponent(this);
      }

      new MidComponent(root);

      expect(root.getResources(VirtualMachine)).toHaveLength(1);
    });
  });

  describe("across multiple roots", () => {
    it("getResources across roots via flatMap", () => {
      const s1 = new Stack("stack1", {
        targetScope: "resourceGroup",
        namingPolicy: namingRequiredPolicy,
      });
      newOf(StorageAccount, s1, { name: "storage1" });

      const s2 = new Stack("stack2", {
        targetScope: "resourceGroup",
        namingPolicy: namingRequiredPolicy,
      });
      newOf(Vault, s2, { name: "vault1" });

      expect([s1, s2].flatMap((s) => s.getResources())).toHaveLength(2);
    });

    it("getResources across roots via flatMap filters by ctor", () => {
      const s1 = new Stack("stack1", {
        targetScope: "resourceGroup",
        namingPolicy: namingRequiredPolicy,
      });
      newOf(StorageAccount, s1, { name: "s1" });

      const s2 = new Stack("stack2", {
        targetScope: "resourceGroup",
        namingPolicy: namingRequiredPolicy,
      });
      newOf(StorageAccount, s2, { name: "s2" });

      expect([s1, s2].flatMap((s) => s.getResources(StorageAccount))).toHaveLength(2);
    });
  });

  describe("scalar vs looped internal queries", () => {
    function stackWithScalarAndLoop() {
      const s = new Stack("scoped", {
        targetScope: "resourceGroup",
        namingPolicy: namingRequiredPolicy,
      });
      newOf(StorageAccount, s, { name: "scalarStorage" });
      const loop = new Loop<string>("regions" as any);
      createLoopedResource(StorageAccount, loop, s, {
        type: StorageAccount.resourceType,
        apiVersion: StorageAccount.apiVersion,
        name: loop.item as any,
      });
      return s;
    }

    it("getResources excludes looped declarations", () => {
      const s = stackWithScalarAndLoop();
      const results = s.getResources(StorageAccount);
      expect(results).toHaveLength(1);
      expect(isLoopedResource(results[0]!)).toBe(false);
    });

    it("the internal loop query returns only looped declarations", () => {
      const s = stackWithScalarAndLoop();
      const results = getLoopedResources(s, StorageAccount);
      expect(results).toHaveLength(1);
      expect(isLoopedResource(results[0]!)).toBe(true);
    });

    it("untyped variants split scalar vs looped", () => {
      const s = stackWithScalarAndLoop();
      expect(s.getResources()).toHaveLength(1);
      expect(getLoopedResources(s)).toHaveLength(1);
    });

    it("exposes the first element of each via [0]", () => {
      const s = stackWithScalarAndLoop();
      const scalar = s.getResources(StorageAccount)[0];
      expect(scalar !== undefined && !isLoopedResource(scalar)).toBe(true);
      const looped = getLoopedResources(s, StorageAccount)[0];
      expect(looped !== undefined && isLoopedResource(looped)).toBe(true);
    });
  });

  describe("recursive option", () => {
    class Group extends ProvisioningComponent {}

    it("recursive: false returns only the stack's direct children", () => {
      const s = new Stack("r", {
        targetScope: "resourceGroup",
        namingPolicy: namingRequiredPolicy,
      });
      const top = newOf(StorageAccount, s, { name: "top" });
      const group = new Group(s);
      newOf(StorageAccount, group, { name: "nested" });

      // Recursive (default) walks the whole subtree.
      expect(s.getResources(StorageAccount)).toHaveLength(2);

      // Non-recursive sees only the stack's direct children (not the one
      // nested under the group component).
      const direct = s.getResources(StorageAccount, { recursive: false });
      expect(direct).toHaveLength(1);
      expect(direct[0]).toBe(top);
    });
  });

  describe("getResource(type, name)", () => {
    it("returns the first resource of the type with a matching literal name", () => {
      const { stack: s, storage } = createTestStack();
      expect(s.getResource(StorageAccount, "myStorage")).toBe(storage);
    });

    it("returns undefined when no name matches", () => {
      const { stack: s } = createTestStack();
      expect(s.getResource(StorageAccount, "nope")).toBeUndefined();
    });

    it("filters by type — a name that belongs to another type is ignored", () => {
      const { stack: s } = createTestStack();
      // `myVault` exists, but as a Vault, not a StorageAccount.
      expect(s.getResource(StorageAccount, "myVault")).toBeUndefined();
    });

    it("returns the first match when multiple share type + name", () => {
      const s = new Stack("dup", {
        targetScope: "resourceGroup",
        namingPolicy: namingRequiredPolicy,
      });
      const first = newOf(StorageAccount, s, { name: "dupe" });
      newOf(StorageAccount, s, { name: "dupe" });
      expect(s.getResource(StorageAccount, "dupe")).toBe(first);
    });
  });

  describe("add(ctor, ...)", () => {
    it("returns the scalar instance", () => {
      const s = new Stack("adds", {
        targetScope: "resourceGroup",
        namingPolicy: namingRequiredPolicy,
      });

      const scalar = s.add(StorageAccount, {
        type: StorageAccount.resourceType,
        apiVersion: StorageAccount.apiVersion,
        name: "scalar",
      });
      expect(scalar).toBeInstanceOf(StorageAccount);
      expect(isLoopedResource(scalar)).toBe(false);
    });

    it("keeps looped stack construction available through the internal function", () => {
      const s = new Stack("looped-add", {
        targetScope: "resourceGroup",
        namingPolicy: namingRequiredPolicy,
      });
      const loop = new Loop<string>(["a", "b"]);

      const looped = addLoopedResource(s, StorageAccount, loop, {
        type: StorageAccount.resourceType,
        apiVersion: StorageAccount.apiVersion,
        name: loop.item as never,
      });

      expect(isLoopedResource(looped)).toBe(true);
      expect(getLoopedResources(s, StorageAccount)).toEqual([looped]);
    });
  });
});
