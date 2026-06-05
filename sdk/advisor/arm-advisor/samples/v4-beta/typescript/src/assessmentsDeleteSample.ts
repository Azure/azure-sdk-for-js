// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AdvisorManagementClient } from "@azure/arm-advisor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete an existing Azure Advisor assessment.
 *
 * @summary delete an existing Azure Advisor assessment.
 * x-ms-original-file: 2026-02-01-preview/DeleteAssessment.json
 */
async function deleteAssessment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AdvisorManagementClient(credential, subscriptionId);
  await client.assessments.delete("assessment1");
}

async function main(): Promise<void> {
  await deleteAssessment();
}

main().catch(console.error);
