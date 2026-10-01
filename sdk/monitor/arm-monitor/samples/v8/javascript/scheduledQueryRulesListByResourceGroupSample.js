// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve scheduled query rule definitions in a resource group.
 *
 * @summary retrieve scheduled query rule definitions in a resource group.
 * x-ms-original-file: 2025-01-01-preview/listScheduledQueryRulesByResourceGroup.json
 */
async function listScheduledQueryRulesByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "dd4bfc94-a096-412b-9c43-4bd13e35afbc";
  const client = new MonitorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.scheduledQueryRules.listByResourceGroup(
    "QueryResourceGroupName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listScheduledQueryRulesByResourceGroup();
}

main().catch(console.error);
