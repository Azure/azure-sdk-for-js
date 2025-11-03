// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceBusManagementClient } = require("@azure/arm-servicebus");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates Migration configuration and starts migration of entities from Standard to Premium namespace
 *
 * @summary creates Migration configuration and starts migration of entities from Standard to Premium namespace
 * x-ms-original-file: 2025-05-01-preview/Migrationconfigurations/SBMigrationconfigurationCreateAndStartMigration.json
 */
async function migrationConfigurationsStartMigration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.migrationConfigs.createAndStartMigration(
    "ResourceGroup",
    "sdk-Namespace-41",
    "$default",
    {
      properties: {
        postMigrationName: "sdk-PostMigration-5919",
        targetNamespace:
          "/subscriptions/5f750a97-50d9-4e36-8081-c9ee4c0210d4/resourceGroups/ResourceGroup/providers/Microsoft.ServiceBus/namespaces/sdk-Namespace-4028",
      },
    },
  );
  console.log(result);
}

async function main() {
  await migrationConfigurationsStartMigration();
}

main().catch(console.error);
