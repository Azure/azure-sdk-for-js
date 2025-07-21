// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BotServiceClient } from "@azure/arm-botservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified private endpoint connection associated with the Bot.
 *
 * @summary gets the specified private endpoint connection associated with the Bot.
 * x-ms-original-file: 2023-09-15-preview/GetPrivateEndpointConnection.json
 */
async function getPrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new BotServiceClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get(
    "res6977",
    "sto2527",
    "{privateEndpointConnectionName}",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getPrivateEndpointConnection();
}

main().catch(console.error);
