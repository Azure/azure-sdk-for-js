// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloud } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get bare metal machine key set of the provided cluster.
 *
 * @summary get bare metal machine key set of the provided cluster.
 * x-ms-original-file: 2026-05-01-preview/BareMetalMachineKeySets_Get.json
 */
async function getBareMetalMachineKeySetOfCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.bareMetalMachineKeySets.get(
    "resourceGroupName",
    "clusterName",
    "bareMetalMachineKeySetName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getBareMetalMachineKeySetOfCluster();
}

main().catch(console.error);
