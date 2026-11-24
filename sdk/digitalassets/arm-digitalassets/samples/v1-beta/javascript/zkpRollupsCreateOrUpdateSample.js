// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DigitalAssetsClient } = require("@azure/arm-digitalassets");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or replaces a ZKP rollup.
 *
 * @summary creates or replaces a ZKP rollup.
 * x-ms-original-file: 2025-09-01-preview/ZkpRollups_CreateOrUpdate.json
 */
async function createZkpRollup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DigitalAssetsClient(credential, subscriptionId);
  const result = await client.zkpRollups.createOrUpdate("testrg", "Jack", {
    location: "eastus",
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testrg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/kvReader":
          {},
      },
    },
    properties: {
      tokenOwnerAccounts: [
        "0x1111111111111111111111111111111111111111",
        "0x2222222222222222222222222222222222222222",
      ],
      keyVaultId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.KeyVault/vaults/myKv",
      keyVaultUserAssignedIdentityResourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testrg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/kvReader",
      customerVpnPublicIp: "203.0.113.10",
      bootNodeId:
        "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",
      bootNodeIp: "10.0.0.4",
      bootNodeP2PPort: 30303,
      bootNodeRpcPort: 8545,
      customerOnPremAddressPrefixes: ["192.168.100.0/24"],
      serviceBusEndpoint: "https://sb-da-customer.servicebus.windows.net",
      serviceBusQueueName: "proofs-output",
    },
  });
  console.log(result);
}

async function main() {
  await createZkpRollup();
}

main().catch(console.error);
