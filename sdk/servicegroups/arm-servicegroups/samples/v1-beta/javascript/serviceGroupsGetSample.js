// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagementClient } = require("@azure/arm-servicegroups");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the details of the serviceGroup
 *
 * @summary get the details of the serviceGroup
 * x-ms-original-file: 2024-02-01-preview/ServiceGroup_Get.json
 */
async function getServiceGroup() {
  const credential = new DefaultAzureCredential();
  const client = new ManagementClient(credential);
  const result = await client.serviceGroups.get("20000000-0001-0000-0000-000000000000");
  console.log(result);
}

async function main() {
  await getServiceGroup();
}

main().catch(console.error);
