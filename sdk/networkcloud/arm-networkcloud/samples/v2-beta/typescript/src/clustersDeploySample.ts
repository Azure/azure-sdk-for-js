// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudClient } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deploy the cluster using the rack configuration provided during creation.
 *
 * @summary deploy the cluster using the rack configuration provided during creation.
 * x-ms-original-file: 2026-05-01-preview/Clusters_Deploy.json
 */
async function deployCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.clusters.deploy("resourceGroupName", "clusterName", {
    clusterDeployParameters: {},
  });
  console.log(result);
}

/**
 * This sample demonstrates how to deploy the cluster using the rack configuration provided during creation.
 *
 * @summary deploy the cluster using the rack configuration provided during creation.
 * x-ms-original-file: 2026-05-01-preview/Clusters_Deploy_SkipValidation.json
 */
async function deployClusterSkippingValidation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.clusters.deploy("resourceGroupName", "clusterName", {
    clusterDeployParameters: { skipValidationsForMachines: ["bmmName1"] },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await deployCluster();
  await deployClusterSkippingValidation();
}

main().catch(console.error);
