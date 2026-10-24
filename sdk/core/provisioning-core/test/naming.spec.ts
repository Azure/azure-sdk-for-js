// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";

import { renderBicepFiles, type ResourceNamingRules } from "../src/internal.js";
import {
  type ProvisioningComponent,
  DefaultNamingPolicy,
  Resource,
  Stack,
  ResourceGroup,
  namingRequiredPolicy,
} from "@azure/provisioning-core";
import { resource } from "./support.js";

const storageRules: ResourceNamingRules = {
  abbreviation: "st",
  minLength: 3,
  maxLength: 24,
  pattern: { regex: "^[a-z0-9]+$" },
  scope: "global",
};

const kvRules: ResourceNamingRules = {
  abbreviation: "kv",
  minLength: 3,
  maxLength: 24,
  pattern: { regex: "^[A-Za-z0-9-]+$" },
  scope: "global",
};

const vnetRules: ResourceNamingRules = {
  abbreviation: "vnet",
  minLength: 2,
  maxLength: 64,
  pattern: { regex: "^[A-Za-z0-9._-]+$" },
  scope: "resourceGroup",
};

const customRules: ResourceNamingRules = {
  abbreviation: "ct",
  minLength: 1,
  maxLength: 80,
  pattern: { regex: "^[A-Za-z0-9-]+$" },
  scope: "resourceGroup",
};

/**
 * Optional overrides shared by the test resource subclasses below.
 */
interface AutoNamedProps {
  readonly name?: string;
  readonly location?: string;
}

/**
 * Purpose-built test resource classes. Each declares its naming constraints
 * as a `protected static namingRules` field exactly like a generated CDK
 * resource, so these tests exercise the real static-reflection path the base
 * `Resource` constructor uses to resolve auto-generated names.
 */
class StorageAccountResource extends Resource<"Microsoft.Storage/storageAccounts"> {
  static readonly resourceType = "Microsoft.Storage/storageAccounts" as const;
  static readonly apiVersion = "2024-01-01";
  protected static namingRules = storageRules;

  constructor(context: ProvisioningComponent, props: AutoNamedProps = {}) {
    super(context, {
      type: StorageAccountResource.resourceType,
      apiVersion: StorageAccountResource.apiVersion,
      name: props.name,
      location: props.location,
    });
  }
}

class VaultResource extends Resource<"Microsoft.KeyVault/vaults"> {
  static readonly resourceType = "Microsoft.KeyVault/vaults" as const;
  static readonly apiVersion = "2024-11-01";
  protected static namingRules = kvRules;

  constructor(context: ProvisioningComponent, props: AutoNamedProps = {}) {
    super(context, {
      type: VaultResource.resourceType,
      apiVersion: VaultResource.apiVersion,
      name: props.name,
      location: props.location,
    });
  }
}

class VNetResource extends Resource<"Microsoft.Network/virtualNetworks"> {
  static readonly resourceType = "Microsoft.Network/virtualNetworks" as const;
  static readonly apiVersion = "2024-01-01";
  protected static namingRules = vnetRules;

  constructor(context: ProvisioningComponent, props: AutoNamedProps = {}) {
    super(context, {
      type: VNetResource.resourceType,
      apiVersion: VNetResource.apiVersion,
      name: props.name,
      location: props.location,
    });
  }
}

class CustomResource extends Resource<"Contoso.Test/resources"> {
  static readonly resourceType = "Contoso.Test/resources" as const;
  static readonly apiVersion = "2024-01-01";
  protected static namingRules = customRules;

  constructor(context: ProvisioningComponent, props: AutoNamedProps = {}) {
    super(context, {
      type: CustomResource.resourceType,
      apiVersion: CustomResource.apiVersion,
      name: props.name,
      location: props.location,
    });
  }
}

function allBicepText(stack: Stack): string {
  const files = renderBicepFiles(stack);
  return files.map((f) => f.contents).join("\n---\n");
}

