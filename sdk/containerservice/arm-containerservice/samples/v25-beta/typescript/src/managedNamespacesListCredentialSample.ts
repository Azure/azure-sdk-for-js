// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the credentials of a namespace.
 *
 * @summary lists the credentials of a namespace.
 * x-ms-original-file: 2025-10-02-preview/ManagedNamespacesListCredentialResult.json
 */
async function listManagedNamespaceCredentials(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.managedNamespaces.listCredential("rg1", "clustername1", "namespace1");
  console.log(result);
}

async function main(): Promise<void> {
  await listManagedNamespaceCredentials();
}

main().catch(console.error);
