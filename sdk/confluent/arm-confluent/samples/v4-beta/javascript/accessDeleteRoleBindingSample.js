// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to organization role bindings
 *
 * @summary organization role bindings
 * x-ms-original-file: 2025-08-18-preview/Access_DeleteRoleBinding_MaximumSet_Gen.json
 */
async function accessDeleteRoleBindingMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  await client.access.deleteRoleBinding(
    "rgconfluent",
    "aeqwsawfoagclmfwwaw",
    "ucuqvcuiwmoreczccknufbhrwyp",
  );
}

/**
 * This sample demonstrates how to organization role bindings
 *
 * @summary organization role bindings
 * x-ms-original-file: 2025-08-18-preview/Access_DeleteRoleBinding_MinimumSet_Gen.json
 */
async function accessDeleteRoleBindingMinimumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  await client.access.deleteRoleBinding("rgconfluent", "kxbwvfhsqesuaswozdiivwo", "dqlmrdp");
}

async function main() {
  await accessDeleteRoleBindingMaximumSet();
  await accessDeleteRoleBindingMinimumSet();
}

main().catch(console.error);
