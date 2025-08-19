// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a list of all private endpoint connections in the given environment.
 *
 * @summary Gets a list of all private endpoint connections in the given environment.
 * x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/PrivateEndpointConnectionsListByEnvironment.json
 */

import { TimeSeriesInsightsClient } from "@azure/arm-timeseriesinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listPrivateEndpointConnectionsByService(): Promise<void> {
  const subscriptionId = process.env["TIMESERIESINSIGHTS_SUBSCRIPTION_ID"] || "mySubscriptionId";
  const resourceGroupName = process.env["TIMESERIESINSIGHTS_RESOURCE_GROUP"] || "myResourceGroup";
  const environmentName = "myEnvironment";
  const credential = new DefaultAzureCredential();
  const client = new TimeSeriesInsightsClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.listByEnvironment(
    resourceGroupName,
    environmentName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await listPrivateEndpointConnectionsByService();
}

main().catch(console.error);
