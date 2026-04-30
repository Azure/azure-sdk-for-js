// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Post a Network Manager Commit.
 *
 * @summary Post a Network Manager Commit.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkManagerCommitPost.json
 */
async function networkManageCommitPost() {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "resoureGroupSample";
  const networkManagerName = "testNetworkManager";
  const parameters = {
    commitType: "SecurityAdmin",
    configurationIds: [
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resoureGroupSample/providers/Microsoft.Network/networkManagers/testNetworkManager/securityAdminConfigurations/SampleSecurityAdminConfig",
    ],
    targetLocations: ["useast"],
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkManagerCommits.beginPostAndWait(
    resourceGroupName,
    networkManagerName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await networkManageCommitPost();
}

main().catch(console.error);
