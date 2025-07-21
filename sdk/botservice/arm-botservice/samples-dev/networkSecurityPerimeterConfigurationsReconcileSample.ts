// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BotServiceClient } from "@azure/arm-botservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to reconcile the specified Network Security Perimeter configuration associated with the Bot.
 *
 * @summary reconcile the specified Network Security Perimeter configuration associated with the Bot.
 * x-ms-original-file: 2023-09-15-preview/ReconcileNetworkSecurityPerimeterConfiguration.json
 */
async function reconcileNetworkSecurityPerimeterConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new BotServiceClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterConfigurations.reconcile(
    "rgName",
    "botId",
    "00000000-0000-0000-0000-000000000000.associationName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await reconcileNetworkSecurityPerimeterConfiguration();
}

main().catch(console.error);
