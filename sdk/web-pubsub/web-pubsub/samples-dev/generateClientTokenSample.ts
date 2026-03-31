// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubServiceClient } from "@azure/web-pubsub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to generate token for the client to connect Azure Web PubSub service.
 *
 * @summary generate token for the client to connect Azure Web PubSub service.
 * x-ms-original-file: 2024-12-01/WebPubSub_GenerateClientToken.json
 */
async function generateClientToken(): Promise<void> {
  const endpoint = process.env.WEB_PUB_SUB_SERVICE_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const hub = "hub1";
  const client = new WebPubSubServiceClient(endpoint, credential, hub);
  const result = await client.generateClientToken({
    userId: "user1",
    minutesToExpire: 5,
    clientType: "MQTT",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await generateClientToken();
}

main().catch(console.error);
