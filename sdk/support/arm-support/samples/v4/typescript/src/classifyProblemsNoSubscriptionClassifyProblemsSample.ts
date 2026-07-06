// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSupport } from "@azure/arm-support";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to classify the right problem classifications (categories) available for a specific Azure service.
 *
 * @summary classify the right problem classifications (categories) available for a specific Azure service.
 * x-ms-original-file: 2026-07-01/ClassifyProblemClassifications.json
 */
async function classifyListOfProblemClassificationsForASpecifiedAzureService(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential);
  const result = await client.classifyProblemsNoSubscription.classifyProblems("serviceId1", {
    issueSummary: "Can not connect to Windows VM",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await classifyListOfProblemClassificationsForASpecifiedAzureService();
}

main().catch(console.error);
