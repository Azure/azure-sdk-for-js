// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The services resource is the top-level resource that represents the Azure Database Migration Service (classic). This action stops the service and the service cannot be used for data migration. The service owner won't be billed when the service is stopped.
 *
 * @summary The services resource is the top-level resource that represents the Azure Database Migration Service (classic). This action stops the service and the service cannot be used for data migration. The service owner won't be billed when the service is stopped.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/preview/2025-03-15-preview/examples/Services_Stop.json
 */

import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function servicesStop(): Promise<void> {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] ||
    "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const groupName = "DmsSdkRg";
  const serviceName = "DmsSdkService";
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.services.beginStopAndWait(groupName, serviceName);
  console.log(result);
}

async function main(): Promise<void> {
  await servicesStop();
}

main().catch(console.error);
