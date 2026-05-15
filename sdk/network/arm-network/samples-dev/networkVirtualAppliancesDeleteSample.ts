// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified Network Virtual Appliance.
 *
 * @summary deletes the specified Network Virtual Appliance.
 * x-ms-original-file: 2025-05-01/NetworkVirtualApplianceDelete.json
 */
async function deleteNetworkVirtualAppliance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.networkVirtualAppliances.delete("rg1", "nva");
}

async function main(): Promise<void> {
  await deleteNetworkVirtualAppliance();
}

main().catch(console.error);
