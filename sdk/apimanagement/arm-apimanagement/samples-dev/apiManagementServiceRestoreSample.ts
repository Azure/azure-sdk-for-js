// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Restores a backup of an API Management service created using the ApiManagementService_Backup operation on the current service. This is a long running operation and could take several minutes to complete.
 *
 * @summary Restores a backup of an API Management service created using the ApiManagementService_Backup operation on the current service. This is a long running operation and could take several minutes to complete.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementRestoreWithAccessKey.json
 */

import {
  ApiManagementServiceBackupRestoreParameters,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementRestoreService(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const parameters: ApiManagementServiceBackupRestoreParameters = {
    accessKey: "**************************************************",
    accessType: "AccessKey",
    backupName: "apimService1backup_2017_03_19",
    containerName: "backupContainer",
    storageAccount: "teststorageaccount",
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.beginRestoreAndWait(
    resourceGroupName,
    serviceName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementRestoreService();
}

main().catch(console.error);
