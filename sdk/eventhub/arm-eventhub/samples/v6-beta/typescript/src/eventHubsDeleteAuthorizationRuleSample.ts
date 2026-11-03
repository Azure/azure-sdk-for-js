// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an Event Hub AuthorizationRule.
 *
 * @summary deletes an Event Hub AuthorizationRule.
 * x-ms-original-file: 2026-01-01/EventHubs/EHEventHubAuthorizationRuleDelete.json
 */
async function eventHubAuthorizationRuleDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new EventHubManagementClient(credential, subscriptionId);
  await client.eventHubs.deleteAuthorizationRule(
    "ArunMonocle",
    "sdk-Namespace-960",
    "sdk-EventHub-532",
    "sdk-Authrules-2513",
  );
}

async function main(): Promise<void> {
  await eventHubAuthorizationRuleDelete();
}

main().catch(console.error);
