// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to organization role bindings
 *
 * @summary organization role bindings
 * x-ms-original-file: 2024-07-01/Access_CreateRoleBinding.json
 */
async function accessCreateRoleBinding() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.access.createRoleBinding("myResourceGroup", "myOrganization", {
    crnPattern:
      "crn://confluent.cloud/organization=1111aaaa-11aa-11aa-11aa-111111aaaaaa/environment=env-aaa1111/cloud-cluster=lkc-1111aaa",
    principal: "User:u-111aaa",
    roleName: "CloudClusterAdmin",
  });
  console.log(result);
}

async function main() {
  await accessCreateRoleBinding();
}

main().catch(console.error);
