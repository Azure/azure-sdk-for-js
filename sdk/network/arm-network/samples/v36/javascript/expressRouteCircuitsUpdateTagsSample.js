// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Updates an express route circuit tags.
 *
 * @summary Updates an express route circuit tags.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/ExpressRouteCircuitUpdateTags.json
 */
async function updateExpressRouteCircuitTags() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "ertest";
  const circuitName = "er1";
  const parameters = { tags: { tag1: "value1", tag2: "value2" } };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteCircuits.updateTags(
    resourceGroupName,
    circuitName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await updateExpressRouteCircuitTags();
}

main().catch(console.error);
