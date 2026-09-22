// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all of the available Event Hub REST API operations.
 *
 * @summary lists all of the available Event Hub REST API operations.
 * x-ms-original-file: 2026-01-01/EHOperations_List.json
 */
async function ehOperationsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EventHubManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await ehOperationsList();
}

main().catch(console.error);
