// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BatchManagementClient } from "@azure/arm-batch";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about the Batch accounts associated with the specified resource group.
 *
 * @summary gets information about the Batch accounts associated with the specified resource group.
 * x-ms-original-file: 2025-06-01/BatchAccountListByResourceGroup.json
 */
async function batchAccountListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.batchAccount.listByResourceGroup(
    "default-azurebatch-japaneast",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await batchAccountListByResourceGroup();
}

main().catch(console.error);
