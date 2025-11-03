// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceBusManagementClient } = require("@azure/arm-servicebus");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the available PrivateEndpointConnections within a namespace.
 *
 * @summary gets the available PrivateEndpointConnections within a namespace.
 * x-ms-original-file: 2025-05-01-preview/NameSpaces/PrivateEndPointConnectionList.json
 */
async function nameSpaceCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnections.list(
    "SDK-ServiceBus-4794",
    "sdk-Namespace-5828",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await nameSpaceCreate();
}

main().catch(console.error);
