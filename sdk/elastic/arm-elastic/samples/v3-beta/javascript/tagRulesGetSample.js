// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftElastic } = require("@azure/arm-elastic");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get detailed information about a tag rule set for a given Elastic monitor resource.
 *
 * @summary get detailed information about a tag rule set for a given Elastic monitor resource.
 * x-ms-original-file: 2025-06-01/TagRules_Get.json
 */
async function tagRulesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.tagRules.get("myResourceGroup", "myMonitor", "default");
  console.log(result);
}

async function main() {
  await tagRulesGet();
}

main().catch(console.error);
