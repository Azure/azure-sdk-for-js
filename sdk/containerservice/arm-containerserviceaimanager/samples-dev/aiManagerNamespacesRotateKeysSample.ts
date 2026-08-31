// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerserviceaimanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to rotates the namespace-scoped LLM gateway API keys. A new key is generated and installed as `primaryKey`, and the previous `primaryKey` overwrites `secondaryKey` so clients can roll over without downtime. Returns the updated access info.
 *
 * @summary rotates the namespace-scoped LLM gateway API keys. A new key is generated and installed as `primaryKey`, and the previous `primaryKey` overwrites `secondaryKey` so clients can roll over without downtime. Returns the updated access info.
 * x-ms-original-file: 2026-05-02-preview/AIManagerNamespaces_RotateKeys.json
 */
async function aiManagerNamespacesRotateKeys(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.aiManagerNamespaces.rotateKeys(
    "rgaimanagers",
    "aimanager1",
    "namespace-1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await aiManagerNamespacesRotateKeys();
}

main().catch(console.error);
