// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PeeringManagementClient } = require("@azure/arm-peering");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the advertised prefixes for the specified peering location
 *
 * @summary lists all of the advertised prefixes for the specified peering location
 * x-ms-original-file: 2025-05-01/ListCdnPeeringPrefixes.json
 */
async function listAllTheCdnPeeringPrefixesAdvertisedAtAParticularPeeringLocation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.cdnPeeringPrefixes.list("peeringLocation0")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllTheCdnPeeringPrefixesAdvertisedAtAParticularPeeringLocation();
}

main().catch(console.error);
