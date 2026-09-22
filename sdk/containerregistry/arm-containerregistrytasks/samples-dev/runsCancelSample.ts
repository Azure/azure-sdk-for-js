// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryTasksManagementClient } from "@azure/arm-containerregistrytasks";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to cancel an existing run.
 *
 * @summary cancel an existing run.
 * x-ms-original-file: 2025-03-01-preview/RunsCancel.json
 */
async function runsCancel(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new ContainerRegistryTasksManagementClient(credential, subscriptionId);
  await client.runs.cancel("myResourceGroup", "myRegistry", "0accec26-d6de-4757-8e74-d080f38eaaab");
}

async function main(): Promise<void> {
  await runsCancel();
}

main().catch(console.error);
