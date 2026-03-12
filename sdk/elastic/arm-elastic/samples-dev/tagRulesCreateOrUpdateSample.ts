// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftElastic } from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create or update a tag rule set for a given Elastic monitor resource, enabling fine-grained control over observability based on resource tags.
 *
 * @summary Create or update a tag rule set for a given Elastic monitor resource, enabling fine-grained control over observability based on resource tags.
 * x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2025-06-01/examples/TagRules_CreateOrUpdate.json
 */
async function tagRulesCreateOrUpdate(): Promise<void> {
  const subscriptionId =
    process.env["ELASTIC_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["ELASTIC_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "myMonitor";
  const ruleSetName = "default";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.tagRules.createOrUpdate(
    resourceGroupName,
    monitorName,
    ruleSetName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await tagRulesCreateOrUpdate();
}

main().catch(console.error);
