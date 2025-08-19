// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update the status of a private endpoint connection with the specified name
 *
 * @summary Update the status of a private endpoint connection with the specified name
 * x-ms-original-file: specification/iothub/resource-manager/Microsoft.Devices/stable/2023-06-30/examples/iothub_updateprivateendpointconnection.json
 */

import type { PrivateEndpointConnection } from "@azure/arm-iothub";
import { IotHubClient } from "@azure/arm-iothub";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function privateEndpointConnectionUpdate(): Promise<void> {
  const subscriptionId =
    process.env["IOTHUB_SUBSCRIPTION_ID"] || "91d12660-3dec-467a-be2a-213b5544ddc0";
  const resourceGroupName = process.env["IOTHUB_RESOURCE_GROUP"] || "myResourceGroup";
  const resourceName = "testHub";
  const privateEndpointConnectionName = "myPrivateEndpointConnection";
  const privateEndpointConnection: PrivateEndpointConnection = {
    properties: {
      privateLinkServiceConnectionState: {
        description: "Approved by johndoe@contoso.com",
        status: "Approved",
      },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new IotHubClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.beginUpdateAndWait(
    resourceGroupName,
    resourceName,
    privateEndpointConnectionName,
    privateEndpointConnection,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await privateEndpointConnectionUpdate();
}

main().catch(console.error);
