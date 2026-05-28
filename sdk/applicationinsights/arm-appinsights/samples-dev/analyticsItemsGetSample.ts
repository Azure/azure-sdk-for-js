// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementClient } from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a specific Analytics Items defined within an Application Insights component.
 *
 * @summary gets a specific Analytics Items defined within an Application Insights component.
 * x-ms-original-file: 2015-05-01/AnalyticsItemGet.json
 */
async function analyticsItemGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.analyticsItems.get(
    "my-resource-group",
    "my-component",
    "analyticsItems",
    { id: "3466c160-4a10-4df8-afdf-0007f3f6dee5" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await analyticsItemGet();
}

main().catch(console.error);
