// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of operations in the specified agent pool.
 *
 * @summary gets a list of operations in the specified agent pool.
 * x-ms-original-file: 2026-06-02-preview/OperationStatusResultListByAgentPool.json
 */
async function listOperationsOnAgentPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operationStatusResult.listByAgentPool(
    "rg1",
    "clustername1",
    "agentpool1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to gets a list of operations in the specified agent pool.
 *
 * @summary gets a list of operations in the specified agent pool.
 * x-ms-original-file: 2026-06-02-preview/OperationStatusResultListByAgentPool_Active.json
 */
async function listActiveOperationsOnAgentPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operationStatusResult.listByAgentPool(
    "rg1",
    "clustername1",
    "agentpool1",
    { activeOnly: true },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listOperationsOnAgentPool();
  await listActiveOperationsOnAgentPool();
}

main().catch(console.error);
