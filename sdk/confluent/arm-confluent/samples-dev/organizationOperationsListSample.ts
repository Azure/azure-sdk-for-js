// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to List all operations provided by Microsoft.Confluent.
 *
 * @summary List all operations provided by Microsoft.Confluent.
 * x-ms-original-file: specification/confluent/resource-manager/Microsoft.Confluent/stable/2024-02-13/examples/OrganizationOperations_List.json
 */
async function organizationOperationsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConfluentManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.organizationOperations.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await organizationOperationsList();
}

main().catch(console.error);
