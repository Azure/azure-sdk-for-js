// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the services resource is the top-level resource that represents the Azure Database Migration Service (classic). The GET method retrieves information about a service instance.
 *
 * @summary the services resource is the top-level resource that represents the Azure Database Migration Service (classic). The GET method retrieves information about a service instance.
 * x-ms-original-file: 2025-09-01-preview/Services_Get.json
 */
async function servicesCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.services.get("DmsSdkRg", "DmsSdkService");
  console.log(result);
}

async function main(): Promise<void> {
  await servicesCreateOrUpdate();
}

main().catch(console.error);
