// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of machines in the specified agent pool.
 *
 * @summary gets a list of machines in the specified agent pool.
 * x-ms-original-file: 2025-10-02-preview/MachineList.json
 */
async function listMachinesInAnAgentpoolByManagedCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.machines.list("rg1", "clustername1", "agentpool1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listMachinesInAnAgentpoolByManagedCluster();
}

main().catch(console.error);
