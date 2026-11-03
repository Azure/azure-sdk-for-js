// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadManagerClient } = require("@azure/arm-computeworkloadmanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists capabilities in a workload space.
 *
 * @summary lists capabilities in a workload space.
 * x-ms-original-file: 2026-11-01-preview/Capabilities_ListByWorkloadSpace.json
 */
async function listCapabilitiesInAWorkloadSpace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WorkloadManagerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.capabilities.listByWorkloadSpace(
    "rg-workload",
    "managed-agents-prod",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listCapabilitiesInAWorkloadSpace();
}

main().catch(console.error);
