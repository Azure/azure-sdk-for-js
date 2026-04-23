// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  UnprepareNetworkPoliciesRequest} from "@azure/arm-network";
import {
  NetworkManagementClient,
} from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Unprepares a subnet by removing network intent policies.
 *
 * @summary Unprepares a subnet by removing network intent policies.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/SubnetUnprepareNetworkPolicies.json
 */
async function unprepareNetworkPolicies(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualNetworkName = "test-vnet";
  const subnetName = "subnet1";
  const unprepareNetworkPoliciesRequestParameters: UnprepareNetworkPoliciesRequest =
    { serviceName: "Microsoft.Sql/managedInstances" };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.subnets.beginUnprepareNetworkPoliciesAndWait(
    resourceGroupName,
    virtualNetworkName,
    subnetName,
    unprepareNetworkPoliciesRequestParameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await unprepareNetworkPolicies();
}

main().catch(console.error);
