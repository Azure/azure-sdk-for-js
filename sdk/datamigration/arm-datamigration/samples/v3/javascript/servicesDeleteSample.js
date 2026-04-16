// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to The services resource is the top-level resource that represents the Azure Database Migration Service (classic). The DELETE method deletes a service. Any running tasks will be canceled.
 *
 * @summary The services resource is the top-level resource that represents the Azure Database Migration Service (classic). The DELETE method deletes a service. Any running tasks will be canceled.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/stable/2025-06-30/examples/Services_Delete.json
 */
async function servicesCreateOrUpdate() {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] || "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const groupName = "DmsSdkRg";
  const serviceName = "DmsSdkService";
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.services.beginDeleteAndWait(groupName, serviceName);
  console.log(result);
}

async function main() {
  await servicesCreateOrUpdate();
}

main().catch(console.error);
