// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  SummaryLogs} from "@azure/arm-operationalinsights";
import {
  OperationalInsightsManagementClient,
} from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates Log Analytics workspace Summary rules.
 *
 * @summary Creates or updates Log Analytics workspace Summary rules.
 * x-ms-original-file: specification/operationalinsights/resource-manager/Microsoft.OperationalInsights/OperationalInsights/stable/2025-07-01/examples/SummaryLogsUpsert.json
 */
async function summaryLogsUpsert(): Promise<void> {
  const subscriptionId =
    process.env["OPERATIONALINSIGHTS_SUBSCRIPTION_ID"] ||
    "11111111-1111-1111-1111-111111111111";
  const resourceGroupName =
    process.env["OPERATIONALINSIGHTS_RESOURCE_GROUP"] || "oiautorest6685";
  const workspaceName = "oiautorest6685";
  const summaryLogsName = "summarylogs1";
  const parameters: SummaryLogs = {
    ruleDefinition: {
      binDelay: 10,
      binSize: 180,
      binStartTime: new Date("2020-02-03T04:05:06Z"),
      query: "MyTable_CL",
    },
    ruleType: "User",
  };
  const credential = new DefaultAzureCredential();
  const client = new OperationalInsightsManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.summaryLogsOperations.beginCreateOrUpdateAndWait(
    resourceGroupName,
    workspaceName,
    summaryLogsName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await summaryLogsUpsert();
}

main().catch(console.error);
