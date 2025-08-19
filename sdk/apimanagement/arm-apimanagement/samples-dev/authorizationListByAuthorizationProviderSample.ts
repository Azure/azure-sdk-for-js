// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists a collection of authorization providers defined within a authorization provider.
 *
 * @summary Lists a collection of authorization providers defined within a authorization provider.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementListAuthorizationsAuthCode.json
 */

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementListAuthorizationsAuthCode(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const authorizationProviderId = "aadwithauthcode";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.authorization.listByAuthorizationProvider(
    resourceGroupName,
    serviceName,
    authorizationProviderId,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Lists a collection of authorization providers defined within a authorization provider.
 *
 * @summary Lists a collection of authorization providers defined within a authorization provider.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementListAuthorizationsClientCred.json
 */
async function apiManagementListAuthorizationsClientCred(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const authorizationProviderId = "aadwithclientcred";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.authorization.listByAuthorizationProvider(
    resourceGroupName,
    serviceName,
    authorizationProviderId,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await apiManagementListAuthorizationsAuthCode();
  await apiManagementListAuthorizationsClientCred();
}

main().catch(console.error);
