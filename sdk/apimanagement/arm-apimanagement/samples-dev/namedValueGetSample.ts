// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the details of the named value specified by its identifier.
 *
 * @summary Gets the details of the named value specified by its identifier.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementGetNamedValue.json
 */

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementGetNamedValue(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const namedValueId = "testarmTemplateproperties2";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.namedValue.get(
    resourceGroupName,
    serviceName,
    namedValueId,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Gets the details of the named value specified by its identifier.
 *
 * @summary Gets the details of the named value specified by its identifier.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementGetNamedValueWithKeyVault.json
 */
async function apiManagementGetNamedValueWithKeyVault(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const namedValueId = "testprop6";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.namedValue.get(
    resourceGroupName,
    serviceName,
    namedValueId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetNamedValue();
  await apiManagementGetNamedValueWithKeyVault();
}

main().catch(console.error);
