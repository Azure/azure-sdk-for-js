// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { FileSharesClient } = require("@azure/arm-fileshares");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a FileShare
 *
 * @summary update a FileShare
 * x-ms-original-file: 2026-09-01/FileShares_Update_MaximumSet_Gen.json
 */
async function fileSharesUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0681745E-3F9F-4966-80E6-69624A3B29F2";
  const client = new FileSharesClient(credential, subscriptionId);
  const result = await client.fileShares.update("rgfileshares", "fileshare", {
    tags: { key173: "uyf" },
    properties: {
      provisionedStorageGiB: 7,
      provisionedIOPerSec: 1,
      provisionedThroughputMiBPerSec: 29,
      nfsProtocolProperties: { rootSquash: "NoRootSquash", encryptionInTransitRequired: "Enabled" },
      publicAccessProperties: {
        allowedSubnets: [
          "/subscriptions/9760acf5-4638-11e7-9bdb-020073ca7778/resourceGroups/myRP/providers/Microsoft.Network/virtualNetworks/testvnet3/subnets/testsubnet3",
        ],
      },
      publicNetworkAccess: "Enabled",
      encryption: {
        infrastructureEncryption: "enabled",
        customerManagedKeyEncryption: {
          keyEncryptionKeyIdentity: {
            identityType: "userAssignedIdentity",
            userAssignedIdentityResourceId:
              "/subscriptions/0590b445-524e-4caa-9870-2e2461d23434/resourceGroups/fiddler-mfs-rg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myidentity",
          },
          keyEncryptionKeyUrl: "https://myvault.vault.azure.net/keys/myfilesharekey",
        },
      },
    },
    identity: {
      type: "SystemAssigned,UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/0590b445-524e-4caa-9870-2e2461d23434/resourceGroups/fiddler-mfs-rg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myidentity":
          {},
      },
    },
  });
  console.log(result);
}

async function main() {
  await fileSharesUpdateMaximumSet();
}

main().catch(console.error);
