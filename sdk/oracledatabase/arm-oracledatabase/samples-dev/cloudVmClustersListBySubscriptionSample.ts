// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list CloudVmCluster resources by subscription ID
 *
 * @summary list CloudVmCluster resources by subscription ID
 * x-ms-original-file: 2025-09-01/CloudVmClusters_ListBySubscription_MaximumSet_Gen.json
 */
async function listVMClustersBySubscriptionGeneratedByMaximumSetRule(): Promise<void> {
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
async function listVMClustersBySubscriptionGeneratedByMinimumSetRule(): Promise<void> {
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
async function cloudVmClustersListBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.cloudVmClusters.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listVMClustersBySubscriptionGeneratedByMaximumSetRule();
  await listVMClustersBySubscriptionGeneratedByMinimumSetRule();
  await cloudVmClustersListBySubscription();
}

main().catch(console.error);
