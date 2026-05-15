// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified network interface ip configuration.
 *
 * @summary gets the specified network interface ip configuration.
 * x-ms-original-file: 2025-05-01/NetworkInterfaceIPConfigurationGet.json
 */
async function networkInterfaceIPConfigurationGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkInterfaceIPConfigurations.get("testrg", "mynic", "ipconfig1");
  console.log(result);
}

async function main(): Promise<void> {
  await networkInterfaceIPConfigurationGet();
}

main().catch(console.error);
