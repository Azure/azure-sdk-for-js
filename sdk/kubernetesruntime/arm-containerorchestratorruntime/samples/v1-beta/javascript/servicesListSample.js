// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KubernetesRuntimeClient } = require("@azure/arm-containerorchestratorruntime");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list ServiceResource resources by parent
 *
 * @summary list ServiceResource resources by parent
 * x-ms-original-file: 2024-03-01/Services_List.json
 */
async function servicesList() {
  const credential = new DefaultAzureCredential();
  const client = new KubernetesRuntimeClient(credential);
  const resArray = new Array();
  for await (let item of client.services.list(
    "subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/example/providers/Microsoft.Kubernetes/connectedClusters/cluster1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  servicesList();
}

main().catch(console.error);
