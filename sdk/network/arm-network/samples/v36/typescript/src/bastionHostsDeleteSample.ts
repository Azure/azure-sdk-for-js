// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes the specified Bastion Host.
 *
 * @summary Deletes the specified Bastion Host.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/BastionHostDelete.json
 */
async function deleteBastionHost(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const bastionHostName = "bastionhosttenant";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.bastionHosts.beginDeleteAndWait(
    resourceGroupName,
    bastionHostName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Deletes the specified Bastion Host.
 *
 * @summary Deletes the specified Bastion Host.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/BastionHostDeveloperDelete.json
 */
async function deleteDeveloperBastionHost(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg2";
  const bastionHostName = "bastionhostdeveloper";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.bastionHosts.beginDeleteAndWait(
    resourceGroupName,
    bastionHostName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteBastionHost();
  await deleteDeveloperBastionHost();
}

main().catch(console.error);
