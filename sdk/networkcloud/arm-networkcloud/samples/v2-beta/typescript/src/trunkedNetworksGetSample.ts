// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudClient } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get properties of the provided trunked network.
 *
 * @summary get properties of the provided trunked network.
 * x-ms-original-file: 2026-05-01-preview/TrunkedNetworks_Get.json
 */
async function getTrunkedNetwork(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.trunkedNetworks.get("resourceGroupName", "trunkedNetworkName");
  console.log(result);
}

async function main(): Promise<void> {
  await getTrunkedNetwork();
}

main().catch(console.error);
