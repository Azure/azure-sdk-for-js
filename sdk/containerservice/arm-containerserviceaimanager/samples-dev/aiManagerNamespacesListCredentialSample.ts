// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerserviceaimanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the credentials of an AI Manager namespace.
 *
 * @summary lists the credentials of an AI Manager namespace.
 * x-ms-original-file: 2026-05-02-preview/AIManagerNamespaces_ListCredential.json
 */
async function listsTheCredentialsOfAnAIManagerNamespace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.aiManagerNamespaces.listCredential("rg1", "aimanager1", "namespace1");
  console.log(result);
}

async function main(): Promise<void> {
  await listsTheCredentialsOfAnAIManagerNamespace();
}

main().catch(console.error);
