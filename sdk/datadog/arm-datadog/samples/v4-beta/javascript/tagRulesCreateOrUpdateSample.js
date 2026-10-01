// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftDatadogClient } = require("@azure/arm-datadog");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a tag rule set for a given monitor resource.
 *
 * @summary create or update a tag rule set for a given monitor resource.
 * x-ms-original-file: 2025-12-26-preview/TagRules_CreateOrUpdate.json
 */
async function tagRulesCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftDatadogClient(credential, subscriptionId);
  const result = await client.tagRules.createOrUpdate("myResourceGroup", "myMonitor", "default", {
    body: {
      properties: {
        automuting: true,
        logRules: {
          filteringTags: [
            { name: "Environment", action: "Include", value: "Prod" },
            { name: "Environment", action: "Exclude", value: "Dev" },
          ],
          sendAadLogs: false,
          sendResourceLogs: true,
          sendSubscriptionLogs: true,
        },
        metricRules: { filteringTags: [] },
      },
    },
  });
  console.log(result);
}

async function main() {
  await tagRulesCreateOrUpdate();
}

main().catch(console.error);
