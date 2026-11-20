// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AdvisorManagementClient } = require("@azure/arm-advisor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the state of a recommendation for a service group.
 *
 * @summary updates the state of a recommendation for a service group.
 * x-ms-original-file: 2026-08-01-preview/PatchRecommendationStatePropertiesByServiceGroup.json
 */
async function patchRecommendationStatePropertiesByServiceGroup() {
  const credential = new DefaultAzureCredential();
  const client = new AdvisorManagementClient(credential);
  const result = await client.recommendations.updateByServiceGroup(
    "serviceGroupXYZ",
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
  await patchRecommendationStatePropertiesByServiceGroup();
}

main().catch(console.error);
