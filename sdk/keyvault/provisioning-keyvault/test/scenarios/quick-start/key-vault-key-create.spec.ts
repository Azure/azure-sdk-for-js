// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { type Expression, type Stack } from "@azure/provisioning-core";
import { KeyVault, VaultKey } from "@azure/provisioning-keyvault";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  expectRenderedOutputsToMatchBaselines,
  renderStackArtifacts,
} from "../../utils/index.js";

function addCoreOutputs(
  stack: Stack,
  resource: { name: Expression<string>; id: Expression<string> },
) {
  stack.outputs.add("name", "string", resource.name);
  stack.outputs.add("resourceId", "string", resource.id);
}

/*
 * Primary resource type: Microsoft.KeyVault/vaults/keys
 * Primary schema key: Microsoft.KeyVault/vaults/keys
 * Also covers: Microsoft.KeyVault/vaults
 * Scenario: Azure quickstart key-vault-key-create
 * provisioning API: KeyVault, VaultKey
 * Source: https://github.com/Azure/azure-quickstart-templates/tree/1748b1857bc03d505d9b1cab03df56e5e0bf1a25/quickstarts/microsoft.keyvault/key-vault-key-create
 * Runtime baseline: key-vault-key-create.test.baseline.*
 * Gap/reduction: empty keyOps parameter is represented as an empty array baseline.
 */
describe("quickstart key vault key create", () => {
  it("renders the quickstart Bicep sample", () => {
    const stack = createResourceGroupStack();
    const vaultName = stack.parameters.add("vaultName", "string", {
      description: "The name of the key vault to be created.",
    });
    const keyName = stack.parameters.add("keyName", "string", {
      description: "The name of the key to be created.",
    });
    const location = stack.parameters.add("location", "string", {
      defaultValue: "eastus",
      description: "The location of the resources.",
    });
    const skuName = stack.parameters.add("skuName", "string", {
      allowed: ["standard", "premium"] as const,
      defaultValue: "standard",
      description: "The SKU of the vault to be created.",
    });
    const keyType = stack.parameters.add("keyType", "string", {
      allowed: ["EC", "EC-HSM", "RSA", "RSA-HSM"] as const,
      defaultValue: "RSA",
      description: "The JsonWebKeyType of the key to be created.",
    });
    const keySize = stack.parameters.add("keySize", "int", {
      defaultValue: 2048,
      description: "The size in bits of the key to be created.",
    });
    const vault = new KeyVault(stack, {
      name: vaultName,
      location,
      properties: {
        tenantId: "11111111-1111-1111-1111-111111111111",
        sku: {
          family: "A",
          name: skuName,
        },
        enableRbacAuthorization: true,
        enableSoftDelete: true,
        softDeleteRetentionInDays: 90,
        enablePurgeProtection: true,
        enabledForDeployment: false,
        enabledForDiskEncryption: false,
        enabledForTemplateDeployment: false,
        networkAcls: {
          defaultAction: "Allow",
          bypass: "AzureServices",
        },
      },
    });
    const key = new VaultKey(vault, {
      name: keyName,
      properties: {
        kty: keyType,
        keySize,
        keyOps: [],
      },
    });
    stack.outputs.add("proxyKey", "object", key.properties);
    stack.outputs.add("location", "string", location);
    addCoreOutputs(stack, vault);
    stack.outputs.add("resourceGroupName", "string", "rg-cdk-package-test");

    const rendered = renderStackArtifacts(stack);
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
