// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an authorization in the specified express route port.
 *
 * @summary creates or updates an authorization in the specified express route port.
 * x-ms-original-file: 2025-05-01/ExpressRoutePortAuthorizationCreate.json
 */
async function createExpressRoutePortAuthorization() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRoutePortAuthorizations.createOrUpdate(
    "rg1",
    "expressRoutePortName",
    "authorizatinName",
    {},
  );
  console.log(result);
}

async function main() {
  await createExpressRoutePortAuthorization();
}

main().catch(console.error);
