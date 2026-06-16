// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IotHubClient } = require("@azure/arm-iothub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list private endpoint connection properties
 *
 * @summary list private endpoint connection properties
 * x-ms-original-file: 2026-03-01-preview/iothub_listprivateendpointconnections.json
 */
async function privateEndpointConnectionsList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotHubClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.list("myResourceGroup", "testHub");
  console.log(result);
}

async function main() {
  await privateEndpointConnectionsList();
}

main().catch(console.error);
