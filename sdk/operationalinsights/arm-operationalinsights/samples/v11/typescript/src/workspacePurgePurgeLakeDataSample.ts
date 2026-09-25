// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to purges data lake data in a Log Analytics workspace for a table over a specified time range.
 *
 * This operation deletes data lake data (Auxiliary tables, or Analytics tables mirrored to the data lake) for the specified table within the given time range. The operation is long-running; poll the URL returned in the Azure-AsyncOperation response header to track its status.
 *
 * @summary purges data lake data in a Log Analytics workspace for a table over a specified time range.
 *
 * This operation deletes data lake data (Auxiliary tables, or Analytics tables mirrored to the data lake) for the specified table within the given time range. The operation is long-running; poll the URL returned in the Azure-AsyncOperation response header to track its status.
 * x-ms-original-file: 2026-03-01/WorkspacesPurgeLakeData.json
 */
async function workspacesPurgeLakeData(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  await client.workspacePurge.purgeLakeData("OIAutoRest5123", "aztest5048", {
    table: "AuxiliaryLogs_CL",
    timeRange: {
      startTime: new Date("2026-03-01T00:00:00Z"),
      endTime: new Date("2026-03-02T00:00:00Z"),
    },
  });
}

async function main(): Promise<void> {
  await workspacesPurgeLakeData();
}

main().catch(console.error);
