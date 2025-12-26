// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list CloudVmCluster resources by resource group
 *
 * @summary list CloudVmCluster resources by resource group
 * x-ms-original-file: 2025-09-01/CloudVmClusters_ListByResourceGroup_MaximumSet_Gen.json
 */
async function listVMClustersByResourceGroupGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.cloudVmClusters.listByResourceGroup("rgopenapi")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list CloudVmCluster resources by resource group
 *
 * @summary list CloudVmCluster resources by resource group
 * x-ms-original-file: 2025-09-01/CloudVmClusters_ListByResourceGroup_MinimumSet_Gen.json
 */
async function listVMClustersByResourceGroupGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.cloudVmClusters.listByResourceGroup("rgopenapi")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list CloudVmCluster resources by resource group
 *
 * @summary list CloudVmCluster resources by resource group
 * x-ms-original-file: 2025-09-01/vmClusters_listByResourceGroup.json
 */
async function cloudVmClustersListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.cloudVmClusters.listByResourceGroup("rg000")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listVMClustersByResourceGroupGeneratedByMaximumSetRule();
  await listVMClustersByResourceGroupGeneratedByMinimumSetRule();
  await cloudVmClustersListByResourceGroup();
}

main().catch(console.error);
