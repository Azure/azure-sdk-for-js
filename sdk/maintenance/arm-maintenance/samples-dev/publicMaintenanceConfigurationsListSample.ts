// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MaintenanceManagementClient } from "@azure/arm-maintenance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get Public Maintenance Configuration records
 *
 * @summary get Public Maintenance Configuration records
 * x-ms-original-file: 2023-10-01-preview/PublicMaintenanceConfigurations_List.json
 */
async function publicMaintenanceConfigurationsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5b4b650e-28b9-4790-b3ab-ddbd88d727c4";
  const client = new MaintenanceManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.publicMaintenanceConfigurations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await publicMaintenanceConfigurationsList();
}

main().catch(console.error);
