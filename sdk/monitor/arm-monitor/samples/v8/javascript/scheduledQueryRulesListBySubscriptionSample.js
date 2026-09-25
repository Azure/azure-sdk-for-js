// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve a scheduled query rule definitions in a subscription.
 *
 * @summary retrieve a scheduled query rule definitions in a subscription.
 * x-ms-original-file: 2025-01-01-preview/listScheduledQueryRulesBySubscription.json
 */
async function listScheduledQueryRulesBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "dd4bfc94-a096-412b-9c43-4bd13e35afbc";
  const client = new MonitorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.scheduledQueryRules.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listScheduledQueryRulesBySubscription();
}

main().catch(console.error);
