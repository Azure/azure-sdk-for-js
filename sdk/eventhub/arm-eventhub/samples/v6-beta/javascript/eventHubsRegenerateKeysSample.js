// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to regenerates the ACS and SAS connection strings for the Event Hub.
 *
 * @summary regenerates the ACS and SAS connection strings for the Event Hub.
 * x-ms-original-file: 2026-01-01/EventHubs/EHEventHubAuthorizationRuleRegenerateKey.json
 */
async function eventHubAuthorizationRuleRegenerateKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.eventHubs.regenerateKeys(
    "ArunMonocle",
    "sdk-namespace-960",
    "sdk-EventHub-532",
    "sdk-Authrules-1534",
    { keyType: "PrimaryKey" },
  );
  console.log(result);
}

async function main() {
  await eventHubAuthorizationRuleRegenerateKey();
}

main().catch(console.error);
