// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets information about the Batch accounts associated with the specified resource group.
 *
 * @summary Gets information about the Batch accounts associated with the specified resource group.
 * x-ms-original-file: specification/batch/resource-manager/Microsoft.Batch/stable/2024-07-01/examples/BatchAccountListByResourceGroup.json
 */

import { BatchManagementClient } from "@azure/arm-batch";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function batchAccountListByResourceGroup(): Promise<void> {
  const subscriptionId = process.env["BATCH_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["BATCH_RESOURCE_GROUP"] || "default-azurebatch-japaneast";
  const credential = new DefaultAzureCredential();
  const client = new BatchManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.batchAccountOperations.listByResourceGroup(resourceGroupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await batchAccountListByResourceGroup();
}

main().catch(console.error);
