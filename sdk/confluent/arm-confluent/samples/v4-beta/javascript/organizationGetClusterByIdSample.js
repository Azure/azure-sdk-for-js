// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get cluster by Id
 *
 * @summary get cluster by Id
 * x-ms-original-file: 2024-07-01/Organization_GetClusterById.json
 */
async function organizationGetClusterById() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.organization.getClusterById(
    "myResourceGroup",
    "myOrganization",
    "env-12132",
    "ProdKafkaCluster",
  );
  console.log(result);
}

async function main() {
  await organizationGetClusterById();
}

main().catch(console.error);
