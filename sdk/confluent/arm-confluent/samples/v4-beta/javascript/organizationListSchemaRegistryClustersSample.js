// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get schema registry clusters
 *
 * @summary get schema registry clusters
 * x-ms-original-file: 2025-08-18-preview/Organization_ListSchemaRegistryClusters_MaximumSet_Gen.json
 */
async function organizationListSchemaRegistryClustersMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.organization.listSchemaRegistryClusters(
    "rgconfluent",
    "vkzifcygqhoewuixdmmg",
    "psxriyxxbjnctgeohah",
    { pageSize: 3, pageToken: "npqeazvityguunrpgbumrqivvq" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to get schema registry clusters
 *
 * @summary get schema registry clusters
 * x-ms-original-file: 2025-08-18-preview/Organization_ListSchemaRegistryClusters_MinimumSet_Gen.json
 */
async function organizationListSchemaRegistryClustersMinimumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.organization.listSchemaRegistryClusters(
    "rgconfluent",
    "npek",
    "tdtxr",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await organizationListSchemaRegistryClustersMaximumSet();
  await organizationListSchemaRegistryClustersMinimumSet();
}

main().catch(console.error);
