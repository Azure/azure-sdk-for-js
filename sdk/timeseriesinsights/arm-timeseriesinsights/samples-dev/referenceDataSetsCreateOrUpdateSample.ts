// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ReferenceDataSetCreateOrUpdateParameters } from "@azure/arm-timeseriesinsights";
import { TimeSeriesInsightsClient } from "@azure/arm-timeseriesinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create or update a reference data set in the specified environment.
 *
 * @summary Create or update a reference data set in the specified environment.
 * x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/ReferenceDataSetsCreate.json
 */
async function referenceDataSetsCreate(): Promise<void> {
  const subscriptionId = process.env["TIMESERIESINSIGHTS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["TIMESERIESINSIGHTS_RESOURCE_GROUP"] || "rg1";
  const environmentName = "env1";
  const referenceDataSetName = "rds1";
  const parameters: ReferenceDataSetCreateOrUpdateParameters = {
    keyProperties: [
      { name: "DeviceId1", type: "String" },
      { name: "DeviceFloor", type: "Double" },
    ],
    location: "West US",
  };
  const credential = new DefaultAzureCredential();
  const client = new TimeSeriesInsightsClient(credential, subscriptionId);
  const result = await client.referenceDataSets.createOrUpdate(
    resourceGroupName,
    environmentName,
    referenceDataSetName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await referenceDataSetsCreate();
}

main().catch(console.error);
