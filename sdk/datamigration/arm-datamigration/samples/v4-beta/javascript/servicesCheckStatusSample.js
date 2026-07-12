// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the services resource is the top-level resource that represents the Azure Database Migration Service (classic). This action performs a health check and returns the status of the service and virtual machine size.
 *
 * @summary the services resource is the top-level resource that represents the Azure Database Migration Service (classic). This action performs a health check and returns the status of the service and virtual machine size.
 * x-ms-original-file: 2025-09-01-preview/Services_CheckStatus.json
 */
async function servicesCheckStatus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.services.checkStatus("DmsSdkRg", "DmsSdkService");
  console.log(result);
}

async function main() {
  await servicesCheckStatus();
}

main().catch(console.error);
