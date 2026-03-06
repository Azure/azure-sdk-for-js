// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to organization role bindings
 *
 * @summary organization role bindings
 * x-ms-original-file: 2025-08-18-preview/Access_ListRoleBindings_MaximumSet_Gen.json
 */
async function accessListRoleBindingsMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.access.listRoleBindings(
    "rgconfluent",
    "tefgundwswvwqcfryviyoulrrokl",
    { searchFilters: { key8083: "ft" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to organization role bindings
 *
 * @summary organization role bindings
 * x-ms-original-file: 2025-08-18-preview/Access_ListRoleBindings_MinimumSet_Gen.json
 */
async function accessListRoleBindingsMinimumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.access.listRoleBindings("rgconfluent", "yuwchphweukvwtruurjgh", {});
  console.log(result);
}

async function main() {
  await accessListRoleBindingsMaximumSet();
  await accessListRoleBindingsMinimumSet();
}

main().catch(console.error);
