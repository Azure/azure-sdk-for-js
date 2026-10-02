// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the authorization key associated with the specified express route circuit authorization.
 *
 * @summary gets the authorization key associated with the specified express route circuit authorization.
 * x-ms-original-file: 2026-01-01/ExpressRouteCircuitAuthorizationListKeys.json
 */
async function listExpressRouteCircuitAuthorizationKeys() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteCircuitAuthorizations.listKeys(
    "rg1",
    "circuitName",
    "authorizationName",
  );
  console.log(result);
}

async function main() {
  await listExpressRouteCircuitAuthorizationKeys();
}

main().catch(console.error);
