// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IotHubClient } from "@azure/arm-iothub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete private endpoint connection with the specified name
 *
 * @summary delete private endpoint connection with the specified name
 * x-ms-original-file: 2026-03-01-preview/iothub_deleteprivateendpointconnection.json
 */
async function privateEndpointConnectionDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotHubClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.delete(
    "myResourceGroup",
    "testHub",
    "myPrivateEndpointConnection",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await privateEndpointConnectionDelete();
}

main().catch(console.error);
