// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified Network Virtual Appliance.
 *
 * @summary gets the specified Network Virtual Appliance.
 * x-ms-original-file: 2025-09-01/NetworkVirtualApplianceGet.json
 */
async function getNetworkVirtualAppliance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkVirtualAppliances.get("rg1", "nva");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the specified Network Virtual Appliance.
 *
 * @summary gets the specified Network Virtual Appliance.
 * x-ms-original-file: 2025-09-01/NetworkVirtualApplianceVhubDualStackGet.json
 */
async function getNetworkVirtualApplianceInVirtualHubWithDualStack() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkVirtualAppliances.get("rg1", "nva");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the specified Network Virtual Appliance.
 *
 * @summary gets the specified Network Virtual Appliance.
 * x-ms-original-file: 2025-09-01/NetworkVirtualApplianceVnetDualStackGet.json
 */
async function getNetworkVirtualApplianceInVNetWithDualStack() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkVirtualAppliances.get("rg1", "nva");
  console.log(result);
}

async function main() {
  await getNetworkVirtualAppliance();
  await getNetworkVirtualApplianceInVirtualHubWithDualStack();
  await getNetworkVirtualApplianceInVNetWithDualStack();
}

main().catch(console.error);
