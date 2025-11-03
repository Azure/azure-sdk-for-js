// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyVaultManagementClient } from "@azure/arm-keyvault";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a key vault in the specified subscription.
 *
 * @summary create or update a key vault in the specified subscription.
 * x-ms-original-file: 2025-05-01/createVault.json
 */
async function createANewVaultOrUpdateAnExistingVault(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.vaults.createOrUpdate("sample-resource-group", "sample-vault", {
    location: "westus",
    properties: {
      accessPolicies: [
        {
          objectId: "00000000-0000-0000-0000-000000000000",
          permissions: {
            certificates: [
              "get",
              "list",
              "delete",
              "create",
              "import",
              "update",
              "managecontacts",
              "getissuers",
              "listissuers",
              "setissuers",
              "deleteissuers",
              "manageissuers",
              "recover",
              "purge",
            ],
            keys: [
              "encrypt",
              "decrypt",
              "wrapKey",
              "unwrapKey",
              "sign",
              "verify",
              "get",
              "list",
              "create",
              "update",
              "import",
              "delete",
              "backup",
              "restore",
              "recover",
              "purge",
            ],
            secrets: ["get", "list", "set", "delete", "backup", "restore", "recover", "purge"],
          },
          tenantId: "00000000-0000-0000-0000-000000000000",
        },
      ],
      enabledForDeployment: true,
      enabledForDiskEncryption: true,
      enabledForTemplateDeployment: true,
      publicNetworkAccess: "Enabled",
      sku: { name: "standard", family: "A" },
      tenantId: "00000000-0000-0000-0000-000000000000",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a key vault in the specified subscription.
 *
 * @summary create or update a key vault in the specified subscription.
 * x-ms-original-file: 2025-05-01/createVaultWithNetworkAcls.json
 */
async function createOrUpdateAVaultWithNetworkAcls(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.vaults.createOrUpdate("sample-resource-group", "sample-vault", {
    location: "westus",
    properties: {
      enabledForDeployment: true,
      enabledForDiskEncryption: true,
      enabledForTemplateDeployment: true,
      networkAcls: {
        bypass: "AzureServices",
        defaultAction: "Deny",
        ipRules: [{ value: "124.56.78.91" }, { value: "'10.91.4.0/24'" }],
        virtualNetworkRules: [
          {
            id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/test-vnet/subnets/subnet1",
          },
        ],
      },
      sku: { name: "standard", family: "A" },
      tenantId: "00000000-0000-0000-0000-000000000000",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createANewVaultOrUpdateAnExistingVault();
  await createOrUpdateAVaultWithNetworkAcls();
}

main().catch(console.error);
