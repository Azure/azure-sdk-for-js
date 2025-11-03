// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceBusManagementClient } from "@azure/arm-servicebus";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all migrationConfigurations
 *
 * @summary gets all migrationConfigurations
 * x-ms-original-file: 2025-05-01-preview/Migrationconfigurations/SBMigrationconfigurationList.json
 */
async function migrationConfigurationsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.migrationConfigs.list("ResourceGroup", "sdk-Namespace-9259")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await migrationConfigurationsList();
}

main().catch(console.error);
