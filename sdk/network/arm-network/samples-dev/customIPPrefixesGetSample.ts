// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the specified custom IP prefix in a specified resource group.
 *
 * @summary Gets the specified custom IP prefix in a specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/CustomIpPrefixGet.json
 */

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getCustomIPPrefix(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const customIpPrefixName = "test-customipprefix";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.customIPPrefixes.get(
    resourceGroupName,
    customIpPrefixName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getCustomIPPrefix();
}

main().catch(console.error);
