// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KeyVaultManagementClient } = require("@azure/arm-keyvault");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a managed HSM Pool in the specified subscription.
 *
 * @summary create or update a managed HSM Pool in the specified subscription.
 * x-ms-original-file: 2025-05-01/ManagedHsm_CreateOrUpdate.json
 */
async function createANewManagedHSMPoolOrUpdateAnExistingManagedHSMPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.managedHsms.createOrUpdate("hsm-group", "hsm1", {
    location: "westus",
    properties: {
      enablePurgeProtection: false,
      enableSoftDelete: true,
      initialAdminObjectIds: ["00000000-0000-0000-0000-000000000000"],
      softDeleteRetentionInDays: 90,
      tenantId: "00000000-0000-0000-0000-000000000000",
    },
    sku: { name: "Standard_B1", family: "B" },
    tags: { Dept: "hsm", Environment: "dogfood" },
  });
  console.log(result);
}

async function main() {
  await createANewManagedHSMPoolOrUpdateAnExistingManagedHSMPool();
}

main().catch(console.error);
