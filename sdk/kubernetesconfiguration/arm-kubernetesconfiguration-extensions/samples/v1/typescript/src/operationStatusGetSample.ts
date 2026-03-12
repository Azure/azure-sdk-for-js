// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KubernetesConfigurationClient } from "@azure/arm-kubernetesconfiguration-extensions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get Async Operation status
 *
 * @summary get Async Operation status
 * x-ms-original-file: 2024-11-01/GetExtensionAsyncOperationStatus.json
 */
async function extensionAsyncOperationStatusGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId1";
  const client = new KubernetesConfigurationClient(credential, subscriptionId);
  const result = await client.operationStatus.get(
    "rg1",
    "Microsoft.Kubernetes",
    "connectedClusters",
    "clusterName1",
    "ClusterMonitor",
    "99999999-9999-9999-9999-999999999999",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await extensionAsyncOperationStatusGet();
}

main().catch(console.error);
