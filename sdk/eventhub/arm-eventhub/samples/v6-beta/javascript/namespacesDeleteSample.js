// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an existing namespace. This operation also removes all associated resources under the namespace.
 *
 * @summary deletes an existing namespace. This operation also removes all associated resources under the namespace.
 * x-ms-original-file: 2026-01-01/NameSpaces/EHNameSpaceDelete.json
 */
async function nameSpaceDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "SampleSubscription";
  const client = new EventHubManagementClient(credential, subscriptionId);
  await client.namespaces.delete("ResurceGroupSample", "NamespaceSample");
}

async function main() {
  await nameSpaceDelete();
}

main().catch(console.error);
