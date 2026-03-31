// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the private dns zone group resource by specified private dns zone group name.
 *
 * @summary gets the private dns zone group resource by specified private dns zone group name.
 * x-ms-original-file: 2025-05-01/PrivateEndpointDnsZoneGroupGet.json
 */
async function getPrivateDnsZoneGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.privateDnsZoneGroups.get("rg1", "testPe", "testPdnsgroup");
  console.log(result);
}

async function main() {
  await getPrivateDnsZoneGroup();
}

main().catch(console.error);
