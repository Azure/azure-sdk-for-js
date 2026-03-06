// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to organization role bindings
 *
 * @summary organization role bindings
 * x-ms-original-file: 2025-08-18-preview/Access_ListRoleBindingNameList_MaximumSet_Gen.json
 */
async function accessListRoleBindingNameListMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.access.listRoleBindingNameList(
    "rgconfluent",
    "zgcfotubdmgowayipmpgujypv",
    { searchFilters: { key8083: "ft" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to organization role bindings
 *
 * @summary organization role bindings
 * x-ms-original-file: 2025-08-18-preview/Access_ListRoleBindingNameList_MinimumSet_Gen.json
 */
async function accessListRoleBindingNameListMinimumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.access.listRoleBindingNameList(
    "rgconfluent",
    "nlxbyyyyrdwjzwrcwfjlg",
    {},
  );
  console.log(result);
}

async function main(): Promise<void> {
  await accessListRoleBindingNameListMaximumSet();
  await accessListRoleBindingNameListMinimumSet();
}

main().catch(console.error);
