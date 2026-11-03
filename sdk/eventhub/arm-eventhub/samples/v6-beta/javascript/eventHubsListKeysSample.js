// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the ACS and SAS connection strings for the Event Hub.
 *
 * @summary gets the ACS and SAS connection strings for the Event Hub.
 * x-ms-original-file: 2026-01-01/EventHubs/EHEventHubAuthorizationRuleListKey.json
 */
async function eventHubAuthorizationRuleListKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.eventHubs.listKeys(
    "ArunMonocle",
    "sdk-namespace-960",
    "sdk-EventHub-532",
    "sdk-Authrules-2513",
  );
  console.log(result);
}

async function main() {
  await eventHubAuthorizationRuleListKey();
}

main().catch(console.error);
