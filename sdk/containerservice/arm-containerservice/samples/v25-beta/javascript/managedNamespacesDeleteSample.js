// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a namespace.
 *
 * @summary deletes a namespace.
 * x-ms-original-file: 2025-10-02-preview/ManagedNamespacesDelete.json
 */
async function deleteManagedNamespace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  await client.managedNamespaces.delete("rg1", "clustername1", "namespace1");
}

async function main() {
  await deleteManagedNamespace();
}

main().catch(console.error);
