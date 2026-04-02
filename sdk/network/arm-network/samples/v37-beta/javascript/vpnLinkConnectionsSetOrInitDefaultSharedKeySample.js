// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to sets or auto generates the shared key based on the user input. If users give a shared key value, it does the set operation. If key length is given, the operation creates a random key of the pre-defined length.
 *
 * @summary sets or auto generates the shared key based on the user input. If users give a shared key value, it does the set operation. If key length is given, the operation creates a random key of the pre-defined length.
 * x-ms-original-file: 2025-05-01/VpnSiteLinkConnectionDefaultSharedKeyPut.json
 */
async function vpnSiteLinkConnectionDefaultSharedKeyPut() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.vpnLinkConnections.setOrInitDefaultSharedKey(
    "rg1",
    "gateway1",
    "vpnConnection1",
    "Connection-Link1",
    { properties: { sharedKey: "ABCDEF123456" } },
  );
  console.log(result);
}

async function main() {
  await vpnSiteLinkConnectionDefaultSharedKeyPut();
}

main().catch(console.error);
