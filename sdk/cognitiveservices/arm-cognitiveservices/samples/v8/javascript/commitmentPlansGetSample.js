// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets the specified commitmentPlans associated with the Cognitive Services account.
 *
 * @summary Gets the specified commitmentPlans associated with the Cognitive Services account.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/GetCommitmentPlan.json
 */
async function getCommitmentPlan() {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "resourceGroupName";
  const accountName = "accountName";
  const commitmentPlanName = "commitmentPlanName";
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.commitmentPlans.get(
    resourceGroupName,
    accountName,
    commitmentPlanName,
  );
  console.log(result);
}

async function main() {
  await getCommitmentPlan();
}

main().catch(console.error);
