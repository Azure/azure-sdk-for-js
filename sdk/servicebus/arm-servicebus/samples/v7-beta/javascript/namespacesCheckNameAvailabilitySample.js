// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceBusManagementClient } = require("@azure/arm-servicebus");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to check the give namespace name availability.
 *
 * @summary check the give namespace name availability.
 * x-ms-original-file: 2025-05-01-preview/NameSpaces/SBNameSpaceCheckNameAvailability.json
 */
async function nameSpaceCheckNameAvailability() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.namespaces.checkNameAvailability({
    name: "sdk-Namespace-2924",
  });
  console.log(result);
}

async function main() {
  await nameSpaceCheckNameAvailability();
}

main().catch(console.error);
