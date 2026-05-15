// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all the available express route service providers.
 *
 * @summary gets all the available express route service providers.
 * x-ms-original-file: 2025-05-01/ExpressRouteProviderList.json
 */
async function listExpressRouteProviders() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.expressRouteServiceProviders.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listExpressRouteProviders();
}

main().catch(console.error);
