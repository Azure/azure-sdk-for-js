// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftElastic } = require("@azure/arm-elastic");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a tag rule set for a given Elastic monitor resource, enabling fine-grained control over observability based on resource tags.
 *
 * @summary create or update a tag rule set for a given Elastic monitor resource, enabling fine-grained control over observability based on resource tags.
 * x-ms-original-file: 2025-06-01/TagRules_CreateOrUpdate.json
 */
async function tagRulesCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.tagRules.createOrUpdate("myResourceGroup", "myMonitor", "default");
  console.log(result);
}

async function main() {
  await tagRulesCreateOrUpdate();
}

main().catch(console.error);
