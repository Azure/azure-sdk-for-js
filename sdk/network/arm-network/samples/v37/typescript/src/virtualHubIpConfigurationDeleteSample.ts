// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a VirtualHubIpConfiguration.
 *
 * @summary deletes a VirtualHubIpConfiguration.
 * x-ms-original-file: 2025-05-01/VirtualHubIpConfigurationDelete.json
 */
async function virtualHubIpConfigurationDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.virtualHubIpConfiguration.delete("rg1", "hub1", "ipconfig1");
}

async function main(): Promise<void> {
  await virtualHubIpConfigurationDelete();
}

main().catch(console.error);
