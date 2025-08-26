// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all the available environments associated with the subscription and within the specified resource group.
 *
 * @summary Lists all the available environments associated with the subscription and within the specified resource group.
 * x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/EnvironmentsListByResourceGroup.json
 */

import { TimeSeriesInsightsClient } from "@azure/arm-timeseriesinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function environmentsByResourceGroup(): Promise<void> {
  const subscriptionId = process.env["TIMESERIESINSIGHTS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["TIMESERIESINSIGHTS_RESOURCE_GROUP"] || "rg1";
  const credential = new DefaultAzureCredential();
  const client = new TimeSeriesInsightsClient(credential, subscriptionId);
  const result = await client.environments.listByResourceGroup(resourceGroupName);
  console.log(result);
}

async function main(): Promise<void> {
  await environmentsByResourceGroup();
}

main().catch(console.error);
