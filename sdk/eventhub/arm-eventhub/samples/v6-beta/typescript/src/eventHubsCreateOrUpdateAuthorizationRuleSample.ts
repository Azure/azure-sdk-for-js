// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an AuthorizationRule for the specified Event Hub. Creation/update of the AuthorizationRule will take a few seconds to take effect.
 *
 * @summary creates or updates an AuthorizationRule for the specified Event Hub. Creation/update of the AuthorizationRule will take a few seconds to take effect.
 * x-ms-original-file: 2026-01-01/EventHubs/EHEventHubAuthorizationRuleCreate.json
 */
async function eventHubAuthorizationRuleCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.eventHubs.createOrUpdateAuthorizationRule(
    "ArunMonocle",
    "sdk-Namespace-960",
    "sdk-EventHub-532",
    "sdk-Authrules-2513",
    { rights: ["Listen", "Send"] },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await eventHubAuthorizationRuleCreate();
}

main().catch(console.error);
