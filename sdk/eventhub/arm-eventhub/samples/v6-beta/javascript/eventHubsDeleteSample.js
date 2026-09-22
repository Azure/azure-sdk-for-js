// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an Event Hub from the specified Namespace and resource group.
 *
 * @summary deletes an Event Hub from the specified Namespace and resource group.
 * x-ms-original-file: 2026-01-01/EventHubs/EHEventHubDelete.json
 */
async function eventHubDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new EventHubManagementClient(credential, subscriptionId);
  await client.eventHubs.delete("ArunMonocle", "sdk-Namespace-5357", "sdk-EventHub-6547");
}

async function main() {
  await eventHubDelete();
}

main().catch(console.error);
