// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a private endpoint connection with a given name.
 *
 * @summary deletes a private endpoint connection with a given name.
 * x-ms-original-file: 2023-06-01-preview/PrivateEndpointConnectionDelete.json
 */
async function deletesAPrivateEndpointConnectionWithAGivenName() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new MonitorClient(credential, subscriptionId);
  await client.privateEndpointConnections.delete(
    "MyResourceGroup",
    "MyPrivateLinkScope",
    "private-endpoint-connection-name",
  );
}

async function main() {
  await deletesAPrivateEndpointConnectionWithAGivenName();
}

main().catch(console.error);
