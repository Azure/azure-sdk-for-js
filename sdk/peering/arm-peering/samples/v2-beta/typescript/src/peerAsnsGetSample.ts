// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PeeringManagementClient } from "@azure/arm-peering";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the peer ASN with the specified name under the given subscription.
 *
 * @summary gets the peer ASN with the specified name under the given subscription.
 * x-ms-original-file: 2025-05-01/GetPeerAsn.json
 */
async function getAPeerASN(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  const result = await client.peerAsns.get("peerAsnName");
  console.log(result);
}

async function main(): Promise<void> {
  await getAPeerASN();
}

main().catch(console.error);
