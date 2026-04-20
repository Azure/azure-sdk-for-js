// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all private endpoint connections on a private link scope.
 *
 * @summary gets all private endpoint connections on a private link scope.
 * x-ms-original-file: 2023-06-01-preview/PrivateEndpointConnectionList.json
 */
async function getsListOfPrivateEndpointConnectionsOnAPrivateLinkScope() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new MonitorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnections.listByPrivateLinkScope(
    "MyResourceGroup",
    "MyPrivateLinkScope",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsListOfPrivateEndpointConnectionsOnAPrivateLinkScope();
}

main().catch(console.error);
