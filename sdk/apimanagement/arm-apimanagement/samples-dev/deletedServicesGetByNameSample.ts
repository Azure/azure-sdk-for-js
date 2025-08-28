// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get soft-deleted Api Management Service by name.
 *
 * @summary Get soft-deleted Api Management Service by name.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementGetDeletedServiceByName.json
 */

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementGetDeletedServiceByName(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const serviceName = "apimService3";
  const location = "westus";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.deletedServices.getByName(serviceName, location);
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetDeletedServiceByName();
}

main().catch(console.error);
