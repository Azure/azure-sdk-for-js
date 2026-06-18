// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NewRelicObservability } from "@azure/arm-newrelicobservability";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all tag rules associated with a specific New Relic monitor resource, helping you manage and audit the rules that control resource monitoring
 *
 * @summary lists all tag rules associated with a specific New Relic monitor resource, helping you manage and audit the rules that control resource monitoring
 * x-ms-original-file: 2025-05-01-preview/TagRules_ListByNewRelicMonitorResource_MaximumSet_Gen.json
 */
async function tagRulesListByNewRelicMonitorResourceMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.tagRules.listByNewRelicMonitorResource(
    "rgopenapi",
    "ipxmlcbonyxtolzejcjshkmlron",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all tag rules associated with a specific New Relic monitor resource, helping you manage and audit the rules that control resource monitoring
 *
 * @summary lists all tag rules associated with a specific New Relic monitor resource, helping you manage and audit the rules that control resource monitoring
 * x-ms-original-file: 2025-05-01-preview/TagRules_ListByNewRelicMonitorResource_MinimumSet_Gen.json
 */
async function tagRulesListByNewRelicMonitorResourceMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.tagRules.listByNewRelicMonitorResource(
    "rgopenapi",
    "ipxmlcbonyxtolzejcjshkmlron",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await tagRulesListByNewRelicMonitorResourceMaximumSetGen();
  await tagRulesListByNewRelicMonitorResourceMinimumSetGen();
}

main().catch(console.error);
