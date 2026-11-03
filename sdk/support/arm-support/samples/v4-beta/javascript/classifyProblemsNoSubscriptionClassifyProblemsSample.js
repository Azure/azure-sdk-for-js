// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftSupport } = require("@azure/arm-support");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to classify the right problem classifications (categories) available for a specific Azure service.
 *
 * @summary classify the right problem classifications (categories) available for a specific Azure service.
 * x-ms-original-file: 2025-06-01-preview/ClassifyProblemClassifications.json
 */
async function classifyListOfProblemClassificationsForASpecifiedAzureService() {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential);
  const result = await client.classifyProblemsNoSubscription.classifyProblems("serviceId1", {
    issueSummary: "Can not connect to Windows VM",
  });
  console.log(result);
}

async function main() {
  await classifyListOfProblemClassificationsForASpecifiedAzureService();
}

main().catch(console.error);
