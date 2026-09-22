// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AdvisorManagementClient } from "@azure/arm-advisor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or Overwrite Azure Advisor assessment.
 *
 * @summary create or Overwrite Azure Advisor assessment.
 * x-ms-original-file: 2026-02-01-preview/PutAssessment.json
 */
async function putAssessment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AdvisorManagementClient(credential, subscriptionId);
  const result = await client.assessments.put("assessment1", {
    workloadId: "f72b7134-800f-4f1b-a5bd-691e2140c7d5",
    typeId: "23513bdb-e8a2-4f0b-8b6b-191ee1f52d34",
    locale: "en-us",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await putAssessment();
}

main().catch(console.error);
