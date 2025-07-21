// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BotServiceClient } = require("@azure/arm-botservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the QnA Maker endpoint keys
 *
 * @summary lists the QnA Maker endpoint keys
 * x-ms-original-file: 2023-09-15-preview/ListQnAMakerEndpointKeys.json
 */
async function listQnAMakerEndpointKeys() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscription-id";
  const client = new BotServiceClient(credential, subscriptionId);
  const result = await client.qnAMakerEndpointKeys.get({
    authkey: "testAuthKey",
    hostname: "https://xxx.cognitiveservices.azure.com/",
  });
  console.log(result);
}

async function main() {
  await listQnAMakerEndpointKeys();
}

main().catch(console.error);
