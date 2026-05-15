// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to post a Network Manager Commit.
 *
 * @summary post a Network Manager Commit.
 * x-ms-original-file: 2025-05-01/NetworkManagerCommitPost.json
 */
async function networkManageCommitPost(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkManagerCommits.post(
    "resoureGroupSample",
    "testNetworkManager",
    {
      commitType: "SecurityAdmin",
      configurationIds: [
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resoureGroupSample/providers/Microsoft.Network/networkManagers/testNetworkManager/securityAdminConfigurations/SampleSecurityAdminConfig",
      ],
      targetLocations: ["useast"],
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkManageCommitPost();
}

main().catch(console.error);
