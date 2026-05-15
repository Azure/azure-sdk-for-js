// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a subnet in the specified virtual network.
 *
 * @summary creates or updates a subnet in the specified virtual network.
 * x-ms-original-file: 2025-05-01/SubnetCreate.json
 */
async function createSubnet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.subnets.createOrUpdate("subnet-test", "vnetname", "subnet1", {
    addressPrefix: "10.0.0.0/16",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a subnet in the specified virtual network.
 *
 * @summary creates or updates a subnet in the specified virtual network.
 * x-ms-original-file: 2025-05-01/SubnetCreateServiceEndpoint.json
 */
async function createSubnetWithServiceEndpoints(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.subnets.createOrUpdate("subnet-test", "vnetname", "subnet1", {
    addressPrefix: "10.0.0.0/16",
    serviceEndpoints: [{ service: "Microsoft.Storage" }],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a subnet in the specified virtual network.
 *
 * @summary creates or updates a subnet in the specified virtual network.
 * x-ms-original-file: 2025-05-01/SubnetCreateServiceEndpointNetworkIdentifier.json
 */
async function createSubnetWithServiceEndpointsWithNetworkIdentifier(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.subnets.createOrUpdate("subnet-test", "vnetname", "subnet1", {
    addressPrefix: "10.0.0.0/16",
    serviceEndpoints: [
      {
        networkIdentifier: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/subnet-test/providers/Microsoft.Network/publicIPAddresses/test-ip",
        },
        service: "Microsoft.Storage",
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a subnet in the specified virtual network.
 *
 * @summary creates or updates a subnet in the specified virtual network.
 * x-ms-original-file: 2025-05-01/SubnetCreateWithDelegation.json
 */
async function createSubnetWithADelegation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.subnets.createOrUpdate("subnet-test", "vnetname", "subnet1", {
    addressPrefix: "10.0.0.0/16",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a subnet in the specified virtual network.
 *
 * @summary creates or updates a subnet in the specified virtual network.
 * x-ms-original-file: 2025-05-01/SubnetCreateWithServiceGateway.json
 */
async function createSubnetWithServiceGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.subnets.createOrUpdate("subnet-test", "vnetname", "subnet1", {
    addressPrefix: "10.0.0.0/16",
    serviceGateway: {
      id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/serviceGateways/SG1",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a subnet in the specified virtual network.
 *
 * @summary creates or updates a subnet in the specified virtual network.
 * x-ms-original-file: 2025-05-01/SubnetCreateWithSharingScope.json
 */
async function createSubnetWithSharingScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.subnets.createOrUpdate("subnet-test", "vnetname", "subnet1", {
    addressPrefix: "10.0.0.0/16",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createSubnet();
  await createSubnetWithServiceEndpoints();
  await createSubnetWithServiceEndpointsWithNetworkIdentifier();
  await createSubnetWithADelegation();
  await createSubnetWithServiceGateway();
  await createSubnetWithSharingScope();
}

main().catch(console.error);
