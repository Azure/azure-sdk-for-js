// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets role assignments for a resource group.
 *
 * @summary Gets role assignments for a resource group.
 * x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/GetRoleAssignmentsForResourceGroup.json
 */
async function listRoleAssignmentsForResourceGroup(): Promise<void> {
  const subscriptionId = process.env["AUTHORIZATION_SUBSCRIPTION_ID"] || "subId";
  const resourceGroupName = process.env["AUTHORIZATION_RESOURCE_GROUP"] || "rgname";
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.roleAssignments.listForResourceGroup(resourceGroupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listRoleAssignmentsForResourceGroup();
}

main().catch(console.error);
