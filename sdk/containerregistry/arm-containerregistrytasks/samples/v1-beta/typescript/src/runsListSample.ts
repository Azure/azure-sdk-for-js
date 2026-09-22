// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryTasksManagementClient } from "@azure/arm-containerregistrytasks";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all the runs for a registry.
 *
 * @summary gets all the runs for a registry.
 * x-ms-original-file: 2025-03-01-preview/RunsList.json
 */
async function runsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new ContainerRegistryTasksManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.runs.list("myResourceGroup", "myRegistry", {
    filter: "",
    top: 10,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await runsList();
}

main().catch(console.error);
