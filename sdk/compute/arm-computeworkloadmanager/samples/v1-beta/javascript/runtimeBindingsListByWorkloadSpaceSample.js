// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadManagerClient } = require("@azure/arm-computeworkloadmanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists runtime bindings in a workload space.
 *
 * @summary lists runtime bindings in a workload space.
 * x-ms-original-file: 2026-11-01-preview/RuntimeBindings_ListByWorkloadSpace.json
 */
async function listRuntimeBindingsInAWorkloadSpace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WorkloadManagerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.runtimeBindings.listByWorkloadSpace(
    "rg-workload",
    "managed-agents-prod",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listRuntimeBindingsInAWorkloadSpace();
}

main().catch(console.error);
