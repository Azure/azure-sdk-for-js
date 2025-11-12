// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates a new server.
 *
 * @summary Creates a new server.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/ServersClusterCreate.json
 */
async function createANewElasticCluster() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const parameters = {
    administratorLogin: "examplelogin",
    administratorLoginPassword: "examplepassword",
    backup: { backupRetentionDays: 7, geoRedundantBackup: "Disabled" },
    cluster: { clusterSize: 2, defaultDatabaseName: "clusterdb" },
    createMode: "Create",
    highAvailability: { mode: "Disabled" },
    location: "eastus",
    network: { publicNetworkAccess: "Disabled" },
    sku: { name: "Standard_D4ds_v5", tier: "GeneralPurpose" },
    storage: { autoGrow: "Disabled", storageSizeGB: 256, tier: "P15" },
    version: "16",
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new server.
 *
 * @summary Creates a new server.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/ServersCreateInMicrosoftOwnedVirtualNetworkWithZoneRedundantHighAvailability.json
 */
async function createANewServerInMicrosoftOwnedVirtualNetworkWithZoneRedundantHighAvailability() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const parameters = {
    administratorLogin: "exampleadministratorlogin",
    administratorLoginPassword: "examplepassword",
    availabilityZone: "1",
    backup: { backupRetentionDays: 7, geoRedundantBackup: "Enabled" },
    createMode: "Create",
    highAvailability: { mode: "ZoneRedundant" },
    location: "eastus",
    network: { publicNetworkAccess: "Enabled" },
    sku: { name: "Standard_D4ds_v5", tier: "GeneralPurpose" },
    storage: { autoGrow: "Disabled", storageSizeGB: 512, tier: "P20" },
    tags: { inCustomerVnet: "false", inMicrosoftVnet: "true" },
    version: "17",
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new server.
 *
 * @summary Creates a new server.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/ServersCreateInYourOwnVirtualNetworkWithSameZoneHighAvailability.json
 */
async function createANewServerInYourOwnVirtualNetworkWithSameZoneHighAvailability() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const parameters = {
    administratorLogin: "exampleadministratorlogin",
    administratorLoginPassword: "examplepassword",
    availabilityZone: "1",
    backup: { backupRetentionDays: 7, geoRedundantBackup: "Enabled" },
    createMode: "Create",
    highAvailability: { mode: "SameZone" },
    location: "eastus",
    network: {
      delegatedSubnetResourceId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.Network/virtualNetworks/examplevirtualnetwork/subnets/examplesubnet",
      privateDnsZoneArmResourceId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.Network/privateDnsZones/exampleprivatednszone.private.postgres.database",
    },
    sku: { name: "Standard_D4ds_v5", tier: "GeneralPurpose" },
    storage: { autoGrow: "Disabled", storageSizeGB: 512, tier: "P20" },
    tags: { inCustomerVnet: "true", inMicrosoftVnet: "false" },
    version: "17",
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new server.
 *
 * @summary Creates a new server.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/ServersCreateReviveDropped.json
 */
async function createANewServerUsingABackupOfAServerThatWasDeletedOrDroppedRecently() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const parameters = {
    createMode: "ReviveDropped",
    location: "eastus",
    pointInTimeUTC: new Date("2025-06-01T18:30:22.123456Z"),
    sourceServerResourceId:
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBforPostgreSQL/flexibleServers/exampledeletedserver",
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new server.
 *
 * @summary Creates a new server.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/ServersCreatePointInTimeRestore.json
 */
async function createANewServerUsingAPointInTimeRestoreOfABackupOfAnExistingServer() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const parameters = {
    createMode: "PointInTimeRestore",
    location: "eastus",
    pointInTimeUTC: new Date("2025-06-01T18:35:22.123456Z"),
    sourceServerResourceId:
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBforPostgreSQL/flexibleServers/examplesourceserver",
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new server.
 *
 * @summary Creates a new server.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/ServersCreateGeoRestoreWithDataEncryptionEnabledAutoUpdate.json
 */
async function createANewServerUsingARestoreOfAGeographicallyRedundantBackupOfAnExistingServerWithDataEncryptionBasedOnCustomerManagedKeyWithAutomaticKeyVersionUpdate() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const parameters = {
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
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/ffffffffFfffFfffFfffFfffffffffff/resourceGroups/exampleresourcegroup/providers/MicrosoftManagedIdentity/userAssignedIdentities/examplegeoredundantidentity":
          {},
        "/subscriptions/ffffffffFfffFfffFfffFfffffffffff/resourceGroups/exampleresourcegroup/providers/MicrosoftManagedIdentity/userAssignedIdentities/exampleprimaryidentity":
          {},
      },
    },
    location: "eastus",
    pointInTimeUTC: new Date("2025-06-01T18:35:22.123456Z"),
    sourceServerResourceId:
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBforPostgreSQL/flexibleServers/examplesourceserver",
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new server.
 *
 * @summary Creates a new server.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/ServersCreateGeoRestoreWithDataEncryptionEnabled.json
 */
async function createANewServerUsingARestoreOfAGeographicallyRedundantBackupOfAnExistingServerWithDataEncryptionBasedOnCustomerManagedKey() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const parameters = {
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
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/ffffffffFfffFfffFfffFfffffffffff/resourceGroups/exampleresourcegroup/providers/MicrosoftManagedIdentity/userAssignedIdentities/examplegeoredundantidentity":
          {},
        "/subscriptions/ffffffffFfffFfffFfffFfffffffffff/resourceGroups/exampleresourcegroup/providers/MicrosoftManagedIdentity/userAssignedIdentities/exampleprimaryidentity":
          {},
      },
    },
    location: "eastus",
    pointInTimeUTC: new Date("2025-06-01T18:35:22.123456Z"),
    sourceServerResourceId:
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBforPostgreSQL/flexibleServers/examplesourceserver",
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new server.
 *
 * @summary Creates a new server.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/ServersCreateWithMicrosoftEntraEnabledInYourOwnVirtualNetworkWithoutHighAvailability.json
 */
async function createANewServerWithMicrosoftEntraAuthenticationEnabledInYourOwnVirtualNetworkAndWithoutHighAvailability() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const parameters = {
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
    location: "eastus",
    network: {
      delegatedSubnetResourceId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.Network/virtualNetworks/examplevirtualnetwork/subnets/examplesubnet",
      privateDnsZoneArmResourceId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourcegroups/exampleresourcegroup/providers/Microsoft.Network/privateDnsZones/exampleprivatednszone.postgres.database.azure.com",
    },
    sku: { name: "Standard_D4ds_v5", tier: "GeneralPurpose" },
    storage: { autoGrow: "Disabled", storageSizeGB: 512, tier: "P20" },
    version: "17",
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new server.
 *
 * @summary Creates a new server.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/ServersCreateWithDataEncryptionEnabledAutoUpdate.json
 */
async function createANewServerWithDataEncryptionBasedOnCustomerManagedKeyWithAutomaticKeyVersionUpdate() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const parameters = {
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
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/ffffffffFfffFfffFfffFfffffffffff/resourceGroups/exampleresourcegroup/providers/MicrosoftManagedIdentity/userAssignedIdentities/exampleprimaryidentity":
          {},
      },
    },
    location: "eastus",
    network: {
      delegatedSubnetResourceId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.Network/virtualNetworks/examplevirtualnetwork/subnets/examplesubnet",
      privateDnsZoneArmResourceId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourcegroups/exampleresourcegroup/providers/Microsoft.Network/privateDnsZones/exampleprivatednszone.postgres.database.azure.com",
    },
    sku: { name: "Standard_D4ds_v5", tier: "GeneralPurpose" },
    storage: { autoGrow: "Disabled", storageSizeGB: 512, tier: "P20" },
    version: "17",
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new server.
 *
 * @summary Creates a new server.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/ServersCreateWithDataEncryptionEnabled.json
 */
async function createANewServerWithDataEncryptionBasedOnCustomerManagedKey() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const parameters = {
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
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/ffffffffFfffFfffFfffFfffffffffff/resourceGroups/exampleresourcegroup/providers/MicrosoftManagedIdentity/userAssignedIdentities/exampleprimaryidentity":
          {},
      },
    },
    location: "eastus",
    network: {
      delegatedSubnetResourceId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.Network/virtualNetworks/examplevirtualnetwork/subnets/examplesubnet",
      privateDnsZoneArmResourceId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourcegroups/exampleresourcegroup/providers/Microsoft.Network/privateDnsZones/exampleprivatednszone.postgres.database.azure.com",
    },
    sku: { name: "Standard_D4ds_v5", tier: "GeneralPurpose" },
    storage: { autoGrow: "Disabled", storageSizeGB: 512, tier: "P20" },
    version: "17",
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new server.
 *
 * @summary Creates a new server.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/ServersCreateReplica.json
 */
async function createAReadReplicaOfAnExistingServer() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const parameters = {
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
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/ffffffffFfffFfffFfffFfffffffffff/resourceGroups/exampleresourcegroup/providers/MicrosoftManagedIdentity/userAssignedIdentities/exampleprimaryidentity":
          {},
      },
    },
    location: "eastus",
    pointInTimeUTC: new Date("2025-06-01T18:35:22.123456Z"),
    sourceServerResourceId:
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBforPostgreSQL/flexibleServers/examplesourceserver",
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createANewElasticCluster();
  await createANewServerInMicrosoftOwnedVirtualNetworkWithZoneRedundantHighAvailability();
  await createANewServerInYourOwnVirtualNetworkWithSameZoneHighAvailability();
  await createANewServerUsingABackupOfAServerThatWasDeletedOrDroppedRecently();
  await createANewServerUsingAPointInTimeRestoreOfABackupOfAnExistingServer();
  await createANewServerUsingARestoreOfAGeographicallyRedundantBackupOfAnExistingServerWithDataEncryptionBasedOnCustomerManagedKeyWithAutomaticKeyVersionUpdate();
  await createANewServerUsingARestoreOfAGeographicallyRedundantBackupOfAnExistingServerWithDataEncryptionBasedOnCustomerManagedKey();
  await createANewServerWithMicrosoftEntraAuthenticationEnabledInYourOwnVirtualNetworkAndWithoutHighAvailability();
  await createANewServerWithDataEncryptionBasedOnCustomerManagedKeyWithAutomaticKeyVersionUpdate();
  await createANewServerWithDataEncryptionBasedOnCustomerManagedKey();
  await createAReadReplicaOfAnExistingServer();
}

main().catch(console.error);
