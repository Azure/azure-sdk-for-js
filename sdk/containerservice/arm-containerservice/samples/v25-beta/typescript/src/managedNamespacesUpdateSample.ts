// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates tags on a managed namespace.
 *
 * @summary updates tags on a managed namespace.
 * x-ms-original-file: 2025-10-02-preview/ManagedNamespacesUpdateTags.json
 */
async function updateManagedNamespaceTags(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.managedNamespaces.update("rg1", "clustername1", "namespace1", {
    tags: { tagKey1: "tagValue1", tagKey2: "tagValue2" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateManagedNamespaceTags();
}

main().catch(console.error);
