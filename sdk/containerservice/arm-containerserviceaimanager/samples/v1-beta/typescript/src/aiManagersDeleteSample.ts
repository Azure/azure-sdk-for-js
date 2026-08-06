// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerserviceaimanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a AIManager
 *
 * @summary delete a AIManager
 * x-ms-original-file: 2026-05-02-preview/AIManagers_Delete.json
 */
async function deletesAnAIManagerResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  await client.aiManagers.delete("rg1", "aimanager1");
}

async function main(): Promise<void> {
  await deletesAnAIManagerResource();
}

main().catch(console.error);
