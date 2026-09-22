// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PeeringManagementClient } = require("@azure/arm-peering");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the available countries for peering service.
 *
 * @summary lists all of the available countries for peering service.
 * x-ms-original-file: 2025-05-01/ListPeeringServiceCountriesBySubscription.json
 */
async function listPeeringServiceCountries() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.peeringServiceCountries.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listPeeringServiceCountries();
}

main().catch(console.error);
