// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AdvisorManagementClient } = require("@azure/arm-advisor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to obtains details of a recommendation for a service group.
 *
 * @summary obtains details of a recommendation for a service group.
 * x-ms-original-file: 2026-08-01-preview/GetRecommendationDetailByServiceGroup.json
 */
async function getRecommendationDetailByServiceGroup() {
  const credential = new DefaultAzureCredential();
  const client = new AdvisorManagementClient(credential);
  const result = await client.recommendations.getByServiceGroup(
    "serviceGroupXYZ",
    "37c93209-4bfb-4f3b-8874-ccc718f7a467",
  );
  console.log(result);
}

async function main() {
  await getRecommendationDetailByServiceGroup();
}

main().catch(console.error);
