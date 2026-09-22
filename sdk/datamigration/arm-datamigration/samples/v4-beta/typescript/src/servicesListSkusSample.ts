// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the services resource is the top-level resource that represents the Database Migration Service (classic). The skus action returns the list of SKUs that a service resource can be updated to.
 *
 * @summary the services resource is the top-level resource that represents the Database Migration Service (classic). The skus action returns the list of SKUs that a service resource can be updated to.
 * x-ms-original-file: 2025-09-01-preview/Services_ListSkus.json
 */
async function servicesListSkus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.services.listSkus("DmsSdkRg", "DmsSdkService")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await servicesListSkus();
}

main().catch(console.error);
