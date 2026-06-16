// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftDatadogClient } = require("@azure/arm-datadog");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the subscriptions that are being monitored by the Datadog monitor resource
 *
 * @summary updates the subscriptions that are being monitored by the Datadog monitor resource
 * x-ms-original-file: 2025-12-26-preview/MonitoredSubscriptions_Update.json
 */
async function monitorsUpdateMonitoredSubscriptions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftDatadogClient(credential, subscriptionId);
  const result = await client.monitoredSubscriptions.update(
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
          operation: "AddComplete",
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await monitorsUpdateMonitoredSubscriptions();
}

main().catch(console.error);
