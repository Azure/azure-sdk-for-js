// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagementGroupsDeleteOptionalParams } from "@azure/arm-managementgroups";
import { ManagementGroupsAPI } from "@azure/arm-managementgroups";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Delete management group.
If a management group contains child resources, the request will fail.

 *
 * @summary Delete management group.
If a management group contains child resources, the request will fail.

 * x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/DeleteManagementGroup.json
 */
async function deleteManagementGroup(): Promise<void> {
  const groupId = "GroupToDelete";
  const cacheControl = "no-cache";
  const options: ManagementGroupsDeleteOptionalParams = { cacheControl };
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const result = await client.managementGroups.beginDeleteAndWait(groupId, options);
  console.log(result);
}

deleteManagementGroup().catch(console.error);
