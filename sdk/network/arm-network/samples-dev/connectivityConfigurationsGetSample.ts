// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a Network Connectivity Configuration, specified by the resource group, network manager name, and connectivity Configuration name
 *
 * @summary Gets a Network Connectivity Configuration, specified by the resource group, network manager name, and connectivity Configuration name
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/NetworkManagerConnectivityConfigurationGet.json
 */

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function connectivityConfigurationsGet(): Promise<void> {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["NETWORK_RESOURCE_GROUP"] || "myResourceGroup";
  const networkManagerName = "testNetworkManager";
  const configurationName = "myTestConnectivityConfig";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.connectivityConfigurations.get(
    resourceGroupName,
    networkManagerName,
    configurationName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await connectivityConfigurationsGet();
}

main().catch(console.error);
