// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SearchManagementClient } from "@azure/arm-search";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all of the available REST API operations of the Microsoft.Search provider.
 *
 * @summary lists all of the available REST API operations of the Microsoft.Search provider.
 * x-ms-original-file: 2026-03-01-preview/SearchListOperations.json
 */
async function searchListOperations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SearchManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await searchListOperations();
}

main().catch(console.error);
