// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to organization role bindings
 *
 * @summary organization role bindings
 * x-ms-original-file: 2024-07-01/Access_DeleteRoleBinding.json
 */
async function accessDeleteRoleBinding() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  await client.access.deleteRoleBinding("myResourceGroup", "myOrganization", "dlz-f3a90de");
}

async function main() {
  await accessDeleteRoleBinding();
}

main().catch(console.error);
