// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AdvisorManagementClient } from "@azure/arm-advisor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get an existing recommendation by id for an existing Azure Advisor Resiliency Review Id.
 *
 * @summary get an existing recommendation by id for an existing Azure Advisor Resiliency Review Id.
 * x-ms-original-file: 2026-02-01-preview/TriageRecommendationsGet.json
 */
async function getTriageRecommendation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AdvisorManagementClient(credential, subscriptionId);
  const result = await client.triageRecommendations.get(
    "11111111-1111-2222-3333-444444444444",
    "22222222-1111-2222-3333-444444444444",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getTriageRecommendation();
}

main().catch(console.error);
