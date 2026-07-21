// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IotHubClient } from "@azure/arm-iothub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get private endpoint connection properties
 *
 * @summary get private endpoint connection properties
 * x-ms-original-file: 2026-03-01-preview/iothub_getprivateendpointconnection.json
 */
async function privateEndpointConnectionGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotHubClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get(
    "myResourceGroup",
    "testHub",
    "myPrivateEndpointConnection",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await privateEndpointConnectionGet();
}

main().catch(console.error);
