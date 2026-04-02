// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the details of a VirtualWAN.
 *
 * @summary retrieves the details of a VirtualWAN.
 * x-ms-original-file: 2025-05-01/VirtualWANGet.json
 */
async function virtualWANGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualWans.get("rg1", "wan1");
  console.log(result);
}

async function main() {
  await virtualWANGet();
}

main().catch(console.error);
