// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceBusManagementClient } = require("@azure/arm-servicebus");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves Migration Config
 *
 * @summary retrieves Migration Config
 * x-ms-original-file: 2025-05-01-preview/Migrationconfigurations/SBMigrationconfigurationGet.json
 */
async function migrationConfigurationsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.migrationConfigs.get("ResourceGroup", "sdk-Namespace-41", "$default");
  console.log(result);
}

async function main() {
  await migrationConfigurationsGet();
}

main().catch(console.error);
