// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MaintenanceManagementClient } from "@azure/arm-maintenance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete Configuration record
 *
 * @summary delete Configuration record
 * x-ms-original-file: 2023-10-01-preview/MaintenanceConfigurations_DeleteForResource.json
 */
async function maintenanceConfigurationsDeleteForResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5b4b650e-28b9-4790-b3ab-ddbd88d727c4";
  const client = new MaintenanceManagementClient(credential, subscriptionId);
  const result = await client.maintenanceConfigurations.delete("examplerg", "example1");
  console.log(result);
}

async function main(): Promise<void> {
  await maintenanceConfigurationsDeleteForResource();
}

main().catch(console.error);
