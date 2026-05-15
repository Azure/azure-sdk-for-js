// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to disassociates the Cloud Service reserved Public IP and associates the specified Standalone Public IP to the same Cloud Service frontend.
 *
 * @summary disassociates the Cloud Service reserved Public IP and associates the specified Standalone Public IP to the same Cloud Service frontend.
 * x-ms-original-file: 2025-05-01/PublicIpAddressDisassociateCloudServiceReservedPublicIp.json
 */
async function disassociatePublicIPAddress() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.publicIPAddresses.disassociateCloudServiceReservedPublicIp(
    "rg1",
    "pip1",
    {
      publicIpArmId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/rg1/providers/Microsoft.Network/publicIpAddresses/pip2",
    },
  );
  console.log(result);
}

async function main() {
  await disassociatePublicIPAddress();
}

main().catch(console.error);
