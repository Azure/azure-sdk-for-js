// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a Network Security Perimeter.
 *
 * @summary creates or updates a Network Security Perimeter.
 * x-ms-original-file: 2025-05-01/NetworkSecurityPerimeterPut.json
 */
async function putNetworkSecurityPerimeter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeters.createOrUpdate("rg1", "nsp1", {
    location: "location1",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await putNetworkSecurityPerimeter();
}

main().catch(console.error);
