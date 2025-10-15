// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get Configuration record
 *
 * @summary Get Configuration record
 * x-ms-original-file: specification/maintenance/resource-manager/Microsoft.Maintenance/preview/2023-10-01-preview/examples/MaintenanceConfigurations_GetForResource.json
 */

import { MaintenanceManagementClient } from "@azure/arm-maintenance";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function maintenanceConfigurationsGetForResource(): Promise<void> {
  const subscriptionId =
    process.env["MAINTENANCE_SUBSCRIPTION_ID"] || "5b4b650e-28b9-4790-b3ab-ddbd88d727c4";
  const resourceGroupName = process.env["MAINTENANCE_RESOURCE_GROUP"] || "examplerg";
  const resourceName = "configuration1";
  const credential = new DefaultAzureCredential();
  const client = new MaintenanceManagementClient(credential, subscriptionId);
  const result = await client.maintenanceConfigurations.get(resourceGroupName, resourceName);
  console.log(result);
}

/**
 * This sample demonstrates how to Get Configuration record
 *
 * @summary Get Configuration record
 * x-ms-original-file: specification/maintenance/resource-manager/Microsoft.Maintenance/preview/2023-10-01-preview/examples/MaintenanceConfigurations_GetForResource_GuestOSPatchLinux.json
 */
async function maintenanceConfigurationsGetForResourceGuestOSPatchLinux(): Promise<void> {
  const subscriptionId =
    process.env["MAINTENANCE_SUBSCRIPTION_ID"] || "5b4b650e-28b9-4790-b3ab-ddbd88d727c4";
  const resourceGroupName = process.env["MAINTENANCE_RESOURCE_GROUP"] || "examplerg";
  const resourceName = "configuration1";
  const credential = new DefaultAzureCredential();
  const client = new MaintenanceManagementClient(credential, subscriptionId);
  const result = await client.maintenanceConfigurations.get(resourceGroupName, resourceName);
  console.log(result);
}

/**
 * This sample demonstrates how to Get Configuration record
 *
 * @summary Get Configuration record
 * x-ms-original-file: specification/maintenance/resource-manager/Microsoft.Maintenance/preview/2023-10-01-preview/examples/MaintenanceConfigurations_GetForResource_GuestOSPatchWindows.json
 */
async function maintenanceConfigurationsGetForResourceGuestOSPatchWindows(): Promise<void> {
  const subscriptionId =
    process.env["MAINTENANCE_SUBSCRIPTION_ID"] || "5b4b650e-28b9-4790-b3ab-ddbd88d727c4";
  const resourceGroupName = process.env["MAINTENANCE_RESOURCE_GROUP"] || "examplerg";
  const resourceName = "configuration1";
  const credential = new DefaultAzureCredential();
  const client = new MaintenanceManagementClient(credential, subscriptionId);
  const result = await client.maintenanceConfigurations.get(resourceGroupName, resourceName);
  console.log(result);
}

async function main(): Promise<void> {
  await maintenanceConfigurationsGetForResource();
  await maintenanceConfigurationsGetForResourceGuestOSPatchLinux();
  await maintenanceConfigurationsGetForResourceGuestOSPatchWindows();
}

main().catch(console.error);
