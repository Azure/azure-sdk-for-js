// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMapsManagementClient } from "@azure/arm-maps";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Maps Account.
 *
 * @summary delete a Maps Account.
 * x-ms-original-file: 2025-10-01-preview/DeleteAccount.json
 */
async function deleteAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "21a9967a-e8a9-4656-a70b-96ff1c4d05a0";
  const client = new AzureMapsManagementClient(credential, subscriptionId);
  await client.accounts.delete("myResourceGroup", "myMapsAccount");
}

async function main(): Promise<void> {
  await deleteAccount();
}

main().catch(console.error);
