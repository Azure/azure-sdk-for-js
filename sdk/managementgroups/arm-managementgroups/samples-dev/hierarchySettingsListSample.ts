// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets all the hierarchy settings defined at the Management Group level. Settings can only be set on the root Management Group of the hierarchy.

 *
 * @summary Gets all the hierarchy settings defined at the Management Group level. Settings can only be set on the root Management Group of the hierarchy.

 * x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/ListHierarchySettings.json
 */

import { ManagementGroupsAPI } from "@azure/arm-managementgroups";
import { DefaultAzureCredential } from "@azure/identity";

async function listGroupSettings(): Promise<void> {
  const groupId = "root";
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const result = await client.hierarchySettingsOperations.list(groupId);
  console.log(result);
}

listGroupSettings().catch(console.error);
