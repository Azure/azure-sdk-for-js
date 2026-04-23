// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Updates express route gateway tags.
 *
 * @summary Updates express route gateway tags.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/ExpressRouteGatewayUpdateTags.json
 */
async function expressRouteGatewayUpdate() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "resourceGroupName";
  const expressRouteGatewayName = "expressRouteGatewayName";
  const expressRouteGatewayParameters = {
    tags: { tag1: "value1", tag2: "value2" },
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteGateways.beginUpdateTagsAndWait(
    resourceGroupName,
    expressRouteGatewayName,
    expressRouteGatewayParameters,
  );
  console.log(result);
}

async function main() {
  await expressRouteGatewayUpdate();
}

main().catch(console.error);
