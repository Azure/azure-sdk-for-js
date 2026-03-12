// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the metadata entity.
 *
 * @summary Gets the metadata entity.
 * x-ms-original-file: specification/advisor/resource-manager/Microsoft.Advisor/stable/2020-01-01/examples/GetRecommendationMetadataEntity.json
 */

import { AdvisorManagementClient } from "@azure/arm-advisor";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getMetadata(): Promise<void> {
  const name = "types";
  const credential = new DefaultAzureCredential();
  const client = new AdvisorManagementClient(credential);
  const result = await client.recommendationMetadata.get(name);
  console.log(result);
}

async function main(): Promise<void> {
  await getMetadata();
}

main().catch(console.error);
