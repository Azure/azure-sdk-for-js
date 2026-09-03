// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a Log Analytics QueryPack.
 *
 * @summary deletes a Log Analytics QueryPack.
 * x-ms-original-file: 2025-07-01/QueryPacksDelete.json
 */
async function queryPacksDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "86dc51d3-92ed-4d7e-947a-775ea79b4919";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  await client.queryPacks.delete("my-resource-group", "my-querypack");
}

async function main(): Promise<void> {
  await queryPacksDelete();
}

main().catch(console.error);
