// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a scheduled query rule.
 *
 * @summary update a scheduled query rule.
 * x-ms-original-file: 2025-01-01-preview/patchScheduledQueryRule.json
 */
async function createOrUpdateAScheduledQueryRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "dd4bfc94-a096-412b-9c43-4bd13e35afbc";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.scheduledQueryRules.update("QueryResourceGroupName", "heartbeat", {
    enabled: false,
  });
  console.log(result);
}

async function main() {
  await createOrUpdateAScheduledQueryRule();
}

main().catch(console.error);
