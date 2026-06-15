// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageCacheManagementClient } = require("@azure/arm-storagecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a cache instance.
 *
 * @summary update a cache instance.
 * x-ms-original-file: 2026-01-01/Caches_Update.json
 */
async function cachesUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const result = await client.caches.update("scgroup", "sc1", {
    cache: {
      location: "westus",
      cacheSizeGB: 3072,
      directoryServicesSettings: {
        activeDirectory: {
          cacheNetBiosName: "contosoSmb",
          domainName: "contosoAd.contoso.local",
          domainNetBiosName: "contosoAd",
          primaryDnsIpAddress: "192.0.2.10",
          secondaryDnsIpAddress: "192.0.2.11",
        },
        usernameDownload: { extendedGroups: true, usernameSource: "AD" },
      },
      networkSettings: {
        dnsSearchDomain: "contoso.com",
        dnsServers: ["10.1.22.33", "10.1.12.33"],
        mtu: 1500,
        ntpServer: "time.contoso.com",
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
          {
            name: "restrictive",
            accessRules: [
              {
                access: "rw",
                filter: "10.99.3.145",
                rootSquash: false,
                scope: "host",
                submountAccess: true,
                suid: true,
              },
              {
                access: "rw",
                filter: "10.99.1.0/24",
                rootSquash: false,
                scope: "network",
                submountAccess: true,
                suid: true,
              },
              {
                access: "no",
                anonymousGID: "65534",
                anonymousUID: "65534",
                rootSquash: true,
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
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update a cache instance.
 *
 * @summary update a cache instance.
 * x-ms-original-file: 2026-01-01/Caches_Update_ldap_only.json
 */
async function cachesUpdateLdapOnly() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const result = await client.caches.update("scgroup", "sc1", {
    cache: {
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
      networkSettings: {
        dnsSearchDomain: "contoso.com",
        dnsServers: ["10.1.22.33", "10.1.12.33"],
        mtu: 1500,
        ntpServer: "time.contoso.com",
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
          {
            name: "restrictive",
            accessRules: [
              {
                access: "rw",
                filter: "10.99.3.145",
                rootSquash: false,
                scope: "host",
                submountAccess: true,
                suid: true,
              },
              {
                access: "rw",
                filter: "10.99.1.0/24",
                rootSquash: false,
                scope: "network",
                submountAccess: true,
                suid: true,
              },
              {
                access: "no",
                anonymousGID: "65534",
                anonymousUID: "65534",
                rootSquash: true,
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
    },
  });
  console.log(result);
}

async function main() {
  await cachesUpdate();
  await cachesUpdateLdapOnly();
}

main().catch(console.error);
