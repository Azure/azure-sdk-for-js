// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the services resource is the top-level resource that represents the Azure Database Migration Service (classic). The GET method retrieves information about a service instance.
 *
 * @summary the services resource is the top-level resource that represents the Azure Database Migration Service (classic). The GET method retrieves information about a service instance.
 * x-ms-original-file: 2025-09-01-preview/Services_Get.json
 */
async function servicesCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.services.get("DmsSdkRg", "DmsSdkService");
  console.log(result);
}

async function main() {
  await servicesCreateOrUpdate();
}

main().catch(console.error);
