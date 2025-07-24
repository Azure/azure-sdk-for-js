// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get schema registry clusters
 *
 * @summary get schema registry clusters
 * x-ms-original-file: 2024-07-01/Organization_ListSchemaRegistryClusters.json
 */
async function organizationListSchemaRegistryClusters() {
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

async function main() {
  await organizationListSchemaRegistryClusters();
}

main().catch(console.error);
