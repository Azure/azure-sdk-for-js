// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftDatadogClient } = require("@azure/arm-datadog");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a tag rule set for a given monitor resource.
 *
 * @summary get a tag rule set for a given monitor resource.
 * x-ms-original-file: 2025-12-26-preview/TagRules_Get.json
 */
async function tagRulesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftDatadogClient(credential, subscriptionId);
  const result = await client.tagRules.get("myResourceGroup", "myMonitor", "default");
  console.log(result);
}

async function main() {
  await tagRulesGet();
}

main().catch(console.error);
