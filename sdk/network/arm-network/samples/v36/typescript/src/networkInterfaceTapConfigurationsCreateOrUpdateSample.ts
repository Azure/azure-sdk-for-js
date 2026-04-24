// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  NetworkInterfaceTapConfiguration} from "@azure/arm-network";
import {
  NetworkManagementClient,
} from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates a Tap configuration in the specified NetworkInterface.
 *
 * @summary Creates or updates a Tap configuration in the specified NetworkInterface.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkInterfaceTapConfigurationCreate.json
 */
async function createNetworkInterfaceTapConfigurations(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "testrg";
  const networkInterfaceName = "mynic";
  const tapConfigurationName = "tapconfiguration1";
  const tapConfigurationParameters: NetworkInterfaceTapConfiguration = {
    virtualNetworkTap: {
      id: "/subscriptions/subid/resourceGroups/testrg/providers/Microsoft.Network/virtualNetworkTaps/testvtap",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.networkInterfaceTapConfigurations.beginCreateOrUpdateAndWait(
      resourceGroupName,
      networkInterfaceName,
      tapConfigurationName,
      tapConfigurationParameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await createNetworkInterfaceTapConfigurations();
}

main().catch(console.error);
