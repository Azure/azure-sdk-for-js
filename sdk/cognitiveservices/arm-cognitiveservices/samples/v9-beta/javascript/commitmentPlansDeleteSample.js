// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified commitmentPlan associated with the Cognitive Services account.
 *
 * @summary deletes the specified commitmentPlan associated with the Cognitive Services account.
 * x-ms-original-file: 2026-01-15-preview/DeleteCommitmentPlan.json
 */
async function deleteCommitmentPlan() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.commitmentPlans.delete("resourceGroupName", "accountName", "commitmentPlanName");
}

async function main() {
  await deleteCommitmentPlan();
}

main().catch(console.error);
