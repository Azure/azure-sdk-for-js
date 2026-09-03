// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApplicationInsightsManagementClient } = require("@azure/arm-appinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to adds or Updates a specific Analytics Item within an Application Insights component.
 *
 * @summary adds or Updates a specific Analytics Item within an Application Insights component.
 * x-ms-original-file: 2015-05-01/AnalyticsItemPut.json
 */
async function analyticsItemPut() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.analyticsItems.put(
    "my-resource-group",
    "my-component",
    "analyticsItems",
    {
      content:
        "let newExceptionsTimeRange = 1d;\nlet timeRangeToCheckBefore = 7d;\nexceptions\n| where timestamp < ago(timeRangeToCheckBefore)\n| summarize count() by problemId\n| join kind= rightanti (\nexceptions\n| where timestamp >= ago(newExceptionsTimeRange)\n| extend stack = tostring(details[0].rawStack)\n| summarize count(), dcount(user_AuthenticatedId), min(timestamp), max(timestamp), any(stack) by problemId  \n) on problemId \n| order by  count_ desc\n",
      name: "Exceptions - New in the last 24 hours",
      scope: "shared",
      type: "query",
    },
  );
  console.log(result);
}

async function main() {
  await analyticsItemPut();
}

main().catch(console.error);
