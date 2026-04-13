// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all role assignments that apply to a resource group.
 *
 * @summary list all role assignments that apply to a resource group.
 * x-ms-original-file: 2022-04-01/RoleAssignments_ListForResourceGroup.json
 */
async function listRoleAssignmentsForResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a925f2f7-5c63-4b7b-8799-25a5f97bc3b2";
  const client = new AuthorizationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.roleAssignments.listForResourceGroup("testrg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listRoleAssignmentsForResourceGroup();
}

main().catch(console.error);
