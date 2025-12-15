// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list ExadbVmCluster resources by resource group
 *
 * @summary list ExadbVmCluster resources by resource group
 * x-ms-original-file: 2025-09-01/ExadbVmClusters_ListByResourceGroup_MaximumSet_Gen.json
 */
async function exadbVmClustersListByResourceGroupMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.exadbVmClusters.listByResourceGroup("rgopenapi")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list ExadbVmCluster resources by resource group
 *
 * @summary list ExadbVmCluster resources by resource group
 * x-ms-original-file: 2025-09-01/ExadbVmClusters_ListByResourceGroup_MinimumSet_Gen.json
 */
async function exadbVmClustersListByResourceGroupMaximumSetGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.exadbVmClusters.listByResourceGroup("rgopenapi")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await exadbVmClustersListByResourceGroupMaximumSet();
  await exadbVmClustersListByResourceGroupMaximumSetGeneratedByMinimumSetRule();
}

main().catch(console.error);
