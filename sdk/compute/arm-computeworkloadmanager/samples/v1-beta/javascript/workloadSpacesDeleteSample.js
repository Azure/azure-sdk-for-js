// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadManagerClient } = require("@azure/arm-computeworkloadmanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a workload space and its owned resources.
 *
 * @summary deletes a workload space and its owned resources.
 * x-ms-original-file: 2026-11-01-preview/WorkloadSpaces_Delete.json
 */
async function deleteAWorkloadSpace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WorkloadManagerClient(credential, subscriptionId);
  await client.workloadSpaces.delete("rg-workload", "managed-agents-prod");
}

async function main() {
  await deleteAWorkloadSpace();
}

main().catch(console.error);
