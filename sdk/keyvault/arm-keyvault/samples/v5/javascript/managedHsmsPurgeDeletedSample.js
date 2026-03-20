// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KeyVaultManagementClient } = require("@azure/arm-keyvault");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to permanently deletes the specified managed HSM.
 *
 * @summary permanently deletes the specified managed HSM.
 * x-ms-original-file: 2026-02-01/DeletedManagedHsm_Purge.json
 */
async function purgeAManagedHSMPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  await client.managedHsms.purgeDeleted("hsm1", "westus");
}

async function main() {
  await purgeAManagedHSMPool();
}

main().catch(console.error);
