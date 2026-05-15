// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified rule from a route filter.
 *
 * @summary deletes the specified rule from a route filter.
 * x-ms-original-file: 2025-05-01/RouteFilterRuleDelete.json
 */
async function routeFilterRuleDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.routeFilterRules.delete("rg1", "filterName", "ruleName");
}

async function main() {
  await routeFilterRuleDelete();
}

main().catch(console.error);
