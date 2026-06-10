// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConnectedKubernetesClient } from "@azure/arm-hybridkubernetes";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list the operations for the provider
 *
 * @summary list the operations for the provider
 * x-ms-original-file: 2026-05-01/ListConnectedClusterOperationsExample.json
 */
async function listConnectedClusterOperationsExample(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConnectedKubernetesClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.get()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listConnectedClusterOperationsExample();
}

main().catch(console.error);
