// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContentStoreClient } = require("@azure/arm-commvault");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list RoleMapping resources by CloudAccount
 *
 * @summary list RoleMapping resources by CloudAccount
 * x-ms-original-file: 2026-07-03-preview/RoleMappings_List_MaximumSet_Gen.json
 */
async function roleMappingsList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1B4766AF-8D4B-4B44-9CF1-587E003DFF7F";
  const client = new ContentStoreClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.roleMappings.list("rgcommvault", "myCloudAccount")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list RoleMapping resources by CloudAccount
 *
 * @summary list RoleMapping resources by CloudAccount
 * x-ms-original-file: 2026-07-03-preview/RoleMappings_List_MinimumSet_Gen.json
 */
async function roleMappingsListMinimumSetListRoleMappingsWithSingleRole() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1B4766AF-8D4B-4B44-9CF1-587E003DFF7F";
  const client = new ContentStoreClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.roleMappings.list("rgcommvault", "myCloudAccount")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await roleMappingsList();
  await roleMappingsListMinimumSetListRoleMappingsWithSingleRole();
}

main().catch(console.error);
