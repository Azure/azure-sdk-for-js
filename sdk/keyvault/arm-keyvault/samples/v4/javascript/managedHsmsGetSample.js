// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KeyVaultManagementClient } = require("@azure/arm-keyvault");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified managed HSM Pool.
 *
 * @summary gets the specified managed HSM Pool.
 * x-ms-original-file: 2025-05-01/ManagedHsm_Get.json
 */
async function retrieveAManagedHSMPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.managedHsms.get("hsm-group", "hsm1");
  console.log(result);
}

async function main() {
  await retrieveAManagedHSMPool();
}

main().catch(console.error);
