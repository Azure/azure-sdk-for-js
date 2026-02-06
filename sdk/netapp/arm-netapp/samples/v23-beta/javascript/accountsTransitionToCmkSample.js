// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to transitions all volumes in a VNet to a different encryption key source (Microsoft-managed key or Azure Key Vault). Operation fails if targeted volumes share encryption sibling set with volumes from another account.
 *
 * @summary transitions all volumes in a VNet to a different encryption key source (Microsoft-managed key or Azure Key Vault). Operation fails if targeted volumes share encryption sibling set with volumes from another account.
 * x-ms-original-file: 2025-09-01-preview/Accounts_TransitionEncryptionKey.json
 */
async function accountsMigrateEncryptionKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.accounts.transitionToCmk("myRG", "account1", {
    body: {
      privateEndpointId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRG/providers/Microsoft.Network/privateEndpoints/privip1",
      virtualNetworkId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRG/providers/Microsoft.Network/virtualNetworks/vnet1",
    },
  });
}

async function main() {
  await accountsMigrateEncryptionKey();
}

main().catch(console.error);
