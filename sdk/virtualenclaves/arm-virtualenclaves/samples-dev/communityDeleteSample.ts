// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MissionClient } from "@azure/arm-virtualenclaves";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a CommunityResource
 *
 * @summary delete a CommunityResource
 * x-ms-original-file: 2025-05-01-preview/Community_Delete.json
 */
async function communityDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CA1CB369-DD26-4DB2-9D43-9AFEF0F22093";
  const client = new MissionClient(credential, subscriptionId);
  await client.community.delete("rgopenapi", "TestMyCommunity");
}

async function main(): Promise<void> {
  await communityDelete();
}

main().catch(console.error);
