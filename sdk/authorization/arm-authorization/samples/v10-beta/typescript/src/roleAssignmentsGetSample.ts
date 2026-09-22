// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a role assignment by scope and name.
 *
 * @summary get a role assignment by scope and name.
 * x-ms-original-file: 2022-04-01/RoleAssignments_Get.json
 */
async function getRoleAssignmentByScopeAndName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.roleAssignments.get(
    "subscriptions/a925f2f7-5c63-4b7b-8799-25a5f97bc3b2",
    "b0f43c54-e787-4862-89b1-a653fa9cf747",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getRoleAssignmentByScopeAndName();
}

main().catch(console.error);
