// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AdvisorManagementClient } from "@azure/arm-advisor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to obtains recommendations for a service group.
 *
 * @summary obtains recommendations for a service group.
 * x-ms-original-file: 2026-08-01-preview/ListRecommendationsByServiceGroup.json
 */
async function listRecommendationsByServiceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AdvisorManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.recommendations.listByServiceGroup("serviceGroupXYZ", {
    mode: "all",
    top: 10,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listRecommendationsByServiceGroup();
}

main().catch(console.error);
