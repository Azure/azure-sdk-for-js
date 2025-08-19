// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AdvisorManagementClient } from "@azure/arm-advisor";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the list of metadata entities.
 *
 * @summary Gets the list of metadata entities.
 * x-ms-original-file: specification/advisor/resource-manager/Microsoft.Advisor/stable/2020-01-01/examples/ListRecommendationMetadata.json
 */
async function getMetadata(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AdvisorManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.recommendationMetadata.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getMetadata();
}

main().catch(console.error);
