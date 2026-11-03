// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadManagerClient } = require("@azure/arm-computeworkloadmanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists workload spaces in a resource group.
 *
 * @summary lists workload spaces in a resource group.
 * x-ms-original-file: 2026-11-01-preview/WorkloadSpaces_ListByResourceGroup.json
 */
async function listWorkloadSpacesInAResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WorkloadManagerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workloadSpaces.listByResourceGroup("rg-workload")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listWorkloadSpacesInAResourceGroup();
}

main().catch(console.error);
