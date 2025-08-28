// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a specific Analytics Items defined within an Application Insights component.
 *
 * @summary Gets a specific Analytics Items defined within an Application Insights component.
 * x-ms-original-file: specification/applicationinsights/resource-manager/Microsoft.Insights/stable/2015-05-01/examples/AnalyticsItemGet.json
 */

import {
  AnalyticsItemsGetOptionalParams,
  ApplicationInsightsManagementClient,
} from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function analyticsItemGet(): Promise<void> {
  const subscriptionId =
    process.env["APPLICATIONINSIGHTS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName =
    process.env["APPLICATIONINSIGHTS_RESOURCE_GROUP"] || "my-resource-group";
  const resourceName = "my-component";
  const scopePath = "analyticsItems";
  const id = "3466c160-4a10-4df8-afdf-0007f3f6dee5";
  const options: AnalyticsItemsGetOptionalParams = { id };
  const credential = new DefaultAzureCredential();
  const client = new ApplicationInsightsManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.analyticsItems.get(
    resourceGroupName,
    resourceName,
    scopePath,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await analyticsItemGet();
}

main().catch(console.error);
