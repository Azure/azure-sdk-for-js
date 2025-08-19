// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the specified deny assignment.
 *
 * @summary Get the specified deny assignment.
 * x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2022-04-01/examples/GetDenyAssignmentByNameId.json
 */

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getDenyAssignmentByName(): Promise<void> {
  const scope = "subscriptions/subId/resourcegroups/rgname";
  const denyAssignmentId = "denyAssignmentId";
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.denyAssignments.get(scope, denyAssignmentId);
  console.log(result);
}

async function main(): Promise<void> {
  await getDenyAssignmentByName();
}

main().catch(console.error);
