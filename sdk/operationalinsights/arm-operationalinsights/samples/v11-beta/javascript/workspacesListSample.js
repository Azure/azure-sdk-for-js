// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the workspaces in a subscription.
 *
 * @summary gets the workspaces in a subscription.
 * x-ms-original-file: 2025-07-01/WorkspacesSubscriptionListForWorkSpace.json
 */
async function workspacesSubscriptionList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workspaces.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await workspacesSubscriptionList();
}

main().catch(console.error);
