// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes the reference data set with the specified name in the specified subscription, resource group, and environment
 *
 * @summary Deletes the reference data set with the specified name in the specified subscription, resource group, and environment
 * x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/ReferenceDataSetsDelete.json
 */

import { TimeSeriesInsightsClient } from "@azure/arm-timeseriesinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function referenceDataSetsDelete(): Promise<void> {
  const subscriptionId = process.env["TIMESERIESINSIGHTS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["TIMESERIESINSIGHTS_RESOURCE_GROUP"] || "rg1";
  const environmentName = "env1";
  const referenceDataSetName = "rds1";
  const credential = new DefaultAzureCredential();
  const client = new TimeSeriesInsightsClient(credential, subscriptionId);
  const result = await client.referenceDataSets.delete(
    resourceGroupName,
    environmentName,
    referenceDataSetName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await referenceDataSetsDelete();
}

main().catch(console.error);
