// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to terminates execution of a running container apps job
 *
 * @summary terminates execution of a running container apps job
 * x-ms-original-file: 2025-10-02-preview/Job_Stop_Execution.json
 */
async function terminateAContainerAppsJob(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  await client.jobs.stopExecution("rg", "testcontainerAppsJob0", "jobExecution1");
}

async function main(): Promise<void> {
  await terminateAContainerAppsJob();
}

main().catch(console.error);
