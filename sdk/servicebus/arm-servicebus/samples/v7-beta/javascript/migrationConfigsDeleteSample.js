// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceBusManagementClient } = require("@azure/arm-servicebus");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a MigrationConfiguration
 *
 * @summary deletes a MigrationConfiguration
 * x-ms-original-file: 2025-05-01-preview/Migrationconfigurations/SBMigrationconfigurationDelete.json
 */
async function migrationConfigurationsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  await client.migrationConfigs.delete("ResourceGroup", "sdk-Namespace-41", "$default");
}

async function main() {
  await migrationConfigurationsDelete();
}

main().catch(console.error);
