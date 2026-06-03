// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ObservabilityClient } from "@azure/arm-dynatrace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all TagRule by monitorName
 *
 * @summary list all TagRule by monitorName
 * x-ms-original-file: 2024-04-24/TagRules_List_MaximumSet_Gen.json
 */
async function tagRulesListMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ObservabilityClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.tagRules.list("myResourceGroup", "myMonitor")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list all TagRule by monitorName
 *
 * @summary list all TagRule by monitorName
 * x-ms-original-file: 2024-04-24/TagRules_List_MinimumSet_Gen.json
 */
async function tagRulesListMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ObservabilityClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.tagRules.list("myResourceGroup", "myMonitor")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await tagRulesListMaximumSetGen();
  await tagRulesListMinimumSetGen();
}

main().catch(console.error);
