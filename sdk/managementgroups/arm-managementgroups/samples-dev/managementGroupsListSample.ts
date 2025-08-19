// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List management groups for the authenticated user.

 *
 * @summary List management groups for the authenticated user.

 * x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/ListManagementGroups.json
 */

import type { ManagementGroupsListOptionalParams } from "@azure/arm-managementgroups";
import { ManagementGroupsAPI } from "@azure/arm-managementgroups";
import { DefaultAzureCredential } from "@azure/identity";

async function listManagementGroups(): Promise<void> {
  const cacheControl = "no-cache";
  const options: ManagementGroupsListOptionalParams = { cacheControl };
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const resArray = new Array();
  for await (const item of client.managementGroups.list(options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

listManagementGroups().catch(console.error);
