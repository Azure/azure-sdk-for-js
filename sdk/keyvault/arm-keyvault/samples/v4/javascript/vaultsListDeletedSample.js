// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KeyVaultManagementClient } = require("@azure/arm-keyvault");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about the deleted vaults in a subscription.
 *
 * @summary gets information about the deleted vaults in a subscription.
 * x-ms-original-file: 2025-05-01/listDeletedVaults.json
 */
async function listDeletedVaultsInTheSpecifiedSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.vaults.listDeleted()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listDeletedVaultsInTheSpecifiedSubscription();
}

main().catch(console.error);
