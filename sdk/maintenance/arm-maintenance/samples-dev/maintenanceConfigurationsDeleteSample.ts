// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete Configuration record
 *
 * @summary Delete Configuration record
 * x-ms-original-file: specification/maintenance/resource-manager/Microsoft.Maintenance/preview/2023-10-01-preview/examples/MaintenanceConfigurations_DeleteForResource.json
 */

import { MaintenanceManagementClient } from "@azure/arm-maintenance";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function maintenanceConfigurationsDeleteForResource(): Promise<void> {
  const subscriptionId =
    process.env["MAINTENANCE_SUBSCRIPTION_ID"] || "5b4b650e-28b9-4790-b3ab-ddbd88d727c4";
  const resourceGroupName = process.env["MAINTENANCE_RESOURCE_GROUP"] || "examplerg";
  const resourceName = "example1";
  const credential = new DefaultAzureCredential();
  const client = new MaintenanceManagementClient(credential, subscriptionId);
  const result = await client.maintenanceConfigurations.delete(resourceGroupName, resourceName);
  console.log(result);
}

async function main(): Promise<void> {
  await maintenanceConfigurationsDeleteForResource();
}

main().catch(console.error);
