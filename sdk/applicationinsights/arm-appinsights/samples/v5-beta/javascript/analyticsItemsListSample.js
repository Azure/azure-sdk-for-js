// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApplicationInsightsManagementClient } = require("@azure/arm-appinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of Analytics Items defined within an Application Insights component.
 *
 * @summary gets a list of Analytics Items defined within an Application Insights component.
 * x-ms-original-file: 2015-05-01/AnalyticsItemList.json
 */
async function analyticsItemList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.analyticsItems.list(
    "my-resource-group",
    "my-component",
    "analyticsItems",
  );
  console.log(result);
}

async function main() {
  await analyticsItemList();
}

main().catch(console.error);
