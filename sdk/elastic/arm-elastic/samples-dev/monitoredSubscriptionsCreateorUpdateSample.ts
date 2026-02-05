// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftElastic } from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Add subscriptions to be monitored by the Elastic monitor resource, enabling observability and monitoring.
 *
 * @summary Add subscriptions to be monitored by the Elastic monitor resource, enabling observability and monitoring.
 * x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2025-06-01/examples/MonitoredSubscriptions_CreateorUpdate.json
 */
async function monitorsAddMonitoredSubscriptions(): Promise<void> {
  const subscriptionId =
    process.env["ELASTIC_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["ELASTIC_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "myMonitor";
  const configurationName = "default";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.monitoredSubscriptions.beginCreateorUpdateAndWait(
    resourceGroupName,
    monitorName,
    configurationName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await monitorsAddMonitoredSubscriptions();
}

main().catch(console.error);
