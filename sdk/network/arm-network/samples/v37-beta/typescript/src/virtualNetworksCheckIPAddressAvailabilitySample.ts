// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checks whether a private IP address is available for use.
 *
 * @summary checks whether a private IP address is available for use.
 * x-ms-original-file: 2025-05-01/VirtualNetworkCheckIPAddressAvailability.json
 */
async function checkIPAddressAvailability(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworks.checkIPAddressAvailability(
    "rg1",
    "test-vnet",
    "10.0.1.4",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await checkIPAddressAvailability();
}

main().catch(console.error);
