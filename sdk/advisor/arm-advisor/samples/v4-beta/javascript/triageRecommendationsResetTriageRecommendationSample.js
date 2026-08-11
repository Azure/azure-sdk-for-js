// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AdvisorManagementClient } = require("@azure/arm-advisor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to reset an existing triage recommendation for a given id.
 *
 * @summary reset an existing triage recommendation for a given id.
 * x-ms-original-file: 2026-02-01-preview/TriageRecommendationsReset.json
 */
async function resetATriageRecommendation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AdvisorManagementClient(credential, subscriptionId);
  await client.triageRecommendations.resetTriageRecommendation(
    "11111111-1111-2222-3333-444444444444",
    "22222222-1111-2222-3333-444444444444",
  );
}

async function main() {
  await resetATriageRecommendation();
}

main().catch(console.error);
