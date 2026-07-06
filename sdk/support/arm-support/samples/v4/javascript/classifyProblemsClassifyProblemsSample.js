// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftSupport } = require("@azure/arm-support");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to classify the right problem classifications (categories) available for a specific Azure service.
 *
 * @summary classify the right problem classifications (categories) available for a specific Azure service.
 * x-ms-original-file: 2026-07-01/ClassifyProblemClassificationsForSubscription.json
 */
async function classifyListOfProblemClassificationsForASpecifiedAzureServiceForASubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftSupport(credential, subscriptionId);
  const result = await client.classifyProblems.classifyProblems("serviceId1", {
    issueSummary: "Can not connect to Windows VM",
    resourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rgname/providers/Microsoft.Compute/virtualMachines/vmname",
  });
  console.log(result);
}

async function main() {
  await classifyListOfProblemClassificationsForASpecifiedAzureServiceForASubscription();
}

main().catch(console.error);
