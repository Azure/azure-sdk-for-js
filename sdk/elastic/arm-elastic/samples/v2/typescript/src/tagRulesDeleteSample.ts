// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftElastic } from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a tag rule set for a given Elastic monitor resource, removing fine-grained control over observability based on resource tags.
 *
 * @summary delete a tag rule set for a given Elastic monitor resource, removing fine-grained control over observability based on resource tags.
 * x-ms-original-file: 2025-06-01/TagRules_Delete.json
 */
async function tagRulesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  await client.tagRules.delete("myResourceGroup", "myMonitor", "default");
}

async function main(): Promise<void> {
  await tagRulesDelete();
}

main().catch(console.error);
