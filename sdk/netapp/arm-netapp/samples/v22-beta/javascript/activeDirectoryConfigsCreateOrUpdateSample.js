// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update the specified active directory configuration
 *
 * @summary create or update the specified active directory configuration
 * x-ms-original-file: 2025-09-01-preview/ActiveDirectoryConfigs_CreateOrUpdate.json
 */
async function activeDirectoryConfigsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.activeDirectoryConfigs.createOrUpdate("myRG", "adconfig1", {
    location: "eastus",
    tags: { "ac-tag1": "activeDirectoryConfig1" },
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRG/providers/Microsoft.ManagedIdentity/userAssignedIdentities/userAssignedIdentity1":
          {},
      },
    },
    properties: {
      userName: "admin1",
      secretPassword: {
        keyVaultProperties: {
          keyVaultUri: "https://example.vault.azure.net/",
          secretName: "activeDirectoryPassword",
        },
        identity: {
          userAssignedIdentity:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRG/providers/Microsoft.ManagedIdentity/userAssignedIdentities/userAssignedIdentity1",
        },
      },
      domain: "example.net",
      dns: ["10.10.10.4", "10.10.10.5"],
      smbServerName: "smbServer",
      organizationalUnit: "OU=Computers,DC=corp,DC=contoso,DC=com",
      site: "Default-First-Site-Name",
      backupOperators: ["backupOp1"],
      administrators: ["admin1"],
      securityOperators: ["secOp1"],
    },
  });
  console.log(result);
}

async function main() {
  await activeDirectoryConfigsCreateOrUpdate();
}

main().catch(console.error);
