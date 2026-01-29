// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Starts an inactive Summary rule.
 *
 * @summary Starts an inactive Summary rule.
 * x-ms-original-file: specification/operationalinsights/resource-manager/Microsoft.OperationalInsights/OperationalInsights/stable/2025-07-01/examples/SummaryLogsStart.json
 */
async function summaryLogsStart(): Promise<void> {
  const subscriptionId =
    process.env["OPERATIONALINSIGHTS_SUBSCRIPTION_ID"] ||
    "11111111-1111-1111-1111-111111111111";
  const resourceGroupName =
    process.env["OPERATIONALINSIGHTS_RESOURCE_GROUP"] || "exampleresourcegroup";
  const workspaceName = "exampleworkspace";
  const summaryLogsName = "summarylogs3";
  const credential = new DefaultAzureCredential();
  const client = new OperationalInsightsManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.summaryLogsOperations.beginStartAndWait(
    resourceGroupName,
    workspaceName,
    summaryLogsName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await summaryLogsStart();
}

main().catch(console.error);
