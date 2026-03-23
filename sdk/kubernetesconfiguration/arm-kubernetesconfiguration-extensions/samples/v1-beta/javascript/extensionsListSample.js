// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ExtensionsClient } = require("@azure/arm-kubernetesconfiguration-extensions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all Extensions in the cluster.
 *
 * @summary list all Extensions in the cluster.
 * x-ms-original-file: 2024-11-01/ListExtensions.json
 */
async function listExtensions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId1";
  const client = new ExtensionsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.extensions.list(
    "rg1",
    "Microsoft.Kubernetes",
    "connectedClusters",
    "clusterName1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listExtensions();
}

main().catch(console.error);
