// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a list of all action groups in a subscription.
 *
 * @summary get a list of all action groups in a subscription.
 * x-ms-original-file: 2024-10-01-preview/listActionGroups.json
 */
async function listActionGroupsAtSubscriptionLevel() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "187f412d-1758-44d9-b052-169e2564721d";
  const client = new MonitorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.actionGroups.listBySubscriptionId()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listActionGroupsAtSubscriptionLevel();
}

main().catch(console.error);
