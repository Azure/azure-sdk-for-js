// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list EdgeMachineJob resources by EdgeMachines
 *
 * @summary list EdgeMachineJob resources by EdgeMachines
 * x-ms-original-file: 2025-12-01-preview/EdgeMachineJobs_List_MaximumSet_Gen.json
 */
async function edgeMachineJobsListMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.edgeMachineJobs.list("ArcInstance-rg", "machine1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await edgeMachineJobsListMaximumSet();
}

main().catch(console.error);
