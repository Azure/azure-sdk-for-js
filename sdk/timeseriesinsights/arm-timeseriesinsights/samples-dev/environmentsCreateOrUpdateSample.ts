// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or update an environment in the specified subscription and resource group.
 *
 * @summary Create or update an environment in the specified subscription and resource group.
 * x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/EnvironmentsCreate.json
 */

import type { Gen1EnvironmentCreateOrUpdateParameters } from "@azure/arm-timeseriesinsights";
import { TimeSeriesInsightsClient } from "@azure/arm-timeseriesinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function environmentsCreate(): Promise<void> {
  const subscriptionId = process.env["TIMESERIESINSIGHTS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["TIMESERIESINSIGHTS_RESOURCE_GROUP"] || "rg1";
  const environmentName = "env1";
  const parameters: Gen1EnvironmentCreateOrUpdateParameters = {
    dataRetentionTime: "P31D",
    kind: "Gen1",
    location: "West US",
    partitionKeyProperties: [{ name: "DeviceId1", type: "String" }],
    sku: { name: "S1", capacity: 1 },
  };
  const credential = new DefaultAzureCredential();
  const client = new TimeSeriesInsightsClient(credential, subscriptionId);
  const result = await client.environments.beginCreateOrUpdateAndWait(
    resourceGroupName,
    environmentName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await environmentsCreate();
}

main().catch(console.error);
