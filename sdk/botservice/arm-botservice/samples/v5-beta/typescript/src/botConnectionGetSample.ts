// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BotServiceClient } from "@azure/arm-botservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Connection Setting registration for a Bot Service
 *
 * @summary get a Connection Setting registration for a Bot Service
 * x-ms-original-file: 2023-09-15-preview/GetConnection.json
 */
async function getConnectionSetting(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscription-id";
  const client = new BotServiceClient(credential, subscriptionId);
  const result = await client.botConnection.get(
    "OneResourceGroupName",
    "samplebotname",
    "sampleConnection",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getConnectionSetting();
}

main().catch(console.error);
