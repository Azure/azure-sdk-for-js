// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified subnet by virtual network and resource group.
 *
 * @summary gets the specified subnet by virtual network and resource group.
 * x-ms-original-file: 2025-05-01/SubnetGet.json
 */
async function getSubnet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.subnets.get("subnet-test", "vnetname", "subnet1");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the specified subnet by virtual network and resource group.
 *
 * @summary gets the specified subnet by virtual network and resource group.
 * x-ms-original-file: 2025-05-01/SubnetGetWithDelegation.json
 */
async function getSubnetWithADelegation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.subnets.get("subnet-test", "vnetname", "subnet1");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the specified subnet by virtual network and resource group.
 *
 * @summary gets the specified subnet by virtual network and resource group.
 * x-ms-original-file: 2025-05-01/SubnetGetWithSharingScope.json
 */
async function getSubnetWithSharingScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.subnets.get("subnet-test", "vnetname", "subnet1");
  console.log(result);
}

async function main(): Promise<void> {
  await getSubnet();
  await getSubnetWithADelegation();
  await getSubnetWithSharingScope();
}

main().catch(console.error);
