// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyVaultManagementClient } from "@azure/arm-keyvault";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list the operations for the provider
 *
 * @summary list the operations for the provider
 * x-ms-original-file: 2026-02-01/listOperations.json
 */
async function listsAvailableRestAPIOperations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new KeyVaultManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listsAvailableRestAPIOperations();
}

main().catch(console.error);
