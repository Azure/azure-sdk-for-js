// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AdvisorManagementClient } = require("@azure/arm-advisor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the list of metadata entities.
 *
 * @summary gets the list of metadata entities.
 * x-ms-original-file: 2026-02-01-preview/ListRecommendationMetadata.json
 */
async function getMetadata() {
  const credential = new DefaultAzureCredential();
  const client = new AdvisorManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.recommendationMetadata.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getMetadata();
}

main().catch(console.error);
