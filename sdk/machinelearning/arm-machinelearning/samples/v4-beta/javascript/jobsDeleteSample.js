// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a Job (asynchronous).
 *
 * @summary deletes a Job (asynchronous).
 * x-ms-original-file: 2025-12-01/Job/delete.json
 */
async function deleteJob() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.jobs.delete(
    "test-rg",
    "my-aml-workspace",
    "http://subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/jobs/my-favorite-aml-job",
  );
}

async function main() {
  await deleteJob();
}

main().catch(console.error);
