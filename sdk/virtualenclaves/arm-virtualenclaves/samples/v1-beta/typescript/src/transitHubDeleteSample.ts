// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MissionClient } from "@azure/arm-virtualenclaves";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a TransitHubResource
 *
 * @summary delete a TransitHubResource
 * x-ms-original-file: 2025-05-01-preview/TransitHub_Delete.json
 */
async function transitHubDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CA1CB369-DD26-4DB2-9D43-9AFEF0F22093";
  const client = new MissionClient(credential, subscriptionId);
  await client.transitHub.delete("rgopenapi", "TestMyCommunity", "TestThName");
}

async function main(): Promise<void> {
  await transitHubDelete();
}

main().catch(console.error);
