// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the diagnostics data for a Container App Job.
 *
 * @summary get the diagnostics data for a Container App Job.
 * x-ms-original-file: 2025-10-02-preview/Job_GetDetector.json
 */
async function getDiagnosticDataForAContainerAppJob() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "f07f3711-b45e-40fe-a941-4e6d93f851e6";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.jobs.getDetector(
    "mikono-workerapp-test-rg",
    "mikonojob1",
    "containerappjobnetworkIO",
  );
  console.log(result);
}

async function main() {
  await getDiagnosticDataForAContainerAppJob();
}

main().catch(console.error);
