// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the list of metadata entities.
 *
 * @summary Gets the list of metadata entities.
 * x-ms-original-file: specification/advisor/resource-manager/Microsoft.Advisor/stable/2020-01-01/examples/ListRecommendationMetadata.json
 */

const { AdvisorManagementClient } = require("@azure/arm-advisor");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

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
