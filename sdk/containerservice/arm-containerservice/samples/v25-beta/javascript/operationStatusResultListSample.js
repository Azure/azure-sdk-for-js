// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of operations in the specified managedCluster
 *
 * @summary gets a list of operations in the specified managedCluster
 * x-ms-original-file: 2025-10-02-preview/OperationStatusResultList.json
 */
async function listOfOperationStatusResult() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operationStatusResult.list("rg1", "clustername1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listOfOperationStatusResult();
}

main().catch(console.error);
