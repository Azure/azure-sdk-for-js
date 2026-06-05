// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to asynchronously updates a topic with the specified parameters.
 *
 * @summary asynchronously updates a topic with the specified parameters.
 * x-ms-original-file: 2025-07-15-preview/Topics_Update.json
 */
async function topicsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.topics.update("examplerg", "exampletopic1", {
    inboundIpRules: [
      { action: "Allow", ipMask: "12.18.30.15" },
      { action: "Allow", ipMask: "12.18.176.1" },
    ],
    publicNetworkAccess: "Enabled",
    tags: { tag1: "value1", tag2: "value2" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await topicsUpdate();
}

main().catch(console.error);
