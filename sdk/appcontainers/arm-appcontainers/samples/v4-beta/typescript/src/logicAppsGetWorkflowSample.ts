// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get workflow information by its name
 *
 * @summary get workflow information by its name
 * x-ms-original-file: 2025-10-02-preview/LogicApps_GetWorkflow.json
 */
async function getAWorkflow(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.logicApps.getWorkflow(
    "examplerg",
    "testcontainerApp0",
    "testcontainerApp0",
    "stateful1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAWorkflow();
}

main().catch(console.error);
