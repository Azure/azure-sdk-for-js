// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to post to List of Network Manager Deployment Status.
 *
 * @summary post to List of Network Manager Deployment Status.
 * x-ms-original-file: 2025-05-01/NetworkManagerDeploymentStatusList.json
 */
async function networkManagerDeploymentStatusList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkManagerDeploymentStatus.list(
    "resoureGroupSample",
    "testNetworkManager",
    {
      deploymentTypes: ["Connectivity", "AdminPolicy"],
      regions: ["eastus", "westus"],
      skipToken: "FakeSkipTokenCode",
    },
  );
  console.log(result);
}

async function main() {
  await networkManagerDeploymentStatusList();
}

main().catch(console.error);
