// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the managed compute deployments associated with the Cognitive Services account.
 *
 * @summary gets the managed compute deployments associated with the Cognitive Services account.
 * x-ms-original-file: 2026-03-15-preview/ListManagedComputeDeployments.json
 */
async function listManagedComputeDeployments(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedComputeDeployments.list(
    "resourceGroupName",
    "accountName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to gets the managed compute deployments associated with the Cognitive Services account.
 *
 * @summary gets the managed compute deployments associated with the Cognitive Services account.
 * x-ms-original-file: 2026-03-15-preview/ListVmManagedComputeDeployments.json
 */
async function listVmManagedComputeDeployments(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedComputeDeployments.list(
    "resourceGroupName",
    "accountName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listManagedComputeDeployments();
  await listVmManagedComputeDeployments();
}

main().catch(console.error);
