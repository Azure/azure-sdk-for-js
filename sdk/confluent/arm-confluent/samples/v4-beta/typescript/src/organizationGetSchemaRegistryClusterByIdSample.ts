// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get schema registry cluster by Id
 *
 * @summary get schema registry cluster by Id
 * x-ms-original-file: 2024-07-01/Organization_GetSchemaRegistryClusterById.json
 */
async function organizationGetSchemaRegistryClusterById(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.organization.getSchemaRegistryClusterById(
    "myResourceGroup",
    "myOrganization",
    "env-stgcczjp2j3",
    "lsrc-stgczkq22z",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await organizationGetSchemaRegistryClusterById();
}

main().catch(console.error);
