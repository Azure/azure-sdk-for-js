// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list the operations for the provider
 *
 * @summary list the operations for the provider
 * x-ms-original-file: 2025-08-18-preview/OrganizationOperations_List_MaximumSet_Gen.json
 */
async function organizationOperationsListMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConfluentManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.organizationOperations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list the operations for the provider
 *
 * @summary list the operations for the provider
 * x-ms-original-file: 2025-08-18-preview/OrganizationOperations_List_MinimumSet_Gen.json
 */
async function organizationOperationsListMinimumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConfluentManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.organizationOperations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await organizationOperationsListMaximumSet();
  await organizationOperationsListMinimumSet();
}

main().catch(console.error);
