// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudClient } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get properties of the provided cloud services network.
 *
 * @summary get properties of the provided cloud services network.
 * x-ms-original-file: 2026-05-01-preview/CloudServicesNetworks_Get.json
 */
async function getCloudServicesNetwork(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.cloudServicesNetworks.get(
    "resourceGroupName",
    "cloudServicesNetworkName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getCloudServicesNetwork();
}

main().catch(console.error);
