// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloudClient } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get baseboard management controller key set of the provided cluster.
 *
 * @summary get baseboard management controller key set of the provided cluster.
 * x-ms-original-file: 2026-05-01-preview/BmcKeySets_Get.json
 */
async function getBaseboardManagementControllerKeySetOfCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.bmcKeySets.get("resourceGroupName", "clusterName", "bmcKeySetName");
  console.log(result);
}

async function main() {
  await getBaseboardManagementControllerKeySetOfCluster();
}

main().catch(console.error);
