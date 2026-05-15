// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified Network Virtual Appliance.
 *
 * @summary deletes the specified Network Virtual Appliance.
 * x-ms-original-file: 2025-05-01/NetworkVirtualApplianceDelete.json
 */
async function deleteNetworkVirtualAppliance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.networkVirtualAppliances.delete("rg1", "nva");
}

async function main() {
  await deleteNetworkVirtualAppliance();
}

main().catch(console.error);
