// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the services resource is the top-level resource that represents the Azure Database Migration Service (classic). This method returns a list of service resources in a subscription.
 *
 * @summary the services resource is the top-level resource that represents the Azure Database Migration Service (classic). This method returns a list of service resources in a subscription.
 * x-ms-original-file: 2025-09-01-preview/Services_List.json
 */
async function servicesList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.services.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await servicesList();
}

main().catch(console.error);
