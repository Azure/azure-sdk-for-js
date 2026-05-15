// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all private dns zone groups in a private endpoint.
 *
 * @summary gets all private dns zone groups in a private endpoint.
 * x-ms-original-file: 2025-05-01/PrivateEndpointDnsZoneGroupList.json
 */
async function listPrivateEndpointsInResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateDnsZoneGroups.list("rg1", "testPe")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listPrivateEndpointsInResourceGroup();
}

main().catch(console.error);
