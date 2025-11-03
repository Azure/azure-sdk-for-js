// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceBusManagementClient } = require("@azure/arm-servicebus");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an existing namespace. This operation also removes all associated resources under the namespace.
 *
 * @summary deletes an existing namespace. This operation also removes all associated resources under the namespace.
 * x-ms-original-file: 2025-05-01-preview/NameSpaces/SBNameSpaceDelete.json
 */
async function nameSpaceDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  await client.namespaces.delete("ArunMonocle", "sdk-Namespace-3285");
}

async function main() {
  await nameSpaceDelete();
}

main().catch(console.error);
