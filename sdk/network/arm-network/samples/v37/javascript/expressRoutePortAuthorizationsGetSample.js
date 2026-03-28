// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified authorization from the specified express route port.
 *
 * @summary gets the specified authorization from the specified express route port.
 * x-ms-original-file: 2025-05-01/ExpressRoutePortAuthorizationGet.json
 */
async function getExpressRoutePortAuthorization() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRoutePortAuthorizations.get(
    "rg1",
    "expressRoutePortName",
    "authorizationName",
  );
  console.log(result);
}

async function main() {
  await getExpressRoutePortAuthorization();
}

main().catch(console.error);
