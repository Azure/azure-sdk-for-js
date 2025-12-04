// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to affects existing volumes that are encrypted with Key Vault/Managed HSM, and new volumes. Supports HSM to Key Vault, Key Vault to HSM, HSM to HSM and Key Vault to Key Vault.
 *
 * @summary affects existing volumes that are encrypted with Key Vault/Managed HSM, and new volumes. Supports HSM to Key Vault, Key Vault to HSM, HSM to HSM and Key Vault to Key Vault.
 * x-ms-original-file: 2025-09-01-preview/Accounts_ChangeKeyVault.json
 */
async function accountsChangeKeyVault() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.accounts.changeKeyVault("myRG", "account1", {
    body: {
      keyName: "rsakey",
      keyVaultPrivateEndpoints: [
        {
          privateEndpointId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRG/providers/Microsoft.Network/privateEndpoints/privip1",
          virtualNetworkId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRG/providers/Microsoft.Network/virtualNetworks/vnet1",
        },
      ],
      keyVaultResourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRG/providers/Microsoft.KeyVault/managedHSMs/my-hsm",
      keyVaultUri: "https://my-key-vault.managedhsm.azure.net",
    },
  });
}

async function main() {
  await accountsChangeKeyVault();
}

main().catch(console.error);
