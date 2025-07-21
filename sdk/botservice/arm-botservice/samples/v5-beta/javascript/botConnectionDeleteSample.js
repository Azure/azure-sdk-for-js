// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BotServiceClient } = require("@azure/arm-botservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a Connection Setting registration for a Bot Service
 *
 * @summary deletes a Connection Setting registration for a Bot Service
 * x-ms-original-file: 2023-09-15-preview/DeleteConnection.json
 */
async function deleteConnectionSetting() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscription-id";
  const client = new BotServiceClient(credential, subscriptionId);
  await client.botConnection.delete("OneResourceGroupName", "samplebotname", "sampleConnection");
}

async function main() {
  await deleteConnectionSetting();
}

main().catch(console.error);
