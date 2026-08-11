// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IotHubClient } from "@azure/arm-iothub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the status of a private endpoint connection with the specified name
 *
 * @summary update the status of a private endpoint connection with the specified name
 * x-ms-original-file: 2026-03-01-preview/iothub_updateprivateendpointconnection.json
 */
async function privateEndpointConnectionUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotHubClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.update(
    "myResourceGroup",
    "testHub",
    "myPrivateEndpointConnection",
    {
      properties: {
        privateLinkServiceConnectionState: {
          description: "Approved by johndoe@contoso.com",
          status: "Approved",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await privateEndpointConnectionUpdate();
}

main().catch(console.error);
