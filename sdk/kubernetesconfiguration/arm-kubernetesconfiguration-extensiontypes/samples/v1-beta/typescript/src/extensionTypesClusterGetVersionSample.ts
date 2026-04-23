// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ExtensionTypesClient } from "@azure/arm-kubernetesconfiguration-extensiontypes";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get details of a version for an Extension Type installable to the cluster.
 *
 * @summary get details of a version for an Extension Type installable to the cluster.
 * x-ms-original-file: 2024-11-01-preview/GetExtensionTypeVersion.json
 */
async function listExtensionTypeVersions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId1";
  const client = new ExtensionTypesClient(credential, subscriptionId);
  const result = await client.extensionTypes.clusterGetVersion(
    "rg1",
    "Microsoft.Kubernetes",
    "connectedClusters",
    "my-cluster",
    "my-extension-type",
    "v1.3.2",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await listExtensionTypeVersions();
}

main().catch(console.error);
