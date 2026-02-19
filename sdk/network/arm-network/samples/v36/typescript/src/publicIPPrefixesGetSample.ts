// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the specified public IP prefix in a specified resource group.
 *
 * @summary Gets the specified public IP prefix in a specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/PublicIpPrefixGet.json
 */
async function getPublicIPPrefix(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const publicIpPrefixName = "test-ipprefix";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.publicIPPrefixes.get(
    resourceGroupName,
    publicIpPrefixName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Gets the specified public IP prefix in a specified resource group.
 *
 * @summary Gets the specified public IP prefix in a specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/PublicIpPrefixGetStandardV2Sku.json
 */
async function getPublicIPPrefixWithStandardV2Sku(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const publicIpPrefixName = "test-ipprefix";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.publicIPPrefixes.get(
    resourceGroupName,
    publicIpPrefixName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getPublicIPPrefix();
  await getPublicIPPrefixWithStandardV2Sku();
}

main().catch(console.error);
