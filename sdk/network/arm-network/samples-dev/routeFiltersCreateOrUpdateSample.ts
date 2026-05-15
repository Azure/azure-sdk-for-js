// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a route filter in a specified resource group.
 *
 * @summary creates or updates a route filter in a specified resource group.
 * x-ms-original-file: 2025-05-01/RouteFilterCreate.json
 */
async function routeFilterCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.routeFilters.createOrUpdate("rg1", "filterName", {
    location: "West US",
    rules: [
      {
        name: "ruleName",
        access: "Allow",
        communities: ["12076:5030", "12076:5040"],
        routeFilterRuleType: "Community",
      },
    ],
    tags: { key1: "value1" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await routeFilterCreate();
}

main().catch(console.error);
