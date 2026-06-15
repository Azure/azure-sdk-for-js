// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DynatraceObservability } = require("@azure/arm-dynatrace");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a DynatraceSingleSignOnResource
 *
 * @summary get a DynatraceSingleSignOnResource
 * x-ms-original-file: 2024-04-24/SingleSignOn_Get_MaximumSet_Gen.json
 */
async function singleSignOnGetMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DynatraceObservability(credential, subscriptionId);
  const result = await client.singleSignOn.get("myResourceGroup", "myMonitor", "default");
  console.log(result);
}

/**
 * This sample demonstrates how to get a DynatraceSingleSignOnResource
 *
 * @summary get a DynatraceSingleSignOnResource
 * x-ms-original-file: 2024-04-24/SingleSignOn_Get_MinimumSet_Gen.json
 */
async function singleSignOnGetMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DynatraceObservability(credential, subscriptionId);
  const result = await client.singleSignOn.get("myResourceGroup", "myMonitor", "default");
  console.log(result);
}

async function main() {
  await singleSignOnGetMaximumSetGen();
  await singleSignOnGetMinimumSetGen();
}

main().catch(console.error);
