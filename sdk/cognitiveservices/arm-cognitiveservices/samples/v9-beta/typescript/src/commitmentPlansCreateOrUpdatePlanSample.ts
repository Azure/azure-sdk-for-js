// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create Cognitive Services commitment plan.
 *
 * @summary create Cognitive Services commitment plan.
 * x-ms-original-file: 2026-01-15-preview/CreateSharedCommitmentPlan.json
 */
async function createCommitmentPlan(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.commitmentPlans.createOrUpdatePlan(
    "resourceGroupName",
    "commitmentPlanName",
    {
      kind: "SpeechServices",
      location: "West US",
      properties: {
        autoRenew: true,
        current: { tier: "T1" },
        hostingModel: "Web",
        planType: "STT",
      },
      sku: { name: "S0" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createCommitmentPlan();
}

main().catch(console.error);
