// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes the specified custom IP prefix.
 *
 * @summary Deletes the specified custom IP prefix.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/CustomIpPrefixDelete.json
 */
async function deleteCustomIPPrefix(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const customIpPrefixName = "test-customipprefix";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.customIPPrefixes.beginDeleteAndWait(
    resourceGroupName,
    customIpPrefixName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteCustomIPPrefix();
}

main().catch(console.error);
