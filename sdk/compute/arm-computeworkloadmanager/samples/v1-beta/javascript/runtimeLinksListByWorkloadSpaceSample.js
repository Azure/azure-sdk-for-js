// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadManagerClient } = require("@azure/arm-computeworkloadmanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists runtime links in a workload space.
 *
 * @summary lists runtime links in a workload space.
 * x-ms-original-file: 2026-11-01-preview/RuntimeLinks_ListByWorkloadSpace.json
 */
async function listRuntimeLinksInAWorkloadSpace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WorkloadManagerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.runtimeLinks.listByWorkloadSpace(
    "rg-workload",
    "managed-agents-prod",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listRuntimeLinksInAWorkloadSpace();
}

main().catch(console.error);
