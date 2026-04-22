// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceGroupsManagementClient } = require("@azure/arm-servicegroups");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the details of the serviceGroup's ancestors
 *
 * @summary get the details of the serviceGroup's ancestors
 * x-ms-original-file: 2024-02-01-preview/ServiceGroup_ListAncestors.json
 */
async function listServiceGroupAncestors() {
  const credential = new DefaultAzureCredential();
  const client = new ServiceGroupsManagementClient(credential);
  const result = await client.serviceGroups.listAncestors("20000000-0001-0000-0000-000000000000");
  console.log(result);
}

async function main() {
  await listServiceGroupAncestors();
}

main().catch(console.error);
