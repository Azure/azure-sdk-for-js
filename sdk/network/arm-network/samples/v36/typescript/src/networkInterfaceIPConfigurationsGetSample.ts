// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the specified network interface ip configuration.
 *
 * @summary Gets the specified network interface ip configuration.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkInterfaceIPConfigurationGet.json
 */
async function networkInterfaceIPConfigurationGet(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "testrg";
  const networkInterfaceName = "mynic";
  const ipConfigurationName = "ipconfig1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkInterfaceIPConfigurations.get(
    resourceGroupName,
    networkInterfaceName,
    ipConfigurationName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkInterfaceIPConfigurationGet();
}

main().catch(console.error);
