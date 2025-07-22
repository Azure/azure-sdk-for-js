// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MaintenanceManagementClient } from "@azure/arm-maintenance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get Configuration records within a subscription
 *
 * @summary get Configuration records within a subscription
 * x-ms-original-file: 2023-10-01-preview/MaintenanceConfigurations_List.json
 */
async function maintenanceConfigurationsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5b4b650e-28b9-4790-b3ab-ddbd88d727c4";
  const client = new MaintenanceManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.maintenanceConfigurations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await maintenanceConfigurationsList();
}

main().catch(console.error);
