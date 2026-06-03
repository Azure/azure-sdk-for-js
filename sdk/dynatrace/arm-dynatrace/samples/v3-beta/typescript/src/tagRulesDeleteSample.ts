// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ObservabilityClient } from "@azure/arm-dynatrace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a TagRule
 *
 * @summary delete a TagRule
 * x-ms-original-file: 2024-04-24/TagRules_Delete_MaximumSet_Gen.json
 */
async function tagRulesDeleteMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ObservabilityClient(credential, subscriptionId);
  await client.tagRules.delete("myResourceGroup", "myMonitor", "default");
}

/**
 * This sample demonstrates how to delete a TagRule
 *
 * @summary delete a TagRule
 * x-ms-original-file: 2024-04-24/TagRules_Delete_MinimumSet_Gen.json
 */
async function tagRulesDeleteMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ObservabilityClient(credential, subscriptionId);
  await client.tagRules.delete("myResourceGroup", "myMonitor", "default");
}

async function main(): Promise<void> {
  await tagRulesDeleteMaximumSetGen();
  await tagRulesDeleteMinimumSetGen();
}

main().catch(console.error);
