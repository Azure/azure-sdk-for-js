// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagementGroupsAPI } = require("@azure/arm-managementgroups");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to checks if the specified management group name is valid and unique
 *
 * @summary checks if the specified management group name is valid and unique
 * x-ms-original-file: 2023-04-01/CheckManagementGroupNameAvailability.json
 */
async function checkManagementGroupNameAvailability() {
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const result = await client.checkNameAvailability({
    name: "nameTocheck",
    type: "Microsoft.Management/managementGroups",
  });
  console.log(result);
}

async function main() {
  await checkManagementGroupNameAvailability();
}

main().catch(console.error);
