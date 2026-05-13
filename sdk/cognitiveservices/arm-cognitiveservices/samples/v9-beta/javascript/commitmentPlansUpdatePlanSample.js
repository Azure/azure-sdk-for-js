// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create Cognitive Services commitment plan.
 *
 * @summary create Cognitive Services commitment plan.
 * x-ms-original-file: 2026-01-15-preview/UpdateSharedCommitmentPlan.json
 */
async function createCommitmentPlan() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.commitmentPlans.updatePlan(
    "resourceGroupName",
    "commitmentPlanName",
    { tags: { name: "value" } },
  );
  console.log(result);
}

async function main() {
  await createCommitmentPlan();
}

main().catch(console.error);
