// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ExtensionTypesClient } from "@azure/arm-kubernetesconfiguration-extensiontypes";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list the version for an Extension Type installable to the cluster.
 *
 * @summary list the version for an Extension Type installable to the cluster.
 * x-ms-original-file: 2024-11-01-preview/ListExtensionTypeVersions.json
 */
async function listExtensionTypeVersions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId1";
  const client = new ExtensionTypesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.extensionTypes.clusterListVersions(
    "rg1",
    "Microsoft.Kubernetes",
    "connectedClusters",
    "my-cluster",
    "my-extension-type",
    { releaseTrain: "stable", majorVersion: "2", showLatest: true },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listExtensionTypeVersions();
}

main().catch(console.error);
