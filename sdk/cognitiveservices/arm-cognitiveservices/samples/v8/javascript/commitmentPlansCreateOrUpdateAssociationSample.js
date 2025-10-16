// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Create or update the association of the Cognitive Services commitment plan.
 *
 * @summary Create or update the association of the Cognitive Services commitment plan.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/CreateSharedCommitmentPlanAssociation.json
 */
async function putCommitmentPlan() {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "resourceGroupName";
  const commitmentPlanName = "commitmentPlanName";
  const commitmentPlanAssociationName = "commitmentPlanAssociationName";
  const association = {
    accountId:
      "/subscriptions/subscriptionId/resourceGroups/resourceGroupName/providers/Microsoft.CognitiveServices/accounts/accountName",
  };
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.commitmentPlans.beginCreateOrUpdateAssociationAndWait(
    resourceGroupName,
    commitmentPlanName,
    commitmentPlanAssociationName,
    association,
  );
  console.log(result);
}

async function main() {
  await putCommitmentPlan();
}

main().catch(console.error);
