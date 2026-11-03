// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftDatadogClient } from "@azure/arm-datadog";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to add the subscriptions that should be monitored by the Datadog monitor resource.
 *
 * @summary add the subscriptions that should be monitored by the Datadog monitor resource.
 * x-ms-original-file: 2025-12-26-preview/MonitoredSubscriptions_CreateorUpdate.json
 */
async function monitorsAddMonitoredSubscriptions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftDatadogClient(credential, subscriptionId);
  const result = await client.monitoredSubscriptions.createorUpdate(
    "myResourceGroup",
    "myMonitor",
    "default",
    {
      body: {
        properties: {
          monitoredSubscriptionList: [
            {
              status: "Active",
              subscriptionId: "/subscriptions/00000000-0000-0000-0000-000000000000",
              tagRules: {
                automuting: true,
                logRules: {
                  filteringTags: [
                    { name: "Environment", action: "Include", value: "Prod" },
                    { name: "Environment", action: "Exclude", value: "Dev" },
                  ],
                  sendAadLogs: false,
                  sendResourceLogs: true,
                  sendSubscriptionLogs: true,
                },
                metricRules: { filteringTags: [] },
              },
            },
            {
              status: "Failed",
              subscriptionId: "/subscriptions/00000000-0000-0000-0000-000000000001",
              tagRules: {
                automuting: true,
                logRules: {
                  filteringTags: [
                    { name: "Environment", action: "Include", value: "Prod" },
                    { name: "Environment", action: "Exclude", value: "Dev" },
                  ],
                  sendAadLogs: false,
                  sendResourceLogs: true,
                  sendSubscriptionLogs: true,
                },
                metricRules: { filteringTags: [] },
              },
            },
          ],
          operation: "AddBegin",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await monitorsAddMonitoredSubscriptions();
}

main().catch(console.error);
