import { describe, expect, it } from "vitest";

import { serialize } from "@azure/provisioning-core/serialization";
import { Stack } from "../src/constructs/stack.js";
import { ProvisioningComponent } from "../src/constructs/provisioning-component.js";
import { deref } from "../src/constructs/resource/resource-proxy.js";
import { Resource } from "../src/constructs/resource/resource.js";
import { ResourceGroup } from "../src/constructs/built-in-resources/resource-group.js";
import { namingRequiredPolicy } from "../src/naming/naming-policy.js";
import { resource } from "./support.js";

describe("components", () => {
  const assertResourceGroup = (_value: ResourceGroup): void => {};

  it("registers component resources with their deployment stack", () => {
    const root = new Stack("infra", {
      targetScope: "subscription",
      namingPolicy: namingRequiredPolicy,
    });

    class NestedComponent extends ProvisioningComponent {
      readonly nestedResource = resource(this, {
        name: "nested",
        type: "Contoso.Test/resources",
        apiVersion: "2024-01-01",
      });
    }

    const nested = new NestedComponent(root);

    expect(nested.parent).toBe(root);
    expect(root.children).toContain(nested);
    expect(root.getResources()).toEqual([nested.nestedResource]);
  });

  it("places resources under a ResourceGroup component in the tree", () => {
    const root = new Stack("infra", {
      targetScope: "subscription",
      namingPolicy: namingRequiredPolicy,
    });
    const group = new ResourceGroup(root, {
      name: "rg-demo",
      location: "eastus",
    });

    class NestedComponent extends ProvisioningComponent {
      readonly scopedResource = resource(this, {
        name: "scoped",
        type: "Contoso.Test/resources",
        apiVersion: "2024-01-01",
      });
    }

    const nested = new NestedComponent(group);

    expect(root.getResources()).toContain(nested.scopedResource);
    expect(nested.parent).toBe(group);
    // Per-resource Bicep `scope:` is not inherited from a ResourceGroup
    // ancestor — the resource's deployment scope is determined by the
    // file/module it lands in (driven by the ProvisioningComponent tree at serialize
    // time), not by an inherited expression on state.
    expect(nested.scopedResource.existing).toBeUndefined();
  });

  it("preserves managedBy when constructing a ResourceGroup", () => {
    const root = new Stack("infra", {
      targetScope: "subscription",
      namingPolicy: namingRequiredPolicy,
    });
    const group = new ResourceGroup(root, {
      name: "rg-app",
      location: "eastus",
      managedBy: "contoso/manager",
    });

    expect(deref(group.managedBy)).toBe("contoso/manager");
  });

  it("preserves existing ResourceGroup behavior", () => {
    const root = new Stack("infra", {
      targetScope: "subscription",
      namingPolicy: namingRequiredPolicy,
    });
    const group = new ResourceGroup(root, {
      existing: true,
      name: "rg-existing",
    });

    expect(group.existing).toBe(true);
    expect(deref(group.name)).toBe("rg-existing");
  });

  it("transforms matching resources in the component subtree with inferred types", () => {
    class NestedComponent extends ProvisioningComponent {
      readonly group = new ResourceGroup(this, {
        name: "rg-app",
        location: "eastus",
      });

      readonly other = resource(this, {
        name: "other-a",
        type: "Contoso.Test/others",
        apiVersion: "2024-01-01",
      });
    }

    const root = new Stack("infra", {
      targetScope: "subscription",
      namingPolicy: namingRequiredPolicy,
    });
    const nested = new NestedComponent(root);
    const matched: ResourceGroup[] = [];

    const result = root.transform(ResourceGroup, (group) => {
      assertResourceGroup(group);
      matched.push(group);
    });

    expect(result).toBe(root);
    expect(matched).toHaveLength(1);
    expect(deref(matched[0]!.name)).toBe("rg-app");
    expect(deref(nested.group.location)).toBe("eastus");
  });

  it("transforms every component in the subtree when only a callback is provided", () => {
    class NestedComponent extends ProvisioningComponent {
      readonly group = new ResourceGroup(this, {
        name: "rg-app",
        location: "eastus",
      });

      readonly other = resource(this, {
        name: "other-a",
        type: "Contoso.Test/others",
        apiVersion: "2024-01-01",
      });
    }

    const root = new Stack("infra", {
      targetScope: "subscription",
      namingPolicy: namingRequiredPolicy,
    });
    const nested = new NestedComponent(root);
    const visited: ProvisioningComponent[] = [];

    const result = root.transform((component) => {
      visited.push(component);
    });

    expect(result).toBe(root);
    expect(visited).toEqual([root, nested, nested.group, nested.other]);
  });

  it("transforms only matching storage-like resources among sibling resource types", () => {
    class FakeStorage extends Resource<"Contoso.Test/storages"> {
      constructor(context: ProvisioningComponent, name: string) {
        super(context, {
          name,
          type: "Contoso.Test/storages",
          apiVersion: "2024-01-01",
        });
      }
    }

    class FakeKeyVault extends Resource<"Contoso.Test/keyVaults"> {
      constructor(context: ProvisioningComponent, name: string) {
        super(context, {
          name,
          type: "Contoso.Test/keyVaults",
          apiVersion: "2024-01-01",
        });
      }
    }

    const assertFakeStorage = (_value: FakeStorage): void => {};

    class NestedComponent extends ProvisioningComponent {
      readonly storageA = new FakeStorage(this, "storage-a");
      readonly storageB = new FakeStorage(this, "storage-b");
      readonly keyVaultA = new FakeKeyVault(this, "vault-a");
      readonly keyVaultB = new FakeKeyVault(this, "vault-b");
    }

    const root = new Stack("infra", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });
    const nested = new NestedComponent(root);
    const matched: FakeStorage[] = [];

    root.transform(FakeStorage, (storage) => {
      assertFakeStorage(storage);
      matched.push(storage);
    });

    expect(matched).toHaveLength(2);
    expect(matched.map((storage) => deref(storage.name))).toEqual(["storage-a", "storage-b"]);
    expect(deref(nested.storageA.name)).toBe("storage-a");
    expect(deref(nested.storageB.name)).toBe("storage-b");
    expect(deref(nested.keyVaultA.name)).toBe("vault-a");
    expect(deref(nested.keyVaultB.name)).toBe("vault-b");
  });

  it("transforms only matching blob-like child resources", () => {
    class FakeBlob extends ProvisioningComponent {
      readonly resource;
      fakeProperty = "unchanged";

      constructor(parent: ProvisioningComponent, storageResource: Resource, name: string) {
        super(parent);
        this.resource = resource(storageResource, {
          name,
          type: "Contoso.Test/storages/blobs",
          apiVersion: "2024-01-01",
          location: null,
        });
      }
    }

    class FakeStorage extends ProvisioningComponent {
      readonly resource;
      readonly blob: FakeBlob;

      constructor(parent: ProvisioningComponent, name: string) {
        super(parent);
        this.resource = resource(this, {
          name,
          type: "Contoso.Test/storages",
          apiVersion: "2024-01-01",
        });
        this.blob = new FakeBlob(this, this.resource, "default");
      }
    }

    const assertFakeBlob = (_value: FakeBlob): void => {};

    const root = new Stack("infra", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });
    const storage = new FakeStorage(root, "storage-a");
    const matched: FakeBlob[] = [];

    root.transform(FakeBlob, (blob) => {
      assertFakeBlob(blob);
      matched.push(blob);
    });

    expect(matched).toHaveLength(1);
    expect(matched[0]).toBe(storage.blob);
    expect(deref(matched[0]!.resource.name)).toBe("default");
    expect(deref(storage.resource.name)).toBe("storage-a");
  });

  it("uses the resource proxy inside transform callbacks", () => {
    class FakeStorage extends Resource<"Contoso.Test/storages"> {
      constructor(context: ProvisioningComponent, name: string) {
        super(context, {
          name,
          type: "Contoso.Test/storages",
          apiVersion: "2024-01-01",
        });
      }
    }

    const root = new Stack("infra", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });
    const storage = new FakeStorage(root, "storage-a");

    root.transform(FakeStorage, (matchedStorage) => {
      new Resource(matchedStorage, {
        name: "child",
        type: "Contoso.Test/storages/children",
        apiVersion: "2024-01-01",
        location: null,
      });
    });

    const [file] = serialize(root).infras;
    const resourceKeys = Object.keys(file?.resources ?? {});

    expect(resourceKeys).toContain("storage");
    expect(resourceKeys).toContain("child");
    expect(deref(storage.name)).toBe("storage-a");
  });

  it("adds child components with ctor arguments after the parent context", () => {
    class FeatureComponent extends ProvisioningComponent {
      constructor(
        parent: ProvisioningComponent,
        readonly featureName: string,
        readonly replicaCount: number,
      ) {
        super(parent);
      }
    }

    const root = new Stack("infra", {
      targetScope: "subscription",
      namingPolicy: namingRequiredPolicy,
    });
    const rg = new ResourceGroup(root, {
      name: "rg-app",
      location: "eastus",
    });

    const feature = rg.add(FeatureComponent, "orders", 2);

    expect(feature).toBeInstanceOf(FeatureComponent);
    expect(feature.parent).toBe(rg);
    expect(feature.featureName).toBe("orders");
    expect(feature.replicaCount).toBe(2);
  });

  it("adds child components from stack with ctor arguments after the parent context", () => {
    class FeatureComponent extends ProvisioningComponent {
      constructor(
        parent: ProvisioningComponent,
        readonly featureName: string,
        readonly replicaCount: number,
      ) {
        super(parent);
      }
    }

    const root = new Stack("infra", {
      targetScope: "subscription",
      namingPolicy: namingRequiredPolicy,
    });

    const feature = root.add(FeatureComponent, "orders", 2);

    expect(feature).toBeInstanceOf(FeatureComponent);
    expect(feature.parent).toBe(root);
    expect(feature.featureName).toBe("orders");
    expect(feature.replicaCount).toBe(2);
  });
});
