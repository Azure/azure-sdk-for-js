// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a NVA connection.
 *
 * @summary deletes a NVA connection.
 * x-ms-original-file: 2025-05-01/NetworkVirtualApplianceConnectionDelete.json
 */
async function networkVirtualApplianceConnectionDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.networkVirtualApplianceConnections.delete("rg1", "nva1", "connection1");
}

async function main(): Promise<void> {
  await networkVirtualApplianceConnectionDelete();
}

main().catch(console.error);
