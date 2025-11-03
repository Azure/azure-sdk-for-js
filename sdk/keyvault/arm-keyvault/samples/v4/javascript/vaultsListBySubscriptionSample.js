// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KeyVaultManagementClient } = require("@azure/arm-keyvault");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the List operation gets information about the vaults associated with the subscription.
 *
 * @summary the List operation gets information about the vaults associated with the subscription.
 * x-ms-original-file: 2025-05-01/listVaultBySubscription.json
 */
async function listVaultsInTheSpecifiedSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.vaults.listBySubscription({ top: 1 })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listVaultsInTheSpecifiedSubscription();
}

main().catch(console.error);
