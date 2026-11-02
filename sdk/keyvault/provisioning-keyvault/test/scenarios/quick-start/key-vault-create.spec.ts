// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { type Expression, type Stack } from "@azure/provisioning-core";
import { KeyVault, Secret } from "@azure/provisioning-keyvault";
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
 * Primary resource type: Microsoft.KeyVault/vaults
 * Primary schema key: Microsoft.KeyVault/vaults
 * Also covers: Microsoft.KeyVault/vaults/secrets
 * Scenario: Azure quickstart key-vault-create
 * provisioning API: KeyVault, Secret
 * Source: https://github.com/Azure/azure-quickstart-templates/tree/1748b1857bc03d505d9b1cab03df56e5e0bf1a25/quickstarts/microsoft.keyvault/key-vault-create
 * Runtime baseline: key-vault-create.test.baseline.*
 * Gap/reduction: tenant().tenantId and resourceGroup().location are represented by deterministic parameters/values.
 */
describe("quickstart key vault create", () => {
  it("renders the quickstart Bicep sample", () => {
    const stack = createResourceGroupStack();
    const keyVaultName = stack.parameters.add("keyVaultName", "string", {
      description: "Specifies the name of the key vault.",
    });
    const location = stack.parameters.add("location", "string", {
      defaultValue: "eastus",
      description: "Specifies the Azure location where the key vault should be created.",
    });
    const secretName = stack.parameters.add("secretName", "string", {
      description: "Specifies the name of the secret that you want to create.",
    });
    const secretValue = stack.parameters.add("secretValue", "string", {
      secure: true,
      description: "Specifies the value of the secret that you want to create.",
    });
    const vault = new KeyVault(stack, {
      name: keyVaultName,
      location,
      properties: {
        tenantId: "11111111-1111-1111-1111-111111111111",
        sku: {
          family: "A",
          name: "standard",
        },
        enabledForDeployment: false,
        enabledForDiskEncryption: false,
        enabledForTemplateDeployment: false,
        enableRbacAuthorization: true,
        enableSoftDelete: true,
        softDeleteRetentionInDays: 90,
        enablePurgeProtection: true,
        networkAcls: {
          defaultAction: "Allow",
          bypass: "AzureServices",
        },
      },
    });
    new Secret(vault, {
      name: secretName,
      properties: {
        value: secretValue,
      },
    });
    addCoreOutputs(stack, vault);
    stack.outputs.add("location", "string", location);
    stack.outputs.add("resourceGroupName", "string", "rg-cdk-package-test");

    const rendered = renderStackArtifacts(stack);
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
