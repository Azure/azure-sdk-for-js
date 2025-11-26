// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyVaultManagementClient } from "@azure/arm-keyvault";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to The List operation gets information about the deleted managed HSMs associated with the subscription.
 *
 * @summary The List operation gets information about the deleted managed HSMs associated with the subscription.
 * x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2025-05-01/examples/DeletedManagedHsm_List.json
 */
async function listDeletedManagedHsMSInTheSpecifiedSubscription(): Promise<void> {
  const subscriptionId =
    process.env["KEYVAULT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedHsms.listDeleted()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listDeletedManagedHsMSInTheSpecifiedSubscription();
}

main().catch(console.error);
