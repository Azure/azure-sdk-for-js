// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementClient } from "@azure/arm-hybridcompute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the VM applications installed on a hybrid machine.
 *
 * @summary lists the VM applications installed on a hybrid machine.
 * x-ms-original-file: 2026-09-01/application/VMApplications_List.json
 */
async function listVMApplications(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.vmApplications.list("myResourceGroup", "myMachine", {
    top: 100,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listVMApplications();
}

main().catch(console.error);
