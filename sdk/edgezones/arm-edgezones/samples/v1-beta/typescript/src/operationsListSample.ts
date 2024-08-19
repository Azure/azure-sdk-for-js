// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EdgeZonesClient } from "@azure/arm-edgezones";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list the operations for the provider
 *
 * @summary list the operations for the provider
 * x-ms-original-file: 2024-04-01-preview/Operations_List.json
 */
async function listOperations(): void {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new EdgeZonesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  listOperations();
}

main().catch(console.error);
