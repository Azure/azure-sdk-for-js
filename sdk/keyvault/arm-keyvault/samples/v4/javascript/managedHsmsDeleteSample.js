// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KeyVaultManagementClient } = require("@azure/arm-keyvault");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified managed HSM Pool.
 *
 * @summary deletes the specified managed HSM Pool.
 * x-ms-original-file: 2025-05-01/ManagedHsm_Delete.json
 */
async function deleteAManagedHSMPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  await client.managedHsms.delete("hsm-group", "hsm1");
}

async function main() {
  await deleteAManagedHSMPool();
}

main().catch(console.error);
