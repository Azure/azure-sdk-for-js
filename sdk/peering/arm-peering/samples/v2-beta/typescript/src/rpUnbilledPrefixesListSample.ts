// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PeeringManagementClient } from "@azure/arm-peering";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all of the RP unbilled prefixes for the specified peering
 *
 * @summary lists all of the RP unbilled prefixes for the specified peering
 * x-ms-original-file: 2025-05-01/ListRpUnbilledPrefixes.json
 */
async function listAllTheRPUnbilledPrefixesAdvertisedAtAParticularPeeringLocation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.rpUnbilledPrefixes.list("rgName", "peeringName", {
    consolidate: true,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllTheRPUnbilledPrefixesAdvertisedAtAParticularPeeringLocation();
}

main().catch(console.error);
