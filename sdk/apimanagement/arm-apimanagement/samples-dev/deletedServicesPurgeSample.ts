// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Purges Api Management Service (deletes it with no option to undelete).
 *
 * @summary Purges Api Management Service (deletes it with no option to undelete).
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementDeletedServicesPurge.json
 */
async function apiManagementDeletedServicesPurge(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const serviceName = "apimService3";
  const location = "westus";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.deletedServices.beginPurgeAndWait(
    serviceName,
    location,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementDeletedServicesPurge();
}

main().catch(console.error);
