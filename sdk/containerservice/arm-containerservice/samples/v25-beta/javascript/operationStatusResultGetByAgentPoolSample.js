// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the status of a specific operation in the specified agent pool.
 *
 * @summary get the status of a specific operation in the specified agent pool.
 * x-ms-original-file: 2025-10-02-preview/OperationStatusResultGetByAgentPool.json
 */
async function getOperationStatusResult() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.operationStatusResult.getByAgentPool(
    "rg1",
    "clustername1",
    "agentpool1",
    "00000000-0000-0000-0000-000000000001",
  );
  console.log(result);
}

async function main() {
  await getOperationStatusResult();
}

main().catch(console.error);
