// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftElastic } from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all tag rules for a given Elastic monitor resource, helping you manage fine-grained control over observability based on resource tags.
 *
 * @summary list all tag rules for a given Elastic monitor resource, helping you manage fine-grained control over observability based on resource tags.
 * x-ms-original-file: 2025-06-01/TagRules_List.json
 */
async function tagRulesList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.tagRules.list("myResourceGroup", "myMonitor")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await tagRulesList();
}

main().catch(console.error);
