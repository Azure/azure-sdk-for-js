// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified authorization from the specified express route port.
 *
 * @summary deletes the specified authorization from the specified express route port.
 * x-ms-original-file: 2025-05-01/ExpressRoutePortAuthorizationDelete.json
 */
async function deleteExpressRoutePortAuthorization() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.expressRoutePortAuthorizations.delete(
    "rg1",
    "expressRoutePortName",
    "authorizationName",
  );
}

async function main() {
  await deleteExpressRoutePortAuthorization();
}

main().catch(console.error);
