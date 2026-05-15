// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified private dns zone group.
 *
 * @summary deletes the specified private dns zone group.
 * x-ms-original-file: 2025-05-01/PrivateEndpointDnsZoneGroupDelete.json
 */
async function deletePrivateDnsZoneGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.privateDnsZoneGroups.delete("rg1", "testPe", "testPdnsgroup");
}

async function main() {
  await deletePrivateDnsZoneGroup();
}

main().catch(console.error);
