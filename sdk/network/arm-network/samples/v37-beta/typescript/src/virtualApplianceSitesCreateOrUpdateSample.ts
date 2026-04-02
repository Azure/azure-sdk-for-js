// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates the specified Network Virtual Appliance Site.
 *
 * @summary creates or updates the specified Network Virtual Appliance Site.
 * x-ms-original-file: 2025-05-01/NetworkVirtualApplianceSitePut.json
 */
async function createNetworkVirtualApplianceSite(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualApplianceSites.createOrUpdate("rg1", "nva", "site1", {
    addressPrefix: "192.168.1.0/24",
    o365Policy: { breakOutCategories: { default: true, allow: true, optimize: true } },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createNetworkVirtualApplianceSite();
}

main().catch(console.error);
