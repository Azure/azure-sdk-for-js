// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a route in the specified route filter.
 *
 * @summary creates or updates a route in the specified route filter.
 * x-ms-original-file: 2025-05-01/RouteFilterRuleCreate.json
 */
async function routeFilterRuleCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.routeFilterRules.createOrUpdate("rg1", "filterName", "ruleName", {
    access: "Allow",
    communities: ["12076:5030", "12076:5040"],
    routeFilterRuleType: "Community",
  });
  console.log(result);
}

async function main() {
  await routeFilterRuleCreate();
}

main().catch(console.error);
