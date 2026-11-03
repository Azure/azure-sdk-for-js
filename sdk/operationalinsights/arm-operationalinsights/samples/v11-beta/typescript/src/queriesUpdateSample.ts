// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to adds or Updates a specific Query within a Log Analytics QueryPack.
 *
 * @summary adds or Updates a specific Query within a Log Analytics QueryPack.
 * x-ms-original-file: 2025-07-01/QueryPackQueriesUpdate.json
 */
async function queryPatch(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "86dc51d3-92ed-4d7e-947a-775ea79b4918";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.queries.update(
    "my-resource-group",
    "my-querypack",
    "a449f8af-8e64-4b3a-9b16-5a7165ff98c4",
    {
      description: "my description",
      body: "let newExceptionsTimeRange = 1d;\nlet timeRangeToCheckBefore = 7d;\nexceptions\n| where timestamp < ago(timeRangeToCheckBefore)\n| summarize count() by problemId\n| join kind= rightanti (\nexceptions\n| where timestamp >= ago(newExceptionsTimeRange)\n| extend stack = tostring(details[0].rawStack)\n| summarize count(), dcount(user_AuthenticatedId), min(timestamp), max(timestamp), any(stack) by problemId  \n) on problemId \n| order by  count_ desc\n",
      displayName: "Exceptions - New in the last 24 hours",
      related: { categories: ["analytics"] },
      tags: { "my-label": ["label1"], "my-other-label": ["label2"] },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await queryPatch();
}

main().catch(console.error);
