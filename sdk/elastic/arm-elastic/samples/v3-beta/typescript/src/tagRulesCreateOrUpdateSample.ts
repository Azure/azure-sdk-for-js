// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftElastic } from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a tag rule set for a given Elastic monitor resource, enabling fine-grained control over observability based on resource tags.
 *
 * @summary create or update a tag rule set for a given Elastic monitor resource, enabling fine-grained control over observability based on resource tags.
 * x-ms-original-file: 2025-06-01/TagRules_CreateOrUpdate.json
 */
async function tagRulesCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.tagRules.createOrUpdate("myResourceGroup", "myMonitor", "default");
  console.log(result);
}

async function main(): Promise<void> {
  await tagRulesCreateOrUpdate();
}

main().catch(console.error);
