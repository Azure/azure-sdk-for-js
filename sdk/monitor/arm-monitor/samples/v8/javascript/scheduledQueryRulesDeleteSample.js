// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a scheduled query rule.
 *
 * @summary deletes a scheduled query rule.
 * x-ms-original-file: 2025-01-01-preview/deleteScheduledQueryRule.json
 */
async function deleteAScheduledQueryRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "dd4bfc94-a096-412b-9c43-4bd13e35afbc";
  const client = new MonitorClient(credential, subscriptionId);
  await client.scheduledQueryRules.delete("QueryResourceGroupName", "heartbeat");
}

async function main() {
  await deleteAScheduledQueryRule();
}

main().catch(console.error);
