// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to check the give Namespace name availability.
 *
 * @summary check the give Namespace name availability.
 * x-ms-original-file: 2026-01-01/NameSpaces/EHNameSpaceCheckNameAvailability.json
 */
async function namespacesCheckNameAvailability() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.namespaces.checkNameAvailability({ name: "sdk-Namespace-8458" });
  console.log(result);
}

async function main() {
  await namespacesCheckNameAvailability();
}

main().catch(console.error);
