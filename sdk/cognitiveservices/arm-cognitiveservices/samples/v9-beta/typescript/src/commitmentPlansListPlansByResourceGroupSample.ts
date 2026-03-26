// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns all the resources of a particular type belonging to a resource group
 *
 * @summary returns all the resources of a particular type belonging to a resource group
 * x-ms-original-file: 2026-01-15-preview/ListSharedCommitmentPlansByResourceGroup.json
 */
async function listCommitmentPlansByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.commitmentPlans.listPlansByResourceGroup("resourceGroupName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listCommitmentPlansByResourceGroup();
}

main().catch(console.error);
