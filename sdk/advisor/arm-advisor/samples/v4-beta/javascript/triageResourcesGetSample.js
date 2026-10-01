// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AdvisorManagementClient } = require("@azure/arm-advisor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a triage resource for a given review and recommendation.
 *
 * @summary get a triage resource for a given review and recommendation.
 * x-ms-original-file: 2026-02-01-preview/TriageResourcesGet.json
 */
async function getTriageResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AdvisorManagementClient(credential, subscriptionId);
  const result = await client.triageResources.get(
    "11111111-1111-2222-3333-444444444444",
    "22222222-1111-2222-3333-444444444444",
    "33333333-1111-2222-3333-444444444444",
  );
  console.log(result);
}

async function main() {
  await getTriageResource();
}

main().catch(console.error);
