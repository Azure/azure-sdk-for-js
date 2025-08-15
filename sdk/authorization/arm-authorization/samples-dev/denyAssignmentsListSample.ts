// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets all deny assignments for the subscription.
 *
 * @summary Gets all deny assignments for the subscription.
 * x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2022-04-01/examples/GetAllDenyAssignments.json
 */
async function listDenyAssignmentsForSubscription(): Promise<void> {
  const subscriptionId = process.env["AUTHORIZATION_SUBSCRIPTION_ID"] || "subId";
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.denyAssignments.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listDenyAssignmentsForSubscription();
}

main().catch(console.error);
