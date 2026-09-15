// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppClient } from "@azure/arm-appservicesreagent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list SupportedAgentModel resources by SubscriptionLocationResource
 *
 * @summary list SupportedAgentModel resources by SubscriptionLocationResource
 * x-ms-original-file: 2026-01-01/SupportedAgentModels_ListByLocation.json
 */
async function supportedAgentModelsListByLocation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new AppClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.supportedAgentModels.listByLocation("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await supportedAgentModelsListByLocation();
}

main().catch(console.error);
