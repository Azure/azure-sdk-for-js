// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AdvisorManagementClient } from "@azure/arm-advisor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the list of metadata entities.
 *
 * @summary gets the list of metadata entities.
 * x-ms-original-file: 2026-02-01-preview/ListRecommendationMetadata.json
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
