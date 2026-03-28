// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists a collection of authorization providers defined within a authorization provider.
 *
 * @summary lists a collection of authorization providers defined within a authorization provider.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListAuthorizationsAuthCode.json
 */
async function apiManagementListAuthorizationsAuthCode(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.authorization.listByAuthorizationProvider(
    "rg1",
    "apimService1",
    "aadwithauthcode",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists a collection of authorization providers defined within a authorization provider.
 *
 * @summary lists a collection of authorization providers defined within a authorization provider.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListAuthorizationsClientCred.json
 */
async function apiManagementListAuthorizationsClientCred(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.authorization.listByAuthorizationProvider(
    "rg1",
    "apimService1",
    "aadwithclientcred",
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
