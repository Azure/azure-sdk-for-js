// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MaintenanceManagementClient } from "@azure/arm-maintenance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get Configuration records within a subscription and resource group
 *
 * @summary get Configuration records within a subscription and resource group
 * x-ms-original-file: 2023-10-01-preview/MaintenanceConfigurationsResourceGroup_List.json
 */
async function maintenanceConfigurationsResourceGroupList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5b4b650e-28b9-4790-b3ab-ddbd88d727c4";
  const client = new MaintenanceManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.maintenanceConfigurationsForResourceGroup.list("examplerg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await maintenanceConfigurationsResourceGroupList();
}

main().catch(console.error);
