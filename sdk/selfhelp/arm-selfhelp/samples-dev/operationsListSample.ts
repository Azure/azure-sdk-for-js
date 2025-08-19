// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HelpRP } from "@azure/arm-selfhelp";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Returns list of operations.
 *
 * @summary Returns list of operations.
 * x-ms-original-file: specification/help/resource-manager/Microsoft.Help/preview/2024-03-01-preview/examples/ListOperations.json
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
