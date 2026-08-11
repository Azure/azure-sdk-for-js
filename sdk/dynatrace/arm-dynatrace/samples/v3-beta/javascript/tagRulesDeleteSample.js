// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DynatraceObservability } = require("@azure/arm-dynatrace");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a TagRule
 *
 * @summary delete a TagRule
 * x-ms-original-file: 2024-04-24/TagRules_Delete_MaximumSet_Gen.json
 */
async function tagRulesDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DynatraceObservability(credential, subscriptionId);
  await client.tagRules.delete("myResourceGroup", "myMonitor", "default");
}

/**
 * This sample demonstrates how to delete a TagRule
 *
 * @summary delete a TagRule
 * x-ms-original-file: 2024-04-24/TagRules_Delete_MinimumSet_Gen.json
 */
async function tagRulesDeleteMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DynatraceObservability(credential, subscriptionId);
  await client.tagRules.delete("myResourceGroup", "myMonitor", "default");
}

async function main() {
  await tagRulesDeleteMaximumSetGen();
  await tagRulesDeleteMinimumSetGen();
}

main().catch(console.error);
