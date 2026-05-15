// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all authorizations in an express route port.
 *
 * @summary gets all authorizations in an express route port.
 * x-ms-original-file: 2025-05-01/ExpressRoutePortAuthorizationList.json
 */
async function listExpressRoutePortAuthorization() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.expressRoutePortAuthorizations.list(
    "rg1",
    "expressRoutePortName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listExpressRoutePortAuthorization();
}

main().catch(console.error);
