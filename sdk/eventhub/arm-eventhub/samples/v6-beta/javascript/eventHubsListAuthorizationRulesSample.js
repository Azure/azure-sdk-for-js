// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the authorization rules for an Event Hub.
 *
 * @summary gets the authorization rules for an Event Hub.
 * x-ms-original-file: 2026-01-01/EventHubs/EHEventHubAuthorizationRuleListAll.json
 */
async function eventHubAuthorizationRuleListAll() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.eventHubs.listAuthorizationRules(
    "ArunMonocle",
    "sdk-Namespace-960",
    "sdk-EventHub-532",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await eventHubAuthorizationRuleListAll();
}

main().catch(console.error);
