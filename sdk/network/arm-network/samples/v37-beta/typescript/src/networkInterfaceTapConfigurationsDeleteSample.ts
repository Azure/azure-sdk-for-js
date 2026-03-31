// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified tap configuration from the NetworkInterface.
 *
 * @summary deletes the specified tap configuration from the NetworkInterface.
 * x-ms-original-file: 2025-05-01/NetworkInterfaceTapConfigurationDelete.json
 */
async function deleteTapConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.networkInterfaceTapConfigurations.delete("testrg", "mynic", "tapconfiguration1");
}

async function main(): Promise<void> {
  await deleteTapConfiguration();
}

main().catch(console.error);
