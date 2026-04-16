// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to The services resource is the top-level resource that represents the Azure Database Migration Service (classic). This action stops the service and the service cannot be used for data migration. The service owner won't be billed when the service is stopped.
 *
 * @summary The services resource is the top-level resource that represents the Azure Database Migration Service (classic). This action stops the service and the service cannot be used for data migration. The service owner won't be billed when the service is stopped.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/stable/2025-06-30/examples/Services_Stop.json
 */
async function servicesStop() {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] || "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const groupName = "DmsSdkRg";
  const serviceName = "DmsSdkService";
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.services.beginStopAndWait(groupName, serviceName);
  console.log(result);
}

async function main() {
  await servicesStop();
}

main().catch(console.error);
