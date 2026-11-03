// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to check the give Namespace name availability.
 *
 * @summary check the give Namespace name availability.
 * x-ms-original-file: 2026-01-01/NameSpaces/EHNameSpaceCheckNameAvailability.json
 */
async function namespacesCheckNameAvailability(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.namespaces.checkNameAvailability({ name: "sdk-Namespace-8458" });
  console.log(result);
}

async function main(): Promise<void> {
  await namespacesCheckNameAvailability();
}

main().catch(console.error);
