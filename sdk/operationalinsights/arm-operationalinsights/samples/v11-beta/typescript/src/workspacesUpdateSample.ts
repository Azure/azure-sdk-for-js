// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a workspace.
 *
 * @summary updates a workspace.
 * x-ms-original-file: 2025-07-01/WorkspacesUpdate.json
 */
async function workspacesPatch(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.workspaces.update("oiautorest6685", "oiautorest6685", {
    retentionInDays: 30,
    sku: { name: "PerGB2018" },
    workspaceCapping: { dailyQuotaGb: -1 },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await workspacesPatch();
}

main().catch(console.error);
