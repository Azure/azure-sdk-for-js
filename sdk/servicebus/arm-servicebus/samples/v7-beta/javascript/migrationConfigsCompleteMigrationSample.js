// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceBusManagementClient } = require("@azure/arm-servicebus");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation Completes Migration of entities by pointing the connection strings to Premium namespace and any entities created after the operation will be under Premium Namespace. CompleteMigration operation will fail when entity migration is in-progress.
 *
 * @summary this operation Completes Migration of entities by pointing the connection strings to Premium namespace and any entities created after the operation will be under Premium Namespace. CompleteMigration operation will fail when entity migration is in-progress.
 * x-ms-original-file: 2025-05-01-preview/Migrationconfigurations/SBMigrationconfigurationCompleteMigration.json
 */
async function migrationConfigurationsCompleteMigration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  await client.migrationConfigs.completeMigration("ResourceGroup", "sdk-Namespace-41", "$default");
}

async function main() {
  await migrationConfigurationsCompleteMigration();
}

main().catch(console.error);
