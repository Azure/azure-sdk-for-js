// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all of the available Storage Rest API operations.
 *
 * @summary lists all of the available Storage Rest API operations.
 * x-ms-original-file: 2026-04-01/OperationsList.json
 */
async function operationsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential);
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
