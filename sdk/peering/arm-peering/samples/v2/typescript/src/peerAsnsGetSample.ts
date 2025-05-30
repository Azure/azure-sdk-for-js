/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { PeeringManagementClient } from "@azure/arm-peering";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Gets the peer ASN with the specified name under the given subscription.
 *
 * @summary Gets the peer ASN with the specified name under the given subscription.
 * x-ms-original-file: specification/peering/resource-manager/Microsoft.Peering/stable/2021-06-01/examples/GetPeerAsn.json
 */
async function getAPeerAsn(): Promise<void> {
  const subscriptionId = "subId";
  const peerAsnName = "peerAsnName";
  const credential = new DefaultAzureCredential();
  const client = new PeeringManagementClient(credential, subscriptionId);
  const result = await client.peerAsns.get(peerAsnName);
  console.log(result);
}

getAPeerAsn().catch(console.error);
