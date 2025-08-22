// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the diagnostics data for a Container App Job.
 *
 * @summary Get the diagnostics data for a Container App Job.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/stable/2025-01-01/examples/Job_GetDetector.json
 */

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getDiagnosticDataForAContainerAppJob(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "f07f3711-b45e-40fe-a941-4e6d93f851e6";
  const resourceGroupName =
    process.env["APPCONTAINERS_RESOURCE_GROUP"] || "mikono-workerapp-test-rg";
  const jobName = "mikonojob1";
  const detectorName = "containerappjobnetworkIO";
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.jobs.getDetector(
    resourceGroupName,
    jobName,
    detectorName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getDiagnosticDataForAContainerAppJob();
}

main().catch(console.error);
