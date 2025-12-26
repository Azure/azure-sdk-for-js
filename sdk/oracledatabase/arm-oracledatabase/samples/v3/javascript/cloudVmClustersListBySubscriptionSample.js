// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list CloudVmCluster resources by subscription ID
 *
 * @summary list CloudVmCluster resources by subscription ID
 * x-ms-original-file: 2025-09-01/CloudVmClusters_ListBySubscription_MaximumSet_Gen.json
 */
async function listVMClustersBySubscriptionGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.cloudVmClusters.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list CloudVmCluster resources by subscription ID
 *
 * @summary list CloudVmCluster resources by subscription ID
 * x-ms-original-file: 2025-09-01/CloudVmClusters_ListBySubscription_MinimumSet_Gen.json
 */
async function listVMClustersBySubscriptionGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.cloudVmClusters.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list CloudVmCluster resources by subscription ID
 *
 * @summary list CloudVmCluster resources by subscription ID
 * x-ms-original-file: 2025-09-01/vmClusters_listBySubscription.json
 */
async function cloudVmClustersListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.cloudVmClusters.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listVMClustersBySubscriptionGeneratedByMaximumSetRule();
  await listVMClustersBySubscriptionGeneratedByMinimumSetRule();
  await cloudVmClustersListBySubscription();
}

main().catch(console.error);
