// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PeeringManagementClient } from "@azure/arm-peering";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new peer ASN or updates an existing peer ASN with the specified name under the given subscription.
 *
 * @summary creates a new peer ASN or updates an existing peer ASN with the specified name under the given subscription.
 * x-ms-original-file: 2025-05-01/CreatePeerAsn.json
 */
async function createAPeerASN(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  const result = await client.peerAsns.createOrUpdate("peerAsnName", {
    peerAsn: 65000,
    peerContactDetail: [
      { email: "noc@contoso.com", phone: "+1 (234) 567-8999", role: "Noc" },
      { email: "abc@contoso.com", phone: "+1 (234) 567-8900", role: "Policy" },
      { email: "xyz@contoso.com", phone: "+1 (234) 567-8900", role: "Technical" },
    ],
    peerName: "Contoso",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createAPeerASN();
}

main().catch(console.error);
