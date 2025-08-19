// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Apply maintenance updates to resource
 *
 * @summary Apply maintenance updates to resource
 * x-ms-original-file: specification/maintenance/resource-manager/Microsoft.Maintenance/preview/2023-10-01-preview/examples/ApplyUpdates_CreateOrUpdate.json
 */

import { MaintenanceManagementClient } from "@azure/arm-maintenance";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function applyUpdatesCreateOrUpdate(): Promise<void> {
  const subscriptionId =
    process.env["MAINTENANCE_SUBSCRIPTION_ID"] || "5b4b650e-28b9-4790-b3ab-ddbd88d727c4";
  const resourceGroupName = process.env["MAINTENANCE_RESOURCE_GROUP"] || "examplerg";
  const providerName = "Microsoft.Compute";
  const resourceType = "virtualMachineScaleSets";
  const resourceName = "smdtest1";
  const credential = new DefaultAzureCredential();
  const client = new MaintenanceManagementClient(credential, subscriptionId);
  const result = await client.applyUpdates.createOrUpdate(
    resourceGroupName,
    providerName,
    resourceType,
    resourceName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await applyUpdatesCreateOrUpdate();
}

main().catch(console.error);
