// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all network manager connections created by this management group.
 *
 * @summary list all network manager connections created by this management group.
 * x-ms-original-file: 2025-05-01/NetworkManagerConnectionManagementGroupList.json
 */
async function listManagementGroupNetworkManagerConnection() {
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.managementGroupNetworkManagerConnections.list(
    "managementGroupA",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listManagementGroupNetworkManagerConnection();
}

main().catch(console.error);
