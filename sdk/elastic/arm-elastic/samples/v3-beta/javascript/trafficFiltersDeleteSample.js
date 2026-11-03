// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftElastic } = require("@azure/arm-elastic");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete an existing traffic filter associated with your Elastic monitor resource, removing its network traffic control capabilities.
 *
 * @summary delete an existing traffic filter associated with your Elastic monitor resource, removing its network traffic control capabilities.
 * x-ms-original-file: 2025-06-01/TrafficFilters_Delete.json
 */
async function trafficFiltersDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  await client.trafficFilters.delete("myResourceGroup", "myMonitor", {
    rulesetId: "31d91b5afb6f4c2eaaf104c97b1991dd",
  });
}

async function main() {
  await trafficFiltersDelete();
}

main().catch(console.error);
