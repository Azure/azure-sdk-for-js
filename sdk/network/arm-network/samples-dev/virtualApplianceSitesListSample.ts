// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all Network Virtual Appliance Sites in a Network Virtual Appliance resource.
 *
 * @summary lists all Network Virtual Appliance Sites in a Network Virtual Appliance resource.
 * x-ms-original-file: 2025-05-01/NetworkVirtualApplianceSiteList.json
 */
async function listAllNetworkVirtualApplianceSitesForAGivenNetworkVirtualAppliance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualApplianceSites.list("rg1", "nva")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllNetworkVirtualApplianceSitesForAGivenNetworkVirtualAppliance();
}

main().catch(console.error);
