// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerserviceaimanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a AIManagerNamespace
 *
 * @summary delete a AIManagerNamespace
 * x-ms-original-file: 2026-05-02-preview/AIManagerNamespaces_Delete.json
 */
async function deletesAnAIManagerNamespaceResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  await client.aiManagerNamespaces.delete("rg1", "aimanager1", "namespace1");
}

async function main(): Promise<void> {
  await deletesAnAIManagerNamespaceResource();
}

main().catch(console.error);
