// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets node availability for all subgroups in the specified interconnect group.
 *
 * @summary gets node availability for all subgroups in the specified interconnect group.
 * x-ms-original-file: 2025-07-01/InterconnectGroupGetNodeAvailability.json
 */
async function getInterconnectGroupNodeAvailability() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.interconnectGroups.getNodeAvailability("rg1", "test-ig");
  console.log(result);
}

async function main() {
  await getInterconnectGroupNodeAvailability();
}

main().catch(console.error);
