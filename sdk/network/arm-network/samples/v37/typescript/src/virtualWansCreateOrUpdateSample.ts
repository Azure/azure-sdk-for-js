// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a VirtualWAN resource if it doesn't exist else updates the existing VirtualWAN.
 *
 * @summary creates a VirtualWAN resource if it doesn't exist else updates the existing VirtualWAN.
 * x-ms-original-file: 2025-05-01/VirtualWANPut.json
 */
async function virtualWANCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualWans.createOrUpdate("rg1", "wan1", {
    location: "West US",
    typePropertiesType: "Basic",
    disableVpnEncryption: false,
    tags: { key1: "value1" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await virtualWANCreate();
}

main().catch(console.error);
