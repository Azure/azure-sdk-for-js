// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BotServiceClient } from "@azure/arm-botservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the state of specified private endpoint connection associated with the Bot.
 *
 * @summary update the state of specified private endpoint connection associated with the Bot.
 * x-ms-original-file: 2023-09-15-preview/PutPrivateEndpointConnection.json
 */
async function putPrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new BotServiceClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.create(
    "res7687",
    "sto9699",
    "{privateEndpointConnectionName}",
    {
      properties: {
        privateLinkServiceConnectionState: {
          description: "Auto-Approved",
          status: "Approved",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await putPrivateEndpointConnection();
}

main().catch(console.error);
