// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates the environment with the specified name in the specified subscription and resource group.
 *
 * @summary Updates the environment with the specified name in the specified subscription and resource group.
 * x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/EnvironmentsPatchTags.json
 */

import type { EnvironmentUpdateParametersUnion } from "@azure/arm-timeseriesinsights";
import { TimeSeriesInsightsClient } from "@azure/arm-timeseriesinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function environmentsUpdate(): Promise<void> {
  const subscriptionId = process.env["TIMESERIESINSIGHTS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["TIMESERIESINSIGHTS_RESOURCE_GROUP"] || "rg1";
  const environmentName = "env1";
  const environmentUpdateParameters: EnvironmentUpdateParametersUnion = {
    kind: "Gen1",
    tags: { someTag: "someTagValue" },
  };
  const credential = new DefaultAzureCredential();
  const client = new TimeSeriesInsightsClient(credential, subscriptionId);
  const result = await client.environments.beginUpdateAndWait(
    resourceGroupName,
    environmentName,
    environmentUpdateParameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await environmentsUpdate();
}

main().catch(console.error);
