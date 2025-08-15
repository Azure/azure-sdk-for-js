// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets deny assignments for a scope.
 *
 * @summary Gets deny assignments for a scope.
 * x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2022-04-01/examples/GetDenyAssignmentByScope.json
 */
async function listDenyAssignmentsForScope(): Promise<void> {
  const scope = "subscriptions/subId";
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.denyAssignments.listForScope(scope)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listDenyAssignmentsForScope();
}

main().catch(console.error);
