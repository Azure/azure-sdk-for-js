// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deploy the cluster using the rack configuration provided during creation.
 *
 * @summary Deploy the cluster using the rack configuration provided during creation.
 * x-ms-original-file: specification/networkcloud/resource-manager/Microsoft.NetworkCloud/stable/2025-02-01/examples/Clusters_Deploy.json
 */

import {
  ClusterDeployParameters,
  ClustersDeployOptionalParams,
  NetworkCloud,
} from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deployCluster(): Promise<void> {
  const subscriptionId =
    process.env["NETWORKCLOUD_SUBSCRIPTION_ID"] ||
    "123e4567-e89b-12d3-a456-426655440000";
  const resourceGroupName =
    process.env["NETWORKCLOUD_RESOURCE_GROUP"] || "resourceGroupName";
  const clusterName = "clusterName";
  const clusterDeployParameters: ClusterDeployParameters = {};
  const options: ClustersDeployOptionalParams = { clusterDeployParameters };
  const credential = new DefaultAzureCredential();
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.clusters.beginDeployAndWait(
    resourceGroupName,
    clusterName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Deploy the cluster using the rack configuration provided during creation.
 *
 * @summary Deploy the cluster using the rack configuration provided during creation.
 * x-ms-original-file: specification/networkcloud/resource-manager/Microsoft.NetworkCloud/stable/2025-02-01/examples/Clusters_Deploy_SkipValidation.json
 */
async function deployClusterSkippingValidation(): Promise<void> {
  const subscriptionId =
    process.env["NETWORKCLOUD_SUBSCRIPTION_ID"] ||
    "123e4567-e89b-12d3-a456-426655440000";
  const resourceGroupName =
    process.env["NETWORKCLOUD_RESOURCE_GROUP"] || "resourceGroupName";
  const clusterName = "clusterName";
  const clusterDeployParameters: ClusterDeployParameters = {
    skipValidationsForMachines: ["bmmName1"],
  };
  const options: ClustersDeployOptionalParams = { clusterDeployParameters };
  const credential = new DefaultAzureCredential();
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.clusters.beginDeployAndWait(
    resourceGroupName,
    clusterName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deployCluster();
  await deployClusterSkippingValidation();
}

main().catch(console.error);
