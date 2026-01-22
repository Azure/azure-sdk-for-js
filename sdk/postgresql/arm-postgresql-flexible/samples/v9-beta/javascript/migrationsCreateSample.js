// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new migration.
 *
 * @summary creates a new migration.
 * x-ms-original-file: 2026-01-01-preview/MigrationsCreate.json
 */
async function createAMigration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.migrations.create(
    "exampleresourcegroup",
    "exampleserver",
    "examplemigration",
    {
      location: "eastus",
      dbsToMigrate: [
        "exampledatabase1",
        "exampledatabase2",
        "exampledatabase3",
        "exampledatabase4",
      ],
      migrationMode: "Offline",
      overwriteDbsInTarget: "True",
      secretParameters: {
        adminCredentials: {
          sourceServerPassword: "examplesourcepassword",
          targetServerPassword: "exampletargetpassword",
        },
      },
      sourceDbServerResourceId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBForPostgreSql/servers/examplesource",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new migration.
 *
 * @summary creates a new migration.
 * x-ms-original-file: 2026-01-01-preview/MigrationsCreateOtherSourceTypesValidateMigrate.json
 */
async function createAMigrationWithOtherSourceTypeForValidatingAndMigrating() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.migrations.create(
    "exampleresourcegroup",
    "exampleserver",
    "examplemigration",
    {
      location: "eastus",
      dbsToMigrate: [
        "exampledatabase1",
        "exampledatabase2",
        "exampledatabase3",
        "exampledatabase4",
      ],
      migrationMode: "Offline",
      migrationOption: "ValidateAndMigrate",
      overwriteDbsInTarget: "True",
      secretParameters: {
        adminCredentials: {
          sourceServerPassword: "examplesourcepassword",
          targetServerPassword: "exampletargetpassword",
        },
      },
      sourceDbServerResourceId: "examplesource:5432@exampleuser",
      sourceType: "OnPremises",
      sslMode: "Prefer",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new migration.
 *
 * @summary creates a new migration.
 * x-ms-original-file: 2026-01-01-preview/MigrationsCreateValidateOnly.json
 */
async function createAMigrationForValidatingOnly() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.migrations.create(
    "exampleresourcegroup",
    "exampleserver",
    "examplemigration",
    {
      location: "eastus",
      dbsToMigrate: [
        "exampledatabase1",
        "exampledatabase2",
        "exampledatabase3",
        "exampledatabase4",
      ],
      migrationMode: "Offline",
      migrationOption: "Validate",
      overwriteDbsInTarget: "True",
      secretParameters: {
        adminCredentials: {
          sourceServerPassword: "examplesourcepassword",
          targetServerPassword: "exampletargetpassword",
        },
      },
      sourceDbServerResourceId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBForPostgreSql/servers/examplesource",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new migration.
 *
 * @summary creates a new migration.
 * x-ms-original-file: 2026-01-01-preview/MigrationsCreateWithFullyQualifiedDomainName.json
 */
async function createAMigrationWithFullyQualifiedDomainNamesForSourceAndTargetServers() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.migrations.create(
    "exampleresourcegroup",
    "exampleserver",
    "examplemigration",
    {
      location: "eastus",
      dbsToMigrate: [
        "exampledatabase1",
        "exampledatabase2",
        "exampledatabase3",
        "exampledatabase4",
      ],
      migrationMode: "Offline",
      overwriteDbsInTarget: "True",
      secretParameters: {
        adminCredentials: { sourceServerPassword: "xxxxxxxx", targetServerPassword: "xxxxxxxx" },
      },
      sourceDbServerFullyQualifiedDomainName: "examplesource.contoso.com",
      sourceDbServerResourceId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBForPostgreSql/servers/examplesource",
      targetDbServerFullyQualifiedDomainName: "exampletarget.contoso.com",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new migration.
 *
 * @summary creates a new migration.
 * x-ms-original-file: 2026-01-01-preview/MigrationsCreateWithOtherUsers.json
 */
async function createAMigrationSpecifyingUserNames() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.migrations.create(
    "exampleresourcegroup",
    "exampleserver",
    "examplemigration",
    {
      location: "eastus",
      dbsToMigrate: [
        "exampledatabase1",
        "exampledatabase2",
        "exampledatabase3",
        "exampledatabase4",
      ],
      migrationMode: "Offline",
      secretParameters: {
        adminCredentials: {
          sourceServerPassword: "examplesourcepassword",
          targetServerPassword: "exampletargetpassword",
        },
        sourceServerUsername: "newadmin@examplesource",
        targetServerUsername: "targetadmin",
      },
      sourceDbServerResourceId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBForPostgreSql/servers/examplesource",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new migration.
 *
 * @summary creates a new migration.
 * x-ms-original-file: 2026-01-01-preview/MigrationsCreateWithPrivateEndpointServers.json
 */
async function createAMigrationWithPrivateEndpoint() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.migrations.create(
    "exampleresourcegroup",
    "exampleserver",
    "examplemigration",
    {
      location: "eastus",
      dbsToMigrate: [
        "exampledatabase1",
        "exampledatabase2",
        "exampledatabase3",
        "exampledatabase4",
      ],
      migrationInstanceResourceId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBForPostgreSql/flexibleServers/examplesourcemigration",
      migrationMode: "Offline",
      overwriteDbsInTarget: "True",
      secretParameters: {
        adminCredentials: {
          sourceServerPassword: "examplesourcepassword",
          targetServerPassword: "exampletargetpassword",
        },
      },
      sourceDbServerResourceId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBForPostgreSql/servers/examplesource",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new migration.
 *
 * @summary creates a new migration.
 * x-ms-original-file: 2026-01-01-preview/MigrationsCreateWithRoles.json
 */
async function createAMigrationWithRoles() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.migrations.create(
    "exampleresourcegroup",
    "exampleserver",
    "examplemigration",
    {
      location: "eastus",
      dbsToMigrate: [
        "exampledatabase1",
        "exampledatabase2",
        "exampledatabase3",
        "exampledatabase4",
      ],
      migrateRoles: "True",
      migrationMode: "Offline",
      overwriteDbsInTarget: "True",
      secretParameters: {
        adminCredentials: {
          sourceServerPassword: "examplesourcepassword",
          targetServerPassword: "exampletargetpassword",
        },
      },
      sourceDbServerResourceId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBForPostgreSql/servers/examplesource",
    },
  );
  console.log(result);
}

async function main() {
  await createAMigration();
  await createAMigrationWithOtherSourceTypeForValidatingAndMigrating();
  await createAMigrationForValidatingOnly();
  await createAMigrationWithFullyQualifiedDomainNamesForSourceAndTargetServers();
  await createAMigrationSpecifyingUserNames();
  await createAMigrationWithPrivateEndpoint();
  await createAMigrationWithRoles();
}

main().catch(console.error);
