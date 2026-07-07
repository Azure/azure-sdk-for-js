// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a commit.
 *
 * @summary creates or updates a commit.
 * x-ms-original-file: 2025-07-01/NetworkManagerCommitPut.json
 */
async function createOrUpdateNetworkManagerCommit() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.commits.createOrUpdate(
    "myResourceGroup",
    "testNetworkManager",
    "myTestCommit",
    {
      properties: {
        description: "Sample Commit",
        targetLocations: ["useast"],
        configurationIds: [
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resoureGroupSample/providers/Microsoft.Network/networkManagers/testNetworkManager/securityAdminConfigurations/SampleSecurityAdminConfig",
        ],
        commitType: "SecurityAdmin",
        forceUpdateTag: "00000000-0000-0000-0000-000000000000",
      },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateNetworkManagerCommit();
}

main().catch(console.error);
