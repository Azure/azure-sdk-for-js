// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * This sample demonstrates how to The services resource is the top-level resource that represents the Database Migration Service. This action performs a health check and returns the status of the service and virtual machine size.
 *
 * @summary The services resource is the top-level resource that represents the Database Migration Service. This action performs a health check and returns the status of the service and virtual machine size.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/preview/2021-10-30-preview/examples/Services_CheckStatus.json
 */
import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";

async function servicesCheckStatus(): Promise<void> {
  const subscriptionId = "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const groupName = "DmsSdkRg";
  const serviceName = "DmsSdkService";
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.services.checkStatus(groupName, serviceName);
  console.log(result);
}

servicesCheckStatus().catch(console.error);
