import { renderBicepFiles } from "@azure/provisioning-bicep";
import { serialize } from "@azure/provisioning-core/serialization";
import { describe, expect, it } from "vitest";
import { ProvisioningComponent } from "../src/constructs/provisioning-component.js";
import { createLoopedResource, Loop, Resource } from "../src/constructs/resource/resource.js";
import { Stack } from "../src/constructs/stack.js";
import { namingRequiredPolicy } from "../src/naming/naming-policy.js";

class Secret extends Resource<"Contoso.KV/vaults/secrets"> {
  static readonly resourceType = "Contoso.KV/vaults/secrets" as const;
  static readonly apiVersion = "2024-01-01";

  constructor(context: Vault, props: { name: string }) {
    super(context, {
      type: Secret.resourceType,
      apiVersion: Secret.apiVersion,
      name: props.name,
      location: null,
    });
  }
}

class Vault extends Resource<"Contoso.KV/vaults"> {
  static readonly resourceType = "Contoso.KV/vaults" as const;
  static readonly apiVersion = "2024-01-01";

  constructor(context: ProvisioningComponent, props: { name: string }) {
    super(context, {
      type: Vault.resourceType,
      apiVersion: Vault.apiVersion,
      name: props.name,
    });
  }

  get sku(): { name: string } {
    return this.expr("sku");
  }
}

function makeStack(): Stack {
  return new Stack("t", {
    targetScope: "resourceGroup",
    namingPolicy: namingRequiredPolicy,
  });
}

describe("looped element child resources", () => {
  it("registers explicitly constructed children under the raw looped parent", () => {
    const stack = makeStack();
    const vaults = createLoopedResource(Vault, new Loop<string>("names" as never), stack, {
      name: "v" as never,
    });

    const first = new Secret(vaults.at(0), { name: "s0" });
    const second = new Secret(vaults.at(1), { name: "s1" });

    expect(vaults.children).toEqual([first, second]);
    expect(first.parent).toBe(vaults);
    expect(second.parent).toBe(vaults);
  });

  it("serializes an element-scoped child with an indexed parent", () => {
    const stack = makeStack();
    const vaults = createLoopedResource(Vault, new Loop<string>("names" as never), stack, {
      name: "v" as never,
    });
    new Secret(vaults.at(0), { name: "s0" });

    const bicep = renderBicepFiles(serialize([stack]))
      .map((file) => file.contents)
      .join("\n");

    expect(bicep).toMatch(/parent:\s*\w+\[0\]/);
  });
});

describe("looped element property writes", () => {
  it("rejects top-level ARM property writes", () => {
    const stack = makeStack();
    const vaults = createLoopedResource(Vault, new Loop<string>("names" as never), stack, {
      name: "v" as never,
    });

    expect(() => {
      (vaults.at(0) as unknown as { name: string }).name = "nope";
    }).toThrow(/loop iterations cannot be mutated/);
  });

  it("rejects nested ARM property writes", () => {
    const stack = makeStack();
    const vaults = createLoopedResource(Vault, new Loop<string>("names" as never), stack, {
      name: "v" as never,
    });

    expect(() => {
      vaults.at(0).sku.name = "nope";
    }).toThrow(/loop iterations cannot be mutated/);
  });

  it("allows indexed ARM property reads", () => {
    const stack = makeStack();
    const vaults = createLoopedResource(Vault, new Loop<string>("names" as never), stack, {
      name: "v" as never,
    });

    expect(() => vaults.at(0).sku.name).not.toThrow();
    expect(() => (vaults.at(0) as unknown as { name: unknown }).name).not.toThrow();
  });
});
