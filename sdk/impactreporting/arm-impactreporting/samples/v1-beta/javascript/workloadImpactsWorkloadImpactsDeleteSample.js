// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ImpactClient } = require("@azure/arm-impactreporting");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a WorkloadImpact
 *
 * @summary delete a WorkloadImpact
 * x-ms-original-file: 2024-05-01-preview/WorkloadImpact_Delete.json
 */
async function deleteWorkloadImpactResourceByNameExample() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ImpactClient(credential, subscriptionId);
  await client.workloadImpacts.delete("impact-001");
}

async function main() {
  await deleteWorkloadImpactResourceByNameExample();
}

main().catch(console.error);
