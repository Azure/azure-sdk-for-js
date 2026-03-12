// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update a management group.

 *
 * @summary Update a management group.

 * x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/PatchManagementGroup.json
 */

import type {
  PatchManagementGroupRequest,
  ManagementGroupsUpdateOptionalParams,
} from "@azure/arm-managementgroups";
import { ManagementGroupsAPI } from "@azure/arm-managementgroups";
import { DefaultAzureCredential } from "@azure/identity";

async function patchManagementGroup(): Promise<void> {
  const groupId = "ChildGroup";
  const cacheControl = "no-cache";
  const patchGroupRequest: PatchManagementGroupRequest = {
    displayName: "AlternateDisplayName",
    parentGroupId: "/providers/Microsoft.Management/managementGroups/AlternateRootGroup",
  };
  const options: ManagementGroupsUpdateOptionalParams = { cacheControl };
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const result = await client.managementGroups.update(groupId, patchGroupRequest, options);
  console.log(result);
}

patchManagementGroup().catch(console.error);
