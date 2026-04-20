// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedServiceIdentityClient } from "@azure/arm-msi";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list the operations for the provider
 *
 * @summary list the operations for the provider
 * x-ms-original-file: 2025-05-31-preview/MsiOperationsList.json
 */
async function msiOperationsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ManagedServiceIdentityClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await msiOperationsList();
}

main().catch(console.error);
