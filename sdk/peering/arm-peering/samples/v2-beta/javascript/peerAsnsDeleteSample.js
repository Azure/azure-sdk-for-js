// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PeeringManagementClient } = require("@azure/arm-peering");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an existing peer ASN with the specified name under the given subscription.
 *
 * @summary deletes an existing peer ASN with the specified name under the given subscription.
 * x-ms-original-file: 2025-05-01/DeletePeerAsn.json
 */
async function deleteAPeerASN() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  await client.peerAsns.delete("peerAsnName");
}

async function main() {
  await deleteAPeerASN();
}

main().catch(console.error);
