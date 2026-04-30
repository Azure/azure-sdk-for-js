// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PublicIPPrefix} from "@azure/arm-network";
import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates a static or dynamic public IP prefix.
 *
 * @summary Creates or updates a static or dynamic public IP prefix.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/PublicIpPrefixCreateCustomizedValues.json
 */
async function createPublicIPPrefixAllocationMethod(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const publicIpPrefixName = "test-ipprefix";
  const parameters: PublicIPPrefix = {
    location: "westus",
    prefixLength: 30,
    publicIPAddressVersion: "IPv4",
    sku: { name: "Standard", tier: "Regional" },
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.publicIPPrefixes.beginCreateOrUpdateAndWait(
    resourceGroupName,
    publicIpPrefixName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a static or dynamic public IP prefix.
 *
 * @summary Creates or updates a static or dynamic public IP prefix.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/PublicIpPrefixCreateDefaults.json
 */
async function createPublicIPPrefixDefaults(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const publicIpPrefixName = "test-ipprefix";
  const parameters: PublicIPPrefix = {
    location: "westus",
    prefixLength: 30,
    sku: { name: "Standard" },
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.publicIPPrefixes.beginCreateOrUpdateAndWait(
    resourceGroupName,
    publicIpPrefixName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a static or dynamic public IP prefix.
 *
 * @summary Creates or updates a static or dynamic public IP prefix.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/PublicIpPrefixCreateDefaultsStandardV2Sku.json
 */
async function createPublicIPPrefixDefaultsWithStandardV2Sku(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const publicIpPrefixName = "test-ipprefix";
  const parameters: PublicIPPrefix = {
    location: "westus",
    prefixLength: 30,
    sku: { name: "StandardV2" },
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.publicIPPrefixes.beginCreateOrUpdateAndWait(
    resourceGroupName,
    publicIpPrefixName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createPublicIPPrefixAllocationMethod();
  await createPublicIPPrefixDefaults();
  await createPublicIPPrefixDefaultsWithStandardV2Sku();
}

main().catch(console.error);
