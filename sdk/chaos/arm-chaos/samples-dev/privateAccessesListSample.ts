// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementClient } from "@azure/arm-chaos";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a list of private access resources in a resource group.
 *
 * @summary get a list of private access resources in a resource group.
 * x-ms-original-file: 2026-05-01-preview/PrivateAccesses_List.json
 */
async function listAllPrivateAccessInAResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateAccesses.list("myResourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllPrivateAccessInAResourceGroup();
}

main().catch(console.error);
