// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AdvisorManagementClient } = require("@azure/arm-advisor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the metadata entity.
 *
 * @summary gets the metadata entity.
 * x-ms-original-file: 2026-02-01-preview/GetRecommendationMetadataEntity.json
 */
async function getMetadata() {
  const credential = new DefaultAzureCredential();
  const client = new AdvisorManagementClient(credential);
  const result = await client.recommendationMetadata.get("types");
  console.log(result);
}

async function main() {
  await getMetadata();
}

main().catch(console.error);
