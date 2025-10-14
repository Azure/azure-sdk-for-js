// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Create Cognitive Services commitment plan.
 *
 * @summary Create Cognitive Services commitment plan.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/CreateSharedCommitmentPlan.json
 */
async function createCommitmentPlan() {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "resourceGroupName";
  const commitmentPlanName = "commitmentPlanName";
  const commitmentPlan = {
    kind: "SpeechServices",
    location: "West US",
    properties: {
      autoRenew: true,
      current: { tier: "T1" },
      hostingModel: "Web",
      planType: "STT",
    },
    sku: { name: "S0" },
  };
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.commitmentPlans.beginCreateOrUpdatePlanAndWait(
    resourceGroupName,
    commitmentPlanName,
    commitmentPlan,
  );
  console.log(result);
}

async function main() {
  await createCommitmentPlan();
}

main().catch(console.error);
