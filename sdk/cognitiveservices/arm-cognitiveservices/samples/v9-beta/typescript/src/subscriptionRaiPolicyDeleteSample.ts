// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified Content Filters associated with the subscription.
 *
 * @summary deletes the specified Content Filters associated with the subscription.
 * x-ms-original-file: 2026-01-15-preview/DeleteSubscriptionRaiPolicy.json
 */
async function deleteRaiPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.subscriptionRaiPolicy.delete("raiPolicyName");
}

async function main(): Promise<void> {
  await deleteRaiPolicy();
}

main().catch(console.error);
