// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BotServiceClient } from "@azure/arm-botservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists a Channel registration for a Bot Service including secrets
 *
 * @summary lists a Channel registration for a Bot Service including secrets
 * x-ms-original-file: 2023-09-15-preview/ListChannel.json
 */
async function listChannel(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscription-id";
  const client = new BotServiceClient(credential, subscriptionId);
  const result = await client.channels.listWithKeys(
    "OneResourceGroupName",
    "samplebotname",
    "EmailChannel",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await listChannel();
}

main().catch(console.error);
