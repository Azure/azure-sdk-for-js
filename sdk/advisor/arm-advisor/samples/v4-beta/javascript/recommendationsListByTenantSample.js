// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AdvisorManagementClient } = require("@azure/arm-advisor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to obtains cached recommendations for a subscription. The recommendations are generated or computed by invoking generateRecommendations.
 *
 * @summary obtains cached recommendations for a subscription. The recommendations are generated or computed by invoking generateRecommendations.
 * x-ms-original-file: 2026-02-01-preview/ListRecommendationsServiceGroupResourceUri.json
 */
async function listRecommendationsServiceGroupResourceUri() {
  const credential = new DefaultAzureCredential();
  const client = new AdvisorManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.recommendations.listByTenant(
    "providers/microsoft.management/serviceGroups/serviceGroupXYZ",
    { top: 10 },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listRecommendationsServiceGroupResourceUri();
}

main().catch(console.error);
