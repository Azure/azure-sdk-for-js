// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to This operation reverts Migration
 *
 * @summary This operation reverts Migration
 * x-ms-original-file: specification/servicebus/resource-manager/Microsoft.ServiceBus/preview/2022-10-01-preview/examples/Migrationconfigurations/SBMigrationconfigurationRevert.json
 */

import { ServiceBusManagementClient } from "@azure/arm-servicebus";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function migrationConfigurationsRevert(): Promise<void> {
  const subscriptionId = process.env["SERVICEBUS_SUBSCRIPTION_ID"] || "SubscriptionId";
  const resourceGroupName = process.env["SERVICEBUS_RESOURCE_GROUP"] || "ResourceGroup";
  const namespaceName = "sdk-Namespace-41";
  const configName = "$default";
  const credential = new DefaultAzureCredential();
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.migrationConfigs.revert(resourceGroupName, namespaceName, configName);
  console.log(result);
}

async function main(): Promise<void> {
  await migrationConfigurationsRevert();
}

main().catch(console.error);
