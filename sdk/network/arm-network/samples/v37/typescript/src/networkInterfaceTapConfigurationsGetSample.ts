// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the specified tap configuration on a network interface.
 *
 * @summary get the specified tap configuration on a network interface.
 * x-ms-original-file: 2025-05-01/NetworkInterfaceTapConfigurationGet.json
 */
async function getNetworkInterfaceTapConfigurations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkInterfaceTapConfigurations.get(
    "testrg",
    "mynic",
    "tapconfiguration1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getNetworkInterfaceTapConfigurations();
}

main().catch(console.error);