describe("naming policy", () => {
  it("generates names without hyphens for restrictive resources", () => {
    const stack = new Stack("myApp", {
      targetScope: "subscription",
      namingPolicy: new DefaultNamingPolicy({
        workload: "contoso",
        environment: "prod",
      }),
    });
    const rg = new ResourceGroup(stack, { location: "eastus" });
    new StorageAccountResource(rg);

    const text = allBicepText(stack);

    expect(text).toContain("'stcontosopr${uniqueString(subscription().subscriptionId)}'");
    expect(text).not.toContain("'st-contoso-prod'");
  });

  it("generates names with hyphens when allowed", () => {
    const stack = new Stack("myApp", {
      targetScope: "subscription",
      namingPolicy: new DefaultNamingPolicy({
        workload: "contoso",
        environment: "prod",
      }),
    });
    const rg = new ResourceGroup(stack, { location: "eastus" });
    new VaultResource(rg);

    const text = allBicepText(stack);

    expect(text).toContain("'kv-contoso-${uniqueString(subscription().subscriptionId)}'");
  });

  it("preserves case when allowed and lowercases restrictive names", () => {
    const stack = new Stack("myApp", {
      targetScope: "subscription",
      namingPolicy: new DefaultNamingPolicy({ workload: "MyApp" }),
    });
    const rg = new ResourceGroup(stack, { location: "eastus" });
    new VaultResource(rg);
    new StorageAccountResource(rg);

    const text = allBicepText(stack);
    expect(text).toContain("'kv-MyApp-${uniqueString(subscription().subscriptionId)}'");
    expect(text).toContain("'stmyapp${uniqueString(subscription().subscriptionId)}'");
  });

  it("generates RG-scoped names without uniqueString suffix", () => {
    const stack = new Stack("myApp", {
      targetScope: "subscription",
      namingPolicy: new DefaultNamingPolicy({
        workload: "contoso",
        environment: "prod",
      }),
    });
    new ResourceGroup(stack, { location: "eastus" });

    const text = allBicepText(stack);

    expect(text).toContain("name: 'rg-contoso-prod'");
  });

  it("uses explicit name as-is even when naming policy is active", () => {
    const stack = new Stack("myApp", {
      targetScope: "subscription",
      namingPolicy: new DefaultNamingPolicy({
        workload: "contoso",
        environment: "prod",
      }),
    });
    const rg = new ResourceGroup(stack, { location: "eastus" });
    new StorageAccountResource(rg, { name: "logs" });

    const text = allBicepText(stack);

    // Explicit name should be used as-is, not transformed by the naming policy
    expect(text).toContain("'logs'");
  });

  it("disambiguates same-type resources with ordinals", () => {
    const stack = new Stack("myApp", {
      targetScope: "subscription",
      namingPolicy: new DefaultNamingPolicy({
        workload: "contoso",
        environment: "prod",
      }),
    });
    const rg = new ResourceGroup(stack, { location: "eastus" });
    new StorageAccountResource(rg);
    new StorageAccountResource(rg);

    const text = allBicepText(stack);

    expect(text).toContain("'stcontosop2${uniqueString(subscription().subscriptionId)}'");
  });

  it("defaults to stack name as workload", () => {
    const stack = new Stack("myApp", {
      targetScope: "subscription",
    });
    const rg = new ResourceGroup(stack, { location: "eastus" });
    new StorageAccountResource(rg);

    const text = allBicepText(stack);

    expect(text).toContain("'stmyapp${uniqueString(subscription().subscriptionId)}'");
  });

  it("requires name when namingPolicy: namingRequiredPolicy", () => {
    const stack = new Stack("myApp", {
      targetScope: "subscription",
      namingPolicy: namingRequiredPolicy,
    });

    expect(() =>
      resource(stack, {
        type: "Contoso.Test/resources",
        apiVersion: "2024-01-01",
      }),
    ).toThrow("requires an explicit 'name'");
  });

  it("uses name verbatim when namingPolicy: namingRequiredPolicy", () => {
    const stack = new Stack("myApp", {
      targetScope: "subscription",
      namingPolicy: namingRequiredPolicy,
    });

    resource(stack, {
      name: "my-exact-name",
      type: "Contoso.Test/resources",
      apiVersion: "2024-01-01",
      location: "eastus",
    });

    const text = allBicepText(stack);
    expect(text).toContain("name: 'my-exact-name'");
  });

  it("uses a convention without inventing constraints when no namingRules are provided", () => {
    const stack = new Stack("myApp", {
      targetScope: "subscription",
      namingPolicy: new DefaultNamingPolicy({ workload: "contoso" }),
    });

    resource(stack, {
      type: "Unknown.Provider/resources",
      apiVersion: "2024-01-01",
      location: "eastus",
    });

    const text = allBicepText(stack);

    expect(text).toContain("'contoso${uniqueString(subscription().subscriptionId)}'");
  });

  it("supports custom naming policy", () => {
    const stack = new Stack("myApp", {
      targetScope: "subscription",
      namingPolicy: {
        generateName({ rules, label }) {
          return `custom-${rules.abbreviation}-${label ?? "default"}`;
        },
      },
    });

    new CustomResource(stack, { location: "eastus" });

    const text = allBicepText(stack);
    expect(text).toContain("name: 'custom-ct-default'");
  });

  it("includes region segment when specified", () => {
    const stack = new Stack("myApp", {
      targetScope: "subscription",
      namingPolicy: new DefaultNamingPolicy({
        workload: "contoso",
        environment: "prod",
        region: "eus",
      }),
    });
    new ResourceGroup(stack, { location: "eastus" });

    const text = allBicepText(stack);
    expect(text).toContain("'rg-contoso-prod-eus'");
  });

  it("generates plain string for RG-scoped resources", () => {
    const stack = new Stack("myApp", {
      targetScope: "resourceGroup",
      namingPolicy: new DefaultNamingPolicy({
        workload: "contoso",
        environment: "prod",
      }),
    });

    new VNetResource(stack, { location: "eastus" });

    const text = allBicepText(stack);
    expect(text).toContain("name: 'vnet-contoso-prod'");
  });

  // Azure/azure-sdk-for-js#39825 Copilot review PRRT_kwDOBnSy6c6eW0FA:
  // "These user-controlled segments are joined without removing characters forbidden by context.rules. For example, a workload of \"my-app\" still puts a hyphen into a resource whose rules set hyphens: false, so auto-naming can emit an invalid Azure resource name. Sanitize every segment according to all validCharacters flags before composing it."
  it("removes characters forbidden by the resource naming rules", () => {
    const stack = new Stack("myApp", {
      targetScope: "resourceGroup",
      namingPolicy: new DefaultNamingPolicy({ workload: "my-app_name.test!" }),
    });
    new StorageAccountResource(stack);

    const text = allBicepText(stack);
    expect(text).toContain("'stmyappname${uniqueString(subscription().subscriptionId)}'");
    expect(text).not.toContain("my-app_name.test!");
  });

  // Azure/azure-sdk-for-js#39825 Copilot review PRRT_kwDOBnSy6c6eW0FG:
  // "Truncating after appending uniqueString() can remove the uniqueness suffix (and the ordinal immediately before it) when the base is long. Multiple globally scoped resources can then receive the same first maxLength characters. Reserve space for the fixed-length suffix/ordinal and truncate only the workload portion before concatenation."
  // Azure/azure-sdk-for-js#39825 Copilot review PRRT_kwDOBnSy6c6kZZ7E:
  // "The ordinal is appended at the end and then truncated with the rest of the base. When the base already reaches maxLength, the first and second resource of the same type truncate to the identical name because the second resource's ordinal is removed. Reserve suffix space before truncating the base."
  it("preserves uniqueness and ordinal suffixes for long global names", () => {
    const stack = new Stack("myApp", {
      targetScope: "resourceGroup",
      namingPolicy: new DefaultNamingPolicy({
        workload: "very-long-workload-name",
      }),
    });
    new StorageAccountResource(stack);
    new StorageAccountResource(stack);

    const text = allBicepText(stack);
    expect(text).toContain("'stverylongw${uniqueString(subscription().subscriptionId)}'");
    expect(text).toContain("'stverylong2${uniqueString(subscription().subscriptionId)}'");
  });
});
