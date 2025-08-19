// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CreateOrUpdateSettingsRequest } from "@azure/arm-managementgroups";
import { ManagementGroupsAPI } from "@azure/arm-managementgroups";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Creates or updates the hierarchy settings defined at the Management Group level.

 *
 * @summary Creates or updates the hierarchy settings defined at the Management Group level.

 * x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/PutHierarchySettings.json
 */
async function getGroupSettings(): Promise<void> {
  const groupId = "root";
  const createTenantSettingsRequest: CreateOrUpdateSettingsRequest = {
    defaultManagementGroup: "/providers/Microsoft.Management/managementGroups/DefaultGroup",
    requireAuthorizationForGroupCreation: true,
  };
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const result = await client.hierarchySettingsOperations.createOrUpdate(
    groupId,
    createTenantSettingsRequest,
  );
  console.log(result);
}

getGroupSettings().catch(console.error);
