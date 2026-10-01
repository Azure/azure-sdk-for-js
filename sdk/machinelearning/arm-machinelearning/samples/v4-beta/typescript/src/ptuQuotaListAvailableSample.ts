// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list available MaaS PTU quota.
 *
 * @summary list available MaaS PTU quota.
 * x-ms-original-file: 2026-03-15-preview/PTUQuota/listAvailable.json
 */
async function listAvailableMaaSPTUQuota(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.ptuQuota.listAvailable("location")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAvailableMaaSPTUQuota();
}

main().catch(console.error);
