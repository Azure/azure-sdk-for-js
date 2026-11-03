// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the available PrivateEndpointConnections within a namespace.
 *
 * @summary gets the available PrivateEndpointConnections within a namespace.
 * x-ms-original-file: 2026-01-01/NameSpaces/PrivateEndPointConnectionList.json
 */
async function privateEndPointConnectionList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subID";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnections.list(
    "SDK-EventHub-4794",
    "sdk-Namespace-5828",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await privateEndPointConnectionList();
}

main().catch(console.error);
