// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified Virtual Appliance Site.
 *
 * @summary gets the specified Virtual Appliance Site.
 * x-ms-original-file: 2025-05-01/NetworkVirtualApplianceSiteGet.json
 */
async function getNetworkVirtualApplianceSite(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualApplianceSites.get("rg1", "nva", "site1");
  console.log(result);
}

async function main(): Promise<void> {
  await getNetworkVirtualApplianceSite();
}

main().catch(console.error);
