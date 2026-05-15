// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified site from a Virtual Appliance.
 *
 * @summary deletes the specified site from a Virtual Appliance.
 * x-ms-original-file: 2025-05-01/NetworkVirtualApplianceSiteDelete.json
 */
async function deleteNetworkVirtualApplianceSite(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.virtualApplianceSites.delete("rg1", "nva", "site1");
}

async function main(): Promise<void> {
  await deleteNetworkVirtualApplianceSite();
}

main().catch(console.error);
