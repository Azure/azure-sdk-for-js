// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get schema registry clusters
 *
 * @summary get schema registry clusters
 * x-ms-original-file: 2024-07-01/Organization_ListSchemaRegistryClusters.json
 */
async function organizationListSchemaRegistryClusters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.organization.listSchemaRegistryClusters(
    "myResourceGroup",
    "myOrganization",
    "env-stgcczjp2j3",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await organizationListSchemaRegistryClusters();
}

main().catch(console.error);
