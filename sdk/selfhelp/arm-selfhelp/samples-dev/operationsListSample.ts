// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HelpRP } from "@azure/arm-selfhelp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list the operations for the provider
 *
 * @summary list the operations for the provider
 * x-ms-original-file: 2024-03-01-preview/ListOperations.json
 */
async function listAllOperations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new HelpRP(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllOperations();
}

main().catch(console.error);
