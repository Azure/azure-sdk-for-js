// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or updates a route filter in a specified resource group.
 *
 * @summary Creates or updates a route filter in a specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/RouteFilterCreate.json
 */
async function routeFilterCreate() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const routeFilterName = "filterName";
  const routeFilterParameters = {
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
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.routeFilters.beginCreateOrUpdateAndWait(
    resourceGroupName,
    routeFilterName,
    routeFilterParameters,
  );
  console.log(result);
}

async function main() {
  await routeFilterCreate();
}

main().catch(console.error);
