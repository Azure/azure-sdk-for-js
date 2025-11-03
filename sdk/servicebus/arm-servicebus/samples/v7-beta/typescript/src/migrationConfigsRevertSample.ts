// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceBusManagementClient } from "@azure/arm-servicebus";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation reverts Migration
 *
 * @summary this operation reverts Migration
 * x-ms-original-file: 2025-05-01-preview/Migrationconfigurations/SBMigrationconfigurationRevert.json
 */
async function migrationConfigurationsRevert(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  await client.migrationConfigs.revert("ResourceGroup", "sdk-Namespace-41", "$default");
}

async function main(): Promise<void> {
  await migrationConfigurationsRevert();
}

main().catch(console.error);
