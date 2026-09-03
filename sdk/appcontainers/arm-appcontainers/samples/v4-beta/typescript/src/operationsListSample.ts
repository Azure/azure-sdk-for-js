// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all of the available RP operations.
 *
 * @summary lists all of the available RP operations.
 * x-ms-original-file: 2025-10-02-preview/Operations_List.json
 */
async function listAllOperations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential);
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
