// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the Services resource is the top-level resource that represents the Azure Database Migration Service (classic). This method returns a list of service resources in a resource group.
 *
 * @summary the Services resource is the top-level resource that represents the Azure Database Migration Service (classic). This method returns a list of service resources in a resource group.
 * x-ms-original-file: 2025-09-01-preview/Services_ListByResourceGroup.json
 */
async function servicesListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.services.listByResourceGroup("DmsSdkRg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await servicesListByResourceGroup();
}

main().catch(console.error);
