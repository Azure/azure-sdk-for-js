// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  Migration} from "@azure/arm-postgresql-flexible";
import {
  PostgreSQLManagementFlexibleServerClient,
} from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates a new migration.
 *
 * @summary Creates a new migration.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/MigrationsCreateValidateOnly.json
 */
async function createAMigrationForValidatingOnly(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const migrationName = "examplemigration";
  const parameters: Migration = {
    dbsToMigrate: [
      "exampledatabase1",
      "exampledatabase2",
      "exampledatabase3",
      "exampledatabase4",
    ],
    location: "eastus",
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
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
  const result = await client.migrations.create(
    resourceGroupName,
    serverName,
    migrationName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new migration.
 *
 * @summary Creates a new migration.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/MigrationsCreateWithOtherUsers.json
 */
async function createAMigrationSpecifyingUserNames(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const migrationName = "examplemigration";
  const parameters: Migration = {
    dbsToMigrate: [
      "exampledatabase1",
      "exampledatabase2",
      "exampledatabase3",
      "exampledatabase4",
    ],
    location: "eastus",
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
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
  const result = await client.migrations.create(
    resourceGroupName,
    serverName,
    migrationName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new migration.
 *
 * @summary Creates a new migration.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/MigrationsCreateWithFullyQualifiedDomainName.json
 */
async function createAMigrationWithFullyQualifiedDomainNamesForSourceAndTargetServers(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const migrationName = "examplemigration";
  const parameters: Migration = {
    dbsToMigrate: [
      "exampledatabase1",
      "exampledatabase2",
      "exampledatabase3",
      "exampledatabase4",
    ],
    location: "eastus",
    migrationMode: "Offline",
    overwriteDbsInTarget: "True",
    secretParameters: {
      adminCredentials: {
        sourceServerPassword: "xxxxxxxx",
        targetServerPassword: "xxxxxxxx",
      },
    },
    sourceDbServerFullyQualifiedDomainName: "examplesource.contoso.com",
    sourceDbServerResourceId:
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBForPostgreSql/servers/examplesource",
    targetDbServerFullyQualifiedDomainName: "exampletarget.contoso.com",
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
  const result = await client.migrations.create(
    resourceGroupName,
    serverName,
    migrationName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new migration.
 *
 * @summary Creates a new migration.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/MigrationsCreateOtherSourceTypesValidateMigrate.json
 */
async function createAMigrationWithOtherSourceTypeForValidatingAndMigrating(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const migrationName = "examplemigration";
  const parameters: Migration = {
    dbsToMigrate: [
      "exampledatabase1",
      "exampledatabase2",
      "exampledatabase3",
      "exampledatabase4",
    ],
    location: "eastus",
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
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
  const result = await client.migrations.create(
    resourceGroupName,
    serverName,
    migrationName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new migration.
 *
 * @summary Creates a new migration.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/MigrationsCreateWithPrivateEndpointServers.json
 */
async function createAMigrationWithPrivateEndpoint(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const migrationName = "examplemigration";
  const parameters: Migration = {
    dbsToMigrate: [
      "exampledatabase1",
      "exampledatabase2",
      "exampledatabase3",
      "exampledatabase4",
    ],
    location: "eastus",
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
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
  const result = await client.migrations.create(
    resourceGroupName,
    serverName,
    migrationName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new migration.
 *
 * @summary Creates a new migration.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/MigrationsCreateWithRoles.json
 */
async function createAMigrationWithRoles(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const migrationName = "examplemigration";
  const parameters: Migration = {
    dbsToMigrate: [
      "exampledatabase1",
      "exampledatabase2",
      "exampledatabase3",
      "exampledatabase4",
    ],
    location: "eastus",
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
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
  const result = await client.migrations.create(
    resourceGroupName,
    serverName,
    migrationName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new migration.
 *
 * @summary Creates a new migration.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/MigrationsCreate.json
 */
async function createAMigration(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const migrationName = "examplemigration";
  const parameters: Migration = {
    dbsToMigrate: [
      "exampledatabase1",
      "exampledatabase2",
      "exampledatabase3",
      "exampledatabase4",
    ],
    location: "eastus",
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
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
  const result = await client.migrations.create(
    resourceGroupName,
    serverName,
    migrationName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createAMigrationForValidatingOnly();
  await createAMigrationSpecifyingUserNames();
  await createAMigrationWithFullyQualifiedDomainNamesForSourceAndTargetServers();
  await createAMigrationWithOtherSourceTypeForValidatingAndMigrating();
  await createAMigrationWithPrivateEndpoint();
  await createAMigrationWithRoles();
  await createAMigration();
}

main().catch(console.error);
