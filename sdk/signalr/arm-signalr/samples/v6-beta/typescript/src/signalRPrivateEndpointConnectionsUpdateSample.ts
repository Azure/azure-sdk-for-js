// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SignalRManagementClient } from "@azure/arm-signalr";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the state of specified private endpoint connection
 *
 * @summary update the state of specified private endpoint connection
 * x-ms-original-file: 2025-01-01-preview/SignalRPrivateEndpointConnections_Update.json
 */
async function signalRPrivateEndpointConnectionsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SignalRManagementClient(credential, subscriptionId);
  const result = await client.signalRPrivateEndpointConnections.update(
    "mysignalrservice.1fa229cd-bf3f-47f0-8c49-afb36723997e",
    "myResourceGroup",
    "mySignalRService",
    {
      privateEndpoint: {},
      privateLinkServiceConnectionState: { actionsRequired: "None", status: "Approved" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await signalRPrivateEndpointConnectionsUpdate();
}

main().catch(console.error);
