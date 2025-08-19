// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a list of all supported private link resource types for the given environment.
 *
 * @summary Gets a list of all supported private link resource types for the given environment.
 * x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/PrivateLinkResourcesGet.json
 */

import { TimeSeriesInsightsClient } from "@azure/arm-timeseriesinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listSupportedPrivateLinkResources(): Promise<void> {
  const subscriptionId = process.env["TIMESERIESINSIGHTS_SUBSCRIPTION_ID"] || "mySubscriptionId";
  const resourceGroupName = process.env["TIMESERIESINSIGHTS_RESOURCE_GROUP"] || "myResourceGroup";
  const environmentName = "myEnvironment";
  const credential = new DefaultAzureCredential();
  const client = new TimeSeriesInsightsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateLinkResources.listSupported(
    resourceGroupName,
    environmentName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listSupportedPrivateLinkResources();
}

main().catch(console.error);
