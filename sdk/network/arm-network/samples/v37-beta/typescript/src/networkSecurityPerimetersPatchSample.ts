// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to patch Tags for a Network Security Perimeter.
 *
 * @summary patch Tags for a Network Security Perimeter.
 * x-ms-original-file: 2025-05-01/NetworkSecurityPerimeterPatch.json
 */
async function patchNetworkSecurityPerimeter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeters.patch("rg1", "nsp1", {
    tags: { description: "nsp1" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await patchNetworkSecurityPerimeter();
}

main().catch(console.error);
