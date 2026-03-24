// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the details of the API Operation specified by its identifier.
 *
 * @summary gets the details of the API Operation specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetApiOperation.json
 */
async function apiManagementGetApiOperation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiOperation.get(
    "rg1",
    "apimService1",
    "57d2ef278aa04f0888cba3f3",
    "57d2ef278aa04f0ad01d6cdc",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets the details of the API Operation specified by its identifier.
 *
 * @summary gets the details of the API Operation specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetApiOperationPetStore.json
 */
async function apiManagementGetApiOperationPetStore(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiOperation.get(
    "rg1",
    "apimService1",
    "swagger-petstore",
    "loginUser",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetApiOperation();
  await apiManagementGetApiOperationPetStore();
}

main().catch(console.error);
