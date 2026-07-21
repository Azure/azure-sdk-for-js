// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeveloperHubServiceClient } from "@azure/arm-devhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns list of operations.
 *
 * @summary returns list of operations.
 * x-ms-original-file: 2025-03-01-preview/Operation_List.json
 */
async function listAvailableOperationsForTheContainerServiceResourceProvider(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new DeveloperHubServiceClient(credential);
  const result = await client.operations.list();
  console.log(result);
}

async function main(): Promise<void> {
  await listAvailableOperationsForTheContainerServiceResourceProvider();
}

main().catch(console.error);
