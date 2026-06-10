// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApplicationInsightsManagementClient } = require("@azure/arm-appinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a specific Analytics Items defined within an Application Insights component.
 *
 * @summary deletes a specific Analytics Items defined within an Application Insights component.
 * x-ms-original-file: 2015-05-01/AnalyticsItemDelete.json
 */
async function analyticsItemDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  await client.analyticsItems.delete("my-resource-group", "my-component", "analyticsItems", {
    id: "3466c160-4a10-4df8-afdf-0007f3f6dee5",
  });
}

async function main() {
  await analyticsItemDelete();
}

main().catch(console.error);
