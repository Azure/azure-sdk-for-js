// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AdvisorManagementClient } from "@azure/arm-advisor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the advisor score.
 *
 * @summary gets the advisor score.
 * x-ms-original-file: 2026-02-01-preview/GetAdvisorScoreDetail.json
 */
async function getAdvisorScoreDetail(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a5481ee1-95df-47d0-85d4-dd3f0dfa19bc";
  const client = new AdvisorManagementClient(credential, subscriptionId);
  const result = await client.advisorScores.get("Cost");
  console.log(result);
}

async function main(): Promise<void> {
  await getAdvisorScoreDetail();
}

main().catch(console.error);
