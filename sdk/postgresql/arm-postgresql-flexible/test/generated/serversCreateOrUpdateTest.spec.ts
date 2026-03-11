// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("creates a new server", () => {
  let recorder: Recorder;
  let client: PostgreSQLManagementFlexibleServerClient;

  beforeEach(async function (ctx) {
    recorder = await createRecorder(ctx);
    const credential = createTestCredential();
    const subscriptionId = env.SUBSCRIPTION_ID || "<SUBSCRIPTION_ID>";
    const clientOptions = recorder.configureClientOptions({});
    client = new PostgreSQLManagementFlexibleServerClient(
      credential,
      subscriptionId,
      clientOptions,
    );
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should creates a new server for createANewElasticCluster", async function () {
    const result = await client.servers.createOrUpdate("exampleresourcegroup", "exampleserver", {
      location: "eastus",
      administratorLogin: "examplelogin",
      administratorLoginPassword: "examplepassword",
      backup: { backupRetentionDays: 7, geoRedundantBackup: "Disabled" },
      cluster: { clusterSize: 2, defaultDatabaseName: "clusterdb" },
      createMode: "Create",
      highAvailability: { mode: "Disabled" },
      network: { publicNetworkAccess: "Disabled" },
      storage: { autoGrow: "Disabled", storageSizeGB: 256, tier: "P15" },
      version: "16",
      sku: { name: "Standard_D4ds_v5", tier: "GeneralPurpose" },
    });
    assert.ok(result);
  });

  it("should creates a new server for createANewServerUsingARestoreOfAGeographicallyRedundantBackupOfAnExistingServerWithDataEncryptionBasedOnCustomerManagedKey", async function () {
    const result = await client.servers.createOrUpdate("exampleresourcegroup", "exampleserver", {
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/examplegeoredundantidentity":
            {},
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/exampleprimaryidentity":
            {},
        },
      },
      location: "eastus",
      createMode: "GeoRestore",
      dataEncryption: {
        type: "AzureKeyVault",
        geoBackupKeyURI:
          "https://examplegeoredundantkeyvault.vault.azure.net/keys/examplekey/yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
        geoBackupUserAssignedIdentityId:
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/examplegeoredundantidentity",
        primaryKeyURI:
          "https://exampleprimarykeyvault.vault.azure.net/keys/examplekey/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        primaryUserAssignedIdentityId:
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/exampleprimaryidentity",
      },
      pointInTimeUTC: new Date("2025-06-01T18:35:22.123456Z"),
      sourceServerResourceId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBforPostgreSQL/flexibleServers/examplesourceserver",
    });
    assert.ok(result);
  });

  it("should creates a new server for createANewServerUsingARestoreOfAGeographicallyRedundantBackupOfAnExistingServerWithDataEncryptionBasedOnCustomerManagedKeyWithAutomaticKeyVersionUpdate", async function () {
    const result = await client.servers.createOrUpdate("exampleresourcegroup", "exampleserver", {
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/examplegeoredundantidentity":
            {},
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/exampleprimaryidentity":
            {},
        },
      },
      location: "eastus",
      createMode: "GeoRestore",
      dataEncryption: {
        type: "AzureKeyVault",
        geoBackupKeyURI: "https://examplegeoredundantkeyvault.vault.azure.net/keys/examplekey",
        geoBackupUserAssignedIdentityId:
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/examplegeoredundantidentity",
        primaryKeyURI: "https://exampleprimarykeyvault.vault.azure.net/keys/examplekey",
        primaryUserAssignedIdentityId:
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/exampleprimaryidentity",
      },
      pointInTimeUTC: new Date("2025-06-01T18:35:22.123456Z"),
      sourceServerResourceId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBforPostgreSQL/flexibleServers/examplesourceserver",
    });
    assert.ok(result);
  });

  it("should creates a new server for createANewServerInMicrosoftOwnedVirtualNetworkWithZoneRedundantHighAvailability", async function () {
    const result = await client.servers.createOrUpdate("exampleresourcegroup", "exampleserver", {
      location: "eastus",
      administratorLogin: "exampleadministratorlogin",
      administratorLoginPassword: "examplepassword",
      availabilityZone: "1",
      backup: { backupRetentionDays: 7, geoRedundantBackup: "Enabled" },
      createMode: "Create",
      highAvailability: { mode: "ZoneRedundant" },
      network: { publicNetworkAccess: "Enabled" },
      storage: { autoGrow: "Disabled", storageSizeGB: 512, tier: "P20" },
      version: "17",
      sku: { name: "Standard_D4ds_v5", tier: "GeneralPurpose" },
      tags: { InCustomerVnet: "false", InMicrosoftVnet: "true" },
    });
    assert.ok(result);
  });

  it("should creates a new server for createANewServerInYourOwnVirtualNetworkWithSameZoneHighAvailability", async function () {
    const result = await client.servers.createOrUpdate("exampleresourcegroup", "exampleserver", {
      location: "eastus",
      administratorLogin: "exampleadministratorlogin",
      administratorLoginPassword: "examplepassword",
      availabilityZone: "1",
      backup: { backupRetentionDays: 7, geoRedundantBackup: "Enabled" },
      createMode: "Create",
      highAvailability: { mode: "SameZone" },
      network: {
        delegatedSubnetResourceId:
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.Network/virtualNetworks/examplevirtualnetwork/subnets/examplesubnet",
        privateDnsZoneArmResourceId:
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.Network/privateDnsZones/exampleprivatednszone.private.postgres.database",
      },
      storage: { autoGrow: "Disabled", storageSizeGB: 512, tier: "P20" },
      version: "17",
      sku: { name: "Standard_D4ds_v5", tier: "GeneralPurpose" },
      tags: { InCustomerVnet: "true", InMicrosoftVnet: "false" },
    });
    assert.ok(result);
  });

  it("should creates a new server for createANewServerUsingAPointInTimeRestoreOfABackupOfAnExistingServer", async function () {
    const result = await client.servers.createOrUpdate("exampleresourcegroup", "exampleserver", {
      location: "eastus",
      createMode: "PointInTimeRestore",
      pointInTimeUTC: new Date("2025-06-01T18:35:22.123456Z"),
      sourceServerResourceId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBforPostgreSQL/flexibleServers/examplesourceserver",
    });
    assert.ok(result);
  });

  it("should creates a new server for createAReadReplicaOfAnExistingServer", async function () {
    const result = await client.servers.createOrUpdate("exampleresourcegroup", "exampleserver", {
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/exampleprimaryidentity":
            {},
        },
      },
      location: "eastus",
      createMode: "Replica",
      dataEncryption: {
        type: "AzureKeyVault",
        geoBackupKeyURI: "",
        geoBackupUserAssignedIdentityId: "",
        primaryKeyURI:
          "https://exampleprimarykeyvault.vault.azure.net/keys/examplekey/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        primaryUserAssignedIdentityId:
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/exampleprimaryidentity",
      },
      pointInTimeUTC: new Date("2025-06-01T18:35:22.123456Z"),
      sourceServerResourceId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBforPostgreSQL/flexibleServers/examplesourceserver",
    });
    assert.ok(result);
  });

  it("should creates a new server for createANewServerUsingABackupOfAServerThatWasDeletedOrDroppedRecently", async function () {
    const result = await client.servers.createOrUpdate("exampleresourcegroup", "exampleserver", {
      location: "eastus",
      createMode: "ReviveDropped",
      pointInTimeUTC: new Date("2025-06-01T18:30:22.123456Z"),
      sourceServerResourceId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBforPostgreSQL/flexibleServers/exampledeletedserver",
    });
    assert.ok(result);
  });

  it("should creates a new server for createANewServerWithDataEncryptionBasedOnCustomerManagedKey", async function () {
    const result = await client.servers.createOrUpdate("exampleresourcegroup", "exampleserver", {
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/exampleprimaryidentity":
            {},
        },
      },
      location: "eastus",
      administratorLogin: "exampleadministratorlogin",
      administratorLoginPassword: "examplepassword",
      availabilityZone: "1",
      backup: { backupRetentionDays: 7, geoRedundantBackup: "Disabled" },
      createMode: "Create",
      dataEncryption: {
        type: "AzureKeyVault",
        geoBackupKeyURI: "",
        geoBackupUserAssignedIdentityId: "",
        primaryKeyURI:
          "https://exampleprimarykeyvault.vault.azure.net/keys/examplekey/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        primaryUserAssignedIdentityId:
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/exampleprimaryidentity",
      },
      highAvailability: { mode: "ZoneRedundant" },
      network: {
        delegatedSubnetResourceId:
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.Network/virtualNetworks/examplevirtualnetwork/subnets/examplesubnet",
        privateDnsZoneArmResourceId:
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourcegroups/exampleresourcegroup/providers/Microsoft.Network/privateDnsZones/exampleprivatednszone.postgres.database.azure.com",
      },
      storage: { autoGrow: "Disabled", storageSizeGB: 512, tier: "P20" },
      version: "17",
      sku: { name: "Standard_D4ds_v5", tier: "GeneralPurpose" },
    });
    assert.ok(result);
  });

  it("should creates a new server for createANewServerWithDataEncryptionBasedOnCustomerManagedKeyWithAutomaticKeyVersionUpdate", async function () {
    const result = await client.servers.createOrUpdate("exampleresourcegroup", "exampleserver", {
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/exampleprimaryidentity":
            {},
        },
      },
      location: "eastus",
      administratorLogin: "exampleadministratorlogin",
      administratorLoginPassword: "examplepassword",
      availabilityZone: "1",
      backup: { backupRetentionDays: 7, geoRedundantBackup: "Disabled" },
      createMode: "Create",
      dataEncryption: {
        type: "AzureKeyVault",
        geoBackupKeyURI: "",
        geoBackupUserAssignedIdentityId: "",
        primaryKeyURI: "https://exampleprimarykeyvault.vault.azure.net/keys/examplekey",
        primaryUserAssignedIdentityId:
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/exampleprimaryidentity",
      },
      highAvailability: { mode: "ZoneRedundant" },
      network: {
        delegatedSubnetResourceId:
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.Network/virtualNetworks/examplevirtualnetwork/subnets/examplesubnet",
        privateDnsZoneArmResourceId:
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourcegroups/exampleresourcegroup/providers/Microsoft.Network/privateDnsZones/exampleprivatednszone.postgres.database.azure.com",
      },
      storage: { autoGrow: "Disabled", storageSizeGB: 512, tier: "P20" },
      version: "17",
      sku: { name: "Standard_D4ds_v5", tier: "GeneralPurpose" },
    });
    assert.ok(result);
  });

  it("should creates a new server for createANewServerWithMicrosoftEntraAuthenticationEnabledInYourOwnVirtualNetworkAndWithoutHighAvailability", async function () {
    const result = await client.servers.createOrUpdate("exampleresourcegroup", "exampleserver", {
      location: "eastus",
      administratorLogin: "exampleadministratorlogin",
      administratorLoginPassword: "examplepassword",
      authConfig: {
        activeDirectoryAuth: "Enabled",
        passwordAuth: "Enabled",
        tenantId: "tttttt-tttt-tttt-tttt-tttttttttttt",
      },
      availabilityZone: "1",
      backup: { backupRetentionDays: 7, geoRedundantBackup: "Disabled" },
      createMode: "Create",
      dataEncryption: { type: "SystemManaged" },
      highAvailability: { mode: "Disabled" },
      network: {
        delegatedSubnetResourceId:
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.Network/virtualNetworks/examplevirtualnetwork/subnets/examplesubnet",
        privateDnsZoneArmResourceId:
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourcegroups/exampleresourcegroup/providers/Microsoft.Network/privateDnsZones/exampleprivatednszone.postgres.database.azure.com",
      },
      storage: { autoGrow: "Disabled", storageSizeGB: 512, tier: "P20" },
      version: "17",
      sku: { name: "Standard_D4ds_v5", tier: "GeneralPurpose" },
    });
    assert.ok(result);
  });
});
