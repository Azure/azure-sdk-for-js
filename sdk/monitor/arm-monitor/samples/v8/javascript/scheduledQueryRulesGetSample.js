// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve an scheduled query rule definition.
 *
 * @summary retrieve an scheduled query rule definition.
 * x-ms-original-file: 2025-01-01-preview/getScheduledQueryRule.json
 */
async function getAScheduledQueryRuleForSingleResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "dd4bfc94-a096-412b-9c43-4bd13e35afbc";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.scheduledQueryRules.get("QueryResourceGroupName", "perf");
  console.log(result);
}

async function main() {
  await getAScheduledQueryRuleForSingleResource();
}

main().catch(console.error);
