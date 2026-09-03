// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ExtensionsClient } = require("@azure/arm-kubernetesconfiguration-extensions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get Async Operation status
 *
 * @summary get Async Operation status
 * x-ms-original-file: 2025-03-01/GetExtensionAsyncOperationStatus.json
 */
async function extensionAsyncOperationStatusGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId1";
  const client = new ExtensionsClient(credential, subscriptionId);
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

async function main() {
  await extensionAsyncOperationStatusGet();
}

main().catch(console.error);
