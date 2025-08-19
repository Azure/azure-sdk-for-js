// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the access policy with the specified name in the specified environment.
 *
 * @summary Gets the access policy with the specified name in the specified environment.
 * x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/AccessPoliciesGet.json
 */

import { TimeSeriesInsightsClient } from "@azure/arm-timeseriesinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function accessPoliciesGet(): Promise<void> {
  const subscriptionId = process.env["TIMESERIESINSIGHTS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["TIMESERIESINSIGHTS_RESOURCE_GROUP"] || "rg1";
  const environmentName = "env1";
  const accessPolicyName = "ap1";
  const credential = new DefaultAzureCredential();
  const client = new TimeSeriesInsightsClient(credential, subscriptionId);
  const result = await client.accessPolicies.get(
    resourceGroupName,
    environmentName,
    accessPolicyName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await accessPoliciesGet();
}

main().catch(console.error);
