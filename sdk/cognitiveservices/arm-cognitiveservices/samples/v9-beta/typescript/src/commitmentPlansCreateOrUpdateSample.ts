// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the state of specified commitmentPlans associated with the Cognitive Services account.
 *
 * @summary update the state of specified commitmentPlans associated with the Cognitive Services account.
 * x-ms-original-file: 2026-01-15-preview/PutCommitmentPlan.json
 */
async function putCommitmentPlan(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.commitmentPlans.createOrUpdate(
    "resourceGroupName",
    "accountName",
    "commitmentPlanName",
    {
      properties: {
        autoRenew: true,
        current: { tier: "T1" },
        hostingModel: "Web",
        planType: "Speech2Text",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await putCommitmentPlan();
}

main().catch(console.error);
