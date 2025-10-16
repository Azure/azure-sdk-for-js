// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Returns a Cognitive Services commitment plan specified by the parameters.
 *
 * @summary Returns a Cognitive Services commitment plan specified by the parameters.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/GetSharedCommitmentPlan.json
 */
async function getCommitmentPlan() {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "resourceGroupName";
  const commitmentPlanName = "commitmentPlanName";
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.commitmentPlans.getPlan(resourceGroupName, commitmentPlanName);
  console.log(result);
}

async function main() {
  await getCommitmentPlan();
}

main().catch(console.error);
