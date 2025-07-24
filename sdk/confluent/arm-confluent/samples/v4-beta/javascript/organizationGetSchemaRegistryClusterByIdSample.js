// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get schema registry cluster by Id
 *
 * @summary get schema registry cluster by Id
 * x-ms-original-file: 2024-07-01/Organization_GetSchemaRegistryClusterById.json
 */
async function organizationGetSchemaRegistryClusterById() {
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

async function main() {
  await organizationGetSchemaRegistryClusterById();
}

main().catch(console.error);
