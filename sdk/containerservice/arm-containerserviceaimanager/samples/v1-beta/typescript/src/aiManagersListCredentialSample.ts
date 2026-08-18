// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerserviceaimanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the credentials of an AI Manager.
 *
 * @summary lists the credentials of an AI Manager.
 * x-ms-original-file: 2026-05-02-preview/AIManagers_ListCredential.json
 */
async function listsTheCredentialsOfAnAIManager(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.aiManagers.listCredential("rg1", "aimanager1");
  console.log(result);
}

async function main(): Promise<void> {
  await listsTheCredentialsOfAnAIManager();
}

main().catch(console.error);
