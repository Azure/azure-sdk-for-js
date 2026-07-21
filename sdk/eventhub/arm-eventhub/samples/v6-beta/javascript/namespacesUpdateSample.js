// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a namespace. Once created, this namespace's resource manifest is immutable. This operation is idempotent.
 *
 * @summary creates or updates a namespace. Once created, this namespace's resource manifest is immutable. This operation is idempotent.
 * x-ms-original-file: 2026-01-01/NameSpaces/EHNameSpaceUpdate.json
 */
async function namespacesUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "SampleSubscription";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.namespaces.update("ResurceGroupSample", "NamespaceSample", {
    identity: { type: "SystemAssigned, UserAssigned", userAssignedIdentities: {} },
    location: "East US",
  });
  console.log(result);
}

async function main() {
  await namespacesUpdate();
}

main().catch(console.error);
