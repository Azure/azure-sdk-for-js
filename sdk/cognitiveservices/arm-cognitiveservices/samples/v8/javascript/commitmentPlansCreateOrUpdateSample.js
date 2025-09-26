// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Update the state of specified commitmentPlans associated with the Cognitive Services account.
 *
 * @summary Update the state of specified commitmentPlans associated with the Cognitive Services account.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/PutCommitmentPlan.json
 */
async function putCommitmentPlan() {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "resourceGroupName";
  const accountName = "accountName";
  const commitmentPlanName = "commitmentPlanName";
  const commitmentPlan = {
    properties: {
      autoRenew: true,
      current: { tier: "T1" },
      hostingModel: "Web",
      planType: "Speech2Text",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.commitmentPlans.createOrUpdate(
    resourceGroupName,
    accountName,
    commitmentPlanName,
    commitmentPlan,
  );
  console.log(result);
}

async function main() {
  await putCommitmentPlan();
}

main().catch(console.error);
