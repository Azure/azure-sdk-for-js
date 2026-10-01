// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AdvisorManagementClient } = require("@azure/arm-advisor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get an existing recommendation by id for an existing Azure Advisor Resiliency Review Id.
 *
 * @summary get an existing recommendation by id for an existing Azure Advisor Resiliency Review Id.
 * x-ms-original-file: 2026-02-01-preview/TriageRecommendationsGet.json
 */
async function getTriageRecommendation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AdvisorManagementClient(credential, subscriptionId);
  const result = await client.triageRecommendations.get(
    "11111111-1111-2222-3333-444444444444",
    "22222222-1111-2222-3333-444444444444",
  );
  console.log(result);
}

async function main() {
  await getTriageRecommendation();
}

main().catch(console.error);
