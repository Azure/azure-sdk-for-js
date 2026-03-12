// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Terminates execution of a running container apps job
 *
 * @summary Terminates execution of a running container apps job
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/ContainerApps/stable/2025-07-01/examples/Job_Stop_Execution.json
 */
async function terminateAContainerAppsJob(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPCONTAINERS_RESOURCE_GROUP"] || "rg";
  const jobName = "testcontainerappsjob0";
  const jobExecutionName = "jobExecution1";
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.jobs.beginStopExecutionAndWait(
    resourceGroupName,
    jobName,
    jobExecutionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await terminateAContainerAppsJob();
}

main().catch(console.error);
