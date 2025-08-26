// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Check the give Namespace name availability.
 *
 * @summary Check the give Namespace name availability.
 * x-ms-original-file: specification/eventhub/resource-manager/Microsoft.EventHub/stable/2017-04-01/examples/NameSpaces/EHNameSpaceCheckNameAvailability.json
 */

import type { CheckNameAvailabilityParameter } from "@azure/arm-eventhub-profile-2020-09-01-hybrid";
import { EventHubManagementClient } from "@azure/arm-eventhub-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function namespacesCheckNameAvailability(): Promise<void> {
  const subscriptionId =
    process.env["EVENTHUB_SUBSCRIPTION_ID"] || "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const parameters: CheckNameAvailabilityParameter = {
    name: "sdk-Namespace-8458",
  };
  const credential = new DefaultAzureCredential();
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.namespaces.checkNameAvailability(parameters);
  console.log(result);
}

async function main(): Promise<void> {
  await namespacesCheckNameAvailability();
}

main().catch(console.error);
