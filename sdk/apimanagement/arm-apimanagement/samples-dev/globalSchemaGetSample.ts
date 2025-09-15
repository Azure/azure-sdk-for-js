// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the details of the Schema specified by its identifier.
 *
 * @summary Gets the details of the Schema specified by its identifier.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementGetGlobalSchema1.json
 */

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementGetSchema1(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const schemaId = "schema1";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.globalSchema.get(
    resourceGroupName,
    serviceName,
    schemaId,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Gets the details of the Schema specified by its identifier.
 *
 * @summary Gets the details of the Schema specified by its identifier.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementGetGlobalSchema2.json
 */
async function apiManagementGetSchema2(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const schemaId = "schema2";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.globalSchema.get(
    resourceGroupName,
    serviceName,
    schemaId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetSchema1();
  await apiManagementGetSchema2();
}

main().catch(console.error);
