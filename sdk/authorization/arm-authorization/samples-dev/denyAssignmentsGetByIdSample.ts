// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a deny assignment by ID.
 *
 * @summary Gets a deny assignment by ID.
 * x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2022-04-01/examples/GetDenyAssignmentById.json
 */

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getDenyAssignmentById(): Promise<void> {
  const denyAssignmentId =
    "subscriptions/subId/resourcegroups/rgname/providers/Microsoft.Authorization/denyAssignments/daId";
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.denyAssignments.getById(denyAssignmentId);
  console.log(result);
}

async function main(): Promise<void> {
  await getDenyAssignmentById();
}

main().catch(console.error);
