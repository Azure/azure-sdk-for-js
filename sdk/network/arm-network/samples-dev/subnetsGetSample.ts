// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the specified subnet by virtual network and resource group.
 *
 * @summary Gets the specified subnet by virtual network and resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/SubnetGet.json
 */

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getSubnet(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName =
    process.env["NETWORK_RESOURCE_GROUP"] || "subnet-test";
  const virtualNetworkName = "vnetname";
  const subnetName = "subnet1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.subnets.get(
    resourceGroupName,
    virtualNetworkName,
    subnetName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Gets the specified subnet by virtual network and resource group.
 *
 * @summary Gets the specified subnet by virtual network and resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/SubnetGetWithDelegation.json
 */
async function getSubnetWithADelegation(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subId";
  const resourceGroupName =
    process.env["NETWORK_RESOURCE_GROUP"] || "subnet-test";
  const virtualNetworkName = "vnetname";
  const subnetName = "subnet1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.subnets.get(
    resourceGroupName,
    virtualNetworkName,
    subnetName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Gets the specified subnet by virtual network and resource group.
 *
 * @summary Gets the specified subnet by virtual network and resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/SubnetGetWithSharingScope.json
 */
async function getSubnetWithSharingScope(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName =
    process.env["NETWORK_RESOURCE_GROUP"] || "subnet-test";
  const virtualNetworkName = "vnetname";
  const subnetName = "subnet1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.subnets.get(
    resourceGroupName,
    virtualNetworkName,
    subnetName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getSubnet();
  await getSubnetWithADelegation();
  await getSubnetWithSharingScope();
}

main().catch(console.error);
