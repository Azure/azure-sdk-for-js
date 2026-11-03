// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets recently deleted workspaces in a subscription, available for recovery.
 *
 * @summary gets recently deleted workspaces in a subscription, available for recovery.
 * x-ms-original-file: 2025-07-01/WorkspacesSubscriptionList.json
 */
async function workspacesSubscriptionList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.deletedWorkspaces.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await workspacesSubscriptionList();
}

main().catch(console.error);
