// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the operations for the provider
 *
 * @summary list the operations for the provider
 * x-ms-original-file: 2025-08-18-preview/OrganizationOperations_List_MaximumSet_Gen.json
 */
async function organizationOperationsListMaximumSet() {
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
async function organizationOperationsListMinimumSet() {
  const credential = new DefaultAzureCredential();
  const client = new ConfluentManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.organizationOperations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await organizationOperationsListMaximumSet();
  await organizationOperationsListMinimumSet();
}

main().catch(console.error);
