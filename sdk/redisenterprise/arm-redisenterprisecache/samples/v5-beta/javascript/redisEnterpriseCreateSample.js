// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedisEnterpriseManagementClient } = require("@azure/arm-redisenterprisecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an existing (overwrite/recreate, with potential downtime) cache cluster
 *
 * @summary creates or updates an existing (overwrite/recreate, with potential downtime) cache cluster
 * x-ms-original-file: 2025-08-01-preview/RedisEnterpriseCreate.json
 */
async function redisEnterpriseCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e7b5a9d2-6b6a-4d2f-9143-20d9a10f5b8f";
  const client = new RedisEnterpriseManagementClient(credential, subscriptionId);
  const result = await client.redisEnterprise.create("rg1", "cache1", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/your-subscription/resourceGroups/your-rg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/your-identity":
          {},
      },
    },
    location: "West US",
    encryption: {
      customerManagedKeyEncryption: {
        keyEncryptionKeyIdentity: {
          identityType: "userAssignedIdentity",
          userAssignedIdentityResourceId:
            "/subscriptions/your-subscription/resourceGroups/your-rg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/your-identity",
        },
        keyEncryptionKeyUrl: "https://your-kv.vault.azure.net/keys/your-key/your-key-version",
      },
    },
    minimumTlsVersion: "1.2",
    publicNetworkAccess: "Disabled",
    maintenanceConfiguration: {
      maintenanceWindows: [
        { type: "Weekly", duration: "PT6H", startHourUtc: 3, schedule: { dayOfWeek: "Monday" } },
        { type: "Weekly", duration: "PT6H", startHourUtc: 3, schedule: { dayOfWeek: "Tuesday" } },
        { type: "Weekly", duration: "PT6H", startHourUtc: 3, schedule: { dayOfWeek: "Wednesday" } },
      ],
    },
    sku: { name: "EnterpriseFlash_F300", capacity: 3 },
    tags: { tag1: "value1" },
    zones: ["1", "2", "3"],
  });
  console.log(result);
}

async function main() {
  await redisEnterpriseCreate();
}

main().catch(console.error);
