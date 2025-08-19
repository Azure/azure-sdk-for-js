// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or update an event source under the specified environment.
 *
 * @summary Create or update an event source under the specified environment.
 * x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/EventSourcesCreateEventHub.json
 */

import type { EventHubEventSourceCreateOrUpdateParameters } from "@azure/arm-timeseriesinsights";
import { TimeSeriesInsightsClient } from "@azure/arm-timeseriesinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createEventHubEventSource(): Promise<void> {
  const subscriptionId = process.env["TIMESERIESINSIGHTS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["TIMESERIESINSIGHTS_RESOURCE_GROUP"] || "rg1";
  const environmentName = "env1";
  const eventSourceName = "es1";
  const parameters: EventHubEventSourceCreateOrUpdateParameters = {
    type: "EarliestAvailable",
    consumerGroupName: "cgn",
    eventHubName: "ehn",
    eventSourceResourceId: "somePathInArm",
    keyName: "managementKey",
    kind: "Microsoft.EventHub",
    localTimestampPropertiesLocalTimestamp: {
      format: "TimeSpan",
      timeZoneOffset: { propertyName: "someEventPropertyName" },
    },
    location: "West US",
    serviceBusNamespace: "sbn",
    sharedAccessKey: "someSecretvalue",
    timestampPropertyName: "someTimestampProperty",
  };
  const credential = new DefaultAzureCredential();
  const client = new TimeSeriesInsightsClient(credential, subscriptionId);
  const result = await client.eventSources.createOrUpdate(
    resourceGroupName,
    environmentName,
    eventSourceName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create or update an event source under the specified environment.
 *
 * @summary Create or update an event source under the specified environment.
 * x-ms-original-file: specification/timeseriesinsights/resource-manager/Microsoft.TimeSeriesInsights/preview/2021-03-31-preview/examples/EventSourcesCreateEventHubWithCustomEnquedTime.json
 */
async function eventSourcesCreateEventHubWithCustomEnquedTime(): Promise<void> {
  const subscriptionId = process.env["TIMESERIESINSIGHTS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["TIMESERIESINSIGHTS_RESOURCE_GROUP"] || "rg1";
  const environmentName = "env1";
  const eventSourceName = "es1";
  const parameters: EventHubEventSourceCreateOrUpdateParameters = {
    type: "CustomEnqueuedTime",
    consumerGroupName: "cgn",
    eventHubName: "ehn",
    eventSourceResourceId: "somePathInArm",
    keyName: "managementKey",
    kind: "Microsoft.EventHub",
    location: "West US",
    serviceBusNamespace: "sbn",
    sharedAccessKey: "someSecretvalue",
    time: "2017-04-01T19:20:33.2288820Z",
    timestampPropertyName: "someTimestampProperty",
  };
  const credential = new DefaultAzureCredential();
  const client = new TimeSeriesInsightsClient(credential, subscriptionId);
  const result = await client.eventSources.createOrUpdate(
    resourceGroupName,
    environmentName,
    eventSourceName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createEventHubEventSource();
  await eventSourcesCreateEventHubWithCustomEnquedTime();
}

main().catch(console.error);
