// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SignalRManagementClient } = require("@azure/arm-signalr");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the specified private endpoint connection
 *
 * @summary delete the specified private endpoint connection
 * x-ms-original-file: 2025-01-01-preview/SignalRPrivateEndpointConnections_Delete.json
 */
async function signalRPrivateEndpointConnectionsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SignalRManagementClient(credential, subscriptionId);
  await client.signalRPrivateEndpointConnections.delete(
    "mysignalrservice.1fa229cd-bf3f-47f0-8c49-afb36723997e",
    "myResourceGroup",
    "mySignalRService",
  );
}

async function main() {
  await signalRPrivateEndpointConnectionsDelete();
}

main().catch(console.error);
