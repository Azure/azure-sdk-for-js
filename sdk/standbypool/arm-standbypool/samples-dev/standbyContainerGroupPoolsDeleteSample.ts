// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StandbyPoolManagementClient } from "@azure/arm-standbypool";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a StandbyContainerGroupPoolResource
 *
 * @summary delete a StandbyContainerGroupPoolResource
 * x-ms-original-file: 2025-03-01/StandbyContainerGroupPools_Delete.json
 */
async function standbyContainerGroupPoolsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000009";
  const client = new StandbyPoolManagementClient(credential, subscriptionId);
  await client.standbyContainerGroupPools.delete("rgstandbypool", "pool");
}

async function main(): Promise<void> {
  await standbyContainerGroupPoolsDelete();
}

main().catch(console.error);
