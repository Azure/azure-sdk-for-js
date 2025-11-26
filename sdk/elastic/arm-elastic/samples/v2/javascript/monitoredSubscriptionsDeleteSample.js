// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftElastic } = require("@azure/arm-elastic");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Delete subscriptions being monitored by the Elastic monitor resource, removing their observability and monitoring capabilities.
 *
 * @summary Delete subscriptions being monitored by the Elastic monitor resource, removing their observability and monitoring capabilities.
 * x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2025-06-01/examples/MonitoredSubscriptions_Delete.json
 */
async function monitorsDeleteMonitoredSubscriptions() {
  const subscriptionId =
    process.env["ELASTIC_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["ELASTIC_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "myMonitor";
  const configurationName = "default";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.monitoredSubscriptions.beginDeleteAndWait(
    resourceGroupName,
    monitorName,
    configurationName,
  );
  console.log(result);
}

async function main() {
  await monitorsDeleteMonitoredSubscriptions();
}

main().catch(console.error);
