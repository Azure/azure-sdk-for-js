// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates a cluster pool.
 *
 * @summary Creates or updates a cluster pool.
 * x-ms-original-file: specification/hdinsight/resource-manager/Microsoft.HDInsight/HDInsightOnAks/preview/2024-05-01-preview/examples/CreateClusterPool.json
 */

import type { ClusterPool } from "@azure/arm-hdinsightcontainers";
import { HDInsightContainersManagementClient } from "@azure/arm-hdinsightcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function clusterPoolPut(): Promise<void> {
  const subscriptionId =
    process.env["HDINSIGHT_SUBSCRIPTION_ID"] || "10e32bab-26da-4cc4-a441-52b318f824e6";
  const resourceGroupName = process.env["HDINSIGHT_RESOURCE_GROUP"] || "hiloResourcegroup";
  const clusterPoolName = "clusterpool1";
  const clusterPool: ClusterPool = {
    location: "West US 2",
    properties: {
      clusterPoolProfile: { clusterPoolVersion: "1.2" },
      computeProfile: {
        availabilityZones: ["1", "2", "3"],
        vmSize: "Standard_D3_v2",
      },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new HDInsightContainersManagementClient(credential, subscriptionId);
  const result = await client.clusterPools.beginCreateOrUpdateAndWait(
    resourceGroupName,
    clusterPoolName,
    clusterPool,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a cluster pool.
 *
 * @summary Creates or updates a cluster pool.
 * x-ms-original-file: specification/hdinsight/resource-manager/Microsoft.HDInsight/HDInsightOnAks/preview/2024-05-01-preview/examples/CreateClusterPoolWithPrivateAks.json
 */
async function clusterPoolPutWithPrivateAks(): Promise<void> {
  const subscriptionId =
    process.env["HDINSIGHT_SUBSCRIPTION_ID"] || "10e32bab-26da-4cc4-a441-52b318f824e6";
  const resourceGroupName = process.env["HDINSIGHT_RESOURCE_GROUP"] || "hiloResourcegroup";
  const clusterPoolName = "clusterpool1";
  const clusterPool: ClusterPool = {
    location: "West US 2",
    properties: {
      clusterPoolProfile: { clusterPoolVersion: "1.2" },
      computeProfile: {
        availabilityZones: ["1", "2", "3"],
        vmSize: "Standard_D3_v2",
      },
      networkProfile: {
        enablePrivateApiServer: true,
        subnetId:
          "/subscriptions/subid/resourceGroups/hiloResourcegroup/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet1",
      },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new HDInsightContainersManagementClient(credential, subscriptionId);
  const result = await client.clusterPools.beginCreateOrUpdateAndWait(
    resourceGroupName,
    clusterPoolName,
    clusterPool,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a cluster pool.
 *
 * @summary Creates or updates a cluster pool.
 * x-ms-original-file: specification/hdinsight/resource-manager/Microsoft.HDInsight/HDInsightOnAks/preview/2024-05-01-preview/examples/CreateClusterPoolWithUDRAks.json
 */
async function clusterPoolPutWithUdrAks(): Promise<void> {
  const subscriptionId =
    process.env["HDINSIGHT_SUBSCRIPTION_ID"] || "10e32bab-26da-4cc4-a441-52b318f824e6";
  const resourceGroupName = process.env["HDINSIGHT_RESOURCE_GROUP"] || "hiloResourcegroup";
  const clusterPoolName = "clusterpool1";
  const clusterPool: ClusterPool = {
    location: "West US 2",
    properties: {
      clusterPoolProfile: { clusterPoolVersion: "1.2" },
      computeProfile: {
        availabilityZones: ["1", "2", "3"],
        vmSize: "Standard_D3_v2",
      },
      networkProfile: {
        outboundType: "userDefinedRouting",
        subnetId:
          "/subscriptions/subid/resourceGroups/hiloResourcegroup/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet1",
      },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new HDInsightContainersManagementClient(credential, subscriptionId);
  const result = await client.clusterPools.beginCreateOrUpdateAndWait(
    resourceGroupName,
    clusterPoolName,
    clusterPool,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await clusterPoolPut();
  await clusterPoolPutWithPrivateAks();
  await clusterPoolPutWithUdrAks();
}

main().catch(console.error);
