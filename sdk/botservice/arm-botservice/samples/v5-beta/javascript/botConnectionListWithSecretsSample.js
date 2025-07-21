// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BotServiceClient } = require("@azure/arm-botservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Connection Setting registration for a Bot Service
 *
 * @summary get a Connection Setting registration for a Bot Service
 * x-ms-original-file: 2023-09-15-preview/GetConnectionListWithSecrets.json
 */
async function listConnectionSettingWithSecrets() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscription-id";
  const client = new BotServiceClient(credential, subscriptionId);
  const result = await client.botConnection.listWithSecrets(
    "OneResourceGroupName",
    "samplebotname",
    "sampleConnection",
  );
  console.log(result);
}

async function main() {
  await listConnectionSettingWithSecrets();
}

main().catch(console.error);
