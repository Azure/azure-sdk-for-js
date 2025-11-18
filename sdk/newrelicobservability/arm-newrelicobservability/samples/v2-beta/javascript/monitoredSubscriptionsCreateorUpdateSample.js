// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NewRelicObservability } = require("@azure/arm-newrelicobservability");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Create a MonitoredSubscriptionProperties
 *
 * @summary Create a MonitoredSubscriptionProperties
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2025-05-01-preview/examples/MonitoredSubscriptions_CreateOrUpdate.json
 */
async function monitorsAddMonitoredSubscriptions() {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["NEWRELICOBSERVABILITY_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "myMonitor";
  const configurationName = "default";
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.monitoredSubscriptions.beginCreateOrUpdateAndWait(
    resourceGroupName,
    monitorName,
    configurationName,
  );
  console.log(result);
}

async function main() {
  await monitorsAddMonitoredSubscriptions();
}

main().catch(console.error);
