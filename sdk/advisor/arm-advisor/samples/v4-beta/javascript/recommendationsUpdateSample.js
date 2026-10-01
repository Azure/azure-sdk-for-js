// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AdvisorManagementClient } = require("@azure/arm-advisor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update the state of a Recommendation
 *
 * @summary update the state of a Recommendation
 * x-ms-original-file: 2026-02-01-preview/PatchRecommendationStateProperties.json
 */
async function patchRecommendationStateProperties() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a5481ee1-95df-47d0-85d4-dd3f0dfa19bc";
  const client = new AdvisorManagementClient(credential, subscriptionId);
  const result = await client.recommendations.update(
    "2e7c72b2d7987ec224a1ebae03398b0fbdaa9a5a6a762e6fcf1c806599744b45",
    {
      properties: {
        recommendationStatus: "Postponed",
        postponedUntilDateTime: new Date("2024-09-01T00:00:00Z"),
        recommendationDismissReason: "NotRelevant",
      },
    },
  );
  console.log(result);
}

async function main() {
  await patchRecommendationStateProperties();
}

main().catch(console.error);
