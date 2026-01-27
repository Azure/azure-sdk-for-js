// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes Log Analytics workspace Summary rules.
 *
 * @summary Deletes Log Analytics workspace Summary rules.
 * x-ms-original-file: specification/operationalinsights/resource-manager/Microsoft.OperationalInsights/OperationalInsights/stable/2025-07-01/examples/SummaryLogsDelete.json
 */
async function summaryLogsDelete(): Promise<void> {
  const subscriptionId =
    process.env["OPERATIONALINSIGHTS_SUBSCRIPTION_ID"] ||
    "11111111-1111-1111-1111-111111111111";
  const resourceGroupName =
    process.env["OPERATIONALINSIGHTS_RESOURCE_GROUP"] || "oiautorest6685";
  const workspaceName = "oiautorest6685";
  const summaryLogsName = "summarylogs1";
  const credential = new DefaultAzureCredential();
  const client = new OperationalInsightsManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.summaryLogsOperations.beginDeleteAndWait(
    resourceGroupName,
    workspaceName,
    summaryLogsName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await summaryLogsDelete();
}

main().catch(console.error);
