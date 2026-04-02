// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified Content Filters associated with the Subscription.
 *
 * @summary gets the specified Content Filters associated with the Subscription.
 * x-ms-original-file: 2026-01-15-preview/GetSubscriptionRaiPolicy.json
 */
async function getRaiPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.subscriptionRaiPolicy.get("raiPolicyName");
  console.log(result);
}

async function main(): Promise<void> {
  await getRaiPolicy();
}

main().catch(console.error);
