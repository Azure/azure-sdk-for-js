// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConnectedKubernetesClient } = require("@azure/arm-hybridkubernetes");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to aPI to enumerate registered connected K8s clusters under a Resource Group
 *
 * @summary aPI to enumerate registered connected K8s clusters under a Resource Group
 * x-ms-original-file: 2026-05-01/GetClustersByResourceGroupExample.json
 */
async function getClustersExample() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1bfbb5d0-917e-4346-9026-1d3b344417f5";
  const client = new ConnectedKubernetesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.connectedClusterOperations.listByResourceGroup("k8sc-rg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getClustersExample();
}

main().catch(console.error);
