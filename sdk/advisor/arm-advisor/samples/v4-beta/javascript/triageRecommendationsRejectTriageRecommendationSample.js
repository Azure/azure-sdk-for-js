// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AdvisorManagementClient } = require("@azure/arm-advisor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to reject an existing triage recommendation for a given id.
 *
 * @summary reject an existing triage recommendation for a given id.
 * x-ms-original-file: 2026-02-01-preview/TriageRecommendationsReject.json
 */
async function rejectATriageRecommendation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AdvisorManagementClient(credential, subscriptionId);
  await client.triageRecommendations.rejectTriageRecommendation(
    "11111111-1111-2222-3333-444444444444",
    "22222222-1111-2222-3333-444444444444",
    { reasonForRejection: "NotARisk" },
  );
}

async function main() {
  await rejectATriageRecommendation();
}

main().catch(console.error);
