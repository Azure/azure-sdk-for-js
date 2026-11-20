// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MissionClient } from "@azure/arm-enclave";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to triggers a manual re-sync of community endpoint connections to all configured sync destinations.
 *
 * @summary triggers a manual re-sync of community endpoint connections to all configured sync destinations.
 * x-ms-original-file: 2026-10-01-preview/CommunityEndpoints_Sync.json
 */
async function communityEndpointsSync(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CA1CB369-DD26-4DB2-9D43-9AFEF0F22093";
  const client = new MissionClient(credential, subscriptionId);
  const result = await client.communityEndpoints.sync(
    "rgopenapi",
    "TestMyCommunity",
    "TestMyCommunityEndpoint",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await communityEndpointsSync();
}

main().catch(console.error);
