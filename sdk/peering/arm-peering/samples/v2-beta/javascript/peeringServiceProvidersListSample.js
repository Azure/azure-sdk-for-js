// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PeeringManagementClient } = require("@azure/arm-peering");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the available peering service locations for the specified kind of peering.
 *
 * @summary lists all of the available peering service locations for the specified kind of peering.
 * x-ms-original-file: 2025-05-01/ListPeeringServiceProviders.json
 */
async function listPeeringServiceProviders() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.peeringServiceProviders.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listPeeringServiceProviders();
}

main().catch(console.error);
