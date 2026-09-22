// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementClient } from "@azure/arm-storagecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a cache.
 *
 * @summary create or update a cache.
 * x-ms-original-file: 2026-01-01/Caches_CreateOrUpdate.json
 */
async function cachesCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const result = await client.caches.createOrUpdate("scgroup", "sc1", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/scgroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identity1":
          {},
      },
    },
    location: "westus",
    cacheSizeGB: 3072,
    directoryServicesSettings: {
      activeDirectory: {
        cacheNetBiosName: "contosoSmb",
        credentials: { password: "<password>", username: "consotoAdmin" },
        domainName: "contosoAd.contoso.local",
        domainNetBiosName: "contosoAd",
        primaryDnsIpAddress: "192.0.2.10",
        secondaryDnsIpAddress: "192.0.2.11",
      },
      usernameDownload: {
        credentials: {
          bindDn: "cn=ldapadmin,dc=contosoad,dc=contoso,dc=local",
          bindPassword: "<bindPassword>",
        },
        extendedGroups: true,
        ldapBaseDN: "dc=contosoad,dc=contoso,dc=local",
        ldapServer: "192.0.2.12",
        usernameSource: "LDAP",
      },
    },
    encryptionSettings: {
      keyEncryptionKey: {
        keyUrl: "https://keyvault-cmk.vault.azure.net/keys/key2047/test",
        sourceVault: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/scgroup/providers/Microsoft.KeyVault/vaults/keyvault-cmk",
        },
      },
    },
    securitySettings: {
      accessPolicies: [
        {
          name: "default",
          accessRules: [
            {
              access: "rw",
              rootSquash: false,
              scope: "default",
              submountAccess: true,
              suid: false,
            },
          ],
        },
      ],
    },
    subnet:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/scgroup/providers/Microsoft.Network/virtualNetworks/scvnet/subnets/sub1",
    upgradeSettings: {
      scheduledTime: new Date("2022-04-26T18:25:43.511Z"),
      upgradeScheduleEnabled: true,
    },
    sku: { name: "Standard_2G" },
    tags: { Dept: "Contoso" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a cache.
 *
 * @summary create or update a cache.
 * x-ms-original-file: 2026-01-01/Caches_CreateOrUpdate_ldap_only.json
 */
async function cachesCreateOrUpdateLdapOnly(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const result = await client.caches.createOrUpdate("scgroup", "sc1", {
    location: "westus",
    cacheSizeGB: 3072,
    directoryServicesSettings: {
      usernameDownload: {
        credentials: {
          bindDn: "cn=ldapadmin,dc=contosoad,dc=contoso,dc=local",
          bindPassword: "<bindPassword>",
        },
        extendedGroups: true,
        ldapBaseDN: "dc=contosoad,dc=contoso,dc=local",
        ldapServer: "192.0.2.12",
        usernameSource: "LDAP",
      },
    },
    encryptionSettings: {
      keyEncryptionKey: {
        keyUrl: "https://keyvault-cmk.vault.azure.net/keys/key2048/test",
        sourceVault: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/scgroup/providers/Microsoft.KeyVault/vaults/keyvault-cmk",
        },
      },
    },
    securitySettings: {
      accessPolicies: [
        {
          name: "default",
          accessRules: [
            {
              access: "rw",
              rootSquash: false,
              scope: "default",
              submountAccess: true,
              suid: false,
            },
          ],
        },
      ],
    },
    subnet:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/scgroup/providers/Microsoft.Network/virtualNetworks/scvnet/subnets/sub1",
    upgradeSettings: {
      scheduledTime: new Date("2022-04-26T18:25:43.511Z"),
      upgradeScheduleEnabled: true,
    },
    sku: { name: "Standard_2G" },
    tags: { Dept: "Contoso" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await cachesCreateOrUpdate();
  await cachesCreateOrUpdateLdapOnly();
}

main().catch(console.error);
