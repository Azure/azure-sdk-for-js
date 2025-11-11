// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KeyVaultManagementClient } = require("@azure/arm-keyvault");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Permanently deletes the specified managed HSM.
 *
 * @summary Permanently deletes the specified managed HSM.
 * x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2025-05-01/examples/DeletedManagedHsm_Purge.json
 */
async function purgeAManagedHsmPool() {
  const subscriptionId =
    process.env["KEYVAULT_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const location = "westus";
  const name = "hsm1";
  const credential = new DefaultAzureCredential();
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.managedHsms.beginPurgeDeletedAndWait(location, name);
  console.log(result);
}

async function main() {
  await purgeAManagedHsmPool();
}

main().catch(console.error);
