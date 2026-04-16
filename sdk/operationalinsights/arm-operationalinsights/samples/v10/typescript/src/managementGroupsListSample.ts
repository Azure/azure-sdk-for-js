// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets a list of management groups connected to a workspace.
 *
 * @summary Gets a list of management groups connected to a workspace.
 * x-ms-original-file: specification/operationalinsights/resource-manager/Microsoft.OperationalInsights/OperationalInsights/stable/2025-07-01/examples/WorkspacesListManagementGroups.json
 */
async function workspacesListManagementGroups(): Promise<void> {
  const subscriptionId =
    process.env["OPERATIONALINSIGHTS_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-00000000000";
  const resourceGroupName =
    process.env["OPERATIONALINSIGHTS_RESOURCE_GROUP"] || "rg1";
  const workspaceName = "TestLinkWS";
  const credential = new DefaultAzureCredential();
  const client = new OperationalInsightsManagementClient(
    credential,
    subscriptionId,
  );
  const resArray = new Array();
  for await (const item of client.managementGroups.list(
    resourceGroupName,
    workspaceName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await workspacesListManagementGroups();
}

main().catch(console.error);
