// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of management groups connected to a workspace.
 *
 * @summary gets a list of management groups connected to a workspace.
 * x-ms-original-file: 2025-07-01/WorkspacesListManagementGroups.json
 */
async function workspacesListManagementGroups(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managementGroups.list("rg1", "TestLinkWS")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await workspacesListManagementGroups();
}

main().catch(console.error);
