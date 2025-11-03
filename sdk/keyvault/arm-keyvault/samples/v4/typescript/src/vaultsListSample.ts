// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyVaultManagementClient } from "@azure/arm-keyvault";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the List operation gets information about the vaults associated with the subscription.
 *
 * @summary the List operation gets information about the vaults associated with the subscription.
 * x-ms-original-file: 2025-05-01/listVault.json
 */
async function listVaultsInTheSpecifiedSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.vaults.list({ top: 1 })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listVaultsInTheSpecifiedSubscription();
}

main().catch(console.error);
