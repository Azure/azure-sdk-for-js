// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ExtensionTypesClient } = require("@azure/arm-kubernetesconfiguration-extensiontypes");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get an Extension Type installable to the cluster based region and type for the cluster.
 *
 * @summary get an Extension Type installable to the cluster based region and type for the cluster.
 * x-ms-original-file: 2024-11-01-preview/GetExtensionType.json
 */
async function getExtensionTypes() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId1";
  const client = new ExtensionTypesClient(credential, subscriptionId);
  const result = await client.extensionTypes.get(
    "rg1",
    "Microsoft.Kubernetes",
    "connectedClusters",
    "my-cluster",
    "my-extension-type",
  );
  console.log(result);
}

async function main() {
  await getExtensionTypes();
}

main().catch(console.error);
