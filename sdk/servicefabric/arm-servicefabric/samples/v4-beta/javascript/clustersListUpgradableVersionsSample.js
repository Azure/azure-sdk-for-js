// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceFabricManagementClient } = require("@azure/arm-servicefabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to if a target is not provided, it will get the minimum and maximum versions available from the current cluster version. If a target is given, it will provide the required path to get from the current cluster version to the target version.
 *
 * @summary if a target is not provided, it will get the minimum and maximum versions available from the current cluster version. If a target is given, it will provide the required path to get from the current cluster version to the target version.
 * x-ms-original-file: 2026-03-01-preview/ListUpgradableVersionsMinMax_example.json
 */
async function getMinimumAndMaximumCodeVersions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagementClient(credential, subscriptionId);
  const result = await client.clusters.listUpgradableVersions("resRg", "myCluster");
  console.log(result);
}

/**
 * This sample demonstrates how to if a target is not provided, it will get the minimum and maximum versions available from the current cluster version. If a target is given, it will provide the required path to get from the current cluster version to the target version.
 *
 * @summary if a target is not provided, it will get the minimum and maximum versions available from the current cluster version. If a target is given, it will provide the required path to get from the current cluster version to the target version.
 * x-ms-original-file: 2026-03-01-preview/ListUpgradableVersionsPath_example.json
 */
async function getUpgradePath() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagementClient(credential, subscriptionId);
  const result = await client.clusters.listUpgradableVersions("resRg", "myCluster", {
    versionsDescription: { targetVersion: "7.2.432.9590" },
  });
  console.log(result);
}

async function main() {
  await getMinimumAndMaximumCodeVersions();
  await getUpgradePath();
}

main().catch(console.error);
