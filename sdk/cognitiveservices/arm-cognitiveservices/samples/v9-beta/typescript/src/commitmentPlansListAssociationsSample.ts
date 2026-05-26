// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the associations of the Cognitive Services commitment plan.
 *
 * @summary gets the associations of the Cognitive Services commitment plan.
 * x-ms-original-file: 2026-01-15-preview/ListSharedCommitmentPlanAssociations.json
 */
async function listCommitmentPlans(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.commitmentPlans.listAssociations(
    "resourceGroupName",
    "commitmentPlanName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listCommitmentPlans();
}

main().catch(console.error);
