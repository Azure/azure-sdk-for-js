// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ObservabilityClient } = require("@azure/arm-dynatrace");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a TagRule
 *
 * @summary get a TagRule
 * x-ms-original-file: 2024-04-24/TagRules_Get_MaximumSet_Gen.json
 */
async function tagRulesGetMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ObservabilityClient(credential, subscriptionId);
  const result = await client.tagRules.get("myResourceGroup", "myMonitor", "default");
  console.log(result);
}

/**
 * This sample demonstrates how to get a TagRule
 *
 * @summary get a TagRule
 * x-ms-original-file: 2024-04-24/TagRules_Get_MinimumSet_Gen.json
 */
async function tagRulesGetMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ObservabilityClient(credential, subscriptionId);
  const result = await client.tagRules.get("myResourceGroup", "myMonitor", "default");
  console.log(result);
}

async function main() {
  await tagRulesGetMaximumSetGen();
  await tagRulesGetMinimumSetGen();
}

main().catch(console.error);
