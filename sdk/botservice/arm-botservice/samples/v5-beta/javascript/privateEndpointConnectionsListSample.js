// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BotServiceClient } = require("@azure/arm-botservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all the private endpoint connections associated with the Bot.
 *
 * @summary list all the private endpoint connections associated with the Bot.
 * x-ms-original-file: 2023-09-15-preview/ListPrivateEndpointConnections.json
 */
async function listPrivateEndpointConnections() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new BotServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnections.list("res6977", "sto2527")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listPrivateEndpointConnections();
}

main().catch(console.error);
