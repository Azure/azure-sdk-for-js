// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ExtensionTypesClient } from "@azure/arm-kubernetesconfiguration-extensiontypes";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list the versions for an extension type and location.
 *
 * @summary list the versions for an extension type and location.
 * x-ms-original-file: 2024-11-01-preview/ListExtensionTypeVersionsByLocation.json
 */
async function listExtensionTypeVersions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId1";
  const client = new ExtensionTypesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.extensionTypes.listVersions("westus", "extensionType1", {
    releaseTrain: "stable",
    clusterType: "connectedCluster",
    majorVersion: "2",
    showLatest: true,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listExtensionTypeVersions();
}

main().catch(console.error);
