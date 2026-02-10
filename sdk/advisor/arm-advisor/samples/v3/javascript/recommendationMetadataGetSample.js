// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the metadata entity.
 *
 * @summary Gets the metadata entity.
 * x-ms-original-file: specification/advisor/resource-manager/Microsoft.Advisor/stable/2020-01-01/examples/GetRecommendationMetadataEntity.json
 */

const { AdvisorManagementClient } = require("@azure/arm-advisor");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function getMetadata() {
  const name = "types";
  const credential = new DefaultAzureCredential();
  const client = new AdvisorManagementClient(credential);
  const result = await client.recommendationMetadata.get(name);
  console.log(result);
}

async function main() {
  await getMetadata();
}

main().catch(console.error);
