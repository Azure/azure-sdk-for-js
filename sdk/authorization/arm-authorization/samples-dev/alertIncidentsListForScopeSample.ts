// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets alert incidents for a resource scope.
 *
 * @summary Gets alert incidents for a resource scope.
 * x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2022-08-01-preview/examples/GetAlertIncidents.json
 */
async function getAlertIncidents(): Promise<void> {
  const scope = "subscriptions/afa2a084-766f-4003-8ae1-c4aeb893a99f";
  const alertId = "TooManyOwnersAssignedToResource";
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.alertIncidents.listForScope(scope, alertId)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getAlertIncidents();
}

main().catch(console.error);
