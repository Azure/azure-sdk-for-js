// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftDatadogClient } = require("@azure/arm-datadog");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the subscriptions that are being monitored by the Datadog monitor resource
 *
 * @summary updates the subscriptions that are being monitored by the Datadog monitor resource
 * x-ms-original-file: 2025-12-26-preview/MonitoredSubscriptions_Delete.json
 */
async function monitorsDeleteMonitoredSubscriptions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftDatadogClient(credential, subscriptionId);
  await client.monitoredSubscriptions.delete("myResourceGroup", "myMonitor", "default");
}

async function main() {
  await monitorsDeleteMonitoredSubscriptions();
}

main().catch(console.error);
