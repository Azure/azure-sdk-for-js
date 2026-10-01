// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns a Log Analytics QueryPack.
 *
 * @summary returns a Log Analytics QueryPack.
 * x-ms-original-file: 2025-07-01/QueryPacksGet.json
 */
async function queryPackGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "86dc51d3-92ed-4d7e-947a-775ea79b4919";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.queryPacks.get("my-resource-group", "my-querypack");
  console.log(result);
}

async function main(): Promise<void> {
  await queryPackGet();
}

main().catch(console.error);
