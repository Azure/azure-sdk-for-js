// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConnectedKubernetesClient } = require("@azure/arm-hybridkubernetes");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the operations for the provider
 *
 * @summary list the operations for the provider
 * x-ms-original-file: 2026-05-01/ListConnectedClusterOperationsExample.json
 */
async function listConnectedClusterOperationsExample() {
  const credential = new DefaultAzureCredential();
  const client = new ConnectedKubernetesClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listConnectedClusterOperationsExample();
}

main().catch(console.error);
