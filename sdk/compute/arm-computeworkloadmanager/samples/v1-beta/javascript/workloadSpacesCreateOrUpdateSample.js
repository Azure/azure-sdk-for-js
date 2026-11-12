// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadManagerClient } = require("@azure/arm-computeworkloadmanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or replaces a workload space.
 *
 * @summary creates or replaces a workload space.
 * x-ms-original-file: 2026-11-01-preview/WorkloadSpaces_CreateOrUpdate.json
 */
async function createAProductionWorkloadSpace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WorkloadManagerClient(credential, subscriptionId);
  const result = await client.workloadSpaces.createOrUpdate("rg-workload", "managed-agents-prod", {
    location: "eastus2",
    tags: { environment: "Production" },
    properties: {},
  });
  console.log(result);
}

async function main() {
  await createAProductionWorkloadSpace();
}

main().catch(console.error);
