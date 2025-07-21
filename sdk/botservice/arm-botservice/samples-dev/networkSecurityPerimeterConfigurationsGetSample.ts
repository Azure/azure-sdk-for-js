// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BotServiceClient } from "@azure/arm-botservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified Network Security Perimeter configuration associated with the Bot.
 *
 * @summary gets the specified Network Security Perimeter configuration associated with the Bot.
 * x-ms-original-file: 2023-09-15-preview/GetNetworkSecurityPerimeterConfiguration.json
 */
async function getNetworkSecurityPerimeterConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new BotServiceClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterConfigurations.get(
    "rgName",
    "botId",
    "00000000-0000-0000-0000-000000000000.associationName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getNetworkSecurityPerimeterConfiguration();
}

main().catch(console.error);
