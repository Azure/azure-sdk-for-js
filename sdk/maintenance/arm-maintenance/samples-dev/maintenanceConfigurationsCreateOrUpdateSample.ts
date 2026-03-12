// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or Update configuration record
 *
 * @summary Create or Update configuration record
 * x-ms-original-file: specification/maintenance/resource-manager/Microsoft.Maintenance/preview/2023-10-01-preview/examples/MaintenanceConfigurations_CreateOrUpdateForResource.json
 */

import type { MaintenanceConfiguration } from "@azure/arm-maintenance";
import { MaintenanceManagementClient } from "@azure/arm-maintenance";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function maintenanceConfigurationsCreateOrUpdateForResource(): Promise<void> {
  const subscriptionId =
    process.env["MAINTENANCE_SUBSCRIPTION_ID"] || "5b4b650e-28b9-4790-b3ab-ddbd88d727c4";
  const resourceGroupName = process.env["MAINTENANCE_RESOURCE_GROUP"] || "examplerg";
  const resourceName = "configuration1";
  const configuration: MaintenanceConfiguration = {
    duration: "05:00",
    expirationDateTime: "9999-12-31 00:00",
    location: "westus2",
    maintenanceScope: "OSImage",
    namespace: "Microsoft.Maintenance",
    recurEvery: "Day",
    startDateTime: "2020-04-30 08:00",
    timeZone: "Pacific Standard Time",
    visibility: "Custom",
  };
  const credential = new DefaultAzureCredential();
  const client = new MaintenanceManagementClient(credential, subscriptionId);
  const result = await client.maintenanceConfigurations.createOrUpdate(
    resourceGroupName,
    resourceName,
    configuration,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await maintenanceConfigurationsCreateOrUpdateForResource();
}

main().catch(console.error);
