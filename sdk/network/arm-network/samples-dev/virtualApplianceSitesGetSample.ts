// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the specified Virtual Appliance Site.
 *
 * @summary Gets the specified Virtual Appliance Site.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/NetworkVirtualApplianceSiteGet.json
 */

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getNetworkVirtualApplianceSite(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkVirtualApplianceName = "nva";
  const siteName = "site1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualApplianceSites.get(
    resourceGroupName,
    networkVirtualApplianceName,
    siteName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getNetworkVirtualApplianceSite();
}

main().catch(console.error);
