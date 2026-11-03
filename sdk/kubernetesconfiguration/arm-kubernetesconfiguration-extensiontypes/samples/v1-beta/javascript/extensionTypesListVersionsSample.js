// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ExtensionTypesClient } = require("@azure/arm-kubernetesconfiguration-extensiontypes");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the versions for an extension type and location.
 *
 * @summary list the versions for an extension type and location.
 * x-ms-original-file: 2024-11-01-preview/ListExtensionTypeVersionsByLocation.json
 */
async function listExtensionTypeVersions() {
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

async function main() {
  await listExtensionTypeVersions();
}

main().catch(console.error);
