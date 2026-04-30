// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets all authorizations in an express route port.
 *
 * @summary Gets all authorizations in an express route port.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/ExpressRoutePortAuthorizationList.json
 */
async function listExpressRoutePortAuthorization() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const expressRoutePortName = "expressRoutePortName";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.expressRoutePortAuthorizations.list(
    resourceGroupName,
    expressRoutePortName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listExpressRoutePortAuthorization();
}

main().catch(console.error);
