// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes the specified public IP prefix.
 *
 * @summary Deletes the specified public IP prefix.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/PublicIpPrefixDelete.json
 */
async function deletePublicIPPrefix(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const publicIpPrefixName = "test-ipprefix";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.publicIPPrefixes.beginDeleteAndWait(
    resourceGroupName,
    publicIpPrefixName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deletePublicIPPrefix();
}

main().catch(console.error);
