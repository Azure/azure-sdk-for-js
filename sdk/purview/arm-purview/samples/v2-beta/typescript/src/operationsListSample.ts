// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PurviewManagementClient } from "@azure/arm-purview";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list of available operations
 *
 * @summary list of available operations
 * x-ms-original-file: 2024-04-01-preview/Operations_List.json
 */
async function operationsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PurviewManagementClient(credential);
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
