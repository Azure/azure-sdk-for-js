// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KubernetesClient } = require("@azure/arm-hybridkubernetes");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the operations for the provider
 *
 * @summary list the operations for the provider
 * x-ms-original-file: 2024-12-01-preview/ListConnectedClusterOperationsExample.json
 */
async function listConnectedClusterOperationsExample() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new KubernetesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operations.get()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listConnectedClusterOperationsExample();
}

main().catch(console.error);
