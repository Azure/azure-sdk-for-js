// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BotServiceClient } = require("@azure/arm-botservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to register a new Auth Connection for a Bot Service
 *
 * @summary register a new Auth Connection for a Bot Service
 * x-ms-original-file: 2023-09-15-preview/PutConnection.json
 */
async function createConnectionSetting() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscription-id";
  const client = new BotServiceClient(credential, subscriptionId);
  const result = await client.botConnection.create(
    "OneResourceGroupName",
    "samplebotname",
    "sampleConnection",
    {
      etag: "etag1",
      location: "West US",
      properties: {
        clientId: "sampleclientid",
        clientSecret: "samplesecret",
        parameters: [
          { key: "key1", value: "value1" },
          { key: "key2", value: "value2" },
        ],
        scopes: "samplescope",
        serviceProviderId: "serviceproviderid",
      },
    },
  );
  console.log(result);
}

async function main() {
  await createConnectionSetting();
}

main().catch(console.error);
