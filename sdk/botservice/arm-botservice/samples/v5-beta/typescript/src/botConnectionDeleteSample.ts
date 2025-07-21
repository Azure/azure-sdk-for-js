// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BotServiceClient } from "@azure/arm-botservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a Connection Setting registration for a Bot Service
 *
 * @summary deletes a Connection Setting registration for a Bot Service
 * x-ms-original-file: 2023-09-15-preview/DeleteConnection.json
 */
async function deleteConnectionSetting(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscription-id";
  const client = new BotServiceClient(credential, subscriptionId);
  await client.botConnection.delete("OneResourceGroupName", "samplebotname", "sampleConnection");
}

async function main(): Promise<void> {
  await deleteConnectionSetting();
}

main().catch(console.error);
