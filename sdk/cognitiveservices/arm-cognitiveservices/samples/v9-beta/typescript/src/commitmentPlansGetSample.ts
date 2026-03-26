// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified commitmentPlans associated with the Cognitive Services account.
 *
 * @summary gets the specified commitmentPlans associated with the Cognitive Services account.
 * x-ms-original-file: 2026-01-15-preview/GetCommitmentPlan.json
 */
async function getCommitmentPlan(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.commitmentPlans.get(
    "resourceGroupName",
    "accountName",
    "commitmentPlanName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getCommitmentPlan();
}

main().catch(console.error);
