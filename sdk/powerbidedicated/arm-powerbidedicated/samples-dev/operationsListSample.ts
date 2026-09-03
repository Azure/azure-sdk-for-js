// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PowerBIDedicated } from "@azure/arm-powerbidedicated";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list the operations for the provider
 *
 * @summary list the operations for the provider
 * x-ms-original-file: 2021-01-01/operations.json
 */
async function listOperations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PowerBIDedicated(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listOperations();
}

main().catch(console.error);
