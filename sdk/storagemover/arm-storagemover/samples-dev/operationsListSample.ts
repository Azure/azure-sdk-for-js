// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all the supported operations for the Azure Storage Mover REST API.
 *
 * @summary Lists all the supported operations for the Azure Storage Mover REST API.
 * x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/stable/2024-07-01/examples/Operations_List.json
 */

import { StorageMoverClient } from "@azure/arm-storagemover";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function operationsList(): Promise<void> {
  const subscriptionId =
    process.env["STORAGEMOVER_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new StorageMoverClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await operationsList();
}

main().catch(console.error);
